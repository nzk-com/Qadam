export const locales = ['kk', 'ru', 'en'] as const
export type Locale = (typeof locales)[number]

export const DEFAULT_LOCALE: Locale = 'ru'
export const LOCALE_COOKIE = 'dala-locale'

export const localeOptions: { locale: Locale; short: string; name: string }[] = [
  { locale: 'kk', short: 'ҚАЗ', name: 'Қазақша' },
  { locale: 'ru', short: 'РУС', name: 'Русский' },
  { locale: 'en', short: 'ENG', name: 'English' },
]

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}
