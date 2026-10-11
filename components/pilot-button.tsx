import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { getDictionary } from '@/lib/i18n/server'
import { cn } from '@/lib/utils'

const sizes = {
  md: 'h-9 px-4',
  lg: 'h-11 px-5',
  xl: 'h-12 px-6 text-base',
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
        buttonVariants(),
        'bg-terracotta font-semibold text-white shadow-sm hover:brightness-90 [a]:hover:bg-terracotta',
        sizes[size],
        className,
      )}
    >
      {t.nav.pilot}
      {arrow && <ArrowRight />}
    </a>
  )
}
