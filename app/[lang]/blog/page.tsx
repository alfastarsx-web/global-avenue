import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import PageHero from '@/components/PageHero';
import { ArrowRight } from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { formatDate } from '@/lib/data/site';
import { postCategories, posts } from '@/lib/data/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);
  return {
    title: d.blog.title,
    description: d.blog.sub,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { 'uz-UZ': '/uz/blog', 'ru-RU': '/ru/blog' },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = sorted;

  const catLabel = (key: string) =>
    postCategories.find((c) => c.key === key)?.label[locale] ?? key;

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={d.nav.blog}
        title={d.blog.title}
        sub={d.blog.sub}
        crumbs={[{ label: d.nav.blog }]}
      />

      <section className="section section--tight">
        <div className="container">
          <Link href={`/${locale}/blog/${lead.slug}`} className="post-lead card card--hover">
            <div className="ratio ratio--16x10 post-lead__media">
              <Image
                src={lead.cover}
                alt={lead.title[locale]}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </div>
            <div className="post-lead__body">
              <p className="post__meta">
                <span className="badge badge--soon">{catLabel(lead.category)}</span>
                <span>{formatDate(lead.date, locale)}</span>
                <span>
                  {lead.readMinutes} {d.blog.readTime}
                </span>
              </p>
              <h2 className="post-lead__title">{lead.title[locale]}</h2>
              <p className="muted">{lead.excerpt[locale]}</p>
              <span className="link-arrow">
                {d.cta.readMore}
                <ArrowRight width={17} height={17} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--3">
            {rest.map((p) => (
              <article key={p.slug} className="card card--hover post-card">
                <Link href={`/${locale}/blog/${p.slug}`}>
                  <div className="ratio ratio--16x10">
                    <Image
                      src={p.cover}
                      alt={p.title[locale]}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="card__body">
                    <p className="post__meta">
                      <span className="badge">{catLabel(p.category)}</span>
                      <span>{formatDate(p.date, locale)}</span>
                    </p>
                    <h3 className="post-card__title">{p.title[locale]}</h3>
                    <p className="muted post-card__excerpt">{p.excerpt[locale]}</p>
                    <span className="link-arrow">
                      {d.cta.readMore}
                      <ArrowRight width={16} height={16} />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
