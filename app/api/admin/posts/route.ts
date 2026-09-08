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
function int(v: unknown): number | null {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}
function paragraphs(v: unknown): string {
  if (Array.isArray(v)) return JSON.stringify(v.map((x) => String(x)));
  if (typeof v === 'string' && v.trim()) return JSON.stringify([v.trim()]);
  return '[]';
}
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(serializePost));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const titleUz = str(body.title_uz);
  if (!titleUz) return NextResponse.json({ error: 'title_required' }, { status: 400 });

  let slug = str(body.slug) || slugify(titleUz);
  const clash = await prisma.post.findUnique({ where: { slug } });
  if (clash) slug = `${slug}-${Date.now().toString(36)}`;

  const row = await prisma.post.create({
    data: {
      slug,
      category: str(body.category) || 'news',
      titleUz,
      titleRu: orNull(body.title_ru),
      excerptUz: orNull(body.excerpt_uz),
      excerptRu: orNull(body.excerpt_ru),
      bodyUz: paragraphs(body.body_uz),
      bodyRu: paragraphs(body.body_ru),
      author: orNull(body.author),
      status: str(body.status) || 'draft',
      coverImage: orNull(body.cover_image),
      readMinutes: int(body.read_minutes),
      date: body.date ? new Date(body.date) : new Date(),
      publishedAt: new Date(),
    },
  });
  return NextResponse.json(serializePost(row), { status: 201 });
}
