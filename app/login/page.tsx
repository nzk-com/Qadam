'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { saveDemoUser, roleHome, type DemoRole } from '@/lib/demo-auth'

const roles: { id: DemoRole; label: string; desc: string }[] = [
  { id: 'annotator', label: 'Аннотатор', desc: 'Рабочая среда с 60 заданиями' },
  { id: 'client', label: 'Клиент', desc: 'Кабинет клиента, проекты, поставки' },
  { id: 'qa', label: 'QA', desc: 'Проверка оценок (демо)' },
  { id: 'admin', label: 'Администратор', desc: 'Админ-панель и сводка' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('demo@dala.ai')
  const [password, setPassword] = useState('demo')
  const [role, setRole] = useState<DemoRole>('annotator')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Введите email')
      return
    }
    // Demo only — any password works
    saveDemoUser({
      name: email.split('@')[0] || 'Демо-пользователь',
      email,
      role,
    })
    router.push(roleHome(role))
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center gradient-hero px-4 py-12">
      <div className="w-full max-w-md animate-scale-in rounded-2xl border border-border bg-white/95 p-8 soft-glow backdrop-blur">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo />
          <h1 className="text-xl font-semibold text-deep-blue">Вход в Dala AI</h1>
          <p className="text-xs text-muted-foreground">
            Демонстрационный вход. Не является настоящей авторизацией.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-deep-blue">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@dala.ai"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-deep-blue">Пароль</label>
            <input
              type="password"
              className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="любой (демо)"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-deep-blue">Роль (демо)</label>
            <div className="grid gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                    role === r.id
                      ? 'border-primary bg-soft-blue ring-2 ring-primary/20'
                      : 'border-border bg-white hover:border-deco-blue'
                  }`}
                >
                  <span className="font-medium text-deep-blue">{r.label}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full">
            Войти в демо
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Нет аккаунта?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Регистрация
          </Link>
        </p>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Переключатель демонстрационных экранов. Не является системой авторизации.
        </p>
      </div>
    </div>
  )
}
