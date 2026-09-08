import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeLead } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function str(v: unknown): string | undefined {
  if (v === undefined) return undefined;
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null | undefined {
  if (v === undefined) return undefined;
  const s = String(v ?? '').trim();
  return s || null;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const row = await prisma.lead.update({
    where: { id },
    data: {
      name: str(body.name),
      phone: str(body.phone),
      projectId: orNull(body.project_id),
      projectName: str(body.project_name),
      status: str(body.status),
      assignedTo: orNull(body.assigned_to),
      nextFollowUp: orNull(body.next_follow_up),
      source: str(body.source),
      interest: str(body.interest),
      comment: str(body.comment),
      activity: Array.isArray(body.activity) ? JSON.stringify(body.activity) : undefined,
    },
  });
  return NextResponse.json(serializeLead(row));
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
