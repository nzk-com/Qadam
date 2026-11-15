'use client'

import { Mail } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { LanguageSwitcher } from '@/components/language-switcher'

export function TopBar() {
  const { t } = useI18n()
  return (
    <div className="relative z-[60] border-b border-white/30 bg-white/35 backdrop-blur-md">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="ml-auto flex items-center gap-4">
          <a
            href="mailto:Qdmm.startup@gmail.com"
            className="hidden items-center gap-1.5 text-xs font-medium text-deep-blue/70 hover:text-deep-blue md:flex"
          >
            <Mail className="size-3.5" />
            Qdmm.startup@gmail.com
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
