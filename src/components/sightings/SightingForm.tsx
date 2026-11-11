'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, LocateFixed, MapPin, Send } from 'lucide-react'
import { submitSighting, type SightingFormState } from '@/app/actions/sightings'
import { SPECIES_GROUP_LABELS } from '@/lib/sightings/labels'

const inputClass =
  'w-full bg-white/50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all'
const labelClass = 'text-sm font-bold text-ocean-900 ml-2'

const initialState: SightingFormState = { status: 'idle' }

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm font-medium text-red-600 ml-2">{message}</p>
}

export function SightingForm() {
  const [formKey, setFormKey] = useState(0)
  return <SightingFormFields key={formKey} onReset={() => setFormKey((key) => key + 1)} />
}

function SightingFormFields({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitSighting, initialState)
  const [coords, setCoords] = useState({ lat: '', lng: '' })
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const errors = state.fieldErrors ?? {}
  const values = state.values ?? {}
  const locationError = errors.latitude ?? errors.longitude

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setGeoStatus('error')
      return
    }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude.toFixed(5),
          lng: position.coords.longitude.toFixed(5),
        })
        setGeoStatus('idle')
      },
      () => setGeoStatus('error'),
      { enableHighAccuracy: true, timeout: 10_000 },
    )
  }

  if (state.status === 'success') {
    return (
      <div className="text-center py-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="w-20 h-20 text-ocean-600 mb-6" />
        <h2 className="text-3xl font-black text-ocean-900 mb-2">Relato recebido</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Obrigado! Seu relato foi guardado e será revisado antes de aparecer no mapa. Lembre-se:
          isto não aciona nenhuma equipe de resgate.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="bg-ocean-900 text-white px-8 py-4 rounded-full font-bold hover:bg-ocean-800 transition-all shadow-lg"
          >
            Voltar ao Mapa
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="bg-ocean-50 text-ocean-900 px-8 py-4 rounded-full font-bold hover:bg-ocean-100 transition-all"
          >
            Registrar outro relato
          </button>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === 'error' && state.message && (
        <p
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700"
        >
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="reporterName" className={labelClass}>
            Seu nome (opcional)
          </label>
          <input
            id="reporterName"
            name="reporterName"
            type="text"
            maxLength={80}
            defaultValue={values.reporterName}
            placeholder="Como podemos te chamar?"
            aria-invalid={Boolean(errors.reporterName)}
            className={inputClass}
          />
          <FieldError message={errors.reporterName} />
        </div>

        <div className="space-y-2">
          <label htmlFor="speciesGroup" className={labelClass}>
            Animal (se souber)
          </label>
          <select
            id="speciesGroup"
            name="speciesGroup"
            defaultValue={values.speciesGroup ?? 'UNKNOWN'}
            className={`${inputClass} text-gray-700`}
          >
            {Object.entries(SPECIES_GROUP_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <FieldError message={errors.speciesGroup} />
        </div>
      </div>

      <fieldset className="space-y-4">
        <legend className={`${labelClass} flex items-center gap-2`}>
          <MapPin className="w-4 h-4 text-accent" /> Local do avistamento
        </legend>

        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={geoStatus === 'loading'}
          className="inline-flex items-center gap-2 rounded-2xl bg-ocean-50 px-5 py-3 text-sm font-bold text-ocean-900 hover:bg-ocean-100 transition-colors disabled:opacity-60"
        >
          <LocateFixed className="w-4 h-4" />
          {geoStatus === 'loading' ? 'Obtendo localização...' : 'Usar minha localização'}
        </button>
        {geoStatus === 'error' && (
          <p role="status" className="text-sm font-medium text-amber-700 ml-2">
            Não consegui obter sua localização. Digite as coordenadas abaixo.
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="latitude" className={labelClass}>
              Latitude
            </label>
            <input
              id="latitude"
              name="latitude"
              type="text"
              inputMode="decimal"
              required
              value={coords.lat}
              onChange={(event) => setCoords((atual) => ({ ...atual, lat: event.target.value }))}
              placeholder="-24.10000"
              aria-invalid={Boolean(locationError)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="longitude" className={labelClass}>
              Longitude
            </label>
            <input
              id="longitude"
              name="longitude"
              type="text"
              inputMode="decimal"
              required
              value={coords.lng}
              onChange={(event) => setCoords((atual) => ({ ...atual, lng: event.target.value }))}
              placeholder="-45.50000"
              aria-invalid={Boolean(locationError)}
              className={inputClass}
            />
          </div>
        </div>
        <FieldError message={locationError} />

        <div className="space-y-2">
          <label htmlFor="placeText" className={labelClass}>
            Referência do local (opcional)
          </label>
          <input
            id="placeText"
            name="placeText"
            type="text"
            maxLength={120}
            defaultValue={values.placeText}
            placeholder="Praia, cidade ou ponto de referência..."
            aria-invalid={Boolean(errors.placeText)}
            className={inputClass}
          />
          <FieldError message={errors.placeText} />
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="description" className={labelClass}>
          Detalhes da situação
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          defaultValue={values.description}
          placeholder="Descreva o que você viu. O animal está ferido? Preso em rede?"
          aria-invalid={Boolean(errors.description)}
          className={`${inputClass} resize-none`}
        />
        <FieldError message={errors.description} />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-xs font-medium text-gray-400 leading-relaxed">
        Seu nome é opcional e não é exibido publicamente. O local exato fica só com a moderação: o
        mapa mostra uma posição aproximada.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-accent text-white px-8 py-5 rounded-2xl font-black tracking-wide hover:bg-accent/90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {pending ? (
          <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5" /> Enviar relato
          </>
        )}
      </button>
    </form>
  )
}
