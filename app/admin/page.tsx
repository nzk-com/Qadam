import type { Metadata } from 'next'
import { AppHeader } from '@/components/app-header'
import { Progress } from '@/components/progress'
import { adminStats, auditTimes, disputes, team } from '@/lib/demo-data'
import { formatMessage, formatNumber } from '@/lib/i18n/format'
import { getDictionary } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return { title: t.meta.admin }
}

export default async function Page() {
  const { locale, t } = await getDictionary()
  const a = t.admin
  const statValue = (s: (typeof adminStats)[number]) =>
    s.kind === 'pct'
      ? `${formatNumber(locale, s.value, { maximumFractionDigits: 1 })}%`
      : formatNumber(locale, s.value)

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="border-b border-border pb-6">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary">{a.title}</h1>
          <p className="text-sm text-muted-foreground">{a.subtitle}</p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {adminStats.map((s, i) => (
            <div key={a.stats[i].label} className="rounded-md border border-border bg-secondary p-4">
              <dt className="text-xs text-muted-foreground">{a.stats[i].label}</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-primary">{statValue(s)}</dd>
              <p className="mt-1 text-xs text-success">{a.stats[i].delta}</p>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="team">
            <h2 id="team" className="font-serif text-xl font-semibold text-primary">{a.teamTitle}</h2>
            <div className="mt-3 overflow-x-auto rounded-md border border-border">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-secondary text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">{a.teamCols.member}</th>
                    <th className="px-4 py-3 font-medium">{a.teamCols.lang}</th>
                    <th className="px-4 py-3 font-medium">{a.teamCols.load}</th>
                    <th className="px-4 py-3 font-medium">{a.teamCols.accuracy}</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((m, i) => (
                    <tr key={a.names[i]} className="border-t border-border">
                      <td className="px-4 py-3">
                        <p className="font-medium">{a.names[i]}</p>
                        <p className="text-xs text-muted-foreground">{m.role}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{m.lang}</td>
                      <td className="w-40 px-4 py-3">
                        <Progress
                          value={m.load}
                          label={formatMessage(a.loadOf, { name: a.names[i] })}
                          tone={m.load > 85 ? 'terracotta' : 'primary'}
                        />
                      </td>
                      <td className="px-4 py-3 tabular-nums">{m.accuracy}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="disputes">
            <h2 id="disputes" className="font-serif text-xl font-semibold text-primary">{a.disputesTitle}</h2>
            <ul className="mt-3 space-y-3">
              {disputes.map((d, i) => (
                <li key={d.id} className="rounded-md border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{d.id}</p>
                    <span className="text-xs text-terracotta">{formatMessage(a.agreement, { n: d.agreement })}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {a.projects[d.project]} · {a.reasons[i]}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8" aria-labelledby="audit">
          <h2 id="audit" className="font-serif text-xl font-semibold text-primary">{a.auditTitle}</h2>
          <ul className="mt-3 divide-y divide-border rounded-md border border-border">
            {a.audit.map((item, i) => (
              <li key={auditTimes[i]} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3 text-sm">
                <span className="w-12 tabular-nums text-muted-foreground">{auditTimes[i]}</span>
                <span className="font-medium">{item.who}</span>
                <span>{item.action}</span>
                <span className="text-muted-foreground">{item.target}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
