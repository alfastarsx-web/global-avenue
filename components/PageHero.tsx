import Link from 'next/link';

import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

export interface Crumb {
  label: string;
  href?: string;
}

export default function PageHero({
  locale,
  d,
  title,
  sub,
  crumbs = [],
  kicker,
}: {
  locale: Locale;
  d: Dictionary;
  title: string;
  sub?: string;
  crumbs?: Crumb[];
  kicker?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <nav className="crumbs" aria-label="breadcrumb">
          <Link href={`/${locale}`}>{d.common.breadcrumbHome}</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="crumbs__item">
              <span className="crumbs__sep" aria-hidden="true">
                /
              </span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>

        {kicker ? <span className="kicker">{kicker}</span> : null}
        <h1 className="page-hero__title">{title}</h1>
        {sub ? <p className="page-hero__sub">{sub}</p> : null}
      </div>
    </section>
  );
}
