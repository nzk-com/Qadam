import { cn } from '@/lib/utils'

export function SectionHead({
  index,
  eyebrow,
  title,
  text,
  inverse = false,
}: {
  index: string
  eyebrow: string
  title: string
  text?: string
  inverse?: boolean
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={cn(
          'flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em]',
          inverse ? 'text-sand' : 'text-terracotta',
        )}
      >
        <span className="tabular-nums">{index}</span>
        <span className={cn('h-px w-8', inverse ? 'bg-sand/60' : 'bg-terracotta/60')} />
        {eyebrow}
      </p>
      <h2
        className={cn(
          'mt-3 font-serif text-3xl font-semibold tracking-tight text-balance',
          inverse ? 'text-primary-foreground' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {text && <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">{text}</p>}
    </div>
  )
}
