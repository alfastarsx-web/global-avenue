import { prisma } from '@/lib/prisma';
import type { Vacancy } from '@/lib/data/content';
import { vacancies as staticVacancies } from '@/lib/data/content';

const isStatic = process.env.STATIC_EXPORT === '1';

function safeParse<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function getVacancies(): Promise<Vacancy[]> {
  if (isStatic) return staticVacancies;
  const rows = await prisma.vacancy.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
  return rows.map((v) => ({
    id: v.id,
    title: { uz: v.titleUz ?? '', ru: v.titleRu ?? '' },
    location: { uz: v.locationUz ?? '', ru: v.locationRu ?? '' },
    type: { uz: v.typeUz ?? '', ru: v.typeRu ?? '' },
    requirements: safeParse<Vacancy['requirements']>(v.requirements, []),
  }));
}
