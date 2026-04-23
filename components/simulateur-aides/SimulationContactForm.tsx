'use client'

import { useState } from 'react'
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react'
import type { Equipement, SimulationResult, ZoneRevenu, ChauffageActuel } from '@/lib/maprimerenov-2026'

export interface SimulationContext {
  foyer: { personnes: number; zone: ZoneRevenu }
  revenuFiscal: number
  chauffageActuel: ChauffageActuel
  surfaceLogementM2: number
  equipements: Array<{ equipement: Equipement; coutTTC: number; surfaceM2?: number }>
  result: SimulationResult
}

interface Props {
  context: SimulationContext
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function SimulationContactForm({ context }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/simulation/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: { name, email, phone, address, message },
          simulation: {
            foyer: context.foyer,
            revenuFiscal: context.revenuFiscal,
            chauffageActuel: context.chauffageActuel,
            surfaceLogementM2: context.surfaceLogementM2,
            equipements: context.equipements,
          },
          result: context.result,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue")
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-6 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600 flex items-center justify-center mb-4">
          <Check className="w-7 h-7 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">Demande envoyée !</h3>
        <p className="text-sm text-emerald-800 max-w-md mx-auto">
          Merci {name.split(' ')[0]}. Nous avons bien reçu votre simulation — un technicien RGE
          QualiPAC vous contactera sous <strong>48 h ouvrées</strong> pour organiser une visite
          technique gratuite et affiner votre devis.
        </p>
        <p className="text-xs text-emerald-700 mt-3">
          Un email de confirmation a été envoyé à <strong>{email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white border-2 border-emerald-100 p-5 md:p-6 shadow-sm">
      <h4 className="font-bold text-lg text-neutral-900 mb-1">
        Recevez un devis détaillé avec cette simulation
      </h4>
      <p className="text-sm text-neutral-500 mb-5">
        Un technicien RGE QualiPAC vous rappelle sous 48 h avec votre dossier d&apos;aides chiffré.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Prénom Nom"
            className="w-full px-3 py-2.5 text-sm border-2 border-neutral-200 rounded-lg focus:border-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="06 12 34 56 78"
            className="w-full px-3 py-2.5 text-sm border-2 border-neutral-200 rounded-lg focus:border-emerald-500 outline-none"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@email.fr"
          className="w-full px-3 py-2.5 text-sm border-2 border-neutral-200 rounded-lg focus:border-emerald-500 outline-none"
        />
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
          Adresse du projet (ville + code postal)
        </label>
        <input
          type="text"
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="12 rue des Lilas, 77330 Ozoir-la-Ferrière"
          className="w-full px-3 py-2.5 text-sm border-2 border-neutral-200 rounded-lg focus:border-emerald-500 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
          Informations complémentaires (facultatif)
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type de logement, état actuel du chauffage, délais envisagés…"
          className="w-full px-3 py-2.5 text-sm border-2 border-neutral-200 rounded-lg focus:border-emerald-500 outline-none resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="mb-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-300 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/30"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Envoyer ma demande avec ma simulation
          </>
        )}
      </button>

      <p className="text-[11px] text-neutral-400 text-center mt-3">
        En envoyant, vous acceptez d&apos;être recontacté par Greenter au sujet de votre projet.
        Aucune donnée n&apos;est transmise à un tiers.
      </p>
    </form>
  )
}
