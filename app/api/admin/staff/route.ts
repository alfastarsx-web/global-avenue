import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeStaff } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string {
  return String(v ?? '').trim();
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const rows = await prisma.staff.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(serializeStaff));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const name = str(body.name);
  if (!name) return NextResponse.json({ error: 'name_required' }, { status: 400 });

  const row = await prisma.staff.create({
    data: {
      name,
      phone: str(body.phone),
      role: str(body.role) || 'sotuv',
      active: body.active !== false && body.active !== 'false',
    },
  });
  return NextResponse.json(serializeStaff(row), { status: 201 });
}
