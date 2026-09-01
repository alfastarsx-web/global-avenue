import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import LeadForm from '@/components/LeadForm';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { minPrice, projects } from '@/lib/data/projects';
import { site } from '@/lib/data/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);
  return {
    title: d.projects.title,
    description: d.projects.sub,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: { 'uz-UZ': '/uz/projects', 'ru-RU': '/ru/projects' },
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: d.projects.title,
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${site.url}/${locale}/projects/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={site.city[locale]}
        title={d.projects.title}
        sub={d.projects.sub}
        crumbs={[{ label: d.nav.projects }]}
      />

      <section className="section section--tight">
        <div className="container">
          <ProjectsExplorer locale={locale} d={d} />
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="contact-split">
            <div>
              <span className="kicker">{d.nav.contact}</span>
              <h2 className="sec-title">{d.calculator.ctaTitle}</h2>
              <p className="sec-sub">{d.calculator.ctaText}</p>
              <ul className="contact-list">
                {projects.slice(0, 3).map((p) => (
                  <li key={p.slug}>
                    <span className="contact-list__dot" aria-hidden="true" />
                    <span>
                      {p.name} — {d.common.from} {Math.round(minPrice(p) / 1_000_000)} mln{' '}
                      {d.common.sum}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lead-panel">
              <h3 className="lead-panel__title">{d.form.title}</h3>
              <p className="lead-panel__sub">{d.form.sub}</p>
              <LeadForm d={d} locale={locale} source="projects" />
            </div>
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
