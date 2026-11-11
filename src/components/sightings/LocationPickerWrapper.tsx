'use client'

import dynamic from 'next/dynamic'

export const LocationPickerWrapper = dynamic(() => import('./LocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400">
      Carregando mapa...
    </div>
  ),
})
