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
  ARTICLE_META, TYPES_PLACO_TABLE, EPAISSEURS_PLACO_TABLE,
  STEPS_POSE, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/placoplatre-isolation-thermique'

export const metadata: Metadata = {
  title: "Placoplâtre isolation thermique : le guide complet du placo isolant en 2026 | Greenter",
  description:
    "Placoplâtre isolation thermique : comment le placo isolant combine plaque de plâtre et isolant (laine de verre, laine de roche, polystyrène expansé) pour isoler murs et plafonds. Épaisseurs, résistance thermique, pose et prix au m².",
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: "Placoplâtre isolation thermique : le guide complet du placo isolant en 2026",
    description:
      "Guide complet du placo isolant : types de matériaux, épaisseur, résistance thermique R, isolation phonique, pose sur ossature ou collée, prix au m² en 2026.",
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/placo-isolant-pose-plaque-platre-ossature-metallique.jpg',
      width: 1200,
      height: 800,
      alt: "Deux artisans posant une plaque de plâtre isolante sur une ossature métallique au plafond",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Placoplâtre isolation thermique : le guide complet du placo isolant en 2026",
    description:
      "Types de placo isolant, épaisseurs, résistance thermique, pose et prix au m² : tout savoir sur l'isolation thermique du placo en 2026.",
    images: ['https://www.greenter.fr/images/blog/placo-isolant-pose-plaque-platre-ossature-metallique.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Placoplâtre isolation thermique', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PlacoplatreIsolationThermique() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Placoplâtre isolation thermique : le guide complet du placo isolant en 2026"
        description="Guide complet sur le placo isolant : types de matériaux isolants (laine de verre, laine de roche, polystyrène expansé, polyuréthane), épaisseurs, résistance thermique R, isolation phonique, pose et prix au m²."
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: ARTICLE_META.author, url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/placo-isolant-pose-plaque-platre-ossature-metallique.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2900}
      />

      <ArticleLayout
        title="Placoplâtre isolation thermique : le guide complet du placo isolant en 2026"
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        author={ARTICLE_META.author}
        heroImage="/images/blog/placo-isolant-pose-plaque-platre-ossature-metallique.jpg"
        heroAlt="Deux artisans posant une plaque de plâtre isolante de grande dimension sur une ossature métallique au plafond, pour l'isolation thermique d'un logement en rénovation"
        breadcrumbs={breadcrumbs}
      >
        {/* ── INTRO ───────────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Quand on parle de <strong>placoplâtre isolation thermique</strong>, on parle en
            réalité d&apos;une même solution technique : le <strong>placo isolant</strong>,
            c&apos;est-à-dire une <strong>plaque de plâtre</strong> à laquelle est directement
            associé un <strong>isolant</strong> — laine de verre, laine de roche ou{' '}
            <strong>polystyrène expansé</strong> — collé au dos de la plaque. Cette association
            permet de traiter en une seule opération à la fois l&apos;<strong>isolation
            thermique</strong> d&apos;un mur ou d&apos;un plafond et sa finition prête à peindre,
            ce qui en fait l&apos;un des matériaux les plus utilisés dans les{' '}
            <strong>projets de rénovation</strong> en France.
          </p>
          <p>
            Mais toutes <strong>les plaques de plâtre</strong> ne se valent pas. Le{' '}
            <strong>choix du placo</strong> dépend du <strong>matériau</strong> isolant intégré,
            de son <strong>épaisseur</strong>, de sa <strong>résistance thermique R</strong>, de
            sa capacité à résister à l&apos;<strong>humidité</strong> et de ses{' '}
            <strong>performances</strong> acoustiques. Un <strong>placo isolant</strong> destiné
            à une chambre n&apos;est pas le même que celui posé dans une salle de bains, et un
            doublage visant une <strong>excellente isolation thermique</strong> n&apos;aura pas
            la même épaisseur qu&apos;un simple habillage décoratif.
          </p>
          <p>
            Ce guide détaille tout ce qu&apos;il faut savoir avant de{' '}
            <strong>choisir le placo</strong> adapté à votre logement : les différents{' '}
            <strong>types de placo</strong> isolant disponibles, comment calculer{' '}
            l&apos;épaisseur nécessaire pour <strong>atteindre une résistance thermique</strong>{' '}
            suffisante, les techniques de pose (ossature métallique ou <strong>pose
            collée</strong>), la question des <strong>ponts thermiques</strong>, et le{' '}
            <strong>coût de la pose</strong> au m² en 2026.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Ce qu&apos;est réellement un placo isolant et comment il fonctionne</li>
            <li>Comparatif des types de placo isolant : PSE, laine de verre, laine de roche, polyuréthane</li>
            <li>Épaisseurs nécessaires pour atteindre une bonne isolation thermique (R = 2,5 à 3,7)</li>
            <li>Isolation phonique et acoustique : quel placo isolant choisir</li>
            <li>Placo hydrofuge pour les pièces humides (salles de bains, cuisines)</li>
            <li>Pose sur ossature métallique ou pose collée : avantages et inconvénients</li>
            <li>Comment éviter les ponts thermiques et bien traiter les joints</li>
            <li>Prix et coût de la pose au m² en 2026</li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 1 : DÉFINITION ─────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Qu&apos;est-ce que le placo isolant et comment fonctionne l&apos;isolation thermique du placo ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le terme « placo » vient de Placoplâtre, la marque historique de <strong>plaque
          de plâtre</strong> du groupe Saint-Gobain, devenue un nom générique dans le langage
          courant du bâtiment — un peu comme « frigidaire » pour réfrigérateur. Une{' '}
          <strong>plaque de plâtre standard</strong> (le fameux <strong>BA13</strong>, 13 mm
          d&apos;épaisseur) n&apos;isole quasiment pas à elle seule : sa conductivité thermique
          est trop élevée pour constituer un véritable isolant. C&apos;est pourquoi{' '}
          <strong>le placo isolant</strong> associe, dès la fabrication, cette plaque à une
          couche d&apos;<strong>isolant thermique</strong> collée au dos — laine de verre, laine
          de roche ou <strong>isolant synthétique</strong> comme le polystyrène expansé ou le
          polyuréthane.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Concrètement, <strong>l&apos;isolation thermique par l&apos;intérieur</strong> avec du
          placo isolant consiste à créer un doublage sur la face intérieure des{' '}
          <strong>murs par l&apos;intérieur</strong> ou du plafond, sans toucher à la façade
          extérieure. C&apos;est la technique de référence pour les appartements en
          copropriété, les maisons anciennes dont la façade ne peut pas être modifiée, et
          plus largement tous <strong>les projets de rénovation</strong> où l&apos;on souhaite
          gagner en <strong>confort thermique</strong> sans lourds travaux de façade.{' '}
          <strong>Le placo isolant peut être utilisé</strong> aussi bien sur les{' '}
          <strong>murs ou plafonds</strong> que, dans certains cas, pour habiller{' '}
          <strong>les cloisons</strong> de distribution qui séparent deux pièces chauffées
          différemment.
        </p>

        <ArticleStat stats={[
          { value: '2 en 1', label: 'isolation thermique et finition réalisées en une seule opération', color: 'green' },
          { value: '20–25 %', label: 'des déperditions thermiques passent par des murs mal isolés', color: 'blue' },
          { value: 'R ≥ 2,5', label: 'seuil minimal pour déclencher les aides MaPrimeRénov\' 2026', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-4">
          Ce format « tout-en-un » explique pourquoi le placo isolant est devenu{' '}
          <strong>une solution économique</strong> et rapide à mettre en œuvre pour qui veut
          améliorer <strong>la thermique du placo</strong> de son logement sans multiplier les
          intervenants : un seul corps de métier pose l&apos;isolant et la plaque de finition,
          alors qu&apos;une isolation classique nécessite souvent un poseur d&apos;isolant puis un
          plaquiste. Pour un panorama plus large des matériaux isolants disponibles au-delà
          du placo, notre guide sur le{' '}
          <Link href="/blog/meilleur-isolant-thermique-murs-interieur-2026" className="text-emerald-700 font-semibold hover:underline">
            meilleur isolant thermique pour les murs intérieurs
          </Link>{' '}
          détaille l&apos;ensemble des solutions du marché.
        </p>

        {/* ── SECTION 2 : POURQUOI CHOISIR ───────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi choisir le placo isolant pour l&apos;isolation thermique de votre logement
        </h2>

        <ArticleImageSection
          image="/images/blog/placo-isolant-laine-verre-ossature-metallique-pose.jpg"
          alt="Artisan sur escabeau posant de la laine minérale entre montants métalliques avant la pose des plaques de plâtre isolantes"
          imagePosition="right"
        >
          <p>
            Un mur non isolé, en béton plein ou en briques creuses, transmet directement le
            froid extérieur vers l&apos;intérieur. Même si l&apos;air ambiant affiche 20 °C,
            la paroi froide crée un inconfort ressenti — c&apos;est l&apos;effet de paroi
            froide, bien connu dans les logements anciens. <strong>Isoler un mur</strong> avec
            un placo isolant permet de rompre ce pont froid et d&apos;améliorer nettement le{' '}
            <strong>confort thermique</strong> hivernal, tout en limitant la surchauffe en été
            grâce à l&apos;effet tampon de l&apos;isolant.
          </p>
          <p className="mt-3">
            Au-delà du confort, <strong>l&apos;isolation des murs</strong> avec du placo isolant
            réduit directement la facture de chauffage : sur une maison mal isolée, les murs
            représentent 20 à 25 % des déperditions thermiques totales. Combiné à un doublage
            correctement dimensionné, le placo isolant permet d&apos;afficher{' '}
            <strong>une bonne isolation thermique</strong> durable, sans intervention lourde
            sur la structure du bâtiment.
          </p>
          <p className="mt-3">
            Autre atout : le placo isolant s&apos;adapte à quasiment tous <strong>les
            matériaux</strong> de construction existants — parpaing, brique, béton banché,
            pierre — ce qui en fait une solution universelle pour la quasi-totalité des{' '}
            <strong>travaux d&apos;isolation</strong> en rénovation intérieure.
          </p>
        </ArticleImageSection>

        {/* ── SECTION 3 : TYPES DE PLACO ─────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les différents types de placo isolant : quel matériau choisir ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour <strong>choisir le placo</strong> le mieux adapté à votre projet, il faut
          d&apos;abord comprendre les différences entre les principaux{' '}
          <strong>matériaux isolants</strong> proposés en association avec la plaque de
          plâtre. Les <strong>plaques de placo</strong> isolant se déclinent aujourd&apos;hui
          dans de nombreuses combinaisons épaisseur/isolant, ce qui complique parfois le
          choix. Le tableau ci-dessous compare <strong>les performances</strong> des{' '}
          <strong>types de placo</strong> isolant les plus courants sur le marché en 2026.
        </p>

        <ArticleTable {...TYPES_PLACO_TABLE} title="Comparatif des types de placo isolant selon le matériau isolant" />

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          Placo isolant au polystyrène expansé (PSE) : la solution économique
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>polystyrène expansé</strong> est <strong>l&apos;isolant synthétique</strong>{' '}
          le plus répandu associé au placo. Léger, peu coûteux et facile à découper,{' '}
          <strong>cet isolant est une solution</strong> économique pour les budgets serrés. Il existe aussi en
          version <strong>plaques hydrofuges</strong>, particulièrement adaptée aux{' '}
          <strong>pièces humides</strong>. Son principal point faible reste sa performance
          acoustique modeste comparée aux laines minérales.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          Placo isolant à la laine de verre et à la laine de roche
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>laine de verre</strong> et la <strong>laine de roche</strong> forment la
          famille des <strong>laines minérales</strong>, historiquement les plus utilisées pour{' '}
          <strong>l&apos;isolation des murs</strong> et des plafonds. La laine de verre offre un
          excellent rapport qualité-prix et une bonne isolation thermique ; la laine de roche
          se distingue par sa <strong>meilleure résistance</strong> au feu (incombustible) et
          sa capacité à limiter les nuisances sonores, ce qui en fait le matériau de référence
          pour une <strong>isolation phonique</strong> renforcée entre deux pièces ou entre deux
          logements mitoyens.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          Placo isolant au polyuréthane : la performance en faible épaisseur
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Pour les pièces où chaque centimètre de <strong>surface habitable</strong> compte,
          le placo isolant au polyuréthane (ou PIR) est le plus performant à{' '}
          <strong>faible épaisseur</strong> : sa conductivité thermique très basse permet
          d&apos;<strong>atteindre une résistance thermique</strong> équivalente à celle d&apos;un
          doublage en laine minérale, mais avec 20 à 30 mm de moins. C&apos;est souvent le{' '}
          <strong>meilleur placo</strong> pour les couloirs étroits ou les petites chambres
          en rénovation.
        </p>

        <ArticleCallout type="tip" title="Attention au « placo mince »">
          <p>
            Certains panneaux composites très fins, parfois commercialisés sous l&apos;appellation
            « <strong>placo mince</strong> », séduisent par leur faible encombrement. Vérifiez
            toujours leur fiche technique : une <strong>faible épaisseur</strong> ne garantit pas
            une <strong>excellente isolation</strong> si la résistance thermique R affichée reste
            insuffisante pour prétendre aux aides. Un <strong>placo isolant</strong> performant
            doit toujours indiquer clairement son R et son épaisseur totale.
          </p>
        </ArticleCallout>

        {/* ── SECTION 4 : ÉPAISSEUR ET R ─────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Épaisseur et résistance thermique R : comment calculer la performance du placo isolant
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>performance thermique</strong> d&apos;un placo isolant se mesure par sa{' '}
          <strong>résistance thermique R</strong> (en m²·K/W), calculée à partir de l&apos;
          <strong>épaisseur</strong> de l&apos;isolant divisée par sa{' '}
          <strong>conductivité thermique</strong> λ (lambda). Plus λ est faible, plus{' '}
          <strong>le matériau</strong> est isolant à épaisseur égale — c&apos;est ce qui explique
          pourquoi un <strong>isolant performant</strong> comme le polyuréthane nécessite
          beaucoup moins d&apos;épaisseur qu&apos;une laine minérale classique pour offrir les{' '}
          <strong>mêmes performances</strong>.
        </p>

        <ArticleTable {...EPAISSEURS_PLACO_TABLE} title="Épaisseur totale du doublage placo isolant selon le matériau et la résistance thermique visée" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          En 2026, deux seuils de <strong>résistance thermique</strong> structurent le choix de
          l&apos;épaisseur : <strong>R ≥ 2,5 m²·K/W</strong>, le minimum exigé pour déclencher
          MaPrimeRénov&apos;, et <strong>R ≥ 3,7 m²·K/W</strong>, l&apos;objectif recommandé pour
          une <strong>maison bien isolée</strong> répondant aux standards BBC rénovation. Pour
          les logements les plus anciens (DPE F ou G), viser un R supérieur à 4,5 avec un
          placo isolant en laine de roche ou en polyuréthane est souvent pertinent.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un doublage placo isolant complet représente généralement entre 100 et 150 mm
          d&apos;épaisseur totale une fois la <strong>plaque de plâtre</strong> ajoutée. Sur une
          maison de 100 m² avec plusieurs façades à traiter, cela peut représenter jusqu&apos;à
          plusieurs mètres carrés de <strong>surface habitable</strong> perdue — un paramètre à
          anticiper dès la phase de devis, surtout dans les petites pièces où gagner ne
          serait-ce qu&apos;1 cm d&apos;épaisseur totale peut faire la différence.
        </p>

        {/* ── SECTION 5 : PHONIQUE / ACOUSTIQUE ──────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation thermique et phonique : le placo isolant améliore aussi le confort acoustique
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un des grands atouts du placo isolant est de traiter en même temps l&apos;
          <strong>isolation thermique et phonique</strong> d&apos;une pièce. La structure
          fibreuse des laines minérales absorbe une partie des ondes sonores, ce qui réduit
          la transmission des bruits aériens (voix, télévision) entre deux pièces ou à
          travers une paroi mitoyenne. C&apos;est pourquoi, dans les immeubles collectifs ou
          les maisons mitoyennes, le placo isolant à la laine de roche est souvent privilégié
          quand l&apos;<strong>isolation phonique</strong> est une priorité au moins aussi
          importante que la performance thermique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          À l&apos;inverse, les <strong>isolants synthétiques</strong> comme le polystyrène
          expansé ou le polyuréthane, très performants sur le plan thermique, offrent une{' '}
          <strong>isolation phonique</strong> plus limitée en raison de leur structure alvéolaire
          rigide, moins efficace pour amortir les vibrations sonores que la structure souple
          des laines minérales. Le choix doit donc toujours tenir compte de l&apos;usage de la
          pièce : une chambre donnant sur rue bénéficiera davantage d&apos;un placo isolant en
          laine de roche, tandis qu&apos;un couloir technique privilégiera plutôt la{' '}
          <strong>performance thermique</strong> pure.
        </p>

        {/* ── SECTION 6 : HYDROFUGE / PIÈCES HUMIDES ─────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Placo hydrofuge : quelle solution pour les pièces humides ?
        </h2>

        <ArticleImageSection
          image="/images/blog/placo-isolant-plaque-platre-doublage-polystyrene-pose.jpg"
          alt="Pose de plaques de plâtre isolantes coulissantes avec sacs de polystyrène expansé hydrofuge au sol, pour un doublage isolant collé"
          imagePosition="left"
        >
          <p>
            Dans <strong>les pièces humides</strong> — salles de bains, cuisines, buanderies,
            sous-sols — une plaque de plâtre standard se dégraderait rapidement au contact de
            la vapeur d&apos;eau. C&apos;est pourquoi il existe des{' '}
            <strong>plaques hydrofuges</strong>, reconnaissables à leur teinte verte, traitées
            pour résister durablement à l&apos;humidité ambiante.
          </p>
          <p className="mt-3">
            Associées à un <strong>isolant hydrofuge</strong> comme le{' '}
            <strong>polystyrène expansé</strong>, elles composent un placo isolant
            spécifiquement conçu pour les <strong>murs des salles de bains</strong> et les
            pièces à forte hygrométrie. Contrairement à la laine de verre classique, qui perd
            une partie de ses performances en cas d&apos;exposition prolongée à l&apos;humidité,
            le polystyrène expansé ne se déforme pas et conserve sa{' '}
            <strong>performance thermique</strong> dans la durée.
          </p>
          <p className="mt-3">
            Pour un doublage dans une pièce humide, ce placo isolant peut aussi bien être posé
            sur une ossature métallique — technique la plus robuste face aux variations
            d&apos;humidité — qu&apos;en <strong>pose collée</strong> lorsque le support est plan
            et sec.
          </p>
        </ArticleImageSection>

        <ArticleCallout type="warning" title="Salles de bains : ne négligez pas le traitement des joints">
          <p>
            Même avec des <strong>plaques hydrofuges</strong>, le traitement des{' '}
            <strong>joints</strong> reste déterminant. Un joint mal réalisé ou une finition
            non étanche autour d&apos;une baignoire ou d&apos;une douche peut laisser
            l&apos;humidité s&apos;infiltrer derrière le placo isolant et provoquer, à terme, un
            développement de moisissures invisibles derrière la plaque.
          </p>
        </ArticleCallout>

        {/* ── SECTION 7 : POSE ────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment poser le placo isolant : ossature métallique ou pose collée ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Il existe deux grandes techniques pour poser un placo isolant sur{' '}
          <strong>les murs ou plafonds</strong> : la pose sur ossature <strong>métallique</strong>{' '}
          et la <strong>pose collée</strong>, aussi appelée <strong>doublage collé</strong>.
          Le choix entre les deux dépend de l&apos;état du support, de l&apos;épaisseur
          disponible et du budget.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          La pose sur ossature métallique
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Cette méthode consiste à fixer des rails et montants <strong>métalliques</strong> au
          sol et au plafond, dans lesquels l&apos;isolant (laine de verre, laine de roche) est
          inséré avant que la plaque de plâtre ne soit vissée dessus. Elle laisse une lame
          d&apos;air entre le mur porteur et <strong>l&apos;ossature</strong>, ce qui limite les
          remontées d&apos;humidité et facilite le passage de gaines électriques. C&apos;est la
          technique recommandée pour les murs irréguliers ou humides, même si elle demande
          un peu plus d&apos;épaisseur totale et de temps de pose.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          La pose collée (doublage collé)
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>pose collée</strong> consiste à appliquer des <strong>plots</strong> de{' '}
          <strong>mortier adhésif</strong> directement au dos du panneau composite (isolant +
          plaque de plâtre) puis à le plaquer sur le mur, sans ossature intermédiaire. Cette
          technique de <strong>doublage collé</strong> permet de gagner en épaisseur, réduit le
          <strong> coût de la pose</strong> et accélère le chantier — un avantage réel pour
          les <strong>projets de rénovation</strong> avec un budget ou un délai contraint.
          Elle exige néanmoins un mur suffisamment plan : un support trop irrégulier
          nécessitera un rattrapage préalable ou, à défaut, le recours à l&apos;ossature.
        </p>

        <ArticleFullImage
          image="/images/blog/placo-isolant-thermique-expertise-renovation-artisan.webp"
          alt="Artisan avec casque jaune examinant une plaque de plâtre isolante et un isolant en laine minérale sur un chantier de rénovation"
          caption="Le choix entre pose sur ossature métallique et pose collée s'évalue au cas par cas : un artisan certifié RGE saura orienter vers la technique la plus adaptée à l'état du mur et à l'objectif de résistance thermique."
        />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Dans les deux cas, <strong>le placo isolant permet</strong> de traiter l&apos;
          <strong>isolation et finition</strong> en une seule intervention : une fois les
          plaques posées et les <strong>joints</strong> traités, le mur est directement prêt à
          recevoir peinture ou papier peint, sans étape de plâtrerie supplémentaire.

          Voici, dans le détail, les quatre grandes étapes d&apos;un chantier de pose de placo
          isolant, qu&apos;il s&apos;agisse d&apos;un doublage sur ossature ou d&apos;un doublage collé :
        </p>

        <ArticleSteps steps={STEPS_POSE} />

        {/* ── SECTION 8 : PONTS THERMIQUES ────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Éviter les ponts thermiques : joints, finitions et continuité de l&apos;isolant
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Quelle que soit la qualité du placo isolant choisi, <strong>les ponts
          thermiques</strong> restent le point faible classique de l&apos;isolation par
          l&apos;intérieur. Ils apparaissent aux jonctions entre le doublage et une paroi non
          traitée — plancher, plafond, tableaux de fenêtre, refend maçonné — là où la
          structure porteuse continue de transmettre le froid malgré l&apos;isolant posé sur
          la paroi principale.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour <strong>éviter les ponts thermiques</strong>, la règle de base consiste à
          prolonger le placo isolant sur au moins 30 à 50 cm au droit de chaque jonction avec
          une paroi froide, afin de créer une continuité d&apos;isolation. C&apos;est aussi là
          que le traitement des <strong>joints</strong> entre plaques de plâtre isolantes
          prend toute son importance : un joint mal réalisé crée une micro-discontinuité dans
          l&apos;isolant et une <strong>finition</strong> fragile, susceptible de se fissurer
          avec le temps.
        </p>

        <ArticleCallout type="info" title="Les finitions conditionnent la performance réelle">
          <p>
            Un placo isolant affichant un excellent R sur sa fiche technique ne garantit pas
            à lui seul <strong>une excellente isolation thermique</strong> réelle : c&apos;est
            la qualité de la pose, la continuité du doublage et le soin apporté aux{' '}
            <strong>finitions</strong> qui font la différence entre une isolation performante
            sur le papier et une isolation efficace au quotidien. Faire appel à un artisan
            certifié RGE reste le meilleur moyen de sécuriser ce résultat, notamment pour
            profiter de notre service{' '}
            <Link href="/services/isolation" className="text-emerald-700 font-semibold hover:underline">
              isolation thermique en Île-de-France
            </Link>.
          </p>
        </ArticleCallout>

        {/* ── SECTION 9 : PRIX ────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Coût de la pose et prix du placo isolant au m² en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>coût de la pose</strong> d&apos;un placo isolant dépend principalement de
          la technique retenue et du <strong>matériau</strong> isolant intégré. En pose
          collée, comptez généralement entre 25 et 45 € par <strong>m²</strong>, fournitures et
          main-d&apos;œuvre comprises — un <strong>solution économique</strong> pour un budget
          contraint. Pour une pose sur ossature métallique avec de la laine de roche ou de la
          laine de verre, le prix grimpe plutôt entre 45 et 70 €/m², en raison du temps de
          pose supplémentaire et des fournitures (rails, montants, isolant en rouleaux ou en
          panneaux semi-rigides).
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le placo isolant au polyuréthane, plus performant à faible épaisseur, se
          positionne généralement en haut de la fourchette de prix, mais permet souvent de
          limiter les travaux annexes (moins de perte de <strong>surface habitable</strong>,
          moins de reprises de finitions autour des huisseries). Comme pour tout{' '}
          <strong>projet de rénovation</strong> énergétique, les aides MaPrimeRénov&apos; et le
          Coup de pouce CEE peuvent réduire significativement ce reste à charge, à condition
          que <strong>la résistance thermique</strong> atteinte et l&apos;intervention d&apos;un
          artisan certifié RGE soient conformes aux exigences en vigueur. Pour affiner votre
          budget selon votre logement, notre article sur l&apos;
          <Link href="/blog/isolation-mur-interieur-quelle-epaisseur" className="text-emerald-700 font-semibold hover:underline">
            épaisseur d&apos;isolant pour mur intérieur
          </Link>{' '}
          détaille le calcul complet des aides cumulables.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Au final, retenir <strong>le meilleur placo</strong> isolant pour votre logement est
          un arbitrage entre budget, épaisseur disponible, exigences acoustiques et
          contraintes d&apos;humidité de la pièce concernée. Dans la grande majorité des{' '}
          <strong>travaux d&apos;isolation</strong>, viser une résistance thermique R ≥ 3,7 avec
          un placo isolant en laine de verre ou en laine de roche reste le compromis le plus
          raisonnable pour obtenir <strong>une maison bien isolée</strong>, confortable été
          comme hiver, tout en restant éligible aux aides publiques 2026.
        </p>

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        <ArticleCTA
          title="Obtenez un devis gratuit pour la pose de votre placo isolant en Île-de-France"
          description="Nos artisans certifiés RGE choisissent avec vous le type de placo isolant adapté à chaque pièce, calculent l'épaisseur nécessaire et montent votre dossier MaPrimeRénov'. Devis sous 48h."
        />

        {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur le placoplâtre et l&apos;isolation thermique
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
            href="/blog/isolation-mur-interieur-quelle-epaisseur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation mur intérieur : quelle épaisseur choisir ?
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/meilleur-isolant-thermique-murs-interieur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Quel est le meilleur isolant thermique pour les murs en 2026 ?
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
              Placo isolant — devis RGE sous 48h
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Obtenir un devis <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ── LIENS VILLES ──────────────────────────────────────────────────────── */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Pose de placo isolant par ville en Île-de-France
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
