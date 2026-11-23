import { createAnimalAction } from '@/app/actions/animals'
import { AnimalForm } from '@/components/admin/AnimalForm'
import { requireAdmin } from '@/lib/auth/session'

export default async function NewAnimalPage() {
  await requireAdmin('/admin/animais/novo')

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-black text-ocean-900 tracking-tighter">Novo animal</h1>
      <AnimalForm action={createAnimalAction} submitLabel="Criar animal" />
    </main>
  )
}
