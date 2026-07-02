import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  ArticleLayout, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSources, ArticleTable, ArticleSteps,
  ArticleImageSection, ArticleFullImage,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-rampants-de-toiture'

export const metadata: Metadata = {
  title: "Isolation rampants de toiture : guide complet 2026 (matériaux, prix, pose) | Greenter",
  description:
    "Isolation rampants de toiture : comment isoler par l'intérieur ou en sarking ? Comparatif laine de verre, laine de roche, ouate de cellulose et polyuréthane, épaisseurs, prix au m² et aides MaPrimeRénov' 2026.",
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: "Isolation rampants de toiture : guide complet 2026",
    description:
      "Isolation par l'intérieur ou sarking, choix de l'isolant, épaisseur, étapes de pose, prix au m² et aides financières : le guide complet de l'isolation des rampants de toiture en 2026.",
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/isolation-rampants-toiture-combles-amenages-charpente.webp',
      width: 1280,
      height: 720,
      alt: "Combles aménagés avec isolation des rampants de toiture entre chevrons et fenêtre de toit",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Isolation rampants de toiture : guide complet 2026",
    description:
      "Comparatif complet pour l'isolation des rampants de toiture : matériaux, épaisseurs, méthodes de pose, prix au m² et aides MaPrimeRénov' 2026.",
    images: ['https://www.greenter.fr/images/blog/isolation-rampants-toiture-combles-amenages-charpente.webp'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Isolation rampants de toiture", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function IsolationRampantsDeToiture() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Isolation rampants de toiture : guide complet 2026 (matériaux, prix, pose)"
        description="Comment bien réaliser l'isolation des rampants de toiture ? Isolation par l'intérieur ou sarking, choix de l'isolant, épaisseur, étapes de pose, prix au m² et aides MaPrimeRénov' 2026."
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: ARTICLE_META.author, url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/isolation-rampants-toiture-combles-amenages-charpente.webp"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={3050}
      />

      <ArticleLayout
        title="Isolation rampants de toiture : guide complet 2026 (matériaux, prix, pose)"
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        author={ARTICLE_META.author}
        heroImage="/images/blog/isolation-rampants-toiture-combles-amenages-charpente.webp"
        heroAlt="Combles aménagés avec isolation des rampants de toiture visible entre les chevrons, charpente en bois et fenêtre de toit"
        breadcrumbs={breadcrumbs}
      >

        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            L&apos;<strong>isolation des rampants de toiture</strong> est l&apos;un
            des travaux de rénovation énergétique les plus rentables lorsqu&apos;on
            possède des combles aménagés ou aménageables. Contrairement aux combles
            perdus, où l&apos;isolant se pose simplement à plat sur le plancher,
            les rampants — ces pans de toiture inclinés qui suivent la pente du
            toit — imposent une isolation technique, réalisée entre et sous les
            chevrons de la charpente, sans sacrifier tout l&apos;espace habitable
            de la pièce.
          </p>
          <p>
            Or c&apos;est justement par le toit que s&apos;échappe la plus grande
            part de la chaleur d&apos;une maison mal isolée : jusqu&apos;à 25 à
            30 % des déperditions thermiques totales, davantage que par les murs
            ou les fenêtres. Une <strong>isolation rampants de toiture</strong>
            correctement dimensionnée transforme directement cette déperdition
            en économies de chauffage, tout en améliorant le confort d&apos;été
            en limitant les surchauffes sous toiture.
          </p>
          <p>
            Ce guide complet vous explique comment réussir l&apos;<strong>isolation
            des rampants de toiture</strong> en 2026 : les deux grandes méthodes
            (isolation par l&apos;intérieur ou sarking par l&apos;extérieur), les
            meilleurs isolants disponibles, les épaisseurs à respecter pour
            atteindre les seuils MaPrimeRénov&apos;, les étapes de pose, le budget
            réel à prévoir et les erreurs qui ruinent le plus souvent une isolation
            de rampants pourtant bien commencée.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Pourquoi l&apos;isolation des rampants de toiture est prioritaire dans une rénovation</li>
            <li>Isolation par l&apos;intérieur ou sarking : quelle méthode pour votre projet</li>
            <li>Les 4 meilleurs isolants pour rampants comparés (laine de verre, laine de roche, ouate de cellulose, polyuréthane)</li>
            <li>Quelle épaisseur pour atteindre la résistance thermique R ≥ 6 exigée par MaPrimeRénov&apos;</li>
            <li>Les étapes de pose détaillées, du pare-pluie à la plaque de plâtre</li>
            <li>Prix au m² en 2026 et aides financières mobilisables</li>
            <li>Les erreurs qui compromettent la durabilité de l&apos;isolation</li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 1 : POURQUOI ──────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi l&apos;isolation des rampants de toiture est une priorité énergétique
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La toiture est la première surface d&apos;échange thermique d&apos;un
          logement avec l&apos;extérieur. L&apos;air chaud, plus léger, monte
          naturellement vers les combles — un phénomène physique appelé effet
          de tirage thermique. Sans <strong>isolation des rampants de toiture</strong>
          suffisante, cette chaleur traverse la couverture et se dissipe en
          quelques minutes, obligeant le système de chauffage à compenser en
          continu. C&apos;est pourquoi l&apos;ADEME classe systématiquement
          l&apos;isolation de la toiture en tête des travaux de rénovation
          énergétique à réaliser en priorité, avant même le remplacement d&apos;un
          système de chauffage.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans le cas particulier des combles aménagés, le rôle des rampants
          est double. D&apos;un côté, ils assurent la performance thermique
          hivernale, au même titre qu&apos;une <Link href="/blog/isolation-mur-interieur-quelle-epaisseur" className="text-emerald-700 font-semibold hover:underline">isolation de mur intérieur bien dimensionnée</Link>.
          De l&apos;autre, une bonne isolation rampant toiture limite fortement
          les surchauffes estivales, un problème fréquent sous les toits mal
          isolés où la température peut dépasser 35 °C en été faute de masse
          isolante suffisante et de déphasage thermique adapté.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, l&apos;isolation des rampants de toiture conditionne directement
          le confort acoustique de la pièce (pluie, grêle, vent) et la pérennité
          de la charpente elle-même. Une isolation mal posée, sans gestion
          correcte de la vapeur d&apos;eau, favorise la condensation au contact
          du bois et peut provoquer des désordres structurels bien plus coûteux
          que le prix des travaux d&apos;isolation initiaux.
        </p>

        <ArticleStat stats={[
          { value: '25–30 %', label: 'des déperditions thermiques d\'un logement mal isolé passent par la toiture', color: 'blue' },
          { value: 'R ≥ 6', label: 'm²·K/W — résistance thermique minimale exigée pour l\'éligibilité MaPrimeRénov\'', color: 'green' },
          { value: '60–250 €', label: 'par m² — fourchette de prix selon la méthode et l\'isolant choisis', color: 'amber' },
        ]} />

        {/* ── SECTION 2 : INTERIEUR VS SARKING ─────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation rampants de toiture par l&apos;intérieur ou par l&apos;extérieur (sarking)
        </h2>

        <p className="text-slate-700 leading-relaxed mb-8">
          Il existe deux grandes familles de techniques pour isoler des rampants
          de toiture, qui répondent à des contextes de travaux très différents.
          Le choix entre les deux dépend surtout de l&apos;état de votre couverture
          et de votre budget.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          L&apos;isolation des rampants par l&apos;intérieur : la solution la plus répandue
        </h3>

        <ArticleImageSection
          image="/images/blog/isolation-rampants-toiture-panneaux-isover-charpente.jpeg"
          alt="Pose de panneaux isolants entre les chevrons d'une charpente en bois — isolation rampants de toiture par l'intérieur en rénovation"
          imagePosition="right"
        >
          <p className="text-slate-700 leading-relaxed">
            L&apos;<strong>isolation rampants de toiture par l&apos;intérieur</strong>
            consiste à insérer l&apos;isolant entre les chevrons existants, puis
            à ajouter une seconde couche croisée en sous-face pour supprimer les
            ponts thermiques créés par le bois des chevrons. C&apos;est la
            méthode la plus utilisée en rénovation, car elle ne nécessite aucune
            intervention sur la couverture : la toiture reste en place pendant
            tout le chantier.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Son principal avantage est économique : entre 60 et 130 €/m² selon
            l&apos;isolant retenu, contre 150 à 250 €/m² pour le sarking. Elle
            se réalise en quelques jours par un artisan RGE, sans échafaudage
            extérieur. En contrepartie, elle réduit légèrement le volume habitable
            de la pièce (5 à 15 cm de perte de hauteur sous plafond selon
            l&apos;épaisseur posée) et impose de libérer temporairement la pièce
            concernée.
          </p>
        </ArticleImageSection>

        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">
          Le sarking : l&apos;isolation des rampants par l&apos;extérieur
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le sarking consiste à poser l&apos;isolant au-dessus de la charpente,
          entre les chevrons et la couverture, sous forme de panneaux rigides
          continus. Cette technique d&apos;<strong>isolation de rampants de
          toiture par l&apos;extérieur</strong> est la référence en construction
          neuve et lors d&apos;une réfection complète de toiture, car elle
          supprime la quasi-totalité des ponts thermiques (aucune interruption
          par les chevrons) et laisse la charpente entièrement visible et
          valorisée à l&apos;intérieur — un atout esthétique recherché dans les
          combles à forte hauteur sous faîtage.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le sarking impose cependant une dépose complète de la couverture
          existante (tuiles, ardoises, zinc), ce qui explique son coût plus
          élevé (150 à 250 €/m²) et son intérêt principalement lors d&apos;un
          changement de toiture déjà programmé. Il est rarement rentable de
          déposer une couverture en bon état dans le seul but de réaliser un
          sarking — dans ce cas, l&apos;isolation par l&apos;intérieur reste
          la solution la plus raisonnable.
        </p>

        <ArticleCallout type="tip" title="Comment choisir entre isolation intérieure et sarking">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Toiture en bon état, budget maîtrisé :</strong> isolation des rampants par l&apos;intérieur</li>
            <li><strong>Réfection de toiture déjà prévue :</strong> sarking, pour profiter du chantier de couverture</li>
            <li><strong>Charpente à laisser apparente :</strong> sarking obligatoire</li>
            <li><strong>Combles aménagés déjà habités, travaux rapides :</strong> isolation par l&apos;intérieur</li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 3 : ISOLANTS ─────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel isolant choisir pour l&apos;isolation des rampants de toiture ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-8">
          Quatre familles de matériaux dominent le marché de l&apos;isolation
          des rampants de toiture, chacune avec des performances et des cas
          d&apos;usage spécifiques.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          La laine de verre : le meilleur rapport performance/prix
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          La laine de verre reste l&apos;isolant le plus utilisé pour les
          rampants de toiture, en rouleaux ou en panneaux semi-rigides. Sa
          conductivité thermique (λ = 0,032 à 0,040 W/m·K) permet d&apos;atteindre
          la résistance thermique R ≥ 6 m²·K/W exigée par MaPrimeRénov&apos;
          avec 240 à 280 mm d&apos;épaisseur. Économique (12 à 20 €/m² fourniture
          seule) et facile à découper, elle convient à la grande majorité des
          projets d&apos;isolation rampant toiture par l&apos;intérieur.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">
          La laine de roche : une meilleure tenue au feu et à l&apos;acoustique
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Proche de la laine de verre en performance thermique (λ = 0,035 à
          0,040 W/m·K), la laine de roche s&apos;en distingue par une masse
          volumique plus élevée, une meilleure résistance au feu (classement
          A1, incombustible) et une atténuation acoustique supérieure — un
          critère important sous une toiture exposée à la pluie battante ou
          proche d&apos;un axe routier. Son coût (15 à 25 €/m²) est légèrement
          supérieur à celui de la laine de verre.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">
          La ouate de cellulose : le meilleur confort d&apos;été
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Fabriquée à partir de papier recyclé traité au sel de bore, la ouate
          de cellulose se distingue par un déphasage thermique très supérieur
          aux laines minérales : sa forte densité retarde de plusieurs heures
          la transmission de la chaleur estivale vers l&apos;intérieur des
          combles. C&apos;est l&apos;isolant à privilégier si le confort d&apos;été
          sous toiture est votre priorité. Elle se pose en panneaux semi-rigides
          entre chevrons ou par insufflation dans un caisson chevronné fermé,
          par un professionnel RGE équipé de la machine adaptée.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">
          Les panneaux de polyuréthane et polyisocyanurate : la performance sous faible épaisseur
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Lorsque l&apos;espace disponible entre chevrons est limité — chevrons
          fins, faible hauteur sous faîtage — les panneaux rigides de polyuréthane
          (PUR) ou de polyisocyanurate (PIR) offrent la meilleure performance
          par centimètre d&apos;épaisseur (λ = 0,022 à 0,028 W/m·K). Seulement
          120 à 150 mm suffisent pour atteindre R ≥ 6 m²·K/W, contre plus du
          double pour une laine minérale. Ce gain de place a un coût : ces
          panneaux sont les isolants les plus chers du marché (25 à 45 €/m²)
          et nécessitent une pose soignée pour éviter tout pont thermique aux
          jonctions entre panneaux.
        </p>

        <ArticleCallout type="info" title="Isolation rampants et isolation combles perdus : ne pas confondre">
          <p>
            Si votre charpente comprend à la fois des combles aménagés (isolation
            des rampants) et des combles perdus non habitables ailleurs sous
            le même toit, les deux techniques et les deux budgets sont
            différents. Notre guide sur le{' '}
            <Link href="/blog/prix-isolation-combles-au-m2" className="text-emerald-700 font-semibold hover:underline">
              prix de l&apos;isolation des combles au m²
            </Link>{' '}
            détaille les tarifs spécifiques à l&apos;isolation des combles
            perdus par soufflage, généralement moins coûteuse que l&apos;isolation
            des rampants.
          </p>
        </ArticleCallout>

        {/* ── SECTION 4 : EPAISSEUR ET RESISTANCE ─────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle épaisseur pour l&apos;isolation des rampants de toiture ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;épaisseur nécessaire se calcule à partir de la résistance
          thermique visée (R, en m²·K/W) et de la conductivité thermique de
          l&apos;isolant (λ, en W/m·K), selon la formule R = e / λ, où e est
          l&apos;épaisseur en mètres. Pour l&apos;isolation des rampants de
          toiture, la réglementation thermique recommande un minimum de
          R = 6 m²·K/W en rénovation — c&apos;est aussi le seuil d&apos;éligibilité
          à MaPrimeRénov&apos;. Le tableau suivant récapitule les épaisseurs
          nécessaires selon le matériau pour atteindre ce seuil.
        </p>

        <ArticleTable
          title="Épaisseur nécessaire pour R ≥ 6 m²·K/W selon l'isolant"
          columns={[
            { header: 'Isolant', key: 'isolant' },
            { header: 'Conductivité λ', key: 'lambda' },
            { header: 'Épaisseur pour R = 6', key: 'epaisseur', highlight: true },
            { header: 'Prix fourniture', key: 'prix' },
          ]}
          rows={[
            { isolant: 'Laine de verre', lambda: '0,032–0,040 W/m·K', epaisseur: '240–280 mm', prix: '12–20 €/m²' },
            { isolant: 'Laine de roche', lambda: '0,035–0,040 W/m·K', epaisseur: '240–280 mm', prix: '15–25 €/m²' },
            { isolant: 'Ouate de cellulose', lambda: '0,038–0,042 W/m·K', epaisseur: '230–260 mm', prix: '18–28 €/m²' },
            { isolant: 'Polyuréthane / PIR', lambda: '0,022–0,028 W/m·K', epaisseur: '120–150 mm', prix: '25–45 €/m²' },
          ]}
          caption="Valeurs indicatives — se référer aux fiches techniques du fabricant et à l'étude thermique du logement pour un dimensionnement précis."
        />

        <p className="text-slate-700 leading-relaxed mb-4 mt-6">
          En pratique, l&apos;épaisseur disponible entre chevrons est souvent
          insuffisante pour loger seule les 240 mm ou plus nécessaires avec
          une laine minérale classique. C&apos;est pourquoi la plupart des
          chantiers d&apos;isolation rampants de toiture combinent deux couches
          croisées : une première épaisseur logée entre les chevrons, une
          seconde posée perpendiculairement en sous-face, sur une ossature
          métallique. Ce croisement supprime les ponts thermiques linéaires
          créés par le bois des chevrons, qui conduit la chaleur nettement
          plus vite que l&apos;isolant lui-même.
        </p>

        {/* ── SECTION 5 : ETAPES DE POSE ───────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les étapes de pose de l&apos;isolation des rampants de toiture par l&apos;intérieur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-8">
          Une pose réussie de l&apos;isolation des rampants de toiture suit
          toujours la même séquence, quel que soit l&apos;isolant retenu.
          Chaque étape conditionne la performance et la durabilité de
          l&apos;ensemble.
        </p>

        <ArticleSteps steps={[
          {
            title: "Vérifier l'écran de sous-toiture et la ventilation de la lame d'air",
            detail: "Avant toute pose d'isolant, l'artisan contrôle l'état de l'écran de sous-toiture (pare-pluie) et s'assure qu'une lame d'air ventilée d'au moins 2 cm subsiste entre cet écran et l'isolant, du bas en haut du rampant, pour évacuer l'humidité résiduelle et éviter la condensation au contact de la charpente.",
            duration: "0,5 jour",
          },
          {
            title: "Poser la première couche d'isolant entre les chevrons",
            detail: "L'isolant (laine minérale, ouate de cellulose ou panneau rigide) est découpé et inséré entre les chevrons, en butée contre la lame d'air ventilée, sans compression qui dégraderait sa performance thermique.",
            duration: "1 jour",
          },
          {
            title: "Poser une seconde couche croisée sous les chevrons",
            detail: "Une ossature métallique ou des suspentes acoustiques sont fixées perpendiculairement aux chevrons, puis une seconde épaisseur d'isolant y est intégrée. Ce croisement supprime les ponts thermiques créés par le bois des chevrons.",
            duration: "1 jour",
          },
          {
            title: "Poser le frein-vapeur en continu",
            detail: "Un frein-vapeur (ou pare-vapeur selon le climat et la paroi) est déroulé côté intérieur, avec des recouvrements de lés d'au moins 10 cm scotchés et une étanchéité soignée autour des points singuliers (fenêtres de toit, gaines électriques, chevrons).",
            duration: "0,5 jour",
          },
          {
            title: "Fixer l'ossature de finition et poser les plaques de plâtre",
            detail: "Une ossature métallique reçoit les plaques de plâtre (BA13 ou hydrofuge en salle d'eau), vissées avec un espacement respectant les préconisations du fabricant, avant les finitions (bandes, enduit, peinture).",
            duration: "1–1,5 jour",
          },
        ]} />

        <ArticleFullImage
          image="/images/blog/isolation-rampants-toiture-ossature-metallique-laine-verre.jpeg"
          alt="Ossature métallique et suspentes pour la seconde couche d'isolation des rampants de toiture, laine de verre jaune visible avant pose des plaques de plâtre"
          caption="La seconde couche d'isolant, posée sur ossature métallique perpendiculaire aux chevrons, supprime les ponts thermiques avant la pose du frein-vapeur et des plaques de plâtre."
        />

        <ArticleCallout type="warning" title="La continuité du frein-vapeur, un point critique">
          <p>
            La performance réelle de l&apos;isolation des rampants de toiture
            dépend autant de la qualité de l&apos;isolant que de la continuité
            du frein-vapeur. Une simple déchirure, un recouvrement mal scotché
            ou un passage de gaine électrique non traité suffisent à créer un
            point de condensation qui, avec le temps, humidifie l&apos;isolant
            et attaque la charpente en bois. Exigez de votre artisan RGE des
            photos de chantier documentant la pose du frein-vapeur avant la
            fermeture par les plaques de plâtre.
          </p>
        </ArticleCallout>

        {/* ── SECTION 6 : PRIX ET AIDES ────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix de l&apos;isolation des rampants de toiture au m² et aides 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix de l&apos;<strong>isolation des rampants de toiture</strong>
          par l&apos;intérieur, fourniture et pose comprises, se situe entre
          60 et 130 €/m² selon le matériau : de 60 à 90 €/m² pour une laine
          minérale classique, de 70 à 110 €/m² pour la ouate de cellulose, et
          jusqu&apos;à 130 €/m² pour des panneaux de polyuréthane haute
          performance. Le sarking, plus lourd en mise en œuvre car il implique
          la dépose de la couverture, coûte entre 150 et 250 €/m². Pour une
          surface moyenne de rampants de 60 m², le budget total varie donc
          approximativement de 3 600 € à 15 000 € selon la méthode et
          l&apos;isolant retenus.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-rampants-toiture-fenetre-toit-pose-finition.jpeg"
          alt="Finition de l'isolation des rampants de toiture autour d'une fenêtre de toit, ossature métallique et laine de verre avant pose des plaques de plâtre"
          imagePosition="left"
        >
          <p className="text-slate-700 leading-relaxed">
            Ce budget peut être fortement réduit grâce aux aides publiques.
            <strong> MaPrimeRénov&apos;</strong> prend en charge jusqu&apos;à
            25 €/m² selon les revenus du foyer, à condition que la résistance
            thermique atteinte soit au moins égale à R = 6 m²·K/W et que les
            travaux soient réalisés par un artisan certifié RGE.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Les <strong>Certificats d&apos;Économies d&apos;Énergie</strong>
            (CEE), dans le cadre du dispositif Coup de pouce isolation, sont
            cumulables avec MaPrimeRénov&apos; et peuvent couvrir une part
            supplémentaire du chantier. La <strong>TVA à taux réduit de 5,5 %</strong>
            s&apos;applique automatiquement sur la fourniture et la pose,
            contre 20 % en l&apos;absence d&apos;éligibilité aux aides à la
            rénovation énergétique.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour les ménages aux revenus modestes et très modestes, le cumul de
          ces aides peut réduire le reste à charge de 40 à 90 % du coût total
          de l&apos;isolation des rampants de toiture. Un audit énergétique
          préalable, ou à défaut un devis détaillé par un artisan RGE, permet
          de connaître précisément le montant mobilisable avant d&apos;engager
          les travaux.
        </p>

        {/* ── SECTION 7 : ERREURS ──────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les erreurs à éviter lors de l&apos;isolation des rampants de toiture
        </h2>

        <p className="text-slate-700 leading-relaxed mb-8">
          Une isolation de rampants mal exécutée peut perdre jusqu&apos;à 30 %
          de sa performance théorique, voire créer des désordres graves sur
          la charpente. Voici les cinq erreurs les plus fréquemment constatées.
        </p>

        <div className="space-y-6 my-8">
          {[
            {
              num: 1,
              titre: "Négliger la lame d'air ventilée sous la couverture",
              texte: "Sans lame d'air ventilée continue entre l'écran de sous-toiture et l'isolant, l'humidité résiduelle et la vapeur d'eau qui traverse malgré tout le frein-vapeur restent piégées contre la charpente. Résultat : moisissures, pourrissement du bois et dégradation progressive de l'isolant lui-même.",
            },
            {
              num: 2,
              titre: "Compresser l'isolant pour le faire tenir entre les chevrons",
              texte: "Un isolant en laine minérale comprimé perd une partie de sa capacité isolante, car sa performance repose sur l'air immobile emprisonné dans ses fibres. Si l'épaisseur disponible entre chevrons est insuffisante, mieux vaut choisir un isolant plus performant à épaisseur réduite (polyuréthane) que de comprimer une laine minérale standard.",
            },
            {
              num: 3,
              titre: "Interrompre le frein-vapeur au niveau des fenêtres de toit",
              texte: "Les fenêtres de toit et les passages de gaines électriques sont les points où le frein-vapeur est le plus souvent mal raccordé. Une interruption, même minime, crée un pont de migration de vapeur d'eau qui condense au contact du bois froid environnant.",
            },
            {
              num: 4,
              titre: "Oublier la seconde couche croisée sous chevrons",
              texte: "Se limiter à une seule épaisseur d'isolant entre chevrons, sans seconde couche croisée en sous-face, laisse subsister des ponts thermiques linéaires au droit de chaque chevron — jusqu'à 10 à 15 % de perte de performance globale par rapport à une pose en double couche croisée.",
            },
            {
              num: 5,
              titre: "Faire réaliser les travaux par un artisan non certifié RGE",
              texte: "En dehors de l'enjeu de qualité de pose, seule l'intervention d'un artisan certifié RGE (Reconnu Garant de l'Environnement) ouvre droit à MaPrimeRénov' et aux Certificats d'Économies d'Énergie. Un devis moins cher chez un artisan non RGE peut donc revenir plus cher au final, une fois les aides perdues.",
            },
          ].map((e) => (
            <div key={e.num} className="flex gap-4 rounded-xl border border-amber-100 bg-amber-50 p-5">
              <span className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-sm">
                {e.num}
              </span>
              <div>
                <p className="font-bold text-slate-900 mb-2">{e.titre}</p>
                <p className="text-slate-700 leading-relaxed text-sm">{e.texte}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECTION 8 : FENETRES DE TOIT ET VENTILATION ─────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation des rampants, fenêtres de toit et ventilation : une approche globale
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;isolation des rampants de toiture ne se limite pas à
          l&apos;isolant lui-même : elle doit s&apos;intégrer dans une réflexion
          globale sur l&apos;enveloppe thermique des combles aménagés. Les
          fenêtres de toit, en particulier, restent des points sensibles :
          leur raccordement à l&apos;isolant doit être traité avec autant de
          soin que le reste du rampant, sous peine de créer un pont thermique
          localisé et un risque de condensation en périphérie du dormant.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La ventilation du logement joue également un rôle central. Une bonne
          isolation des rampants de toiture rend le bâti plus étanche à l&apos;air,
          ce qui accroît mécaniquement l&apos;humidité relative intérieure si
          la ventilation n&apos;est pas adaptée. Une VMC simple flux ou double
          flux correctement dimensionnée devient indispensable pour évacuer
          l&apos;humidité produite par les occupants et limiter la pression de
          vapeur d&apos;eau sur le frein-vapeur des rampants.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Cette logique d&apos;ensemble rejoint les principes déjà évoqués pour
          d&apos;autres parois du logement : de la même façon qu&apos;il faut
          traiter l&apos;<Link href="/blog/isolation-murs-humides" className="text-emerald-700 font-semibold hover:underline">isolation des murs humides</Link> en
          tenant compte de la perméabilité à la vapeur d&apos;eau, l&apos;isolation
          des rampants de toiture doit être pensée comme un système cohérent —
          isolant, frein-vapeur, lame d&apos;air ventilée et ventilation
          générale du logement — plutôt que comme une simple accumulation de
          matériau isolant.
        </p>

        <ArticleCallout type="info" title="Récapitulatif : quelle solution selon votre projet">
          <ul className="space-y-2 mt-2 text-sm">
            <li><strong>Rénovation simple, budget maîtrisé :</strong> isolation par l&apos;intérieur en laine de verre ou laine de roche, 240–280 mm</li>
            <li><strong>Confort d&apos;été prioritaire :</strong> ouate de cellulose, meilleur déphasage thermique</li>
            <li><strong>Faible épaisseur disponible entre chevrons :</strong> panneaux polyuréthane ou PIR</li>
            <li><strong>Réfection de toiture déjà programmée :</strong> sarking, isolation par l&apos;extérieur sans pont thermique</li>
            <li><strong>Combles aménagés déjà habités :</strong> isolation par l&apos;intérieur, chantier plus rapide</li>
          </ul>
        </ArticleCallout>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <ArticleCTA
          title="Isolation des rampants de toiture en Île-de-France — devis RGE sous 48h"
          description="Nos artisans certifiés RGE évaluent votre charpente, vous conseillent sur l'isolant le plus adapté et réalisent l'isolation de vos rampants éligible MaPrimeRénov'. Devis gratuit sous 48h, intervention sur toute l'Île-de-France."
        />

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;isolation des rampants de toiture
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

        {/* ── SOURCES ────────────────────────────────────────────────────── */}
        <ArticleSources sources={SOURCES} />

        {/* ── LIENS INTERNES ─────────────────────────────────────────────── */}
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
            href="/blog/isolation-murs-humides"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation murs humides : traitement, isolants et étapes 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/isolation-mur-interieur-quelle-epaisseur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation mur intérieur : quelle épaisseur choisir en 2026 ?
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ── LIENS VILLES ───────────────────────────────────────────────── */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Isolation des rampants de toiture par ville en Île-de-France
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
