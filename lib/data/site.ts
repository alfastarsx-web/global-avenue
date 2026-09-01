import type { Locale } from '@/lib/i18n/config';

/** Ikki tilli matn */
export type L = Record<Locale, string>;

export const site = {
  name: 'Global Avenue',
  legalName: 'Global Avenue QK',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://globalavenue.uz',
  city: { uz: 'Samarqand', ru: 'Самарканд' } as L,
  region: { uz: "Samarqand viloyati", ru: 'Самаркандская область' } as L,
  // Instagram bio'dan tasdiqlangan raqam
  phones: ['+998 66 230 00 08'],
  email: 'info@globalavenue.uz',
  telegram: 'https://t.me/GlobalAvenue_uz',
  // TODO: WhatsApp raqamini kompaniya bilan tasdiqlash kerak
  whatsapp: 'https://wa.me/998662300008',
  instagram: 'https://instagram.com/global_avenue.uz',
  youtube: 'https://youtube.com/@globalavenue',
  instagramHandle: '@global_avenue.uz',
  /** Sotuv ofisi koordinatalari (Registon, Samarqand — aniqlashtirilishi kerak) */
  geo: { lat: 39.6547, lng: 66.9758 },
  foundedYear: 2014,
};

export function tel(phone: string) {
  return 'tel:' + phone.replace(/[^\d+]/g, '');
}

/** 1 234 567 ko'rinishida — ikkala tilda ham bir xil o'qiladi */
export function formatSum(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** 12 500 000 -> "12,5 mln" ko'rinishi (karta ustidagi qisqa narx) */
export function formatShortSum(value: number, locale: Locale): string {
  if (value >= 1_000_000_000) {
    const v = (value / 1_000_000_000).toFixed(1).replace('.', ',').replace(',0', '');
    return `${v} ${locale === 'ru' ? 'млрд' : 'mlrd'}`;
  }
  if (value >= 1_000_000) {
    const v = (value / 1_000_000).toFixed(1).replace('.', ',').replace(',0', '');
    return `${v} ${locale === 'ru' ? 'млн' : 'mln'}`;
  }
  return formatSum(value);
}

export function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  const months: Record<Locale, string[]> = {
    uz: [
      'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
      'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
    ],
    ru: [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ],
  };
  return `${d.getDate()} ${months[locale][d.getMonth()]} ${d.getFullYear()}`;
}

/** "333 200 000 so'mdan" / "от 333 200 000 сум" */
export function priceFrom(value: number, locale: Locale, sumLabel: string): string {
  const n = formatSum(value);
  return locale === 'ru' ? `от ${n} ${sumLabel}` : `${n} ${sumLabel}dan`;
}
