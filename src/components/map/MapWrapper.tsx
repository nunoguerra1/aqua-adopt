'use client'

import dynamic from 'next/dynamic'
import type { MapAnimal } from './types'

const AnimalMap = dynamic(() => import('./AnimalMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
      Carregando mapa interativo...
    </div>
  ),
})

export default function MapWrapper({ animals }: { animals: MapAnimal[] }) {
  return <AnimalMap animals={animals} />
}
