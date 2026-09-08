#!/usr/bin/env bash
#
# GitHub Pages uchun statik demo build.
#
# Next.js `output: 'export'` rejimida middleware va API route'ni
# qo'llab-quvvatlamaydi, shuning uchun ularni build vaqtida vaqtincha
# chetga olib turamiz va oxirida joyiga qaytaramiz. Manba kod o'zgarmaydi —
# serverli (to'liq funksional) build shu holicha ishlayveradi.
#
set -euo pipefail

cd "$(dirname "$0")/.."

TMP="$(mktemp -d)"

# Bazaga bog'liq sahifalar to'liq serverda `force-dynamic` (admin o'zgarishi
# darhol ko'rinishi uchun) — lekin `output: 'export'` bunday sahifalarni
# qo'llab-quvvatlamaydi, shuning uchun build vaqtida vaqtincha `force-static`
# ga almashtiramiz (bu rejimda ular baribir statik lib/data fayllaridan o'qiydi).
DYNAMIC_PAGES=$(grep -rl "export const dynamic = 'force-dynamic';" "app/[lang]" app/sitemap.ts --include='*.ts' --include='*.tsx')

restore() {
  [ -f "$TMP/middleware.ts" ] && mv "$TMP/middleware.ts" middleware.ts
  [ -d "$TMP/api" ] && mv "$TMP/api" app/api
  for f in $DYNAMIC_PAGES; do
    sed -i "s/export const dynamic = 'force-static';/export const dynamic = 'force-dynamic';/" "$f"
  done
  rm -rf "$TMP"
}
trap restore EXIT

echo "→ middleware va /api statik build uchun vaqtincha chetga olinmoqda"
[ -f middleware.ts ] && mv middleware.ts "$TMP/middleware.ts"
[ -d app/api ] && mv app/api "$TMP/api"

echo "→ bazaga bog'liq sahifalar vaqtincha force-static qilinmoqda"
for f in $DYNAMIC_PAGES; do
  sed -i "s/export const dynamic = 'force-dynamic';/export const dynamic = 'force-static';/" "$f"
done

echo "→ next build (STATIC_EXPORT=1)"
STATIC_EXPORT=1 npx next build

echo "→ out/ papkasi to'ldirilmoqda"

# Jekyll `_next` papkasini e'tiborsiz qoldirmasligi uchun
touch out/.nojekyll

# `/` manzili uchun til tanlash sahifasi.
# Serverli rejimda buni middleware qiladi; statikda — mana bu sahifa.
cat > out/index.html <<HTML
<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Global Avenue — Samarqandda ishonchli qurilish</title>
<link rel="canonical" href="${SITE_URL:-}/uz/">
<meta name="robots" content="noindex">
<script>
  // Brauzer tilini hisobga olib yo'naltiramiz
  (function () {
    var lang = (navigator.language || 'uz').toLowerCase();
    var target = lang.indexOf('ru') === 0 ? 'ru' : 'uz';
    location.replace('${BASE_PATH:-}/' + target + '/');
  })();
</script>
<style>
  body{margin:0;display:grid;place-items:center;min-height:100vh;background:#10151c;color:#fff;
       font-family:system-ui,sans-serif;text-align:center;padding:24px}
  a{color:#c69a33;font-weight:600}
</style>
</head>
<body>
  <div>
    <p>Global Avenue</p>
    <p><a href="${BASE_PATH:-}/uz/">O'zbekcha</a> &nbsp;·&nbsp; <a href="${BASE_PATH:-}/ru/">Русский</a></p>
  </div>
</body>
</html>
HTML

# GitHub Pages topilmagan manzilda 404.html ni ko'rsatadi
if [ ! -f out/404.html ]; then
  cp out/index.html out/404.html
fi

echo "✓ tayyor: out/ ($(find out -type f | wc -l | tr -d ' ') ta fayl)"
