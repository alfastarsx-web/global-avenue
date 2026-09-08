import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeProgress } from '@/lib/adminSerialize';

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

  const row = await prisma.progressUpdate.update({
    where: { id },
    data: {
      projectId: str(body.project_id),
      projectName: str(body.project_name),
      date: body.date ? new Date(body.date) : undefined,
      image: orNull(body.image),
      titleUz: orNull(body.title_uz),
      titleRu: orNull(body.title_ru),
      textUz: orNull(body.text_uz),
      textRu: orNull(body.text_ru),
      percent: int(body.percent),
    },
  });
  return NextResponse.json(serializeProgress(row));
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  await prisma.progressUpdate.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
