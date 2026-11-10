import { prisma } from '@/lib/prisma'
import type { SightingInput } from '@/lib/sightings/schema'

export async function createSighting(input: SightingInput) {
  return prisma.sighting.create({ data: input })
}
