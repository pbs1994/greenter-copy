import { requireAgent } from '@/lib/partenaires-auth'

export const metadata = {
  title: 'Tableau de bord · Espace Partenaires · Greenter',
  robots: { index: false, follow: false },
}

/**
 * Placeholder — Session 2 replaces this with the deal kanban
 * (nouveau → contacté → devis_envoyé → gagné/perdu), the manual lead form
 * and per-deal notes/history. The auth gate below is already final.
 */
export default async function PartenairesDashboardPage() {
  const agent = await requireAgent()

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8">
        <h1 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
          Bienvenue{agent.full_name ? `, ${agent.full_name}` : ''}
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          Votre code partenaire : <span className="font-mono font-semibold text-neutral-700">{agent.referral_code}</span>
        </p>
        <p className="text-sm text-neutral-600">
          Le tableau de bord (suivi des dossiers, ajout d&apos;un lead, commissions) arrive dans une prochaine étape.
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
