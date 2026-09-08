import type {
  Project,
  Unit,
  Lead,
  Post,
  Media,
  Testimonial,
  Staff,
  Settings,
  ProgressUpdate,
  TeamMember,
  Vacancy,
} from '@prisma/client';

function iso(d: Date | null | undefined): string | null {
  return d ? d.toISOString() : null;
}
function ymd(d: Date | null | undefined): string | null {
  return d ? d.toISOString().slice(0, 10) : null;
}
function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function serializeProject(p: Project) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline_uz: p.taglineUz ?? '',
    tagline_ru: p.taglineRu ?? '',
    status: p.status,
    district_uz: p.districtUz ?? '',
    district_ru: p.districtRu ?? '',
    district_key: p.districtKey ?? '',
    address_uz: p.addressUz ?? '',
    address_ru: p.addressRu ?? '',
    price_per_sqm: p.pricePerSqm,
    price_from: p.priceFrom,
    price_to: p.priceTo,
    handover_uz: p.handoverUz ?? '',
    handover_ru: p.handoverRu ?? '',
    handover_year: p.handoverYear,
    floors: p.floors,
    apartments: p.apartments,
    blocks: p.blocks,
    room_options: parseJson<number[]>(p.roomOptions, []),
    cover: p.cover ?? '',
    gallery: parseJson<string[]>(p.gallery, []),
    description_uz: p.descriptionUz ?? '',
    description_ru: p.descriptionRu ?? '',
    highlights: parseJson<{ uz: string; ru: string }[]>(p.highlights, []),
    infrastructure: parseJson<{ name: { uz: string; ru: string }; distance: { uz: string; ru: string } }[]>(
      p.infrastructure,
      [],
    ),
    schedule: parseJson<{ label: { uz: string; ru: string }; date: { uz: string; ru: string }; done: boolean }[]>(
      p.schedule,
      [],
    ),
    passport: parseJson<{ label: { uz: string; ru: string }; value: { uz: string; ru: string } }[]>(p.passport, []),
    geo_lat: p.geoLat,
    geo_lng: p.geoLng,
    featured: p.featured,
    delivery: p.delivery ?? '',
    created_at: iso(p.createdAt),
    updated_at: iso(p.updatedAt),
  };
}

export function serializeUnit(u: Unit) {
  return {
    id: u.id,
    project_id: u.projectId,
    project_name: u.projectName ?? '',
    block: u.block ?? '',
    floor: u.floor,
    rooms: u.rooms,
    area: u.area,
    price: u.price,
    status: u.status,
    image: u.image ?? '',
    created_at: iso(u.createdAt),
    updated_at: iso(u.updatedAt),
  };
}

export function serializeLead(l: Lead) {
  return {
    id: l.id,
    name: l.name,
    phone: l.phone ?? '',
    project_id: l.projectId,
    project_name: l.projectName ?? '',
    status: l.status,
    assigned_to: l.assignedTo,
    next_follow_up: l.nextFollowUp,
    source: l.source ?? '',
    interest: l.interest ?? '',
    comment: l.comment ?? '',
    activity: parseJson<unknown[]>(l.activity, []),
    created_at: iso(l.createdAt),
    updated_at: iso(l.updatedAt),
  };
}

export function serializePost(p: Post) {
  return {
    id: p.id,
    slug: p.slug,
    category: p.category,
    title_uz: p.titleUz ?? '',
    title_ru: p.titleRu ?? '',
    excerpt_uz: p.excerptUz ?? '',
    excerpt_ru: p.excerptRu ?? '',
    body_uz: parseJson<string[]>(p.bodyUz, []),
    body_ru: parseJson<string[]>(p.bodyRu, []),
    author: p.author ?? '',
    status: p.status,
    cover_image: p.coverImage,
    read_minutes: p.readMinutes,
    date: ymd(p.date),
    published_at: iso(p.publishedAt),
    created_at: iso(p.createdAt),
    updated_at: iso(p.updatedAt),
  };
}

export function serializeMedia(m: Media) {
  return {
    id: m.id,
    caption: m.caption ?? '',
    category: m.category,
    image_url: m.imageUrl,
    width: m.width,
    height: m.height,
    project_id: m.projectId,
    project_name: m.projectName ?? '',
    created_at: iso(m.createdAt),
  };
}

export function serializeTestimonial(t: Testimonial) {
  return {
    id: t.id,
    client_name: t.clientName,
    project_id: t.projectId,
    project_name: t.projectName ?? '',
    role_uz: t.roleUz ?? '',
    role_ru: t.roleRu ?? '',
    rating: t.rating,
    source: t.source ?? '',
    youtube_url: t.youtubeUrl,
    has_video: t.hasVideo,
    text_uz: t.textUz ?? '',
    text_ru: t.textRu ?? '',
    // legacy single-locale fields some older UI bits may still read
    text: t.textUz ?? t.textRu ?? '',
    status: t.status,
    order: t.order,
    created_at: iso(t.createdAt),
  };
}

export function serializeProgress(p: ProgressUpdate) {
  return {
    id: p.id,
    project_id: p.projectId,
    project_name: p.projectName ?? '',
    date: ymd(p.date),
    image: p.image ?? '',
    title_uz: p.titleUz ?? '',
    title_ru: p.titleRu ?? '',
    text_uz: p.textUz ?? '',
    text_ru: p.textRu ?? '',
    percent: p.percent,
    created_at: iso(p.createdAt),
  };
}

export function serializeTeamMember(t: TeamMember) {
  return {
    id: t.id,
    name: t.name,
    role_uz: t.roleUz ?? '',
    role_ru: t.roleRu ?? '',
    initials: t.initials ?? '',
    order: t.order,
    active: t.active,
    created_at: iso(t.createdAt),
  };
}

export function serializeVacancy(v: Vacancy) {
  return {
    id: v.id,
    title_uz: v.titleUz ?? '',
    title_ru: v.titleRu ?? '',
    location_uz: v.locationUz ?? '',
    location_ru: v.locationRu ?? '',
    type_uz: v.typeUz ?? '',
    type_ru: v.typeRu ?? '',
    requirements: parseJson<{ uz: string; ru: string }[]>(v.requirements, []),
    order: v.order,
    active: v.active,
    created_at: iso(v.createdAt),
  };
}

export function serializeStaff(s: Staff) {
  return {
    id: s.id,
    name: s.name,
    phone: s.phone ?? '',
    role: s.role,
    active: s.active,
    created_at: iso(s.createdAt),
    updated_at: iso(s.updatedAt),
  };
}

export function serializeSettings(s: Settings) {
  return {
    company_name: s.companyName,
    phone: s.phone,
    address: s.address,
    instagram: s.instagram,
    telegram: s.telegram,
    hours: s.hours,
  };
}
