import { ChevronDown, Mail } from 'lucide-react'
import { SectionHead } from '@/components/section-head'
import { getDictionary } from '@/lib/i18n/server'

export async function Faq() {
  const { t } = await getDictionary()
  const f = t.faq
  return (
    <section id="faq" className="scroll-mt-28 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
        <div>
          <SectionHead index="06" eyebrow={f.eyebrow} title={f.title} />
          <p className="mt-6 text-sm text-muted-foreground">{f.more}</p>
          <a
            href="mailto:contact@dala.ai"
            className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:underline"
          >
            <Mail className="size-4" aria-hidden="true" />
            contact@dala.ai
          </a>
        </div>
        <div className="divide-y divide-border overflow-hidden rounded-md border border-border">
          {f.items.map((item, i) => (
            <details key={item.q} open={i === 0} className="group px-5 py-4 open:bg-secondary/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/40 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown
                  className="size-4 shrink-0 text-terracotta transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
