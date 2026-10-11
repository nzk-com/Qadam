import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { getDictionary } from '@/lib/i18n/server'
import { cn } from '@/lib/utils'

export async function SiteHeader() {
  const { t } = await getDictionary()
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav aria-label={t.nav.main} className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="hover:text-foreground">{t.nav.services}</a>
          <a href="#quality" className="hover:text-foreground">{t.nav.quality}</a>
          <a href="#corpora" className="hover:text-foreground">{t.nav.corpora}</a>
          <a href="#calculator" className="hover:text-foreground">{t.nav.calculator}</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/client" className={cn(buttonVariants({ variant: 'ghost' }), 'hidden sm:inline-flex')}>
            {t.nav.login}
          </Link>
          <a href="#request" className={buttonVariants()}>
            {t.nav.demo}
          </a>
        </div>
      </div>
    </header>
  )
}

export async function Hero() {
  const { t } = await getDictionary()
  const h = t.hero
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-terracotta">
            <span className="h-px w-8 bg-terracotta/60" />
            {h.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-balance text-primary md:text-5xl">
            {h.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{h.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#request" className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5')}>
              {h.ctaPrimary}
              <ArrowRight />
            </a>
            <Link href="/rlhf" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 bg-background px-5')}>
              {h.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-md border border-border bg-background">
          <Image
            src="/steppe.png"
            alt={h.imageAlt}
            width={1024}
            height={768}
            priority
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-md border border-border bg-background/95 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-muted-foreground">{h.cardLabel}</p>
            <p className="mt-1 text-sm">
              «сізге паспорт қажет болады» — <span className="font-medium text-terracotta">{h.cardFlag}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{h.cardNote}</p>
          </div>
        </div>
      </div>
      <dl className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-border px-4 md:px-6">
          {h.stats.map((s) => (
            <div key={s.label} className="px-4 py-6 first:pl-0 md:px-8 md:first:pl-0">
              <dt className="font-serif text-3xl font-semibold text-primary">{s.value}</dt>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground md:text-sm">{s.label}</dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  )
}
