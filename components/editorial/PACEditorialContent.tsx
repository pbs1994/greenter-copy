'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
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
  PAC_TYPES,
  AIDES_2026,
  INSTALLATION_STEPS,
  OFFICIAL_SOURCES,
  R290_DATA,
  ENVIRONMENTAL_DATA,
} from '@/lib/pac-editorial-data';
import { CITIES } from '@/lib/local-seo-data';

// ============================================================================
// Constants
// ============================================================================

const PHONE_NUMBER = '06 09 45 50 56';
const READING_TIME = 12; // minutes
const LAST_UPDATED = 'mars 2026';

// FAQ data for the editorial content
const EDITORIAL_FAQS = [
  {
    question: 'Quel est le prix d\'une pompe à chaleur en 2026 ?',
    answer: 'Le prix varie selon le type de PAC. Une PAC air/air coûte entre 2 000€ et 5 000€ par unité. Une PAC air/eau démarre à 5 000€ et peut atteindre 15 000€. Une PAC géothermique coûte entre 15 000€ et 25 000€. Ces prix sont hors aides (MaPrimeRénov\', CEE) qui peuvent réduire significativement le reste à charge.',
  },
  {
    question: 'Quelles économies puis-je réaliser avec une PAC ?',
    answer: 'Une pompe à chaleur permet de réduire votre facture de chauffage de 50 à 70% selon EDF. Cela s\'explique par son rendement exceptionnel : pour 1 kWh d\'électricité consommé, une PAC produit 3 à 5 kWh de chaleur. L\'énergie supplémentaire est puisée gratuitement dans l\'air extérieur.',
  },
  {
    question: 'Une PAC fonctionne-t-elle par grand froid ?',
    answer: 'Oui, les PAC modernes fonctionnent jusqu\'à -15°C voire -20°C pour certains modèles. Le rendement diminue légèrement par temps très froid, mais la PAC continue de chauffer. En Seine-et-Marne, les températures descendent rarement en dessous de -10°C, ce qui est parfaitement adapté.',
  },
  {
    question: 'Qu\'est-ce que le fluide R290 ?',
    answer: `Le R290 (propane) est un fluide frigorigène nouvelle génération avec un GWP (potentiel de réchauffement) de seulement ${R290_DATA.gwp}, contre ${R290_DATA.gwpR410A} pour le R410A traditionnel. Il est conforme à la réglementation européenne ${R290_DATA.regulation} et offre un meilleur rendement thermodynamique.`,
  },
  {
    question: 'Quelles sont les aides disponibles en 2026 ?',
    answer: 'MaPrimeRénov\' est rouvert depuis le 23 février 2026. Un ménage modeste peut recevoir jusqu\'à 4 000€ d\'aide pour une PAC air/eau (plafond 12 000€). L\'Éco-PTZ permet de financer jusqu\'à 50 000€ à taux zéro. Les CEE et la TVA à 5,5% sont cumulables. Condition obligatoire : artisan certifié RGE.',
  },
  {
    question: 'Combien de temps dure une installation ?',
    answer: 'L\'installation complète prend généralement 1 à 2 jours. Avant cela, comptez une visite technique (1h), une étude de dimensionnement (48h) et l\'établissement du devis (48h). Nous nous occupons également de toutes les démarches administratives pour les aides.',
  },
  {
    question: 'Comment vérifier la certification RGE ?',
    answer: 'La certification RGE est vérifiable sur le site officiel france-renov.gouv.fr. Cette certification est obligatoire pour bénéficier des aides de l\'État (MaPrimeRénov\', CEE, TVA réduite). Sans artisan RGE, pas d\'aides !',
  },
  {
    question: 'Quel entretien pour une pompe à chaleur ?',
    answer: 'Un entretien annuel est recommandé (et obligatoire pour les PAC de plus de 2kg de fluide). Il comprend : vérification du fluide frigorigène, nettoyage des filtres, contrôle des performances. Coût moyen : 150 à 200€/an.',
  },
];

// ============================================================================
// FAQ Section Component (internal)
// ============================================================================

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3" data-testid="faq-accordion">
      {EDITORIAL_FAQS.map((faq, index) => (
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
              openIndex === index ? 'max-h-96' : 'max-h-0'
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
// Main Component
// ============================================================================

/**
 * PACEditorialContent - Composant principal du contenu éditorial PAC
 * 
 * Structure:
 * - ArticleHeader (temps de lecture, date mise à jour)
 * - Introduction
 * - Types PAC (avec InfographicBlock comparison)
 * - SidebarCTA #1
 * - Innovation R290
 * - Design et intégration
 * - Aides 2026 (avec InfographicBlock table)
 * - Installation (avec InfographicBlock timeline)
 * - SidebarCTA #2
 * - Impact environnemental (avec InfographicBlock stats)
 * - FAQ
 * - Sources
 * - FinalContactBox
 * 
 * Requirements: 1.1-1.8, 2.1-2.6, 3.1-3.5, 4.1-4.5, 5.1-5.10, 6.1-6.6, 7.1-7.5, 8.1-8.6
 */
export function PACEditorialContent() {
  return (
    <article
      className="bg-white"
      data-testid="pac-editorial-content"
    >
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Article Container */}
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="px-4 pt-12 pb-8">
          <ArticleHeader readingTime={READING_TIME} lastUpdated={LAST_UPDATED} />
        </div>

        {/* ================================================================ */}
        {/* SECTION: Introduction */}
        {/* ================================================================ */}
        <ArticleSection id="introduction" title="Tout savoir sur la pompe à chaleur en 2026">
          <p>
            La <strong>pompe à chaleur</strong> s'impose comme la solution de chauffage la plus efficace 
            et économique. Avec des économies pouvant atteindre 
            <strong> 50 à 70% sur votre facture de chauffage</strong>, cette technologie révolutionne 
            notre façon de nous chauffer. En <strong>Seine-et-Marne (77)</strong> et dans toute 
            l'<strong>Île-de-France</strong>, de plus en plus de propriétaires font ce choix.
          </p>

          <PullQuote
            quote="Diviser sa facture de chauffage par 3, c'est possible avec une pompe à chaleur correctement dimensionnée."
            source="EDF, février 2025"
            variant="highlight"
          />

          <p>
            Le principe est simple : pour 1 kWh d'électricité consommé, une PAC produit 3 à 5 kWh 
            de chaleur. Cette performance exceptionnelle s'explique par le <strong>COP (Coefficient de Performance)</strong> : 
            la PAC ne crée pas de chaleur, elle la capte dans l'air extérieur — une énergie gratuite et renouvelable.
          </p>

          <p>
            En 2026, les aides financières sont plus accessibles que jamais. <strong>MaPrimeRénov' est rouvert 
            depuis le 23 février 2026</strong> pour tous les ménages. Combinées à l'Éco-PTZ et aux CEE, 
            ces aides peuvent couvrir une part significative de votre investissement. Pour une approche 
            globale de votre rénovation énergétique, découvrez également nos solutions 
            d'<Link href="/services/isolation" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">isolation thermique</Link>.
          </p>

          <SourceCitation
            source="EDF"
            url="https://www.edf.fr/groupe-edf/espaces-dedies/l-energie-de-a-a-z/tout-sur-l-energie/le-developpement-durable/la-pompe-a-chaleur"
            date="février 2025"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Types de PAC */}
        {/* ================================================================ */}
        <ArticleSection id="types-pac" title="Les 4 types de pompes à chaleur">
          <p>
            Chaque type de <strong>PAC</strong> répond à des besoins spécifiques. Le choix dépend de votre 
            logement, de votre système de chauffage actuel et de votre budget. Voici un comparatif 
            détaillé pour vous aider à choisir. Pour approfondir le sujet, consultez 
            nos <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">articles de blog</Link> dédiés 
            aux pompes à chaleur.
          </p>

          <InfographicBlock
            type="comparison"
            data={{ items: PAC_TYPES }}
            caption="Comparatif des 4 types de pompes à chaleur disponibles en 2026"
            source="EDF, ADEME"
          />

          <PullQuote
            quote="Un COP de 4 signifie que pour 1 kWh d'électricité consommé, votre PAC produit 4 kWh de chaleur."
            variant="stat"
          />

          <p>
            La <strong>PAC air/eau</strong> reste le choix le plus populaire pour les maisons avec 
            chauffage central existant. Elle remplace avantageusement une chaudière gaz ou fioul 
            tout en produisant l'eau chaude sanitaire.
          </p>

          <p>
            Pour les appartements ou maisons sans chauffage central, la <strong>PAC air/air</strong> 
            (climatisation réversible) offre un excellent rapport qualité-prix avec l'avantage 
            de la climatisation en été.
          </p>

          <SourceCitation
            source="EDF"
            url="https://www.edf.fr/groupe-edf/espaces-dedies/l-energie-de-a-a-z/tout-sur-l-energie/le-developpement-durable/la-pompe-a-chaleur"
            date="février 2025"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SIDEBAR CTA #1 */}
        {/* ================================================================ */}
        <div className="px-4">
          <SidebarCTA
            title="Besoin d'un conseil personnalisé ?"
            description="Nos experts vous aident à choisir la PAC adaptée à votre logement."
            phone={PHONE_NUMBER}
            variant="subtle"
          />
        </div>

        {/* ================================================================ */}
        {/* SECTION: Innovation R290 */}
        {/* ================================================================ */}
        <ArticleSection id="r290" title="L'innovation R290 : le fluide du futur">
          <p>
            Le <strong>fluide R290</strong> (propane) représente une avancée majeure pour l'environnement. 
            Avec un GWP (potentiel de réchauffement global) de seulement <strong>{R290_DATA.gwp}</strong>, 
            il est <strong>477 fois moins polluant</strong> que le R410A traditionnel (GWP de {R290_DATA.gwpR410A}).
          </p>

          <InfographicBlock
            type="stats"
            data={{
              stats: [
                { value: String(R290_DATA.gwp), label: 'GWP R290', description: 'Potentiel de réchauffement' },
                { value: String(R290_DATA.gwpR410A), label: 'GWP R410A', description: 'Fluide traditionnel' },
                { value: '0', label: 'ODP', description: 'Impact sur la couche d\'ozone' },
              ],
            }}
            caption="Comparaison des fluides frigorigènes"
            source={`Règlement ${R290_DATA.regulation}`}
          />

          <p>
            La réglementation européenne <strong>{R290_DATA.regulation}</strong> impose désormais un GWP 
            inférieur à {R290_DATA.maxGwpNewEquipment} pour les nouveaux équipements. Les PAC au R290 
            sont donc parfaitement conformes et représentent l'avenir du secteur.
          </p>

          <PullQuote
            quote="Le R290 offre non seulement un impact environnemental minimal, mais aussi un meilleur rendement thermodynamique."
            variant="default"
          />

          <SourceCitation
            source="Règlement EU 2024/573"
            url="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R0573"
            date="2024"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Design et intégration */}
        {/* ================================================================ */}
        <ArticleSection id="design" title="Design et intégration architecturale">
          <p>
            Les <strong>pompes à chaleur modernes</strong> ont considérablement évolué en termes de design. 
            Les unités extérieures sont plus compactes, plus silencieuses et s'intègrent harmonieusement 
            dans tous les environnements.
          </p>

          <p>
            Les fabricants proposent désormais des finitions personnalisables et des solutions 
            d'intégration paysagère. L'unité extérieure peut être dissimulée derrière un cache 
            décoratif ou intégrée dans un aménagement végétal.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Réduction du bruit
          </h3>

          <p>
            Les PAC modernes émettent environ <strong>45-55 dB</strong> pour l'unité extérieure, 
            comparable à une conversation normale. L'unité intérieure est encore plus silencieuse 
            avec seulement <strong>20-25 dB</strong>, équivalent à un chuchotement.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Distances réglementaires
          </h3>

          <p>
            L'emplacement de l'unité extérieure doit respecter certaines distances par rapport 
            aux limites de propriété et aux ouvertures des voisins. Ces contraintes sont étudiées 
            lors de la visite technique gratuite pour garantir une installation conforme. 
            <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">Contactez-nous</Link> pour 
            planifier votre visite.
          </p>
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Aides 2026 */}
        {/* ================================================================ */}
        <ArticleSection id="aides-2026" title="Guide des aides financières 2026">
          <p>
            Bonne nouvelle : <strong>MaPrimeRénov' est rouvert depuis le 23 février 2026</strong> pour 
            tous les ménages et tous les parcours. Les PAC air/eau et géothermiques restent éligibles 
            aux aides les plus avantageuses.
          </p>

          <PullQuote
            quote="Sans artisan certifié RGE, pas d'aides !"
            variant="highlight"
          />

          <InfographicBlock
            type="table"
            data={{
              headers: ['Aide', 'Montant max', 'Conditions'],
              rows: [
                {
                  cells: ["MaPrimeRénov'", 'Jusqu\'à 5 000€', 'Logement > 15 ans, RGE obligatoire'],
                  highlight: true,
                },
                {
                  cells: ['Éco-PTZ', 'Jusqu\'à 50 000€', 'Prêt à taux zéro, logement > 2 ans'],
                },
                {
                  cells: ['CEE', 'Jusqu\'à 4 000€', 'Cumulable, logement > 2 ans'],
                },
                {
                  cells: ['TVA réduite', '5,5%', 'Automatique avec artisan RGE'],
                },
              ],
            }}
            caption="Récapitulatif des aides cumulables pour l'installation d'une PAC"
            source="economie.gouv.fr, mars 2026"
          />

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Conditions d'éligibilité
          </h3>

          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Résidence principale occupée au moins 8 mois par an</li>
            <li>Logement construit depuis au moins 15 ans</li>
            <li>Travaux réalisés par un artisan <strong>certifié RGE</strong></li>
          </ul>

          <p className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <strong>⚠️ Attention :</strong> À partir de 2027, les maisons classées DPE F ou G 
            n'auront plus accès au parcours par geste. Anticipez vos travaux !
          </p>

          <p className="mt-4">
            Pour estimer vos droits, utilisez le simulateur officiel 
            <strong> "Mes Aides Réno"</strong> sur france-renov.gouv.fr. Vous pouvez également 
            utiliser notre <Link href="/simulateur-solaire" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">simulateur solaire</Link> pour 
            évaluer le potentiel d'une installation photovoltaïque complémentaire.
          </p>

          <SourceCitation
            source="economie.gouv.fr"
            url="https://www.economie.gouv.fr/particuliers/prime-renovation-energetique"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SECTION: Installation */}
        {/* ================================================================ */}
        <ArticleSection id="installation" title="Le processus d'installation">
          <p>
            L'<strong>installation d'une pompe à chaleur</strong> suit un processus rigoureux pour 
            garantir des performances optimales. Le dimensionnement correct est crucial : une PAC 
            sous-dimensionnée ne chauffera pas suffisamment, une PAC surdimensionnée consommera trop.
          </p>

          <InfographicBlock
            type="timeline"
            data={{ steps: INSTALLATION_STEPS }}
            caption="Les 4 étapes de votre projet PAC"
          />

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            L'importance du dimensionnement
          </h3>

          <p>
            Le calcul thermique prend en compte la surface, l'isolation, l'exposition et vos 
            habitudes de vie. Un dimensionnement précis garantit un confort optimal et des 
            économies maximales.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 font-editorial-serif">
            Entretien obligatoire
          </h3>

          <p>
            Un entretien annuel est obligatoire pour les PAC contenant plus de 2 kg de fluide 
            frigorigène. Coût moyen : <strong>150 à 200€ par an</strong>. Cet entretien permet 
            de maintenir les performances et de prolonger la durée de vie de l'équipement 
            (15 à 20 ans). Nous proposons des <Link href="/services/maintenance" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">contrats de maintenance</Link> pour 
            les habitants d'Ozoir-la-Ferrière, Pontault-Combault, Roissy-en-Brie et toutes les 
            communes du 77.
          </p>

          <SourceCitation
            source="France Rénov'"
            url="https://france-renov.gouv.fr/"
            date="mars 2026"
          />
        </ArticleSection>

        {/* ================================================================ */}
        {/* SIDEBAR CTA #2 */}
        {/* ================================================================ */}
        <div className="px-4">
          <SidebarCTA
            title="Prêt à passer à l'action ?"
            description="Visite technique gratuite et devis détaillé sous 48h."
            phone={PHONE_NUMBER}
            variant="editorial"
          />
        </div>

        {/* ================================================================ */}
        {/* SECTION: Impact environnemental */}
        {/* ================================================================ */}
        <ArticleSection id="environnement" title="Impact environnemental">
          <p>
            La <strong>pompe à chaleur</strong> est l'une des solutions de chauffage les plus 
            respectueuses de l'environnement. En remplaçant une chaudière gaz ou fioul, vous 
            pouvez réduire vos émissions de CO2 jusqu'à <strong>{ENVIRONMENTAL_DATA.co2Reduction}</strong>.
          </p>

          <InfographicBlock
            type="stats"
            data={{
              stats: [
                { value: ENVIRONMENTAL_DATA.co2Reduction, label: 'Réduction CO2', description: 'vs chaudière gaz/fioul' },
                { value: ENVIRONMENTAL_DATA.savingsRange, label: 'Économies', description: 'sur la facture chauffage' },
                { value: '75%', label: 'Énergie gratuite', description: 'captée dans l\'air' },
              ],
            }}
            caption="L'impact positif d'une pompe à chaleur"
            source="EDF, ADEME"
          />

          <p>
            Le principe est vertueux : <strong>75% de l'énergie</strong> utilisée par une PAC 
            provient de l'air extérieur, une ressource gratuite et inépuisable. Seuls 25% 
            proviennent de l'électricité, qui peut elle-même être d'origine renouvelable grâce 
            à des <Link href="/services/panneaux-solaires" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">panneaux solaires</Link>.
          </p>

          <PullQuote
            quote="Une pompe à chaleur produit 4 fois plus de chaleur qu'elle ne consomme d'électricité."
            source="EDF"
            variant="stat"
          />

          <p>
            Pour maximiser l'efficacité de votre PAC et réduire encore davantage votre empreinte 
            carbone, pensez à combiner votre installation avec une bonne <Link href="/services/isolation" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">isolation thermique</Link>. 
            Une maison bien isolée nécessite moins de puissance de chauffage.
          </p>

          <SourceCitation
            source="ADEME"
            url="https://www.ademe.fr/particuliers-eco-citoyens/habitation/construire/pompe-chaleur/"
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
              Basés à <strong>Ozoir-la-Ferrière</strong>, nous intervenons dans tout le 
              département de la <strong>Seine-et-Marne (77)</strong> et les communes limitrophes 
              d'<strong>Île-de-France</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/services/pompe-a-chaleur/${city.slug}`}
                  className="inline-block bg-white border border-slate-200 rounded-full px-3 py-1 text-sm text-slate-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                >
                  {city.name}
                </Link>
              ))}
              <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-sm text-emerald-700">
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
            sources={OFFICIAL_SOURCES.map((source) => ({
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
            title="Besoin d'un conseil ?"
            phone={PHONE_NUMBER}
          />
        </div>
      </div>
    </article>
  );
}
