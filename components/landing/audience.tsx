import { Building2, Check, Cpu, GraduationCap } from 'lucide-react'
import { getDictionary } from '@/lib/i18n/server'

const icons = [Cpu, Building2, GraduationCap]

export async function Audience() {
  const { t } = await getDictionary()
  const a = t.audience
  return (
    <section id="audience" className="section-soft section-blend relative scroll-mt-28 lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-deep-blue/45">{a.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-deep-blue md:text-[2.5rem]">{a.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-deep-blue/55">{a.text}</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {a.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <article
                key={item.title}
                className="group flex flex-col rounded-[1.35rem] border border-white/60 bg-white/50 p-7 shadow-[0_10px_40px_-16px_rgba(15,40,80,0.1)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:bg-white/70 hover:shadow-[0_20px_50px_-16px_rgba(15,40,80,0.16)]"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-sky-400/15 text-primary shadow-sm transition group-hover:scale-105">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-serif text-xl font-medium text-deep-blue">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep-blue/55">{item.text}</p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-deep-blue/8 pt-5 text-sm text-deep-blue/70">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
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
