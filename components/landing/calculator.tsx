'use client'

import { useMemo, useState } from 'react'
import { useI18n } from '@/components/i18n-provider'
import { SectionHead } from '@/components/section-head'
import { services } from '@/lib/demo-data'
import { formatNumber } from '@/lib/i18n/format'
import { cn } from '@/lib/utils'

type ServiceId = (typeof services)[number]['id']

const urgency = [
  { id: 'std', k: 1 },
  { id: 'fast', k: 1.25 },
  { id: 'rush', k: 1.5 },
] as const

const defaults: Record<ServiceId, number> = {
  rlhf: 5000,
  redteam: 1000,
  localization: 40,
  corpora: 20,
  transcription: 100,
}

const choice = (active: boolean) =>
  active ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary'

export function Calculator() {
  const { locale, t } = useI18n()
  const c = t.calculator
  const [serviceId, setServiceId] = useState<ServiceId>('rlhf')
  const [volume, setVolume] = useState(defaults.rlhf)
  const [langs, setLangs] = useState(1)
  const [urg, setUrg] = useState<(typeof urgency)[number]['id']>('std')

  const service = services.find((s) => s.id === serviceId)!
  const estimate = useMemo(() => {
    const k = urgency.find((u) => u.id === urg)!.k
    const langK = langs === 2 ? 1.8 : 1
    const base = volume * service.price * k * langK
    return { low: base * 0.85, high: base * 1.15 }
  }, [service, volume, langs, urg])

  const fmt = (n: number) => formatNumber(locale, n)
  const large = service.id === 'rlhf' || service.id === 'redteam'

  return (
    <section id="calculator" className="scroll-mt-16 border-b border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-5 md:px-6 md:py-20">
        <div className="md:col-span-2">
          <SectionHead index="04" eyebrow={c.eyebrow} title={c.title} text={c.text} />
        </div>
        <div className="rounded-md border border-border bg-background p-6 md:col-span-3">
          <fieldset>
            <legend className="text-sm font-medium">{c.service}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={serviceId === s.id}
                  onClick={() => {
                    setServiceId(s.id)
                    setVolume(defaults[s.id])
                  }}
                  className={cn('rounded-md border px-3 py-1.5 text-sm transition-colors', choice(serviceId === s.id))}
                >
                  {t.services.items[s.id].title}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <label htmlFor="volume" className="flex items-baseline justify-between text-sm font-medium">
              <span>{c.volume}</span>
              <span className="font-normal text-muted-foreground">
                {fmt(volume)} · {t.services.items[service.id].unitShort}
              </span>
            </label>
            <input
              id="volume"
              type="range"
              min={10}
              max={large ? 20000 : 500}
              step={large ? 10 : 1}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-3 w-full accent-terracotta"
            />
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <fieldset>
              <legend className="text-sm font-medium">{c.languages}</legend>
              <div className="mt-2 flex gap-2">
                {[
                  [1, c.langOne],
                  [2, c.langBoth],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={langs === v}
                    onClick={() => setLangs(v as number)}
                    className={cn('flex-1 rounded-md border px-3 py-1.5 text-sm', choice(langs === v))}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
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
          </div>

          <div className="mt-8 rounded-md border border-border bg-secondary p-5" aria-live="polite">
            <p className="text-sm text-muted-foreground">{c.estimate}</p>
            <p className="mt-1 font-serif text-3xl font-semibold text-primary">
              ${fmt(estimate.low)} – ${fmt(estimate.high)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
