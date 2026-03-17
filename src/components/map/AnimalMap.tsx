'use client'

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

interface MapProps {
    animals: any[]
}

export default function AnimalMap({ animals }: MapProps) {
    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-inner border-4 border-white">
            <MapContainer
                center={[-20, -40]}
                zoom={3}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {animals.map((animal) => (
                    <Marker
                        key={animal.id}
                        position={[animal.latitude, animal.longitude]}
                        icon={icon}
                    >
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
                                <strong className="text-blue-600 text-sm">{animal.name}</strong><br />
                                <span className="text-gray-500 text-xs">{animal.species}</span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}