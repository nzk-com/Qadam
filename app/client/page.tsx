import type { Metadata } from 'next'
import { Download, FileText, Plus, Upload } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { Progress } from '@/components/progress'
import { buttonVariants } from '@/components/ui/button'
import { clientProjects, invoices } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Кабинет клиента — Dala AI' }

const stats = [
  ['Активные проекты', '2'],
  ['Выполнено заданий', '3 908'],
  ['Среднее качество', '93%'],
  ['К оплате', '$8 200'],
]

export default function Page() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Qazaq Bank</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary">Проекты</h1>
          </div>
          <div className="flex gap-2">
            <button className={buttonVariants({ variant: 'outline' })}>
              <Upload />
              Загрузить данные
            </button>
            <button className={buttonVariants()}>
              <Plus />
              Новая заявка
            </button>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(([l, v]) => (
            <div key={l} className="rounded-xl border border-border bg-secondary p-4">
              <dt className="text-xs text-muted-foreground">{l}</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-primary">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8" aria-labelledby="projects">
          <h2 id="projects" className="sr-only">Список проектов</h2>
          <div className="space-y-3">
            {clientProjects.map((p) => (
              <article key={p.name} className="rounded-xl border border-border p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-medium">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {p.type} · {p.tasks}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs',
                      p.status === 'Поставлено' ? 'bg-success/10 text-success' : 'bg-accent text-foreground',
                    )}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_auto]">
                  <Progress value={p.progress} label={`Прогресс: ${p.name}`} />
                  <span className="text-sm tabular-nums text-muted-foreground">{p.progress}% готово</span>
                  <span className="text-sm tabular-nums">
                    Качество <span className="font-semibold text-success">{p.quality}%</span>
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
                      QA-отчёт
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8" aria-labelledby="invoices">
          <h2 id="invoices" className="font-serif text-xl font-semibold text-primary">Счета</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-secondary text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Номер</th>
                  <th className="px-4 py-3 font-medium">Дата</th>
                  <th className="px-4 py-3 font-medium">Сумма</th>
                  <th className="px-4 py-3 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{i.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{i.date}</td>
                    <td className="px-4 py-3">{i.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          i.status === 'Оплачен' && 'text-success',
                          i.status === 'Ожидает оплаты' && 'text-terracotta',
                          i.status === 'Черновик' && 'text-muted-foreground',
                        )}
                      >
                        {i.status}
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
