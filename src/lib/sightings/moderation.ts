import { z } from 'zod'

export const MODERATION_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const
export type ModerationStatus = (typeof MODERATION_STATUSES)[number]

const moderationSchema = z.object({
  id: z.string().min(1),
  status: z.enum(MODERATION_STATUSES),
})

export function parseModeration(input: Record<string, unknown>) {
  const result = moderationSchema.safeParse(input)
  return result.success ? result.data : null
}

export function parseStatusFilter(value: string | string[] | undefined): ModerationStatus {
  const first = Array.isArray(value) ? value[0] : value
  return MODERATION_STATUSES.find((status) => status === first) ?? 'PENDING'
}
