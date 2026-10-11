import Link from 'next/link'
import { Check, Download, Mail } from 'lucide-react'
import { Logo } from '@/components/logo'
import { SectionHead } from '@/components/section-head'
import { corpora, services } from '@/lib/demo-data'
import { formatMessage, formatNumber } from '@/lib/i18n/format'
import { getDictionary } from '@/lib/i18n/server'

export async function Services() {
  const { t } = await getDictionary()
  const s = t.services
  return (
    <section id="services" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <SectionHead index="01" eyebrow={s.eyebrow} title={s.title} text={s.text} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, i) => {
            const info = s.items[item.id]
            return (
              <article key={item.id} className="flex flex-col bg-card p-6">
                <span className="font-serif text-sm tabular-nums text-terracotta">0{i + 1}</span>
                <h3 className="mt-2 font-serif text-xl font-semibold text-primary">{info.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{info.text}</p>
                <p className="mt-5 border-t border-border pt-4 text-sm font-medium">
                  {formatMessage(s.priceLine, { price: `$${item.price}`, unit: info.unit })}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export async function Quality() {
  const { t } = await getDictionary()
  const q = t.quality
  return (
    <section id="quality" className="scroll-mt-16 border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <SectionHead index="02" eyebrow={q.eyebrow} title={q.title} inverse />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-md bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {q.steps.map((step, i) => (
            <li key={step.title} className="bg-primary p-5">
              <span className="font-serif text-2xl text-sand">0{i + 1}</span>
              <h3 className="mt-3 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{step.text}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-primary-foreground/80">
          {q.assurances.map((x) => (
            <li key={x} className="flex items-center gap-2">
              <Check className="size-4 text-sand" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export async function Corpora() {
  const { locale, t } = await getDictionary()
  const c = t.corpora
  return (
    <section id="corpora" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <SectionHead index="03" eyebrow={c.eyebrow} title={c.title} text={c.text} />
        <div className="mt-10 overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">{c.cols.name}</th>
                <th className="px-4 py-3 font-medium">{c.cols.lang}</th>
                <th className="px-4 py-3 font-medium">{c.cols.size}</th>
                <th className="px-4 py-3 font-medium">{c.cols.license}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {corpora.map((row) => (
                <tr key={row.name} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.languages[row.lang]}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatNumber(locale, row.n)} {c.units[row.unit]}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-sm bg-accent px-2.5 py-0.5 text-xs">{c.licenses[row.license]}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href="#request" className="inline-flex items-center gap-1.5 text-terracotta hover:underline">
                      <Download className="size-4" />
                      {c.sample}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export async function Footer() {
  const { t } = await getDictionary()
  const f = t.footer
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{f.tagline}</p>
        </div>
        <nav aria-label={f.platform}>
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-foreground">{f.platform}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/client" className="hover:text-foreground">{t.nav.client}</Link></li>
            <li><Link href="/academy" className="hover:text-foreground">{f.academyFull}</Link></li>
            <li><Link href="/rlhf" className="hover:text-foreground">{t.nav.workspace}</Link></li>
            <li><Link href="/admin" className="hover:text-foreground">{t.nav.admin}</Link></li>
          </ul>
        </nav>
        <nav aria-label={f.services}>
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-foreground">{f.services}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#services" className="hover:text-foreground">{t.services.items[s.id].title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-foreground">{f.contacts}</h2>
          <a
            href="mailto:contact@dala.ai"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-4" />
            contact@dala.ai
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground md:flex-row md:justify-between md:px-6">
          <p>{f.rights}</p>
          <p>{f.security}</p>
        </div>
      </div>
    </footer>
  )
}
