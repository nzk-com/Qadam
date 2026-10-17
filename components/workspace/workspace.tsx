'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  SkipForward,
  Filter,
} from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { Button } from '@/components/ui/button'
import {
  demoTasks,
  allTags,
  type DemoTask,
  type LanguageCode,
  type TaskType,
  type TagId,
} from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'dala-ai-demo-progress-v1'

type Choice = 'A' | 'B' | 'C' | 'equal' | 'none' | 'cant'

interface Evaluation {
  choice: Choice | null
  tags: TagId[]
  comment: string
  submittedAt?: string
}

type ProgressMap = Record<string, Evaluation>

function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

function saveProgress(data: ProgressMap) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function Workspace() {
  const { t } = useI18n()
  const [progress, setProgress] = useState<ProgressMap>({})
  const [hydrated, setHydrated] = useState(false)

  // Filters
  const [langFilter, setLangFilter] = useState<LanguageCode | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<TaskType | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [diffFilter, setDiffFilter] = useState<string>('all')

  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<Choice | null>(null)
  const [selectedTags, setSelectedTags] = useState<TagId[]>([])
  const [comment, setComment] = useState('')
  const [mode, setMode] = useState<'train' | 'eval'>('train')
  const [justSaved, setJustSaved] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    setProgress(loadProgress())
    setHydrated(true)
  }, [])

  const filtered = useMemo(() => {
    return demoTasks.filter((task) => {
      if (langFilter !== 'all' && task.language !== langFilter) return false
      if (typeFilter !== 'all' && task.taskType !== typeFilter) return false
      if (categoryFilter !== 'all' && task.category !== categoryFilter) return false
      if (diffFilter !== 'all' && task.difficulty !== diffFilter) return false
      return true
    })
  }, [langFilter, typeFilter, categoryFilter, diffFilter])

  // Reset index when filters change
  useEffect(() => {
    setIndex(0)
  }, [langFilter, typeFilter, categoryFilter, diffFilter])

  const current: DemoTask | null = filtered[index] ?? null
  const doneCount = Object.keys(progress).filter((id) => progress[id]?.choice).length

  // Load evaluation when task changes
  useEffect(() => {
    if (!current) return
    const existing = progress[current.id]
    if (existing) {
      setChoice(existing.choice)
      setSelectedTags(existing.tags ?? [])
      setComment(existing.comment ?? '')
    } else {
      setChoice(null)
      setSelectedTags([])
      setComment('')
    }
    setJustSaved(false)
  }, [current?.id, progress])

  const persist = useCallback(
    (taskId: string, evalData: Evaluation) => {
      setProgress((prev) => {
        const next = { ...prev, [taskId]: evalData }
        saveProgress(next)
        return next
      })
      setJustSaved(true)
    },
    []
  )

  const handleSubmit = () => {
    if (!current || !choice) return
    persist(current.id, {
      choice,
      tags: selectedTags,
      comment,
      submittedAt: new Date().toISOString(),
    })
  }

  const goNext = () => {
    if (index < filtered.length - 1) setIndex((i) => i + 1)
  }
  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1)
  }

  const resetAll = () => {
    if (typeof window !== 'undefined' && window.confirm('Сбросить весь демо-прогресс на этом устройстве?')) {
      setProgress({})
      saveProgress({})
      setChoice(null)
      setSelectedTags([])
      setComment('')
    }
  }

  const toggleTag = (tag: TagId) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]
    )
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Загрузка…
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-secondary/40">
      {/* Top bar */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 md:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-deep-blue">
              Dala AI · Демо-рабочая среда
            </p>
            <p className="text-xs text-muted-foreground">
              {current ? `${current.id} · ${current.language} · ${current.taskType}` : 'Нет заданий'} · Демо
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-soft-blue px-2.5 py-0.5 text-xs font-medium text-deep-blue">
              {doneCount} / {demoTasks.length} выполнено
            </span>
            <Button variant="outline" size="sm" onClick={() => setShowFilters((v) => !v)}>
              <Filter className="mr-1 size-3.5" /> Фильтры
            </Button>
            <Button variant="ghost" size="sm" onClick={resetAll} title="Сбросить демо-прогресс">
              <RotateCcw className="size-3.5" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="border-t border-border bg-secondary/60 px-4 py-3 md:px-6">
            <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 text-sm">
              <select
                className="rounded-md border border-border bg-white px-2 py-1"
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value as any)}
              >
                <option value="all">Все языки</option>
                <option value="kk">Қазақша</option>
                <option value="ky">Кыргызча</option>
                <option value="kk-ru">KK/RU</option>
              </select>
              <select
                className="rounded-md border border-border bg-white px-2 py-1"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
              >
                <option value="all">Все типы</option>
                <option value="preference">Preference</option>
                <option value="localization">Localization</option>
                <option value="red-teaming">Red-teaming</option>
              </select>
              <select
                className="rounded-md border border-border bg-white px-2 py-1"
                value={diffFilter}
                onChange={(e) => setDiffFilter(e.target.value)}
              >
                <option value="all">Сложность</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Режим:</label>
                <button
                  className={cn(
                    'rounded px-2 py-0.5 text-xs',
                    mode === 'train' ? 'bg-primary text-white' : 'bg-white border'
                  )}
                  onClick={() => setMode('train')}
                >
                  Учебный
                </button>
                <button
                  className={cn(
                    'rounded px-2 py-0.5 text-xs',
                    mode === 'eval' ? 'bg-primary text-white' : 'bg-white border'
                  )}
                  onClick={() => setMode('eval')}
                >
                  Оценка
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!current ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
          <p className="text-lg font-medium text-deep-blue">Нет заданий по выбранным фильтрам</p>
          <Button variant="outline" onClick={() => {
            setLangFilter('all')
            setTypeFilter('all')
            setCategoryFilter('all')
            setDiffFilter('all')
          }}>
            Сбросить фильтры
          </Button>
        </div>
      ) : (
        <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[240px_1fr_280px] md:px-6">
          {/* Left: instructions */}
          <aside className="space-y-4 rounded-xl border border-border bg-white p-4 text-sm">
            <div>
              <h3 className="mb-1 font-semibold text-deep-blue">Инструкция</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Сравните ответы. Выберите лучший или отметьте равноценность / неудовлетворительность.
                Добавьте теги ошибок и комментарий при необходимости.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-deep-blue">Критерии</h3>
              <ul className="list-inside list-disc text-xs text-muted-foreground space-y-0.5">
                {current.criteria.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <p className="rounded-md bg-soft-blue/60 px-2 py-1.5 text-[11px] text-deep-blue">
              Демонстрационные задания. Перед использованием для обучения требуется проверка языковым экспертом.
            </p>
          </aside>

          {/* Center: question + answers */}
          <main className="space-y-4">
            <div className="rounded-xl border border-border bg-white p-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Вопрос пользователя
              </p>
              <p className="text-base leading-relaxed text-foreground">{current.question}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {current.answers.map((ans) => {
                const isSelected =
                  choice === ans.id ||
                  (choice === 'equal' && true) ||
                  (choice === 'none' && true)
                return (
                  <button
                    key={ans.id}
                    type="button"
                    onClick={() => setChoice(ans.id)}
                    className={cn(
                      'rounded-xl border p-4 text-left transition-all',
                      choice === ans.id
                        ? 'border-primary bg-soft-blue ring-2 ring-primary/30'
                        : 'border-border bg-white hover:border-deco-blue'
                    )}
                  >
                    <span className="mb-2 inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {ans.id}
                    </span>
                    <p className="text-sm leading-relaxed">{ans.text}</p>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {(['equal', 'none', 'cant'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setChoice(opt)}
                  className={cn(
                    'rounded-lg border px-3 py-1.5 text-xs font-medium transition',
                    choice === opt
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-white text-muted-foreground hover:border-deco-blue'
                  )}
                >
                  {opt === 'equal' && 'Ответы равноценны'}
                  {opt === 'none' && 'Все неудовлетворительны'}
                  {opt === 'cant' && 'Не могу оценить'}
                </button>
              ))}
            </div>

            {mode === 'train' && progress[current.id]?.choice && (
              <div className="rounded-xl border border-dashed border-deco-blue bg-soft-blue/40 p-4 text-sm">
                <p className="mb-1 font-medium text-deep-blue">
                  Предлагаемое объяснение{' '}
                  <span className="text-xs font-normal text-muted-foreground">
                    (ожидает экспертной проверки)
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Suggested: <strong>{current.suggestedAnswer}</strong> — {current.explanation}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={goPrev} disabled={index === 0}>
                <ChevronLeft className="size-4" /> Назад
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!choice}
              >
                Отправить оценку
              </Button>
              <Button variant="outline" size="sm" onClick={goNext} disabled={index >= filtered.length - 1}>
                Далее <ChevronRight className="size-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={goNext}>
                <SkipForward className="size-4" /> Пропустить
              </Button>
              {justSaved && (
                <span className="text-xs text-success">Сохранено на этом устройстве</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Задание {index + 1} из {filtered.length} (фильтр) · Всего в демо: {demoTasks.length}
            </p>
          </main>

          {/* Right: tags + comment */}
          <aside className="space-y-4 rounded-xl border border-border bg-white p-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-deep-blue">Теги ошибок</h3>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'rounded-full border px-2 py-0.5 text-[11px] transition',
                      selectedTags.includes(tag)
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-secondary text-muted-foreground hover:border-deco-blue'
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-deep-blue">Комментарий</h3>
              <textarea
                className="min-h-[100px] w-full resize-y rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Краткий комментарий (необязательно)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
              <Flag className="mr-1 size-3.5" /> Сообщить о проблеме
            </Button>
          </aside>
        </div>
      )}
    </div>
  )
}
