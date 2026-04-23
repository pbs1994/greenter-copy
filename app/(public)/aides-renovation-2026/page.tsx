import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Info, CheckCircle } from 'lucide-react'
import { SimulateurAides } from '@/components/simulateur-aides/SimulateurAides'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'

export const metadata: Metadata = {
  title: "Simulateur Aides Rénovation Énergétique 2026 | MaPrimeRénov', CEE, Prime EDF | Greenter",
  description:
    "Simulateur officiel des aides 2026 à la rénovation énergétique en Île-de-France. Calcul exact de MaPrimeRénov' (parcours par geste), prime EDF 1 000 €, Coup de pouce CEE ×5, TVA 5,5 %, éco-PTZ. Données du Guide ANAH février 2026.",
  keywords: [
    'simulateur maprimerenov 2026',
    'simulation aides rénovation énergétique',
    'calcul maprimerenov',
    'aide pompe à chaleur 2026',
    "prime rénovation 2026",
    "prime EDF pompe à chaleur",
    'coup de pouce chauffage',
    'aide pompe à chaleur Île-de-France',
    'éco-PTZ 2026',
    'reste à charge PAC',
  ],
  alternates: { canonical: 'https://www.greenter.fr/aides-renovation-2026' },
  openGraph: {
    title: "Simulateur Aides Rénovation Énergétique 2026 | Greenter",
    description:
      "Calculez en 5 étapes toutes vos aides 2026 : MaPrimeRénov', prime EDF 1 000 €, Coup de pouce CEE ×5, TVA 5,5 %, éco-PTZ jusqu'à 50 000 €. Données officielles ANAH/EDF.",
    url: 'https://www.greenter.fr/aides-renovation-2026',
    siteName: 'Greenter',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Simulateur Aides Rénovation Énergétique 2026 | Greenter",
    description:
      "Toutes vos aides 2026 pour pompe à chaleur, solaire, isolation : MaPrimeRénov', EDF, CEE, TVA, éco-PTZ. Calcul avec données officielles ANAH.",
  },
}

const FAQ = [
  {
    question: "Comment ce simulateur calcule-t-il mes aides ?",
    answer:
      "Le simulateur utilise les barèmes officiels 2026 du Guide ANAH « Les aides financières en 2026 » (édition février 2026). Il croise vos données (taille de foyer, revenu fiscal de référence, zone géographique, équipement et coût du devis) avec les plafonds Bleu/Jaune/Violet/Rose, les règles d'écrêtement (90/75/60 %), la prime EDF « Je passe à l'électrique », le Coup de pouce chauffage CEE bonifié ×5, la TVA 5,5 % et l'éco-PTZ.",
  },
  {
    question: "Quel est le revenu fiscal de référence à renseigner ?",
    answer:
      "Pour une demande déposée en 2026, c'est le RFR de l'année N-1, donc le RFR 2024. Il figure sur votre avis d'imposition 2025 (impôts sur les revenus 2024), en première page. Si plusieurs personnes du foyer ont des avis distincts, additionnez les RFR.",
  },
  {
    question: "Pourquoi le montant CEE est-il une « estimation » ?",
    answer:
      "Le Coup de pouce chauffage CEE est un coefficient de bonification (×5) appliqué aux kWh cumac d'une fiche standardisée. Le montant final en € dépend de (1) la zone climatique — Île-de-France = zone H1 — et de la surface de votre logement, (2) du prix de rachat CEE négocié avec l'obligé (TotalEnergies, Engie, Effy, Sonergia…). Notre estimation affiche une fourchette basée sur les données de marché observées en 2025-2026. Le chiffre exact vous sera communiqué par l'obligé CEE lors du devis.",
  },
  {
    question: "La prime EDF 1 000 € est-elle garantie ?",
    answer:
      "Elle est garantie si vous remplissez les conditions : ménage Bleu ou Jaune (modestes), remplacement d'une chaudière gaz ou fioul par une PAC air-eau ou eau-eau (géothermique), devis signé entre le 8 avril 2026 et le 7 avril 2027. EDF a prévu une enveloppe de 240 M€ limitée à 80 000 dossiers — premier arrivé, premier servi. Source : particulier.edf.fr, page « Prime pompe à chaleur ».",
  },
  {
    question: "Quelles aides ne sont PAS dans ce simulateur ?",
    answer:
      "Les aides locales (communes, conseils départementaux, caisses de retraite, Action Logement) ne sont pas intégrées car elles varient selon votre code postal. Consultez mesaides.france-renov.gouv.fr avec votre adresse pour les découvrir. Greenter peut aussi vous aider à monter le dossier.",
  },
  {
    question: "Comment Greenter est-il rémunéré ?",
    answer:
      "Greenter est un installateur RGE QualiPAC indépendant rémunéré uniquement par le coût de l'installation que vous payez (en partie ou totalement couvert par les aides). Nous ne percevons aucune commission sur votre dossier d'aides. Le simulateur est gratuit, sans inscription et sans partage de vos données.",
  },
]

const BREADCRUMBS = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Aides rénovation 2026', url: 'https://www.greenter.fr/aides-renovation-2026' },
]

export default function AidesRenovation2026Page() {
  return (
    <main>
      <BreadcrumbSchema items={BREADCRUMBS} />
      <FAQPageSchema items={FAQ} />

      {/* ---- HERO ---- */}
      <section className="relative bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-4xl px-4 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Shield className="w-3.5 h-3.5" />
            Données officielles ANAH février 2026
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Simulateur des{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
              aides 2026
            </span>{' '}
            pour votre rénovation énergétique
          </h1>
          <p className="text-emerald-100/80 text-lg leading-relaxed max-w-2xl mx-auto">
            MaPrimeRénov&apos;, prime EDF 1 000 €, Coup de pouce CEE ×5, TVA 5,5 %, éco-PTZ jusqu&apos;à
            50 000 €. Calculez votre reste à charge en 5 étapes — résultat détaillé avec sources
            officielles.
          </p>
        </div>
      </section>

      {/* ---- SIMULATEUR ---- */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <SimulateurAides />

          <p className="mt-6 text-xs text-neutral-500 text-center max-w-2xl mx-auto">
            Simulation indicative fondée sur le Guide ANAH « Les aides financières en 2026 » (éd.
            février 2026) et les informations publiées par ecologie.gouv.fr, EDF Particulier et la
            CRE. Seul l&apos;instructeur MaPrimeRénov&apos; (Anah) peut confirmer définitivement votre
            éligibilité et vos montants.
          </p>
        </div>
      </section>

      {/* ---- CONTENU SEO : les 5 aides 2026 ---- */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
            Les 5 aides cumulables en 2026 pour votre rénovation énergétique
          </h2>
          <p className="text-neutral-600 mb-10">
            En 2026, un ménage en Île-de-France peut cumuler jusqu&apos;à 5 dispositifs distincts
            pour financer une pompe à chaleur, un panneau solaire ou une isolation. Voici comment ils
            fonctionnent, avec sources officielles.
          </p>

          <div className="space-y-6">
            <AideBlock
              badge="1"
              title="MaPrimeRénov' — parcours par geste"
              summary="Aide de l'État versée par l'Anah, adaptée pour un seul geste de rénovation."
              details={
                <>
                  <p>
                    Barème 2026 selon la tranche de revenus (Bleu / Jaune / Violet) et le type
                    d&apos;équipement. Les ménages Rose (supérieurs) ne sont pas éligibles en
                    parcours par geste, uniquement en rénovation d&apos;ampleur.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm">
                    <li>• PAC air-eau : 5 000 € / 4 000 € / 3 000 €</li>
                    <li>• PAC géothermique : 11 000 € / 9 000 € / 6 000 €</li>
                    <li>• Isolation combles : 25 / 20 / 15 €/m² (plafond 75 €/m²)</li>
                    <li>• Audit énergétique : 500 / 400 / 300 € (conditionné à un geste)</li>
                  </ul>
                </>
              }
              source="Guide ANAH 2026, p. 10-18"
            />
            <AideBlock
              badge="2"
              title="Prime EDF « Je passe à l'électrique »"
              summary="1 000 € forfaitaires, lancée le 8 avril 2026, limitée à 80 000 dossiers."
              details={
                <p>
                  Réservée aux ménages Bleu et Jaune (modestes), pour un remplacement de chaudière
                  gaz ou fioul par une PAC air-eau ou géothermique. Devis à signer entre le 8 avril
                  2026 et le 7 avril 2027, travaux achevés avant cette dernière date. Cumulable avec
                  MaPrimeRénov&apos; et le Coup de pouce CEE (obligation en réalité : il faut
                  recevoir MPR ou CEE pour y avoir droit).
                </p>
              }
              source="particulier.edf.fr — Prime pompe à chaleur (avril 2026)"
            />
            <AideBlock
              badge="3"
              title="Coup de pouce chauffage CEE"
              summary="Bonification ×5 des Certificats d'Économies d'Énergie pour passer du gaz/fioul à la PAC."
              details={
                <p>
                  Depuis le 1<sup>er</sup> janvier 2026 (arrêté 74
                  <sup>e</sup>, avis CSE du 04/09/2025), les PAC air-eau et eau-eau remplaçant une
                  chaudière gaz, fioul ou charbon bénéficient d&apos;une bonification ×5 sur les
                  kWh cumac. Le montant final dépend de la zone climatique (IdF = zone H1), de la
                  surface chauffée et de l&apos;obligé CEE choisi (TotalEnergies, Engie, Effy,
                  Sonergia…). Cumul autorisé avec MaPrimeRénov&apos; parcours par geste (plafonné à
                  90/75/60 % selon la tranche).
                </p>
              }
              source="ecologie.gouv.fr — Coup de pouce chauffage"
            />
            <AideBlock
              badge="4"
              title="TVA réduite à 5,5 %"
              summary="Sur l'équipement + la pose pour les logements de plus de 2 ans."
              details={
                <p>
                  Taux réduit à 5,5 % pour tous les équipements de rénovation énergétique éligibles
                  (PAC, solaire, isolation, VMC double flux) depuis l&apos;arrêté du 4 décembre
                  2024. À l&apos;inverse, les <strong>chaudières gaz neuves</strong> sont passées
                  à <strong>20 %</strong> (contre 10 % auparavant). Cette aide est intégrée
                  directement dans le prix TTC du devis — l&apos;artisan applique le taux correct.
                </p>
              }
              source="CGI art. 279-0 bis + arrêté du 4 décembre 2024"
            />
            <AideBlock
              badge="5"
              title="Éco-prêt à taux zéro (éco-PTZ)"
              summary="Prêt jusqu'à 50 000 € sans intérêt pour financer le reste à charge."
              details={
                <p>
                  Sans condition de ressources, remboursable sur 20 ans. Plafond de{' '}
                  <strong>15 000 €</strong> pour un monogeste simple, <strong>25 000 €</strong>{' '}
                  pour un bouquet de 2 actions, <strong>30 000 €</strong> pour 3 actions et plus,
                  et <strong>50 000 €</strong> si couplé à MaPrimeRénov&apos;. Attention :
                  l&apos;éco-PTZ ne finance pas les chaudières gaz.
                </p>
              }
              source="CGI art. 244 quater U + Guide ANAH 2026 p. 42-46"
            />
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden group"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-neutral-900 hover:text-emerald-700 transition-colors">
                  {f.question}
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-neutral-600 leading-relaxed">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA bottom ---- */}
      <section className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-900 py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            Votre simulation vous plaît ? Passons au devis concret.
          </h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Greenter monte votre dossier d&apos;aides de A à Z (MaPrimeRénov&apos;, prime EDF, CEE,
            éco-PTZ) et vous remet un devis définitif sous 48 h.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Demander mon devis gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function AideBlock({
  badge,
  title,
  summary,
  details,
  source,
}: {
  badge: string
  title: string
  summary: string
  details: React.ReactNode
  source: string
}) {
  return (
    <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0">
          {badge}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xl text-neutral-900 mb-1">{title}</h3>
          <p className="text-emerald-700 font-semibold text-sm mb-3">{summary}</p>
          <div className="text-neutral-600 text-sm leading-relaxed">{details}</div>
          <p className="text-xs text-neutral-400 mt-3 flex items-center gap-1.5">
            <Info className="w-3 h-3" />
            Source : {source}
          </p>
        </div>
        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
      </div>
    </div>
  )
}
