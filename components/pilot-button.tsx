import { ArrowRight } from 'lucide-react'
import { getDictionary } from '@/lib/i18n/server'
import { cn } from '@/lib/utils'

const sizes = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-11 px-6 text-sm',
  xl: 'h-12 px-7 text-base',
} as const

export async function PilotButton({
  size = 'lg',
  arrow = true,
  className,
}: {
  size?: keyof typeof sizes
  arrow?: boolean
  className?: string
}) {
  const { t } = await getDictionary()
  return (
    <a
      href="#request"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-sky-500 font-semibold text-white shadow-[0_8px_24px_-6px_rgba(37,99,235,0.45)] transition hover:brightness-110 active:scale-[0.98]',
        sizes[size],
        className,
      )}
    >
      {t.nav.pilot}
      {arrow && <ArrowRight className="size-4" />}
    </a>
  )
}
