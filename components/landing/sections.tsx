import Link from 'next/link'
import { Check, Download } from 'lucide-react'
import { Logo } from '@/components/logo'
import { corpora, services } from '@/lib/demo-data'

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary">Услуги</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Не просто разметка, а экспертиза носителей языка: агглютинативная морфология, код-свитчинг, культурный
          контекст и локальные ошибки ИИ.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <h3 className="font-serif text-xl font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <p className="mt-5 text-sm">
                <span className="text-muted-foreground">от </span>
                <span className="font-semibold">${s.price}</span>
                <span className="text-muted-foreground"> {s.unit}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const pipeline = [
  ['Сертификация', 'Обучение, практика и экзамен. Только прошедшие экзамен получают доступ к проектам.'],
  ['Двойная разметка', 'Каждое задание оценивают минимум двое аннотаторов независимо.'],
  ['Скрытые контрольные', 'Gold-standard задания измеряют точность каждого аннотатора в фоне.'],
  ['Арбитраж', 'Спорные случаи с низкой согласованностью решает QA-лингвист.'],
  ['QA-отчёт', 'Клиент получает поставку в JSONL/CSV и отчёт по ошибкам и согласованности.'],
]

export function Quality() {
  return (
    <section id="quality" className="scroll-mt-16 border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">Как мы обеспечиваем качество</h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {pipeline.map(([t, d], i) => (
            <li key={t} className="bg-primary p-5">
              <span className="font-serif text-2xl text-sand">0{i + 1}</span>
              <h3 className="mt-3 font-medium">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{d}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-primary-foreground/80">
          {['NDA для каждого аннотатора', 'Разделение данных по проектам', 'Шифрование in transit и at rest', 'Удаление данных по запросу'].map(
            (x) => (
              <li key={x} className="flex items-center gap-2">
                <Check className="size-4 text-sand" />
                {x}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  )
}

export function Corpora() {
  return (
    <section id="corpora" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary">Каталог корпусов</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Готовые наборы данных с лицензией. Для исследований доступна академическая лицензия со скидкой или бесплатно.
        </p>
        <div className="mt-10 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Корпус</th>
                <th className="px-4 py-3 font-medium">Язык</th>
                <th className="px-4 py-3 font-medium">Объём</th>
                <th className="px-4 py-3 font-medium">Лицензия</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {corpora.map((c) => (
                <tr key={c.name} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.lang}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.size}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs">{c.license}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href="#request" className="inline-flex items-center gap-1.5 text-terracotta hover:underline">
                      <Download className="size-4" />
                      Сэмпл
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">Train AI in the languages of Central Asia.</p>
        </div>
        <nav aria-label="Платформа" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/client" className="hover:text-foreground">Кабинет клиента</Link>
          <Link href="/academy" className="hover:text-foreground">Академия аннотаторов</Link>
          <Link href="/rlhf" className="hover:text-foreground">Рабочая среда</Link>
          <Link href="/admin" className="hover:text-foreground">Админ-панель</Link>
        </nav>
      </div>
    </footer>
  )
}
