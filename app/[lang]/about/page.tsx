import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import { Award, Check, Shield, Users } from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { site } from '@/lib/data/site';
import { team } from '@/lib/data/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);
  return {
    title: d.about.title,
    description: d.about.lead,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { 'uz-UZ': '/uz/about', 'ru-RU': '/ru/about' },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={site.name}
        title={d.about.title}
        sub={d.about.lead}
        crumbs={[{ label: d.nav.about }]}
      />

      {/* Statistika */}
      <section className="section section--tight">
        <div className="container">
          <ul className="stat-row">
            {d.stats.map((s) => (
              <li key={s.label}>
                <span className="stat-row__value">
                  {s.value}
                  <em>{s.suffix}</em>
                </span>
                <span className="stat-row__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Missiya */}
      <section className="section section--alt">
        <div className="container">
          <div className="split">
            <div>
              <span className="kicker">{d.about.missionTitle}</span>
              <h2 className="sec-title">{d.home.heroTitle}</h2>
              <p className="lead" style={{ marginTop: 18 }}>
                {d.about.missionText}
              </p>
            </div>
            <ul className="values">
              {d.about.values.map((v) => (
                <li key={v.title}>
                  <span className="values__tick" aria-hidden="true">
                    <Check width={15} height={15} />
                  </span>
                  <div>
                    <h3 className="values__title">{v.title}</h3>
                    <p className="muted">{v.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tarix */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.about.historyTitle}</span>
            <h2 className="sec-title">{d.about.historyTitle}</h2>
          </div>

          <ol className="timeline">
            {d.about.timeline.map((t) => (
              <li key={t.year} className="timeline__item">
                <span className="timeline__year">{t.year}</span>
                <div className="timeline__body">
                  <h3 className="timeline__title">{t.title}</h3>
                  <p className="muted">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Litsenziyalar */}
      <section className="section section--alt">
        <div className="container">
          <div className="sec-head sec-head--center">
            <span className="kicker">
              <Shield width={15} height={15} />
              {d.about.licensesTitle}
            </span>
            <h2 className="sec-title">{d.about.licensesTitle}</h2>
            <p className="sec-sub">{d.about.licensesText}</p>
          </div>

          <div className="grid grid--4">
            {d.about.licenses.map((l) => (
              <article key={l.title} className="card license">
                <span className="license__icon" aria-hidden="true">
                  <Award width={22} height={22} />
                </span>
                <h3 className="license__title">{l.title}</h3>
                <p className="muted license__meta">{l.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Jamoa */}
      <section className="section">
        <div className="container">
          <div className="sec-head sec-head--center">
            <span className="kicker">
              <Users width={15} height={15} />
              {d.about.teamTitle}
            </span>
            <h2 className="sec-title">{d.about.teamTitle}</h2>
            <p className="sec-sub">{d.about.teamSub}</p>
          </div>

          <div className="grid grid--3">
            {team.map((m) => (
              <article key={m.name} className="member">
                <span className="member__avatar" aria-hidden="true">
                  {m.initials}
                </span>
                <div>
                  <h3 className="member__name">{m.name}</h3>
                  <p className="muted">{m.role[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ariza */}
      <section className="section section--ink">
        <div className="container">
          <div className="contact-split">
            <div>
              <span className="kicker">{d.nav.contact}</span>
              <h2 className="sec-title">{d.home.contactTitle}</h2>
              <p className="sec-sub">{d.home.contactSub}</p>
            </div>
            <div className="lead-panel">
              <h3 className="lead-panel__title">{d.form.title}</h3>
              <LeadForm d={d} locale={locale} source="about" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
