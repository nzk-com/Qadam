import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from './config'
import { en } from './dictionaries/en'
import { kk } from './dictionaries/kk'
import { ru, type Dictionary } from './dictionaries/ru'

const dictionaries: Record<Locale, Dictionary> = { ru, en, kk }

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export async function getDictionary() {
  const locale = await getLocale()
  return { locale, t: dictionaries[locale] }
}
