import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickContact from '@/components/QuickContact';
import { locales, isLocale, htmlLang, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { site } from '@/lib/data/site';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#10151c',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${d.meta.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: d.meta.defaultDescription,
    applicationName: site.name,
    keywords:
      locale === 'ru'
        ? ['новостройки Самарканд', 'купить квартиру Самарканд', 'Global Avenue', 'TwinEra', 'IZMIR', 'рассрочка', 'ипотека']
        : ['Samarqandda kvartira sotib olish', 'Global Avenue', 'TwinEra', 'IZMIR', 'yangi qurilish', 'muddatli to‘lov', 'ipoteka'],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'uz-UZ': '/uz',
        'ru-RU': '/ru',
        'x-default': '/uz',
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: locale === 'ru' ? 'ru_RU' : 'uz_UZ',
      title: `${site.name} — ${d.meta.tagline}`,
      description: d.meta.defaultDescription,
      url: `/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${d.meta.tagline}`,
      description: d.meta.defaultDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const d = getDictionary(locale);

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/${locale}`,
    foundingDate: String(site.foundedYear),
    description: d.meta.defaultDescription,
    telephone: site.phones[0],
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city[locale],
      addressRegion: site.region[locale],
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.instagram, site.telegram, site.youtube],
    areaServed: site.region[locale],
  };

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

  return (
    <html lang={htmlLang[locale]} className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          {locale === 'ru' ? 'К основному содержанию' : 'Asosiy mazmunga o‘tish'}
        </a>

        <Header locale={locale} d={d} />
        <main id="main">{children}</main>
        <Footer locale={locale} d={d} />
        <QuickContact d={d} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}

        {ymId ? (
          <Script id="ym" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${ymId},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
