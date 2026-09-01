'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { ArrowRight, Close } from './Icons';

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenAt((i) => (i === null ? null : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [openAt, close, step]);

  return (
    <>
      <div className="gallery">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`gallery__item${i === 0 ? ' gallery__item--lead' : ''}`}
            onClick={() => setOpenAt(i)}
            aria-label={`${alt} — ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              sizes={i === 0 ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 50vw, 20vw'}
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {openAt !== null ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt}>
          <button type="button" className="lightbox__backdrop" onClick={close} aria-label="Close" />
          <button type="button" className="lightbox__close" onClick={close} aria-label="Close">
            <Close width={26} height={26} />
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => step(-1)}
            aria-label="Previous"
          >
            <ArrowRight width={24} height={24} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <figure className="lightbox__figure">
            <Image
              src={images[openAt]}
              alt={`${alt} — ${openAt + 1}`}
              width={1400}
              height={900}
              sizes="90vw"
            />
            <figcaption>
              {openAt + 1} / {images.length}
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => step(1)}
            aria-label="Next"
          >
            <ArrowRight width={24} height={24} />
          </button>
        </div>
      ) : null}
    </>
  );
}
