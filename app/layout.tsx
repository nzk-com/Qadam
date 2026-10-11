import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Lora } from 'next/font/google'
import { I18nProvider } from '@/components/i18n-provider'
import { TopBar } from '@/components/top-bar'
import { getDictionary } from '@/lib/i18n/server'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
})

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.ogDescription,
      images: ['/steppe.png'],
    },
    icons: {
      icon: '/icon.svg',
      apple: '/apple-icon.png',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#353524',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { locale, t } = await getDictionary()
  return (
    <html lang={locale} className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <I18nProvider locale={locale} dictionary={t}>
          <TopBar />
          {children}
        </I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
