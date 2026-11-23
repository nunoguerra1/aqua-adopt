'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import type { AnimalFormState } from '@/app/actions/animals'
import { LocationPickerWrapper } from '@/components/sightings/LocationPickerWrapper'
import { parseCoordinate } from '@/lib/coordinates'
import { CONSERVATION_STATUSES, STATUS_INFO } from '@/lib/status'

const inputClass =
  'w-full bg-white/50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all'
const labelClass = 'text-sm font-bold text-ocean-900 ml-2'

interface AnimalFormProps {
  action: (state: AnimalFormState, formData: FormData) => Promise<AnimalFormState>
  submitLabel: string
  initialValues?: Record<string, string>
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm font-medium text-red-600 ml-2">{message}</p>
}

export function AnimalForm({ action, submitLabel, initialValues = {} }: AnimalFormProps) {
  const [state, formAction, pending] = useActionState(action, { status: 'idle' })
  const [coords, setCoords] = useState({
    lat: initialValues.latitude ?? '',
    lng: initialValues.longitude ?? '',
  })

  const values = { ...initialValues, ...state.values }
  const errors = state.fieldErrors ?? {}
  const locationError = errors.latitude ?? errors.longitude
  const markerLat = parseCoordinate(coords.lat, -90, 90)
  const markerLng = parseCoordinate(coords.lng, -180, 180)

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
          <label htmlFor="name" className={labelClass}>
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
          <FieldError message={errors.name} />
        </div>

        <div className="space-y-2">
          <label htmlFor="species" className={labelClass}>
            Espécie
          </label>
          <input
            id="species"
            name="species"
            type="text"
            required
            maxLength={80}
            defaultValue={values.species}
            aria-invalid={Boolean(errors.species)}
            className={inputClass}
          />
          <FieldError message={errors.species} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className={labelClass}>
          Endereço da imagem
        </label>
        <input
          id="image"
          name="image"
          type="url"
          required
          maxLength={500}
          defaultValue={values.image}
          placeholder="https://..."
          aria-invalid={Boolean(errors.image)}
          className={inputClass}
        />
        <FieldError message={errors.image} />
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className={labelClass}>
          Status de conservação
        </label>
        <select
          id="status"
          name="status"
          defaultValue={values.status ?? 'STABLE'}
          className={`${inputClass} text-gray-700`}
        >
          {CONSERVATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_INFO[status].label}
            </option>
          ))}
        </select>
        <FieldError message={errors.status} />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className={labelClass}>
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          defaultValue={values.description}
          aria-invalid={Boolean(errors.description)}
          className={`${inputClass} resize-none`}
        />
        <FieldError message={errors.description} />
      </div>

      <fieldset className="space-y-4">
        <legend className={labelClass}>Posição</legend>
        <LocationPickerWrapper
          latitude={markerLat}
          longitude={markerLng}
          onPick={(latitude, longitude) =>
            setCoords({ lat: latitude.toFixed(5), lng: longitude.toFixed(5) })
          }
        />
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
              aria-invalid={Boolean(locationError)}
              className={inputClass}
            />
          </div>
        </div>
        <FieldError message={locationError} />
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-ocean-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-ocean-800 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {pending ? 'Salvando...' : submitLabel}
        </button>
        <Link
          href="/admin/animais"
          className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}
