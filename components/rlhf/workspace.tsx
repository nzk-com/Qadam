'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, Flag, SkipForward } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { Button } from '@/components/ui/button'
import { criteriaIds, glossary, rlhfTask, tagIds, type TagId } from '@/lib/demo-data'
import { formatMessage } from '@/lib/i18n/format'
import { cn } from '@/lib/utils'

type Ratings = Record<string, Record<string, number>>

const formatTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export function Workspace() {
  const { t } = useI18n()
  const w = t.rlhf
  const [active, setActive] = useState('A')
  const [best, setBest] = useState<string | null>(null)
  const [ratings, setRatings] = useState<Ratings>({})
  const [tags, setTags] = useState<Record<string, TagId[]>>({})
  const [comment, setComment] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [saved, setSaved] = useState(true)
  const [reporting, setReporting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(rlhfTask.done)

  useEffect(() => {
    if (submitted) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [submitted])

  useEffect(() => {
    if (saved) return
    const timer = setTimeout(() => setSaved(true), 700)
    return () => clearTimeout(timer)
  }, [saved, ratings, tags, comment, best])

  const touch = () => setSaved(false)

  const rate = (cid: string, v: number) => {
    setRatings((r) => ({ ...r, [active]: { ...r[active], [cid]: v } }))
    touch()
  }

  const toggleTag = (tag: TagId) => {
    setTags((prev) => {
      const cur = prev[active] ?? []
      return { ...prev, [active]: cur.includes(tag) ? cur.filter((x) => x !== tag) : [...cur, tag] }
    })
    touch()
  }

  const ratedCount = (id: string) => Object.keys(ratings[id] ?? {}).length
  const canSubmit = best !== null && rlhfTask.responses.every((r) => ratedCount(r.id) > 0)

  const reset = () => {
    setActive('A')
    setBest(null)
    setRatings({})
    setTags({})
    setComment('')
    setSeconds(0)
    setSubmitted(false)
    setReporting(false)
    setSaved(true)
  }

  const progress = Math.round((done / rlhfTask.total) * 100)
  const activeTags = tags[active] ?? []

  return (
    <div className="flex min-h-[calc(100vh-3.5rem-2.25rem)] flex-col">
      <div className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{w.project}</p>
            <p className="text-xs text-muted-foreground">
              {rlhfTask.id} · {w.language} · {w.deadline}
            </p>
          </div>
          <div className="flex min-w-48 flex-1 items-center gap-3">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-accent"
              role="progressbar"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={rlhfTask.total}
              aria-label={w.progressLabel}
            >
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">
              {done} / {rlhfTask.total}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 tabular-nums">
              <Clock className="size-4" />
              {formatTime(seconds)}
            </span>
            <span className={cn('text-xs', saved ? 'text-success' : 'text-muted-foreground')} aria-live="polite">
              {saved ? w.autosaved : w.saving}
            </span>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-3 px-4 py-16 text-center" role="status">
          <CheckCircle2 className="size-10 text-success" />
          <h2 className="font-serif text-2xl font-semibold text-primary">{w.submittedTitle}</h2>
          <p className="text-sm text-muted-foreground">{formatMessage(w.submittedText, { time: formatTime(seconds) })}</p>
          <Button className="mt-2" onClick={reset}>
            {w.next}
          </Button>
        </div>
      ) : (
        <div className="mx-auto grid w-full max-w-[1400px] flex-1 gap-0 lg:grid-cols-[280px_1fr_360px]">
          <aside className="border-b border-border p-4 lg:border-r lg:border-b-0 md:p-6" aria-label={w.regionInstruction}>
            <h2 className="font-serif text-lg font-semibold text-primary">{w.instruction}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.instructionText}</p>
            <h3 className="mt-6 text-sm font-medium">{w.criteriaTitle}</h3>
            <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
              {criteriaIds.map((id) => (
                <li key={id}>
                  <span className="font-medium text-foreground">{t.criteria[id].label}.</span> {t.criteria[id].hint}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-medium">{w.glossaryTitle}</h3>
            <dl className="mt-2 space-y-2 text-xs">
              {glossary.map((g) => {
                const note = t.glossaryNotes[g.id]
                return (
                  <div key={g.id}>
                    <dt className="font-medium">
                      {g.kk} <span className="font-normal text-muted-foreground">= {g.ru}</span>
                    </dt>
                    {note && <dd className="text-muted-foreground">{note}</dd>}
                  </div>
                )
              })}
            </dl>
          </aside>

          <section className="p-4 md:p-6" aria-label={w.regionResponses}>
            <div className="rounded-md border border-border bg-secondary p-4">
              <p className="text-xs font-medium text-muted-foreground">{w.promptLabel}</p>
              <p className="mt-1 text-lg font-medium">{rlhfTask.prompt}</p>
              <p className="mt-1 text-sm text-muted-foreground">{w.promptTranslation}</p>
            </div>
            <div className="mt-4 space-y-3">
              {rlhfTask.responses.map((r) => {
                const isActive = active === r.id
                return (
                  <div
                    key={r.id}
                    className={cn(
                      'rounded-md border bg-card p-4 transition-colors',
                      isActive ? 'border-primary ring-1 ring-primary' : 'border-border',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(r.id)}
                      aria-pressed={isActive}
                      className="block w-full text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <span className="flex size-6 items-center justify-center rounded-sm bg-primary text-xs text-primary-foreground">
                            {r.id}
                          </span>
                          {formatMessage(w.answer, { id: r.id })}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatMessage(w.rated, { n: ratedCount(r.id), total: criteriaIds.length })}
                        </span>
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed">{r.text}</p>
                    </button>
                    {(tags[r.id] ?? []).length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(tags[r.id] ?? []).map((tag) => (
                          <span key={tag} className="rounded-sm bg-terracotta/10 px-2 py-0.5 text-xs text-terracotta">
                            {t.tags[tag]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          <aside className="border-t border-border bg-secondary/50 p-4 lg:border-t-0 lg:border-l md:p-6" aria-label={w.regionRating}>
            <fieldset>
              <legend className="font-serif text-lg font-semibold text-primary">{w.bestTitle}</legend>
              <div className="mt-2 flex gap-2">
                {rlhfTask.responses.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={best === r.id}
                    onClick={() => {
                      setBest(r.id)
                      touch()
                    }}
                    className={cn(
                      'h-10 flex-1 rounded-md border text-sm font-medium transition-colors',
                      best === r.id
                        ? 'border-success bg-success text-white'
                        : 'border-border bg-background hover:bg-accent',
                    )}
                  >
                    {r.id}
                  </button>
                ))}
              </div>
            </fieldset>

            <h3 className="mt-6 text-sm font-medium">
              {w.criteriaFor} <span className="text-terracotta">{active}</span>
            </h3>
            <ul className="mt-2 space-y-3">
              {criteriaIds.map((id) => (
                <li key={id}>
                  <p className="text-xs">{t.criteria[id].label}</p>
                  <div
                    className="mt-1 flex gap-1"
                    role="radiogroup"
                    aria-label={formatMessage(w.criterionAria, { criterion: t.criteria[id].label, id: active })}
                  >
                    {[1, 2, 3, 4, 5].map((v) => {
                      const on = ratings[active]?.[id] === v
                      return (
                        <button
                          key={v}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => rate(id, v)}
                          className={cn(
                            'h-7 flex-1 rounded-sm border text-xs transition-colors',
                            on ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:bg-accent',
                          )}
                        >
                          {v}
                        </button>
                      )
                    })}
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-medium">{w.tagsTitle}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tagIds.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={activeTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'rounded-sm border px-2.5 py-1 text-xs transition-colors',
                    activeTags.includes(tag)
                      ? 'border-terracotta bg-terracotta text-white'
                      : 'border-border bg-background hover:bg-accent',
                  )}
                >
                  {t.tags[tag]}
                </button>
              ))}
            </div>

            <label className="mt-6 block text-sm font-medium" htmlFor="comment">
              {w.comment}
            </label>
            <textarea
              id="comment"
              rows={3}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
                touch()
              }}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
              placeholder={w.commentPlaceholder}
            />

            {reporting && (
              <div className="mt-4 rounded-md border border-border bg-background p-3 text-sm">
                <label htmlFor="report" className="font-medium">
                  {w.reportTitle}
                </label>
                <textarea
                  id="report"
                  rows={2}
                  className="mt-1.5 w-full rounded-md border border-input px-2 py-1.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                />
                <Button size="sm" className="mt-2" onClick={() => setReporting(false)}>
                  {w.reportSend}
                </Button>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2">
              <Button
                size="lg"
                className="h-11"
                disabled={!canSubmit}
                onClick={() => {
                  setSubmitted(true)
                  setDone((d) => d + 1)
                }}
              >
                {w.submit}
              </Button>
              {!canSubmit && <p className="text-xs text-muted-foreground">{w.hint}</p>}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={reset}>
                  <SkipForward />
                  {w.skip}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setReporting((v) => !v)}>
                  <Flag />
                  {w.issue}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
