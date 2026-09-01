import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import { ArrowRight } from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, locales, type Locale } from '@/lib/i18n/config';
import { formatDate, site } from '@/lib/data/site';
import { getPost, postCategories, posts } from '@/lib/data/content';

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const post = getPost(slug);
  if (!post) return { title: 'Not found' };

  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: { 'uz-UZ': `/uz/blog/${slug}`, 'ru-RU': `/ru/blog/${slug}` },
    },
    openGraph: {
      type: 'article',
      title: post.title[locale],
      description: post.excerpt[locale],
      publishedTime: post.date,
      images: [{ url: post.cover }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const catLabel = postCategories.find((c) => c.key === post.category)?.label[locale] ?? '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[locale],
    description: post.excerpt[locale],
    image: `${site.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === 'ru' ? 'ru-RU' : 'uz-UZ',
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/${locale}/blog/${post.slug}`,
  };

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={catLabel}
        title={post.title[locale]}
        crumbs={[{ label: d.nav.blog, href: `/${locale}/blog` }, { label: post.title[locale] }]}
      />

      <section className="section section--tight">
        <div className="container">
          <p className="post__meta post__meta--wide">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span>
              {post.readMinutes} {d.blog.readTime}
            </span>
          </p>

          <div className="ratio ratio--21x9 post__cover">
            <Image
              src={post.cover}
              alt={post.title[locale]}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          <article className="post-body text-body">
            {post.body[locale].map((block, i) =>
              block.startsWith('## ') ? (
                <h2 key={i}>{block.slice(3)}</h2>
              ) : (
                <p key={i}>{block}</p>
              ),
            )}
          </article>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="contact-split contact-split--light">
            <div>
              <span className="kicker">{d.nav.contact}</span>
              <h2 className="sec-title">{d.calculator.ctaTitle}</h2>
              <p className="sec-sub">{d.calculator.ctaText}</p>
            </div>
            <div className="lead-panel lead-panel--light">
              <LeadForm d={d} locale={locale} source={`blog:${post.slug}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.blog.related}</span>
            <h2 className="sec-title">{d.blog.related}</h2>
          </div>

          <div className="grid grid--3">
            {related.map((p) => (
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
                      <span>{formatDate(p.date, locale)}</span>
                    </p>
                    <h3 className="post-card__title">{p.title[locale]}</h3>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
