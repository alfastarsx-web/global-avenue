export const locales = ['uz', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'uz';

export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: 'Русский',
};

export const localeShort: Record<Locale, string> = {
  uz: 'UZ',
  ru: 'RU',
};

/** hreflang uchun to'liq til kodlari */
export const htmlLang: Record<Locale, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
