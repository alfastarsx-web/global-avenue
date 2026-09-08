import { NextResponse } from 'next/server';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  return NextResponse.json({ ok: true });
}
