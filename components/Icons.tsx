import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.7 2 2 0 016.5 3.5z" />
  </svg>
);

export const MapPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Clock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

export const Star = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5z" />
  </svg>
);

export const Play = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="currentColor" stroke="none" />
  </svg>
);

export const Telegram = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M21.3 4.3L2.9 11.4c-.9.35-.88 1.63.03 1.95l4.6 1.6 1.75 5.5c.24.75 1.2.94 1.72.35l2.5-2.85 4.62 3.4c.62.46 1.5.12 1.66-.63l3.1-14.9c.18-.86-.68-1.6-1.58-1.52zM8.9 14.2l9.2-5.6-7.5 6.9-.4 3-1.3-4.3z" />
  </svg>
);

export const Whatsapp = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 2a10 10 0 00-8.6 15.05L2 22l5.1-1.33A10 10 0 1012 2zm0 1.9a8.1 8.1 0 016.9 12.35l-.28.45.76 2.77-2.85-.75-.43.26A8.1 8.1 0 1112 3.9zm-3.5 4c-.2 0-.5.07-.77.36-.26.29-1 1-1 2.42s1.03 2.8 1.17 3c.14.19 2 3.18 4.94 4.33 2.44.95 2.94.76 3.47.71.53-.05 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.14-.19.29-.74.93-.9 1.12-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.44.12-.59.13-.13.29-.34.43-.5.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.56-.88-2.13-.23-.55-.46-.48-.64-.49h-.55z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const Building = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 21V6.5L12 3l8 3.5V21" />
    <path d="M4 21h16" />
    <path d="M9 21v-5h6v5" />
    <path d="M8.5 9h2M13.5 9h2M8.5 12.5h2M13.5 12.5h2" />
  </svg>
);

export const Shield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5.5c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const Layers = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
);

export const Ruler = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="8" width="19" height="8" rx="1.5" />
    <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
  </svg>
);

export const Calendar = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const Calculator = (p: P) => (
  <svg {...base} {...p}>
    <rect x="5" y="2.5" width="14" height="19" rx="2" />
    <path d="M8 6.5h8M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01" />
  </svg>
);

export const Camera = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 8.5A2 2 0 015 6.5h2.2l1.2-2h7.2l1.2 2H19a2 2 0 012 2V18a2 2 0 01-2 2H5a2 2 0 01-2-2V8.5z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const Users = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M2.8 20a6.2 6.2 0 0112.4 0" />
    <path d="M16 5.2a3.4 3.4 0 010 6.6M17.5 14.4A6.2 6.2 0 0121.2 20" />
  </svg>
);

export const Award = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.5 13.8L7 21l5-2.4L17 21l-1.5-7.2" />
  </svg>
);

export const Wallet = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" />
    <path d="M3 10h18M16.5 14.5h.01" />
  </svg>
);

export const Globe = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5z" />
  </svg>
);
