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
      className={cn(
        'flex items-center rounded-full border border-deep-blue/15 bg-white/80 p-0.5 shadow-sm backdrop-blur-md',
        pending && 'opacity-60',
      )}
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
              'rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors',
              active
                ? 'bg-deep-blue text-white shadow-sm'
                : 'text-deep-blue/55 hover:bg-deep-blue/8 hover:text-deep-blue',
            )}
          >
            {o.short}
          </button>
        )
      })}
    </div>
  )
}
