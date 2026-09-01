import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

function pickLocale(req: NextRequest): string {
  const cookie = req.cookies.get('locale')?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;

  const header = req.headers.get('accept-language') ?? '';
  // Rus tilini afzal ko'rgan foydalanuvchilarni /ru ga yo'naltiramiz
  const preferred = header
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase())
    .find((tag) => tag.startsWith('ru') || tag.startsWith('uz'));

  if (preferred?.startsWith('ru')) return 'ru';
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/img') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|img|.*\\..*).*)'],
};
