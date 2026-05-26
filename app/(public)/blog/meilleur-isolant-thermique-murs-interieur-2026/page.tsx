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
      url: 'https://www.greenter.fr/images/blog/isolation-murs-pose-laine-roche.jpg',
      width: 1200,
      height: 630,
      alt: "Pose de laine de roche entre montants métalliques pour l'isolation thermique des murs par l'intérieur",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/isolation-murs-pose-laine-roche.jpg'],
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
        image="https://www.greenter.fr/images/blog/isolation-murs-pose-laine-roche.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/isolation-murs-pose-laine-roche.jpg"
        heroAlt="Technicien insérant un panneau de laine de roche entre les montants métalliques d'un doublage mur intérieur"
        breadcrumbs={breadcrumbs}
      >
        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Dans une maison construite avant 1990, les <strong>murs représentent 20 à 25 % des
            déperditions thermiques</strong> totales. En hiver, ce sont eux qui refroidissent les pièces
            de vie et obligent le système de chauffage à tourner à plein régime. Pourtant, ils restent
            souvent négligés au profit de la toiture, dont les travaux sont plus simples et moins
            coûteux. Lorsqu&apos;on parle d&apos;isolation des murs, deux grandes familles s&apos;affrontent :
            l&apos;isolation par l&apos;extérieur (ITE) et l&apos;isolation par l&apos;intérieur (ITI). Cette dernière
            est souvent la seule option réaliste pour les appartements, les maisons mitoyennes ou
            les immeubles dont la façade ne peut pas être modifiée.
          </p>
          <p>
            Mais tous les isolants ne se valent pas. Entre la laine de roche, la laine de verre,
            le polystyrène expansé, le polyuréthane projeté et l&apos;ouate de cellulose, les différences
            de performance, d&apos;épaisseur et de prix sont significatives. Ce guide compare ces cinq
            matériaux, vous aide à choisir celui qui convient à votre situation, et fait le point
            sur les aides financières disponibles en 2026 — dont <strong>MaPrimeRénov&apos;</strong>,
            qui rembourse jusqu&apos;à <strong>75 €/m²</strong> pour les ménages modestes.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Comparatif des 5 meilleurs isolants pour murs intérieurs (λ, épaisseur, prix)</li>
            <li>Pourquoi l&apos;ITI est souvent le seul choix possible en appartement et copropriété</li>
            <li>Impact réel sur la surface habitable et la facture de chauffage</li>
            <li>Toutes les aides 2026 cumulables : MaPrimeRénov&apos;, CEE, éco-PTZ, TVA 5,5 %</li>
            <li>Guide de pose pas à pas et erreurs à éviter (ponts thermiques, humidité)</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI L'ITI ? ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi choisir l&apos;isolation des murs par l&apos;intérieur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;<strong>isolation thermique par l&apos;intérieur</strong> consiste à créer un doublage isolant
          sur la face intérieure des murs extérieurs. Contrairement à l&apos;ITE qui enveloppe le bâtiment
          depuis l&apos;extérieur, l&apos;ITI ne modifie en rien l&apos;aspect de la façade. C&apos;est sa force
          principale, et c&apos;est ce qui en fait la solution de référence dans de nombreux contextes
          urbains et réglementaires.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          En copropriété, les façades sont des parties communes : leur modification nécessite un vote
          en assemblée générale, souvent difficile à obtenir. L&apos;ITI, en revanche, relève uniquement
          des parties privatives de chaque appartement — aucune autorisation n&apos;est requise auprès
          du syndic. De même, dans les zones protégées (secteurs sauvegardés, abords de monuments
          historiques), l&apos;administration peut refuser ou contraindre fortement les travaux en façade,
          tandis que l&apos;intervention par l&apos;intérieur reste totalement libre.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-murs-laine-roche-ossature-bois.jpg"
          alt="Panneaux de laine de roche installés entre montants en bois avec pare-vapeur gris visible à droite"
          imagePosition="right"
        >
          <p>
            Pour les maisons individuelles mitoyennes, c&apos;est une autre logique : les murs de refend
            partagés avec le voisin ne peuvent pas recevoir d&apos;isolation côté extérieur sans accord
            préalable. L&apos;ITI permet d&apos;agir sur ces murs sans impliquer personne d&apos;autre.
          </p>
          <p className="mt-3">
            Côté budget, l&apos;ITI est aussi moins lourde que l&apos;ITE. Comptez en moyenne 80 à 120 €/m²
            posé pour un doublage laine de roche, contre 120 à 180 €/m² pour une ITE avec bardage
            ou enduit. La différence s&apos;explique par l&apos;absence d&apos;échafaudage et par la simplicité
            logistique de travailler pièce par pièce depuis l&apos;intérieur.
          </p>
          <p className="mt-3">
            Son principal défaut reste la <strong>perte de surface habitable</strong> : un doublage
            typique de 130 à 160 mm empiète sur la surface de chaque pièce. Pour une maison de
            100 m² avec quatre façades exposées, cela représente 5 à 9 m² perdus — une donnée à
            intégrer sérieusement avant de se lancer.
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

        <p className="text-slate-700 leading-relaxed mb-4">
          La performance d&apos;un isolant se mesure par sa <strong>conductivité thermique λ (lambda)</strong>,
          exprimée en W/m·K. Plus λ est faible, plus le matériau est isolant à épaisseur égale.
          La <strong>résistance thermique R</strong> (en m²·K/W) se calcule simplement : R = épaisseur
          en mètres ÷ λ. Pour l&apos;isolation des murs en rénovation, l&apos;objectif BBC rénovation est
          R ≥ 3,7 m²·K/W — c&apos;est le seuil à atteindre pour déclencher les aides MaPrimeRénov&apos;.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Chaque matériau a ses avantages selon le contexte. La laine de roche est polyvalente et
          incombustible. Le polyuréthane projeté est imbattable quand l&apos;épaisseur disponible est
          faible. L&apos;ouate de cellulose séduit ceux qui privilégient les matériaux biosourcés et
          le confort d&apos;été. Voici le comparatif complet.
        </p>

        <ArticleTable {...ISOLANTS_TABLE} title="Comparatif des 5 meilleurs isolants pour murs par l'intérieur" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          La <strong>laine de roche en panneaux semi-rigides</strong> reste l&apos;option la plus utilisée
          par les artisans RGE en Île-de-France. Sa densité (35 à 50 kg/m³) lui confère une bonne
          résistance à la compression, une excellente tenue à l&apos;humidité et des performances
          acoustiques appréciables — utile en ville, où l&apos;isolation phonique compte autant que
          thermique. Certifiée Euroclass A1, elle est incombustible jusqu&apos;à 1 000 °C, ce qui en
          fait le choix de référence dans les cuisines ou près de sources de chaleur.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>laine de verre</strong> est légèrement moins dense et souvent moins chère, mais
          ses performances sont similaires. Si vous cherchez à optimiser le budget sans sacrifier
          la performance, c&apos;est un excellent choix. Le <strong>polystyrène expansé (PSE)</strong>
          est quant à lui imputrescible, facile à découper et très léger — idéal pour les
          auto-rénovateurs, même si ces derniers ne pourront pas prétendre aux aides principales.
          Enfin, la <strong>mousse polyuréthane projetée</strong> se distingue par son rapport
          résistance/épaisseur exceptionnel : elle adhère directement au support, supprime les
          ponts thermiques et permet d&apos;atteindre R = 3,7 en seulement 90 mm.
        </p>

        <ArticleCallout type="tip" title="Laine de roche ou laine de verre : quelle différence concrète ?">
          <p>
            Pour un doublage mural standard, la différence de performance est minime — quelques
            millimètres d&apos;épaisseur supplémentaire pour la laine de verre. La vraie différence
            se joue sur la durabilité en milieu humide (avantage laine de roche) et sur le prix
            (avantage laine de verre, en général 10 à 15 % moins chère). Dans une salle de bain
            ou un sous-sol, optez sans hésiter pour la laine de roche.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : ÉPAISSEUR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle épaisseur d&apos;isolant pour les murs intérieurs ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La question de l&apos;épaisseur est centrale pour l&apos;ITI, car chaque centimètre pris sur le mur
          est un centimètre perdu sur la surface habitable. Il faut donc trouver le bon équilibre
          entre performance thermique et impact sur l&apos;espace intérieur.
        </p>

        <ArticleFullImage
          image="/images/blog/isolation-murs-pose-ouate-cellulose.webp"
          alt="Artisan posant des panneaux d'ouate de cellulose grise entre montants métalliques pour isolation thermique mur intérieur"
          caption="Pose de panneaux d'ouate de cellulose entre montants métalliques — un isolant biosourcé aux excellentes performances thermiques et hygrothermiques."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          En pratique, un doublage avec ossature métallique comprend plusieurs couches superposées :
          une lame d&apos;air de 10 mm entre le mur porteur et l&apos;ossature, les montants métalliques de
          48 mm dans lesquels est glissé l&apos;isolant, puis une plaque de plâtre BA13 de 13 mm côté
          intérieur. L&apos;épaisseur totale avoisine donc 130 à 190 mm selon le matériau choisi.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour un appartement dont les pièces font moins de 10 m², cette perte sur quatre murs
          peut sembler significative. Dans ce cas, deux solutions permettent de réduire l&apos;empreinte :
          le <strong>panneau composite PSE + plaque de plâtre</strong> collé directement au mur
          (sans ossature, gain de 50 mm), ou la <strong>mousse polyuréthane projetée</strong>
          qui atteint R = 3,7 en seulement 90 mm, soit la solution la plus mince du marché.
        </p>

        <ArticleCallout type="info" title="Règle pratique : combien de surface perdue ?">
          <p>
            Pour une maison de 100 m² avec quatre façades exposées (surface de murs ≈ 80 m²
            après fenêtres et portes), un doublage de 150 mm représente une perte d&apos;environ{' '}
            <strong>4 à 5 m² de surface habitable</strong>. Sur un appartement traversant avec
            seulement deux façades exposées, la perte est inférieure à 3 m².
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : PRIX ITI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix de l&apos;isolation des murs par l&apos;intérieur en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le coût d&apos;un chantier d&apos;isolation thermique par l&apos;intérieur dépend de plusieurs facteurs :
          le matériau choisi, la surface à traiter, la complexité des reprises (électricité,
          radiateurs, encadrements de fenêtres) et bien sûr la région. En Île-de-France, les
          prix sont généralement 10 à 20 % plus élevés qu&apos;en province.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          À titre de repère, un doublage laine de roche sur ossature métallique, fourniture et
          pose comprises, revient entre <strong>80 et 120 € par m²</strong> en région parisienne.
          La projection de polyuréthane est plus chère (110 à 160 €/m²) mais nécessite moins
          d&apos;épaisseur et peut être réalisée plus rapidement. Les panneaux composites PSE collés
          directement au mur sont les moins coûteux (60 à 90 €/m²), à condition que le support
          soit suffisamment plan.
        </p>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
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

        <p className="text-slate-700 leading-relaxed mb-4">
          Un devis inférieur à 55 €/m² TTC (fourniture et pose) doit alerter. Il peut indiquer une
          épaisseur insuffisante pour atteindre R = 3,7, l&apos;absence de pare-vapeur, ou une ossature
          sous-dimensionnée. Or ces points sont précisément vérifiés lors du contrôle qualité de
          l&apos;artisan RGE — un isolant mal posé sera refusé par MaPrimeRénov&apos;.
        </p>

        {/* ---- SECTION 5 : LES AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les aides financières pour l&apos;isolation des murs intérieurs en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          2026 est une excellente année pour isoler ses murs. L&apos;isolation des murs est l&apos;un des
          travaux les mieux subventionnés dans le cadre de la rénovation énergétique, et les
          quatre dispositifs ci-dessous sont tous <strong>cumulables entre eux</strong>.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La condition indispensable pour accéder à MaPrimeRénov&apos; et au Coup de pouce CEE est de
          faire réaliser les travaux par un artisan certifié <strong>RGE</strong> (Reconnu Garant
          de l&apos;Environnement). Cette certification garantit que l&apos;entreprise maîtrise les techniques
          d&apos;isolation et que les travaux respecteront les exigences de performance thermique.
          La TVA à 5,5 % est quant à elle accordée sans condition de ressources ni d&apos;artisan RGE,
          dès lors que le logement a plus de deux ans.
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides cumulables pour l'isolation des murs par l'intérieur en 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          MaPrimeRénov&apos; est accessible à tous les propriétaires (occupants ou bailleurs) de
          logements construits depuis plus de 15 ans. Les montants varient selon les revenus du
          foyer, définis par le barème ANAH 2026 : de 15 €/m² pour les ménages aux revenus
          supérieurs (tranche Rose) jusqu&apos;à 75 €/m² pour les ménages très modestes (tranche Bleu),
          dans la limite de 150 m² de murs isolés. Pour un ménage Bleu qui isole 120 m² de murs,
          cela représente jusqu&apos;à <strong>9 000 € de prime</strong>.
        </p>

        <ArticleCallout type="info" title="Astuce : combinez MaPrimeRénov' et éco-PTZ">
          <p>
            L&apos;éco-prêt à taux zéro (éco-PTZ) peut financer jusqu&apos;à 50 000 € de travaux à 0 %
            d&apos;intérêt, sur une durée pouvant aller jusqu&apos;à 20 ans. Il est cumulable avec toutes
            les autres aides, y compris MaPrimeRénov&apos;. Pour une isolation des murs combinée à
            d&apos;autres travaux (toiture, fenêtres, chauffage), c&apos;est souvent la solution la plus
            adaptée pour lisser le reste à charge sur la durée.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 6 : ÉTAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment se déroule la pose d&apos;un doublage isolant ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La technique la plus répandue est le <strong>doublage sur ossature métallique</strong>
          avec panneaux de laine de roche semi-rigides. Elle permet de gérer facilement les
          décrochements — tableaux de fenêtres, boîtiers de prises, radiateurs — et offre une
          finition soignée directement peinturable ou carrelable.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Un chantier d&apos;isolation de murs par l&apos;intérieur se fait généralement pièce par pièce,
          ce qui vous permet de rester dans le logement pendant les travaux. Comptez en moyenne
          une journée par pièce pour un artisan expérimenté, plus une demi-journée de reprise
          et de jointoyage. L&apos;ensemble d&apos;une maison de 100 m² (quatre façades) s&apos;étale sur
          cinq à sept jours de chantier.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-murs-laine-verre-ossature-metal.jpg"
          alt="Artisan posant de la laine de verre jaune entre montants métalliques fixés sur un mur en briques — isolation thermique mur intérieur"
          imagePosition="left"
        >
          <p>
            Avant toute chose, l&apos;artisan doit vérifier l&apos;état du mur existant. Un mur humide —
            qu&apos;il s&apos;agisse de remontées capillaires, d&apos;infiltrations ou de condensation — doit
            absolument être traité avant d&apos;être isolé. Poser un doublage sur un mur humide est
            la principale cause de sinistres : l&apos;humidité emprisonnée dans l&apos;isolant entraîne
            moisissures, dégradation du plâtre et, à terme, problèmes de santé pour les
            occupants.
          </p>
          <p className="mt-3">
            Une fois le support sain et préparé, l&apos;ossature est tracée et fixée. L&apos;isolant est
            glissé entre les montants, le pare-vapeur est déroulé et agrafé soigneusement côté
            intérieur, puis les plaques de plâtre viennent fermer l&apos;ensemble. La qualité de
            la pose du <strong>pare-vapeur</strong> est déterminante : chaque perforation non
            colmatée est un point de passage pour la vapeur d&apos;eau, qui risque de condenser
            dans l&apos;isolant.
          </p>
        </ArticleImageSection>

        <ArticleSteps steps={STEPS} />

        {/* ---- SECTION 7 : PONTS THERMIQUES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Ponts thermiques : le point faible de l&apos;ITI
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;ITI améliore considérablement l&apos;isolation des parois, mais elle ne supprime pas les
          <strong> ponts thermiques de liaison</strong>. Ces zones sont les endroits où le béton
          ou la maçonnerie traverse le plan d&apos;isolation de façon continue — typiquement au niveau
          des dalles de plancher, des refends, ou des linteaux de fenêtres. Ces points restent
          froids en hiver et peuvent provoquer de la condensation superficielle, visible sous
          forme de taches sombres aux angles bas des murs ou sur les tableaux de fenêtres.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est la différence fondamentale avec l&apos;isolation par l&apos;extérieur, qui enveloppe
          le bâtiment dans un manteau continu et supprime la quasi-totalité des ponts thermiques.
          Une ITE bien réalisée peut réduire les déperditions par ponts thermiques de 80 à 90 %,
          là où une ITI les réduit de 40 à 60 % — déjà très significatif, mais pas totalement
          supprimé.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour limiter au maximum ce phénomène avec l&apos;ITI, la technique consiste à prolonger
          le doublage isolant sur au moins <strong>50 cm le long des planchers et plafonds</strong>
          à chaque jonction avec une paroi froide. Cette continuité d&apos;isolation casse le
          chemin thermique et réduit nettement les déperditions résiduelles. Les artisans RGE
          connaissent ces détails d&apos;exécution et les intègrent systématiquement dans un chantier
          bien conduit.
        </p>

        {/* ---- SECTION 8 : ITI vs ITE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          ITI ou ITE : comment choisir ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour une maison individuelle sans contrainte architecturale, l&apos;ITE est généralement
          la solution la plus performante : elle supprime les ponts thermiques, ne réduit pas
          la surface intérieure et peut être réalisée sans avoir à vider les pièces. Son coût
          plus élevé est souvent compensé par une meilleure performance et un confort de chantier
          supérieur.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          En revanche, dès que vous êtes en copropriété, en zone protégée ou sur une maison
          mitoyenne, l&apos;<strong>ITI s&apos;impose comme la seule option praticable</strong>. Elle
          reste aussi le meilleur choix lorsqu&apos;on souhaite n&apos;isoler qu&apos;une partie du logement
          (par exemple une façade nord particulièrement froide) sans engager un chantier complet.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces deux techniques ne s&apos;excluent pas mutuellement. Pour les maisons individuelles
          qui ont un mur mitoyen d&apos;un côté et une façade libre de l&apos;autre, la combinaison
          ITI côté mitoyen + ITE côté jardin est souvent la configuration optimale, à la fois
          sur le plan de la performance et du budget.
        </p>

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
