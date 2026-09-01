import Link from 'next/link';

import { Instagram, Mail, MapPin, Phone, Telegram } from './Icons';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { site, tel } from '@/lib/data/site';
import { projects } from '@/lib/data/projects';

export default function Footer({ locale, d }: { locale: Locale; d: Dictionary }) {
  const year = new Date().getFullYear();

  const pages = [
    { href: `/${locale}/about`, label: d.nav.about },
    { href: `/${locale}/progress`, label: d.nav.progress },
    { href: `/${locale}/reviews`, label: d.nav.reviews },
    { href: `/${locale}/blog`, label: d.nav.blog },
    { href: `/${locale}/calculator`, label: d.nav.calculator },
    { href: `/${locale}/careers`, label: d.nav.careers },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <span className="brand__name brand__name--lg">GLOBAL AVENUE</span>
            <p className="site-footer__about">{d.footer.about}</p>
            <div className="social">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram width={19} height={19} />
              </a>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Telegram width={19} height={19} />
              </a>
              <a href={`mailto:${site.email}`} aria-label="E-mail">
                <Mail width={19} height={19} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="site-footer__head">{d.footer.projects}</h3>
            <ul className="site-footer__list">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${locale}/projects/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="site-footer__head">{d.footer.nav}</h3>
            <ul className="site-footer__list">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="site-footer__head">{d.footer.contacts}</h3>
            <ul className="site-footer__list site-footer__list--icons">
              {site.phones.map((phone) => (
                <li key={phone}>
                  <Phone width={16} height={16} />
                  <a href={tel(phone)}>{phone}</a>
                </li>
              ))}
              <li>
                <Mail width={16} height={16} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <MapPin width={16} height={16} />
                <span>{d.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {site.name}. {d.footer.rights}
          </p>
          <p className="site-footer__note">{d.footer.madeNote}</p>
        </div>
      </div>
    </footer>
  );
}
