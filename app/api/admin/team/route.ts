import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeTeamMember } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string {
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null {
  const s = str(v);
  return s || null;
}
function int(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : 0;
}
function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase();
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.teamMember.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });
  return NextResponse.json(rows.map(serializeTeamMember));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const name = str(body.name);
  if (!name) return NextResponse.json({ error: 'name_required' }, { status: 400 });

  const row = await prisma.teamMember.create({
    data: {
      name,
      roleUz: orNull(body.role_uz),
      roleRu: orNull(body.role_ru),
      initials: orNull(body.initials) || initialsOf(name),
      order: int(body.order),
      active: body.active !== false && body.active !== 'false',
    },
  });
  return NextResponse.json(serializeTeamMember(row), { status: 201 });
}
