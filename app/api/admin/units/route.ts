import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeUnit } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function num(v: unknown): number | null {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function str(v: unknown): string {
  return String(v ?? '').trim();
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.unit.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(serializeUnit));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const projectId = str(body.project_id);
  if (!projectId) return NextResponse.json({ error: 'project_id_required' }, { status: 400 });

  const row = await prisma.unit.create({
    data: {
      projectId,
      projectName: str(body.project_name),
      block: str(body.block),
      floor: num(body.floor),
      rooms: num(body.rooms),
      area: num(body.area),
      price: num(body.price),
      status: str(body.status) || 'bosh',
    },
  });
  return NextResponse.json(serializeUnit(row), { status: 201 });
}
