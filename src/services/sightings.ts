import { prisma } from '@/lib/prisma'
import type { SightingInput } from '@/lib/sightings/schema'
import { toPublicSighting, type PublicSighting } from '@/lib/sightings/public'
import type { ModerationStatus } from '@/lib/sightings/moderation'

export async function createSighting(input: SightingInput) {
  return prisma.sighting.create({ data: input })
}

export async function getPublicSightings(): Promise<PublicSighting[]> {
  const rows = await prisma.sighting.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
    take: 200,
    select: {
      id: true,
      speciesGroup: true,
      description: true,
      observedAt: true,
      latitude: true,
      longitude: true,
    },
  })

  return rows.map(toPublicSighting)
}

// Somente para /admin: inclui dados privados (nome, referência do local e posição exata).
// Quem chama TEM que ter passado por requireAdmin().
export async function getSightingsForModeration(status: ModerationStatus) {
  return prisma.sighting.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { reviewedBy: { select: { email: true } } },
  })
}

export async function setSightingStatus(id: string, status: ModerationStatus, reviewerId: string) {
  const reopened = status === 'PENDING'

  return prisma.sighting.updateMany({
    where: { id },
    data: {
      status,
      reviewedAt: reopened ? null : new Date(),
      reviewedById: reopened ? null : reviewerId,
    },
  })
}

export async function countSightingsByStatus() {
  const [PENDING, APPROVED, REJECTED] = await Promise.all([
    prisma.sighting.count({ where: { status: 'PENDING' } }),
    prisma.sighting.count({ where: { status: 'APPROVED' } }),
    prisma.sighting.count({ where: { status: 'REJECTED' } }),
  ])
  return { PENDING, APPROVED, REJECTED }
}
