import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeTestimonial } from '@/lib/adminSerialize';

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
function num(v: unknown): number | undefined {
  if (v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
function int(v: unknown): number | undefined {
  if (v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : undefined;
}
function bool(v: unknown): boolean | undefined {
  if (v === undefined) return undefined;
  return v === true || v === 'true';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const row = await prisma.testimonial.update({
    where: { id },
    data: {
      clientName: str(body.client_name),
      projectId: orNull(body.project_id),
      projectName: str(body.project_name),
      roleUz: orNull(body.role_uz),
      roleRu: orNull(body.role_ru),
      rating: num(body.rating),
      source: str(body.source),
      youtubeUrl: orNull(body.youtube_url),
      hasVideo: bool(body.has_video),
      textUz: orNull(body.text_uz ?? body.text),
      textRu: orNull(body.text_ru),
      status: str(body.status),
      order: int(body.order),
    },
  });
  return NextResponse.json(serializeTestimonial(row));
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
