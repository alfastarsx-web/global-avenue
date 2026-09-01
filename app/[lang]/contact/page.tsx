import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import { Clock, Instagram, Mail, MapPin, Phone, Telegram, Whatsapp } from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { site, tel } from '@/lib/data/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);
  return {
    title: d.contact.title,
    description: d.contact.sub,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { 'uz-UZ': '/uz/contact', 'ru-RU': '/ru/contact' },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={site.city[locale]}
        title={d.contact.title}
        sub={d.contact.sub}
        crumbs={[{ label: d.nav.contact }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info stack-lg">
              <div>
                <h2 className="contact-info__head">
                  <MapPin width={19} height={19} />
                  {d.contact.officeTitle}
                </h2>
                <p>{d.contact.address}</p>
                <p className="muted">{d.contact.addressNote}</p>
              </div>

              <div>
                <h2 className="contact-info__head">
                  <Phone width={19} height={19} />
                  {d.contact.phoneTitle}
                </h2>
                <ul className="stack-sm">
                  {site.phones.map((phone) => (
                    <li key={phone}>
                      <a href={tel(phone)} className="contact-info__link">
                        {phone}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`mailto:${site.email}`} className="contact-info__link">
                      <Mail width={16} height={16} /> {site.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="contact-info__head">
                  <Clock width={19} height={19} />
                  {d.contact.hoursTitle}
                </h2>
                <p>{d.contact.hours}</p>
                <p className="muted">{d.contact.hoursSunday}</p>
              </div>

              <div>
                <h2 className="contact-info__head">{d.contact.socialTitle}</h2>
                <div className="btn-row">
                  <a
                    href={site.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost btn--sm"
                  >
                    <Telegram width={17} height={17} />
                    Telegram
                  </a>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost btn--sm"
                  >
                    <Whatsapp width={17} height={17} />
                    WhatsApp
                  </a>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost btn--sm"
                  >
                    <Instagram width={17} height={17} />
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="lead-panel lead-panel--light">
              <h2 className="lead-panel__title">{d.form.title}</h2>
              <p className="lead-panel__sub">{d.form.sub}</p>
              <LeadForm d={d} locale={locale} source="contact" showComment />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="map-box map-box--wide">
            <MapPin width={26} height={26} />
            <h2 className="map-box__title">{d.contact.mapTitle}</h2>
            <p className="muted">{d.contact.mapNote}</p>
            <a
              className="btn btn--ghost btn--sm"
              href={`https://yandex.uz/maps/?pt=${site.geo.lng},${site.geo.lat}&z=15&l=map`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Yandex Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
