/**
 * Demo-only "auth". Not real authentication.
 * Role is stored in localStorage for presentation purposes.
 */

export type DemoRole = 'annotator' | 'client' | 'qa' | 'admin' | 'guest'

export interface DemoUser {
  name: string
  email: string
  role: DemoRole
}

const KEY = 'dala-ai-demo-user-v1'

export function loadDemoUser(): DemoUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw) as DemoUser
  } catch {
    return null
  }
}

export function saveDemoUser(user: DemoUser) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function clearDemoUser() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}

export function roleHome(role: DemoRole): string {
  switch (role) {
    case 'annotator':
      return '/workspace'
    case 'client':
      return '/client'
    case 'qa':
      return '/workspace'
    case 'admin':
      return '/admin'
    default:
      return '/'
  }
}
