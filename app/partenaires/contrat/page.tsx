import Link from 'next/link'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { CONTRACT_VERSION } from '@/lib/partenaires-contract'

export const metadata = {
  title: "Contrat d'apporteur d'affaires · Espace Partenaires · Greenter",
  robots: { index: false, follow: false },
}

/**
 * Texte du contrat d'apporteur d'affaires présenté à l'inscription publique
 * (app/partenaires/inscription). C'EST UN SQUELETTE STRUCTUREL, PAS UN TEXTE
 * JURIDIQUEMENT VALIDE — à faire relire et compléter par un avocat avant
 * d'ouvrir réellement l'inscription publique. Voir docs/agent-network-plan.md
 * section 8 : le vrai risque juridique ici (requalification en salariat
 * déguisé, obligations URSSAF) ne se règle pas par du code mais par un
 * contrat en bonne et due forme.
 */
export default function PartenairesContratPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-2xl mx-auto">
        <Link href="/partenaires/inscription" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;inscription
        </Link>

        <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Brouillon interne — non valide juridiquement.</strong> Ce texte est une
            structure de travail, pas un contrat rédigé ou validé par un juriste. Il ne doit
            pas servir de base à un engagement réel tant qu&apos;il n&apos;a pas été relu et
            complété par un avocat.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8">
          <h1 className="font-heading text-2xl font-bold text-neutral-900 mb-1">
            Contrat d&apos;apporteur d&apos;affaires
          </h1>
          <p className="text-xs text-neutral-400 mb-8">Version {CONTRACT_VERSION}</p>

          <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
            <section>
              <h2 className="font-semibold text-neutral-900 mb-1">1. Objet</h2>
              <p>
                Le présent contrat définit les conditions dans lesquelles l&apos;apporteur
                d&apos;affaires (« l&apos;agent ») met en relation des clients potentiels avec
                Greenter en vue de la vente de prestations et produits (pompe à chaleur,
                panneaux solaires, isolation, audit énergétique, maintenance), en contrepartie
                d&apos;une commission versée sur les ventes effectivement conclues.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900 mb-1">2. Statut de l&apos;agent</h2>
              <p>
                L&apos;agent agit en qualité d&apos;indépendant (auto-entrepreneur ou agent
                commercial immatriculé RSAC), sous son propre numéro SIRET. Il ne se trouve
                dans aucun lien de subordination avec Greenter et n&apos;engage Greenter par
                aucun acte au-delà de la mise en relation commerciale.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900 mb-1">3. Commission</h2>
              <p>
                La commission applicable est communiquée à l&apos;agent lors de la validation
                de son compte et figure dans son espace personnel. Elle n&apos;est due que sur
                les ventes conclues et confirmées par Greenter (statut « gagné »), jamais sur
                un simple contact ou devis en cours.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900 mb-1">4. Durée et résiliation</h2>
              <p>
                Le contrat est conclu pour une durée indéterminée à compter de la validation du
                compte par Greenter. Chaque partie peut y mettre fin à tout moment, par écrit,
                sans préavis ni indemnité, sous réserve du règlement des commissions déjà dues
                au titre de ventes conclues avant la résiliation.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900 mb-1">5. Obligations de l&apos;agent</h2>
              <p>
                L&apos;agent s&apos;engage à ne fournir que des informations exactes sur les
                prospects qu&apos;il apporte, à ne pas se présenter comme salarié ou représentant
                légal de Greenter, et à maintenir à jour son immatriculation (SIRET actif)
                pendant toute la durée du contrat.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
