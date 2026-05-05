'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Loader2, KeyRound, ArrowLeft } from 'lucide-react'
import { sendMagicLink, verifyMagicCode } from './actions'

type Step = 'request' | 'verify'

export function LoginForm() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [step, setStep] = useState<Step>('request')
  const [email, setEmail] = useState('')
  const [info, setInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onRequestSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    const fd = new FormData(e.currentTarget)
    const inputEmail = String(fd.get('email') || '').trim().toLowerCase()

    startTransition(async () => {
      const res = await sendMagicLink(fd)
      if (!res.ok) {
        setError(res.message)
        return
      }
      setEmail(inputEmail)
      setInfo(res.message)
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
      // Session cookie now set — middleware will let us through.
      router.replace('/administrator')
      router.refresh()
    })
  }

  if (step === 'verify') {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => { setStep('request'); setInfo(null); setError(null) }}
          className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900"
        >
          <ArrowLeft className="w-3 h-3" />
          Changer d&apos;email
        </button>

        {info && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-800">
            {info} <span className="block mt-1 font-medium">{email}</span>
          </div>
        )}

        <form onSubmit={onVerifySubmit} className="space-y-3">
          <p className="text-sm text-neutral-700">
            Cliquez sur le lien reçu par email <strong>ou</strong> saisissez le code à 6 chiffres :
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
                pattern="\d{6}"
                maxLength={6}
                autoComplete="one-time-code"
                required
                placeholder="123456"
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
    <form onSubmit={onRequestSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.fr"
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
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
        {pending ? 'Envoi...' : 'Recevoir le lien et le code'}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        Vous recevrez un email avec un lien cliquable et un code à 6 chiffres.
      </p>
    </form>
  )
}
