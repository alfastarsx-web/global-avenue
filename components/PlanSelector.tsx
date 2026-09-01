'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { formatSum } from '@/lib/data/site';
import type { Plan, Project } from '@/lib/data/projects';

export default function PlanSelector({
  project,
  locale,
  d,
}: {
  project: Project;
  locale: Locale;
  d: Dictionary;
}) {
  const [rooms, setRooms] = useState<number | 'all'>('all');
  const [minFloor, setMinFloor] = useState(1);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = useMemo(
    () =>
      project.plans.filter((p) => {
        if (rooms !== 'all' && p.rooms !== rooms) return false;
        if (p.floor < minFloor) return false;
        if (onlyAvailable && p.status !== 'available') return false;
        return true;
      }),
    [project.plans, rooms, minFloor, onlyAvailable],
  );

  const [activeId, setActiveId] = useState<string>(project.plans[0]?.id ?? '');
  const active: Plan | undefined =
    filtered.find((p) => p.id === activeId) ?? filtered[0] ?? undefined;

  const statusLabel: Record<Plan['status'], string> = {
    available: d.project.planAvailable,
    reserved: d.project.planReserved,
    sold: d.project.planSold,
  };

  const roomLabel = (n: number) => (n === 0 ? d.form.options.studio : `${n} ${d.project.planRooms}`);

  return (
    <div className="plans">
      <div className="plans__filters">
        <div className="chips">
          <button
            type="button"
            className="chip"
            aria-pressed={rooms === 'all'}
            onClick={() => setRooms('all')}
          >
            {d.projects.filterAll}
          </button>
          {project.roomOptions.map((r) => (
            <button
              key={r}
              type="button"
              className="chip"
              aria-pressed={rooms === r}
              onClick={() => setRooms(r)}
            >
              {roomLabel(r)}
            </button>
          ))}
        </div>

        <div className="plans__range">
          <label className="field__label" htmlFor="floor-range">
            {d.project.planFloor}: {minFloor}+ / {project.floors}
          </label>
          <input
            id="floor-range"
            className="range"
            type="range"
            min={1}
            max={project.floors}
            value={minFloor}
            onChange={(e) => setMinFloor(Number(e.target.value))}
          />
        </div>

        <label className="checkline">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          <span>{d.project.planAvailable}</span>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">{d.project.planEmpty}</p>
      ) : (
        <div className="plans__body">
          <div className="plans__preview">
            {active ? (
              <>
                <div className="plans__drawing">
                  <Image
                    src={active.image}
                    alt={`${project.name} — ${roomLabel(active.rooms)}, ${active.area} ${d.common.sqm}`}
                    width={520}
                    height={420}
                  />
                </div>
                <dl className="plans__specs">
                  <div>
                    <dt>{d.project.planArea}</dt>
                    <dd>
                      {active.area} {d.common.sqm}
                    </dd>
                  </div>
                  <div>
                    <dt>{d.project.planFloor}</dt>
                    <dd>{active.floor}</dd>
                  </div>
                  <div>
                    <dt>{d.project.planPrice}</dt>
                    <dd>
                      {formatSum(active.price)} {d.common.sum}
                    </dd>
                  </div>
                  <div>
                    <dt>{d.project.planStatus}</dt>
                    <dd>
                      <span className={`badge badge--${active.status === 'available' ? 'selling' : active.status === 'reserved' ? 'building' : 'done'}`}>
                        {statusLabel[active.status]}
                      </span>
                    </dd>
                  </div>
                </dl>
              </>
            ) : null}
          </div>

          <div className="table-wrap plans__table">
            <table className="data">
              <thead>
                <tr>
                  <th>{d.projects.filterRooms}</th>
                  <th>{d.project.planArea}</th>
                  <th>{d.project.planFloor}</th>
                  <th>{d.project.planPrice}</th>
                  <th>{d.project.planStatus}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className={`plans__row${active?.id === p.id ? ' is-active' : ''}`}
                    onClick={() => setActiveId(p.id)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={active?.id === p.id}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveId(p.id);
                      }
                    }}
                  >
                    <td>{roomLabel(p.rooms)}</td>
                    <td>
                      {p.area} {d.common.sqm}
                    </td>
                    <td>{p.floor}</td>
                    <td className="plans__price">
                      {formatSum(p.price)} {d.common.sum}
                    </td>
                    <td>
                      <span
                        className={`badge badge--${p.status === 'available' ? 'selling' : p.status === 'reserved' ? 'building' : 'done'}`}
                      >
                        {statusLabel[p.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
