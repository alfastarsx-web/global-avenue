import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeSettings } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string {
  return String(v ?? '').trim();
}

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const row =
    (await prisma.settings.findUnique({ where: { id: 1 } })) ??
    (await prisma.settings.create({ data: { id: 1 } }));
  return NextResponse.json(serializeSettings(row));
}

export async function PUT(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const data = {
    companyName: str(body.company_name) || 'Global Avenue',
    phone: str(body.phone),
    address: str(body.address),
    instagram: str(body.instagram),
    telegram: str(body.telegram),
    hours: str(body.hours),
  };
  const row = await prisma.settings.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });
  return NextResponse.json(serializeSettings(row));
}
