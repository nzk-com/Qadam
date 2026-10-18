import { PilotButton } from '@/components/pilot-button'
import { getDictionary } from '@/lib/i18n/server'

export async function CtaBand({ variant }: { variant: 'mid' | 'final' }) {
  const { t } = await getDictionary()
  const c = t.cta[variant]
  const headingId = `cta-${variant}-title`
  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden px-4 py-6 md:px-6"
    >
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/50 bg-gradient-to-br from-deep-blue via-primary to-sky-500 px-6 py-14 text-center shadow-[0_20px_60px_-20px_rgba(21,59,112,0.35)] md:px-12">
        <div className="pointer-events-none absolute -left-10 top-0 size-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 size-48 rounded-full bg-sky-300/20 blur-3xl" />
        <h2
          id={headingId}
          className="relative font-serif text-2xl font-medium tracking-tight text-white md:text-3xl"
        >
          {c.title}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
          {c.text}
        </p>
        <div className="relative mt-8">
          <a
            href="#request"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-deep-blue shadow-lg transition hover:bg-white/90 active:scale-[0.98]"
          >
            {t.nav.pilot}
          </a>
        </div>
      </div>
    </section>
  )
}
