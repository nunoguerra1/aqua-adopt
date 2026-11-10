import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-32 text-center space-y-6">
      <p className="text-sm font-black text-ocean-500 tracking-[0.2em] uppercase">Erro 404</p>
      <h1 className="text-5xl font-black text-ocean-900 tracking-tighter">Página não encontrada</h1>
      <p className="text-gray-500 font-medium">
        O endereço que você tentou abrir não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-4 rounded-2xl bg-ocean-900 text-white font-bold text-xs tracking-widest uppercase hover:bg-ocean-800 transition-colors"
      >
        Voltar ao início
      </Link>
    </main>
  )
}
