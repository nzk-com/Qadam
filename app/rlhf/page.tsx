import type { Metadata } from 'next'
import { AppHeader } from '@/components/app-header'
import { Workspace } from '@/components/rlhf/workspace'
import { getDictionary } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return { title: t.meta.rlhf }
}

export default function Page() {
  return (
    <>
      <AppHeader />
      <main>
        <Workspace />
      </main>
    </>
  )
}
