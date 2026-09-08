import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeVacancy } from '@/lib/adminSerialize';

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
function json(v: unknown): string {
  return JSON.stringify(Array.isArray(v) ? v : []);
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.vacancy.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });
  return NextResponse.json(rows.map(serializeVacancy));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const titleUz = str(body.title_uz);
  if (!titleUz) return NextResponse.json({ error: 'title_required' }, { status: 400 });

  const row = await prisma.vacancy.create({
    data: {
      titleUz,
      titleRu: orNull(body.title_ru),
      locationUz: orNull(body.location_uz),
      locationRu: orNull(body.location_ru),
      typeUz: orNull(body.type_uz),
      typeRu: orNull(body.type_ru),
      requirements: json(body.requirements),
      order: int(body.order),
      active: body.active !== false && body.active !== 'false',
    },
  });
  return NextResponse.json(serializeVacancy(row), { status: 201 });
}
