import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeUnit } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function num(v: unknown): number | null | undefined {
  if (v === undefined) return undefined;
  if (v === '' || v === null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function str(v: unknown): string | undefined {
  if (v === undefined) return undefined;
  return String(v ?? '').trim();
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const row = await prisma.unit.update({
    where: { id },
    data: {
      projectId: str(body.project_id),
      projectName: str(body.project_name),
      block: str(body.block),
      floor: num(body.floor),
      rooms: num(body.rooms),
      area: num(body.area),
      price: num(body.price),
      status: str(body.status),
    },
  });
  return NextResponse.json(serializeUnit(row));
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  await prisma.unit.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
