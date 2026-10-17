import { PilotButton } from '@/components/pilot-button'
import { getDictionary } from '@/lib/i18n/server'

export async function CtaBand({ variant }: { variant: 'mid' | 'final' }) {
  const { t } = await getDictionary()
  const c = t.cta[variant]
  const headingId = `cta-${variant}-title`
  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden border-y border-white/30 bg-gradient-to-b from-[#b7d2e4]/40 to-[#eef5fa]"
    >
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center md:px-6 md:py-20">
        <div className="max-w-2xl">
          <h2
            id={headingId}
            className="font-serif text-2xl font-semibold tracking-tight text-balance text-primary md:text-3xl"
          >
            {c.title}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">{c.text}</p>
        </div>
        <div className="shrink-0 pt-2">
          <PilotButton size="xl" />
        </div>
      </div>
    </section>
  )
}
