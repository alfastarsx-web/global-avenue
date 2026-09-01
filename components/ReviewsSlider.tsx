'use client';

import { useRef } from 'react';

import { ArrowRight, Play, Star } from './Icons';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { reviews } from '@/lib/data/content';

export default function ReviewsSlider({ locale, d }: { locale: Locale; d: Dictionary }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(dir: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 420), behavior: 'smooth' });
  }

  return (
    <div className="slider">
      <ul className="slider__track" ref={trackRef}>
        {reviews.map((r) => (
          <li key={r.id} className="slider__slide">
            <article className="review">
              <div className="review__stars" aria-label={`${r.rating} / 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    width={15}
                    height={15}
                    style={{ opacity: i < r.rating ? 1 : 0.22 }}
                  />
                ))}
              </div>
              <p className="review__text">{r.text[locale]}</p>
              <footer className="review__foot">
                <div>
                  <p className="review__name">{r.name}</p>
                  <p className="review__role">{r.role[locale]}</p>
                </div>
                {r.hasVideo ? (
                  <span className="review__video" title={d.reviews.videoTitle}>
                    <Play width={18} height={18} />
                  </span>
                ) : null}
              </footer>
            </article>
          </li>
        ))}
      </ul>

      <div className="slider__nav">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous">
          <ArrowRight width={20} height={20} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Next">
          <ArrowRight width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
