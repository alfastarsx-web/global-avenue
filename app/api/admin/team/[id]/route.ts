import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeTeamMember } from '@/lib/adminSerialize';

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

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const row = await prisma.teamMember.update({
    where: { id },
    data: {
      name: str(body.name),
      roleUz: orNull(body.role_uz),
      roleRu: orNull(body.role_ru),
      initials: orNull(body.initials),
      order: int(body.order),
      active: body.active === undefined ? undefined : body.active === true || body.active === 'true',
    },
  });
  return NextResponse.json(serializeTeamMember(row));
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
