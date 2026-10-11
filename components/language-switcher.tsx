'use client'

import { useTransition } from 'react'
import { setLocale } from '@/app/actions'
import { useI18n } from '@/components/i18n-provider'
import { localeOptions } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { locale, t } = useI18n()
  const [pending, startTransition] = useTransition()

  return (
    <div
      role="group"
      aria-label={t.topbar.language}
      className={cn('flex items-center divide-x divide-white/20', pending && 'opacity-60')}
    >
      {localeOptions.map((o) => {
        const active = o.locale === locale
        return (
          <button
            key={o.locale}
            type="button"
            lang={o.locale}
            title={o.name}
            aria-label={o.name}
            aria-pressed={active}
            disabled={pending}
            onClick={() => {
              if (!active) startTransition(() => setLocale(o.locale))
            }}
            className={cn(
              'px-3 text-xs font-medium tracking-wide transition-colors first:pl-0 last:pr-0',
              active ? 'text-white' : 'text-white/60 hover:text-white',
            )}
          >
            <span className={cn('border-b pb-0.5', active ? 'border-sand' : 'border-transparent')}>{o.short}</span>
          </button>
        )
      })}
    </div>
  )
}
