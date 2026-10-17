'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { saveDemoUser, roleHome, type DemoRole } from '@/lib/demo-auth'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<DemoRole>('annotator')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Заполните имя и email')
      return
    }
    saveDemoUser({ name: name.trim(), email: email.trim(), role })
    router.push(roleHome(role))
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center gradient-hero px-4 py-12">
      <div className="w-full max-w-md animate-scale-in rounded-2xl border border-border bg-white/95 p-8 soft-glow backdrop-blur">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo />
          <h1 className="text-xl font-semibold text-deep-blue">Регистрация</h1>
          <p className="text-xs text-muted-foreground">
            Демонстрационная регистрация. Данные сохраняются только на этом устройстве.
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
            <label className="mb-1 block text-sm font-medium text-deep-blue">Роль в демо</label>
            <select
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value as DemoRole)}
            >
              <option value="annotator">Аннотатор</option>
              <option value="client">Клиент</option>
              <option value="qa">QA</option>
              <option value="admin">Администратор</option>
            </select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full">
            Создать демо-аккаунт
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
