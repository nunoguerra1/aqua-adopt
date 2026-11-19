'use client'

import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'rate-limited'

const inputClass =
  'w-full bg-white/50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all'

export function SignInForm({ redirectTo }: { redirectTo: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    const { error } = await authClient.signIn.magicLink({ email, callbackURL: redirectTo })

    if (!error) setStatus('sent')
    else setStatus(error.status === 429 ? 'rate-limited' : 'error')
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-8 flex flex-col items-center space-y-4">
        <Mail className="w-16 h-16 text-ocean-600" />
        <h2 className="text-3xl font-black text-ocean-900">Confira seu e-mail</h2>
        <p className="text-gray-500 max-w-md">
          Se o endereço <strong>{email}</strong> estiver correto, você receberá um link de acesso em
          instantes. Ele vale por 5 minutos e só funciona uma vez.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm font-bold text-ocean-500 hover:text-ocean-900 transition-colors"
        >
          Usar outro e-mail
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <p
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700"
        >
          Não foi possível enviar o link agora. Tente novamente em instantes.
        </p>
      )}
      {status === 'rate-limited' && (
        <p
          role="alert"
          className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm font-medium text-amber-800"
        >
          Muitas tentativas. Aguarde um minuto e tente de novo.
        </p>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-bold text-ocean-900 ml-2">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@exemplo.com"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-ocean-900 text-white px-8 py-5 rounded-2xl font-black tracking-wide hover:bg-ocean-800 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Enviando...' : 'Receber link de acesso'}
      </button>
    </form>
  )
}
