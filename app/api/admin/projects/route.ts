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
function int(v: unknown): number | null {
  const n = num(v);
  return n === null ? null : Math.round(n);
}
function str(v: unknown): string {
  return String(v ?? '').trim();
}
function orNull(v: unknown): string | null {
  const s = str(v);
  return s || null;
}
function json(v: unknown): string {
  return JSON.stringify(Array.isArray(v) ? v : []);
}
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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

  let slug = str(body.slug) || slugify(name);
  const clash = await prisma.project.findUnique({ where: { slug } });
  if (clash) slug = `${slug}-${Date.now().toString(36)}`;

  const row = await prisma.project.create({
    data: {
      slug,
      name,
      taglineUz: orNull(body.tagline_uz),
      taglineRu: orNull(body.tagline_ru),
      status: str(body.status) || 'building',
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
      featured: body.featured === true || body.featured === 'true',
      delivery: orNull(body.delivery),
    },
  });
  return NextResponse.json(serializeProject(row), { status: 201 });
}
