import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAdminEmail } from '@/lib/admin-auth'
import { getPartenaireUser, getAgentProfile } from '@/lib/partenaires-auth'

export const metadata = {
  title: 'Espace Partenaires · Greenter',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ error?: string }>
}

/**
 * Role router for /partenaires. Not a page anyone should linger on: it
 * figures out whether the signed-in user is a network admin (reuses
 * public.admins, same as /administrator) or an approved agent, and
 * redirects accordingly. Only renders real content when neither applies —
 * i.e. a signed-in user with no role in the partner network yet.
 */
export default async function PartenairesRootPage({ searchParams }: Props) {
  const { error } = await searchParams
  const user = await getPartenaireUser()

  if (!user) redirect('/partenaires/login')

  if (await isAdminEmail(user.email)) {
    redirect('/partenaires/admin')
  }

  const profile = await getAgentProfile(user.id)
  if (profile?.status === 'approved') {
    redirect('/partenaires/dashboard')
  }

  const isPending = profile?.status === 'pending'

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8">
          <h1 className="font-heading text-xl font-bold text-neutral-900 mb-2">
            {isPending ? 'Candidature en cours d’examen' : 'Accès non configuré'}
          </h1>
          <p className="text-sm text-neutral-600 mb-4">
            {isPending
              ? "Votre candidature à l'Espace Partenaires a bien été reçue et est en cours d'examen. Vous recevrez un email dès qu'elle sera traitée."
              : error === 'not_agent'
                ? "Votre compte est connecté, mais aucun profil agent approuvé n'y est associé pour l'instant."
                : "Votre compte n'a pas encore de rôle dans l'espace partenaires."}
          </p>
          {!isPending && (
            <p className="text-sm text-neutral-500">
              Contactez l&apos;administrateur du réseau pour faire activer votre accès.
            </p>
          )}
          <form action="/api/auth/logout?next=/partenaires/login" method="post" className="mt-6">
            <button
              type="submit"
              className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-2"
            >
              Se déconnecter
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-neutral-400 mt-6">
          <Link href="/" className="hover:underline">Retour au site Greenter</Link>
        </p>
      </div>
    </main>
  )
}
