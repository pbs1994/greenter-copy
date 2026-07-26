import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSteps, ArticleSources,
  ArticleImageSection, ArticleFullImage,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, BUDGET_TABLE, EXAMPLE_CALCULATION,
  DEVIS_ITEMS, TIPS_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/prix-d-une-isolation-des-combles'

export const metadata: Metadata = {
  title: ARTICLE_META.title + ' | Greenter',
  description: ARTICLE_META.subtitle,
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/isolation-combles-prix-pose-artisan-sous-rampants.jpg',
      width: 1600,
      height: 1067,
      alt: "Artisan RGE posant de la laine de roche sous les rampants de toiture — prix d'une isolation des combles",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/isolation-combles-prix-pose-artisan-sous-rampants.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Prix d'une isolation des combles", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PrixDUneIsolationDesCombles() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        headline={ARTICLE_META.title}
        description={ARTICLE_META.subtitle}
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: 'Greenter', url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/isolation-combles-prix-pose-artisan-sous-rampants.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/isolation-combles-prix-pose-artisan-sous-rampants.jpg"
        heroAlt="Artisan sur escabeau posant un panneau de laine de roche sous les rampants d'une toiture — chantier d'isolation des combles"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Le <strong>prix d&apos;une isolation des combles</strong> est la première
            question que se posent les propriétaires avant de lancer leur projet de
            rénovation énergétique — et la réponse dépend beaucoup plus du{' '}
            <strong>type de chantier</strong> que d&apos;un simple tarif au m². Pour des{' '}
            <strong>combles perdus</strong> isolés par soufflage, le budget total tourne
            autour de <strong>1 500 à 4 000 €</strong> pour une maison de taille moyenne.
            Pour des <strong>combles aménageables</strong> avec isolation sous-rampants et
            finitions, comptez plutôt entre <strong>3 500 et 10 000 €</strong>. Et pour une
            isolation par l&apos;extérieur (technique du Sarking) associée à une réfection de
            toiture, le budget peut grimper jusqu&apos;à 18 000 €.
          </p>
          <p>
            Ces montants correspondent au <strong>prix plein</strong>, avant déduction des
            aides financières. Or MaPrimeRénov&apos;, les primes CEE et la TVA réduite à 5,5 %
            peuvent réduire le reste à charge de 50 à 100 % selon vos revenus — au point que
            l&apos;isolation des combles perdus est aujourd&apos;hui quasiment gratuite pour de
            nombreux foyers modestes.
          </p>
          <p>
            Plutôt que de vous noyer dans des fourchettes au m² difficiles à transposer à
            votre propre logement, ce guide vous donne le <strong>budget global</strong>{' '}
            à prévoir selon la taille et le type de vos combles, la composition détaillée
            d&apos;un devis, un exemple de facture réelle et les bons réflexes pour comparer
            plusieurs devis sans vous faire surprendre. Si vous cherchez plutôt les tarifs
            précis par isolant et par m², notre{' '}
            <Link href="/blog/prix-isolation-combles-au-m2" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              guide des prix au m² pour l&apos;isolation des combles
            </Link>{' '}
            complète parfaitement cet article.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le budget total à prévoir selon le type et la surface de vos combles</li>
            <li>La composition détaillée d&apos;un devis d&apos;isolation (fourniture, pose, finitions, TVA)</li>
            <li>Un exemple de devis réel avec calcul du reste à charge après aides</li>
            <li>5 conseils pour comparer plusieurs devis et éviter les mauvaises surprises</li>
            <li>Le comparatif chiffré entre isolation DIY et intervention d&apos;un artisan RGE</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : BUDGET GLOBAL ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix d&apos;une isolation des combles : le budget total selon votre projet
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Contrairement à un simple prix au m², le <strong>budget global</strong> d&apos;une
          isolation des combles dépend avant tout de la nature du chantier. Le tableau
          suivant présente des budgets réels, tous postes confondus, pour les configurations
          les plus fréquentes rencontrées par nos artisans RGE en Île-de-France.
        </p>

        <ArticleTable {...BUDGET_TABLE} title="Budget total (devis complet) pour l'isolation des combles — 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Deux enseignements se dégagent de ce tableau. D&apos;abord, le{' '}
          <strong>prix d&apos;une isolation des combles perdus</strong> reste, de loin, le
          projet le plus accessible : pour une maison de taille moyenne, le reste à charge
          après aides descend souvent sous la barre des 500 €. Ensuite, l&apos;écart de budget
          entre combles perdus et combles aménageables n&apos;est pas seulement lié à
          l&apos;isolant : il reflète surtout la complexité de mise en œuvre et l&apos;ajout de
          finitions (pare-vapeur, ossature, plaques de plâtre) absentes des chantiers de
          combles perdus.
        </p>

        <ArticleStat stats={[
          { value: '1 500–4 000 €', label: 'budget total pour des combles perdus (avant aides)', color: 'blue' },
          { value: '3 500–10 000 €', label: 'budget total pour des combles aménageables avec finitions', color: 'blue' },
          { value: 'jusqu\'à 100 %', label: 'du chantier financé pour les ménages très modestes', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : BUDGET PAR TAILLE DE MAISON ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Combien coûte une isolation des combles selon la taille de votre maison ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour se projeter concrètement, rien ne vaut des exemples chiffrés issus de
          chantiers réels. Voici trois scénarios types qui couvrent la majorité des
          situations rencontrées par les propriétaires en France.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Exemple 1 : combles perdus de 80 m² dans une maison des années 1980
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est le cas le plus fréquent : une maison individuelle avec des combles non
          aménagés, accessibles par une trappe, et un ancien isolant en laine de verre
          tassé avec le temps. Le chantier consiste à souffler 28 à 30 cm de laine minérale
          ou de ouate de cellulose par-dessus l&apos;existant. Le <strong>prix d&apos;une
          isolation des combles</strong> dans cette configuration s&apos;établit généralement
          entre 2 000 et 2 800 € TTC, travaux réalisés en une demi-journée. Pour un ménage
          aux revenus modestes, le reste à charge final se limite souvent à quelques
          centaines d&apos;euros.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-combles-perdus-soufflage-machine-artisan.jpg"
          alt="Artisan RGE réalisant le soufflage de ouate de cellulose dans des combles perdus à l'aide d'une machine pneumatique, fenêtre de toit et charpente visibles"
          imagePosition="right"
        >
          <p>
            Le <strong>soufflage mécanique</strong> reste la méthode la plus économique pour
            des combles perdus : la machine projette l&apos;isolant en vrac par la trappe
            d&apos;accès, sans avoir à découper de panneaux ni à se déplacer sur toute la
            surface du plancher. C&apos;est ce qui explique un prix au m² contenu et un
            chantier expédié en quelques heures.
          </p>
          <p className="mt-3">
            Pour connaître le détail des tarifs par isolant (laine de verre, laine de
            roche, ouate de cellulose) et par méthode de pose, consultez notre{' '}
            <Link href="/blog/prix-isolation-combles-au-m2" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              comparatif des prix d&apos;isolation au m²
            </Link>.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Exemple 2 : combles aménageables de 90 m² isolés sous-rampants
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ici, les combles ont une hauteur suffisante pour être habités et l&apos;objectif est
          d&apos;isoler l&apos;ensemble de la toiture (rampants) et les pignons. Le chantier inclut
          la pose de panneaux de laine minérale entre les chevrons, un pare-vapeur et des
          finitions en plaques de plâtre. Le budget total observé se situe entre 5 000 et
          7 500 € TTC, pour un chantier étalé sur 3 à 4 jours. C&apos;est le scénario que nous
          détaillons ligne par ligne un peu plus loin, avec un exemple de devis réel.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Exemple 3 : rénovation complète de combles déjà aménagés
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Cas plus rare mais fréquent dans l&apos;ancien : les combles sont déjà habités, mais
          l&apos;isolation d&apos;origine est insuffisante ou dégradée. Il faut alors déposer les
          cloisons existantes, retirer l&apos;ancien isolant, poser un isolant performant puis
          refaire entièrement les finitions. Ce type de chantier, le plus lourd, atteint
          fréquemment 7 000 à 10 000 € pour 80 à 100 m², en raison du surcoût lié à la
          dépose et à la remise en état.
        </p>

        {/* ---- SECTION 3 : COMPOSITION DU DEVIS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Ce qui compose réellement le prix d&apos;un devis d&apos;isolation des combles
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour comprendre pourquoi deux devis peuvent afficher des montants très différents
          pour un chantier apparemment identique, il faut décomposer les postes qui
          constituent le <strong>prix final</strong> de votre isolation des combles.
        </p>

        <ArticleSteps steps={DEVIS_ITEMS} />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Un devis complet et transparent doit détailler chacun de ces postes séparément.
          Méfiez-vous des devis qui affichent un unique prix global sans décomposition :
          c&apos;est souvent le signe d&apos;une estimation approximative, réalisée sans visite
          technique préalable, qui risque d&apos;évoluer une fois le chantier commencé.
        </p>

        <ArticleFullImage
          image="/images/blog/isolation-combles-amenageables-pare-vapeur-rampants.jpeg"
          alt="Combles aménageables recouverts d'un pare-vapeur réfléchissant sous les rampants de toiture, fenêtres de toit et charpente en bois apparente"
          caption="Pose d'un pare-vapeur sous rampants avant l'installation de l'isolant — une étape indispensable pour les combles aménageables, souvent sous-estimée dans les devis approximatifs."
        />

        {/* ---- SECTION 4 : RESTE À CHARGE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Exemple de devis réel : quel reste à charge après les aides financières ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Rien ne vaut un exemple concret pour comprendre comment le{' '}
          <strong>prix d&apos;une isolation des combles</strong> se transforme en reste à
          charge final. Voici le détail d&apos;un devis réel pour une isolation sous-rampants
          de 80 m², réalisée pour un ménage aux revenus intermédiaires (catégorie Violet de
          MaPrimeRénov&apos;).
        </p>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
                <span className="text-slate-700">{line.label}</span>
                <span className="font-semibold text-lg text-slate-900">{line.amount}</span>
              </div>
            ))}
            <div className="border-t-2 border-emerald-300 pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-emerald-900 text-xl">{EXAMPLE_CALCULATION.total.label}</span>
              <span className="font-bold text-emerald-900 text-3xl">{EXAMPLE_CALCULATION.total.amount}</span>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Économies sur la facture</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Retour sur investissement</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.roi}</p>
            </div>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-4">
          Ce calcul illustre un point essentiel : le <strong>prix affiché sur un devis</strong>{' '}
          n&apos;est jamais le montant que vous paierez réellement si vous êtes éligible aux
          aides. MaPrimeRénov&apos; et la prime CEE Coup de Pouce sont déduites directement de la
          facture par l&apos;artisan RGE — vous ne réglez que le solde, sans avance de
          trésorerie ni démarche de remboursement a posteriori.
        </p>

        <ArticleCallout type="tip" title="Le montant exact des aides dépend de votre catégorie de revenus">
          <p>
            Les barèmes MaPrimeRénov&apos; sont exprimés en euros par m² et varient selon quatre
            catégories de ressources (Bleu, Jaune, Violet, Rose). Pour connaître le montant
            précis applicable à votre foyer et à la surface de vos combles, consultez le{' '}
            <Link href="/blog/prix-isolation-combles-au-m2" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              tableau détaillé des aides par catégorie
            </Link>{' '}
            dans notre guide complémentaire sur les tarifs au m².
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : DIY VS ARTISAN ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isoler soi-même ou faire appel à un artisan RGE : quel impact sur le prix ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Face à un budget qui peut sembler élevé, beaucoup de propriétaires envisagent de
          réaliser eux-mêmes l&apos;isolation de leurs combles perdus, en posant des rouleaux
          de laine de verre achetés en magasin de bricolage. Cette option existe et permet
          effectivement de réduire le <strong>prix d&apos;achat</strong> de l&apos;isolant à
          quelques centaines d&apos;euros pour une petite surface — mais elle comporte des
          limites importantes à connaître avant de se lancer.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-combles-perdus-pose-rouleaux-laine-verre.jpeg"
          alt="Pose manuelle d'un rouleau de laine de verre jaune entre les solives du plancher de combles perdus"
          imagePosition="left"
        >
          <p>
            La pose de <strong>rouleaux de laine de verre</strong> en auto-rénovation est
            réalisable pour des combles perdus faciles d&apos;accès, avec un plancher en bon
            état. Le matériau seul coûte entre 8 et 15 €/m², soit un budget deux à trois
            fois inférieur à une prestation avec pose par un professionnel.
          </p>
          <p className="mt-3">
            Mais attention : des travaux réalisés en DIY <strong>ne sont jamais éligibles</strong>{' '}
            à MaPrimeRénov&apos; ni aux primes CEE, qui exigent obligatoirement l&apos;intervention
            d&apos;un artisan certifié RGE. Le prix apparemment plus bas de l&apos;auto-rénovation
            peut donc, une fois les aides prises en compte, se révéler plus coûteux qu&apos;un
            chantier confié à un professionnel.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Autre point de vigilance : une pose mal réalisée (tassement de l&apos;isolant,
          ponts thermiques au niveau des solives, absence de continuité) réduit fortement
          la performance thermique réelle par rapport à la résistance R annoncée sur
          l&apos;emballage. Un artisan RGE garantit une mise en œuvre conforme au DTU en
          vigueur et engage sa responsabilité décennale sur le résultat — ce que ne permet
          pas l&apos;auto-rénovation.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          En résumé : pour des combles perdus très simples d&apos;accès et un budget très
          serré, le DIY reste une option viable pour le matériau uniquement le moins
          coûteux. Pour tout le reste — et systématiquement pour des combles
          aménageables — l&apos;intervention d&apos;un artisan RGE est à la fois la seule voie
          d&apos;accès aux aides financières et la garantie d&apos;une performance thermique
          durable.
        </p>

        {/* ---- SECTION 6 : COMPARER LES DEVIS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          5 conseils pour comparer les devis et obtenir le meilleur prix
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix d&apos;une isolation des combles varie fortement d&apos;un artisan à l&apos;autre
          pour un chantier pourtant identique. Voici la méthode à suivre pour comparer
          efficacement plusieurs propositions et sécuriser votre budget avant de signer.
        </p>

        <ArticleSteps steps={TIPS_STEPS} />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Une bonne isolation des combles ne se suffit pas toujours à elle-même : elle
          gagne à être associée à d&apos;autres postes de rénovation pour maximiser les
          économies d&apos;énergie. Une{' '}
          <Link href="/blog/isolation-rampants-de-toiture" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            isolation des rampants de toiture
          </Link>{' '}
          bien réalisée limite les déperditions par le haut de la maison, tandis qu&apos;une{' '}
          <Link href="/blog/meilleur-isolant-thermique-murs-interieur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            isolation performante des murs intérieurs
          </Link>{' '}
          complète l&apos;enveloppe thermique du logement. Ces différents postes peuvent être
          intégrés dans un même dossier MaPrimeRénov&apos;, avec des bonus supplémentaires si
          vous optez pour une rénovation globale plutôt que des travaux isolés.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Avant de vous engager, il est également recommandé de faire réaliser un{' '}
          <Link href="/services/audit" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            audit énergétique
          </Link>{' '}
          de votre logement. Ce diagnostic identifie précisément les zones de déperdition
          thermique et hiérarchise les travaux les plus rentables — l&apos;isolation des
          combles arrivant presque systématiquement en tête des priorités, avant même le
          remplacement d&apos;un système de chauffage par une{' '}
          <Link href="/services/pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            pompe à chaleur
          </Link>.
        </p>

        <ArticleCallout type="info" title="Le bon ordre des priorités pour votre budget rénovation">
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li><strong>1. Isolation des combles</strong> — le meilleur rapport économies / prix, à traiter en priorité</li>
            <li><strong>2. Isolation des murs</strong> — deuxième poste de déperdition thermique</li>
            <li><strong>3. Remplacement du système de chauffage</strong> — pertinent une fois l&apos;enveloppe isolée</li>
            <li><strong>4. Ventilation (VMC)</strong> — indispensable pour éviter l&apos;humidité une fois le logement mieux isolé</li>
          </ul>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Obtenez un devis précis pour l'isolation de vos combles"
          description="Nos artisans certifiés RGE se déplacent gratuitement, chiffrent votre projet poste par poste et montent votre dossier MaPrimeRénov' 2026. Devis détaillé et sans engagement sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Questions fréquentes</h2>
        <div className="space-y-4 my-8">
          {FAQ_ITEMS.map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-900 hover:text-emerald-700 transition-colors">
                {faq.question}
                <ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* ---- SOURCES ---- */}
        <ArticleSources sources={SOURCES} />

        {/* ---- LIENS INTERNES ---- */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/blog/prix-isolation-combles-au-m2"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide complémentaire</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix isolation combles au m² — tarifs détaillés
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/services/isolation"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation thermique en Île-de-France
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/isolation-rampants-de-toiture"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article isolation</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation rampants de toiture : guide complet
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire l&apos;article <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/services/audit"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Audit énergétique — DPE et bilan thermique
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              En savoir plus <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Devis isolation des combles par ville en Île-de-France
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Paris', slug: 'paris' },
              { name: 'Versailles', slug: 'versailles' },
              { name: 'Créteil', slug: 'creteil' },
              { name: 'Vincennes', slug: 'vincennes' },
              { name: 'Massy', slug: 'massy' },
              { name: 'Meaux', slug: 'meaux' },
              { name: 'Melun', slug: 'melun' },
              { name: 'Noisy-le-Grand', slug: 'noisy-le-grand' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/services/isolation/${city.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                Isolation {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

      </ArticleLayout>
    </>
  )
}
