import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, Building, Calendar, Layers } from './Icons';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { formatShortSum } from '@/lib/data/site';
import { minPrice, type Project } from '@/lib/data/projects';

export default function ProjectCard({
  project,
  locale,
  d,
  priority = false,
}: {
  project: Project;
  locale: Locale;
  d: Dictionary;
  priority?: boolean;
}) {
  const from = minPrice(project);

  return (
    <article className="card card--hover project-card">
      <Link href={`/${locale}/projects/${project.slug}`} className="project-card__link">
        <div className="ratio ratio--16x10 project-card__media">
          <Image
            src={project.cover}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
          <span className={`badge badge--dot badge--${project.status} project-card__status`}>
            {d.status[project.status]}
          </span>
        </div>

        <div className="card__body project-card__body">
          <h3 className="project-card__title">{project.name}</h3>
          <p className="project-card__tagline">{project.tagline[locale]}</p>

          <ul className="project-card__meta">
            <li>
              <Layers width={16} height={16} />
              {project.floors} {locale === 'ru' ? 'эт.' : 'qavat'}
            </li>
            <li>
              <Building width={16} height={16} />
              {project.apartments} {locale === 'ru' ? 'кв.' : 'xonadon'}
            </li>
            <li>
              <Calendar width={16} height={16} />
              {project.handover[locale]}
            </li>
          </ul>

          <div className="project-card__foot">
            <div>
              <span className="project-card__price-label">{d.common.from}</span>
              <span className="project-card__price">
                {formatShortSum(from, locale)} <small>{d.common.sum}</small>
              </span>
            </div>
            <span className="link-arrow">
              {d.cta.details}
              <ArrowRight width={17} height={17} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
