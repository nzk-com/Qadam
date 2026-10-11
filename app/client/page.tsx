import type { Metadata } from 'next'
import { Download, FileText, Plus, Upload } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { Progress } from '@/components/progress'
import { buttonVariants } from '@/components/ui/button'
import { clientProjects, invoices } from '@/lib/demo-data'
import { formatMessage, formatNumber, formatShortDate } from '@/lib/i18n/format'
import { getDictionary } from '@/lib/i18n/server'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return { title: t.meta.client }
}

export default async function Page() {
  const { locale, t } = await getDictionary()
  const c = t.client
  const stats = [
    formatNumber(locale, 2),
    formatNumber(locale, 3908),
    `${formatNumber(locale, 93)}%`,
    `$${formatNumber(locale, 8200)}`,
  ]

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-sm text-muted-foreground">Qazaq Bank</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary">{c.title}</h1>
          </div>
          <div className="flex gap-2">
            <button className={buttonVariants({ variant: 'outline' })}>
              <Upload />
              {c.upload}
            </button>
            <button className={buttonVariants()}>
              <Plus />
              {c.newRequest}
            </button>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {c.statLabels.map((label, i) => (
            <div key={label} className="rounded-md border border-border bg-secondary p-4">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-primary">{stats[i]}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8" aria-labelledby="projects">
          <h2 id="projects" className="sr-only">{c.projectsSr}</h2>
          <div className="space-y-3">
            {clientProjects.map((p) => {
              const name = c.projects[p.id]
              return (
                <article key={p.id} className="rounded-md border border-border p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {c.types[p.type]} · {formatNumber(locale, p.done)} / {formatNumber(locale, p.total)}{' '}
                        {c.taskUnits[p.unit]}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'rounded-sm px-2.5 py-0.5 text-xs',
                        p.status === 'delivered' ? 'bg-success/10 text-success' : 'bg-accent text-foreground',
                      )}
                    >
                      {c.statuses[p.status]}
                    </span>
                  </div>
                  <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_auto]">
                    <Progress value={p.progress} label={formatMessage(c.progressOf, { name })} />
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {formatMessage(c.readyPct, { n: p.progress })}
                    </span>
                    <span className="text-sm tabular-nums">
                      {c.quality} <span className="font-semibold text-success">{p.quality}%</span>
                    </span>
                  </div>
                  {p.progress === 100 && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                      <button className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                        <Download />
                        dataset.jsonl
                      </button>
                      <button className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                        <Download />
                        dataset.csv
                      </button>
                      <button className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                        <FileText />
                        {c.qaReport}
                      </button>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-8" aria-labelledby="invoices">
          <h2 id="invoices" className="font-serif text-xl font-semibold text-primary">{c.invoices.title}</h2>
          <div className="mt-3 overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-secondary text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">{c.invoices.cols.id}</th>
                  <th className="px-4 py-3 font-medium">{c.invoices.cols.date}</th>
                  <th className="px-4 py-3 font-medium">{c.invoices.cols.amount}</th>
                  <th className="px-4 py-3 font-medium">{c.invoices.cols.status}</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{i.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatShortDate(locale, i.date)}</td>
                    <td className="px-4 py-3">${formatNumber(locale, i.amount)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          i.status === 'paid' && 'text-success',
                          i.status === 'pending' && 'text-terracotta',
                          i.status === 'draft' && 'text-muted-foreground',
                        )}
                      >
                        {c.invoices.status[i.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  )
}
