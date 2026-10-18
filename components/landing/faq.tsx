import { ChevronDown, Mail } from 'lucide-react'
import { getDictionary } from '@/lib/i18n/server'

export async function Faq() {
  const { t } = await getDictionary()
  const f = t.faq
  return (
    <section id="faq" className="scroll-mt-28 lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-deep-blue/45">{f.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-deep-blue md:text-[2.5rem]">{f.title}</h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {f.items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group overflow-hidden rounded-[1.15rem] border border-white/60 bg-white/50 shadow-[0_8px_30px_-14px_rgba(15,40,80,0.1)] backdrop-blur-xl open:bg-white/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-deep-blue outline-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="size-4 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="border-t border-deep-blue/6 px-6 pb-5 pt-3 text-sm leading-relaxed text-deep-blue/55">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-deep-blue/50">
          {f.more}{' '}
          <a href="mailto:contact@qadam.ai" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
            <Mail className="size-3.5" /> contact@qadam.ai
          </a>
        </p>
      </div>
    </section>
  )
}
