import { prisma } from '@/lib/prisma';
import type { TeamMember } from '@/lib/data/content';
import { team as staticTeam } from '@/lib/data/content';

const isStatic = process.env.STATIC_EXPORT === '1';

export async function getTeam(): Promise<TeamMember[]> {
  if (isStatic) return staticTeam;
  const rows = await prisma.teamMember.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
  return rows.map((t) => ({
    name: t.name,
    role: { uz: t.roleUz ?? '', ru: t.roleRu ?? '' },
    initials: t.initials ?? '',
  }));
}
