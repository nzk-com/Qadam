import type { Metadata } from 'next'
import { AppHeader } from '@/components/app-header'
import { Progress } from '@/components/progress'
import { adminStats, auditLog, disputes, team } from '@/lib/demo-data'

export const metadata: Metadata = { title: 'Админ-панель — Dala AI' }

export default function Page() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary">Админ-панель</h1>
        <p className="text-sm text-muted-foreground">Обзор проектов, команды и качества</p>

        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {adminStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-secondary p-4">
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-primary">{s.value}</dd>
              <p className="mt-1 text-xs text-success">{s.delta}</p>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="team">
            <h2 id="team" className="font-serif text-xl font-semibold text-primary">Команда и нагрузка</h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-secondary text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Участник</th>
                    <th className="px-4 py-3 font-medium">Язык</th>
                    <th className="px-4 py-3 font-medium">Нагрузка</th>
                    <th className="px-4 py-3 font-medium">Точность</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((m) => (
                    <tr key={m.name} className="border-t border-border">
                      <td className="px-4 py-3">
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.role}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{m.lang}</td>
                      <td className="w-40 px-4 py-3">
                        <Progress value={m.load} label={`Нагрузка ${m.name}`} tone={m.load > 85 ? 'terracotta' : 'primary'} />
                      </td>
                      <td className="px-4 py-3 tabular-nums">{m.accuracy}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="disputes">
            <h2 id="disputes" className="font-serif text-xl font-semibold text-primary">Спорные случаи на арбитраж</h2>
            <ul className="mt-3 space-y-3">
              {disputes.map((d) => (
                <li key={d.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{d.id}</p>
                    <span className="text-xs text-terracotta">Согласованность {d.agreement}%</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {d.project} · {d.reason}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8" aria-labelledby="audit">
          <h2 id="audit" className="font-serif text-xl font-semibold text-primary">Журнал действий</h2>
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
            {auditLog.map((a) => (
              <li key={a.time + a.action} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3 text-sm">
                <span className="w-12 tabular-nums text-muted-foreground">{a.time}</span>
                <span className="font-medium">{a.who}</span>
                <span>{a.action}</span>
                <span className="text-muted-foreground">{a.target}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
