'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '@/components/i18n-provider'
import { cn } from '@/lib/utils'

/** Logo mark — uses tiger image when available, otherwise a blue placeholder SVG */
export function LogoMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)} style={{ width: size, height: size }}>
      {/* Prefer the attached blue tiger illustration */}
      <Image
        src="/images/dala-tiger.png"
        alt="Qadam"
        width={size}
        height={size}
        className="object-contain"
        onError={(e) => {
          // Fallback if image not yet uploaded
          const target = e.currentTarget
          target.style.display = 'none'
          const fallback = target.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'block'
        }}
      />
      <svg
        viewBox="0 0 64 64"
        className="hidden size-full"
        aria-hidden="true"
        fill="none"
      >
        <circle cx="32" cy="32" r="30" fill="#DCEEFF" />
        <path
          d="M20 28c0-6 4-12 12-12s12 6 12 12v4c0 8-5 14-12 14S20 40 20 32v-4z"
          fill="#A9D5F5"
        />
        <ellipse cx="26" cy="30" rx="3" ry="4" fill="#153B70" />
        <ellipse cx="38" cy="30" rx="3" ry="4" fill="#153B70" />
        <path d="M28 38c2 2 6 2 8 0" stroke="#153B70" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 18l2 4h-4l2-4z" fill="#2563EB" />
        <path d="M24 22l-3-4M40 22l3-4" stroke="#153B70" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { t } = useI18n()
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5', className)}
      aria-label={t.nav?.home ?? 'Qadam'}
    >
      <LogoMark size={compact ? 28 : 36} />
      <span className={cn('font-semibold tracking-tight text-deep-blue', compact ? 'text-sm' : 'text-lg')}>
        Qadam
      </span>
    </Link>
  )
}
