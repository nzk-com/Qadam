'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download, FileText, FolderKanban, Package } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { Progress } from '@/components/progress'
import { buttonVariants } from '@/components/ui/button'
import { clientProjects, invoices } from '@/lib/demo-data'
import { loadDemoUser, type DemoUser } from '@/lib/demo-auth'
import { cn } from '@/lib/utils'

const projectTitles: Record<string, string> = {
  bank: 'Банковский ассистент — preference',
  gov: 'Госуслуги — red-teaming',
  app: 'Мобильное приложение — localization',
}

const statusLabel: Record<string, string> = {
  inProgress: 'В работе',
  delivered: 'Поставлено',
  draft: 'Черновик',
}

export default function ClientCabinetPage() {
  const [user, setUser] = useState<DemoUser | null>(null)

  useEffect(() => {
    setUser(loadDemoUser())
  }, [])

  return (
    <>
      <AppHeader />
      <main className="page-shell">
        <div className="border-b border-white/40 bg-white/50 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-8 md:px-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">Кабинет клиента</p>
              <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-deep-blue">
                Ваши проекты и поставки
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Отдельная страница заказчика: статус проектов, прогресс и демо-счета.
                {user ? (
                  <span className="mt-1 block text-deep-blue">
                    Сессия: {user.name} · роль «{user.role}»
                  </span>
                ) : (
                  <span className="mt-1 block">
                    Вы не вошли.{' '}
                    <Link href="/login" className="text-primary underline">
                      Войти как клиент
                    </Link>
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/login" className={cn(buttonVariants({ variant: 'outline' }))}>
                Сменить роль
              </Link>
              <Link href="/workspace" className={cn(buttonVariants())}>
                Смотреть задания
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: 'Активных проектов', value: String(clientProjects.length) },
              {
                label: 'Единиц в работе',
                value: String(clientProjects.reduce((s, p) => s + p.done, 0)),
              },
              { label: 'Готовность', value: 'демо' },
              { label: 'Счета', value: String(invoices.length) },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-white p-4 shadow-sm">
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 font-serif text-2xl font-semibold text-deep-blue">{s.value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <FolderKanban className="size-5 text-primary" />
              <h2 className="text-lg font-semibold text-deep-blue">Проекты</h2>
            </div>
            <div className="space-y-3">
              {clientProjects.map((p) => (
                <article
                  key={p.id}
                  className="dash-card p-6 shadow-sm transition hover:border-primary/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-deep-blue">
                        {projectTitles[p.id] ?? p.id}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Тип: {p.type} · {statusLabel[p.status] ?? p.status}
                      </p>
                    </div>
                    <span className="rounded-full bg-soft-blue px-3 py-1 text-xs font-medium text-deep-blue">
                      {p.done}/{p.total} {p.unit}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Progress value={p.progress} label={`Прогресс ${p.progress}%`} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Оценка качества экспертом: не подтверждена (pending)
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Package className="size-5 text-primary" />
              <h2 className="text-lg font-semibold text-deep-blue">Поставки и счета (демо)</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60 text-left text-xs text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Документ</th>
                    <th className="px-4 py-3 font-medium">Дата</th>
                    <th className="px-4 py-3 font-medium">Статус</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoices.map((inv) => (
                    <tr key={inv.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-muted-foreground" />
                          <span>{inv.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{inv.date}</td>
                      <td className="px-4 py-3">{statusLabel[inv.status] ?? inv.status}</td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" className="inline-flex items-center gap-1 text-xs text-primary">
                          <Download className="size-3.5" />
                          Скачать (демо)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Счета демонстрационные. Реальных платежей нет.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
