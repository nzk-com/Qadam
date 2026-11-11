'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { SectionHead } from '@/components/section-head'
import { Button } from '@/components/ui/button'

const field =
  'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'

/** Direct FormSubmit (browser). Used if /api/request fails (rate limit etc.) */
const FORM_FALLBACK = 'https://formsubmit.co/f6e02e421cc3402628113865db7b082b'

export function RequestForm() {
  const { t } = useI18n()
  const r = t.request
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError(false)
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('_subject', 'Qadam — новая заявка с сайта')
    data.set('_template', 'table')
    data.set('_captcha', 'false')

    let ok = false
    try {
      const res = await fetch('/api/request', { method: 'POST', body: data })
      ok = res.ok
    } catch {
      ok = false
    }

    // Fallback: browser → FormSubmit. mode no-cors: letter often arrives, response unreadable
    if (!ok) {
      try {
        await fetch(FORM_FALLBACK, {
          method: 'POST',
          body: data,
          mode: 'no-cors',
        })
        ok = true
      } catch {
        ok = false
      }
    }

    setSending(false)
    if (ok) {
      setSent(true)
      form.reset()
    } else {
      setError(true)
    }
  }

  return (
    <section id="request" className="scroll-mt-28 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <SectionHead index="07" eyebrow={r.eyebrow} title={r.title} text={r.text} />
        {sent ? (
          <div className="flex flex-col items-start justify-center gap-3 rounded-md border border-border bg-secondary p-8" role="status">
            <CheckCircle2 className="size-8 text-success" />
            <p className="font-serif text-xl font-semibold text-primary">{r.successTitle}</p>
            <p className="text-sm text-muted-foreground">{r.successText}</p>
          </div>
        ) : (
          <form className="grid gap-4 rounded-md border border-border p-6" onSubmit={onSubmit}>
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
              <select name="package" className={field} defaultValue="100">
                <option value="100">{r.opt100}</option>
                <option value="1000">{r.opt1000}</option>
                <option value="subscribe">{r.optSub}</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              {r.about}
              <textarea name="message" rows={4} className={field} placeholder={r.placeholder} />
            </label>
            {error && <p className="text-sm text-red-600">{r.errorText}</p>}
            <Button type="submit" size="lg" className="h-11" disabled={sending}>
              {sending ? r.sending : r.submit}
            </Button>
            <p className="text-xs text-muted-foreground">{r.privacy}</p>
          </form>
        )}
      </div>
    </section>
  )
}
