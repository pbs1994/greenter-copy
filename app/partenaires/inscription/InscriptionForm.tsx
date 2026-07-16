'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Phone, Hash, Loader2, KeyRound, ArrowLeft } from 'lucide-react'
import { verifyMagicCode } from '../login/actions'

type Step = 'form' | 'verify'

/**
 * Inscription publique — étape 1 (ce formulaire) POST vers
 * app/api/partenaires-inscription/route.ts (Route Handler, pas de Server
 * Action ici : voir le commentaire en tête de ce fichier route pour le
 * pourquoi). Étape 2 réutilise verifyMagicCode() du login — une fois le
 * SIRET vérifié et le compte créé côté serveur, la vérification du
 * code/lien OTP est exactement la même opération que pour une connexion.
 */
export function InscriptionForm() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [info, setInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    const fd = new FormData(e.currentTarget)
    const inputEmail = String(fd.get('email') || '').trim().toLowerCase()

    startTransition(async () => {
      const res = await fetch('/api/partenaires-inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fd.get('full_name'),
          email: inputEmail,
          phone: fd.get('phone'),
          siret: fd.get('siret'),
          contract_accepted: fd.get('contract_accepted') === 'on',
          website: fd.get('website'), // honeypot
        }),
      })
      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(data.message || 'Une erreur est survenue.')
        return
      }

      setEmail(inputEmail)
      setInfo(data.message)
      setStep('verify')
    })
  }

  function onVerifySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    fd.set('email', email)

    startTransition(async () => {
      const res = await verifyMagicCode(fd)
      if (!res.ok) {
        setError(res.message || 'Erreur')
        return
      }
      router.replace('/partenaires')
      router.refresh()
    })
  }

  if (step === 'verify') {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => { setStep('form'); setInfo(null); setError(null) }}
          className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900"
        >
          <ArrowLeft className="w-3 h-3" />
          Modifier ma candidature
        </button>

        {info && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-800">
            {info} <span className="block mt-1 font-medium">{email}</span>
          </div>
        )}

        <form onSubmit={onVerifySubmit} className="space-y-3">
          <p className="text-sm text-neutral-700">
            Cliquez sur le lien reçu par email <strong>ou</strong> saisissez le code de vérification :
          </p>

          <div>
            <label htmlFor="token" className="block text-sm font-medium text-neutral-700 mb-2">
              Code de vérification
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="token"
                type="text"
                name="token"
                inputMode="numeric"
                pattern="\d{4,10}"
                maxLength={10}
                autoComplete="one-time-code"
                required
                placeholder="Code reçu par email"
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-center font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {pending ? 'Vérification...' : 'Valider le code'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <form onSubmit={onFormSubmit} className="space-y-4">
      {/* Honeypot — invisible pour un humain, un bot de formulaire le remplit
          souvent aveuglément. Vérifié côté serveur dans le Route Handler. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-neutral-700 mb-2">
          Nom complet
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="full_name" type="text" name="full_name" required autoComplete="name"
            placeholder="Jean Dupont"
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="email" type="email" name="email" required autoComplete="email"
            placeholder="vous@exemple.fr"
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
          Téléphone
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="phone" type="tel" name="phone" required autoComplete="tel"
            placeholder="06 12 34 56 78"
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="siret" className="block text-sm font-medium text-neutral-700 mb-2">
          SIRET
        </label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="siret" type="text" name="siret" required inputMode="numeric" pattern="\d{14}" maxLength={14}
            placeholder="14 chiffres"
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
        <p className="text-xs text-neutral-400 mt-1.5">
          Vérifié automatiquement auprès du registre officiel des entreprises.
        </p>
      </div>

      <label className="flex items-start gap-2.5 text-sm text-neutral-700">
        <input
          type="checkbox" name="contract_accepted" required
          className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-green-700 focus:ring-green-600"
        />
        <span>
          J&apos;accepte le{' '}
          <Link href="/partenaires/contrat" target="_blank" className="text-green-700 underline underline-offset-2 hover:text-green-800">
            contrat d&apos;apporteur d&apos;affaires
          </Link>
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {pending ? 'Envoi...' : 'Envoyer ma candidature'}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        Votre candidature sera examinée par notre équipe après vérification de votre SIRET.
      </p>
    </form>
  )
}
