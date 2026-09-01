import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import ProgressFeed from '@/components/ProgressFeed';
import { Camera, Instagram } from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
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
    title: d.progress.title,
    description: d.progress.sub,
    alternates: {
      canonical: `/${locale}/progress`,
      languages: { 'uz-UZ': '/uz/progress', 'ru-RU': '/ru/progress' },
    },
  };
}

export default async function ProgressPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={locale === 'ru' ? 'Стройка без секретов' : 'Sirsiz qurilish'}
        title={d.progress.title}
        sub={d.progress.sub}
        crumbs={[{ label: d.nav.progress }]}
      />

      <section className="section section--tight">
        <div className="container">
          <ProgressFeed locale={locale} d={d} />

          <div className="note-box">
            <Camera width={20} height={20} />
            <p>{d.progress.note}</p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--sm"
            >
              <Instagram width={16} height={16} />
              {d.home.instagramCta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
