'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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
                        <Popup>
                            <div className="text-center">
                                <strong className="text-blue-600">{animal.name}</strong><br />
                                {animal.species}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}