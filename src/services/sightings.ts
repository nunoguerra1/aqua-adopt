import { prisma } from '@/lib/prisma'
import type { SightingInput } from '@/lib/sightings/schema'
import { toPublicSighting, type PublicSighting } from '@/lib/sightings/public'

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
