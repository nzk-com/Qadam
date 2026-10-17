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
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md shadow-sm">
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
    <section className="border-b border-border gradient-hero relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 size-56 rounded-full bg-deco-blue/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-24">
        <div className="animate-fade-up">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-medium text-deep-blue shadow-sm backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Қазақша · Кыргызча · KK/RU
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-deep-blue md:text-5xl lg:text-[3.25rem]">
            {h.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{h.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PilotButton size="xl" />
            <a
              href="#corpora"
              className={cn(buttonVariants({ variant: 'outline' }), 'h-12 bg-white/90 px-6 text-base shadow-sm')}
            >
              {h.ctaSecondary}
            </a>
            <a
              href="/workspace"
              className={cn(buttonVariants({ variant: 'ghost' }), 'h-12 px-4 text-base text-primary')}
            >
              Открыть демо →
            </a>
          </div>
        </div>
        <div className="animate-fade-up stagger-3">
          <HeroDemo />
        </div>
      </div>
    </section>
  )
}
