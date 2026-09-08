import { prisma } from '@/lib/prisma';
import type { Review } from '@/lib/data/content';
import { reviews as staticReviews } from '@/lib/data/content';

const isStatic = process.env.STATIC_EXPORT === '1';

export async function getReviews(): Promise<Review[]> {
  if (isStatic) return staticReviews;
  const rows = await prisma.testimonial.findMany({
    where: { status: 'published' },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.clientName,
    role: { uz: r.roleUz ?? '', ru: r.roleRu ?? '' },
    project: r.projectName ?? '',
    rating: r.rating,
    text: { uz: r.textUz ?? '', ru: r.textRu ?? '' },
    hasVideo: r.hasVideo,
  }));
}

export async function getAverageRating(): Promise<number> {
  const reviews = await getReviews();
  if (!reviews.length) return 0;
  return Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
}
