'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Snowflake, Layers, Leaf } from 'lucide-react';
import {
  ReadingProgressBar,
  ArticleHeader,
  ArticleSection,
  PullQuote,
  InfographicBlock,
  SidebarCTA,
  SourceCitation,
  SourcesSection,
  FinalContactBox,
} from '@/components/editorial';
import {
  ISOLATION_MATERIAUX,
  PLAFONDS_IDF_2026,
  PLAFONDS_HORS_IDF_2026,
  ISOLATION_STEPS,
  OFFICIAL_SOURCES_ISOLATION,
  ISOLATION_READING_TIME,
  ISOLATION_LAST_UPDATED,
  ISOLATION_FAQS,
} from '@/lib/isolation-editorial-data';
import { CITIES } from '@/lib/local-seo-data';

// ============================================================================
// Constants
// ============================================================================

const PHONE_NUMBER = '07 66 97 50 99';

// ============================================================================
// FAQ Section Component (internal)
// ============================================================================

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3" data-testid="faq-accordion">
      {ISOLATION_FAQS.map((faq, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-[32rem]' : 'max-h-0'
            }`}
          >
            <p className="px-5 pb-5 text-slate-600 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Materials comparison block (internal, specific to isolation)
// ============================================================================

function MateriauxComparison() {
  const familleColors: Record<string, string> = {
    'Minéral': 'bg-sky-100 text-sky-700',
    'Biosourcé': 'bg-emerald-100 text-emerald-700',
    'Synthétique': 'bg-amber-100 text-amber-700',
  };

  const familleIcons: Record<string, React.ReactNode> = {
    'Minéral': <Snowflake className="w-4 h-4" />,
    'Biosourcé': <Leaf className="w-4 h-4" />,
    'Synthétique': <Layers className="w-4 h-4" />,
  };

  return (
    <div
      className="bg-slate-50 rounded-2xl p-6 md:p-8 my-8"
      data-testid="materiaux-comparison"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {ISOLATION_MATERIAUX.map((mat) => (
          <div
            key={mat.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{mat.nom}</h3>
                <p className="text-sm text-slate-500 mt-1">{mat.lambda}</p>
              </div>
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${familleColors[mat.famille]}`}
              >
                {familleIcons[mat.famille]}
                {mat.famille}
              </span>
            </div>

            <div className="mb-4 pb-4 border-b border-slate-100">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                Épaisseur pour R = 7 m².K/W
              </p>
              <p className="text-2xl font-bold text-slate-900">{mat.rPour7}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                Atouts
              </p>
              <ul className="space-y-1">
                {mat.atouts.map((atout, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {atout}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-xs text-slate-400 italic">
              Idéal pour : {mat.ideal}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600 italic">
          Les cinq principaux matériaux isolants certifiés ACERMI utilisés en 2026
        </p>
        <p className="text-xs text-slate-400 mt-1">Source : CSTB, ADEME, fiches ACERMI</p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * IsolationEditorialContent - Composant éditorial principal de la page
 * "Isolation à 1€".
 *
 * Structure:
 * - ArticleHeader
 * - Introduction (mythe vs réalité)
 * - Zones de déperdition (InfographicBlock stats)
 * - SidebarCTA #1
 * - Aides 2026 détaillées (InfographicBlock table)
 * - Plafonds de ressources Anah 2026 (deux InfographicBlock table)
 * - Exemple chiffré
 * - SidebarCTA #2
 * - Matériaux isolants (MateriauxComparison)
 * - Processus en 5 étapes (InfographicBlock timeline)
 * - Impact énergétique et environnemental (InfographicBlock stats)
 * - FAQ
 * - Zone d'intervention
 * - Sources officielles
 * - FinalContactBox
 */
export function IsolationEditorialContent() {
  return (
    <article
      className="bg-white"
      data-testid="isolation-editorial-content"
    >
      <ReadingProgressBar />

      <div className="max-w-4xl mx-auto">
        <div className="px-4 pt-12 pb-8">
          <ArticleHeader
            readingTime={ISOLATION_READING_TIME}
            lastUpdated={ISOLATION_LAST_UPDATED}
          />
        </div>

        {/* ================================================================ */}
        {/* SECTION: Introduction */}
        {/* ================================================================ */}
        <ArticleSection id="introduction" title="Isolation à 1€ en 2026 : le vrai du faux">
          <p>
            Vous avez sûrement déjà vu passer des publicités promettant une <strong>isolation des combles à 1 euro</strong>.
            Ce dispositif a bel et bien existé : il s'appelait le <strong>« Coup de Pouce Isolation »</strong> et permettait,
            entre 2019 et 2021, d'isoler ses combles perdus pour un euro symbolique. Il a été{' '}
            <strong>officiellement arrêté le 1er juillet 2021</strong> par le gouvernement français, suite à de nombreuses
            fraudes, malfaçons et plaintes de consommateurs.
          </p>

          <PullQuote
            quote="En 2026, l'isolation à 1€ historique n'existe plus. Mais grâce au cumul des aides renforcées, le reste à charge peut encore descendre à quelques euros pour les ménages très modestes."
            source="ADEME, guide rénovation 2026"
            variant="highlight"
          />

          <p>
            Bonne nouvelle cependant : en 2026, grâce au <strong>cumul de MaPrimeRénov' Bleu/Jaune</strong>, de la{' '}
            <strong>Prime CEE bonifiée « Grands Précaires »</strong> et de l'<strong>Éco-PTZ</strong>, les ménages
            très modestes peuvent toujours financer la quasi-totalité de leurs travaux d'isolation des combles perdus
            et planchers bas. Le reste à charge minimum atteint parfois 1 euro symbolique — d'où l'appellation qui
            perdure, même si le dispositif a changé.
          </p>

          <p>
            Dans ce guide complet, nous vous expliquons en toute transparence comment fonctionnent les aides 2026,
            les <strong>plafonds de ressources Anah</strong> revalorisés au 1er janvier 2026, les zones les plus
            rentables à isoler et comment éviter les arnaques qui pullulent encore dans ce secteur. Pour une approche
            globale de votre rénovation, découvrez également nos solutions de{' '}
            <Link
              href="/services/pompe-a-chaleur"
              className="text-orange-600 hover:text-orange-700 underline underline-offset-2"
            >
              pompe à chaleur
            </Link>{' '}
            et d'
            <Link
              href="/services/panneaux-solaires"
              className="text-orange-600 hover:text-orange-700 underline underline-offset-2"
            >
              énergie solaire
            </Link>
            .
          </p>

          <SourceCitation
            source="ADEME"
            url="https://librairie.ademe.fr/urbanisme-et-batiment/4972-isolation-thermique.html"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Zones de déperdition */}
        {/* ================================================================ */}
        <ArticleSection id="zones-deperdition" title="Où fuient les calories de votre maison ?">
          <p>
            Avant d'investir dans l'isolation, il faut comprendre <strong>par où s'échappe la chaleur</strong>.
            L'ADEME a réalisé de nombreuses mesures thermographiques sur des maisons françaises non isolées :
            les résultats sont sans appel.
          </p>

          <InfographicBlock
            type="stats"
            data={{
              stats: [
                { value: '25-30 %', label: 'Toiture & combles', description: 'La chaleur monte — priorité n°1' },
                { value: '20-25 %', label: 'Murs', description: 'Ponts thermiques et parois froides' },
                { value: '10-15 %', label: 'Fenêtres', description: 'Simple vitrage et menuiseries anciennes' },
              ],
            }}
            caption="Répartition moyenne des déperditions thermiques dans une maison non isolée"
            source="ADEME, 2026"
          />

          <p>
            La <strong>toiture représente à elle seule jusqu'à 30 % des pertes</strong>. C'est donc logiquement
            le chantier le plus rentable : un investissement amorti en 3 à 5 ans grâce aux économies de chauffage.
            Les <strong>planchers bas</strong> (sur vide sanitaire, cave ou garage non chauffé) sont responsables
            de 7 à 10 % supplémentaires — un poste souvent oublié mais crucial pour le confort en hiver.
          </p>

          <PullQuote
            quote="Isoler en priorité la toiture, c'est diviser par deux la facture de chauffage d'une maison mal isolée."
            variant="stat"
          />

          <p>
            C'est précisément pour ces deux zones — <strong>combles perdus et planchers bas</strong> — que les
            aides 2026 sont les plus généreuses. Le législateur encourage clairement les ménages à commencer par
            ces travaux « gestes prioritaires », qui offrent le meilleur rapport coût/économie d'énergie.
          </p>

          <SourceCitation
            source="ADEME — Guide pratique de l'isolation"
            url="https://librairie.ademe.fr/urbanisme-et-batiment/4972-isolation-thermique.html"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SIDEBAR CTA #1 */}
        {/* ================================================================ */}
        <div className="px-4">
          <SidebarCTA
            title="Combien coûteraient vos travaux après aides ?"
            description="Nos conseillers calculent gratuitement votre reste à charge exact selon votre catégorie MaPrimeRénov'."
            phone={PHONE_NUMBER}
            variant="subtle"
          />
        </div>

        {/* ================================================================ */}
        {/* SECTION: Aides 2026 */}
        {/* ================================================================ */}
        <ArticleSection id="aides-2026" title="Les 4 aides cumulables en 2026">
          <p>
            En 2026, quatre dispositifs principaux peuvent être mobilisés simultanément pour financer vos travaux
            d'isolation. Le cumul de ces aides permet, pour les ménages très modestes (catégorie Bleu), de réduire
            le reste à charge à quasiment zéro sur les combles perdus.
          </p>

          <InfographicBlock
            type="table"
            data={{
              headers: ['Aide', 'Montant maximum', 'Conditions'],
              rows: [
                {
                  cells: ["MaPrimeRénov' — Parcours par Geste", "Jusqu'à 25 €/m²", 'Catégorie Bleu, RGE obligatoire'],
                  highlight: true,
                },
                {
                  cells: ['Prime CEE bonifiée « Grands Précaires »', "Jusqu'à 10,54 €/m²", 'Combles perdus, revenus très modestes'],
                  highlight: true,
                },
                {
                  cells: ['Éco-PTZ', "Jusqu'à 50 000 €", 'Prêt à taux zéro, sans condition de revenus'],
                },
                {
                  cells: ['TVA réduite', '5,5 %', 'Automatique avec artisan RGE'],
                },
              ],
            }}
            caption="Cumul des aides disponibles pour l'isolation des combles et planchers en 2026"
            source="Anah, France Rénov', mars 2026"
          />

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            MaPrimeRénov' Parcours par Geste
          </h3>
          <p>
            C'est l'aide centrale pour l'isolation. Son montant dépend de votre{' '}
            <strong>catégorie de revenus Anah</strong> : Bleu (très modestes), Jaune (modestes), Violet (intermédiaires)
            ou Rose (supérieurs). Les catégories Bleu et Jaune bénéficient des forfaits les plus élevés, notamment sur
            l'isolation des combles perdus et des planchers bas. Attention : à partir de 2027, les logements classés
            DPE F ou G n'auront plus accès au parcours par geste — anticipez vos travaux dès maintenant.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Prime CEE bonifiée « Grands Précaires »
          </h3>
          <p>
            Les Certificats d'Économies d'Énergie (CEE) sont versés par les fournisseurs d'énergie (TotalEnergies, EDF,
            Engie…) à qui l'État impose des obligations d'économies d'énergie. La bonification{' '}
            <strong>« Grands Précaires »</strong> s'applique aux ménages très modestes et renforce la prime jusqu'à
            <strong> 10,54 €/m² pour les combles</strong> et 6,80 €/m² pour les planchers bas. Chez Greenter, nous
            contractualisons directement avec le fournisseur CEE : la prime est déduite automatiquement de votre devis.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Éco-PTZ pour financer le reste à charge
          </h3>
          <p>
            L'Éco-Prêt à Taux Zéro permet de financer jusqu'à <strong>50 000 €</strong> de travaux de rénovation
            énergétique, remboursables sur 20 ans sans intérêts. Il est accessible <strong>sans condition de revenus</strong>{' '}
            et cumulable avec MaPrimeRénov'. Idéal pour couvrir le reste à charge après déduction des autres aides,
            sans toucher à votre trésorerie.
          </p>

          <SourceCitation
            source="France Rénov'"
            url="https://france-renov.gouv.fr/aides"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Plafonds Anah 2026 */}
        {/* ================================================================ */}
        <ArticleSection id="plafonds" title="Plafonds de ressources Anah 2026">
          <p>
            Votre <strong>catégorie MaPrimeRénov'</strong> dépend de votre revenu fiscal de référence et du nombre
            de personnes dans le foyer. L'arrêté Anah publié au bulletin officiel du 25 décembre 2025 a revalorisé
            ces plafonds de <strong>+1,105 %</strong> par rapport à 2025. Les plafonds diffèrent selon que vous
            résidez en Île-de-France ou ailleurs.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Île-de-France (zones tendues)
          </h3>

          <InfographicBlock
            type="table"
            data={{
              headers: ['Personnes', 'Bleu (très modeste)', 'Jaune (modeste)', 'Violet (intermédiaire)'],
              rows: PLAFONDS_IDF_2026.map((p) => ({
                cells: [
                  String(p.personnes),
                  `${p.tresModeste.toLocaleString('fr-FR')} €`,
                  `${p.modeste.toLocaleString('fr-FR')} €`,
                  `${p.intermediaire.toLocaleString('fr-FR')} €`,
                ],
                highlight: p.personnes <= 2,
              })),
            }}
            caption="Revenu fiscal de référence N-1 ou N-2 — Île-de-France 2026"
            source="Arrêté Anah, bulletin officiel 25/12/2025"
          />

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Hors Île-de-France
          </h3>

          <InfographicBlock
            type="table"
            data={{
              headers: ['Personnes', 'Bleu (très modeste)', 'Jaune (modeste)', 'Violet (intermédiaire)'],
              rows: PLAFONDS_HORS_IDF_2026.map((p) => ({
                cells: [
                  String(p.personnes),
                  `${p.tresModeste.toLocaleString('fr-FR')} €`,
                  `${p.modeste.toLocaleString('fr-FR')} €`,
                  `${p.intermediaire.toLocaleString('fr-FR')} €`,
                ],
                highlight: p.personnes <= 2,
              })),
            }}
            caption="Revenu fiscal de référence N-1 ou N-2 — hors Île-de-France 2026"
            source="Arrêté Anah, bulletin officiel 25/12/2025"
          />

          <p className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <strong>Bon à savoir :</strong> l'Anah retient automatiquement le revenu fiscal le plus favorable
            entre l'année N-1 et N-2. Si vous avez eu une baisse de revenus récente, ce mécanisme peut vous faire
            basculer dans une catégorie plus avantageuse.
          </p>

          <SourceCitation
            source="Anah — Plafonds de ressources 2026"
            url="https://www.anah.gouv.fr/proprietaires/proprietaires-occupants/les-conditions-de-ressources"
            date="janvier 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Exemple chiffré */}
        {/* ================================================================ */}
        <ArticleSection id="exemple" title="Exemple concret : 100 m² de combles perdus">
          <p>
            Prenons un cas réel : une famille de 3 personnes en Seine-et-Marne, catégorie <strong>Bleu</strong>{' '}
            (revenus très modestes), souhaite isoler <strong>100 m² de combles perdus</strong> dans une maison
            construite en 1985. Voici le calcul détaillé du reste à charge.
          </p>

          <InfographicBlock
            type="table"
            data={{
              headers: ['Poste', 'Montant', 'Détail'],
              rows: [
                {
                  cells: ['Devis TTC (TVA 5,5 %)', '2 400 €', '24 €/m² × 100 m², fourniture + pose'],
                },
                {
                  cells: ["MaPrimeRénov' Bleu", '- 2 500 €', "25 €/m² × 100 m²"],
                  highlight: true,
                },
                {
                  cells: ['Prime CEE bonifiée', '- 1 054 €', '10,54 €/m² × 100 m²'],
                  highlight: true,
                },
                {
                  cells: ['Reste à charge client', '1 €', 'Symbolique — travaux quasi-gratuits'],
                  highlight: true,
                },
              ],
            }}
            caption="Simulation 2026 — famille de 3 personnes, catégorie Bleu, 100 m² de combles perdus"
            source="Calcul Greenter sur base MaPrimeRénov' + CEE 2026"
          />

          <PullQuote
            quote="Pour les ménages très modestes, isoler 100 m² de combles perdus coûte aujourd'hui moins cher qu'un plein d'essence."
            variant="stat"
          />

          <p>
            Ce cas reste <strong>conditionné au profil du ménage</strong>. Pour les catégories Jaune (modestes),
            Violet (intermédiaires) ou Rose (supérieurs), le reste à charge augmente, mais les travaux restent
            très rentables : les économies de chauffage (jusqu'à 600 €/an pour 100 m² de combles) amortissent
            les travaux en 3 à 5 ans.
          </p>

          <p className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl text-orange-900">
            <strong>Important :</strong> ce calcul est indicatif. Les montants réels dépendent du devis validé,
            de la zone climatique, du fournisseur CEE partenaire et de l'état de votre logement. Contactez-nous
            pour une estimation gratuite personnalisée.
          </p>
        </ArticleSection>

        {/* ================================================================ */}
        {/* SIDEBAR CTA #2 */}
        {/* ================================================================ */}
        <div className="px-4">
          <SidebarCTA
            title="Simulation gratuite et sans engagement"
            description="Visite technique gratuite sous 48h en Seine-et-Marne. Devis détaillé avec aides déjà déduites."
            phone={PHONE_NUMBER}
            variant="editorial"
          />
        </div>

        {/* ================================================================ */}
        {/* SECTION: Matériaux */}
        {/* ================================================================ */}
        <ArticleSection id="materiaux" title="Les matériaux isolants certifiés 2026">
          <p>
            Le choix du <strong>matériau isolant</strong> dépend de trois critères : la performance thermique
            (coefficient lambda λ), le type de support (combles, rampants, planchers, murs) et vos préférences
            (écologique, économique, performance feu/acoustique). Tous les matériaux listés ci-dessous sont{' '}
            <strong>certifiés ACERMI</strong>, la certification obligatoire pour bénéficier des aides MaPrimeRénov'
            et CEE.
          </p>

          <MateriauxComparison />

          <p>
            Pour les <strong>combles perdus</strong>, la laine de verre soufflée reste le choix le plus économique
            et performant. Pour les <strong>rampants de toiture</strong> (combles aménagés), la fibre de bois est
            privilégiée pour son déphasage thermique exceptionnel qui améliore le confort d'été — un argument de
            plus en plus important avec les canicules estivales.
          </p>

          <PullQuote
            quote="Un bon isolant ne sert pas qu'à garder la chaleur en hiver — il empêche aussi la surchauffe en été."
            source="CSTB, 2025"
            variant="default"
          />

          <p>
            Pour les <strong>planchers bas sur vide sanitaire ou cave</strong>, le polyuréthane projeté permet
            d'atteindre une très forte performance thermique avec une épaisseur réduite (180 à 200 mm pour R = 7),
            idéal quand la hauteur sous plafond est limitée. La laine de roche reste cependant plus écologique et
            recyclable.
          </p>

          <SourceCitation
            source="CSTB — fiches ACERMI"
            url="https://www.cstb.fr/"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Processus en 5 étapes */}
        {/* ================================================================ */}
        <ArticleSection id="processus" title="Le processus Greenter en 5 étapes">
          <p>
            De votre premier appel à la réception des aides, voici le déroulé complet de votre projet d'isolation
            avec Greenter. <strong>Nous gérons toutes les démarches administratives</strong> : vous signez, nous
            nous occupons du reste.
          </p>

          <InfographicBlock
            type="timeline"
            data={{ steps: ISOLATION_STEPS }}
            caption="De l'éligibilité au versement des aides — 5 étapes, zéro tracas"
          />

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Points de contrôle techniques obligatoires
          </h3>
          <p>
            Lors du chantier, plusieurs points techniques sont vérifiés pour garantir l'éligibilité aux aides :
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mt-4">
            <li><strong>Résistance thermique R ≥ 7 m².K/W</strong> pour les combles perdus</li>
            <li>Pose d'un <strong>pare-vapeur</strong> continu pour éviter la condensation</li>
            <li>Installation de <strong>déflecteurs</strong> en sous-toiture pour préserver la ventilation</li>
            <li><strong>Rehausse de la trappe d'accès</strong> aux combles et protection des spots encastrés</li>
            <li>Pose de <strong>piges témoin d'épaisseur</strong> pour contrôler la hauteur finale d'isolant</li>
            <li>Vérification finale au <strong>caméra thermique</strong> pour détecter les ponts thermiques</li>
          </ul>

          <p className="mt-6">
            Nous proposons également des{' '}
            <Link href="/services/maintenance" className="text-orange-600 hover:text-orange-700 underline underline-offset-2">
              contrats de maintenance
            </Link>{' '}
            pour entretenir vos équipements énergétiques après travaux — idéal si vous combinez l'isolation avec
            une pompe à chaleur ou une installation solaire.
          </p>

          <SourceCitation
            source="France Rénov' — Règles techniques CEE"
            url="https://france-renov.gouv.fr/"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Impact énergétique et environnemental */}
        {/* ================================================================ */}
        <ArticleSection id="impact" title="Impact énergétique et environnemental">
          <p>
            Au-delà des aides financières, isoler son logement est <strong>le premier geste écologique</strong>{' '}
            qu'un propriétaire puisse faire. Selon l'ADEME, le secteur du bâtiment représente près de{' '}
            <strong>44 % de la consommation d'énergie finale</strong> en France et 25 % des émissions de CO₂.
            Isoler, c'est agir directement sur cette empreinte.
          </p>

          <InfographicBlock
            type="stats"
            data={{
              stats: [
                { value: '30 %', label: "d'économies", description: 'Sur la facture de chauffage' },
                { value: '600 €', label: 'par an', description: 'Pour 100 m² de combles isolés' },
                { value: '2 t', label: 'CO₂ évitées', description: 'Par an pour une maison type' },
              ],
            }}
            caption="Impact moyen de l'isolation des combles perdus sur une maison de 100 m²"
            source="ADEME, 2026"
          />

          <PullQuote
            quote="Isoler ses combles, c'est supprimer en quelques heures l'équivalent des émissions CO₂ de deux allers-retours Paris-Marseille en voiture, chaque année."
            source="ADEME, mars 2026"
            variant="highlight"
          />

          <p>
            L'investissement initial est rapidement amorti : pour une famille modeste bénéficiant des aides maximales,
            le retour sur investissement est <strong>immédiat</strong> (reste à charge quasi-nul). Pour les ménages
            intermédiaires ou supérieurs, l'amortissement se fait en 3 à 5 ans grâce aux économies de chauffage.
            Une maison bien isolée gagne également en valeur sur le marché immobilier, avec un{' '}
            <strong>meilleur DPE</strong> qui devient un critère de plus en plus déterminant pour les acheteurs.
          </p>

          <p>
            Pour maximiser l'impact environnemental, nous recommandons de coupler l'isolation à d'autres travaux :
            installation d'une{' '}
            <Link href="/services/pompe-a-chaleur" className="text-orange-600 hover:text-orange-700 underline underline-offset-2">
              pompe à chaleur
            </Link>
            , pose de{' '}
            <Link href="/services/panneaux-solaires" className="text-orange-600 hover:text-orange-700 underline underline-offset-2">
              panneaux solaires
            </Link>
            , ou un{' '}
            <Link href="/services/audit" className="text-orange-600 hover:text-orange-700 underline underline-offset-2">
              audit énergétique complet
            </Link>
            . Le <strong>parcours accompagné MaPrimeRénov'</strong> subventionne jusqu'à 90 % du coût d'un bouquet
            de travaux cohérent.
          </p>

          <SourceCitation
            source="ADEME — Chiffres clés du bâtiment"
            url="https://www.ademe.fr/expertises/batiment/chiffres-cles-observations/chiffres-cles"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: FAQ */}
        {/* ================================================================ */}
        <ArticleSection id="faq" title="Questions fréquentes">
          <FAQAccordion />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Zone d'intervention */}
        {/* ================================================================ */}
        <div className="px-4 py-12">
          <div
            className="bg-slate-50 rounded-2xl p-6 md:p-8"
            data-testid="service-area-section"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4 font-editorial-serif">
              Notre zone d'intervention
            </h2>
            <p className="text-slate-600 mb-4">
              Basés à <strong>Ozoir-la-Ferrière</strong>, nous intervenons dans tout le département de la{' '}
              <strong>Seine-et-Marne (77)</strong> et les communes limitrophes d'<strong>Île-de-France</strong>{' '}
              pour vos travaux d'isolation des combles et planchers bas.
            </p>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <span
                  key={city.slug}
                  className="inline-block bg-white border border-slate-200 rounded-full px-3 py-1 text-sm text-slate-600"
                >
                  {city.name}
                </span>
              ))}
              <span className="inline-block bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-sm text-orange-700">
                + communes environnantes
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION: Sources */}
        {/* ================================================================ */}
        <div className="px-4">
          <SourcesSection
            sources={OFFICIAL_SOURCES_ISOLATION.map((source) => ({
              name: source.name,
              url: source.url,
              description: `Consulté en ${source.date}`,
            }))}
          />
        </div>

        {/* ================================================================ */}
        {/* Final Contact Box */}
        {/* ================================================================ */}
        <div className="px-4 pb-16">
          <FinalContactBox
            title="Besoin d'un devis isolation ?"
            phone={PHONE_NUMBER}
          />
        </div>
      </div>
    </article>
  );
}
