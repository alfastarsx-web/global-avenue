'use client';

import { useState, type FormEvent } from 'react';

import { Check } from './Icons';
import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n/config';

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * Demo rejimi: GitHub Pages kabi statik hostingda backend yo'q.
 * Forma to'liq ishlaydi, lekin ariza hech qayerga yuborilmaydi —
 * buni foydalanuvchidan yashirmaymiz.
 */
const DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === '1';

interface Props {
  d: Dictionary;
  locale: Locale;
  /** Qaysi sahifadan yuborilgani — CRM/Telegramga uzatiladi */
  source: string;
  /** Loyiha nomi (loyiha sahifasidagi forma uchun) */
  project?: string;
  /** Ariza turi variantlari o'rniga erkin matn ko'rsatish */
  showComment?: boolean;
  submitLabel?: string;
  className?: string;
}

/** +998 90 123 45 67 ko'rinishiga keltiradi */
function maskPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('998')) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);
  return digits ? `+998 ${parts.join(' ')}` : '';
}

export default function LeadForm({
  d,
  locale,
  source,
  project,
  showComment = false,
  submitLabel,
  className,
}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const options = [
    { value: 'consult', label: d.form.options.consult },
    { value: 'studio', label: d.form.options.studio },
    { value: '1', label: d.form.options.r1 },
    { value: '2', label: d.form.options.r2 },
    { value: '3', label: d.form.options.r3 },
    { value: '4+', label: d.form.options.r4 },
    { value: 'commercial', label: d.form.options.commercial },
  ];

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim()) {
      setError(d.form.errorRequired);
      return;
    }
    if (phone.replace(/\D/g, '').length < 12) {
      setError(d.form.errorPhone);
      return;
    }

    setStatus('sending');

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 600));
      setStatus('done');
      return;
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          interest: options.find((o) => o.value === interest)?.label ?? '',
          comment: comment.trim(),
          project: project ?? '',
          source,
          locale,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('done');
      if (typeof window !== 'undefined') {
        // Analitika hodisasi (GTM / GA4 / Metrika)
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
          event: 'lead_submit',
          lead_source: source,
          lead_project: project ?? '',
        });
      }
    } catch {
      setStatus('error');
      setError(d.form.errorGeneric);
    }
  }

  function reset() {
    setName('');
    setPhone('');
    setInterest('');
    setComment('');
    setStatus('idle');
    setError('');
  }

  if (status === 'done') {
    return (
      <div className={`lead-form lead-form--done${className ? ` ${className}` : ''}`}>
        <span className="lead-form__tick" aria-hidden="true">
          <Check width={26} height={26} />
        </span>
        <h3 className="lead-form__title">{d.form.successTitle}</h3>
        <p className="muted">{DEMO ? d.form.demoSuccess : d.form.successText}</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
          {d.form.another}
        </button>
      </div>
    );
  }

  return (
    <form className={`lead-form${className ? ` ${className}` : ''}`} onSubmit={onSubmit} noValidate>
      <label className="field">
        <span className="field__label">{d.form.name}</span>
        <input
          className="input"
          type="text"
          name="name"
          autoComplete="name"
          placeholder={d.form.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span className="field__label">{d.form.phone}</span>
        <input
          className="input"
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder={d.form.phonePlaceholder}
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          required
        />
      </label>

      <label className="field">
        <span className="field__label">{d.form.interest}</span>
        <select
          className="select"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        >
          <option value="">{d.form.interestPlaceholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {showComment ? (
        <label className="field">
          <span className="field__label">{d.form.comment}</span>
          <textarea
            className="textarea"
            name="comment"
            placeholder={d.form.commentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      ) : null}

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn--accent btn--block lead-form__submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? d.form.submitting : (submitLabel ?? d.form.submit)}
      </button>

      <p className="form-note">{DEMO ? d.form.demoNote : d.form.consent}</p>
    </form>
  );
}
