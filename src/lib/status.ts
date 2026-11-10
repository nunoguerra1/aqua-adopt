import type { Conservation } from '@prisma/client'

type StatusInfo = {
    label: string
    classes: string
}

export const STATUS_INFO: Record<Conservation, StatusInfo> = {
    STABLE: {
        label: 'Estável',
        classes: 'text-ocean-500 bg-ocean-500/10 border-ocean-500/20',
    },
    VULNERABLE: {
        label: 'Vulnerável',
        classes: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    },
    ENDANGERED: {
        label: 'Em perigo',
        classes: 'text-red-500 bg-red-500/10 border-red-500/20',
    },
    CRITICAL: {
        label: 'Criticamente em perigo',
        classes: 'text-accent bg-accent/10 border-accent/20',
    },
}