'use client'

import { adoptAnimal } from "@/app/actions/adopt"
import { useState } from "react"
import { motion } from "framer-motion"

interface AdoptionFormProps {
    animalId: string;
    animalName: string;
    onClose?: () => void;
}

export function AdoptionForm({ animalId, animalName, onClose }: AdoptionFormProps) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await adoptAnimal(formData)
        setLoading(false)

        if (result.success) {
            setSuccess(true)
            if (onClose) {
                setTimeout(onClose, 3000)
            }
        } else {
            alert(result.error)
        }
    }

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 p-8 rounded-3xl text-center border border-green-100 shadow-inner"
            >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                    <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-black text-ocean-900 tracking-tighter mb-2">Sucesso!</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                    Você agora é o orgulhoso padrinho/madrinha da <span className="text-ocean-500 font-bold">{animalName}</span>!
                </p>
            </motion.div>
        )
    }

    return (
        <form action={handleSubmit} className="p-2 space-y-6">
            <div className="space-y-1">
                <h3 className="text-3xl font-black text-ocean-900 tracking-tighter">
                    Apadrinhar <span className="text-ocean-500">{animalName}</span>
                </h3>
                <p className="text-sm font-medium text-gray-500">
                    Seu apoio financia transmissores de telemetria e missões de resgate.
                </p>
            </div>

            <input type="hidden" name="animalId" value={animalId} />

            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-ocean-900 mb-2">Nome Completo</label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Ex: Jacques Cousteau"
                        className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/10 outline-none transition-all text-sm font-medium text-ocean-900"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-ocean-900 mb-2">E-mail Profissional</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="contato@instituto.com"
                        className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/10 outline-none transition-all text-sm font-medium text-ocean-900"
                    />
                </div>
            </div>

            <div className="pt-4 flex gap-3">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-4 rounded-2xl bg-gray-100 text-gray-500 font-bold text-xs tracking-widest uppercase hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-ocean-900 text-white py-4 rounded-2xl font-bold text-xs tracking-widest uppercase hover:bg-ocean-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-ocean-900/20"
                >
                    {loading ? 'Processando dados...' : 'Confirmar Apoio'}
                </button>
            </div>
        </form>
    )
}