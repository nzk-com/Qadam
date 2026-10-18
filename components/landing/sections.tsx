import Link from 'next/link'
import { ArrowRight, Check, Download, Mail } from 'lucide-react'
import { Logo } from '@/components/logo'
import { SectionHead } from '@/components/section-head'
import { corpora, services, type CorpusStatusId } from '@/lib/demo-data'
import { formatMessage, formatNumber } from '@/lib/i18n/format'
import { getDictionary } from '@/lib/i18n/server'
import { cn } from '@/lib/utils'

const statusStyles: Record<CorpusStatusId, { badge: string; dot: string }> = {
  available: { badge: 'bg-success/10 text-success', dot: 'bg-success' },
  production: { badge: 'bg-terracotta/10 text-terracotta', dot: 'bg-terracotta' },
  custom: { badge: 'bg-accent text-primary', dot: 'bg-sand' },
}

export async function Services() {
  const { t } = await getDictionary()
  const s = t.services
  return (
    <section id="services" className="scroll-mt-28 lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-deep-blue/50">{s.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-deep-blue md:text-4xl">{s.title}</h2>
          <p className="mt-4 text-deep-blue/60">{s.text}</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, i) => {
            const info = s.items[item.id]
            return (
              <article
                key={item.id}
                className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-7 shadow-[0_12px_40px_rgba(15,40,80,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:bg-white/55"
              >
                <span className="font-serif text-3xl font-medium tabular-nums text-deep-blue/25">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-xl font-medium text-deep-blue">{info.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-deep-blue/60">{info.text}</p>
                <p className="mt-6 border-t border-white/40 pt-4 text-sm font-medium text-deep-blue">
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
    <section
      id="quality"
      className="scroll-mt-28 border-b border-white/30 bg-gradient-to-b from-[#8eb4d0]/50 to-[#eef5fa] text-deep-blue lg:scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <SectionHead index="03" eyebrow={q.eyebrow} title={q.title} inverse />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-md bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {q.steps.map((step, i) => (
            <li key={step.title} className="bg-primary p-5">
              <span className="font-serif text-2xl text-sand">0{i + 1}</span>
              <h3 className="mt-3 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-deep-blue/60">{step.text}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-deep-blue/70">
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
    <section id="corpora" className="scroll-mt-28 border-b border-white/30 lg:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <SectionHead index="04" eyebrow={c.eyebrow} title={c.title} text={c.text} />
        <div className="mt-10 overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">{c.cols.name}</th>
                <th className="px-4 py-3 font-medium">{c.cols.status}</th>
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
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 py-0.5 text-xs font-medium',
                        statusStyles[row.status].badge,
                      )}
                    >
                      <span className={cn('size-1.5 rounded-full', statusStyles[row.status].dot)} aria-hidden="true" />
                      {c.statuses[row.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.languages[row.lang]}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {row.n === null ? '—' : `${formatNumber(locale, row.n)} ${c.units[row.unit]}`}
                  </td>
                  <td className="px-4 py-3">
                    <span className="whitespace-nowrap rounded-sm bg-accent px-2.5 py-0.5 text-xs">
                      {c.licenses[row.license]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href="#request"
                      className="inline-flex items-center gap-1.5 whitespace-nowrap text-terracotta hover:underline"
                    >
                      {row.status === 'available' ? (
                        <Download className="size-4" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="size-4" aria-hidden="true" />
                      )}
                      {c.actions[row.status]}
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
