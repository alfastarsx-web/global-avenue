'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { formatDate } from '@/lib/data/site';
import { progressUpdates } from '@/lib/data/content';
import { projects } from '@/lib/data/projects';

export default function ProgressFeed({ locale, d }: { locale: Locale; d: Dictionary }) {
  const [slug, setSlug] = useState<string>('all');

  const items = useMemo(
    () =>
      progressUpdates
        .filter((u) => slug === 'all' || u.projectSlug === slug)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [slug],
  );

  return (
    <>
      <div className="filters filters--inline">
        <span className="filters__label">{d.progress.filterProject}</span>
        <div className="chips">
          <button
            type="button"
            className="chip"
            aria-pressed={slug === 'all'}
            onClick={() => setSlug('all')}
          >
            {d.projects.filterAll}
          </button>
          {projects.map((p) => (
            <button
              key={p.slug}
              type="button"
              className="chip"
              aria-pressed={slug === p.slug}
              onClick={() => setSlug(p.slug)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="empty-state">{d.progress.empty}</p>
      ) : (
        <ol className="progress-list">
          {items.map((u) => {
            const project = projects.find((p) => p.slug === u.projectSlug);
            return (
              <li key={u.id} className="progress-item">
                <div className="progress-item__media ratio ratio--4x3">
                  <Image
                    src={u.image}
                    alt={u.title[locale]}
                    fill
                    sizes="(max-width: 900px) 100vw, 380px"
                  />
                </div>
                <div className="progress-item__body">
                  <div className="progress-item__head">
                    <span className="badge badge--soon">{project?.name}</span>
                    <time dateTime={u.date} className="muted">
                      {formatDate(u.date, locale)}
                    </time>
                  </div>
                  <h3 className="progress-item__title">{u.title[locale]}</h3>
                  <p className="muted">{u.text[locale]}</p>

                  <div className="progress-bar" aria-label={`${u.percent}%`}>
                    <span className="progress-bar__fill" style={{ width: `${u.percent}%` }} />
                  </div>
                  <p className="progress-item__pct">{u.percent}%</p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
