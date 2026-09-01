import { uz, type Dictionary } from './uz';
import { ru } from './ru';
import type { Locale } from './config';

const dictionaries: Record<Locale, Dictionary> = { uz, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? uz;
}

export type { Dictionary };
export * from './config';
