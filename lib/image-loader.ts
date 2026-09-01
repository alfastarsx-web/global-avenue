/**
 * Statik eksport (GitHub Pages) uchun rasm loader'i.
 *
 * Nega kerak: `images.unoptimized: true` rejimida Next.js `basePath`ni
 * rasm manziliga qo'shmaydi — natijada /global-avenue/... ostida
 * joylashgan saytda barcha rasmlar 404 beradi. Bu loader basePath'ni
 * o'zi qo'shadi. Optimizatsiya qilinmaydi (statik hostingda server yo'q),
 * shuning uchun width/quality e'tiborga olinmaydi.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function staticImageLoader({ src }: { src: string }): string {
  if (/^https?:\/\//.test(src) || src.startsWith(BASE_PATH)) return src;
  return `${BASE_PATH}${src}`;
}
