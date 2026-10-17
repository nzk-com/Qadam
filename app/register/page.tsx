'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { saveDemoUser, roleHome, type DemoRole } from '@/lib/demo-auth'

const roles: { id: DemoRole; label: string }[] = [
  { id: 'annotator', label: 'Аннотатор' },
  { id: 'client', label: 'Клиент' },
  { id: 'qa', label: 'QA' },
  { id: 'admin', label: 'Администратор' },
]

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<DemoRole>('annotator')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Заполните имя и email')
      return
    }
    setBusy(true)
    saveDemoUser({ name: name.trim(), email: email.trim(), role })
    window.location.href = roleHome(role)
  }

  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero px-4 py-12">
      <div className="w-full max-w-md animate-scale-in rounded-2xl border border-border bg-white/95 p-8 soft-glow backdrop-blur">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Logo />
          <h1 className="text-xl font-semibold text-deep-blue">Регистрация</h1>
          <p className="text-xs text-muted-foreground">
            Демо: данные только на этом устройстве. После регистрации откроется страница роли.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-deep-blue">Имя</label>
            <input
              className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-deep-blue">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-deep-blue">Роль</label>
            <select
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value as DemoRole)}
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? 'Вход…' : 'Создать и войти'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Уже есть демо-аккаунт?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
