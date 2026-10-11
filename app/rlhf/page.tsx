import type { Metadata } from 'next'
import { AppHeader } from '@/components/app-header'
import { Workspace } from '@/components/rlhf/workspace'

export const metadata: Metadata = { title: 'RLHF-разметка — Dala AI' }

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
