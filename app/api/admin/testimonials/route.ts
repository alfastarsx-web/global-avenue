import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeTestimonial } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string {
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null {
  const s = str(v);
  return s || null;
}
function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 5;
}
function int(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.testimonial.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
  return NextResponse.json(rows.map(serializeTestimonial));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const clientName = str(body.client_name);
  if (!clientName) return NextResponse.json({ error: 'client_name_required' }, { status: 400 });

  const textUz = orNull(body.text_uz ?? body.text);
  const row = await prisma.testimonial.create({
    data: {
      clientName,
      projectId: orNull(body.project_id),
      projectName: str(body.project_name),
      roleUz: orNull(body.role_uz),
      roleRu: orNull(body.role_ru),
      rating: num(body.rating),
      source: str(body.source),
      youtubeUrl: orNull(body.youtube_url),
      hasVideo: body.has_video === true || body.has_video === 'true' || !!body.youtube_url,
      textUz,
      textRu: orNull(body.text_ru),
      status: str(body.status) || 'published',
      order: int(body.order),
    },
  });
  return NextResponse.json(serializeTestimonial(row), { status: 201 });
}
