import { requireAdmin } from '@/lib/admin-auth'

export const metadata = {
  title: 'Administration réseau · Espace Partenaires · Greenter',
  robots: { index: false, follow: false },
}

/**
 * Placeholder — Session 3 replaces this with the full agent/deal list,
 * deal closing (gagné/perdu) and network stats. Reuses requireAdmin() from
 * lib/admin-auth.ts as-is: "admin of the partner network" is the same
 * public.admins allow-list as /administrator, not a separate role.
 */
export default async function PartenairesAdminPage() {
  const admin = await requireAdmin()

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8">
        <h1 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
          Réseau partenaires — administration
        </h1>
        <p className="text-sm text-neutral-500 mb-6">Connecté en tant que {admin.email}</p>
        <p className="text-sm text-neutral-600">
          La liste des agents, le suivi des dossiers et la clôture des ventes (gagné/perdu) arrivent dans une prochaine étape.
        </p>
        <form action="/api/auth/logout?next=/partenaires/login" method="post" className="mt-8">
          <button
            type="submit"
            className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-2"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </main>
  )
}
