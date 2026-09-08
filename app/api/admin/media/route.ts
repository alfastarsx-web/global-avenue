import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeMedia } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string {
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null {
  const s = str(v);
  return s || null;
}
function num(v: unknown): number | null {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(serializeMedia));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const imageUrl = str(body.image_url);
  if (!imageUrl) return NextResponse.json({ error: 'image_url_required' }, { status: 400 });

  const row = await prisma.media.create({
    data: {
      caption: str(body.caption),
      category: str(body.category) || 'other',
      imageUrl,
      width: num(body.width),
      height: num(body.height),
      projectId: orNull(body.project_id),
      projectName: str(body.project_name),
    },
  });
  return NextResponse.json(serializeMedia(row), { status: 201 });
}
