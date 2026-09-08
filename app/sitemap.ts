import type { MetadataRoute } from 'next';

import { locales } from '@/lib/i18n/config';
import { site } from '@/lib/data/site';
import { getProjects } from '@/lib/content/projects';
import { getPosts } from '@/lib/content/posts';

const staticPaths = [
  '',
  '/projects',
  '/about',
  '/progress',
  '/reviews',
  '/blog',
  '/calculator',
  '/contact',
  '/careers',
];

// To'liq serverda har so'rovda yangilanadi (admin qo'shgan loyiha/maqola darhol
// ko'rinishi uchun); statik eksport (GitHub Pages demo) uchun build vaqtida yaratiladi
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

  const alt = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((l) => [l === 'uz' ? 'uz-UZ' : 'ru-RU', `${site.url}/${l}${path}`]),
    ),
  });

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : path === '/projects' ? 0.9 : 0.7,
        alternates: alt(path),
      });
    }

    for (const p of projects) {
      entries.push({
        url: `${site.url}/${locale}/projects/${p.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: alt(`/projects/${p.slug}`),
      });
    }

    for (const p of posts) {
      entries.push({
        url: `${site.url}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: alt(`/blog/${p.slug}`),
      });
    }
  }

  return entries;
}
