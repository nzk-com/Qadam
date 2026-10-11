'use client'

import Link from 'next/link'
import { useI18n } from '@/components/i18n-provider'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('size-8', className)}
      aria-hidden="true"
      fill="none"
    >
      <rect width="32" height="32" rx="5" fill="#353524" />
      <path
        d="M10 8h5.5a8 8 0 0 1 0 16H10V8Z"
        stroke="#EDEBE4"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M6 20.5h20" stroke="#BAB5A0" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="23.5" cy="9" r="2.4" fill="#A95332" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  const { t } = useI18n()
  return (
    <Link href="/" className={cn('flex items-center gap-2.5', className)} aria-label={t.nav.home}>
      <LogoMark />
      <span className="font-serif text-xl font-semibold tracking-tight text-primary">
        Dala <span className="text-terracotta">AI</span>
      </span>
    </Link>
  )
}
