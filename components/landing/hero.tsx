import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { PilotButton } from '@/components/pilot-button'
import { HeroDemo } from '@/components/landing/hero-demo'
import { getDictionary } from '@/lib/i18n/server'
import { cn } from '@/lib/utils'

export async function SiteHeader() {
  const { t } = await getDictionary()
  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#quality', label: t.nav.quality },
    { href: '#corpora', label: t.nav.corpora },
    { href: '#calculator', label: t.nav.calculator },
    { href: '#faq', label: t.nav.faq },
  ]
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label={t.nav.main} className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost' }), 'hidden sm:inline-flex lg:hidden xl:inline-flex')}
          >
            {t.nav.login}
          </Link>
          <PilotButton size="md" arrow={false} />
        </div>
      </div>
      <nav aria-label={t.nav.main} className="border-t border-border lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 md:px-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link href="/login" className="whitespace-nowrap px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground sm:hidden">
            {t.nav.login}
          </Link>
        </div>
      </nav>
    </header>
  )
}

export async function Hero() {
  const { t } = await getDictionary()
  const h = t.hero
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-20">
        <div>
          <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-primary md:text-5xl">
            {h.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{h.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PilotButton size="xl" />
            <a
              href="#corpora"
              className={cn(buttonVariants({ variant: 'outline' }), 'h-12 bg-background px-6 text-base')}
            >
              {h.ctaSecondary}
            </a>
          </div>
        </div>
        <HeroDemo />
      </div>
    </section>
  )
}
