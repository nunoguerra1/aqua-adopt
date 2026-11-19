import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { KeyRound } from 'lucide-react'
import { auth } from '@/lib/auth'
import { safeRedirectPath } from '@/lib/auth/redirect'
import { SignInForm } from '@/components/auth/SignInForm'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Entrar | AquaAdopt',
}

export default async function EntrarPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>
}) {
  const { next } = await searchParams
  const redirectTo = safeRedirectPath(typeof next === 'string' ? next : undefined)

  const session = await auth.api.getSession({ headers: await headers() })
  if (session) redirect(redirectTo)

  return (
    <main className="max-w-[600px] mx-auto px-6 py-32 min-h-screen">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <KeyRound className="w-8 h-8 text-ocean-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-ocean-900 tracking-tighter mb-4">
            Entrar
          </h1>
          <p className="text-gray-500 text-lg">
            Sem senha: enviamos um link de acesso para o seu e-mail.
          </p>
        </div>

        <div className="glass p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-ocean-900/10">
          <SignInForm redirectTo={redirectTo} />
        </div>
      </FadeIn>
    </main>
  )
}
