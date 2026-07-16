import { Suspense } from 'react'
import Link from 'next/link'
import { InscriptionForm } from './InscriptionForm'

export const metadata = {
  title: 'Devenir partenaire · Espace Partenaires · Greenter',
  robots: { index: false, follow: false },
}

export default function PartenairesInscriptionPage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-neutral-900">
              Devenir partenaire Greenter
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Rejoignez le réseau d&apos;apporteurs d&apos;affaires
            </p>
          </div>

          <Suspense>
            <InscriptionForm />
          </Suspense>
        </div>
        <p className="text-center text-xs text-neutral-400 mt-6">
          Déjà partenaire ?{' '}
          <Link href="/partenaires/login" className="text-neutral-500 hover:text-neutral-900 underline underline-offset-2">
            Connectez-vous
          </Link>
        </p>
      </div>
    </main>
  )
}
