import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import PaymentCalculator from '@/components/PaymentCalculator';
import LeadForm from '@/components/LeadForm';
import { Building, Calendar, Check, Wallet } from '@/components/Icons';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);
  return {
    title: d.calculator.title,
    description: d.calculator.sub,
    alternates: {
      canonical: `/${locale}/calculator`,
      languages: { 'uz-UZ': '/uz/calculator', 'ru-RU': '/ru/calculator' },
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'uz';
  const d = getDictionary(locale);

  const payments = [
    { icon: Wallet, title: d.payment.cash, text: d.payment.cashText },
    { icon: Calendar, title: d.payment.installment, text: d.payment.installmentText },
    { icon: Building, title: d.payment.mortgage, text: d.payment.mortgageText },
    { icon: Check, title: d.payment.subsidy, text: d.payment.subsidyText },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        d={d}
        kicker={d.nav.calculator}
        title={d.calculator.title}
        sub={d.calculator.sub}
        crumbs={[{ label: d.nav.calculator }]}
      />

      <section className="section section--tight">
        <div className="container">
          <PaymentCalculator locale={locale} d={d} />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="sec-head sec-head--center">
            <span className="kicker">{d.project.priceTitle}</span>
            <h2 className="sec-title">{d.project.priceTitle}</h2>
          </div>

          <div className="grid grid--4">
            {payments.map((p) => (
              <article key={p.title} className="card pay">
                <span className="pay__icon" aria-hidden="true">
                  <p.icon width={20} height={20} />
                </span>
                <h3 className="pay__title">{p.title}</h3>
                <p className="muted">{p.text}</p>
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
              <h2 className="sec-title">{d.calculator.ctaTitle}</h2>
              <p className="sec-sub">{d.calculator.ctaText}</p>
            </div>
            <div className="lead-panel">
              <LeadForm d={d} locale={locale} source="calculator" showComment />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
