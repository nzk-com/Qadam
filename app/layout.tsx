import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: 'Dala AI — Human-quality AI data for Turkic languages',
  description:
    'Платформа для создания, обучения и продажи высококачественных AI-данных на казахском и кыргызском языках: RLHF, red-teaming, локализация, корпуса.',
  openGraph: {
    title: 'Dala AI — Human-quality AI data for Turkic languages',
    description:
      'RLHF, red-teaming и корпуса на казахском и кыргызском языках от носителей языка.',
    images: ['/steppe.png'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
