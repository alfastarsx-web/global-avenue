import type { Project, Unit, Lead, Post, Media, Testimonial, Staff, Settings } from '@prisma/client';

function iso(d: Date | null | undefined): string | null {
  return d ? d.toISOString() : null;
}

export function serializeProject(p: Project) {
  return {
    id: p.id,
    name: p.name,
    location: p.location ?? '',
    status: p.status,
    delivery: p.delivery ?? '',
    price_from: p.priceFrom,
    price_to: p.priceTo,
    description: p.description ?? '',
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
    created_at: iso(u.createdAt),
    updated_at: iso(u.updatedAt),
  };
}

export function serializeLead(l: Lead) {
  let activity: unknown[] = [];
  try {
    activity = JSON.parse(l.activity || '[]');
  } catch {
    activity = [];
  }
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
    activity,
    created_at: iso(l.createdAt),
    updated_at: iso(l.updatedAt),
  };
}

export function serializePost(p: Post) {
  return {
    id: p.id,
    title: p.title,
    excerpt: p.excerpt ?? '',
    body: p.body ?? '',
    author: p.author ?? '',
    status: p.status,
    cover_image: p.coverImage,
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
    rating: t.rating,
    source: t.source ?? '',
    youtube_url: t.youtubeUrl,
    text: t.text ?? '',
    status: t.status,
    created_at: iso(t.createdAt),
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
