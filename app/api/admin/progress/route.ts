import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeProgress } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string {
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null {
  const s = str(v);
  return s || null;
}
function int(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.progressUpdate.findMany({ orderBy: { date: 'desc' } });
  return NextResponse.json(rows.map(serializeProgress));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const projectId = str(body.project_id);
  const titleUz = str(body.title_uz);
  if (!projectId) return NextResponse.json({ error: 'project_id_required' }, { status: 400 });
  if (!titleUz) return NextResponse.json({ error: 'title_required' }, { status: 400 });

  const row = await prisma.progressUpdate.create({
    data: {
      projectId,
      projectName: str(body.project_name),
      date: body.date ? new Date(body.date) : new Date(),
      image: orNull(body.image),
      titleUz,
      titleRu: orNull(body.title_ru),
      textUz: orNull(body.text_uz),
      textRu: orNull(body.text_ru),
      percent: int(body.percent),
    },
  });
  return NextResponse.json(serializeProgress(row), { status: 201 });
}
