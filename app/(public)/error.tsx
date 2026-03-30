'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Phone, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="font-heading text-xl font-bold text-neutral-900 mb-3">
          Une erreur est survenue
        </h1>
        <p className="text-neutral-600 text-sm mb-6">
          Nous rencontrons un problème technique. Veuillez réessayer ou nous contacter si le problème persiste.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm py-2.5 px-5 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-900 font-medium text-sm py-2.5 px-5 rounded-lg ring-1 ring-neutral-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Accueil
          </Link>
        </div>
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <p className="text-neutral-500 text-xs mb-2">Besoin d'aide ?</p>
          <a href="tel:+33609455056" className="inline-flex items-center gap-2 text-green-700 font-medium text-sm hover:text-green-800">
            <Phone className="w-4 h-4" />
            06 09 45 50 56
          </a>
        </div>
      </div>
    </main>
  )
}
