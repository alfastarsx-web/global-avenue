'use client';

import { useMemo, useState } from 'react';

import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { formatSum } from '@/lib/data/site';
import { projects } from '@/lib/data/projects';

type Mode = 'installment' | 'mortgage';

/** Annuitet oylik to'lov. Stavka 0 bo'lsa — oddiy bo'lish. */
function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (months <= 0) return 0;
  if (annualRate <= 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export default function PaymentCalculator({
  locale,
  d,
  compact = false,
}: {
  locale: Locale;
  d: Dictionary;
  compact?: boolean;
}) {
  const [mode, setMode] = useState<Mode>('installment');
  const [slug, setSlug] = useState(projects[0].slug);
  const [area, setArea] = useState(62);
  const [downPct, setDownPct] = useState(30);
  const [months, setMonths] = useState(36);
  const [rate, setRate] = useState(17);

  const project = projects.find((p) => p.slug === slug) ?? projects[0];
  const pricePerSqm = project.pricePerSqm;

  const result = useMemo(() => {
    const total = area * pricePerSqm;
    const down = (total * downPct) / 100;
    const loan = total - down;
    const effRate = mode === 'installment' ? 0 : rate;
    const monthly = monthlyPayment(loan, effRate, months);
    const totalPaid = monthly * months + down;
    return {
      total,
      down,
      loan,
      monthly,
      totalPaid,
      overpay: Math.max(0, totalPaid - total),
    };
  }, [area, pricePerSqm, downPct, months, rate, mode]);

  function switchMode(next: Mode) {
    setMode(next);
    if (next === 'installment') {
      setMonths((m) => Math.min(m, 36));
      setDownPct((p) => Math.max(p, 30));
    } else {
      setMonths((m) => (m < 60 ? 120 : m));
    }
  }

  const maxMonths = mode === 'installment' ? 36 : 240;
  const termLabel =
    mode === 'installment'
      ? `${months} ${d.calculator.months}`
      : `${Math.round((months / 12) * 10) / 10} ${d.calculator.years}`;

  return (
    <div className={`calc${compact ? ' calc--compact' : ''}`}>
      <div className="calc__controls">
        <div className="field">
          <span className="field__label">{d.calculator.mode}</span>
          <div className="segmented">
            <button
              type="button"
              aria-pressed={mode === 'installment'}
              onClick={() => switchMode('installment')}
            >
              {d.calculator.modeInstallment}
            </button>
            <button
              type="button"
              aria-pressed={mode === 'mortgage'}
              onClick={() => switchMode('mortgage')}
            >
              {d.calculator.modeMortgage}
            </button>
          </div>
        </div>

        <label className="field">
          <span className="field__label">{d.calculator.project}</span>
          <select className="select" value={slug} onChange={(e) => setSlug(e.target.value)}>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} — {formatSum(p.pricePerSqm)} {d.projects.perSqm}
              </option>
            ))}
          </select>
        </label>

        <div className="field">
          <span className="field__label">
            {d.calculator.area}: <strong>{area} {d.common.sqm}</strong>
          </span>
          <input
            className="range"
            type="range"
            min={30}
            max={150}
            step={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            aria-label={d.calculator.area}
          />
        </div>

        <div className="field">
          <span className="field__label">
            {d.calculator.down}: <strong>{downPct}%</strong>
          </span>
          <input
            className="range"
            type="range"
            min={mode === 'installment' ? 30 : 15}
            max={90}
            step={5}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            aria-label={d.calculator.down}
          />
        </div>

        <div className="field">
          <span className="field__label">
            {d.calculator.term}: <strong>{termLabel}</strong>
          </span>
          <input
            className="range"
            type="range"
            min={6}
            max={maxMonths}
            step={mode === 'installment' ? 3 : 12}
            value={Math.min(months, maxMonths)}
            onChange={(e) => setMonths(Number(e.target.value))}
            aria-label={d.calculator.term}
          />
        </div>

        {mode === 'mortgage' ? (
          <div className="field">
            <span className="field__label">
              {d.calculator.rate}: <strong>{rate}%</strong>
            </span>
            <input
              className="range"
              type="range"
              min={7}
              max={26}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label={d.calculator.rate}
            />
          </div>
        ) : null}
      </div>

      <div className="calc__result">
        <p className="calc__result-label">{d.calculator.monthly}</p>
        <p className="calc__monthly">
          {formatSum(result.monthly)} <small>{d.common.sum}</small>
        </p>

        <dl className="calc__rows">
          <div>
            <dt>{d.calculator.total}</dt>
            <dd>
              {formatSum(result.total)} {d.common.sum}
            </dd>
          </div>
          <div>
            <dt>{d.calculator.downAmount}</dt>
            <dd>
              {formatSum(result.down)} {d.common.sum}
            </dd>
          </div>
          <div>
            <dt>{d.calculator.loanAmount}</dt>
            <dd>
              {formatSum(result.loan)} {d.common.sum}
            </dd>
          </div>
          <div>
            <dt>{d.calculator.overpay}</dt>
            <dd>
              {formatSum(result.overpay)} {d.common.sum}
            </dd>
          </div>
          <div className="calc__rows-total">
            <dt>{d.calculator.totalPaid}</dt>
            <dd>
              {formatSum(result.totalPaid)} {d.common.sum}
            </dd>
          </div>
        </dl>

        <p className="form-note">{d.calculator.disclaimer}</p>

        <a href={`/${locale}/contact`} className="btn btn--accent btn--block">
          {d.cta.freeConsult}
        </a>
      </div>
    </div>
  );
}
