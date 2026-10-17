import { Building2, Check, Cpu, GraduationCap } from 'lucide-react'
import { SectionHead } from '@/components/section-head'
import { getDictionary } from '@/lib/i18n/server'

const icons = [Cpu, Building2, GraduationCap]

export async function Audience() {
  const { t } = await getDictionary()
  const a = t.audience
  return (
    <section id="audience" className="relative scroll-mt-28 py-6 lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-deep-blue/50">{a.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-deep-blue md:text-4xl">{a.title}</h2>
          <p className="mt-4 text-deep-blue/60">{a.text}</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {a.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <article
                key={item.title}
                className="group flex flex-col rounded-3xl border border-white/50 bg-white/40 p-7 shadow-[0_12px_40px_rgba(15,40,80,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:bg-white/55 hover:shadow-[0_20px_50px_rgba(15,40,80,0.1)]"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white/70 text-primary shadow-sm transition group-hover:scale-105">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-serif text-xl font-medium text-deep-blue">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep-blue/60">{item.text}</p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/40 pt-5 text-sm text-deep-blue/75">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
