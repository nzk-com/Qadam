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
    { href: '#workspace-link', label: 'Демо' },
    { href: '#faq', label: t.nav.faq },
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-white/40 bg-white/35 px-5 shadow-[0_8px_32px_rgba(15,40,80,0.08)] backdrop-blur-2xl md:px-7">
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
      {/* Atmospheric layers like the reference dunes/mist */}
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#6a9bb8_0%,#8fb6ce_22%,#b7d2e4_48%,#d7e8f3_72%,#eef5fa_100%)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[15%] h-[55%] w-[55%] rounded-full bg-white/25 blur-[100px] animate-float-slow" />
        <div className="absolute right-[-15%] top-[-5%] h-[60%] w-[55%] rounded-full bg-[#9ec4dc]/45 blur-[110px] animate-float" />
        <div className="absolute bottom-[-10%] left-[20%] h-[45%] w-[70%] rounded-[100%] bg-[#c5dced]/50 blur-[90px]" />
        {/* soft dune curves */}
        <svg className="absolute bottom-0 left-0 w-full opacity-40" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden>
          <path fill="rgba(255,255,255,0.35)" d="M0,224L80,208C160,192,320,160,480,165.3C640,171,800,213,960,224C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full opacity-50" viewBox="0 0 1440 280" preserveAspectRatio="none" aria-hidden>
          <path fill="rgba(238,245,250,0.85)" d="M0,160L120,176C240,192,480,224,720,218.7C960,213,1200,171,1320,149.3L1440,128L1440,280L1320,280C1200,280,960,280,720,280C480,280,240,280,120,280L0,280Z" />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-24 pt-36 text-center md:px-6 md:pt-44">
        <p className="animate-fade-up mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-deep-blue/55">
          AI data · Turkic languages · Human evaluation
        </p>
        <h1 className="animate-fade-up stagger-1 max-w-4xl font-serif text-[3.25rem] font-medium leading-[1.05] tracking-tight text-deep-blue md:text-7xl lg:text-[5rem]">
          <span className="block text-deep-blue/90">{h.title}</span>
        </h1>
        <p className="animate-fade-up stagger-2 mx-auto mt-7 max-w-2xl text-base leading-relaxed text-deep-blue/65 md:text-lg">
          {h.text}
        </p>

        <div className="animate-fade-up stagger-3 mt-8 flex flex-wrap items-center justify-center gap-2">
          {['Қазақша', 'Кыргызча', 'KK / RU', 'Preference', 'Red-team'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/50 bg-white/35 px-3.5 py-1.5 text-xs font-medium text-deep-blue/80 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="animate-fade-up stagger-4 mt-10 flex flex-wrap items-center justify-center gap-3">
          <PilotButton size="xl" />
          <Link
            href="/workspace"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'h-12 rounded-full border-white/60 bg-white/40 px-7 text-base text-deep-blue backdrop-blur hover:bg-white/70',
            )}
          >
            Смотреть демо
          </Link>
        </div>

        <div id="workspace-link" className="animate-fade-up stagger-5 relative mt-16 w-full max-w-3xl">
          <div className="absolute -inset-6 rounded-[2rem] bg-white/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/45 p-1 shadow-[0_24px_80px_rgba(15,40,80,0.12)] backdrop-blur-xl">
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
