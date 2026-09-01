'use client';

import { useMemo, useState } from 'react';

import ProjectCard from './ProjectCard';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { districts, minPrice, projects, type ProjectStatus } from '@/lib/data/projects';
import { formatShortSum } from '@/lib/data/site';

const statusOrder: ProjectStatus[] = ['building', 'selling', 'done', 'soon'];

export default function ProjectsExplorer({ locale, d }: { locale: Locale; d: Dictionary }) {
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all');
  const [rooms, setRooms] = useState<number | 'all'>('all');
  const [district, setDistrict] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(0); // 0 = cheklovsiz

  const priceBounds = useMemo(() => {
    const values = projects.map((p) => p.pricePerSqm);
    return { min: Math.min(...values), max: Math.max(...values) };
  }, []);

  const activeMax = maxPrice || priceBounds.max;

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (status !== 'all' && p.status !== status) return false;
        if (rooms !== 'all' && !p.roomOptions.includes(rooms)) return false;
        if (district !== 'all' && p.districtKey !== district) return false;
        if (p.pricePerSqm > activeMax) return false;
        return true;
      }),
    [status, rooms, district, activeMax],
  );

  const dirty = status !== 'all' || rooms !== 'all' || district !== 'all' || maxPrice !== 0;

  function reset() {
    setStatus('all');
    setRooms('all');
    setDistrict('all');
    setMaxPrice(0);
  }

  const roomChoices: (number | 'all')[] = ['all', 0, 1, 2, 3, 4];

  return (
    <>
      <div className="filters">
        <div className="filters__row">
          <span className="filters__label">{d.projects.filterStatus}</span>
          <div className="chips">
            <button
              type="button"
              className="chip"
              aria-pressed={status === 'all'}
              onClick={() => setStatus('all')}
            >
              {d.projects.filterAll}
            </button>
            {statusOrder.map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                aria-pressed={status === s}
                onClick={() => setStatus(s)}
              >
                {d.status[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="filters__row">
          <span className="filters__label">{d.projects.filterRooms}</span>
          <div className="chips">
            {roomChoices.map((r) => (
              <button
                key={String(r)}
                type="button"
                className="chip"
                aria-pressed={rooms === r}
                onClick={() => setRooms(r)}
              >
                {r === 'all'
                  ? d.projects.filterAll
                  : r === 0
                    ? d.form.options.studio
                    : `${r}${r === 4 ? '+' : ''}`}
              </button>
            ))}
          </div>
        </div>

        <div className="filters__row filters__row--split">
          <div className="filters__col">
            <span className="filters__label">{d.projects.filterDistrict}</span>
            <select
              className="select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              aria-label={d.projects.filterDistrict}
            >
              <option value="all">{d.projects.filterAll}</option>
              {districts.map((x) => (
                <option key={x.key} value={x.key}>
                  {x.label[locale]}
                </option>
              ))}
            </select>
          </div>

          <div className="filters__col">
            <span className="filters__label">
              {d.projects.filterPrice}:{' '}
              <strong>
                {formatShortSum(activeMax, locale)} {d.common.sum}
              </strong>
            </span>
            <input
              className="range"
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={100_000}
              value={activeMax}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label={d.projects.filterPrice}
            />
          </div>
        </div>

        <div className="filters__foot">
          <span className="muted">
            <strong>{filtered.length}</strong> {d.projects.found}
          </span>
          {dirty ? (
            <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
              {d.projects.reset}
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length ? (
        <div className="grid grid--3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} locale={locale} d={d} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="empty-state">{d.projects.empty}</p>
      )}

      <p className="form-note" style={{ marginTop: 20 }}>
        {d.projects.priceFrom}:{' '}
        {projects
          .map((p) => `${p.name} — ${formatShortSum(minPrice(p), locale)} ${d.common.sum}`)
          .join(' · ')}
      </p>
    </>
  );
}
