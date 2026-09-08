import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeVacancy } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string | undefined {
  if (v === undefined) return undefined;
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null | undefined {
  if (v === undefined) return undefined;
  const s = String(v ?? '').trim();
  return s || null;
}
function int(v: unknown): number | undefined {
  if (v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : undefined;
}
function json(v: unknown): string | undefined {
  if (v === undefined) return undefined;
  return JSON.stringify(Array.isArray(v) ? v : []);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const row = await prisma.vacancy.update({
    where: { id },
    data: {
      titleUz: orNull(body.title_uz),
      titleRu: orNull(body.title_ru),
      locationUz: orNull(body.location_uz),
      locationRu: orNull(body.location_ru),
      typeUz: orNull(body.type_uz),
      typeRu: orNull(body.type_ru),
      requirements: json(body.requirements),
      order: int(body.order),
      active: body.active === undefined ? undefined : body.active === true || body.active === 'true',
    },
  });
  return NextResponse.json(serializeVacancy(row));
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  await prisma.vacancy.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
