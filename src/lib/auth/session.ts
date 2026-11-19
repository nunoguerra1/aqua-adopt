import { cache } from 'react'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { isAdminRole } from '@/lib/auth/roles'

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() })
})

export async function requireUser(next = '/') {
  const session = await getSession()
  if (!session) redirect(`/entrar?next=${encodeURIComponent(next)}`)
  return session
}

export async function requireAdmin(next = '/admin') {
  const session = await requireUser(next)
  if (!isAdminRole(session.user.role)) notFound()
  return session
}
