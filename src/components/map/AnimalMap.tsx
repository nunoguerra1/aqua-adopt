'use client'

import { MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { markerIcon } from './marker-icon'
import { SPECIES_GROUP_LABELS } from '@/lib/sightings/labels'
import type { PublicSighting } from '@/lib/sightings/public'
import type { MapAnimal } from './types'

interface MapProps {
  animals: MapAnimal[]
  sightings?: PublicSighting[]
}

export default function AnimalMap({ animals, sightings = [] }: MapProps) {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-inner border-4 border-white">
      <MapContainer center={[-20, -40]} zoom={3} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {animals.map((animal) => (
          <Marker key={animal.id} position={[animal.latitude, animal.longitude]} icon={markerIcon}>
            <Tooltip
              direction="top"
              offset={[0, -35]}
              opacity={1}
              permanent
              className="font-bold text-ocean-900 bg-white/90 backdrop-blur-sm border-none shadow-md rounded-lg px-2 py-1 text-xs"
            >
              {animal.name}
            </Tooltip>

            <Popup>
              <div className="text-center">
                <strong className="text-blue-600 text-sm">{animal.name}</strong>
                <br />
                <span className="text-gray-500 text-xs">{animal.species}</span>
              </div>
            </Popup>
          </Marker>
        ))}

        {sightings.map((sighting) => (
          <CircleMarker
            key={sighting.id}
            center={[sighting.latitude, sighting.longitude]}
            radius={8}
            pathOptions={{ color: '#0e7490', fillColor: '#06b6d4', fillOpacity: 0.6 }}
          >
            <Popup>
              <div className="space-y-1 text-xs">
                <strong className="text-sm text-ocean-900">
                  {SPECIES_GROUP_LABELS[sighting.speciesGroup]}
                </strong>
                <p className="text-gray-500">
                  Visto em {new Date(sighting.observedAt).toLocaleDateString('pt-BR')}
                </p>
                <p className="line-clamp-4 text-gray-700">{sighting.description}</p>
                <p className="text-gray-400">Posição aproximada (cerca de 11 km).</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
