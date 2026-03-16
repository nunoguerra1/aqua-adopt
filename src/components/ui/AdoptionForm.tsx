'use client'

import { adoptAnimal } from "@/app/actions/adopt"
import { useState } from "react"

export function AdoptionForm({ animalId, animalName }: { animalId: string, animalName: string }) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await adoptAnimal(formData)
        setLoading(false)

        if (result.success) {
            setSuccess(true)
        } else {
            alert(result.error)
        }
    }

    if (success) {
        return (
            <div className="bg-green-100 p-6 rounded-xl text-green-800 text-center font-bold border border-green-200">
                Apadrinhamento concluido com sucesso! Agora é padrinho/madrinha da {animalName}!
            </div>
        )
    }

    return (
        <form action={handleSubmit} className="bg-blue-50 p-6 rounded-xl shadow-inner space-y-4">
            <h3 className="text-xl font-bold text-blue-900">Apadrinhar {animalName}</h3>
            <input type="hidden" name="animalId" value={animalId} />

            <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">Nome</label>
                <input name="name" type="text" required className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">E-mail</label>
                <input name="email" type="email" required className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
                {loading ? 'A processar...' : 'Confirmar Apadrinhamento'}
            </button>
        </form>
    )
}