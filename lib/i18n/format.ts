import type { Locale } from './config'

const groupSeparator: Record<Locale, string> = {
  kk: '\u00A0',
  ru: '\u00A0',
  en: ',',
}

const decimalSeparator: Record<Locale, string> = {
  kk: ',',
  ru: ',',
  en: '.',
}

const shortMonths: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  kk: ['қаң', 'ақп', 'нау', 'сәу', 'мам', 'мау', 'шіл', 'там', 'қыр', 'қаз', 'қар', 'жел'],
}

export function formatMessage(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''))
}

// Intl output for ru/kk differs between Node and browser ICU builds, which breaks hydration.
export function formatNumber(
  locale: Locale,
  value: number,
  options?: { maximumFractionDigits?: number },
) {
  const digits = options?.maximumFractionDigits ?? 0
  const [integer, fraction = ''] = Math.abs(value).toFixed(digits).split('.')
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator[locale])
  const trimmedFraction = fraction.replace(/0+$/, '')
  const sign = value < 0 && Number(`${integer}.${fraction || '0'}`) !== 0 ? '-' : ''
  return `${sign}${grouped}${trimmedFraction ? decimalSeparator[locale] + trimmedFraction : ''}`
}

export function formatShortDate(locale: Locale, iso: string) {
  const [, month, day] = iso.split('-').map(Number)
  const name = shortMonths[locale][month - 1]
  return locale === 'en' ? `${name} ${String(day).padStart(2, '0')}` : `${String(day).padStart(2, '0')} ${name}`
}
