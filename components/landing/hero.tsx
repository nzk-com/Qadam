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
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label={t.nav.main} className="hidden items-center gap-7 text-sm text-deep-blue/70 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-deep-blue">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost' }), 'hidden text-deep-blue sm:inline-flex')}
          >
            {t.nav.login}
          </Link>
          <PilotButton size="md" arrow={false} />
        </div>
      </div>
      <nav aria-label={t.nav.main} className="border-t border-white/30 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 md:px-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap px-3 py-2.5 text-sm text-deep-blue/70 hover:text-deep-blue"
            >
              {l.label}
            </a>
          ))}
          <Link href="/login" className="whitespace-nowrap px-3 py-2.5 text-sm text-deep-blue/70 sm:hidden">
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
    <section className="relative overflow-hidden mesh-hero">
      {/* floating orbs */}
      <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-white/30 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute right-0 top-10 size-96 rounded-full bg-sky-200/40 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-64 rounded-full bg-white/25 blur-3xl animate-pulse-soft" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-3.5 py-1.5 text-xs font-medium text-deep-blue shadow-sm backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Қазақша · Кыргызча · KK/RU
          </p>
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.08] tracking-tight text-deep-blue md:text-6xl lg:text-[3.75rem]">
            {h.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-deep-blue/70">{h.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PilotButton size="xl" />
            <a
              href="#corpora"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-12 border-white/60 bg-white/50 px-6 text-base text-deep-blue backdrop-blur hover:bg-white/80',
              )}
            >
              {h.ctaSecondary}
            </a>
            <a
              href="/workspace"
              className={cn(buttonVariants({ variant: 'ghost' }), 'h-12 px-4 text-base text-deep-blue/80')}
            >
              Открыть демо →
            </a>
          </div>
        </div>

        <div className="animate-fade-up stagger-3 relative">
          <div className="absolute -inset-4 rounded-3xl bg-white/20 blur-2xl" />
          <div className="relative glass-strong rounded-3xl p-1">
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
