import { Building2, Check, Cpu, GraduationCap } from 'lucide-react'
import { SectionHead } from '@/components/section-head'
import { getDictionary } from '@/lib/i18n/server'

const icons = [Cpu, Building2, GraduationCap]

export async function Audience() {
  const { t } = await getDictionary()
  const a = t.audience
  return (
    <section id="audience" className="scroll-mt-28 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <SectionHead index="01" eyebrow={a.eyebrow} title={a.title} text={a.text} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {a.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <article key={item.title} className="flex flex-col rounded-md border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5 text-sm">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden="true" />
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
