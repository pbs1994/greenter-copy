import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export const metadata = {
  title: 'Connexion administrateur · Greenter',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ error?: string; next?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-neutral-900">
              Espace administrateur
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Recevez un lien de connexion par email
            </p>
          </div>

          {error === 'not_authorized' && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              Cette adresse n&apos;est pas autorisée à accéder à l&apos;espace administrateur.
            </div>
          )}
          {error === 'exchange_failed' && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              Lien de connexion invalide ou expiré. Demandez-en un nouveau.
            </div>
          )}
          {error === 'missing_code' && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              Lien incomplet. Cliquez sur le lien le plus récent reçu par email.
            </div>
          )}

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
        <p className="text-center text-xs text-neutral-400 mt-6">
          Greenter · accès réservé
        </p>
      </div>
    </main>
  )
}
