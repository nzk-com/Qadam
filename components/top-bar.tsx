'use client'

import { Mail } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { LanguageSwitcher } from '@/components/language-switcher'

export function TopBar() {
  const { t } = useI18n()
  return (
    <div className="relative z-[60] border-b border-white/20 bg-white/20 backdrop-blur-md">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <p className="hidden truncate text-xs text-deep-blue/55 sm:block">{t.topbar.tagline}</p>
        <div className="ml-auto flex items-center gap-5">
          <a
            href="mailto:contact@qadam.ai"
            className="hidden items-center gap-1.5 text-xs text-deep-blue/55 hover:text-deep-blue md:flex"
          >
            <Mail className="size-3.5" />
            contact@qadam.ai
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
