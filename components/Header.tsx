'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Close, Menu, Phone } from './Icons';
import { locales, localeShort, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { site, tel } from '@/lib/data/site';

export default function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  const nav = [
    { href: `/${locale}/projects`, label: d.nav.projects },
    { href: `/${locale}/about`, label: d.nav.about },
    { href: `/${locale}/progress`, label: d.nav.progress },
    { href: `/${locale}/reviews`, label: d.nav.reviews },
    { href: `/${locale}/calculator`, label: d.nav.calculator },
    { href: `/${locale}/blog`, label: d.nav.blog },
    { href: `/${locale}/contact`, label: d.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  /** Joriy yo'lni boshqa tilga o'tkazish */
  const swapLocale = (target: Locale) => {
    const rest = pathname.replace(/^\/(uz|ru)/, '');
    return `/${target}${rest}`;
  };

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  return (
    <header className={`site-header${solid ? ' is-solid' : ''}`}>
      <div className="container site-header__inner">
        <Link href={`/${locale}`} className="brand" aria-label={site.name}>
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
              <path d="M4 27V11.5L16 5l12 6.5V27" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M11 27v-8h10v8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="brand__text">
            <span className="brand__name">GLOBAL AVENUE</span>
            <span className="brand__sub">{site.city[locale]}</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label={d.nav.menu}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav__link${isActive(item.href) ? ' is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__side">
          <div className="lang-switch" role="group" aria-label="Language">
            {locales.map((l) => (
              <Link
                key={l}
                href={swapLocale(l)}
                className={`lang-switch__btn${l === locale ? ' is-active' : ''}`}
                aria-current={l === locale ? 'true' : undefined}
                hrefLang={l}
              >
                {localeShort[l]}
              </Link>
            ))}
          </div>

          <a href={tel(site.phones[0])} className="header-phone">
            <Phone width={17} height={17} />
            <span>{site.phones[0]}</span>
          </a>

          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? d.nav.close : d.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close width={24} height={24} /> : <Menu width={24} height={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <div className="mobile-menu__inner">
          <div className="mobile-menu__top">
            <span className="brand__name">GLOBAL AVENUE</span>
            <button
              type="button"
              className="mobile-menu__close"
              onClick={() => setOpen(false)}
              aria-label={d.nav.close}
            >
              <Close width={24} height={24} />
            </button>
          </div>

          <nav className="mobile-menu__nav">
            <Link href={`/${locale}`} className="mobile-menu__link">
              {d.nav.home}
            </Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-menu__link">
                {item.label}
              </Link>
            ))}
            <Link href={`/${locale}/careers`} className="mobile-menu__link">
              {d.nav.careers}
            </Link>
          </nav>

          <div className="mobile-menu__foot">
            <a href={tel(site.phones[0])} className="btn btn--accent btn--block">
              <Phone width={18} height={18} />
              {site.phones[0]}
            </a>
            <div className="lang-switch lang-switch--wide">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={swapLocale(l)}
                  className={`lang-switch__btn${l === locale ? ' is-active' : ''}`}
                  hrefLang={l}
                >
                  {localeShort[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
