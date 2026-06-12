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
  ARTICLE_META, EPAISSEURS_TABLE, SEUILS_TABLE, AIDES_TABLE,
  EXAMPLE_CALCULATION, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-mur-interieur-quelle-epaisseur'

export const metadata: Metadata = {
  title: "Isolation mur intérieur : quelle épaisseur d'isolant en 2026 ? | Greenter",
  description:
    "Quelle épaisseur d'isolant pour l'isolation de vos murs par l'intérieur ? Formule R = e/λ, épaisseurs par matériau (laine de verre, laine de roche, PSE, polyuréthane), seuils MaPrimeRénov' 2026 et comparatif complet.",
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: "Isolation mur intérieur : quelle épaisseur choisir en 2026 ?",
    description:
      "Guide complet : épaisseurs d'isolant pour murs intérieurs selon le matériau, résistance thermique minimale R ≥ 2,5 à 3,7, aides MaPrimeRénov' 2026.",
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/isolation-mur-interieur-mousse-polyurethane.jpg',
      width: 1200,
      height: 800,
      alt: "Technicien appliquant la mousse polyuréthane projetée pour l'isolation d'un mur intérieur",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Isolation mur intérieur : quelle épaisseur choisir en 2026 ?",
    description:
      "Guide complet : épaisseurs d'isolant pour murs intérieurs selon le matériau, résistance thermique minimale, aides 2026.",
    images: ['https://www.greenter.fr/images/blog/isolation-mur-interieur-mousse-polyurethane.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Isolation mur intérieur quelle épaisseur", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function IsolationMurInterieurQuelleEpaisseur() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Isolation mur intérieur : quelle épaisseur d'isolant choisir en 2026 ?"
        description="Guide complet sur l'épaisseur d'isolant pour l'isolation des murs par l'intérieur : formule R = e/λ, comparatif laine de verre, laine de roche, PSE et polyuréthane, seuils réglementaires et aides MaPrimeRénov'."
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: ARTICLE_META.author, url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/isolation-mur-interieur-mousse-polyurethane.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2600}
      />

      <ArticleLayout
        title="Isolation mur intérieur : quelle épaisseur d'isolant choisir en 2026 ?"
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        author={ARTICLE_META.author}
        heroImage="/images/blog/isolation-mur-interieur-mousse-polyurethane.jpg"
        heroImageAlt="Technicien certifié RGE appliquant de la mousse polyuréthane projetée pour l'isolation thermique d'un mur intérieur"
      >
        {/* ── INTRO ───────────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            C&apos;est la question que pose tout propriétaire ou locataire avant de se lancer dans{' '}
            <strong>l&apos;isolation des murs par l&apos;intérieur</strong> : combien de centimètres
            d&apos;isolant faut-il réellement poser pour faire une <strong>bonne isolation</strong> ?
            La réponse n&apos;est pas unique — elle dépend du <strong>matériau isolant</strong> choisi,
            des objectifs de <strong>performance thermique</strong> et des seuils à atteindre pour
            déclencher les aides de l&apos;État.
          </p>
          <p>
            En pratique, l&apos;<strong>isolation thermique</strong> d&apos;un mur intérieur repose sur
            une formule simple : la <strong>résistance thermique R</strong> (en m²·K/W) est égale
            à l&apos;épaisseur de l&apos;isolant (en mètres) divisée par sa{' '}
            <strong>conductivité thermique λ (lambda)</strong>. Plus λ est faible,
            plus le matériau est isolant — et moins d&apos;épaisseur est nécessaire pour atteindre
            le même R. C&apos;est pourquoi le polyuréthane projeté (λ = 0,024) nécessite
            seulement 90 mm là où la laine de verre (λ = 0,032) en requiert 120 mm.
          </p>
          <p>
            Ce guide détaille, pour chaque type d&apos;isolant disponible sur le marché, l&apos;
            <strong>épaisseur d&apos;isolant</strong> nécessaire pour atteindre les trois seuils
            clés en 2026 : le minimum exigé par MaPrimeRénov&apos; (R ≥ 2,5), l&apos;objectif BBC
            rénovation (R ≥ 3,7) et la haute performance (R ≥ 4,5). Vous trouverez aussi la
            vérité sur les <strong>isolants minces</strong>, la question des{' '}
            <strong>ponts thermiques</strong>, et un calcul d&apos;économies chiffré avec les aides
            disponibles.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La formule pour calculer l&apos;épaisseur d&apos;isolant dont vous avez besoin</li>
            <li>Tableau complet : épaisseurs pour R = 2,5 / 3,7 / 4,5 selon le matériau</li>
            <li>Seuils réglementaires 2026 (MaPrimeRénov&apos;, BBC rénovation) par type de paroi</li>
            <li>Vérité sur les isolants minces et les isolants naturels</li>
            <li>Impact de l&apos;épaisseur sur la surface habitable et les ponts thermiques</li>
            <li>Toutes les aides cumulables : MaPrimeRénov&apos;, CEE, éco-PTZ, TVA 5,5 %</li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 1 : POURQUOI ISOLER ────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi isoler un mur intérieur : les enjeux thermiques et économiques
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans une maison construite avant 1975 (avant la première réglementation thermique française),{' '}
          <strong>les murs non isolés représentent 20 à 25 % des pertes de chaleur totales</strong>.
          Ce n&apos;est pas le poste de déperdition le plus important — les combles perdus représentent
          jusqu&apos;à 30 % — mais c&apos;est souvent le plus difficile à corriger et celui qui a le plus
          d&apos;impact sur le confort thermique ressenti, car ce sont les parois avec lesquelles les
          occupants sont en contact direct.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-mur-interieur-laine-minerale-ossature.jpg"
          alt="Pose de laine minérale entre montants métalliques d'ossature pour isolation thermique d'un mur intérieur existant"
          imagePosition="right"
        >
          <p>
            Un mur non isolé en béton plein ou en briques creuses transmet le froid de
            l&apos;extérieur directement vers l&apos;intérieur. La paroi reste froide en hiver, ce qui
            crée un <strong>effet de paroi froide</strong> : même si l&apos;air de la pièce est
            à 20 °C, le rayonnement thermique de la paroi fait que les occupants ressentent
            un inconfort, et le système de chauffage doit compenser en montant davantage
            en température.
          </p>
          <p className="mt-3">
            <strong>Limiter les pertes de chaleur</strong> par les murs, c&apos;est donc à la fois
            réduire la consommation énergétique et améliorer le{' '}
            <strong>confort thermique</strong> hivernal et estival. En été, un mur bien isolé
            ralentit aussi la pénétration de la chaleur vers l&apos;intérieur — surtout avec
            des matériaux à forte inertie comme la laine de roche ou la fibre de bois.
          </p>
          <p className="mt-3">
            Pour l&apos;<strong>isolation des murs par l&apos;intérieur</strong> (ITI), la solution
            consiste à créer un doublage isolant sur la face intérieure des murs extérieurs,
            sans toucher à la façade. C&apos;est la technique de référence pour les appartements
            en copropriété, les maisons mitoyennes, et tous les bâtiments dont la façade
            ne peut pas être modifiée.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '20–25 %', label: 'des déperditions thermiques passent par les murs (maison non isolée)', color: 'blue' },
          { value: '30 %', label: 'des déperditions par les combles — priorité n°1 avant les murs', color: 'blue' },
          { value: '75 €/m²', label: 'MaPrimeRénov\' max pour isolation des murs (tranche Bleu 2026)', color: 'green' },
        ]} />

        {/* ── SECTION 2 : LA FORMULE ─────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          La formule clé : comment calculer l&apos;épaisseur d&apos;isolant
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Toute la question de <strong>quelle épaisseur d&apos;isolant choisir</strong> repose sur
          une équation fondamentale de la physique thermique :
        </p>

        <div className="my-6 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <p className="text-2xl font-black text-blue-900 mb-2">R = e ÷ λ</p>
          <p className="text-slate-600 text-sm">
            <strong>R</strong> = résistance thermique (m²·K/W) ·{' '}
            <strong>e</strong> = épaisseur de l&apos;isolant (en mètres) ·{' '}
            <strong>λ (lambda)</strong> = conductivité thermique du matériau (W/m·K)
          </p>
        </div>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>conductivité thermique du matériau</strong> λ mesure sa capacité à conduire
          la chaleur : plus λ est faible, <strong>plus le matériau est isolant</strong> à épaisseur
          égale. La laine de verre a λ ≈ 0,032 W/m·K ; la mousse polyuréthane projetée descend
          à 0,024 W/m·K. Pour calculer{' '}
          <strong>l&apos;épaisseur d&apos;isolant</strong> nécessaire, on retourne simplement la formule :
        </p>

        <div className="my-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <p className="text-2xl font-black text-emerald-900 mb-2">e = R cible × λ</p>
          <p className="text-slate-600 text-sm">
            Exemple : viser R = 3,7 avec laine de verre (λ = 0,032) →{' '}
            <strong>e = 3,7 × 0,032 = 0,118 m ≈ 120 mm</strong>
          </p>
        </div>

        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est aussi simple que ça. La difficulté réside dans le choix du R cible
          et du matériau adapté à votre situation. En 2026, trois niveaux de{' '}
          <strong>résistance thermique</strong> sont à connaître pour l&apos;
          <strong>isolation des murs par l&apos;intérieur</strong> :
        </p>

        <ul className="space-y-3 mb-6 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <span><strong>R ≥ 2,5 m²·K/W</strong> — seuil minimal pour déclencher MaPrimeRénov&apos; et le Coup de pouce CEE (depuis la réforme 2024)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <span><strong>R ≥ 3,7 m²·K/W</strong> — objectif BBC rénovation, recommandé pour maximiser les économies d&apos;énergie</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <span><strong>R ≥ 4,5 m²·K/W</strong> — haute performance, pertinent pour les passoires thermiques (DPE F ou G)</span>
          </li>
        </ul>

        <ArticleCallout type="tip" title="Astuce : arrondissez toujours à l'épaisseur commerciale supérieure">
          <p>
            Les isolants sont vendus en épaisseurs standard : 80, 100, 120, 140, 160 mm.
            Si votre calcul donne 118 mm, commandez du 120 mm. Si votre résultat est 89 mm,
            prenez du 100 mm pour une marge de sécurité et une meilleure{' '}
            <strong>performance thermique</strong> réelle.
          </p>
        </ArticleCallout>

        {/* ── SECTION 3 : TABLEAU ÉPAISSEURS ─────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle épaisseur d&apos;isolant pour chaque matériau ? Tableau comparatif 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le tableau suivant récapitule, pour les principaux{' '}
          <strong>matériaux isolants</strong> disponibles sur le marché,
          l&apos;<strong>épaisseur d&apos;isolant</strong> nécessaire pour atteindre chacun des
          trois niveaux de <strong>résistance thermique</strong>. Il constitue la référence
          pratique pour <strong>choisir la bonne épaisseur</strong> selon votre objectif
          et votre budget.
        </p>

        <ArticleTable {...EPAISSEURS_TABLE} title="Épaisseur d'isolant pour mur intérieur selon le matériau et le R cible" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          La <strong>laine de verre</strong> est historiquement le matériau de référence pour
          l&apos;<strong>isolation mur intérieur</strong> : légère, peu chère (60 à 90 €/m² posé) et
          facile à mettre en œuvre, elle permet d&apos;atteindre R = 3,7 avec 120 mm d&apos;épaisseur.
          Ses performances acoustiques réduisent aussi les{' '}
          <strong>nuisances sonores</strong> entre pièces. Sa cousine, la{' '}
          <strong>laine de roche</strong>, offre des performances thermiques très proches
          mais avec une meilleure résistance à l&apos;humidité et une incombustibilité totale —
          avantages décisifs dans les cuisines, salles de bain ou sous-sols.
        </p>

        <ArticleFullImage
          image="/images/blog/isolation-mur-interieur-laine-roche-bois.jpg"
          alt="Pose de panneaux de laine de roche entre montants en bois pour isolation thermique d'un mur intérieur — résistance thermique R ≥ 3,7"
          caption="Laine de roche semi-rigide posée entre chevrons en bois. À 120–130 mm d'épaisseur, ce matériau atteint R = 3,7 m²·K/W — l'objectif BBC rénovation pour l'isolation des murs intérieurs."
        />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Pour les espaces où l&apos;<strong>espace intérieur</strong> est précieux — couloirs
          étroits, chambres de moins de 10 m² — le{' '}
          <strong>polyuréthane projeté</strong> s&apos;impose comme la solution technique la
          plus adaptée. Avec λ = 0,024 W/m·K, c&apos;est l&apos;isolant à la{' '}
          <strong>faible conductivité thermique</strong> la plus basse du marché courant.
          Il permet d&apos;atteindre R = 3,7 en seulement 89 mm, soit 30 mm de moins que
          la <strong>laine minérale</strong>. Sa projection directe sur le support supprime
          aussi les <strong>ponts thermiques</strong> liés à l&apos;ossature.
        </p>

        <ArticleCallout type="warning" title="Les isolants minces ne remplacent pas un isolant conventionnel">
          <p>
            Les <strong>isolants minces</strong> (panneaux réflecteurs multicouches, souvent
            vendus quelques millimètres d&apos;épaisseur) ne permettent pas d&apos;atteindre les
            résistances thermiques exigées pour l&apos;isolation des murs. Leur résistance thermique
            effective en conditions réelles est généralement inférieure à R = 1,5 — loin
            des R ≥ 2,5 requis pour MaPrimeRénov&apos;. Ils peuvent <em>compléter</em> un isolant
            conventionnel mais ne peuvent pas le remplacer. Les{' '}
            <strong>les isolants minces</strong> ne sont pas éligibles aux aides publiques
            pour l&apos;isolation des murs.
          </p>
        </ArticleCallout>

        {/* ── SECTION 4 : ISOLANTS NATURELS ───────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les isolants naturels : ouate de cellulose et fibre de bois
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>Les isolants naturels</strong> connaissent un essor important depuis quelques
          années, portés par la sensibilité écologique des propriétaires et les nouvelles
          exigences de la RE2020. Pour <strong>isoler un mur intérieur</strong>, deux matériaux
          biosourcés se démarquent : la{' '}
          <strong>laine minérale</strong> végétale (ouate de cellulose et fibre de bois)
          et les panneaux de chanvre ou de liège.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;<strong>ouate de cellulose</strong> en panneaux (λ = 0,040) nécessite
          148 mm pour atteindre R = 3,7 — soit 28 mm de plus que la laine de verre.
          Son atout majeur est son excellente{' '}
          <strong>performance thermique</strong> en été : sa forte densité (40 à 60 kg/m³)
          ralentit la pénétration de chaleur, apportant un confort d&apos;été nettement
          supérieur à celui des laines minérales légères. Elle régule aussi
          l&apos;humidité ambiante (effet tampon hygrique), ce qui en fait un excellent
          choix dans les régions à fort taux d&apos;humidité.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>fibre de bois</strong> (λ = 0,038) offre les mêmes avantages
          hygrothermiques avec une conductivité légèrement meilleure. À 141 mm,
          elle atteint R = 3,7. Son coût est plus élevé (100 à 150 €/m² posé),
          mais elle présente l&apos;avantage d&apos;être entièrement biosourcée, avec un bilan
          carbone négatif sur l&apos;ensemble du cycle de vie.
        </p>

        <ArticleCallout type="info" title="Performances thermiques en été : l'atout des matériaux lourds">
          <p>
            Pour <strong>choisir la bonne épaisseur</strong> et le bon matériau,
            il faut aussi penser au confort d&apos;été. Un isolant léger comme la laine
            de verre freine peu la chaleur estivale (déphasage thermique de 3 à 4h).
            La fibre de bois à 140 mm offre un déphasage de 10 à 12h — la chaleur
            de l&apos;après-midi n&apos;atteint l&apos;intérieur que le soir, quand la ventilation
            peut l&apos;évacuer. Déterminant dans la performance thermique estivale,
            surtout dans les logements sans climatisation.
          </p>
        </ArticleCallout>

        {/* ── SECTION 5 : SEUILS RÉGLEMENTAIRES ───────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Résistance thermique minimale : les standards à connaître en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour <strong>obtenir une résistance thermique</strong> suffisante et déclencher
          les aides de l&apos;État, il est indispensable de connaître les{' '}
          <strong>seuils de résistance thermique</strong> en vigueur.
          Ces seuils varient selon le type de paroi — les murs extérieurs
          n&apos;ont pas les mêmes exigences que les combles, les planchers bas ou la toiture.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour <strong>viser une résistance thermique</strong> adaptée à chaque paroi,
          voici le tableau de référence 2026 selon les normes en vigueur et
          les exigences de MaPrimeRénov&apos; :
        </p>

        <ArticleTable {...SEUILS_TABLE} title="Seuils de résistance thermique par paroi — MaPrimeRénov' et BBC rénovation 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Concernant <strong>l&apos;isolation des murs par l&apos;intérieur</strong> spécifiquement :
          atteindre R ≥ 2,5 est le minimum absolu pour déclencher les aides, mais{' '}
          <strong>viser une résistance thermique</strong> de 3,7 est fortement recommandé.
          La différence de coût entre 80 mm (R = 2,5) et 120 mm (R = 3,7) de laine de verre
          est marginale — environ 15 à 20 € de plus par m² — alors que les{' '}
          <strong>les économies</strong> supplémentaires sur la facture de chauffage
          sont significatives sur 20 ans.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          À noter que <strong>les combles</strong> et{' '}
          <strong>les planchers bas</strong> ont des exigences bien supérieures à celles
          des murs. Si vous hésitez sur l&apos;ordre de priorité de vos travaux, consultez notre
          guide sur l&apos;{' '}
          <Link href="/services/isolation" className="text-emerald-700 font-semibold hover:underline">
            isolation thermique en Île-de-France
          </Link>{' '}
          qui détaille la hiérarchie des interventions selon le type de logement.
        </p>

        {/* ── SECTION 6 : IMPACT SUR L'ESPACE ────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Épaisseur et perte de surface habitable : ce qu&apos;il faut anticiper
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est le principal inconvénient de l&apos;ITI par rapport à l&apos;isolation par l&apos;extérieur (ITE) :
          chaque millimètre d&apos;isolant posé sur un mur intérieur est un millimètre retiré
          de l&apos;<strong>espace intérieur</strong>. Un doublage complet comprend plusieurs couches :
        </p>

        <ul className="space-y-2 mb-6 text-slate-700 list-disc pl-6">
          <li>Lame d&apos;air de 10–15 mm entre le mur porteur et l&apos;ossature</li>
          <li>Ossature métallique de 48 mm (ou bois 45 mm) contenant l&apos;isolant</li>
          <li>Isolant : 80 à 150 mm selon le matériau et le R visé</li>
          <li>Pare-vapeur (film de 0,2 mm, négligeable)</li>
          <li>Plaque de plâtre BA13 : 13 mm</li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-4">
          Au total, un doublage bien isolant représente{' '}
          <strong>130 à 175 mm d&apos;épaisseur totale</strong> par mur traité.
          Pour une maison de 100 m² avec quatre façades exposées (périmètre ≈ 40 m,
          hauteur 2,5 m, soit environ 80 m² de murs nets), cela représente une perte
          de <strong>5 à 7 m² de surface habitable</strong>.
        </p>

        <ArticleCallout type="info" title="Réduire la perte d'espace avec les isolants à haute performance">
          <p>
            Si préserver l&apos;<strong>espace intérieur</strong> est une priorité, deux solutions
            permettent de réduire l&apos;épaisseur totale :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Polyuréthane projeté</strong> : R = 3,7 en 89 mm → doublage total ≈ 115 mm
              (gain de 30 mm vs laine minérale)
            </li>
            <li>
              <strong>Panneau composite PSE + plaque de plâtre</strong> collé directement au mur
              sans ossature (panneaux de 100 à 120 mm) : pas de lame d&apos;air ni d&apos;ossature,
              épaisseur totale ≈ 115–135 mm
            </li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 7 : PONTS THERMIQUES ────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les ponts thermiques : le point faible de l&apos;isolation intérieure
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Quelle que soit l&apos;<strong>épaisseur de l&apos;isolant</strong> posé,{' '}
          <strong>les ponts thermiques</strong> restent le talon d&apos;Achille de l&apos;ITI.
          Ce sont les zones où la structure porteuse (dalle béton, refend maçonné, linteau)
          traverse le plan d&apos;isolation et crée un chemin de moindre résistance thermique
          entre l&apos;extérieur et l&apos;intérieur.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les <strong>les pertes</strong> par ponts thermiques représentent typiquement
          15 à 30 % des déperditions totales par les murs, même après une{' '}
          <strong>isolation efficace</strong> des parois. Ils se manifestent surtout
          aux jonctions mur/plancher, aux angles de pièces, et aux tableaux de fenêtres —
          points où le béton ou la maçonnerie est exposée au froid.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-mur-interieur-polystyrene-pose.jpg"
          alt="Pose de panneaux de polystyrène expansé (PSE) blancs sur mur intérieur existant pour isolation thermique"
          imagePosition="left"
        >
          <p>
            Pour limiter au maximum <strong>les ponts thermiques</strong> avec l&apos;ITI,
            la technique consiste à <strong>prolonger le doublage</strong> sur au moins
            50 cm le long des planchers et plafonds à chaque jonction avec une paroi froide.
            Cette continuité d&apos;isolation coupe le chemin thermique et réduit nettement
            les déperditions résiduelles.
          </p>
          <p className="mt-3">
            C&apos;est l&apos;une des raisons pour lesquelles un artisan certifié RGE est
            indispensable : il connaît ces détails d&apos;exécution et les intègre
            systématiquement dans son chantier. Un simple particulier bricoleur
            risque de négliger ces zones et d&apos;obtenir une{' '}
            <strong>isolation performante</strong> sur le plan du R affiché,
            mais médiocre en performance réelle.
          </p>
          <p className="mt-3">
            Pour les maisons individuelles sans contraintes architecturales,
            l&apos;isolation par l&apos;extérieur (ITE) reste la solution qui supprime
            le mieux <strong>les ponts thermiques</strong> — car elle enveloppe
            l&apos;ensemble du bâtiment sans laisser de pont. Notre article sur le{' '}
            <Link href="/blog/meilleur-isolant-thermique-murs-interieur-2026" className="text-emerald-700 font-semibold hover:underline">
              meilleur isolant thermique pour les murs
            </Link>{' '}
            compare les deux approches en détail.
          </p>
        </ArticleImageSection>

        {/* ── SECTION 8 : AIDES ───────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les aides financières pour l&apos;isolation des murs par l&apos;intérieur en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Choisir la <strong>bonne épaisseur d&apos;isolant</strong> ne suffit pas :
          encore faut-il que les travaux soient réalisés dans les règles pour
          déclencher <strong>les aides</strong> de l&apos;État. En 2026, quatre dispositifs
          sont cumulables pour l&apos;<strong>isolation intérieure des murs</strong> :
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides cumulables pour l'isolation des murs par l'intérieur en 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          La condition indispensable pour MaPrimeRénov&apos; et le Coup de pouce CEE :
          les travaux doivent être réalisés par un artisan certifié{' '}
          <strong>RGE</strong> (Reconnu Garant de l&apos;Environnement),
          et la résistance thermique atteinte doit être vérifiable via la fiche
          technique de l&apos;isolant posé. C&apos;est précisément pour cela que
          l&apos;<strong>épaisseur d&apos;isolant</strong> est consignée dans le devis
          et sur l&apos;attestation de fin de travaux.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour <strong>les économies d&apos;énergie</strong> sur le long terme,
          il est presque toujours plus rentable de viser R = 3,7 plutôt que
          le strict minimum R = 2,5 — même en ajoutant 40 mm d&apos;isolant.
          Sur une maison de 100 m², la différence de coût est de l&apos;ordre
          de 400 à 600 €, mais <strong>les économies</strong> supplémentaires
          annuelles dépassent 100 € dès la première année.
        </p>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.filter(l => l.label).map((line, i) => (
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

        {/* ── SECTION 9 : RÉCAPITULATIF PRATIQUE ─────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Récapitulatif : quelle épaisseur d&apos;isolant pour l&apos;isolation mur intérieur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour résumer, voici le tableau de décision pratique selon votre objectif.
          Si vous êtes dans le cas standard d&apos;une rénovation visant les aides publiques,
          visez systématiquement <strong>R ≥ 3,7</strong> — c&apos;est le bon compromis
          entre performance et surcoût marginal.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 my-8">
          {[
            {
              situation: "Budget serré, aides MaPrimeRénov' seulement",
              r: "R ≥ 2,5",
              materiau: "80 mm laine de verre\nou 60 mm polyuréthane",
              color: "orange",
            },
            {
              situation: "Standard recommandé — BBC rénovation",
              r: "R ≥ 3,7",
              materiau: "120 mm laine de verre\nou 90 mm polyuréthane",
              color: "blue",
            },
            {
              situation: "Passoire thermique F/G ou haute performance",
              r: "R ≥ 4,5",
              materiau: "144 mm laine de verre\nou 108 mm polyuréthane",
              color: "green",
            },
          ].map((item) => (
            <div
              key={item.r}
              className={`rounded-2xl p-5 border-2 text-center ${
                item.color === 'orange' ? 'border-orange-200 bg-orange-50' :
                item.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                'border-green-200 bg-green-50'
              }`}
            >
              <p className={`text-2xl font-black mb-2 ${
                item.color === 'orange' ? 'text-orange-700' :
                item.color === 'blue' ? 'text-blue-700' : 'text-green-700'
              }`}>{item.r}</p>
              <p className="text-sm font-semibold text-slate-700 mb-2">{item.situation}</p>
              <p className="text-xs text-slate-500 whitespace-pre-line">{item.materiau}</p>
            </div>
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        <ArticleCTA
          title="Obtenez un devis gratuit pour l'isolation de vos murs en Île-de-France"
          description="Nos artisans certifiés RGE calculent l'épaisseur d'isolant adaptée à votre logement, montent votre dossier MaPrimeRénov' et vous proposent un devis sous 48h. Intervention sur toute l'Île-de-France."
        />

        {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;épaisseur d&apos;isolation mur intérieur
        </h2>
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

        {/* ── SOURCES ──────────────────────────────────────────────────────────── */}
        <ArticleSources sources={SOURCES} />

        {/* ── LIENS INTERNES ───────────────────────────────────────────────────── */}
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
            href="/blog/meilleur-isolant-thermique-murs-interieur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Quel est le meilleur isolant pour les murs intérieurs en 2026 ?
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/prix-isolation-combles-au-m2"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix isolation combles au m² en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/lp/isolation"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Devis gratuit</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation des murs — devis RGE sous 48h
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Obtenir un devis <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ── LIENS VILLES ──────────────────────────────────────────────────────── */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Isolation des murs par ville en Île-de-France
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Ozoir-la-Ferrière", slug: "ozoir-la-ferriere" },
              { name: "Pontault-Combault", slug: "pontault-combault" },
              { name: "Roissy-en-Brie", slug: "roissy-en-brie" },
              { name: "Brie-Comte-Robert", slug: "brie-comte-robert" },
              { name: "Tournan-en-Brie", slug: "tournan-en-brie" },
              { name: "Créteil", slug: "creteil" },
              { name: "Versailles", slug: "versailles" },
              { name: "Meaux", slug: "meaux" },
              { name: "Massy", slug: "massy" },
              { name: "Vincennes", slug: "vincennes" },
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
