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
  ARTICLE_META, ISOLANTS_TABLE, AIDES_TABLE, STEPS,
  EXAMPLE_CALCULATION, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-murs-interieur-2026'

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
      url: 'https://www.greenter.fr/images/blog/isolation-murs-interieur-hero.png',
      width: 1200,
      height: 630,
      alt: "Isolation thermique des murs par l'intérieur — doublage laine de roche",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/isolation-murs-interieur-hero.png'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Meilleur isolant murs intérieur 2026", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function MeilleurIsolantMursInterieur2026() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        headline={ARTICLE_META.title}
        description={ARTICLE_META.subtitle}
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: "Greenter", url: "https://www.greenter.fr" }}
        publisher={{ name: "Greenter", logo: "https://www.greenter.fr/logo.png" }}
        image="https://www.greenter.fr/images/blog/isolation-murs-interieur-hero.png"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/isolation-murs-interieur-hero.png"
        heroAlt="Pose de panneaux de laine de roche sur ossature métallique pour l'isolation thermique des murs par l'intérieur"
        breadcrumbs={breadcrumbs}
      >
        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Dans une maison construite avant 1990, les <strong>murs représentent 20 à 25 % des déperditions
            thermiques</strong> totales, derrière la toiture (30 %) mais avant les planchers bas et les
            fenêtres. L&apos;<strong>isolation thermique des murs par l&apos;intérieur (ITI)</strong> est souvent la
            seule solution viable pour les appartements, les maisons mitoyennes ou les façades classées :
            pas de travaux en extérieur, pas de modification de l&apos;aspect de l&apos;immeuble, aucune autorisation
            d&apos;urbanisme nécessaire dans la quasi-totalité des cas.
          </p>
          <p>
            En 2026, <strong>MaPrimeRénov&apos; isolation des murs</strong> rembourse jusqu&apos;à 75 €/m² pour les
            ménages modestes, le Coup de pouce CEE est cumulable sans condition de ressources, et la TVA
            à 5,5 % s&apos;applique à l&apos;ensemble des fournitures et de la main-d&apos;œuvre. Avec un reste à charge
            qui peut descendre sous 30 % du coût total, c&apos;est le moment le plus favorable depuis dix ans
            pour <strong>isoler ses murs intérieurs</strong>.
          </p>
          <p>
            Ce guide compare les cinq meilleurs matériaux d&apos;isolation intérieure (laine de roche, laine
            de verre, polystyrène expansé, polyuréthane projeté, ouate de cellulose), vous donne les
            épaisseurs recommandées pour atteindre la résistance thermique R≥3,7 m²·K/W exigée par
            le référentiel BBC rénovation, et détaille les aides financières cumulables en 2026.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Comparatif des 5 meilleurs isolants thermiques pour murs intérieurs (λ, R, prix)</li>
            <li>Épaisseurs recommandées et impact sur la surface habitable</li>
            <li>Prix de l&apos;ITI au m² en 2026 (fourniture + pose)</li>
            <li>Toutes les aides 2026 cumulables : MaPrimeRénov&apos;, CEE, éco-PTZ, TVA 5,5 %</li>
            <li>Guide de pose pas à pas (doublage ossature métallique)</li>
            <li>Ponts thermiques, humidité : les pièges à éviter</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI L'ITI ? ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi choisir l&apos;isolation des murs par l&apos;intérieur ?
        </h2>

        <ArticleImageSection
          image="/images/blog/isolation-interieure-avantages.png"
          alt="Coupe transversale d'un mur avec doublage isolant thermique par l'intérieur"
          imagePosition="right"
        >
          <p>
            L&apos;<strong>isolation thermique par l&apos;intérieur (ITI)</strong> consiste à créer un doublage
            isolant sur la face intérieure des murs extérieurs. C&apos;est l&apos;alternative incontournable à
            l&apos;isolation par l&apos;extérieur (ITE) dans plusieurs situations :
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3 text-slate-600">
            <li>
              <strong>Appartements en copropriété</strong> : les façades appartiennent aux parties communes —
              modifier l&apos;aspect extérieur nécessite un vote en AG. L&apos;ITI relève uniquement des parties privatives.
            </li>
            <li>
              <strong>Zones protégées ou secteurs sauvegardés</strong> : l&apos;ITE est soumise à autorisation
              (parfois refusée) pour les immeubles classés ou proches d&apos;un monument historique.
            </li>
            <li>
              <strong>Maisons mitoyennes</strong> : les murs de refend partagés avec le voisin ne peuvent
              pas recevoir d&apos;isolation côté extérieur sans accord préalable.
            </li>
            <li>
              <strong>Budget plus serré</strong> : l&apos;ITI coûte en moyenne 80 à 120 €/m² posé contre
              120 à 180 €/m² pour l&apos;ITE avec bardage, même si ce dernier reste plus performant sur le plan
              des ponts thermiques.
            </li>
          </ul>
          <p className="mt-3">
            Le principal <strong>inconvénient de l&apos;ITI</strong> est la perte de surface habitable :
            un doublage de 130 mm (ossature + isolant + plaque de plâtre) représente environ
            <strong> 5 à 9 m²</strong> perdus pour une maison de 100 m² à quatre façades. À peser
            en regard des économies d&apos;énergie annuelles de 400 à 700 €.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '20–25 %', label: 'des déperditions passent par les murs (maison non isolée)', color: 'blue' },
          { value: '75 €/m²', label: 'MaPrimeRénov\' max pour l\'isolation des murs (tranche Bleu)', color: 'green' },
          { value: '5,5 %', label: 'TVA réduite sur fournitures + main-d\'œuvre ITI', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : COMPARATIF ISOLANTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 5 meilleurs isolants thermiques pour les murs par l&apos;intérieur en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          La performance d&apos;un isolant pour mur intérieur se mesure principalement par sa{' '}
          <strong>conductivité thermique λ (lambda)</strong>, exprimée en W/m·K. Plus λ est faible,
          plus l&apos;isolant est performant à épaisseur égale. La <strong>résistance thermique R</strong>{' '}
          (en m²·K/W) se calcule simplement : R = épaisseur (m) ÷ λ. L&apos;objectif BBC rénovation pour
          les murs est R≥3,7 m²·K/W.
        </p>

        <ArticleTable {...ISOLANTS_TABLE} title="Comparatif des 5 meilleurs isolants pour murs par l'intérieur" />

        <ArticleCallout type="tip" title="Laine de roche ou laine de verre : quelle différence ?">
          <p>
            La <strong>laine de roche</strong> est légèrement plus dense (densité 35-50 kg/m³) et offre une
            meilleure résistance à la compression et à l&apos;humidité. Elle est aussi incombustible jusqu&apos;à
            1 000 °C (Euroclass A1), ce qui en fait le choix privilégié pour les murs à proximité de
            sources de chaleur. La <strong>laine de verre</strong> est un peu moins dense, souvent moins
            chère, et plus légère à manipuler. Les deux sont parfaitement adaptées à l&apos;ITI.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : ÉPAISSEUR ET RÉSISTANCE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Épaisseur recommandée et impact sur la surface habitable
        </h2>

        <ArticleFullImage
          image="/images/blog/epaisseur-doublage-isolant-mur.png"
          alt="Schéma des couches d'un doublage mur intérieur : mur porteur, lame d'air, ossature métallique, laine de roche 120mm, pare-vapeur, plaque de plâtre BA13"
          caption="Coupe type d'un doublage ITI : mur porteur + lame d'air 10 mm + ossature 48 mm + isolant 80 mm + plaque plâtre 13 mm = 151 mm total"
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          En pratique, un doublage avec <strong>ossature métallique</strong> comprend plusieurs couches :
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">Doublage ossature + laine de roche 120 mm</h4>
            <p className="text-sm text-slate-600">
              Lame d&apos;air (10 mm) + ossature métal (48 mm) + laine de roche (120 mm) + plaque plâtre (13 mm) ={' '}
              <strong>191 mm total</strong>. Perte surfacique : ≈ 7 m² sur 4 façades de 100 m².
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">Panneau composite PSE + plaque plâtre</h4>
            <p className="text-sm text-slate-600">
              Panneau sandwich collé directement au mur : 120 mm PSE + 13 mm plaque = <strong>133 mm total</strong>.
              Solution idéale pour les petites surfaces (pas d&apos;ossature à poser).
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-2">Polyuréthane projeté 90 mm</h4>
            <p className="text-sm text-slate-600">
              Projection directe sur le mur + plaque plâtre sur rail : <strong>110 mm total</strong>.
              Meilleure option si l&apos;espace est contraint (couloir, pièce étroite).
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2">Ouate de cellulose soufflée 150 mm</h4>
            <p className="text-sm text-slate-600">
              Ossature bois (50 mm) + soufflage ouate (150 mm) + plaque plâtre (13 mm) = <strong>213 mm</strong>.
              Meilleur choix pour le confort hygrothermique et l&apos;inertie d&apos;été.
            </p>
          </div>
        </div>

        <ArticleCallout type="info" title="Règle pratique : la perte de surface habitable">
          <p>
            Pour une maison de 100 m² avec 4 façades extérieures (surface de murs ≈ 80 m² après déduction
            des fenêtres et portes), un doublage de 150 mm représente une perte d&apos;environ{' '}
            <strong>4 à 5 m²</strong> de surface habitable. Sur un appartement traversant avec seulement
            2 façades exposées, la perte est inférieure à 3 m².
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : PRIX ITI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix de l&apos;isolation des murs par l&apos;intérieur en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le coût de l&apos;ITI comprend la fourniture des matériaux, la pose de l&apos;ossature, la mise en œuvre
          de l&apos;isolant, le pare-vapeur et les finitions (plaque de plâtre, jointement). Les tarifs
          varient selon le matériau, la région et la complexité du chantier (dépose de meubles,
          reprises électriques).
        </p>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <span className="text-slate-700">{line.label}</span>
                <span className={`font-semibold text-lg ${line.isDeduction ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {line.amount}
                </span>
              </div>
            ))}
            <div className="border-t-2 border-emerald-300 pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-emerald-900 text-xl">{EXAMPLE_CALCULATION.total.label}</span>
              <span className="font-bold text-emerald-900 text-3xl">{EXAMPLE_CALCULATION.total.amount}</span>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Économies annuelles</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Retour sur investissement</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.roi}</p>
            </div>
          </div>
        </div>

        <ArticleCallout type="warning" title="Attention au prix trop bas">
          <p>
            Un devis inférieur à <strong>55 €/m²</strong> (TTC, fourniture et pose) doit alerter : il peut
            indiquer une épaisseur insuffisante (R&lt;3,7), l&apos;absence de pare-vapeur ou une ossature
            sous-dimensionnée. Or ces points sont précisément vérifiés lors du contrôle par le bureau
            de contrôle de l&apos;artisan RGE — un isolant mal posé ne sera pas pris en charge par MaPrimeRénov&apos;.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : LES AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les aides financières pour l&apos;ITI en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;isolation des murs intérieurs est l&apos;un des travaux les <strong>mieux subventionnés</strong> en
          2026. Toutes les aides ci-dessous sont cumulables entre elles, à condition que le chantier soit
          réalisé par un artisan certifié <strong>RGE</strong> (Reconnu Garant de l&apos;Environnement).
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides cumulables pour l'isolation des murs par l'intérieur en 2026" />

        <ArticleCallout type="success" title="Qui peut prétendre à MaPrimeRénov' isolation des murs ?">
          <p>
            MaPrimeRénov&apos; est accessible à tous les propriétaires (occupants ou bailleurs) de logements
            construits depuis plus de <strong>15 ans</strong>. Le montant varie selon les revenus du foyer
            (barème ANAH 2026) : Bleu (très modestes, 75 €/m²), Jaune (modestes, 60 €/m²),
            Violet (intermédiaires, 40 €/m²), Rose (supérieurs, 15 €/m²). Plafond : 150 m² de murs isolés.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 6 : ÉTAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment poser un doublage isolant : guide pas à pas
        </h2>

        <ArticleImageSection
          image="/images/blog/pose-ossature-doublage-mur.png"
          alt="Technicien RGE posant l'ossature métallique pour doublage isolant thermique mur intérieur"
          imagePosition="left"
        >
          <p>
            La technique la plus courante est le <strong>doublage sur ossature métallique</strong> avec
            panneaux de laine de roche semi-rigides. Elle permet de gérer facilement les décrochements
            (tableaux de fenêtres, prises électriques, radiateurs) et offre une finition impeccable.
          </p>
          <p className="mt-3">
            Pour les <strong>murs humides ou irréguliers</strong>, la projection de polyuréthane est
            préférable : la mousse adhère directement au support et comble tous les défauts de planéité,
            éliminant les ponts thermiques ponctuels.
          </p>
          <p className="mt-3">
            Dans tous les cas, la <strong>qualité de la pose du pare-vapeur</strong> est déterminante :
            c&apos;est lui qui empêche la condensation à l&apos;intérieur de l&apos;isolant, principale cause de
            dégradation prématurée des doublages.
          </p>
        </ArticleImageSection>

        <ArticleSteps steps={STEPS} />

        {/* ---- SECTION 7 : PONTS THERMIQUES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Ponts thermiques : le point faible de l&apos;ITI
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;ITI ne supprime pas les <strong>ponts thermiques de liaison</strong> : là où le plancher
          béton traverse le mur extérieur (refend de dalle), l&apos;isolation est interrompue. Ces zones
          restent froides en hiver et peuvent générer de la condensation superficielle (moisissures
          aux angles bas de murs). C&apos;est la différence fondamentale avec l&apos;ITE qui enveloppe le bâtiment
          dans un manteau continu.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Solutions pour <strong>limiter les ponts thermiques</strong> avec l&apos;ITI :
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
            <h4 className="font-bold text-sky-800 mb-2">Retour d&apos;isolation sur 50 cm</h4>
            <p className="text-sm text-slate-600">
              Prolonger le doublage isolant sur 50 cm le long des planchers et plafonds à chaque jonction.
              Réduit de 40 à 60 % les déperditions par pont thermique de liaison.
            </p>
          </div>
          <div className="bg-violet-50 rounded-xl p-5 border border-violet-100">
            <h4 className="font-bold text-violet-800 mb-2">Panneau composite sans ossature</h4>
            <p className="text-sm text-slate-600">
              Coller directement le panneau PSE + plâtre au mur. L&apos;absence d&apos;ossature métallique
              supprime les ponts thermiques ponctuels liés aux vis de fixation.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2">Polyuréthane projeté continu</h4>
            <p className="text-sm text-slate-600">
              La mousse PU adhère à l&apos;ensemble du support sans interruption. Associée à un rail posé
              sur l&apos;isolant, elle élimine les ponts thermiques d&apos;ossature.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-2">Combinaison ITI + ITE partielle</h4>
            <p className="text-sm text-slate-600">
              Pour les maisons individuelles, isoler les façades principales par l&apos;extérieur et les
              murs mitoyens par l&apos;intérieur optimise la performance globale.
            </p>
          </div>
        </div>

        {/* ---- SECTION 8 : ITI vs ITE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          ITI ou ITE : quand choisir l&apos;une plutôt que l&apos;autre ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces deux techniques ne s&apos;excluent pas mutuellement, mais répondent à des situations différentes.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Critère</th>
                <th className="text-left p-3 font-semibold text-emerald-700 border border-slate-200">ITI (par l&apos;intérieur)</th>
                <th className="text-left p-3 font-semibold text-sky-700 border border-slate-200">ITE (par l&apos;extérieur)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Applicable en copropriété", "✅ Oui, sans accord AG", "⚠️ Vote en AG requis"],
                ["Perte de surface habitable", "⚠️ 5–9 m² pour 100 m²", "✅ Aucune"],
                ["Ponts thermiques", "⚠️ Partiels (dalle, refend)", "✅ Supprimés"],
                ["Performance énergétique", "Bonne (R≥3,7 atteint)", "✅ Excellente"],
                ["Coût posé", "80–120 €/m²", "120–180 €/m²"],
                ["Habitabilité pendant travaux", "⚠️ Pièce par pièce", "✅ Logement libre"],
                ["Autorisation urbanisme", "✅ Non requise", "⚠️ DP ou PC selon cas"],
              ].map(([critere, iti, ite], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="p-3 font-medium text-slate-800 border border-slate-200">{critere}</td>
                  <td className="p-3 text-slate-700 border border-slate-200">{iti}</td>
                  <td className="p-3 text-slate-700 border border-slate-200">{ite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ArticleCallout type="tip" title="En résumé : quel isolant choisir ?">
          <p>
            Si vous êtes en <strong>appartement ou copropriété</strong>, l&apos;ITI avec laine de roche est
            la solution standard : performance prouvée, aides complètes, artisans RGE disponibles.
            Si vous avez des <strong>contraintes d&apos;épaisseur</strong> (couloir &lt; 2 m, pièce déjà petite),
            optez pour le polyuréthane projeté. Si vous valorisez le confort d&apos;été autant que l&apos;hiver
            et préférez les matériaux biosourcés, l&apos;ouate de cellulose est le meilleur choix.
          </p>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Obtenez un devis gratuit pour l'isolation de vos murs en Île-de-France"
          description="Nos artisans certifiés RGE réalisent votre audit thermique, montent votre dossier MaPrimeRénov' et vous proposent un devis complet sous 48h. Intervention sur toute l'Île-de-France."
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
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
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
            href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Remplacer sa chaudière gaz par une PAC en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Isolation des murs par ville en Île-de-France
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Créteil", slug: "creteil" },
              { name: "Versailles", slug: "versailles" },
              { name: "Vincennes", slug: "vincennes" },
              { name: "Meaux", slug: "meaux" },
              { name: "Massy", slug: "massy" },
              { name: "Champigny-sur-Marne", slug: "champigny-sur-marne" },
              { name: "Saint-Maur-des-Fossés", slug: "saint-maur-des-fosses" },
              { name: "Corbeil-Essonnes", slug: "corbeil-essonnes" },
              { name: "Noisy-le-Grand", slug: "noisy-le-grand" },
              { name: "Évry-Courcouronnes", slug: "evry-courcouronnes" },
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
