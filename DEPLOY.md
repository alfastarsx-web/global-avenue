# Deploy qo'llanmasi

Bu hujjat saytni noldan ishga tushirish uchun yozilgan. Texnik mutaxassis
uchun mo'ljallangan — buyruqlarni ketma-ket bajarish yetarli.

**Talab:** Node.js 20 yoki undan yuqori (22 tavsiya etiladi).

```bash
node -v
```

Sayt Next.js'da yozilgan va **Node server talab qiladi**. Sabablari:

- til yo'naltirish (`middleware`),
- ariza qabul qilish (`/api/lead`),
- **admin panel va ma'lumotlar bazasi** (Prisma + SQLite).

Oddiy (shared) PHP hostingda to'liq ishlamaydi — pastdagi C variantga qarang.

---

## Qaysi variantni tanlash kerak

| Variant | Kimga mos | Admin panel | Ariza formasi |
|---|---|---|---|
| **A. VPS / Node hosting** | Tavsiya etiladi | ✅ | ✅ |
| **B. Vercel** | Tez boshlash uchun | ⚠️ Baza tashqi bo'lishi kerak | ✅ |
| **C. Statik (shared hosting)** | Faqat oxirgi chora | ❌ | ❌ |

---

## A. VPS / Node hosting (tavsiya etiladi)

### 1. Fayllarni joylashtirish

```bash
unzip global-avenue-v1.0.zip -d /var/www/
cd /var/www/global-avenue
```

### 2. Sozlamalar fayli

```bash
cp .env.example .env
nano .env
```

> ⚠️ **Fayl nomi aynan `.env` bo'lsin, `.env.local` emas.**
> Next.js ikkalasini ham o'qiydi, lekin Prisma (baza vositasi) faqat `.env` ni
> o'qiydi. Bitta `.env` faylida hammasini saqlash eng oddiy yo'l.

To'ldirilishi shart bo'lgan qiymatlar:

```env
NEXT_PUBLIC_SITE_URL=https://globalavenue.uz
DATABASE_URL=file:../data/admin.db
ADMIN_PASSWORD_HASH=...
SESSION_SECRET=...
```

**Admin parolini yaratish** (`PAROL` o'rniga o'z parolingizni qo'ying):

```bash
npm ci   # avval bog'liqliklar o'rnatilgan bo'lishi kerak
node -e "require('bcryptjs').hash(process.argv[1],10).then(h=>console.log(h))" 'PAROL'
```

> ⚠️ Chiqqan hash'dagi **har bir `$` belgisini `\$` bilan almashtiring**:
> `$2b$10$abc...` → `\$2b\$10\$abc...`
> Aks holda `.env` yuklovchisi ularni o'zgaruvchi deb "kengaytirib" yuboradi va
> hash buziladi (parol hech qachon to'g'ri kelmaydi).

**Sessiya kalitini yaratish:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Qolgan o'zgaruvchilar (Telegram, CRM, analitika) ixtiyoriy —
"Integratsiyalar" bo'limiga qarang.

### 3. O'rnatish, baza va build

```bash
npm ci              # bog'liqliklar (Prisma client avtomatik generatsiya bo'ladi)
npm run db:migrate  # baza jadvallarini yaratish
npm run db:seed     # boshlang'ich kontent bilan to'ldirish
npm run build       # loyihani yig'ish (1-2 daqiqa)
npm start           # 3100-portda ishga tushadi
```

Tekshirish:

```bash
curl -I http://127.0.0.1:3100/uz        # 200 OK
curl -I http://127.0.0.1:3100/admin.html # 200 OK
```

> `db:seed` faqat **birinchi marta** kerak — u saytni boshlang'ich kontent
> bilan to'ldiradi. Keyinchalik kontent admin panel orqali boshqariladi.
> Qayta ishga tushirish xavfsiz (yozuvlar `slug`/`id` bo'yicha yangilanadi),
> lekin admin panelda qilingan o'zgarishlar ustidan yozilishi mumkin.

### 4. Doimiy ishlashi uchun (systemd)

`/etc/systemd/system/global-avenue.service`:

```ini
[Unit]
Description=Global Avenue veb-sayt
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/global-avenue
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo chown -R www-data:www-data /var/www/global-avenue/data
sudo systemctl daemon-reload
sudo systemctl enable --now global-avenue
sudo systemctl status global-avenue
```

> `data/` papkasiga yozish huquqi **majburiy** — baza fayli va yuklangan
> rasmlar shu yerda saqlanadi.

> PM2 ishlatsangiz: `pm2 start npm --name global-avenue -- start && pm2 save`

### 5. nginx (domen va SSL)

`/etc/nginx/sites-available/globalavenue.uz`:

```nginx
server {
    listen 80;
    server_name globalavenue.uz www.globalavenue.uz;

    # Admin paneldan rasm yuklash uchun
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

```bash
sudo ln -s /etc/nginx/sites-available/globalavenue.uz /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d globalavenue.uz -d www.globalavenue.uz
```

> `X-Forwarded-For` muhim: ariza formasidagi spam himoyasi (daqiqasiga 5 ta
> so'rov) IP manzil bo'yicha ishlaydi. SSL esa admin panel paroli ochiq
> uzatilmasligi uchun **majburiy**.

### 6. Zaxira nusxa (backup)

Butun kontent va arizalar bitta fayl va bitta papkada:

```bash
# Kunlik zaxira
tar czf /backup/ga-$(date +%F).tar.gz \
    /var/www/global-avenue/data/admin.db \
    /var/www/global-avenue/data/uploads
```

Buni `crontab -e` ga qo'shib avtomatlashtiring.

### 7. Yangilanish (kod o'zgarganda)

```bash
cd /var/www/global-avenue
npm ci
npm run db:migrate     # yangi migratsiyalar bo'lsa qo'llaniladi
npm run build
sudo systemctl restart global-avenue
```

> `db:seed` ni **qayta ishlatmang** — admin paneldagi o'zgarishlar yo'qolishi mumkin.

---

## B. Vercel

1. Loyihani GitHub'ga yuklang.
2. [vercel.com](https://vercel.com) → **Add New → Project** → repo'ni tanlang.
3. **Settings → Environment Variables** da `.env.example` dagi
   o'zgaruvchilarni qo'shing.
4. **Settings → Domains** da domenni ulang.

> ⚠️ **Muhim cheklov.** Vercel'da fayl tizimi vaqtinchalik va faqat o'qish
> uchun. Ya'ni SQLite bazasi (`data/admin.db`) va yuklangan rasmlar
> (`data/uploads/`) **saqlanmaydi** — har deploy'da yo'qoladi.
>
> Vercel'da ishlatish uchun quyidagilar kerak:
> - baza: Postgres (Vercel Postgres, Neon, Supabase) →
>   `prisma/schema.prisma` da `provider = "postgresql"` ga o'zgartirib,
>   migratsiyalarni qayta yaratish;
> - rasmlar: tashqi fayl saqlagich (Vercel Blob, S3, Cloudinary) →
>   `app/api/admin/upload/route.ts` ni moslashtirish.
>
> Agar admin panel kerak bo'lsa, **A varianti ancha oddiy**.

---

## C. Statik (shared hosting) — oxirgi chora

Node.js umuman yo'q bo'lsa, saytni statik HTML sifatida yig'sa bo'ladi:

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://globalavenue.uz npm run build:static
```

`out/` papkasining **ichidagi hamma narsani** `public_html/` ga ko'chiring.

| Imkoniyat | Holat |
|---|---|
| Barcha sahifalar, filtrlar, kalkulyator, galereya, ikki til | ✅ Ishlaydi |
| **Admin panel** | ❌ Ishlamaydi |
| **Ariza formasi** | ❌ Hech qayerga yubormaydi |

Bu rejimda kontent bazadan emas, `lib/data/` fayllaridan o'qiladi va
har o'zgarishda saytni qayta yig'ib, qayta yuklash kerak bo'ladi.

> Agar formani sozlamasdan shu variantda chiqarsangiz, mijozlarning
> arizalari **yo'qoladi**. Buni e'tiborsiz qoldirmang — A variantga o'ting
> yoki tashqi forma xizmatini (Formspree va h.k.) ulang.

---

## Admin panel

**Manzil:** `https://domen.uz/admin.html`
(sayt pastki qismidagi havola orqali ham ochiladi)

**Kirish:** `.env` dagi `ADMIN_PASSWORD_HASH` ga mos parol.

Boshqariladigan bo'limlar: loyihalar va xonadonlar, qurilish hisobotlari,
maqolalar, mijoz sharhlari, jamoa, vakansiyalar, kelib tushgan arizalar,
media fayllar va sayt sozlamalari.

Yuklangan rasmlar `data/uploads/` papkasida saqlanadi va `/api/uploads/...`
manzili orqali beriladi.

---

## Integratsiyalar

Barchasi `.env` faylida. Hech biri majburiy emas — sozlanmagani o'chirilgan
holda qoladi va sayt baribir ishlayveradi.

### Telegram — yangi ariza bildirishnomasi

1. [@BotFather](https://t.me/BotFather) → `/newbot` → **token** oling.
2. Botni sotuv bo'limi guruhiga qo'shing va admin qiling.
3. Guruhga xabar yozing, so'ng oching:
   `https://api.telegram.org/bot<TOKEN>/getUpdates` → `"chat":{"id":-100...}`
4. `.env` ga yozing:

```env
TELEGRAM_BOT_TOKEN=1234567890:AAxx...
TELEGRAM_CHAT_ID=-1001234567890
```

### CRM (Bitrix24 / amoCRM)

Bitrix24: **Dasturlar → Webhook → Kiruvchi webhook** → `crm.lead.add` huquqi:

```env
CRM_WEBHOOK_URL=https://kompaniya.bitrix24.ru/rest/1/xxxxx/crm.lead.add.json
```

Boshqa CRM bo'lsa, `app/api/lead/route.ts` dagi `pushToCrm` funksiyasidagi
maydon nomlarini moslashtiring.

### Analitika

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_YM_ID=12345678
```

GTM orqali Google Analytics 4 va Meta Pixel ulanadi. Forma yuborilganda
`dataLayer` ga `lead_submit` hodisasi yuboriladi.

---

## Ishga tushirishdan keyin tekshirish ro'yxati

- [ ] `https://domen.uz` ochiladi va `/uz/` ga yo'naltiradi
- [ ] SSL yashil qulf ko'rinadi
- [ ] UZ ↔ RU almashtirish ishlaydi
- [ ] Loyihalar sahifasidagi filtrlar ishlaydi
- [ ] Kalkulyator hisoblaydi
- [ ] `/admin.html` ochiladi, parol bilan kiriladi
- [ ] Admin panelda loyiha tahrirlansa, saytda darhol ko'rinadi
- [ ] Admin panelda rasm yuklansa, saytda ko'rinadi
- [ ] Test ariza yuborilganda Telegram'ga xabar keladi va admin panelda ko'rinadi
- [ ] Mobil telefonda ko'rinishi to'g'ri
- [ ] `/sitemap.xml` va `/robots.txt` ochiladi
- [ ] `data/` zaxira nusxasi sozlangan
- [ ] Google Search Console va Yandex Webmaster'ga sayt qo'shilgan

---

## Muammolar

**`Environment variable not found: DATABASE_URL`**
Sozlamalar `.env.local` da yozilgan. Prisma faqat `.env` ni o'qiydi —
faylni `.env` deb nomlang.

**Admin parol to'g'ri kelmayapti**
`.env` dagi hash'da `$` belgilari `\$` qilinganini tekshiring.

**Port band (`EADDRINUSE: 3100`)**
`lsof -ti :3100 | xargs kill -9`

**Yuklangan rasmlar ko'rinmayapti / saqlanmayapti**
`data/uploads/` papkasiga yozish huquqi borligini tekshiring:
`sudo chown -R www-data:www-data /var/www/global-avenue/data`

**Ariza kelmayapti**
`journalctl -u global-avenue -n 50` — loglarni ko'ring. Telegram/CRM
ishlamasa ham arizalar bazaga va `data/leads.jsonl` fayliga yoziladi.

**Build xotira yetishmasligi bilan yiqilyapti**
`NODE_OPTIONS=--max-old-space-size=2048 npm run build`
