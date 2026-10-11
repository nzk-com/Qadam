'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CircleAlert, CircleCheck, RotateCcw } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { Button } from '@/components/ui/button'
import { heroDemo } from '@/lib/demo-data'
import { formatMessage } from '@/lib/i18n/format'
import { cn } from '@/lib/utils'

export function HeroDemo() {
  const { t } = useI18n()
  const d = t.heroDemo
  const [best, setBest] = useState<string | null>(null)
  const [flags, setFlags] = useState<string[]>([])
  const [checked, setChecked] = useState(false)

  const correct = best === heroDemo.expert.best
  const expertTags = heroDemo.expert.tags.map((id) => t.tags[id]).join(', ')

  function toggleFlag(id: string) {
    setFlags((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))
  }

  function reset() {
    setBest(null)
    setFlags([])
    setChecked(false)
  }

  return (
    <div className="min-w-0 rounded-md border border-border bg-background shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
          <span className="size-1.5 rounded-full bg-terracotta" aria-hidden="true" />
          {d.label}
        </p>
        <p className="font-mono text-xs text-muted-foreground">{heroDemo.taskId}</p>
      </div>

      <div className="grid gap-5 p-5">
        <div className="rounded-md bg-secondary p-4">
          <p className="text-xs font-medium text-muted-foreground">{t.rlhf.promptLabel}</p>
          <p lang="kk" className="mt-1 font-medium leading-snug">
            {heroDemo.prompt}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{t.rlhf.promptTranslation}</p>
        </div>

        <fieldset disabled={checked} className="min-w-0">
          <legend className="text-sm font-medium">{d.legend}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {heroDemo.responses.map((r) => {
              const isExpert = checked && r.id === heroDemo.expert.best
              return (
                <label
                  key={r.id}
                  className={cn(
                    'flex cursor-pointer flex-col gap-2 rounded-md border border-border bg-background p-4 text-sm transition-colors hover:bg-secondary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/40',
                    best === r.id && 'border-terracotta bg-secondary ring-1 ring-terracotta',
                    isExpert && 'border-success ring-1 ring-success',
                    checked && 'cursor-default',
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {formatMessage(t.rlhf.answer, { id: r.id })}
                    </span>
                    <input
                      type="radio"
                      name="hero-best"
                      value={r.id}
                      checked={best === r.id}
                      onChange={() => setBest(r.id)}
                      className="size-4 accent-terracotta"
                    />
                  </span>
                  <span lang="kk" className="leading-relaxed">
                    {r.text}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset disabled={checked} className="min-w-0">
          <legend className="text-sm font-medium">{t.rlhf.tagsTitle}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {heroDemo.tags.map((id) => (
              <label
                key={id}
                className={cn(
                  'cursor-pointer rounded-sm border border-border px-2.5 py-1 text-xs transition-colors hover:bg-secondary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/40',
                  flags.includes(id) && 'border-terracotta bg-terracotta/10 text-terracotta',
                  checked && 'cursor-default',
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={flags.includes(id)}
                  onChange={() => toggleFlag(id)}
                />
                {t.tags[id]}
              </label>
            ))}
          </div>
        </fieldset>

        {checked && (
          <div
            role="status"
            className={cn(
              'flex gap-3 rounded-md border p-4 text-sm',
              correct ? 'border-success/40 bg-success/5' : 'border-terracotta/40 bg-terracotta/5',
            )}
          >
            {correct ? (
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <CircleAlert className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden="true" />
            )}
            <div>
              <p className="font-medium">{correct ? d.correctTitle : d.wrongTitle}</p>
              <p className="mt-1 text-muted-foreground">{d.expertText}</p>
              <p className="mt-1 text-muted-foreground">{formatMessage(d.flagsLine, { tags: expertTags })}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-secondary/60 px-5 py-3">
        <div className="min-w-0">
          {!checked && !best && <p className="text-xs text-muted-foreground">{d.hint}</p>}
          {(checked || best) && (
            <Link href="/rlhf" className="inline-flex items-center gap-1.5 text-sm text-terracotta hover:underline">
              {d.open}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
        {checked ? (
          <Button type="button" variant="outline" onClick={reset} className="h-9 gap-2 px-4">
            <RotateCcw />
            {d.retry}
          </Button>
        ) : (
          <Button type="button" disabled={!best} onClick={() => setChecked(true)} className="h-9 px-4">
            {d.check}
          </Button>
        )}
      </div>
    </div>
  )
}
