'use client'

import { Mail } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { LanguageSwitcher } from '@/components/language-switcher'

export function TopBar() {
  const { t } = useI18n()
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <p className="hidden truncate text-xs text-white/70 sm:block">{t.topbar.tagline}</p>
        <div className="ml-auto flex items-center gap-5">
          <a
            href="mailto:contact@dala.ai"
            className="hidden items-center gap-1.5 text-xs text-white/70 hover:text-white md:flex"
          >
            <Mail className="size-3.5" />
            contact@dala.ai
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
