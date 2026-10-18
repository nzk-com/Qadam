'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { saveDemoUser, roleHome, type DemoRole } from '@/lib/demo-auth'

const roles: { id: DemoRole; label: string; desc: string; badge: string }[] = [
  { id: 'annotator', label: 'Аннотатор', desc: 'Рабочая среда · 60 заданий', badge: 'Оценка' },
  { id: 'client', label: 'Клиент', desc: 'Проекты, поставки, счета', badge: 'Кабинет' },
  { id: 'qa', label: 'QA', desc: 'Проверка оценок · рабочая среда', badge: 'Контроль' },
  { id: 'admin', label: 'Администратор', desc: 'Сводка, участники, аудит', badge: 'Операции' },
]

export default function LoginPage() {
  const [email, setEmail] = useState('demo@qadam.ai')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const enterAs = (role: DemoRole) => {
    setBusy(true)
    setError('')
    try {
      saveDemoUser({
        name: email.split('@')[0] || 'Демо',
        email: email.trim() || 'demo@qadam.ai',
        role,
      })
      window.location.href = roleHome(role)
    } catch {
      setError('Не удалось сохранить демо-сессию')
      setBusy(false)
    }
  }

  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg animate-scale-in glass-strong rounded-3xl p-8">
        <div className="mb-7 flex flex-col items-center gap-2 text-center">
          <Logo />
          <h1 className="text-2xl font-semibold tracking-tight text-deep-blue">Вход в Qadam</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Демо-вход: выберите роль — откроется отдельная страница. Это не настоящая авторизация.
          </p>
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-medium text-deep-blue">Email</label>
          <input
            type="email"
            className="w-full rounded-xl border border-border bg-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="demo@qadam.ai"
          />
        </div>

        <p className="mb-3 text-sm font-medium text-deep-blue">Войти как</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              disabled={busy}
              onClick={() => enterAs(r.id)}
              className="role-card disabled:opacity-60"
            >
              <span className="inline-flex rounded-full bg-soft-blue px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                {r.badge}
              </span>
              <span className="mt-2 block text-base font-semibold text-deep-blue">{r.label}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{r.desc}</span>
            </button>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Нет аккаунта?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Регистрация
          </Link>
          {' · '}
          <Link href="/" className="font-medium text-primary hover:underline">
            На главную
          </Link>
        </p>
      </div>
    </div>
  )
}
