import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeLead } from '@/lib/adminSerialize';

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
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(rows.map(serializeLead));
}

export async function POST(req: Request) {
  if (!hasValidSession(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const name = str(body.name);
  if (!name) return NextResponse.json({ error: 'name_required' }, { status: 400 });

  const row = await prisma.lead.create({
    data: {
      name,
      phone: str(body.phone),
      projectId: orNull(body.project_id),
      projectName: str(body.project_name),
      status: str(body.status) || 'yangi',
      assignedTo: orNull(body.assigned_to),
      nextFollowUp: orNull(body.next_follow_up),
      source: str(body.source),
      interest: str(body.interest),
      comment: str(body.comment),
      activity: JSON.stringify(Array.isArray(body.activity) ? body.activity : []),
    },
  });
  return NextResponse.json(serializeLead(row), { status: 201 });
}
