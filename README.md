# Global Avenue — korporativ veb-sayt

Samarqand shahridagi "Global Avenue" qurilish-devoloper kompaniyasi uchun
korporativ sayt. [Texnik topshiriq (TZ) v1.0](#tz-qamrovi) asosida qurilgan.

**Stack:** Next.js 16 (App Router, RSC) · TypeScript · CSS (build-step'siz, framework'siz)
· ikki til (uz/ru) · build step'da statik generatsiya

---

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # qiymatlarni to'ldiring
npm run dev                  # http://localhost:3100
```

Ishlab chiqarish uchun:

```bash
npm run build && npm start
```

Tekshiruvlar:

```bash
npm run check
```

## Muhit o'zgaruvchilari (.env.local)

| O'zgaruvchi | Vazifasi | Majburiymi |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap, OG havolalari uchun asosiy manzil | Ha (prodda) |
| `TELEGRAM_BOT_TOKEN` | Yangi ariza kelganda sotuv bo'limiga xabar | Yo'q |
| `TELEGRAM_CHAT_ID` | Xabar yuboriladigan chat/guruh | Yo'q |
| `CRM_WEBHOOK_URL` | Bitrix24 / amoCRM inbound webhook | Yo'q |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | Yo'q |
| `NEXT_PUBLIC_YM_ID` | Yandex Metrika | Yo'q |

Telegram va CRM sozlanmagan bo'lsa ham forma ishlaydi: har bir ariza
`data/leads.jsonl` fayliga yozib boriladi, shuning uchun lid yo'qolmaydi.

---

## Tuzilma

```
app/
  [lang]/                 # uz | ru — root layout shu yerda
    page.tsx              # Bosh sahifa
    about/                # Kompaniya haqida (tarix, litsenziya, jamoa)
    projects/             # Katalog + filtrlar
      [slug]/             # TJM sahifasi (galereya, planirovka, narx, xarita)
    progress/             # "Sirsiz qurilish" — hisobot lentasi
    reviews/              # Video va matnli sharhlar
    blog/[slug]/          # Yangiliklar va maqolalar
    calculator/           # Muddatli to'lov / ipoteka kalkulyatori
    contact/  careers/
  api/lead/route.ts       # Ariza qabul qilish → Telegram + CRM + arxiv
  sitemap.ts  robots.ts   # SEO
  globals.css             # Dizayn tokenlari (rang, tipografika, ritm)
  components.css          # Komponent uslublari
components/               # Header, Footer, LeadForm, PlanSelector, Gallery, ...
lib/
  i18n/{uz,ru}.ts         # Barcha matnlar — tarjima shu yerda
  data/site.ts            # Kontaktlar, ijtimoiy tarmoqlar, formatlash
  data/projects.ts        # TJM'lar: narx, planirovka, bosqich, pasport
  data/content.ts         # Blog, hisobotlar, sharhlar, jamoa, vakansiya
public/img/               # Fotosuratlar (CREDITS.md ga qarang)
scripts/                  # photos.txt (rasm manbalari), gen_plans.py
```

### Kontentni yangilash (CMS'gacha)

Hozircha kontent TypeScript fayllarida — CMS keyingi bosqichda ulanadi
(TZ 11-bo'lim). Shu paytgacha:

- **Narx / xonadon holati** → `lib/data/projects.ts`
- **Qurilish hisoboti** → `lib/data/content.ts` → `progressUpdates`
- **Maqola** → `lib/data/content.ts` → `posts`
- **Matnlar / tarjima** → `lib/i18n/uz.ts` va `lib/i18n/ru.ts`
- **Telefon, manzil, ijtimoiy tarmoq** → `lib/data/site.ts`

`lib/i18n/ru.ts` `Dictionary` tipiga bog'langan — o'zbekchada yangi kalit
qo'shsangiz, ruschada ham talab qilinadi (TypeScript xato beradi). Shu tufayli
tarjima tushib qolmaydi.

---

## TZ qamrovi

| TZ bo'limi | Holat |
|---|---|
| 5. Sitemap (10 bo'lim) | ✅ Barchasi, ikki tilda (40 URL) |
| 6.1 Bosh sahifa (hero, statistika, USP, lenta, sharh, xarita, tez aloqa) | ✅ |
| 6.2 TJM sahifasi (galereya, planirovka tanlovchi, narx, bosqich, pasport) | ✅ |
| 6.2 360° virtual tur | ⏳ Joy ajratilgan, provayder ulanishi kerak |
| 6.3 Ariza formasi → Telegram + CRM | ✅ (token/webhook qo'yilishi kerak) |
| 6.3 Mijozga avtomatik SMS/Telegram tasdiq | ⏳ SMS provayder shartnomasi kerak |
| 7. Dizayn: premium, mobile-first, responsiv | ✅ |
| 8. Next.js, SSR/SSG, SSL, tezlik, SEO | ✅ (SSL — hostingda) |
| 8. CMS / admin panel | ⏳ Keyingi bosqich (11-bo'lim) |
| 9. GA4 / Metrika / GTM / Pixel | ✅ GTM + Metrika ulangan (ID kerak) |
| 9. Instagram lentasi | ⏳ Blok tayyor, rasmiy API tokeni kerak |
| 9. Xarita | ⏳ Blok va koordinatalar tayyor, Yandex API kaliti kerak |
| 10. Ikki til (uz/ru) | ✅ To'liq |
| 10. Professional foto/video | ⚠️ Vaqtincha Unsplash — `public/img/CREDITS.md` |
| 11. Boshqaruv paneli | ⏳ Keyingi bosqich |

**Izoh:** saytdagi loyiha ma'lumotlari (narx, maydon, muddat, statistika,
sharhlar, jamoa) — namoyish uchun. Ishga tushirishdan oldin kompaniyadan
haqiqiy ma'lumotlar olinishi shart.

Instagram'dan tasdiqlangan: telefon `+998 66 230 00 08`,
Telegram `t.me/GlobalAvenue_uz`, obunachi 64k+, shior "Sifat foydadan ustun!",
loyiha nomlari (IZMIR, Marocco, Ashgabad).
WhatsApp raqami taxminiy — tasdiqlanishi kerak (`lib/data/site.ts` da TODO).

---

## Arxitektura qarorlari

**Nega `[lang]` segmenti va middleware?** Har bir sahifa ikki tilda alohida
URL'ga ega (`/uz/projects`, `/ru/projects`) — bu SEO uchun hreflang va
canonical'ni to'g'ri berish imkonini beradi. `middleware.ts` til prefiksisiz
kelgan so'rovni `Accept-Language` va cookie asosida yo'naltiradi.

**Nega deyarli hamma narsa server komponenti?** Interaktivlik faqat kerakli
joyda mijoz komponentida (`Header`, `LeadForm`, `PlanSelector`,
`PaymentCalculator`, `Gallery`, `ProjectsExplorer`, `ProgressFeed`,
`ReviewsSlider`, `QuickContact`). Qolgani serverda render qilinadi — JS hajmi
kichik, PageSpeed yuqori.

**Rasm keshi.** `/img/*` uchun `max-age=3600 + stale-while-revalidate` qo'yilgan,
`immutable` emas: kontent menejeri faylni o'sha nom bilan almashtirsa,
foydalanuvchilar bir soat ichida yangisini ko'radi.

**Lid yo'qolmasligi.** `/api/lead` avval faylga yozadi, keyin Telegram va CRM'ga
`Promise.allSettled` bilan yuboradi — tashqi xizmat ishlamay qolsa ham
ariza saqlanadi. IP bo'yicha daqiqasiga 5 ta so'rov cheklovi bor (spam-bot).

## Deploy

Sayt Node.js server talab qiladi (middleware + `/api/lead`), shuning uchun
statik eksport emas:

```bash
npm ci && npm run build && npm start   # 3100-port
```

Old tomonda nginx: SSL, gzip/brotli va `proxy_pass http://127.0.0.1:3100`.
