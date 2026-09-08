/**
 * One-time migration: copies the existing static site content
 * (lib/data/projects.ts, lib/data/content.ts) into the database so the
 * admin panel starts from "current reality" instead of empty tables.
 * Safe to re-run — every record is upserted by its natural key (slug/id).
 */
import { prisma } from '../lib/prisma';
import { projects } from '../lib/data/projects';
import { posts, progressUpdates, reviews, team, vacancies } from '../lib/data/content';

const unitStatus: Record<string, string> = {
  available: 'bosh',
  reserved: 'band',
  sold: 'sotilgan',
};

async function seedProjects() {
  const slugToId = new Map<string, string>();

  for (const p of projects) {
    const row = await prisma.project.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        name: p.name,
        taglineUz: p.tagline.uz,
        taglineRu: p.tagline.ru,
        status: p.status,
        districtUz: p.district.uz,
        districtRu: p.district.ru,
        districtKey: p.districtKey,
        addressUz: p.address.uz,
        addressRu: p.address.ru,
        pricePerSqm: p.pricePerSqm,
        handoverUz: p.handover.uz,
        handoverRu: p.handover.ru,
        handoverYear: p.handoverYear,
        floors: p.floors,
        apartments: p.apartments,
        blocks: p.blocks,
        roomOptions: JSON.stringify(p.roomOptions),
        cover: p.cover,
        gallery: JSON.stringify(p.gallery),
        descriptionUz: p.description.uz,
        descriptionRu: p.description.ru,
        highlights: JSON.stringify(p.highlights),
        infrastructure: JSON.stringify(p.infrastructure),
        schedule: JSON.stringify(p.schedule),
        passport: JSON.stringify(p.passport),
        geoLat: p.geo.lat,
        geoLng: p.geo.lng,
        featured: p.featured,
      },
      update: {},
    });
    slugToId.set(p.slug, row.id);

    for (const plan of p.plans) {
      await prisma.unit.upsert({
        where: { id: `seed-${p.slug}-${plan.id}` },
        create: {
          id: `seed-${p.slug}-${plan.id}`,
          projectId: row.id,
          projectName: p.name,
          floor: plan.floor,
          rooms: plan.rooms,
          area: plan.area,
          price: plan.price,
          status: unitStatus[plan.status] ?? 'bosh',
          image: plan.image,
        },
        update: {},
      });
    }
  }
  return slugToId;
}

async function seedPosts() {
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        category: p.category,
        titleUz: p.title.uz,
        titleRu: p.title.ru,
        excerptUz: p.excerpt.uz,
        excerptRu: p.excerpt.ru,
        bodyUz: JSON.stringify(p.body.uz),
        bodyRu: JSON.stringify(p.body.ru),
        status: 'published',
        coverImage: p.cover,
        readMinutes: p.readMinutes,
        date: new Date(p.date),
        publishedAt: new Date(p.date),
      },
      update: {},
    });
  }
}

async function seedProgress(slugToId: Map<string, string>) {
  for (const pr of progressUpdates) {
    const projectId = slugToId.get(pr.projectSlug);
    if (!projectId) {
      console.warn(`progress update ${pr.id}: unknown project slug ${pr.projectSlug}, skipped`);
      continue;
    }
    const project = projects.find((p) => p.slug === pr.projectSlug)!;
    await prisma.progressUpdate.upsert({
      where: { id: `seed-${pr.id}` },
      create: {
        id: `seed-${pr.id}`,
        projectId,
        projectName: project.name,
        date: new Date(pr.date),
        image: pr.image,
        titleUz: pr.title.uz,
        titleRu: pr.title.ru,
        textUz: pr.text.uz,
        textRu: pr.text.ru,
        percent: pr.percent,
      },
      update: {},
    });
  }
}

async function seedTestimonials() {
  for (const [i, r] of reviews.entries()) {
    await prisma.testimonial.upsert({
      where: { id: `seed-${r.id}` },
      create: {
        id: `seed-${r.id}`,
        clientName: r.name,
        projectName: r.project,
        roleUz: r.role.uz,
        roleRu: r.role.ru,
        rating: r.rating,
        hasVideo: r.hasVideo,
        textUz: r.text.uz,
        textRu: r.text.ru,
        status: 'published',
        order: i,
      },
      update: {},
    });
  }
}

async function seedTeam() {
  for (const [i, t] of team.entries()) {
    await prisma.teamMember.upsert({
      where: { id: `seed-team-${i}` },
      create: {
        id: `seed-team-${i}`,
        name: t.name,
        roleUz: t.role.uz,
        roleRu: t.role.ru,
        initials: t.initials,
        order: i,
      },
      update: {},
    });
  }
}

async function seedVacancies() {
  for (const [i, v] of vacancies.entries()) {
    await prisma.vacancy.upsert({
      where: { id: `seed-${v.id}` },
      create: {
        id: `seed-${v.id}`,
        titleUz: v.title.uz,
        titleRu: v.title.ru,
        locationUz: v.location.uz,
        locationRu: v.location.ru,
        typeUz: v.type.uz,
        typeRu: v.type.ru,
        requirements: JSON.stringify(v.requirements),
        order: i,
      },
      update: {},
    });
  }
}

async function main() {
  const slugToId = await seedProjects();
  await seedPosts();
  await seedProgress(slugToId);
  await seedTestimonials();
  await seedTeam();
  await seedVacancies();
  console.log('Seed complete.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
