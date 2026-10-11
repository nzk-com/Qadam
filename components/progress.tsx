import { cn } from '@/lib/utils'

export function Progress({
  value,
  label,
  tone = 'primary',
}: {
  value: number
  label: string
  tone?: 'primary' | 'terracotta' | 'success'
}) {
  const color = { primary: 'bg-primary', terracotta: 'bg-terracotta', success: 'bg-success' }[tone]
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-accent"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className={cn('h-full rounded-full', color)} style={{ width: `${value}%` }} />
    </div>
  )
}
