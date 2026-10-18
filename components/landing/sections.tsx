import Link from 'next/link'
import { ArrowRight, Check, Download, Mail } from 'lucide-react'
import { Logo } from '@/components/logo'
import { SectionHead } from '@/components/section-head'
import { corpora, services, type CorpusStatusId } from '@/lib/demo-data'
import { formatMessage, formatNumber } from '@/lib/i18n/format'
import { getDictionary } from '@/lib/i18n/server'
import { cn } from '@/lib/utils'

const statusStyles: Record<CorpusStatusId, { badge: string; dot: string }> = {
  available: { badge: 'bg-emerald-500/10 text-emerald-700', dot: 'bg-emerald-500' },
  production: { badge: 'bg-amber-500/10 text-amber-700', dot: 'bg-amber-500' },
  custom: { badge: 'bg-primary/10 text-primary', dot: 'bg-primary' },
}

export async function Services() {
  const { t } = await getDictionary()
  const s = t.services
  return (
    <section id="services" className="scroll-mt-28 lg:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-deep-blue/45">{s.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-deep-blue md:text-[2.5rem]">{s.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-deep-blue/55">{s.text}</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((item, i) => {
            const info = s.items[item.id]
            return (
              <article
                key={item.id}
                className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[1.35rem] border border-white/60 bg-white/55 p-8 shadow-[0_10px_40px_-16px_rgba(15,40,80,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/80 hover:bg-white/75 hover:shadow-[0_20px_50px_-16px_rgba(15,40,80,0.18)]"
              >
                <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/5 transition group-hover:bg-primary/10" />
                <span className="relative font-serif text-4xl font-medium tabular-nums text-deep-blue/15">0{i + 1}</span>
                <h3 className="relative mt-3 font-serif text-xl font-medium text-deep-blue">{info.title}</h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-deep-blue/55">{info.text}</p>
                <p className="relative mt-6 border-t border-deep-blue/8 pt-4 text-sm font-semibold text-deep-blue">
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
      className="scroll-mt-28 lg:scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-deep-blue/45">{q.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-deep-blue md:text-[2.5rem]">{q.title}</h2>
        </div>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {q.steps.map((step, i) => (
            <li
              key={step.title}
              className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.35rem] border border-white/60 bg-white/55 p-7 shadow-[0_10px_40px_-16px_rgba(15,40,80,0.1)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/75"
            >
              <span className="bg-gradient-to-br from-primary to-sky-400 bg-clip-text font-serif text-3xl font-semibold text-transparent">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-deep-blue">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-deep-blue/55">{step.text}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-deep-blue/65">
          {q.assurances.map((x) => (
            <li key={x} className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-3 text-primary" />
              </span>
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
    <section id="corpora" className="scroll-mt-28 lg:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-deep-blue/45">{c.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-deep-blue md:text-[2.5rem]">{c.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-deep-blue/55">{c.text}</p>
        </div>
        <div className="mt-12 overflow-hidden rounded-[1.35rem] border border-white/60 bg-white/50 shadow-[0_10px_40px_-16px_rgba(15,40,80,0.1)] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-deep-blue/8 text-deep-blue/50">
                  <th className="px-5 py-4 font-medium">{c.cols.name}</th>
                  <th className="px-5 py-4 font-medium">{c.cols.status}</th>
                  <th className="px-5 py-4 font-medium">{c.cols.lang}</th>
                  <th className="px-5 py-4 font-medium">{c.cols.size}</th>
                  <th className="px-5 py-4 font-medium">{c.cols.license}</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {corpora.map((row) => {
                  const st = statusStyles[row.status] ?? statusStyles.custom
                  return (
                    <tr key={row.name} className="border-b border-deep-blue/5 last:border-0 transition hover:bg-white/40">
                      <td className="px-5 py-4 font-medium text-deep-blue">{row.name}</td>
                      <td className="px-5 py-4">
                        <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium', st.badge)}>
                          <span className={cn('size-1.5 rounded-full', st.dot)} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-deep-blue/70">{row.lang}</td>
                      <td className="px-5 py-4 text-deep-blue/70">{row.type}</td>
                      <td className="px-5 py-4 text-deep-blue/70">{row.availability}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-xs text-deep-blue/40">демо</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function Footer() {
  const { t } = await getDictionary()
  return (
    <footer className="border-t border-white/40 bg-white/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-deep-blue/50">
            {t.meta?.description ?? 'Данные для ИИ человеческого качества на тюркских языках.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-10 text-sm">
          <div>
            <p className="font-semibold text-deep-blue">Продукт</p>
            <ul className="mt-3 space-y-2 text-deep-blue/55">
              <li><a href="#services" className="hover:text-deep-blue">Услуги</a></li>
              <li><a href="#quality" className="hover:text-deep-blue">Качество</a></li>
              <li><Link href="/workspace" className="hover:text-deep-blue">Демо</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-deep-blue">Аккаунт</p>
            <ul className="mt-3 space-y-2 text-deep-blue/55">
              <li><Link href="/login" className="hover:text-deep-blue">Вход</Link></li>
              <li><Link href="/register" className="hover:text-deep-blue">Регистрация</Link></li>
              <li><Link href="/client" className="hover:text-deep-blue">Кабинет</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-deep-blue">Контакт</p>
            <a href="mailto:contact@qadam.ai" className="mt-3 inline-flex items-center gap-1.5 text-deep-blue/55 hover:text-deep-blue">
              <Mail className="size-3.5" /> contact@qadam.ai
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/30 py-4 text-center text-xs text-deep-blue/40">
        © {new Date().getFullYear()} Qadam · демо-прототип
      </div>
    </footer>
  )
}
