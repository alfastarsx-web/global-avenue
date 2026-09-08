import { prisma } from '@/lib/prisma';
import type { Post } from '@/lib/data/content';
import { posts as staticPosts, getPost as staticGetPost, postCategories } from '@/lib/data/content';

const isStatic = process.env.STATIC_EXPORT === '1';

export { postCategories };

function safeParse<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function toPost(row: {
  slug: string;
  category: string;
  date: Date | null;
  readMinutes: number | null;
  coverImage: string | null;
  titleUz: string | null;
  titleRu: string | null;
  excerptUz: string | null;
  excerptRu: string | null;
  bodyUz: string;
  bodyRu: string;
}): Post {
  return {
    slug: row.slug,
    category: row.category as Post['category'],
    date: (row.date ?? new Date()).toISOString().slice(0, 10),
    readMinutes: row.readMinutes ?? 1,
    cover: row.coverImage ?? '',
    title: { uz: row.titleUz ?? '', ru: row.titleRu ?? '' },
    excerpt: { uz: row.excerptUz ?? '', ru: row.excerptRu ?? '' },
    body: {
      uz: safeParse<string[]>(row.bodyUz, []),
      ru: safeParse<string[]>(row.bodyRu, []),
    },
  };
}

export async function getPosts(): Promise<Post[]> {
  if (isStatic) return staticPosts;
  const rows = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { date: 'desc' },
  });
  return rows.map(toPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  if (isStatic) return staticGetPost(slug);
  const row = await prisma.post.findUnique({ where: { slug } });
  return row && row.status === 'published' ? toPost(row) : undefined;
}
