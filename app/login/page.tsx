'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { saveDemoUser, roleHome, type DemoRole } from '@/lib/demo-auth'

const roles: { id: DemoRole; label: string; desc: string; path: string }[] = [
  { id: 'annotator', label: 'Аннотатор', desc: 'Рабочая среда · 60 заданий', path: '/workspace' },
  { id: 'client', label: 'Клиент', desc: 'Кабинет клиента · проекты и поставки', path: '/client' },
  { id: 'qa', label: 'QA', desc: 'Проверка оценок · рабочая среда', path: '/workspace' },
  { id: 'admin', label: 'Администратор', desc: 'Админ-панель · участники и сводка', path: '/admin' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('demo@dala.ai')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const enterAs = (role: DemoRole) => {
    setBusy(true)
    setError('')
    try {
      saveDemoUser({
        name: email.split('@')[0] || 'Демо',
        email: email.trim() || 'demo@dala.ai',
        role,
      })
      // Hard navigation so header picks up the user immediately
      window.location.href = roleHome(role)
    } catch {
      setError('Не удалось сохранить демо-сессию')
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero px-4 py-12">
      <div className="w-full max-w-lg animate-scale-in rounded-2xl border border-border bg-white/95 p-8 soft-glow backdrop-blur">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Logo />
          <h1 className="text-xl font-semibold text-deep-blue">Вход в Dala AI</h1>
          <p className="text-xs text-muted-foreground">
            Демо-вход: выберите роль — откроется отдельная страница. Это не настоящая авторизация.
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-deep-blue">Email (для подписи в шапке)</label>
          <input
            type="email"
            className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="demo@dala.ai"
          />
        </div>

        <p className="mb-2 text-sm font-medium text-deep-blue">Войти как</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              disabled={busy}
              onClick={() => enterAs(r.id)}
              className="rounded-xl border border-border bg-white p-4 text-left transition hover:border-primary hover:bg-soft-blue/40 disabled:opacity-60"
            >
              <span className="block font-semibold text-deep-blue">{r.label}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{r.desc}</span>
              <span className="mt-2 block text-[11px] text-primary">{r.path}</span>
            </button>
          ))}
        </div>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← На главную
          </Link>
          <Link href="/register" className="font-medium text-primary hover:underline">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  )
}
