'use client'

import { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { markerIcon } from '@/components/map/marker-icon'

interface LocationPickerProps {
  latitude: number | null
  longitude: number | null
  onPick: (latitude: number, longitude: number) => void
}

function ClickHandler({ onPick }: Pick<LocationPickerProps, 'onPick'>) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng.wrap()
      onPick(lat, lng)
    },
  })
  return null
}

function KeepInView({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap()

  useEffect(() => {
    if (!map.getBounds().contains([latitude, longitude])) {
      map.flyTo([latitude, longitude], Math.max(map.getZoom(), 8))
    }
  }, [map, latitude, longitude])

  return null
}

export default function LocationPicker({ latitude, longitude, onPick }: LocationPickerProps) {
  const hasMarker = latitude !== null && longitude !== null

  return (
    <div className="h-[320px] w-full rounded-2xl overflow-hidden border-4 border-white shadow-inner">
      <MapContainer center={[-20, -40]} zoom={3} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickHandler onPick={onPick} />
        {hasMarker && (
          <>
            <Marker position={[latitude, longitude]} icon={markerIcon} />
            <KeepInView latitude={latitude} longitude={longitude} />
          </>
        )}
      </MapContainer>
    </div>
  )
}
