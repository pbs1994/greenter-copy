'use client'

import { useState, useTransition } from 'react'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'
import { sendMagicLink } from './actions'

export function LoginForm() {
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await sendMagicLink(formData)
      setResult(res)
    })
  }

  if (result?.ok) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-neutral-700 text-sm">{result.message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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

      {result && !result.ok && (
        <p className="text-sm text-red-600">{result.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {pending ? 'Envoi...' : 'Recevoir le lien de connexion'}
      </button>
    </form>
  )
}
