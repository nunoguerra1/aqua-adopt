'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/entrar')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-full bg-ocean-50 px-5 py-2 text-sm font-bold text-ocean-900 hover:bg-ocean-100 transition-colors"
    >
      Sair
    </button>
  )
}
