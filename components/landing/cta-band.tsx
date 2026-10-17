import { PilotButton } from '@/components/pilot-button'
import { getDictionary } from '@/lib/i18n/server'

export async function CtaBand({ variant }: { variant: 'mid' | 'final' }) {
  const { t } = await getDictionary()
  const c = t.cta[variant]
  const headingId = `cta-${variant}-title`
  return (
    <section
      aria-labelledby={headingId}
      className="border-y border-white/40 bg-white/35 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:gap-10 md:px-6 md:py-12">
        <div className="max-w-2xl">
          <h2
            id={headingId}
            className="font-serif text-2xl font-semibold tracking-tight text-balance text-primary md:text-3xl"
          >
            {c.title}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">{c.text}</p>
        </div>
        <div className="shrink-0">
          <PilotButton size="xl" />
        </div>
      </div>
    </section>
  )
}
