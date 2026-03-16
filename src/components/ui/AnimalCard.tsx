'use client'
import { motion } from "framer-motion"
import Link from 'next/link'

interface AnimalCardProps {
    id: string;
    name: string;
    species: string;
    image: string;
    status: string;
}

export function AnimalCard({ id, name, species, image, status }: AnimalCardProps) {
    return (
        <div className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(15,23,42,0.15)]">

            <div className="relative h-96 w-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/40 to-transparent" />

                <div className="absolute top-6 left-6">
                    <span className="glass px-4 py-2 rounded-full text-[9px] font-black tracking-[0.2em] uppercase text-ocean-900">
                        {status}
                    </span>
                </div>
            </div>

            <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-4xl font-black text-ocean-900 tracking-tighter leading-none">{name}</h3>
                    <p className="text-gray-400 mt-3 font-bold tracking-widest uppercase text-[10px]">{species}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link href={`/animal/${id}`}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 rounded-2xl bg-ocean-900 text-white font-bold text-xs tracking-widest uppercase transition-all hover:bg-ocean-800"
                        >
                            Conhecer Perfil
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 rounded-2xl bg-ocean-50 text-ocean-900 font-bold text-xs tracking-widest uppercase transition-all hover:bg-ocean-100"
                    >
                        Apadrinhar
                    </motion.button>
                </div>
            </div>
        </div>
    )
}