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

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(serializeTestimonial));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const clientName = str(body.client_name);
  if (!clientName) return NextResponse.json({ error: 'client_name_required' }, { status: 400 });

  const row = await prisma.testimonial.create({
    data: {
      clientName,
      projectId: orNull(body.project_id),
      projectName: str(body.project_name),
      rating: num(body.rating),
      source: str(body.source),
      youtubeUrl: orNull(body.youtube_url),
      text: str(body.text),
      status: str(body.status) || 'published',
    },
  });
  return NextResponse.json(serializeTestimonial(row), { status: 201 });
}
