import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializePost } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string {
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null {
  const s = str(v);
  return s || null;
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(serializePost));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const title = str(body.title);
  if (!title) return NextResponse.json({ error: 'title_required' }, { status: 400 });

  const row = await prisma.post.create({
    data: {
      title,
      excerpt: str(body.excerpt),
      body: str(body.body),
      author: str(body.author),
      status: str(body.status) || 'draft',
      coverImage: orNull(body.cover_image),
      publishedAt: new Date(),
    },
  });
  return NextResponse.json(serializePost(row), { status: 201 });
}
