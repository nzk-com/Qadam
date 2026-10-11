import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav aria-label="Основная навигация" className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#services" className="hover:text-foreground">Услуги</a>
          <a href="#quality" className="hover:text-foreground">Качество</a>
          <a href="#corpora" className="hover:text-foreground">Корпуса</a>
          <a href="#calculator" className="hover:text-foreground">Калькулятор</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/client" className={cn(buttonVariants({ variant: 'ghost' }), 'hidden sm:inline-flex')}>
            Войти
          </Link>
          <a href="#request" className={buttonVariants()}>
            Запросить демо
          </a>
        </div>
      </div>
    </header>
  )
}

export function Hero() {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-terracotta" />
            Казахский · Кыргызский · Код-свитчинг KZ/RU
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance text-primary md:text-5xl">
            Human-quality AI data for Turkic languages
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Dala AI обучает ИИ языкам Центральной Азии: RLHF, red-teaming, локализация и готовые корпуса от
            сертифицированных носителей языка с многоступенчатым контролем качества.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#request" className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5')}>
              Обсудить проект
              <ArrowRight />
            </a>
            <Link href="/rlhf" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5')}>
              Посмотреть рабочую среду
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              ['91%', 'точность на gold-standard'],
              ['8', 'критериев оценки'],
              ['2', 'языка и код-свитчинг'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-serif text-2xl font-semibold text-primary">{v}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-background">
          <Image
            src="/steppe.png"
            alt="Степной горизонт на закате в оливковых и терракотовых тонах"
            width={1024}
            height={768}
            priority
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-xl border border-border bg-background/95 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-muted-foreground">Ответ B · естественность</p>
            <p className="mt-1 text-sm">
              «сізге паспорт қажет болады» — <span className="font-medium text-terracotta">калька с русского</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Тег добавлен аннотатором · проверен QA-лингвистом</p>
          </div>
        </div>
      </div>
    </section>
  )
}
