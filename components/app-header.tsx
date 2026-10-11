'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { useI18n } from '@/components/i18n-provider'

export function AppHeader() {
  const pathname = usePathname()
  const { t } = useI18n()
  const links = [
    { href: '/client', label: t.nav.client },
    { href: '/academy', label: t.nav.academy },
    { href: '/rlhf', label: t.nav.workspace },
    { href: '/admin', label: t.nav.admin },
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label={t.nav.platform} className="-mr-2 flex items-center gap-1 overflow-x-auto">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap border-b-2 px-3 py-4 text-sm transition-colors',
                  active
                    ? 'border-terracotta font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
