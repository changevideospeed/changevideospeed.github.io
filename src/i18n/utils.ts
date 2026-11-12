import { defaultLocale, localeList, ui, type Locale, type UITranslations } from './ui';

export function isValidLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (localeList as string[]).includes(value);
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, firstSegment] = url.pathname.split('/');
  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }
  return defaultLocale;
}

export function getTranslations(locale: Locale): UITranslations {
  return ui[locale] ?? ui[defaultLocale];
}

export function getLocalizedPath(locale: Locale, subpath = ''): string {
  const cleanSubpath = subpath.replace(/^\/+/, '');
  if (locale === defaultLocale) {
    return cleanSubpath ? `/${cleanSubpath}` : '/';
  }
  return cleanSubpath ? `/${locale}/${cleanSubpath}` : `/${locale}/`;
}
