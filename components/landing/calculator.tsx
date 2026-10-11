'use client'

import { useMemo, useState } from 'react'
import { services } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const urgency = [
  { id: 'std', label: 'Стандарт', k: 1 },
  { id: 'fast', label: 'Ускоренно', k: 1.25 },
  { id: 'rush', label: 'Срочно', k: 1.5 },
]

const defaults: Record<string, number> = {
  rlhf: 5000,
  redteam: 1000,
  localization: 40,
  corpora: 20,
  transcription: 100,
}

const fmt = (n: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n)

export function Calculator() {
  const [serviceId, setServiceId] = useState<string>('rlhf')
  const [volume, setVolume] = useState(defaults.rlhf)
  const [langs, setLangs] = useState(1)
  const [urg, setUrg] = useState('std')

  const service = services.find((s) => s.id === serviceId)!
  const estimate = useMemo(() => {
    const k = urgency.find((u) => u.id === urg)!.k
    const langK = langs === 2 ? 1.8 : 1
    const base = volume * service.price * k * langK
    return { low: base * 0.85, high: base * 1.15 }
  }, [service, volume, langs, urg])

  const unitLabel = service.unit.replace('за ', '')

  return (
    <section id="calculator" className="scroll-mt-16 border-b border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-5 md:px-6 md:py-20">
        <div className="md:col-span-2">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary">Калькулятор проекта</h2>
          <p className="mt-3 text-muted-foreground">
            Ориентировочная оценка стоимости. Точное предложение менеджер подготовит после обсуждения инструкций и
            образцов данных.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-6 md:col-span-3">
          <fieldset>
            <legend className="text-sm font-medium">Услуга</legend>
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
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-sm transition-colors',
                    serviceId === s.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:bg-secondary',
                  )}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <label htmlFor="volume" className="flex items-baseline justify-between text-sm font-medium">
              <span>Объём</span>
              <span className="font-normal text-muted-foreground">
                {fmt(volume)} · {unitLabel}
              </span>
            </label>
            <input
              id="volume"
              type="range"
              min={10}
              max={service.id === 'rlhf' || service.id === 'redteam' ? 20000 : 500}
              step={service.id === 'rlhf' || service.id === 'redteam' ? 10 : 1}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-3 w-full accent-terracotta"
            />
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <fieldset>
              <legend className="text-sm font-medium">Языки</legend>
              <div className="mt-2 flex gap-2">
                {[
                  [1, 'Один язык'],
                  [2, 'KZ + KG'],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={langs === v}
                    onClick={() => setLangs(v as number)}
                    className={cn(
                      'flex-1 rounded-md border px-3 py-1.5 text-sm',
                      langs === v ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary',
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-medium">Срочность</legend>
              <div className="mt-2 flex gap-2">
                {urgency.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    aria-pressed={urg === u.id}
                    onClick={() => setUrg(u.id)}
                    className={cn(
                      'flex-1 rounded-md border px-2 py-1.5 text-sm',
                      urg === u.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary',
                    )}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-8 rounded-lg bg-secondary p-5" aria-live="polite">
            <p className="text-sm text-muted-foreground">Ориентировочная стоимость</p>
            <p className="mt-1 font-serif text-3xl font-semibold text-primary">
              ${fmt(estimate.low)} – ${fmt(estimate.high)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
