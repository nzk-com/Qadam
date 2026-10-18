'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Activity, Shield, Users, AlertTriangle } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { Progress } from '@/components/progress'
import { buttonVariants } from '@/components/ui/button'
import { adminStats, team, disputes, auditTimes, taskStats } from '@/lib/demo-data'
import { loadDemoUser, type DemoUser } from '@/lib/demo-auth'
import { cn } from '@/lib/utils'

export default function AdminPanelPage() {
  const [user, setUser] = useState<DemoUser | null>(null)

  useEffect(() => {
    setUser(loadDemoUser())
  }, [])

  return (
    <>
      <AppHeader />
      <main className="admin-shell">
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-8 md:px-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-sky-400">Админ-панель</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
                Операционная сводка
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-400">
                Отдельная страница администратора: задания, участники, споры, аудит.
                {user ? (
                  <span className="mt-1 block text-sky-300">
                    Сессия: {user.name} · роль «{user.role}»
                  </span>
                ) : (
                  <span className="mt-1 block">
                    Вы не вошли.{' '}
                    <Link href="/login" className="text-sky-400 underline">
                      Войти как админ
                    </Link>
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-white/20 px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
              >
                Сменить роль
              </Link>
              <Link
                href="/workspace"
                className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-400"
              >
                К заданиям
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: 'Всего заданий', value: String(taskStats.total), icon: Activity },
              { label: 'Казахский (kk)', value: String(taskStats.byLanguage.kk), icon: Activity },
              { label: 'Кыргызский (ky)', value: String(taskStats.byLanguage.ky), icon: Activity },
              { label: 'Код-свитч', value: String(taskStats.byLanguage['kk-ru']), icon: Activity },
            ].map((s) => (
              <div key={s.label} className="admin-card p-4">
                <dt className="flex items-center gap-2 text-xs text-slate-400">
                  <s.icon className="size-3.5" />
                  {s.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="admin-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Users className="size-5 text-sky-400" />
                <h2 className="text-lg font-semibold text-white">Участники (демо)</h2>
              </div>
              <ul className="space-y-3">
                {team.map((m, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-3"
                  >
                    <div>
                      <p className="font-medium text-white">{m.role}</p>
                      <p className="text-xs text-slate-400">Язык: {m.lang}</p>
                    </div>
                    <div className="w-36">
                      <Progress value={m.load} label={`Нагрузка ${m.load}%`} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="admin-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Споры / низкое согласие</h2>
              </div>
              <ul className="space-y-3">
                {disputes.map((d) => (
                  <li
                    key={d.id}
                    className="rounded-lg border border-white/10 bg-black/20 px-3 py-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-white">{d.id}</p>
                      <span className="text-xs text-amber-300">согласие {d.agreement}%</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Проект: {d.project}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-6 admin-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="size-5 text-sky-400" />
              <h2 className="text-lg font-semibold text-white">Журнал аудита (демо)</h2>
            </div>
            <ul className="divide-y divide-white/10 text-sm">
              {[
                { t: auditTimes[0], who: 'Система', action: 'Загружены демо-задания', target: `${taskStats.total} шт.` },
                { t: auditTimes[1], who: 'Админ', action: 'Просмотр панели', target: '/admin' },
                { t: auditTimes[2], who: '—', action: 'Экспертная проверка эталонов', target: 'pending' },
                { t: auditTimes[3], who: '—', action: 'Реальные платежи', target: 'отсутствуют' },
              ].map((row, i) => (
                <li key={i} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
                  <span className="w-10 tabular-nums text-slate-500">{row.t}</span>
                  <span className="font-medium text-slate-200">{row.who}</span>
                  <span className="text-slate-300">{row.action}</span>
                  <span className="text-slate-500">{row.target}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Админ-панель визуально и по смыслу отделена от кабинета клиента. Данные — демо.
            </p>
          </section>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/client" className={cn(buttonVariants({ variant: 'outline' }), 'border-white/20 bg-transparent text-white hover:bg-white/10')}>
              Открыть кабинет клиента
            </Link>
            <Link href="/login" className={cn(buttonVariants(), 'bg-sky-500 hover:bg-sky-400')}>
              Войти под другой ролью
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
