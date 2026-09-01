import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import { Play, Star } from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { averageRating, reviews } from '@/lib/data/content';
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
    title: d.reviews.title,
    description: d.reviews.sub,
    alternates: {
      canonical: `/${locale}/reviews`,
      languages: { 'uz-UZ': '/uz/reviews', 'ru-RU': '/ru/reviews' },
    },
  };
}

export default async function ReviewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  const videoReviews = reviews.filter((r) => r.hasVideo);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text[locale],
    })),
  };

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={site.name}
        title={d.reviews.title}
        sub={d.reviews.sub}
        crumbs={[{ label: d.nav.reviews }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="rating-box">
            <div className="rating-box__score">
              <span>{averageRating}</span>
              <small>
                {d.reviews.of} 5
              </small>
            </div>
            <div>
              <div className="review__stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    width={18}
                    height={18}
                    style={{ opacity: i < Math.round(averageRating) ? 1 : 0.22 }}
                  />
                ))}
              </div>
              <p className="muted">
                {d.reviews.ratingLabel} · {reviews.length} {d.reviews.basedOn}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video-sharhlar */}
      <section className="section section--tight">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.reviews.videoTitle}</span>
            <h2 className="sec-title">{d.reviews.videoTitle}</h2>
            <p className="sec-sub">{d.reviews.videoText}</p>
          </div>

          <div className="grid grid--3">
            {videoReviews.map((r) => (
              <article key={r.id} className="card video-card">
                <div className="ratio ratio--16x10 video-card__media">
                  <span className="video-card__play" aria-hidden="true">
                    <Play width={30} height={30} />
                  </span>
                </div>
                <div className="card__body">
                  <h3 className="video-card__name">{r.name}</h3>
                  <p className="muted">{r.role[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Matnli sharhlar */}
      <section className="section section--alt">
        <div className="container">
          <div className="sec-head">
            <span className="kicker">{d.reviews.textTitle}</span>
            <h2 className="sec-title">{d.reviews.textTitle}</h2>
          </div>

          <div className="grid grid--3">
            {reviews.map((r) => (
              <article key={r.id} className="card review review--card">
                <div className="review__stars" aria-label={`${r.rating} / 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      width={15}
                      height={15}
                      style={{ opacity: i < r.rating ? 1 : 0.22 }}
                    />
                  ))}
                </div>
                <p className="review__text">{r.text[locale]}</p>
                <footer className="review__foot">
                  <div>
                    <p className="review__name">{r.name}</p>
                    <p className="review__role">{r.role[locale]}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

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
              <LeadForm d={d} locale={locale} source="reviews" />
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
