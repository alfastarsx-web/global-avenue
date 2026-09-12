# Deploy qo'llanmasi

Bu hujjat saytni ishga tushirish uchun yozilgan. Texnik mutaxassis uchun
mo'ljallangan — buyruqlarni ketma-ket bajarish yetarli.

**Talab:** Node.js 20 yoki undan yuqori (22 tavsiya etiladi).

Tekshirish:

```bash
node -v
```

---

## Qaysi variantni tanlash kerak

| Variant | Kimga mos | Ariza formasi | Murakkablik |
|---|---|---|---|
| **A. VPS / Node hosting** | O'z serveri bor kompaniyalarga | ✅ To'liq ishlaydi | O'rtacha |
| **B. Vercel** | Tez va bepul boshlash uchun | ✅ To'liq ishlaydi | Eng oson |
| **C. Oddiy (shared) hosting** | Faqat cPanel/FTP bo'lsa | ⚠️ Cheklangan — quyida o'qing | Oson |

> **Tavsiya:** A yoki B. Sayt Next.js'da yozilgan va til yo'naltirish
> (`middleware`) hamda ariza qabul qilish (`/api/lead`) uchun Node server
> talab qiladi. C variantda bu ikkisi ishlamaydi.

---

## A. VPS / Node hosting (tavsiya etiladi)

### 1. Fayllarni serverga joylashtirish

```bash
# Arxivni serverga ko'chirib, ochamiz
unzip global-avenue-v1.0.zip -d /var/www/
cd /var/www/global-avenue
```

### 2. Sozlamalar fayli

```bash
cp .env.example .env.local
nano .env.local
```

Kamida `NEXT_PUBLIC_SITE_URL` ni to'ldiring:

```env
NEXT_PUBLIC_SITE_URL=https://globalavenue.uz
```

Qolgan o'zgaruvchilar ixtiyoriy — pastdagi "Integratsiyalar" bo'limiga qarang.

### 3. Build va ishga tushirish

```bash
npm ci          # bog'liqliklarni o'rnatish
npm run build   # loyihani yig'ish (1-2 daqiqa)
npm start       # 3100-portda ishga tushadi
```

Tekshirish: `curl -I http://127.0.0.1:3100/uz` → `200 OK` bo'lishi kerak.

### 4. Doimiy ishlashi uchun (systemd)

`/etc/systemd/system/global-avenue.service` faylini yarating:

```ini
[Unit]
Description=Global Avenue veb-sayt
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/global-avenue
Environment=NODE_ENV=production
EnvironmentFile=/var/www/global-avenue/.env.local
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Yoqish:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now global-avenue
sudo systemctl status global-avenue
```

> PM2 ishlatsangiz: `pm2 start npm --name global-avenue -- start && pm2 save`

### 5. nginx (domen va SSL)

`/etc/nginx/sites-available/globalavenue.uz`:

```nginx
server {
    listen 80;
    server_name globalavenue.uz www.globalavenue.uz;

    # Yuklanadigan rasm/video hajmi uchun
    client_max_body_size 20M;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    location / {
        proxy_pass http://127.0.0.1:3100;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Yoqish va SSL:

```bash
sudo ln -s /etc/nginx/sites-available/globalavenue.uz /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Bepul SSL sertifikat
sudo certbot --nginx -d globalavenue.uz -d www.globalavenue.uz
```

> `X-Forwarded-For` sarlavhasi muhim: ariza formasidagi spam himoyasi
> (daqiqasiga 5 ta so'rov) IP manzil bo'yicha ishlaydi.

### 6. Yangilanish (kelajakda kod o'zgarsa)

```bash
cd /var/www/global-avenue
npm ci && npm run build
sudo systemctl restart global-avenue
```

---

## B. Vercel (eng oson, bepul)

1. Loyihani GitHub'ga yuklang (yoki zip'ni ochib, yangi repo yarating).
2. [vercel.com](https://vercel.com) → **Add New → Project** → repo'ni tanlang.
3. Vercel Next.js'ni o'zi taniydi — hech narsani o'zgartirmang, **Deploy**.
4. **Settings → Environment Variables** bo'limida `.env.example` dagi
   o'zgaruvchilarni qo'shing.
5. **Settings → Domains** da o'z domeningizni ulang.

Har safar kod yangilanganda Vercel avtomatik qayta deploy qiladi.

> **Diqqat:** Vercel'da fayl tizimi vaqtinchalik. Shuning uchun
> `data/leads.jsonl` arxivi saqlanmaydi — Telegram va CRM ulanishi
> majburiy bo'ladi (pastga qarang).

---

## C. Oddiy (shared) hosting — cPanel, FTP

Agar hostingda Node.js yo'q bo'lsa, saytni statik HTML sifatida yig'sa bo'ladi.

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://globalavenue.uz npm run build:static
```

`out/` papkasi hosil bo'ladi — uning **ichidagi hamma narsani**
hosting'ning `public_html/` papkasiga ko'chiring.

### Bu variantda nima ishlamaydi

| Imkoniyat | Holat | Nima qilish kerak |
|---|---|---|
| Barcha sahifalar, filtrlar, kalkulyator, galereya | ✅ Ishlaydi | — |
| Ikki til (uz/ru) | ✅ Ishlaydi | — |
| Til avtomatik aniqlanishi | ⚠️ Bosh sahifada JavaScript orqali | — |
| **Ariza formasi** | ❌ **Hech qayerga yubormaydi** | Quyidagi yechimlardan birini tanlang |

**Forma uchun yechimlar:**

1. **Eng yaxshisi:** A yoki B variantga o'ting.
2. Tashqi forma xizmatini ulang (Formspree, Getform va h.k.) —
   `components/LeadForm.tsx` faylidagi `fetch('/api/lead', ...)` manzilini
   o'sha xizmat bergan manzilga almashtiring.
3. Vaqtinchalik: formani olib tashlab, faqat telefon va Telegram tugmalarini
   qoldiring.

> Agar formani sozlamasdan statik variantda chiqarsangiz, mijozlarning
> arizalari **yo'qoladi**. Buni e'tiborsiz qoldirmang.

---

## Integratsiyalar

Barchasi `.env.local` faylida sozlanadi. Hech biri majburiy emas — sozlanmagani
o'chirilgan holda qoladi va sayt baribir ishlayveradi.

### Telegram — yangi ariza bildirishnomasi

1. Telegram'da [@BotFather](https://t.me/BotFather) ga yozing → `/newbot`
   → bot nomini kiriting → **token** oling.
2. Botni sotuv bo'limi guruhiga qo'shing va admin qiling.
3. Guruh ID sini aniqlang: guruhga biror xabar yozing, so'ng brauzerda oching:
   `https://api.telegram.org/bot<TOKEN>/getUpdates` → `"chat":{"id":-100...}`
4. `.env.local` ga yozing:

```env
TELEGRAM_BOT_TOKEN=1234567890:AAxx...
TELEGRAM_CHAT_ID=-1001234567890
```

Ariza kelganda guruhga ism, telefon, loyiha va manba ko'rsatilgan xabar tushadi.

### CRM (Bitrix24 / amoCRM)

Bitrix24'da: **Dasturlar → Webhook → Kiruvchi webhook** → `crm.lead.add`
huquqini bering → manzilni nusxalang:

```env
CRM_WEBHOOK_URL=https://kompaniya.bitrix24.ru/rest/1/xxxxx/crm.lead.add.json
```

Boshqa CRM ishlatilsa, `app/api/lead/route.ts` faylidagi `pushToCrm`
funksiyasidagi maydon nomlarini moslashtirish kerak.

### Analitika

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX      # Google Tag Manager
NEXT_PUBLIC_YM_ID=12345678          # Yandex Metrika
```

GTM orqali Google Analytics 4 va Meta Pixel ulanadi. Forma yuborilganda
`lead_submit` hodisasi `dataLayer` ga yuboriladi — reklama konversiyasini
shu orqali kuzatish mumkin.

---

## Ishga tushirishdan keyin tekshirish ro'yxati

- [ ] `https://domen.uz` ochiladi va `/uz/` ga yo'naltiradi
- [ ] SSL yashil qulf ko'rinadi
- [ ] UZ ↔ RU almashtirish ishlaydi
- [ ] Loyihalar sahifasidagi filtrlar ishlaydi
- [ ] Kalkulyator hisoblaydi
- [ ] Test ariza yuborilganda Telegram'ga xabar keladi
- [ ] Mobil telefonda ko'rinishi to'g'ri
- [ ] `https://domen.uz/sitemap.xml` va `/robots.txt` ochiladi
- [ ] Google Search Console va Yandex Webmaster'ga sayt qo'shilgan
- [ ] PageSpeed Insights: mobil va desktopda 90+ ball

---

## Muammolar

**Port band (`EADDRINUSE: 3100`)**
Boshqa jarayon o'sha portni egallagan. To'xtatish: `lsof -ti :3100 | xargs kill -9`
yoki `package.json` dagi `start` buyrug'ida portni o'zgartiring.

**Rasmlar ko'rinmayapti**
`public/img/` papkasi to'liq ko'chirilganini tekshiring. Fayl nomlari
katta-kichik harfga sezgir (Linux'da `Hero.jpg` ≠ `hero.jpg`).

**Ariza kelmayapti**
`journalctl -u global-avenue -n 50` bilan loglarni ko'ring. Telegram/CRM
ishlamasa ham arizalar `data/leads.jsonl` fayliga yoziladi — u yerdan
tekshirib ko'ring.

**Build xotira yetishmasligi bilan yiqilyapti**
Kichik VPS'da: `NODE_OPTIONS=--max-old-space-size=2048 npm run build`
