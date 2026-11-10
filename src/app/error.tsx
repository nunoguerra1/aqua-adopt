'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-32 text-center space-y-6">
      <h1 className="text-4xl font-black text-ocean-900 tracking-tighter">Algo deu errado</h1>
      <p className="text-gray-500 font-medium">
        Não conseguimos carregar os dados agora. Tente novamente em instantes.
      </p>
      <button
        onClick={reset}
        className="px-8 py-4 rounded-2xl bg-ocean-900 text-white font-bold text-xs tracking-widest uppercase hover:bg-ocean-800 transition-colors"
      >
        Tentar novamente
      </button>
    </main>
  )
}
