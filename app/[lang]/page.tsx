import Image from 'next/image';
import Link from 'next/link';

import ProjectCard from '@/components/ProjectCard';
import ReviewsSlider from '@/components/ReviewsSlider';
import PaymentCalculator from '@/components/PaymentCalculator';
import LeadForm from '@/components/LeadForm';
import {
  ArrowRight,
  Award,
  Building,
  Calendar,
  Camera,
  Globe,
  Instagram,
  MapPin,
  Phone,
  Shield,
  Wallet,
} from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { formatDate, site, tel } from '@/lib/data/site';
import { projects } from '@/lib/data/projects';
import { progressUpdates } from '@/lib/data/content';

const uspIcons = [Camera, Calendar, Shield, Wallet, Award, Globe];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const feed = [...progressUpdates]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <Image src="/img/photos/hero.jpg" alt="" fill priority sizes="100vw" />
        </div>
        <div className="container hero__inner">
          <span className="kicker kicker--light">{d.home.heroKicker}</span>
          <h1 className="hero__title">{d.home.heroTitle}</h1>
          <p className="hero__text">{d.home.heroText}</p>
          <div className="btn-row hero__actions">
            <Link href={`/${locale}/projects`} className="btn btn--accent">
              {d.cta.viewProjects}
              <ArrowRight width={18} height={18} />
            </Link>
            <Link href={`/${locale}/contact`} className="btn btn--onink">
              {d.cta.freeConsult}
            </Link>
          </div>

          <ul className="hero__stats">
            {d.stats.map((s) => (
              <li key={s.label}>
                <span className="hero__stat-value">
                  {s.value}
                  <em>{s.suffix}</em>
                </span>
                <span className="hero__stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Loyihalar ────────────────────────────────────── */}
      <section className="section" id="projects">
        <div className="container">
          <div className="sec-head sec-head--split">
            <div>
              <span className="kicker">{d.nav.projects}</span>
              <h2 className="sec-title">{d.home.projectsTitle}</h2>
              <p className="sec-sub">{d.home.projectsSub}</p>
            </div>
            <Link href={`/${locale}/projects`} className="btn btn--ghost">
              {d.cta.allProjects}
              <ArrowRight width={18} height={18} />
            </Link>
          </div>

          <div className="grid grid--3">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} locale={locale} d={d} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Nega aynan biz ───────────────────────────────── */}
      <section className="section section--alt">
        <div className="container">
          <div className="sec-head sec-head--center">
            <span className="kicker">{site.name}</span>
            <h2 className="sec-title">{d.home.whyTitle}</h2>
            <p className="sec-sub">{d.home.whySub}</p>
          </div>

          <div className="grid grid--3">
            {d.usp.map((item, i) => {
              const Icon = uspIcons[i % uspIcons.length];
              return (
                <article key={item.title} className="usp">
                  <span className="usp__icon" aria-hidden="true">
                    <Icon width={22} height={22} />
                  </span>
                  <h3 className="usp__title">{item.title}</h3>
                  <p className="usp__text">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Qurilish jarayoni lentasi ────────────────────── */}
      <section className="section section--ink">
        <div className="container">
          <div className="sec-head sec-head--split">
            <div>
              <span className="kicker">{d.nav.progress}</span>
              <h2 className="sec-title">{d.home.progressTitle}</h2>
              <p className="sec-sub">{d.home.progressSub}</p>
            </div>
            <Link href={`/${locale}/progress`} className="btn btn--onink">
              {d.cta.details}
              <ArrowRight width={18} height={18} />
            </Link>
          </div>

          <div className="grid grid--4">
            {feed.map((item) => {
              const project = projects.find((p) => p.slug === item.projectSlug);
              return (
                <article key={item.id} className="feed">
                  <Link href={`/${locale}/progress`} className="feed__link">
                    <div className="ratio ratio--4x3 feed__media">
                      <Image
                        src={item.image}
                        alt={item.title[locale]}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <span className="feed__percent">{item.percent}%</span>
                    </div>
                    <div className="feed__body">
                      <p className="feed__meta">
                        {project?.name} · {formatDate(item.date, locale)}
                      </p>
                      <h3 className="feed__title">{item.title[locale]}</h3>
                      <p className="feed__text">{item.text[locale]}</p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mijozlar fikri ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head sec-head--split">
            <div>
              <span className="kicker">{d.nav.reviews}</span>
              <h2 className="sec-title">{d.home.reviewsTitle}</h2>
              <p className="sec-sub">{d.home.reviewsSub}</p>
            </div>
            <Link href={`/${locale}/reviews`} className="btn btn--ghost">
              {d.cta.details}
              <ArrowRight width={18} height={18} />
            </Link>
          </div>

          <ReviewsSlider locale={locale} d={d} />
        </div>
      </section>

      {/* ── Kalkulyator ──────────────────────────────────── */}
      <section className="section section--alt" id="calculator">
        <div className="container">
          <div className="sec-head sec-head--center">
            <span className="kicker">{d.nav.calculator}</span>
            <h2 className="sec-title">{d.home.calcTitle}</h2>
            <p className="sec-sub">{d.home.calcSub}</p>
          </div>
          <PaymentCalculator locale={locale} d={d} />
        </div>
      </section>

      {/* ── Instagram ────────────────────────────────────── */}
      <section className="section section--tight">
        <div className="container">
          <div className="insta">
            <div>
              <span className="kicker">{d.home.instagramTitle}</span>
              <h2 className="insta__title">{site.instagramHandle}</h2>
              <p className="muted">{d.home.instagramSub}</p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                <Instagram width={18} height={18} />
                {d.home.instagramCta}
              </a>
            </div>
            <div className="insta__grid" aria-hidden="true">
              {['p1', 'p3', 'p5', 'p7', 'p2', 'p4'].map((n) => (
                <span key={n} className="insta__cell">
                  <Image src={`/img/progress/${n}.jpg`} alt="" fill sizes="16vw" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Aloqa ────────────────────────────────────────── */}
      <section className="section section--ink" id="contact">
        <div className="container">
          <div className="contact-split">
            <div>
              <span className="kicker">{d.nav.contact}</span>
              <h2 className="sec-title">{d.home.contactTitle}</h2>
              <p className="sec-sub">{d.home.contactSub}</p>

              <ul className="contact-list">
                <li>
                  <MapPin width={19} height={19} />
                  <span>{d.contact.address}</span>
                </li>
                {site.phones.map((phone) => (
                  <li key={phone}>
                    <Phone width={19} height={19} />
                    <a href={tel(phone)}>{phone}</a>
                  </li>
                ))}
                <li>
                  <Building width={19} height={19} />
                  <span>{d.contact.hours}</span>
                </li>
              </ul>
            </div>

            <div className="lead-panel">
              <h3 className="lead-panel__title">{d.form.title}</h3>
              <p className="lead-panel__sub">{d.form.sub}</p>
              <LeadForm d={d} locale={locale} source="home-contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
