import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Check, Lock } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { Progress } from '@/components/progress'
import { buttonVariants } from '@/components/ui/button'
import { academyModules, levels } from '@/lib/demo-data'
import { formatMessage, formatNumber } from '@/lib/i18n/format'
import { getDictionary } from '@/lib/i18n/server'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return { title: t.meta.academy }
}

export default async function Page() {
  const { locale, t } = await getDictionary()
  const a = t.academy
  const lessons = academyModules.reduce((sum, m) => sum + m.lessons, 0)
  const done = academyModules.reduce((sum, m) => sum + m.done, 0)
  const total = Math.round((done / lessons) * 100)
  const ratingValues = ['89%', '84%', formatNumber(locale, 212)]

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <p className="text-sm text-muted-foreground">
          {a.user} · {a.language} · {a.nda}
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary">{a.title}</h1>

        <ol className="mt-6 grid gap-3 sm:grid-cols-4" aria-label={a.levelsLabel}>
          {levels.map((l, i) => (
            <li
              key={l.name}
              aria-current={l.active ? 'step' : undefined}
              className={cn(
                'rounded-md border p-4',
                l.active ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                !l.reached && 'text-muted-foreground',
              )}
            >
              <p className="flex items-center gap-1.5 font-medium">
                {l.reached ? <Check className="size-4" /> : <Lock className="size-4" />}
                {l.name}
              </p>
              <p className={cn('mt-1 text-xs', l.active ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                {a.levelTexts[i]}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_300px]">
          <section aria-labelledby="modules">
            <div className="flex items-baseline justify-between">
              <h2 id="modules" className="font-serif text-xl font-semibold text-primary">{a.modulesTitle}</h2>
              <span className="text-sm text-muted-foreground">{formatMessage(a.passed, { n: total })}</span>
            </div>
            <ul className="mt-3 space-y-3">
              {academyModules.map((m, i) => {
                const p = Math.round((m.done / m.lessons) * 100)
                return (
                  <li key={a.modules[i]} className="rounded-md border border-border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">{formatMessage(a.module, { n: i + 1 })}</p>
                        <h3 className="font-medium">{a.modules[i]}</h3>
                      </div>
                      <span className="whitespace-nowrap text-xs text-muted-foreground">
                        {m.done} / {m.lessons}
                      </span>
                    </div>
                    <div className="mt-3">
                      <Progress value={p} label={a.modules[i]} tone={p === 100 ? 'success' : 'primary'} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          <aside className="space-y-4">
            <section className="rounded-md border border-border bg-secondary p-5" aria-labelledby="exam">
              <Award className="size-6 text-terracotta" />
              <h2 id="exam" className="mt-3 font-serif text-lg font-semibold text-primary">{a.examTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{a.examText}</p>
              <Link href="/rlhf" className={cn(buttonVariants(), 'mt-4 w-full')}>
                {a.examCta}
              </Link>
            </section>
            <section className="rounded-md border border-border p-5" aria-labelledby="rating">
              <h2 id="rating" className="font-medium">{a.ratingTitle}</h2>
              <dl className="mt-3 space-y-2 text-sm">
                {a.rating.map((label, i) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium">{ratingValues[i]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>
      </main>
    </>
  )
}
