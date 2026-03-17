'use client'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import { AdoptionForm } from "@/components/ui/AdoptionForm"

interface AnimalCardProps {
    id: string;
    name: string;
    species: string;
    image: string;
    status: string;
}

export function AnimalCard({ id, name, species, image, status }: AnimalCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
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
                        <Link href={`/animals/${id}`} className="block w-full">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 rounded-2xl bg-ocean-900 text-white font-bold text-xs tracking-widest uppercase transition-colors hover:bg-ocean-800 flex justify-center items-center cursor-pointer"
                            >
                                Conhecer Perfil
                            </motion.div>
                        </Link>

                        <motion.button
                            onClick={() => setIsModalOpen(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 rounded-2xl bg-ocean-50 text-ocean-900 font-bold text-xs tracking-widest uppercase transition-colors hover:bg-ocean-100"
                        >
                            Apadrinhar
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-ocean-900/40 backdrop-blur-sm cursor-pointer"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[3rem] p-8 shadow-2xl z-10"
                        >
                            <AdoptionForm
                                animalId={id}
                                animalName={name}
                                onClose={() => setIsModalOpen(false)}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}