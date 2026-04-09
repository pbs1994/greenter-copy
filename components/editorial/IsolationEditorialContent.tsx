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

const PHONE_NUMBER = '07 66 97 50 99';

// ============================================================================
// FAQ Accordion (internal)
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
// Materials Comparison (internal)
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
    <div className="bg-slate-50 rounded-2xl p-6 md:p-8 my-8" data-testid="materiaux-comparison">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {ISOLATION_MATERIAUX.map((mat) => (
          <div key={mat.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{mat.nom}</h3>
                <p className="text-sm text-slate-500 mt-1">{mat.lambda}</p>
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${familleColors[mat.famille]}`}>
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
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Atouts</p>
              <ul className="space-y-1">
                {mat.atouts.map((atout, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {atout}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-xs text-slate-400 italic">Idéal pour : {mat.ideal}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-400">Source : CSTB, ADEME, fiches ACERMI 2026</p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component — Conversion-optimized order
// ============================================================================

export function IsolationEditorialContent() {
  return (
    <article className="bg-white" data-testid="isolation-editorial-content">
      <ReadingProgressBar />

      <div className="max-w-4xl mx-auto">
        <div className="px-4 pt-12 pb-8">
          <ArticleHeader
            readingTime={ISOLATION_READING_TIME}
            lastUpdated={ISOLATION_LAST_UPDATED}
          />
        </div>

        {/* ================================================================ */}
        {/* 1. LEAD WITH THE MONEY — Exemple chiffré en premier */}
        {/* ================================================================ */}
        <ArticleSection id="combien-ca-coute" title="Combien ça coûte vraiment ?">
          <p>
            Voici le calcul pour une famille de 3 personnes,
            catégorie <strong>MaPrimeRénov' Bleu</strong> (très modestes),
            pour <strong>100 m² de combles perdus</strong> :
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
                  cells: ["MaPrimeRénov' Bleu", '- 2 500 €', '25 €/m² × 100 m²'],
                  highlight: true,
                },
                {
                  cells: ['Prime CEE bonifiée', '- 1 054 €', '10,54 €/m² × 100 m²'],
                  highlight: true,
                },
                {
                  cells: ['Reste à charge client', '1 €', 'Travaux quasi-gratuits'],
                  highlight: true,
                },
              ],
            }}
            caption="Simulation 2026 — famille de 3 personnes, catégorie Bleu, 100 m² de combles"
            source="Calcul Greenter sur base MaPrimeRénov' + CEE 2026"
          />

          <PullQuote
            quote="100 m² de combles isolés = jusqu'à 600 €/an d'économies sur votre facture de chauffage, dès le premier hiver."
            variant="stat"
          />

          <p>
            Ce reste à charge de <strong>1 €</strong> s'applique aux ménages très modestes (Bleu).
            Pour les catégories Jaune, Violet ou Rose, le reste à charge augmente — mais les
            économies de chauffage (<strong>jusqu'à 600 €/an</strong>) amortissent les travaux en <strong>3 à 5 ans</strong>.
          </p>

          <p className="mt-4 p-4 bg-sky-50 border border-sky-200 rounded-xl text-sky-900">
            <strong>Bon à savoir :</strong> ce calcul est indicatif. Les montants dépendent de votre
            devis, zone climatique et situation personnelle. Appelez-nous pour une estimation
            gratuite en 2 minutes.
          </p>
        </ArticleSection>

        {/* ================================================================ */}
        {/* 2. INTRO COURTE — Le vrai du faux, version condensée */}
        {/* ================================================================ */}
        <ArticleSection id="introduction" title="Comment fonctionne l'isolation à 1€ en 2026">
          <p>
            Le dispositif historique <strong>« Coup de Pouce Isolation à 1€ »</strong> a pris fin
            le <strong>1er juillet 2021</strong> (trop de fraudes). Mais en 2026, grâce au cumul de{' '}
            <strong>MaPrimeRénov'</strong>, de la <strong>Prime CEE bonifiée</strong> et de
            l'<strong>Éco-PTZ</strong>, le reste à charge descend toujours à quelques euros pour
            les ménages très modestes.
          </p>

          <p>
            C'est un dispositif différent, mais le résultat est le même : une isolation
            quasi-gratuite pour ceux qui en ont le plus besoin.
          </p>

          <SourceCitation
            source="ADEME"
            url="https://librairie.ademe.fr/urbanisme-et-batiment/4972-isolation-thermique.html"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* 3. CTA #1 — Convertir pendant l'excitation */}
        {/* ================================================================ */}
        <div className="px-4">
          <SidebarCTA
            title="Vérifiez votre éligibilité en 2 minutes"
            description="On calcule gratuitement votre reste à charge exact selon votre catégorie MaPrimeRénov'."
            phone={PHONE_NUMBER}
            variant="subtle"
          />
        </div>

        {/* ================================================================ */}
        {/* 4. LES 4 AIDES — Comment c'est possible (simplifié) */}
        {/* ================================================================ */}
        <ArticleSection id="aides-2026" title="Les 4 aides qui financent vos travaux">
          <p>
            Quatre dispositifs sont <strong>cumulables</strong> en 2026. Ensemble, ils couvrent
            la quasi-totalité du coût pour les ménages modestes.
          </p>

          <InfographicBlock
            type="table"
            data={{
              headers: ['Aide', 'Montant max', 'Pour qui'],
              rows: [
                {
                  cells: ["MaPrimeRénov'", "Jusqu'à 25 €/m²", 'Catégorie Bleu (très modestes)'],
                  highlight: true,
                },
                {
                  cells: ['Prime CEE bonifiée', "Jusqu'à 10,54 €/m²", 'Ménages très modestes'],
                  highlight: true,
                },
                {
                  cells: ['Éco-PTZ', "Jusqu'à 50 000 €", 'Tous, sans condition de revenus'],
                },
                {
                  cells: ['TVA réduite', '5,5 %', 'Automatique avec artisan RGE'],
                },
              ],
            }}
            caption="Les 4 aides cumulables pour l'isolation en 2026"
            source="Anah, France Rénov', mars 2026"
          />

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3 font-editorial-serif">
            MaPrimeRénov'
          </h3>
          <p>
            L'aide principale. Le montant dépend de votre <strong>catégorie de revenus Anah</strong> :
            Bleu, Jaune, Violet ou Rose. Les catégories Bleu et Jaune reçoivent les forfaits les plus élevés.
            <strong> Attention :</strong> à partir de 2027, les logements DPE F ou G n'auront plus accès
            au parcours par geste — anticipez dès maintenant.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3 font-editorial-serif">
            Prime CEE bonifiée
          </h3>
          <p>
            Versée par les fournisseurs d'énergie (TotalEnergies, EDF, Engie…).
            La bonification <strong>« Grands Précaires »</strong> monte jusqu'à{' '}
            <strong>10,54 €/m² pour les combles</strong>. Chez Greenter, la prime est
            prise en charge directement par Greenter auprès du fournisseur d'énergie.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3 font-editorial-serif">
            Éco-PTZ
          </h3>
          <p>
            Prêt à taux zéro jusqu'à <strong>50 000 €</strong>, remboursable sur 20 ans,{' '}
            <strong>sans condition de revenus</strong>. Idéal pour couvrir le reste à charge
            sans toucher à votre trésorerie.
          </p>

          <SourceCitation
            source="France Rénov'"
            url="https://france-renov.gouv.fr/aides"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* 5. PROCESSUS — C'est simple, on gère tout */}
        {/* ================================================================ */}
        <ArticleSection id="processus" title="Comment ça se passe ? 5 étapes, zéro tracas">
          <p>
            Du premier appel à la fin du chantier, <strong>nous gérons toutes les démarches administratives</strong>. Vous ne payez que le reste à charge — aucune avance de trésorerie.
          </p>

          <InfographicBlock
            type="timeline"
            data={{ steps: ISOLATION_STEPS }}
            caption="De l'éligibilité à la fin du chantier"
          />

          <p className="mt-6">
            Nous proposons aussi des{' '}
            <Link href="/services/maintenance" className="text-sky-600 hover:text-sky-700 underline underline-offset-2">
              contrats de maintenance
            </Link>{' '}
            si vous combinez isolation + pompe à chaleur ou panneaux solaires.
          </p>
        </ArticleSection>

        {/* ================================================================ */}
        {/* 6. CTA #2 */}
        {/* ================================================================ */}
        <div className="px-4">
          <SidebarCTA
            title="Visite technique gratuite sous 48h"
            description="Devis détaillé avec estimation des aides. Sans engagement."
            phone={PHONE_NUMBER}
            variant="editorial"
          />
        </div>

        {/* ================================================================ */}
        {/* 7. ZONES DE DÉPERDITION — Pourquoi isoler */}
        {/* ================================================================ */}
        <ArticleSection id="zones-deperdition" title="Par où s'échappe votre chauffage ?">
          <p>
            Avant d'investir, comprenez <strong>où part la chaleur</strong> dans une maison non isolée :
          </p>

          <InfographicBlock
            type="stats"
            data={{
              stats: [
                { value: '25-30 %', label: 'Toiture & combles', description: 'Priorité n°1 — la chaleur monte' },
                { value: '20-25 %', label: 'Murs', description: 'Ponts thermiques et parois froides' },
                { value: '10-15 %', label: 'Fenêtres', description: 'Simple vitrage, menuiseries anciennes' },
              ],
            }}
            caption="Déperditions thermiques moyennes d'une maison non isolée"
            source="ADEME, 2026"
          />

          <p>
            La <strong>toiture = 30 % des pertes</strong>. C'est le chantier le plus rentable,
            amorti en 3 à 5 ans. Les <strong>planchers bas</strong> (cave, vide sanitaire)
            représentent 7 à 10 % supplémentaires — un poste souvent oublié mais crucial
            pour le confort.
          </p>

          <PullQuote
            quote="Isoler la toiture, c'est diviser par deux la facture de chauffage d'une maison mal isolée."
            variant="stat"
          />

          <SourceCitation
            source="ADEME — Guide pratique de l'isolation"
            url="https://librairie.ademe.fr/urbanisme-et-batiment/4972-isolation-thermique.html"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* 8. PLAFONDS ANAH — Détail technique */}
        {/* ================================================================ */}
        <ArticleSection id="plafonds" title="Êtes-vous éligible ? Plafonds de ressources 2026">
          <p>
            Votre catégorie MaPrimeRénov' dépend de votre <strong>revenu fiscal de référence</strong>{' '}
            et du nombre de personnes au foyer. Plafonds revalorisés de <strong>+1,105 %</strong> en 2026.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Île-de-France
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
            caption="Revenu fiscal de référence — Île-de-France 2026"
            source="Arrêté Anah, 25/12/2025"
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
            caption="Revenu fiscal de référence — hors Île-de-France 2026"
            source="Arrêté Anah, 25/12/2025"
          />

          <p className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <strong>Bon à savoir :</strong> l'Anah retient le revenu fiscal le plus favorable
            entre N-1 et N-2. Une baisse de revenus récente peut vous faire basculer dans
            une catégorie plus avantageuse.
          </p>

          <SourceCitation
            source="Anah — Plafonds de ressources 2026"
            url="https://www.anah.gouv.fr/proprietaires/proprietaires-occupants/les-conditions-de-ressources"
            date="janvier 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* 9. MATÉRIAUX — Pour les détaillistes et le SEO */}
        {/* ================================================================ */}
        <ArticleSection id="materiaux" title="Quel isolant choisir ?">
          <p>
            Le choix dépend de trois critères : <strong>performance thermique</strong> (lambda λ),
            type de support et préférences (écologique, économique, acoustique).
            Tous ces matériaux sont <strong>certifiés ACERMI</strong>, obligatoire pour les aides.
          </p>

          <MateriauxComparison />

          <p>
            <strong>Combles perdus :</strong> la laine de verre soufflée est le meilleur rapport
            coût/performance. <strong>Rampants :</strong> la fibre de bois pour son déphasage
            thermique (confort d'été). <strong>Planchers bas :</strong> le polyuréthane projeté
            en faible épaisseur quand la hauteur est limitée.
          </p>

          <SourceCitation
            source="CSTB — fiches ACERMI"
            url="https://www.cstb.fr/"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* 10. IMPACT — Chiffres rapides */}
        {/* ================================================================ */}
        <ArticleSection id="impact" title="L'impact sur votre facture et la planète">
          <InfographicBlock
            type="stats"
            data={{
              stats: [
                { value: '30 %', label: "d'économies", description: 'Sur la facture de chauffage' },
                { value: '600 €', label: 'par an', description: 'Pour 100 m² de combles isolés' },
                { value: '2 t', label: 'CO₂ évitées', description: 'Par an pour une maison type' },
              ],
            }}
            caption="Impact moyen de l'isolation des combles sur une maison de 100 m²"
            source="ADEME, 2026"
          />

          <p>
            Une maison bien isolée gagne aussi en <strong>valeur immobilière</strong> grâce à
            un meilleur DPE — critère de plus en plus déterminant pour les acheteurs.
            Pour maximiser l'impact, combinez avec une{' '}
            <Link href="/services/pompe-a-chaleur" className="text-sky-600 hover:text-sky-700 underline underline-offset-2">
              pompe à chaleur
            </Link>{' '}
            ou des{' '}
            <Link href="/services/panneaux-solaires" className="text-sky-600 hover:text-sky-700 underline underline-offset-2">
              panneaux solaires
            </Link>.
          </p>

          <SourceCitation
            source="ADEME — Chiffres clés du bâtiment"
            url="https://www.ademe.fr/expertises/batiment/chiffres-cles-observations/chiffres-cles"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* 11. FAQ */}
        {/* ================================================================ */}
        <ArticleSection id="faq" title="Questions fréquentes">
          <FAQAccordion />
        </ArticleSection>

        {/* ================================================================ */}
        {/* 12. ZONE D'INTERVENTION */}
        {/* ================================================================ */}
        <div className="px-4 py-12">
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8" data-testid="service-area-section">
            <h2 className="text-xl font-bold text-slate-900 mb-4 font-editorial-serif">
              Notre zone d'intervention
            </h2>
            <p className="text-slate-600 mb-4">
              Nous intervenons pour vos travaux d'isolation des combles et planchers bas.
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
              <span className="inline-block bg-sky-50 border border-sky-200 rounded-full px-3 py-1 text-sm text-sky-700">
                + communes environnantes
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* 13. SOURCES */}
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
        {/* 14. CONTACT FINAL */}
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
