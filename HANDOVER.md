# Loyihani topshirish hujjati

**Loyiha:** "Global Avenue" QK korporativ veb-sayti
**Versiya:** 1.0
**Sana:** 2026-yil 12-sentabr
**Asos:** "Global Avenue sayti — Texnik topshiriq (TZ) v1.0"

---

## 1. Nima topshirilmoqda

Arxiv ichida loyihaning **to'liq manba kodi** bor. Hech qanday yopiq
(obfuskatsiya qilingan) qism yo'q, tashqi pullik kutubxonalar ishlatilmagan.

| Nima | Qayerda |
|---|---|
| Frontend + backend manba kodi | `app/`, `components/`, `lib/` |
| Barcha matnlar (uz/ru) | `lib/i18n/uz.ts`, `lib/i18n/ru.ts` |
| Loyiha ma'lumotlari (narx, planirovka) | `lib/data/projects.ts` |
| Blog, hisobot, sharh, jamoa, vakansiya | `lib/data/content.ts` |
| Kontaktlar va ijtimoiy tarmoqlar | `lib/data/site.ts` |
| Rasm va chizmalar | `public/img/` |
| Dizayn tizimi (rang, shrift, komponent) | `app/globals.css`, `app/components.css` |
| Deploy qo'llanmasi | `DEPLOY.md` |
| Texnik hujjat | `README.md` |

**Texnologiya:** Next.js 16 (React 19) · TypeScript · toza CSS.
Tashqi UI-framework ishlatilmagan — kelajakda boshqa dasturchi ham
qiynalmasdan davom ettira oladi.

**Litsenziya:** kod to'liq buyurtmachi ("Global Avenue" QK) mulki.

---

## 2. Sayt tarkibi

Har bir sahifa ikki tilda — jami **40 ta manzil**.

| Sahifa | Manzil | Nimalar bor |
|---|---|---|
| Bosh sahifa | `/uz` | Hero, statistika, faol loyihalar, USP, qurilish lentasi, sharhlar, kalkulyator, Instagram, aloqa formasi |
| Loyihalar katalogi | `/uz/projects` | Holat, xonalar soni, hudud va narx bo'yicha filtrlar |
| Loyiha sahifasi | `/uz/projects/twinera` | Galereya (lightbox), interaktiv planirovka tanlovchisi, narx va to'lov shartlari, joylashuv, qurilish bosqichlari, texnik pasport, ariza formasi |
| Kompaniya haqida | `/uz/about` | Tarix, missiya, qadriyatlar, litsenziyalar, jamoa |
| Qurilish jarayoni | `/uz/progress` | "Sirsiz qurilish" — loyihalar bo'yicha hisobot lentasi, foiz ko'rsatkichi |
| Mijozlar fikri | `/uz/reviews` | O'rtacha baho, video-sharh bloklari, matnli sharhlar |
| Yangiliklar | `/uz/blog` | 6 ta maqola, kategoriyalar |
| To'lov kalkulyatori | `/uz/calculator` | Muddatli to'lov va ipoteka (annuitet) |
| Aloqa | `/uz/contact` | Manzil, telefon, ish vaqti, ijtimoiy tarmoqlar, forma |
| Karyera | `/uz/careers` | Vakansiyalar, ariza formasi |

5 ta turar-joy majmuasi kiritilgan: **TwinEra, IZMIR, Marocco, Ashgabad,
NRG Qorasuv**.

---

## 3. Texnik topshiriq bo'yicha bajarilganlik

### ✅ To'liq bajarilgan

- Sayt tuzilishi (TZ 5-bo'lim) — 10 ta bo'lim, ikki tilda
- Bosh sahifa va loyiha sahifasi funksionalligi (TZ 6.1, 6.2)
- Ariza formasi → Telegram bildirishnomasi + CRM webhook (TZ 6.3, 9)
- Dizayn: premium uslub, to'liq mobile-first responsivlik (TZ 7)
- Next.js, server-side rendering, statik generatsiya (TZ 8)
- SEO: meta-teglar, hreflang, canonical, `schema.org/RealEstateListing`
  va `Organization`, `sitemap.xml`, `robots.txt` (TZ 8)
- Analitika: Google Tag Manager va Yandex Metrika ulangan (TZ 9)
- Ikki til — o'zbek va rus (TZ 10)
- Tezkor aloqa tugmalari: telefon, Telegram, WhatsApp (TZ 9)

### ⏳ Keyingi bosqichda (TZ bo'yicha kelishilishi kerak)

| Nima | Nega hozir yo'q |
|---|---|
| **Boshqaruv paneli / CMS** (TZ 11) | Alohida bosqich sifatida rejalashtirilgan. Hozircha kontent kod fayllarida — 5-bo'limga qarang |
| **360° virtual tur** (TZ 6.2) | Sahifada joy ajratilgan; tur provayderi tanlanishi va suratga olinishi kerak |
| **Mijozga avtomatik SMS tasdiq** (TZ 6.3) | SMS provayder (Eskiz, Play Mobile) bilan shartnoma kerak |
| **Instagram lentasi** (TZ 9) | Blok tayyor; Meta rasmiy API tokeni kerak |
| **Interaktiv xarita** (TZ 9) | Blok va koordinatalar tayyor; Yandex Maps API kaliti kerak |
| **Ipoteka kalkulyatorining bank bilan integratsiyasi** | Bank bilan hamkorlik rasmiylashtirilgach |

---

## 4. ⚠️ Ishga tushirishdan oldin ALMASHTIRISH SHART

Sayt hozir **namoyish ma'lumotlari** bilan to'ldirilgan. Ularni haqiqiy
ma'lumotlarga almashtirmasdan ommaga chiqarmang.

### 4.1. Fotosuratlar

`public/img/` papkasidagi barcha fotosuratlar — vaqtinchalik.
Ular [Unsplash](https://unsplash.com/license) saytidan olingan (bepul
litsenziya, tijorat uchun ham ruxsat etilgan), kompaniyaning Instagram
uslubiga qarab tanlangan. Ammo bular **Global Avenue'ning haqiqiy
obyektlari emas**.

Almashtirish kerak:

| Papka | Nima kerak | Tavsiya etilgan o'lcham |
|---|---|---|
| `img/photos/hero.jpg` | Bosh sahifa fon rasmi — dron yoki golden-hour kadr | 2000×1125 (16:9) |
| `img/projects/*.jpg` | Har bir majmua uchun 5 tadan render/foto | 1600×1000 (16:10) |
| `img/progress/p*.jpg` | Haftalik qurilish hisoboti kadrlari | 1200×750 |
| `img/blog/post-*.jpg` | Maqola muqovalari | 1400×875 |
| `img/plans/plan-*.svg` | **Arxitektor bergan haqiqiy planirovkalar** | — |

Fayl nomini o'zgartirmasdan ustidan yozsangiz, kodda hech narsa
o'zgartirish kerak emas. Batafsil: `public/img/CREDITS.md`.

### 4.2. Loyiha ma'lumotlari

`lib/data/projects.ts` faylidagi quyidagilar **taxminiy**:
narxlar, xonadon maydonlari, qavatlar soni, topshirish muddatlari,
qurilish bosqichlari, texnik pasport ma'lumotlari.

### 4.3. Kompaniya ma'lumotlari

`lib/i18n/uz.ts` va `ru.ts` fayllarida:
statistika (11 yil, 1200 xonadon), kompaniya tarixi (2014–2026),
litsenziya nomlari, jamoa a'zolari (ismlar o'ylab topilgan),
mijozlar sharhlari (namunaviy matnlar).

### 4.4. Kontaktlar

Quyidagilar kompaniyaning Instagram sahifasidan (`@global_avenue.uz`)
olingan va **tasdiqlangan**:

- Telefon: `+998 66 230 00 08`
- Telegram: `t.me/GlobalAvenue_uz`
- Shior: "Sifat foydadan ustun!"
- Loyiha nomlari: IZMIR, Marocco, Ashgabad

Quyidagilar **tasdiqlanmagan** — tekshiring (`lib/data/site.ts`):

- WhatsApp raqami (hozir telefon raqami asosida qo'yilgan)
- E-mail: `info@globalavenue.uz`
- Ofis manzili: "Samarqand shahri, Registon ko'chasi" (aniqlashtirilishi kerak)
- Xarita koordinatalari

---

## 5. Kontentni yangilash (CMS ulanmagunicha)

Barcha matn va ma'lumotlar oddiy fayllarda. O'zgartirgandan keyin
saytni qayta yig'ish kerak: `npm run build` va qayta ishga tushirish.

| Nimani o'zgartirish | Qaysi fayl |
|---|---|
| Narx, xonadon holati (sotuvda/band/sotilgan) | `lib/data/projects.ts` |
| Yangi qurilish hisoboti | `lib/data/content.ts` → `progressUpdates` |
| Yangi maqola | `lib/data/content.ts` → `posts` |
| Mijoz sharhi | `lib/data/content.ts` → `reviews` |
| Vakansiya | `lib/data/content.ts` → `vacancies` |
| Sayt matnlari, tugmalar, sarlavhalar | `lib/i18n/uz.ts` + `lib/i18n/ru.ts` |
| Telefon, manzil, ijtimoiy tarmoq | `lib/data/site.ts` |
| Ranglar, shriftlar | `app/globals.css` (yuqoridagi `:root` bloki) |

> **Muhim:** `lib/i18n/ru.ts` fayli o'zbekcha lug'atga bog'langan.
> O'zbekchada yangi matn qo'shsangiz, ruschada ham qo'shish talab qilinadi —
> aks holda build xato beradi. Bu tarjima tushib qolishining oldini oladi.

---

## 6. Xavfsizlik va ishonchlilik

Kodda quyidagilar ko'zda tutilgan:

- **Arizalar yo'qolmaydi.** `/api/lead` avval arizani `data/leads.jsonl`
  fayliga yozadi, keyin Telegram va CRM'ga yuboradi. Tashqi xizmat
  ishlamay qolsa ham ariza saqlanib qoladi.
- **Spam himoyasi.** Bitta IP manzildan daqiqasiga 5 tadan ortiq ariza
  qabul qilinmaydi.
- **Kiruvchi ma'lumot tozalanadi.** Ism, telefon va izoh uzunligi
  cheklanadi, boshqaruv belgilari olib tashlanadi, Telegram xabarida
  HTML belgilari ekranlanadi.
- **HTTP xavfsizlik sarlavhalari** o'rnatilgan: `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Maxfiy ma'lumotlar kodda yo'q.** Barcha tokenlar `.env.local` faylida,
  u esa versiya nazoratiga tushmaydi.

`npm audit` — 0 ta zaiflik (2026-yil sentabr holatiga).

---

## 7. Ishga tushirish

Batafsil yo'riqnoma: **`DEPLOY.md`**.

Qisqacha (VPS uchun):

```bash
unzip global-avenue-v1.0.zip -d /var/www/
cd /var/www/global-avenue
cp .env.example .env.local     # sozlamalarni to'ldiring
npm ci && npm run build
npm start                      # 3100-port
```

Old tomonda nginx + SSL. Telegram va CRM ulanishi `DEPLOY.md` da yozilgan.

---

## 8. Kafolat va qo'llab-quvvatlash

Bu hujjat texnik topshiriqning 13-bo'limi ("Qabul qilish mezonlari")
bo'yicha topshirish uchun tayyorlangan.

Qabul qilish mezonlari holati:

| Mezon | Holat |
|---|---|
| Barcha sahifalar TZ'dagi funksionallikka mos | ✅ |
| Chrome, Safari, Yandex Browser va mobil qurilmalarda to'g'ri ko'rinadi | ✅ |
| Formalar ishlaydi, CRM/Telegramga signal yuboradi | ✅ (token qo'yilgandan keyin) |
| SSL sertifikat | ⏳ Hostingda o'rnatiladi (`DEPLOY.md`, A-variant 5-qadam) |
| SEO: meta-teglar, sitemap.xml, robots.txt | ✅ |
| Google PageSpeed 90+ | ⏳ Haqiqiy fotosuratlar qo'yilgandan keyin qayta o'lchansin |

> PageSpeed bahosi ko'p jihatdan rasm hajmiga bog'liq. Professional
> fotosuratlar qo'yilganda ularni siqish tavsiya etiladi (JPEG sifat 70–75,
> kenglik 2000px dan oshmasin). Next.js qolganini o'zi bajaradi —
> AVIF/WebP formatlariga o'giradi va ekran o'lchamiga moslaydi.
