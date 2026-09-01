'use client';

import { useEffect, useState } from 'react';

import { Close, Phone, Telegram, Whatsapp } from './Icons';
import type { Dictionary } from '@/lib/i18n';
import { site, tel } from '@/lib/data/site';

export default function QuickContact({ d }: { d: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`quick${shown ? ' is-shown' : ''}`}>
      <div className={`quick__list${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="quick__item quick__item--tg"
          tabIndex={open ? 0 : -1}
        >
          <Telegram width={20} height={20} />
          <span>Telegram</span>
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="quick__item quick__item--wa"
          tabIndex={open ? 0 : -1}
        >
          <Whatsapp width={20} height={20} />
          <span>WhatsApp</span>
        </a>
        <a href={tel(site.phones[0])} className="quick__item quick__item--tel" tabIndex={open ? 0 : -1}>
          <Phone width={20} height={20} />
          <span>{site.phones[0]}</span>
        </a>
      </div>

      <button
        type="button"
        className="quick__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? d.nav.close : d.common.quickContact}
      >
        {open ? <Close width={22} height={22} /> : <Phone width={22} height={22} />}
      </button>
    </div>
  );
}
