import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import { Award, Check, MapPin, Users } from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { vacancies } from '@/lib/data/content';
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
    title: d.careers.title,
    description: d.careers.sub,
    alternates: {
      canonical: `/${locale}/careers`,
      languages: { 'uz-UZ': '/uz/careers', 'ru-RU': '/ru/careers' },
    },
  };
}

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={site.name}
        title={d.careers.title}
        sub={d.careers.sub}
        crumbs={[{ label: d.nav.careers }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">
              <Users width={15} height={15} />
              {d.careers.whyTitle}
            </span>
            <h2 className="sec-title">{d.careers.whyTitle}</h2>
          </div>

          <div className="grid grid--4">
            {d.careers.perks.map((p) => (
              <article key={p.title} className="card pay">
                <span className="pay__icon" aria-hidden="true">
                  <Award width={20} height={20} />
                </span>
                <h3 className="pay__title">{p.title}</h3>
                <p className="muted">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.careers.openTitle}</span>
            <h2 className="sec-title">{d.careers.openTitle}</h2>
          </div>

          {vacancies.length === 0 ? (
            <p className="empty-state">{d.careers.noVacancy}</p>
          ) : (
            <div className="stack">
              {vacancies.map((v) => (
                <article key={v.id} className="card vacancy">
                  <div className="vacancy__main">
                    <h3 className="vacancy__title">{v.title[locale]}</h3>
                    <p className="vacancy__meta">
                      <span>
                        <MapPin width={15} height={15} /> {v.location[locale]}
                      </span>
                      <span>{v.type[locale]}</span>
                    </p>
                    <ul className="vacancy__reqs">
                      {v.requirements.map((r) => (
                        <li key={r[locale]}>
                          <Check width={14} height={14} />
                          {r[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="#apply" className="btn btn--ghost">
                    {d.careers.apply}
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--ink" id="apply">
        <div className="container">
          <div className="contact-split">
            <div>
              <span className="kicker">{d.careers.apply}</span>
              <h2 className="sec-title">{d.careers.openTitle}</h2>
              <p className="sec-sub">{d.careers.noVacancy}</p>
            </div>
            <div className="lead-panel">
              <LeadForm
                d={d}
                locale={locale}
                source="careers"
                showComment
                submitLabel={d.careers.apply}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
