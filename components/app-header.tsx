'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { useI18n } from '@/components/i18n-provider'
import { loadDemoUser, clearDemoUser, type DemoUser } from '@/lib/demo-auth'
import { Button } from '@/components/ui/button'

export function AppHeader() {
  const pathname = usePathname()
  const { t } = useI18n()
  const [user, setUser] = useState<DemoUser | null>(null)

  useEffect(() => {
    setUser(loadDemoUser())
  }, [pathname])

  const links = [
    { href: '/client', label: 'Клиент' },
    { href: '/workspace', label: 'Задания' },
    { href: '/academy', label: t.nav.academy },
    { href: '/admin', label: 'Админ' },
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-white/30 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label={t.nav.platform} className="-mr-2 flex items-center gap-1 overflow-x-auto">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/')
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap border-b-2 px-3 py-4 text-sm transition-colors',
                  active
                    ? 'border-primary font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {user.name} · {user.role}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clearDemoUser()
                  setUser(null)
                  window.location.href = '/'
                }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
                {t.nav.login}
              </Link>
              <Link href="/register">
                <Button size="sm">Регистрация</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
