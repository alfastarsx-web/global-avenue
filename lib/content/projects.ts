import { prisma } from '@/lib/prisma';
import type { Project, Plan } from '@/lib/data/projects';
import {
  projects as staticProjects,
  getProject as staticGetProject,
  minPrice,
} from '@/lib/data/projects';

export { minPrice };

const isStatic = process.env.STATIC_EXPORT === '1';

const planStatusFromDb: Record<string, Plan['status']> = {
  bosh: 'available',
  band: 'reserved',
  sotilgan: 'sold',
};

type ProjectWithUnits = Awaited<ReturnType<typeof fetchProjectsWithUnits>>[number];

async function fetchProjectsWithUnits() {
  return prisma.project.findMany({
    include: { units: true },
    orderBy: { createdAt: 'asc' },
  });
}

function toProject(row: ProjectWithUnits): Project {
  return {
    slug: row.slug,
    name: row.name,
    tagline: { uz: row.taglineUz ?? '', ru: row.taglineRu ?? '' },
    status: row.status as Project['status'],
    district: { uz: row.districtUz ?? '', ru: row.districtRu ?? '' },
    districtKey: row.districtKey ?? '',
    address: { uz: row.addressUz ?? '', ru: row.addressRu ?? '' },
    pricePerSqm: row.pricePerSqm ?? 0,
    handover: { uz: row.handoverUz ?? '', ru: row.handoverRu ?? '' },
    handoverYear: row.handoverYear ?? 0,
    floors: row.floors ?? 0,
    apartments: row.apartments ?? 0,
    blocks: row.blocks ?? 0,
    roomOptions: safeParse<number[]>(row.roomOptions, []),
    cover: row.cover ?? '',
    gallery: safeParse<string[]>(row.gallery, []),
    description: { uz: row.descriptionUz ?? '', ru: row.descriptionRu ?? '' },
    highlights: safeParse<Project['highlights']>(row.highlights, []),
    infrastructure: safeParse<Project['infrastructure']>(row.infrastructure, []),
    schedule: safeParse<Project['schedule']>(row.schedule, []),
    passport: safeParse<Project['passport']>(row.passport, []),
    geo: { lat: row.geoLat ?? 0, lng: row.geoLng ?? 0 },
    featured: row.featured,
    plans: row.units.map((u) => ({
      id: u.id,
      rooms: u.rooms ?? 0,
      area: u.area ?? 0,
      floor: u.floor ?? 0,
      price: u.price ?? 0,
      status: planStatusFromDb[u.status] ?? 'available',
      image: u.image ?? '',
    })),
  };
}

function safeParse<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (isStatic) return staticProjects;
  const rows = await fetchProjectsWithUnits();
  return rows.map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (isStatic) return staticGetProject(slug);
  const row = await prisma.project.findUnique({ where: { slug }, include: { units: true } });
  return row ? toProject(row) : undefined;
}

export function computeDistricts(projects: Project[]) {
  return Array.from(new Map(projects.map((p) => [p.districtKey, p.district])).entries()).map(
    ([key, label]) => ({ key, label }),
  );
}
