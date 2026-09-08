import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeProject } from '@/lib/adminSerialize';

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
  const rows = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(serializeProject));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const name = str(body.name);
  if (!name) return NextResponse.json({ error: 'name_required' }, { status: 400 });

  const row = await prisma.project.create({
    data: {
      name,
      location: str(body.location),
      status: str(body.status) || 'qurilmoqda',
      delivery: str(body.delivery),
      priceFrom: num(body.price_from),
      priceTo: num(body.price_to),
      description: str(body.description),
    },
  });
  return NextResponse.json(serializeProject(row), { status: 201 });
}
