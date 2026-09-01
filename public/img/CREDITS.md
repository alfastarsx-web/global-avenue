# Rasmlar manbai

Saytdagi barcha fotosuratlar **Unsplash**dan olingan.
Litsenziya: [Unsplash License](https://unsplash.com/license) — bepul yuklab olish,
tijorat maqsadida ishlatish va o'zgartirish mumkin, atribut (muallifni ko'rsatish) talab qilinmaydi.

## Muhim eslatma

Bu rasmlar **vaqtinchalik** — kompaniya uslubiga (Instagram @global_avenue.uz:
oltin soatdagi qurilish kadrlari, krem-bej fasadlar, kranlar) mos ravishda tanlangan.

TZ 10-bo'lim talab qilganidek, ishga tushirishdan oldin ular
**Global Avenue'ning o'z professional foto/video kontenti** bilan almashtirilishi kerak:

| Papka | Nima kerak |
|---|---|
| `photos/hero.jpg` | Dron yoki golden-hour kadr — asosiy ob'ekt |
| `projects/*.jpg` | Har bir majmuaning render va real fotosi (5 tadan) |
| `progress/p*.jpg` | Haftalik qurilish hisoboti kadrlari |
| `blog/post-*.jpg` | Maqola muqovalari |
| `plans/plan-*.svg` | **Arxitektor bergan haqiqiy planirovkalar** bilan almashtirilsin |

Rasm o'lchamlari: hero 16:9 (2000px), qolganlari 16:10 (1400–1600px), JPEG q72.
Next.js `<Image>` ularni avtomatik AVIF/WebP'ga o'giradi va responsiv o'lchamlarga bo'ladi.

## Fayllar ro'yxati

Har bir faylning Unsplash ID'si va tavsifi — `scripts/photos.txt` da saqlangan.
