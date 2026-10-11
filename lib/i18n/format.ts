import type { Locale } from './config'

const intlTag: Record<Locale, string> = {
  kk: 'kk-KZ',
  ru: 'ru-RU',
  en: 'en-US',
}

export function formatMessage(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''))
}

export function formatNumber(locale: Locale, value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(intlTag[locale], { maximumFractionDigits: 0, ...options }).format(value)
}

export function formatShortDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(intlTag[locale], {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T12:00:00Z`))
}
