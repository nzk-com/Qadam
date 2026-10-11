'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/demo-data'

const field =
  'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'

export function RequestForm() {
  const [sent, setSent] = useState(false)

  return (
    <section id="request" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary">Оставьте заявку или запросите демо</h2>
          <p className="mt-3 text-muted-foreground">
            Расскажите о задаче — подготовим пилотный сэмпл и предложение. Обычно отвечаем в течение рабочего дня.
          </p>
        </div>
        {sent ? (
          <div className="flex flex-col items-start justify-center gap-3 rounded-xl border border-border bg-secondary p-8" role="status">
            <CheckCircle2 className="size-8 text-success" />
            <p className="font-serif text-xl font-semibold text-primary">Заявка принята</p>
            <p className="text-sm text-muted-foreground">Менеджер свяжется с вами по указанной почте.</p>
          </div>
        ) : (
          <form
            className="grid gap-4 rounded-xl border border-border p-6"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Имя
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="text-sm font-medium">
                Компания
                <input name="company" autoComplete="organization" className={field} />
              </label>
            </div>
            <label className="text-sm font-medium">
              Рабочая почта
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="text-sm font-medium">
              Услуга
              <select name="service" className={field} defaultValue="rlhf">
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              О проекте
              <textarea name="message" rows={4} className={field} placeholder="Язык, объём, сроки, домен (банк, госсектор, телеком)" />
            </label>
            <Button type="submit" size="lg" className="h-11">
              Отправить заявку
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
