import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth/session'
import { SignOutButton } from '@/components/auth/SignOutButton'

export const metadata: Metadata = {
  title: 'Painel | AquaAdopt',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin()

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16 space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-ocean-500">
            Área administrativa
          </p>
          <p className="text-sm font-medium text-gray-500">{session.user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm font-bold text-ocean-500 hover:text-ocean-900 transition-colors"
          >
            Voltar ao site
          </Link>
          <SignOutButton />
        </div>
      </header>
      {children}
    </div>
  )
}
