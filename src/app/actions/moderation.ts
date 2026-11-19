'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/session'
import { parseModeration } from '@/lib/sightings/moderation'
import { setSightingStatus } from '@/services/sightings'

export async function moderateSighting(formData: FormData) {
  const session = await requireAdmin('/admin')

  const parsed = parseModeration({
    id: formData.get('id'),
    status: formData.get('status'),
  })
  if (!parsed) return

  await setSightingStatus(parsed.id, parsed.status, session.user.id)

  revalidatePath('/admin')
  revalidatePath('/')
}
