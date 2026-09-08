import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidSession, unauthorized } from '@/lib/adminAuth';
import { serializeProject } from '@/lib/adminSerialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function num(v: unknown): number | null | undefined {
  if (v === undefined) return undefined;
  if (v === '' || v === null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function int(v: unknown): number | null | undefined {
  const n = num(v);
  return n === undefined ? undefined : n === null ? null : Math.round(n);
}
function str(v: unknown): string | undefined {
  if (v === undefined) return undefined;
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null | undefined {
  if (v === undefined) return undefined;
  const s = String(v ?? '').trim();
  return s || null;
}
function json(v: unknown): string | undefined {
  if (v === undefined) return undefined;
  return JSON.stringify(Array.isArray(v) ? v : []);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const row = await prisma.project.update({
    where: { id },
    data: {
      name: str(body.name),
      slug: str(body.slug),
      taglineUz: orNull(body.tagline_uz),
      taglineRu: orNull(body.tagline_ru),
      status: str(body.status),
      districtUz: orNull(body.district_uz),
      districtRu: orNull(body.district_ru),
      districtKey: orNull(body.district_key),
      addressUz: orNull(body.address_uz),
      addressRu: orNull(body.address_ru),
      pricePerSqm: num(body.price_per_sqm),
      priceFrom: num(body.price_from),
      priceTo: num(body.price_to),
      handoverUz: orNull(body.handover_uz),
      handoverRu: orNull(body.handover_ru),
      handoverYear: int(body.handover_year),
      floors: int(body.floors),
      apartments: int(body.apartments),
      blocks: int(body.blocks),
      roomOptions: json(body.room_options),
      cover: orNull(body.cover),
      gallery: json(body.gallery),
      descriptionUz: orNull(body.description_uz),
      descriptionRu: orNull(body.description_ru),
      highlights: json(body.highlights),
      infrastructure: json(body.infrastructure),
      schedule: json(body.schedule),
      passport: json(body.passport),
      geoLat: num(body.geo_lat),
      geoLng: num(body.geo_lng),
      featured: body.featured === undefined ? undefined : body.featured === true || body.featured === 'true',
      delivery: orNull(body.delivery),
    },
  });
  return NextResponse.json(serializeProject(row));
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasValidSession(req)) return unauthorized();
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
