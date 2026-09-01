import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Gallery from '@/components/Gallery';
import PlanSelector from '@/components/PlanSelector';
import LeadForm from '@/components/LeadForm';
import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/ProjectCard';
import {
  Building,
  Calendar,
  Check,
  Globe,
  Layers,
  MapPin,
  Ruler,
  Wallet,
} from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, locales, type Locale } from '@/lib/i18n/config';
import { formatSum, priceFrom, site } from '@/lib/data/site';
import { getProject, minPrice, projects } from '@/lib/data/projects';

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const project = getProject(slug);
  if (!project) return { title: 'Not found' };

  const title = `${project.name} — ${project.tagline[locale]}`;
  return {
    title,
    description: project.description[locale].slice(0, 300),
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        'uz-UZ': `/uz/projects/${slug}`,
        'ru-RU': `/ru/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description: project.description[locale].slice(0, 300),
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const from = minPrice(project);
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const payments = [
    { icon: Wallet, title: d.payment.cash, text: d.payment.cashText },
    { icon: Calendar, title: d.payment.installment, text: d.payment.installmentText },
    { icon: Building, title: d.payment.mortgage, text: d.payment.mortgageText },
    { icon: Check, title: d.payment.subsidy, text: d.payment.subsidyText },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: project.name,
    url: `${site.url}/${locale}/projects/${project.slug}`,
    description: project.description[locale],
    image: `${site.url}${project.cover}`,
    datePosted: new Date().toISOString().slice(0, 10),
    address: {
      '@type': 'PostalAddress',
      streetAddress: project.address[locale],
      addressLocality: site.city[locale],
      addressRegion: site.region[locale],
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: project.geo.lat,
      longitude: project.geo.lng,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'UZS',
      lowPrice: from,
      highPrice: Math.max(...project.plans.map((p) => p.price)),
      offerCount: project.plans.filter((p) => p.status === 'available').length,
      availability: 'https://schema.org/InStock',
    },
    provider: { '@id': `${site.url}/#organization` },
  };

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={d.status[project.status]}
        title={project.name}
        sub={project.tagline[locale]}
        crumbs={[
          { label: d.nav.projects, href: `/${locale}/projects` },
          { label: project.name },
        ]}
      />

      {/* Asosiy raqamlar */}
      <section className="section section--tight">
        <div className="container">
          <ul className="keyfacts">
            <li>
              <Wallet width={19} height={19} />
              <span className="keyfacts__label">{d.projects.priceFrom}</span>
              <span className="keyfacts__value">
                {priceFrom(from, locale, d.common.sum)}
              </span>
            </li>
            <li>
              <Ruler width={19} height={19} />
              <span className="keyfacts__label">{d.project.planArea}</span>
              <span className="keyfacts__value">
                {Math.min(...project.plans.map((p) => p.area))}–
                {Math.max(...project.plans.map((p) => p.area))} {d.common.sqm}
              </span>
            </li>
            <li>
              <Layers width={19} height={19} />
              <span className="keyfacts__label">{d.projects.floors}</span>
              <span className="keyfacts__value">
                {project.floors} · {project.blocks} {locale === 'ru' ? 'блока' : 'blok'}
              </span>
            </li>
            <li>
              <Building width={19} height={19} />
              <span className="keyfacts__label">{d.projects.apartments}</span>
              <span className="keyfacts__value">{project.apartments}</span>
            </li>
            <li>
              <Calendar width={19} height={19} />
              <span className="keyfacts__label">{d.projects.handover}</span>
              <span className="keyfacts__value">{project.handover[locale]}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Galereya */}
      <section className="section section--tight">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.project.galleryTitle}</span>
            <h2 className="sec-title">{d.project.galleryTitle}</h2>
          </div>
          <Gallery images={project.gallery} alt={project.name} />
        </div>
      </section>

      {/* Loyiha haqida + ustunliklar */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="kicker">{d.project.aboutTitle}</span>
              <h2 className="sec-title">{d.project.aboutTitle}</h2>
              <p className="lead" style={{ marginTop: 18 }}>
                {project.description[locale]}
              </p>

              <div className="tour">
                <Globe width={20} height={20} />
                <div>
                  <h3 className="tour__title">{d.project.tourTitle}</h3>
                  <p className="muted">{d.project.tourText}</p>
                </div>
              </div>
            </div>

            <ul className="values">
              {project.highlights.map((h) => (
                <li key={h[locale]}>
                  <span className="values__tick" aria-hidden="true">
                    <Check width={15} height={15} />
                  </span>
                  <p>{h[locale]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Planirovkalar */}
      <section className="section section--alt" id="plans">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.project.plansTitle}</span>
            <h2 className="sec-title">{d.project.plansTitle}</h2>
            <p className="sec-sub">{d.project.plansSub}</p>
          </div>
          <PlanSelector project={project} locale={locale} d={d} />
        </div>
      </section>

      {/* Narx va to'lov */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.project.priceTitle}</span>
            <h2 className="sec-title">{d.project.priceTitle}</h2>
            <p className="sec-sub">
              {formatSum(project.pricePerSqm)} {d.projects.perSqm}
            </p>
          </div>

          <div className="grid grid--4">
            {payments.map((p) => (
              <article key={p.title} className="card pay">
                <span className="pay__icon" aria-hidden="true">
                  <p.icon width={20} height={20} />
                </span>
                <h3 className="pay__title">{p.title}</h3>
                <p className="muted">{p.text}</p>
              </article>
            ))}
          </div>

          <p className="form-note" style={{ marginTop: 18 }}>
            <Link href={`/${locale}/calculator`} className="link-arrow">
              {d.calculator.title}
            </Link>
          </p>
        </div>
      </section>

      {/* Joylashuv */}
      <section className="section section--alt">
        <div className="container">
          <div className="split">
            <div>
              <span className="kicker">
                <MapPin width={15} height={15} />
                {d.project.locationTitle}
              </span>
              <h2 className="sec-title">{d.project.locationTitle}</h2>
              <p className="sec-sub">{project.address[locale]}</p>

              <ul className="infra">
                {project.infrastructure.map((i) => (
                  <li key={i.name[locale]}>
                    <span>{i.name[locale]}</span>
                    <span className="infra__dist">{i.distance[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="map-box">
              <MapPin width={26} height={26} />
              <p className="map-box__coords">
                {project.geo.lat.toFixed(4)}, {project.geo.lng.toFixed(4)}
              </p>
              <p className="muted">{d.contact.mapNote}</p>
              <a
                className="btn btn--ghost btn--sm"
                href={`https://yandex.uz/maps/?pt=${project.geo.lng},${project.geo.lat}&z=16&l=map`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {d.contact.mapTitle}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Qurilish bosqichlari */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.project.scheduleTitle}</span>
            <h2 className="sec-title">{d.project.scheduleTitle}</h2>
          </div>

          <ol className="stages">
            {project.schedule.map((s) => (
              <li key={s.label[locale]} className={`stages__item${s.done ? ' is-done' : ''}`}>
                <span className="stages__dot" aria-hidden="true">
                  {s.done ? <Check width={13} height={13} /> : null}
                </span>
                <div>
                  <h3 className="stages__title">{s.label[locale]}</h3>
                  <p className="muted">{s.date[locale]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Texnik pasport */}
      <section className="section section--alt">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.project.passportTitle}</span>
            <h2 className="sec-title">{d.project.passportTitle}</h2>
          </div>

          <div className="table-wrap">
            <table className="data">
              <tbody>
                {project.passport.map((row) => (
                  <tr key={row.label[locale]}>
                    <th scope="row" style={{ width: '38%' }}>
                      {row.label[locale]}
                    </th>
                    <td>{row.value[locale]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ariza */}
      <section className="section section--ink" id="lead">
        <div className="container">
          <div className="contact-split">
            <div>
              <span className="kicker">{project.name}</span>
              <h2 className="sec-title">{d.project.formTitle}</h2>
              <p className="sec-sub">{d.project.formSub}</p>
            </div>
            <div className="lead-panel">
              <LeadForm
                d={d}
                locale={locale}
                source={`project:${project.slug}`}
                project={project.name}
                showComment
                submitLabel={d.cta.book}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Boshqa loyihalar */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.nav.projects}</span>
            <h2 className="sec-title">{d.cta.allProjects}</h2>
          </div>
          <div className="grid grid--3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} d={d} />
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
