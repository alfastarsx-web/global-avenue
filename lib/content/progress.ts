import { prisma } from '@/lib/prisma';
import type { ProgressUpdate } from '@/lib/data/content';
import { progressUpdates as staticProgress } from '@/lib/data/content';

const isStatic = process.env.STATIC_EXPORT === '1';

export async function getProgressUpdates(): Promise<ProgressUpdate[]> {
  if (isStatic) return staticProgress;
  const rows = await prisma.progressUpdate.findMany({
    include: { project: true },
    orderBy: { date: 'desc' },
  });
  return rows.map((r) => ({
    id: r.id,
    projectSlug: r.project.slug,
    date: r.date.toISOString().slice(0, 10),
    image: r.image ?? '',
    title: { uz: r.titleUz ?? '', ru: r.titleRu ?? '' },
    text: { uz: r.textUz ?? '', ru: r.textRu ?? '' },
    percent: r.percent,
  }));
}
