export function DemoBanner() {
  return (
    <div
      role="note"
      className="bg-ocean-900 px-6 py-2 text-center text-[11px] font-medium text-white/90"
    >
      <strong className="font-black uppercase tracking-widest">Projeto de demonstração.</strong> Os
      animais e as posições são fictícios, o apadrinhamento é simbólico e nenhuma doação é
      processada.{' '}
      <a
        href="https://github.com/nunoguerra1/aqua-adopt"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-white"
      >
        Código aberto no GitHub
      </a>
    </div>
  )
}
