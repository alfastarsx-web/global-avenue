import type { NextConfig } from 'next';

/**
 * Sayt ikki rejimda quriladi:
 *
 *  1. Server (asosiy)  — `npm run build` → middleware, /api/lead, rasm
 *                        optimizatsiyasi va HTTP sarlavhalari ishlaydi.
 *  2. Statik (demo)    — `STATIC_EXPORT=1 npm run build` → `out/` papkasi,
 *                        GitHub Pages uchun. Bu rejimda Next.js middleware,
 *                        API route va headers()'ni qo'llab-quvvatlamaydi,
 *                        shuning uchun ular o'chiriladi (build-static.sh ga qarang).
 */
const isExport = process.env.STATIC_EXPORT === '1';
const basePath = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  ...(isExport
    ? {
        output: 'export' as const,
        trailingSlash: true,
        basePath: basePath || undefined,
        images: {
          // Statik eksportda server tomonidagi optimizator yo'q.
          // `unoptimized` o'rniga custom loader — u basePath'ni qo'shadi
          // (unoptimized rejimi buni qilmaydi va rasmlar 404 beradi).
          loader: 'custom' as const,
          loaderFile: './lib/image-loader.ts',
        },
      }
    : {
        images: {
          formats: ['image/avif', 'image/webp'] as ('image/avif' | 'image/webp')[],
          // Optimallashtirilgan nusxa 1 kun saqlanadi — kontent menejeri
          // faylni almashtirsa, sayt bir kun ichida yangilanadi
          minimumCacheTTL: 86400,
        },
        async headers() {
          return [
            {
              source: '/:path*',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
              ],
            },
            {
              // MUHIM: `immutable` emas — rasm fayllari o'sha nom bilan
              // almashtirilishi mumkin (kompaniyaning o'z fotolari qo'yilganda).
              // 1 soat kesh + fonda yangilash: tez ham, yangilanadigan ham.
              source: '/img/:path*',
              headers: [
                { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
