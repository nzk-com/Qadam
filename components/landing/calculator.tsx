'use client'

import { useMemo, useState } from 'react'
import { useI18n } from '@/components/i18n-provider'
import { SectionHead } from '@/components/section-head'
import { formatNumber } from '@/lib/i18n/format'
import { cn } from '@/lib/utils'

const volumes = [
  { id: 100, base: 850_000 },
  { id: 1000, base: 1_700_000 },
] as const

const langMult: Record<string, number> = {
  kk: 1,
  ky: 1.1,
  mix: 1.15,
}

const urgency = [
  { id: 'std', k: 1 },
  { id: 'fast', k: 1.25 },
  { id: 'rush', k: 1.5 },
] as const

const choice = (active: boolean) =>
  active ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary'

export function Calculator() {
  const { locale, t } = useI18n()
  const c = t.calculator
  const [volume, setVolume] = useState<(typeof volumes)[number]['id']>(100)
  const [lang, setLang] = useState<'kk' | 'ky' | 'mix'>('kk')
  const [urg, setUrg] = useState<(typeof urgency)[number]['id']>('std')

  const estimate = useMemo(() => {
    const pack = volumes.find((v) => v.id === volume)!
    const k = urgency.find((u) => u.id === urg)!.k
    const base = pack.base * langMult[lang] * k
    return { low: Math.round(base * 0.9), high: Math.round(base * 1.1) }
  }, [volume, lang, urg])

  const fmt = (n: number) => formatNumber(locale, n)

  return (
    <section id="calculator" className="scroll-mt-28 border-b border-border bg-secondary lg:scroll-mt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-5 md:px-6 md:py-20">
        <div className="md:col-span-2">
          <SectionHead index="05" eyebrow={c.eyebrow} title={c.title} text={c.text} />
          <a
            href="/workspace"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {c.processLink}
            <span aria-hidden>→</span>
          </a>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">{c.processHint}</p>
        </div>
        <div className="rounded-md border border-border bg-background p-6 md:col-span-3">
          <fieldset>
            <legend className="text-sm font-medium">{c.volume}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {volumes.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={volume === v.id}
                  onClick={() => setVolume(v.id)}
                  className={cn('rounded-md border px-3 py-1.5 text-sm transition-colors', choice(volume === v.id))}
                >
                  {v.id === 100 ? c.vol100 : c.vol1000}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">{c.languages}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ['kk', c.langKk],
                  ['ky', c.langKy],
                  ['mix', c.langMix],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={lang === id}
                  onClick={() => setLang(id)}
                  className={cn('rounded-md border px-3 py-1.5 text-sm', choice(lang === id))}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">{c.urgency}</legend>
            <div className="mt-2 flex gap-2">
              {urgency.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  aria-pressed={urg === u.id}
                  onClick={() => setUrg(u.id)}
                  className={cn('flex-1 rounded-md border px-2 py-1.5 text-sm', choice(urg === u.id))}
                >
                  {c.urgencyLevels[u.id]}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 rounded-md border border-border bg-secondary p-5" aria-live="polite">
            <p className="text-sm text-muted-foreground">{c.estimate}</p>
            <p className="mt-2 font-serif text-3xl font-medium text-deep-blue">
              {fmt(estimate.low)} – {fmt(estimate.high)} ₸
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{c.estimateNote}</p>
            <a
              href="#request"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-deep-blue px-5 text-sm font-medium text-white hover:bg-primary"
            >
              {c.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
