# Loyihani topshirish hujjati

**Loyiha:** "Global Avenue" QK korporativ veb-sayti
**Versiya:** 1.0
**Sana:** 2026-yil 12-sentabr
**Asos:** "Global Avenue sayti — Texnik topshiriq (TZ) v1.0"

---

## 1. Nima topshirilmoqda

Arxiv ichida loyihaning **to'liq manba kodi** bor. Yopiq (obfuskatsiya
qilingan) qism yo'q, pullik kutubxonalar ishlatilmagan, tashqi xizmatga
majburiy bog'liqlik yo'q.

| Nima | Qayerda |
|---|---|
| Sayt (frontend + backend) | `app/`, `components/`, `lib/` |
| **Admin panel** | `public/admin.html`, `app/api/admin/` |
| Ma'lumotlar bazasi sxemasi va migratsiyalar | `prisma/` |
| Sayt matnlari (uz/ru) | `lib/i18n/uz.ts`, `lib/i18n/ru.ts` |
| Boshlang'ich kontent (seed) | `lib/data/`, `prisma/seed.ts` |
| Rasm, logotip va chizmalar | `public/img/`, `public/logo/` |
| Dizayn tizimi | `app/globals.css`, `app/components.css` |
| **Deploy qo'llanmasi** | `DEPLOY.md` |
| Texnik hujjat | `README.md` |

**Texnologiya:** Next.js 16 (React 19) · TypeScript · Prisma + SQLite ·
toza CSS (tashqi UI-framework yo'q).

> Arxivga ishlab chiqish jarayonidagi yordamchi fayllar (`.github/` —
> namoyish nusxasini avtomatik joylashtirish sozlamasi) kiritilmagan:
> ular faqat ishlab chiquvchining GitHub repozitoriysiga tegishli.

**Litsenziya:** kod to'liq buyurtmachi ("Global Avenue" QK) mulki.

---

## 2. Sayt tarkibi

Har bir sahifa ikki tilda — o'zbek va rus.

| Sahifa | Manzil | Nimalar bor |
|---|---|---|
| Bosh sahifa | `/uz` | Hero, statistika, faol loyihalar, USP, qurilish lentasi, sharhlar, kalkulyator, Instagram, aloqa formasi |
| Loyihalar katalogi | `/uz/projects` | Holat, xonalar soni, hudud va narx bo'yicha filtrlar |
| Loyiha sahifasi | `/uz/projects/twinera` | Galereya (lightbox), interaktiv planirovka tanlovchisi, narx va to'lov shartlari, joylashuv, qurilish bosqichlari, texnik pasport, ariza formasi |
| Kompaniya haqida | `/uz/about` | Tarix, missiya, qadriyatlar, litsenziyalar, jamoa |
| Qurilish jarayoni | `/uz/progress` | "Sirsiz qurilish" — hisobot lentasi, foiz ko'rsatkichi |
| Mijozlar fikri | `/uz/reviews` | O'rtacha baho, video-sharh bloklari, matnli sharhlar |
| Yangiliklar | `/uz/blog` | Maqolalar, kategoriyalar |
| To'lov kalkulyatori | `/uz/calculator` | Muddatli to'lov va ipoteka (annuitet) |
| Aloqa | `/uz/contact` | Manzil, telefon, ish vaqti, ijtimoiy tarmoqlar, forma |
| Karyera | `/uz/careers` | Vakansiyalar, ariza formasi |
| **Admin panel** | `/admin.html` | Parol bilan himoyalangan |

5 ta turar-joy majmuasi: **TwinEra, IZMIR, Marocco, Ashgabad, NRG Qorasuv**.

---

## 3. Admin panel

Sayt kontenti **ma'lumotlar bazasida** saqlanadi va brauzer orqali
boshqariladi. Dasturchi yordamisiz o'zgartirish mumkin.

**Manzil:** `https://domen.uz/admin.html`

**Boshqariladigan bo'limlar:**

| Bo'lim | Nima qilish mumkin |
|---|---|
| Loyihalar | Majmua qo'shish/tahrirlash, holat, narx, tavsif, galereya |
| Xonadonlar | Planirovka, maydon, qavat, narx, holat (bo'sh / band / sotilgan) |
| Qurilish jarayoni | Haftalik hisobot, foto, bajarilish foizi |
| Maqolalar | Yangilik va blog maqolalari (ikki tilda) |
| Mijozlar fikri | Sharhlar, baho, video belgisi |
| Jamoa | Xodimlar ro'yxati |
| Vakansiyalar | Ochiq ish o'rinlari |
| **Arizalar** | Saytdan kelgan barcha lidlar ro'yxati |
| Media | Rasm yuklash va boshqarish |
| Sozlamalar | Umumiy sayt parametrlari |

**Xavfsizlik:** parol `bcrypt` bilan hash qilinadi (ochiq saqlanmaydi),
sessiya imzolangan cookie orqali ishlaydi, barcha `/api/admin/*` manzillari
sessiyasiz **401** qaytaradi.

> Parolni `.env` faylida siz o'rnatasiz — `DEPLOY.md`, A-variant 2-qadam.
> Parolni almashtirish uchun yangi hash yaratib, `.env` ni yangilash va
> saytni qayta ishga tushirish kifoya.

---

## 4. Texnik topshiriq bo'yicha bajarilganlik

### ✅ Bajarilgan

- Sayt tuzilishi (TZ 5-bo'lim) — 10 ta bo'lim, ikki tilda
- Bosh sahifa va loyiha sahifasi funksionalligi (TZ 6.1, 6.2)
- Ariza formasi → baza + Telegram bildirishnomasi + CRM webhook (TZ 6.3, 9)
- Dizayn: premium uslub, to'liq mobile-first responsivlik (TZ 7)
- Next.js, server-side rendering (TZ 8)
- SEO: meta-teglar, hreflang, canonical, `schema.org/RealEstateListing`
  va `Organization`, `sitemap.xml`, `robots.txt` (TZ 8)
- Analitika: Google Tag Manager va Yandex Metrika ulangan (TZ 9)
- Ikki til — o'zbek va rus (TZ 10)
- Tezkor aloqa tugmalari: telefon, Telegram, WhatsApp (TZ 9)
- **Boshqaruv paneli (TZ 11)** — kontent, narx, xonadon holati, arizalar,
  media; parol bilan himoyalangan

### ⏳ Keyingi bosqichda (kelishilishi kerak)

| Nima | Nega hozir yo'q |
|---|---|
| **360° virtual tur** (TZ 6.2) | Sahifada joy ajratilgan; tur provayderi tanlanishi va suratga olinishi kerak |
| **Mijozga avtomatik SMS tasdiq** (TZ 6.3) | SMS provayder (Eskiz, Play Mobile) bilan shartnoma kerak |
| **Instagram lentasi** (TZ 9) | Blok tayyor; Meta rasmiy API tokeni kerak |
| **Interaktiv xarita** (TZ 9) | Blok va koordinatalar tayyor; Yandex Maps API kaliti kerak |
| **Bank bilan ipoteka integratsiyasi** | Bank bilan hamkorlik rasmiylashtirilgach |
| Admin panelda xodimlar uchun huquq darajalari (TZ 11) | Asosi (`staff`) qo'yilgan, to'liq rollar tizimi keyingi bosqichda |

---

## 5. ⚠️ Ishga tushirishdan oldin ALMASHTIRISH SHART

Sayt hozir **namoyish ma'lumotlari** bilan to'ldirilgan.

### 5.1. Fotosuratlar

`public/img/` dagi fotosuratlar vaqtinchalik. Ular
[Unsplash](https://unsplash.com/license) dan olingan (bepul litsenziya,
tijorat uchun ham ruxsat) va kompaniyaning Instagram uslubiga qarab
tanlangan — lekin bular **Global Avenue'ning haqiqiy obyektlari emas**.

| Papka | Nima kerak | O'lcham |
|---|---|---|
| `img/photos/hero.jpg` | Bosh sahifa foni — dron yoki golden-hour kadr | 2000×1125 |
| `img/projects/*.jpg` | Har bir majmua uchun 5 tadan render/foto | 1600×1000 |
| `img/progress/p*.jpg` | Qurilish hisoboti kadrlari | 1200×750 |
| `img/blog/post-*.jpg` | Maqola muqovalari | 1400×875 |
| `img/plans/plan-*.svg` | **Arxitektor bergan haqiqiy planirovkalar** | — |

Rasmlarni **admin panel orqali** almashtirish eng qulay yo'l.
Batafsil: `public/img/CREDITS.md`.

Logotip (`public/logo/`) — haqiqiy, kompaniyaniki.

### 5.2. Loyiha ma'lumotlari

Narxlar, xonadon maydonlari, qavatlar soni, topshirish muddatlari,
qurilish bosqichlari va texnik pasport ma'lumotlari **taxminiy**.
Admin panel orqali tuzatiladi.

### 5.3. Kompaniya ma'lumotlari

Statistika (11 yil, 1200 xonadon), kompaniya tarixi (2014–2026),
litsenziya nomlari, jamoa a'zolari (ismlar o'ylab topilgan) va mijoz
sharhlari — namunaviy. Bir qismi admin panelda, matnlar esa
`lib/i18n/uz.ts` / `ru.ts` fayllarida.

### 5.4. Kontaktlar

Kompaniyaning Instagram sahifasidan (`@global_avenue.uz`) olingan va
**tasdiqlangan**:

- Telefon: `+998 66 230 00 08`
- Telegram: `t.me/GlobalAvenue_uz`
- Shior: "Sifat foydadan ustun!"
- Loyiha nomlari: IZMIR, Marocco, Ashgabad

**Tasdiqlanmagan** — tekshirish kerak (`lib/data/site.ts`):

- WhatsApp raqami (hozir telefon raqami asosida qo'yilgan)
- E-mail: `info@globalavenue.uz`
- Ofis manzili: "Samarqand shahri, Registon ko'chasi"
- Xarita koordinatalari

---

## 6. Xavfsizlik va ishonchlilik

- **Arizalar yo'qolmaydi.** `/api/lead` arizani avval bazaga va
  `data/leads.jsonl` fayliga yozadi, keyin Telegram va CRM'ga yuboradi.
  Tashqi xizmat ishlamay qolsa ham ariza saqlanadi.
- **Spam himoyasi.** Bitta IP'dan daqiqasiga 5 tadan ortiq ariza qabul
  qilinmaydi.
- **Kiruvchi ma'lumot tozalanadi.** Uzunlik cheklanadi, boshqaruv belgilari
  olib tashlanadi, Telegram xabarida HTML ekranlanadi.
- **Admin panel** parol hash'i va imzolangan sessiya bilan himoyalangan.
- **HTTP xavfsizlik sarlavhalari:** `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Maxfiy ma'lumotlar kodda yo'q** — barchasi `.env` faylida, u esa
  versiya nazoratiga tushmaydi.

`npm audit` — 0 ta zaiflik (2026-yil sentabr holatiga).

### Zaxira nusxa

Butun kontent, arizalar va yuklangan rasmlar ikki joyda:

```
data/admin.db      ← baza (kontent + arizalar)
data/uploads/      ← yuklangan rasmlar
```

Shu ikkisini muntazam zaxiralang (`DEPLOY.md`, A-variant 6-qadam).

---

## 7. Ishga tushirish

Batafsil: **`DEPLOY.md`**. Qisqacha (VPS):

```bash
unzip global-avenue-v1.0.zip -d /var/www/
cd /var/www/global-avenue
cp .env.example .env      # sozlamalarni to'ldiring (admin paroli ham)
npm ci
npm run db:migrate        # baza jadvallari
npm run db:seed           # boshlang'ich kontent (faqat birinchi marta)
npm run build
npm start                 # 3100-port
```

Old tomonda nginx + SSL.

---

## 8. Qabul qilish mezonlari (TZ 13-bo'lim)

| Mezon | Holat |
|---|---|
| Barcha sahifalar TZ'dagi funksionallikka mos | ✅ |
| Chrome, Safari, Yandex Browser va mobil qurilmalarda to'g'ri ko'rinadi | ✅ |
| Formalar ishlaydi, CRM/Telegramga signal yuboradi | ✅ (token qo'yilgandan keyin) |
| SSL sertifikat | ⏳ Hostingda o'rnatiladi (`DEPLOY.md`) |
| SEO: meta-teglar, sitemap.xml, robots.txt | ✅ |
| Google PageSpeed 90+ | ⏳ Haqiqiy fotosuratlar qo'yilgandan keyin qayta o'lchansin |

> PageSpeed ko'p jihatdan rasm hajmiga bog'liq. Professional fotosuratlarni
> siqib yuklang (JPEG sifat 70–75, kenglik 2000px dan oshmasin). Next.js
> qolganini o'zi bajaradi — AVIF/WebP'ga o'giradi va ekranga moslaydi.
