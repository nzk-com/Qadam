'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { SectionHead } from '@/components/section-head'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/demo-data'

const field =
  'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'

export function RequestForm() {
  const { t } = useI18n()
  const r = t.request
  const [sent, setSent] = useState(false)

  return (
    <section id="request" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <SectionHead index="05" eyebrow={r.eyebrow} title={r.title} text={r.text} />
        {sent ? (
          <div className="flex flex-col items-start justify-center gap-3 rounded-md border border-border bg-secondary p-8" role="status">
            <CheckCircle2 className="size-8 text-success" />
            <p className="font-serif text-xl font-semibold text-primary">{r.successTitle}</p>
            <p className="text-sm text-muted-foreground">{r.successText}</p>
          </div>
        ) : (
          <form
            className="grid gap-4 rounded-md border border-border p-6"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">
                {r.name}
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="text-sm font-medium">
                {r.company}
                <input name="company" autoComplete="organization" className={field} />
              </label>
            </div>
            <label className="text-sm font-medium">
              {r.email}
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="text-sm font-medium">
              {r.service}
              <select name="service" className={field} defaultValue="rlhf">
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {t.services.items[s.id].title}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              {r.about}
              <textarea name="message" rows={4} className={field} placeholder={r.placeholder} />
            </label>
            <Button type="submit" size="lg" className="h-11">
              {r.submit}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
