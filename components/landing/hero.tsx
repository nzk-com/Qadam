import Link from 'next/link'
import Image from 'next/image'
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
    { href: '#workspace-link', label: 'Демо' },
    { href: '#faq', label: t.nav.faq },
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full border border-white/50 bg-white/40 px-5 shadow-[0_8px_32px_rgba(15,40,80,0.08)] backdrop-blur-2xl md:px-7">
        <Logo compact />
        <nav aria-label={t.nav.main} className="hidden items-center gap-8 text-[13px] font-medium text-deep-blue/75 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-deep-blue">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-full px-3 py-1.5 text-[13px] font-medium text-deep-blue/80 transition hover:bg-white/50 sm:inline-flex"
          >
            {t.nav.login}
          </Link>
          <Link
            href="/workspace"
            className="rounded-full bg-deep-blue px-4 py-2 text-[13px] font-medium text-white shadow-md transition hover:bg-primary"
          >
            Открыть демо
          </Link>
        </div>
      </div>
    </header>
  )
}

export async function Hero() {
  const { t } = await getDictionary()
  const h = t.hero
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Steppe landscape background */}
      <Image
        src="/images/hero-steppe.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Minimal veil — landscape stays sharp */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/50" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-24 pt-36 text-center md:px-6 md:pt-44">
        <p className="animate-fade-up mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-deep-blue drop-shadow-sm">
          Human data · Turkic languages
        </p>
        <h1 className="animate-fade-up stagger-1 max-w-4xl font-serif text-[3.1rem] font-medium leading-[1.06] tracking-tight text-deep-blue drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] md:text-6xl lg:text-[4.5rem]">
          {h.title}
        </h1>
        <p className="animate-fade-up stagger-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-deep-blue/90 drop-shadow-[0_1px_8px_rgba(255,255,255,0.8)] md:text-lg">
          {h.text}
        </p>

        <div className="animate-fade-up stagger-3 mt-8 flex flex-wrap items-center justify-center gap-2">
          {['Қазақша', 'Кыргызча', 'KK / RU', 'Preference', 'Red-team'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/60 bg-white/50 px-3.5 py-1.5 text-xs font-medium text-deep-blue/80 shadow-sm backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="animate-fade-up stagger-4 mt-10 flex flex-wrap items-center justify-center gap-3">
          <PilotButton size="xl" />
          <Link
            href="/workspace"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/70 bg-white/55 px-7 text-base font-medium text-deep-blue shadow-sm backdrop-blur-md transition hover:bg-white/80"
          >
            Смотреть демо
          </Link>
        </div>

        <div id="workspace-link" className="animate-fade-up stagger-5 relative mt-16 w-full max-w-3xl">
          <div className="absolute -inset-4 rounded-[2rem] bg-white/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/55 p-1 shadow-[0_24px_80px_rgba(15,40,80,0.12)] backdrop-blur-xl">
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
