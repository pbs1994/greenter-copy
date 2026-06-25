import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  ArticleLayout, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSources,
  ArticleImageSection, ArticleFullImage,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-sol-sous-parquet'

export const metadata: Metadata = {
  title: "Isolation sol sous parquet : les 5 meilleures sous-couches et guide complet 2026 | Greenter",
  description:
    "Comment bien réaliser l'isolation sol sous parquet ? Comparatif des 5 sous-couches (mousse, liège, fibre de bois, composite, plancher chauffant), épaisseurs, règles de pose et compatibilités. Guide 2026.",
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: "Isolation sol sous parquet : les 5 meilleures sous-couches 2026",
    description:
      "Mousse polyéthylène, liège, fibre de bois, composite ou sous-couche plancher chauffant : comparatif complet pour bien isoler un sol sous parquet en 2026. Thermique, acoustique, humidité.",
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/isolation-sol-sous-parquet-sous-couche-rouleau.webp',
      width: 1200,
      height: 800,
      alt: "Sous-couche isolante en rouleau pour isolation sol sous parquet — pare-vapeur et matelas thermique avant pose des lames",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Isolation sol sous parquet : les 5 meilleures sous-couches 2026",
    description:
      "Comparatif des 5 meilleures sous-couches pour l'isolation sol sous parquet : mousse, liège, fibre de bois, composite, plancher chauffant.",
    images: ['https://www.greenter.fr/images/blog/isolation-sol-sous-parquet-sous-couche-rouleau.webp'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Isolation sol sous parquet", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function IsolationSolSousParquet() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Isolation sol sous parquet : les 5 meilleures sous-couches et guide complet 2026"
        description="Comment bien isoler un sol sous parquet ? Comparatif des 5 meilleures sous-couches isolantes, épaisseurs recommandées, compatibilité plancher chauffant, règles de pose et erreurs à éviter."
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: ARTICLE_META.author, url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/isolation-sol-sous-parquet-sous-couche-rouleau.webp"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2900}
      />

      <ArticleLayout
        title="Isolation sol sous parquet : les 5 meilleures sous-couches et guide complet 2026"
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        author={ARTICLE_META.author}
        heroImage="/images/blog/isolation-sol-sous-parquet-sous-couche-rouleau.webp"
        heroAlt="Sous-couche isolante composite en rouleau déroulée sur dalle béton avant pose de parquet — isolation thermique et acoustique sol sous parquet"
        breadcrumbs={breadcrumbs}
      >

        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            L&apos;<strong>isolation sol sous parquet</strong> est souvent réduite
            à une simple question de sous-couche — ce rouleau de mousse que l&apos;on
            déroule vite fait avant de clipser les lames. C&apos;est une vision beaucoup
            trop réductrice qui explique pourquoi tant de propriétaires se plaignent,
            quelques mois après la pose, d&apos;un parquet qui craque, d&apos;un sol
            qui reste froid en hiver ou d&apos;une isolation phonique insuffisante
            vis-à-vis des voisins du dessous.
          </p>
          <p>
            En réalité, l&apos;<strong>isolation d&apos;un sol sous parquet</strong>
            repose sur une chaîne de décisions interdépendantes : le type de parquet
            (massif, contrecollé, stratifié), le mode de pose (flottant, collé, cloué),
            la nature du support (dalle béton, chape, plancher bois), la présence ou
            non d&apos;un <strong>plancher chauffant</strong>, le niveau d&apos;humidité
            du sol, et enfin l&apos;objectif prioritaire — confort thermique,
            <strong> isolation phonique</strong>, ou les deux.
          </p>
          <p>
            Ce guide vous présente les <strong>5 meilleures sous-couches</strong>
            pour <strong>isoler un sol sous parquet</strong> en 2026, avec pour chacune
            les performances réelles, les compatibilités, les épaisseurs recommandées
            et les cas d&apos;usage. Vous y trouverez aussi les règles essentielles à
            respecter pour une pose qui dure, et les erreurs classiques à éviter
            avant d&apos;acheter quoi que ce soit.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Pourquoi l&apos;isolation sol sous parquet ne se résume pas à la sous-couche</li>
            <li>Les 5 types de sous-couches comparés : performances thermiques et acoustiques</li>
            <li>Quelle sous-couche pour parquet flottant, collé ou sur plancher chauffant</li>
            <li>Faut-il un pare-vapeur ? Dans quels cas et comment le poser</li>
            <li>Parquet collé : comment isoler le sol en amont</li>
            <li>Les 5 erreurs les plus fréquentes à la pose</li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 1 : POURQUOI ──────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi l&apos;isolation sol sous parquet est plus complexe qu&apos;il n&apos;y paraît
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un sol en parquet, qu&apos;il soit massif, contrecollé ou stratifié, est
          par nature un bon isolant thermique superficiel : le bois a une conductivité
          thermique λ de 0,12 à 0,18 W/m·K, soit dix à quinze fois moins conducteur
          que le béton (λ = 1,75 W/m·K). C&apos;est pourquoi un sol en parquet
          paraît toujours plus chaud sous le pied qu&apos;un carrelage, même à
          température identique. Mais cette qualité intrinsèque du bois ne suffit
          pas à résoudre tous les problèmes d&apos;isolation.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le vrai défi de l&apos;<strong>isolation sous parquet</strong> est double.
          D&apos;un côté, la <strong>résistance thermique</strong> totale du plancher
          — sous-couche + parquet — reste faible (R = 0,10 à 0,30 m²·K/W) comparée
          aux exigences réglementaires d&apos;un plancher bas isolé (R ≥ 3,0 m²·K/W).
          Autrement dit, même la meilleure sous-couche du marché ne remplace pas
          une isolation de plancher complète. Si votre dalle béton repose sur un
          vide sanitaire ou une cave non chauffée, il faut d&apos;abord traiter
          l&apos;isolation du plancher lui-même — puis poser la sous-couche et le parquet
          par-dessus.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          De l&apos;autre côté, la problématique acoustique est souvent plus urgente
          que la thermique, notamment en appartement ou en logement collectif.
          Les bruits d&apos;impact — pas, chutes d&apos;objets, déplacement de meubles —
          se transmettent directement par la structure et s&apos;entendent parfaitement
          à l&apos;étage inférieur. Une bonne <strong>sous-couche isolante</strong>
          peut réduire ces bruits d&apos;impact de 18 à 25 dB, ce qui représente une
          différence très perceptible au quotidien.
        </p>

        <ArticleStat stats={[
          { value: 'R 0,03–0,25', label: 'm²·K/W — plage de résistance thermique des sous-couches parquet selon le matériau et l\'épaisseur', color: 'blue' },
          { value: '18–25 dB', label: 'ΔLw — réduction des bruits d\'impact par une bonne sous-couche (liège ou fibre de bois)', color: 'blue' },
          { value: '≤ 0,15', label: 'm²·K/W — résistance thermique maximale d\'une sous-couche compatible plancher chauffant', color: 'blue' },
        ]} />

        {/* ── SECTION 2 : LES 5 SOUS-COUCHES ──────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 5 meilleures sous-couches pour l&apos;isolation sol sous parquet
        </h2>

        <p className="text-slate-700 leading-relaxed mb-8">
          Le marché propose une grande variété de sous-couches, souvent vendues avec
          des arguments marketing peu précis. Voici les cinq grandes familles, avec
          leurs performances réelles, leurs avantages spécifiques et leurs limites.
        </p>

        {/* Sous-couche 1 */}
        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          1. La mousse polyéthylène : l&apos;option économique pour parquet flottant
        </h3>

        <ArticleImageSection
          image="/images/blog/isolation-sol-sous-parquet-lames-sous-couche.jpg"
          alt="Artisan posant des lames de parquet contrecollé flottant sur sous-couche isolante grise — isolation sol sous parquet en appartement"
          imagePosition="right"
        >
          <p className="text-slate-700 leading-relaxed">
            La mousse polyéthylène (PE) est la sous-couche la plus répandue et
            la moins chère du marché (1 à 3 €/m²). D&apos;une épaisseur de 2 à 5 mm,
            elle offre une résistance thermique modeste (R = 0,03 à 0,08 m²·K/W)
            et une performance acoustique limitée (ΔLw ≈ 12 à 16 dB). Son principal
            mérite est sa facilité de pose et sa compatibilité universelle avec
            tous les types de parquet flottant.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            La version réticulée (PE réticulé) est plus dense et plus résistante
            que la mousse PE standard : elle ne s&apos;écrase pas sous la charge des
            meubles lourds et maintient ses propriétés isolantes dans le temps.
            Pour un parquet flottant dans une chambre ou une pièce à vivre d&apos;un
            appartement en étage, sans exigences acoustiques particulières,
            la mousse PE réticulée 3–4 mm est une solution parfaitement acceptable.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            En revanche, elle n&apos;est pas adaptée comme seule <strong>isolation
            sous parquet</strong> si le sol est en contact avec une cave ou un
            vide sanitaire froid — ses performances thermiques sont insuffisantes
            pour compenser les déperditions d&apos;un plancher non isolé.
          </p>
        </ArticleImageSection>

        {/* Sous-couche 2 */}
        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">
          2. Le liège naturel : la meilleure polyvalence thermique et acoustique
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le liège est, de loin, le matériau le plus polyvalent pour l&apos;
          <strong>isolation sol sous parquet</strong>. Composé à 90 % d&apos;air
          emprisonné dans des cellules microscopiques, il combine une excellente
          isolation thermique (λ = 0,040 W/m·K, R ≈ 0,13–0,20 m²·K/W pour 5–8 mm)
          et une très bonne absorption des bruits d&apos;impact (ΔLw ≈ 18–20 dB).
          Il est naturellement résistant à l&apos;humidité, imputrescible, et ne
          se tasse pas dans le temps grâce à sa remarquable élasticité.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le liège en sous-couche se présente sous forme de rouleaux (2–3 mm) ou
          de panneaux (4–10 mm). Pour un <strong>parquet flottant</strong> posé
          sur une dalle béton dans un appartement en rez-de-chaussée ou en étage
          avec voisins en dessous, une sous-couche liège de 5–6 mm est la solution
          recommandée. Elle améliore sensiblement le confort thermique de contact
          (le sol paraît moins froid que sur une simple mousse PE) tout en atténuant
          efficacement les bruits d&apos;impact.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Son seul inconvénient est son prix (4 à 10 €/m²), nettement plus élevé
          que la mousse PE. Mais sur une durée de vie de 20 à 30 ans — celle d&apos;un
          parquet massif de qualité — l&apos;investissement est largement amorti.
          En matière écologique, le liège est aussi un matériau biosourcé, renouvelable
          (le chêne-liège se régénère après chaque écorçage), et à faible bilan carbone.
        </p>

        <ArticleCallout type="tip" title="Liège ou mousse : comment choisir rapidement">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Mousse PE (2–4 €/m²)</strong> : chambre en étage, pas de voisins en dessous, parquet contrecollé léger</li>
            <li><strong>Liège 5 mm (5–8 €/m²)</strong> : appartement en étage avec voisins, parquet massif, sol légèrement froid</li>
            <li><strong>Liège 8 mm (8–12 €/m²)</strong> : rez-de-chaussée sur terre-plein, exigences acoustiques élevées, parquet massif épais</li>
          </ul>
        </ArticleCallout>

        {/* Sous-couche 3 */}
        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">
          3. La fibre de bois : la meilleure isolation phonique du marché
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les panneaux de fibre de bois en sous-couche (10 à 15 mm) sont la solution
          qui offre la meilleure isolation acoustique aux bruits d&apos;impact :
          ΔLw de 20 à 25 dB selon l&apos;épaisseur, ce qui dépasse les exigences
          de la réglementation acoustique pour les logements collectifs neufs
          (ΔLw ≥ 21 dB). Leur résistance thermique est également très correcte
          (R ≈ 0,25 m²·K/W pour 10 mm, λ = 0,038–0,040 W/m·K).
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La fibre de bois en sous-couche présente un avantage peu connu :
          son excellent comportement hygrique. Contrairement à la mousse PE qui
          ne respire pas, la fibre de bois régule l&apos;humidité en absorbant
          les excès et en les restituant progressivement — ce qui protège le
          parquet des déformations liées aux variations hygrométriques saisonnières.
          Elle convient donc particulièrement bien aux parquets massifs en bois
          exotique ou en chêne, sensibles aux variations d&apos;humidité.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Deux inconvénients à connaître : son épaisseur (10–15 mm) peut poser
          des problèmes de raccordement aux seuils de porte et aux plinths existants ;
          et son prix (8 à 18 €/m²) est le plus élevé des cinq options. Elle n&apos;est
          pas non plus compatible avec les planchers chauffants (résistance thermique
          trop élevée).
        </p>

        {/* Sous-couche 4 */}
        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">
          4. La sous-couche composite : polyvalence et pare-vapeur intégré
        </h3>

        <ArticleImageSection
          image="/images/blog/isolation-sol-sous-parquet-sous-couche-verte.jpg"
          alt="Pose d'une sous-couche isolante verte composite quadrillée sur chape béton avant installation de planches de parquet bois clair"
          imagePosition="left"
        >
          <p className="text-slate-700 leading-relaxed">
            Les sous-couches composites associent plusieurs matériaux en une seule
            épaisseur : typiquement une couche de mousse PE réticulée ou de liège
            pour l&apos;isolation, laminée avec un film polyéthylène qui fait office
            de pare-vapeur intégré. Ce type de produit tout-en-un simplifie
            considérablement la pose : pas besoin de dérouler un film pare-vapeur
            séparé avant la sous-couche.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Les performances varient selon la composition, mais la plupart des
            sous-couches composites de qualité (4 à 8 mm) affichent R = 0,08 à
            0,15 m²·K/W et ΔLw = 14 à 18 dB. Elles sont particulièrement adaptées
            aux dalles béton au rez-de-chaussée ou au-dessus d&apos;un vide sanitaire
            légèrement humide, où le pare-vapeur intégré représente une vraie valeur
            ajoutée.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Attention à vérifier que la sous-couche composite est bien compatible
            avec le type de parquet choisi. Certains fabricants de parquet contrecollé
            ou de parquet stratifié imposent des sous-couches spécifiques pour
            maintenir la garantie du revêtement.
          </p>
        </ArticleImageSection>

        {/* Sous-couche 5 */}
        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">
          5. La sous-couche spéciale plancher chauffant : la règle des 0,15 m²·K/W
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si votre logement est équipé d&apos;un <strong>plancher chauffant</strong>
          hydraulique (eau chaude basse température) ou électrique, la
          <strong> sous-couche isolante</strong> doit impérativement respecter
          une contrainte technique stricte : sa résistance thermique, ajoutée à celle
          du parquet lui-même, ne doit pas dépasser 0,15 m²·K/W. Au-delà de ce seuil,
          la sous-couche bloque la diffusion de la chaleur vers le haut et dégrade
          fortement le rendement du système de chauffage — vous chauffez le sol au
          lieu de chauffer la pièce.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          En pratique, cela exclut les liège épais (≥ 8 mm), les fibre de bois
          (trop isolants), et la plupart des mousses épaisses (≥ 5 mm). Les
          sous-couches compatibles plancher chauffant sont généralement des mousses
          PE réticulées très fines (2–3 mm, R ≈ 0,04–0,06 m²·K/W) ou des produits
          spécifiquement formulés et estampillés « compatible plancher chauffant »
          sur l&apos;emballage avec la valeur de résistance thermique clairement indiquée.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le parquet lui-même doit aussi être compatible plancher chauffant :
          les parquets contrecollés sont généralement les mieux adaptés (faible
          épaisseur totale, bonne stabilité dimensionnelle), tandis que les parquets
          massifs épais (22 mm et plus) sont souvent déconseillés sur plancher
          chauffant à eau chaude. Notre article sur la{' '}
          <Link href="/blog/pompe-a-chaleur-chauffage-au-sol" className="text-emerald-700 font-semibold hover:underline">
            pompe à chaleur pour plancher chauffant
          </Link>{' '}
          détaille les compatibilités entre systèmes de chauffage et revêtements de sol.
        </p>

        {/* ── SECTION 3 : PARQUET COLLÉ ────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Parquet collé : l&apos;isolation du sol doit précéder la pose
        </h2>

        <ArticleFullImage
          image="/images/blog/isolation-sol-sous-parquet-pose-colle.jpg"
          alt="Artisan encollant une dalle béton avec colle à parquet en peigne avant pose de lames de parquet massif collé — isolation sol réalisée en amont dans la chape"
          caption="La pose de parquet collé n'autorise aucune sous-couche souple entre le parquet et le support. L'isolation thermique et acoustique doit être réalisée en amont, dans la chape ou le support lui-même — d'où l'importance de planifier l'isolation avant la pose."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          Le parquet collé (parquet massif ou contrecollé fixé par encollage sur toute
          sa surface) est fondamentalement incompatible avec une sous-couche souple.
          La colle à parquet nécessite un support rigide, plat et stable : une
          sous-couche en mousse ou en liège sous le parquet empêcherait l&apos;encollage
          de fonctionner correctement et provoquerait des décollements dans les semaines
          suivant la pose.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour <strong>isoler le sol sous un parquet collé</strong>, deux stratégies
          sont possibles. La première, idéale en construction neuve ou lors d&apos;une
          rénovation lourde : réaliser une <strong>chape flottante isolante</strong>
          avant la pose du parquet. On dépose des panneaux PSE ou XPS sur la dalle
          béton, on coule une chape par-dessus, et le parquet est ensuite collé sur
          la chape. Cette solution permet d&apos;atteindre R = 2,5 à 3,5 m²·K/W
          pour l&apos;isolation du plancher, bien au-delà de ce qu&apos;une
          sous-couche pourrait offrir.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La seconde option, plus légère, consiste à coller le parquet sur un
          panneau rigide isolant mince (panneaux PUR ou PIR de 10–15 mm) posé
          directement sur la dalle. Cette technique, dite « pose sur panneau
          isolant rigide », réduit le gain thermique (R ≈ 0,5 à 0,7 m²·K/W) mais
          présente l&apos;avantage de ne pas modifier significativement la hauteur
          sous plafond et de ne pas nécessiter de séchage de chape. Elle convient
          bien aux rénovations où l&apos;on veut améliorer l&apos;isolation du sol
          sans déposer la dalle existante.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans tous les cas, l&apos;isolation du plancher est étroitement liée
          aux autres travaux de rénovation énergétique. Si votre dalle repose sur
          un vide sanitaire ou une cave non chauffée, une{' '}
          <Link href="/blog/isolation-pour-sol-beton" className="text-emerald-700 font-semibold hover:underline">
            isolation complète du sol béton
          </Link>{' '}
          est recommandée avant toute pose de parquet, quelle que soit la technique
          retenue.
        </p>

        {/* ── SECTION 4 : PARE-VAPEUR ──────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Faut-il un pare-vapeur sous la sous-couche ? Les cas où c&apos;est indispensable
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;humidité est l&apos;ennemi numéro un du parquet. Une dalle béton,
          même apparemment sèche, peut transmettre une humidité résiduelle au parquet
          par capillarité et par migration de vapeur d&apos;eau. Si cette humidité
          dépasse les 2,5 % (mesure CM — carbure de calcium) pour un parquet massif,
          ou 3 % pour un parquet contrecollé, le parquet va gonfler, bomber et se
          déformer irrémédiablement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un <strong>film pare-vapeur</strong> (polyéthylène 200 µm) est nécessaire
          dans deux situations précises. Premièrement, si votre dalle béton repose
          sur la terre (dalle sur terre-plein) : l&apos;humidité du sol remonte
          naturellement par capillarité à travers le béton, quelle que soit l&apos;ancienneté
          de la dalle. Deuxièmement, si la dalle est au-dessus d&apos;un vide sanitaire
          non ventilé ou d&apos;une cave humide : l&apos;air humide du sous-sol
          migre à travers la structure et atteint le parquet.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La pose du pare-vapeur s&apos;effectue en déroulant le film sur toute la
          surface avec des recouvrements de 20 cm aux jonctions, soigneusement
          scotchés avec un ruban adhésif aluminium. En pied de mur, le film doit
          remonter de 10 à 15 cm pour former un relevé qui sera ensuite recouvert
          par la plinthe. Cette continuité est essentielle : la moindre perforation
          ou le moindre oubli de recouvrement crée un point faible par lequel
          l&apos;humidité peut s&apos;infiltrer.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si vous optez pour une sous-couche composite avec pare-vapeur intégré
          (film polyéthylène préencollé sur la face inférieure), ce film joue
          le même rôle et dispense de la pose d&apos;un film séparé — à condition
          de bien coller les bandes de raccord entre lés avec le ruban fourni.
        </p>

        <ArticleCallout type="warning" title="Mesurer l'humidité de la dalle avant toute pose">
          <p>
            Avant de poser quoi que ce soit sur une dalle béton, mesurez son taux
            d&apos;humidité avec un hygromètre à sonde CM (carbure de calcium).
            Un taux supérieur à 2,5 % pour un parquet massif (ou 3 % pour un parquet
            contrecollé) impose un traitement préalable de la dalle — ragréage
            hydrofuge ou application d&apos;une émulsion barrière — avant la pose
            du pare-vapeur et de la sous-couche. Ce contrôle prend 15 minutes
            et peut vous éviter des milliers d&apos;euros de parquet à remplacer.
          </p>
        </ArticleCallout>

        {/* ── SECTION 5 : 5 ERREURS ────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 5 erreurs classiques à éviter lors de l&apos;isolation sol sous parquet
        </h2>

        <p className="text-slate-700 leading-relaxed mb-8">
          La plupart des problèmes qui surviennent après la pose d&apos;un parquet —
          craquements, gonflement, décollement, bruits excessifs — sont directement
          liés à des erreurs commises lors de la préparation du sol ou du choix
          de la sous-couche. Voici les cinq erreurs les plus fréquentes.
        </p>

        <div className="space-y-6 my-8">
          {[
            {
              num: 1,
              titre: "Cumuler deux sous-couches pour « mieux isoler »",
              texte: "Poser deux sous-couches l'une sur l'autre est une erreur grave : le système de clipsage d'un parquet flottant est conçu pour un support rigide et plat. Une double sous-couche trop souple provoque un effet de trampolining qui fatigue les assemblages à clic et entraîne des craquements permanents, voire des ruptures d'emboîtement. Une seule sous-couche, bien choisie, suffit toujours.",
            },
            {
              num: 2,
              titre: "Choisir une sous-couche trop épaisse sur plancher chauffant",
              texte: "Sur plancher chauffant, toute sous-couche dont la résistance thermique dépasse 0,15 m²·K/W (sous-couche + parquet cumulés) bride le système de chauffage. Le résultat : une consommation d'énergie augmentée de 15 à 30 % et un confort thermique médiocre. Vérifiez toujours la valeur R inscrite sur l'emballage avant d'acheter.",
            },
            {
              num: 3,
              titre: "Ne pas laisser de joint de dilatation périphérique",
              texte: "Le parquet flottant doit pouvoir se dilater librement sous l'effet des variations de température et d'humidité. Un joint de dilatation de 8 à 12 mm doit être ménagé tout autour de la pièce (murs, portes, colonnes). Sans ce jeu, le parquet bombe dès la première chaleur estivale ou la première période de chauffage intense.",
            },
            {
              num: 4,
              titre: "Poser le parquet sans acclimater les lames",
              texte: "Les lames de parquet doivent être stockées dans la pièce de destination pendant 48 à 72 heures avant la pose, dans leur emballage légèrement ouvert. Cette acclimatation permet au bois d'atteindre l'équilibre hygrique avec son environnement. Poser des lames non acclimatées dans une pièce chauffée provoque des dilatations différentielles et des joints ouverts.",
            },
            {
              num: 5,
              titre: "Oublier de vérifier la planéité du support",
              texte: "La tolérance de planéité du support pour un parquet flottant est de 3 mm sous une règle de 2 m. Au-delà, les lames reposent sur des points d'appui inégaux et craquent à chaque passage. Un ragréage autonivelant est indispensable si la dalle ou la chape présente des irrégularités, avant toute pose de sous-couche.",
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

        {/* ── SECTION 6 : LIEN ISOLATION PLANCHER ─────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation sol sous parquet et isolation du plancher : deux démarches complémentaires
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Il est important de bien distinguer deux niveaux d&apos;intervention.
          La <strong>sous-couche isolante sous parquet</strong> améliore le confort
          de contact et l&apos;isolation acoustique — mais sa contribution à l&apos;
          isolation thermique du bâtiment reste marginale (R = 0,05 à 0,25 m²·K/W).
          Pour réduire significativement les déperditions thermiques par le plancher,
          il faut intervenir sur le plancher lui-même, en dessous de la chape :
          c&apos;est l&apos;<strong>isolation du plancher bas</strong> à proprement parler.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si votre plancher bas donne sur un vide sanitaire, une cave ou un
          sous-sol non chauffé, vous pouvez être éligible à MaPrimeRénov&apos;
          pour l&apos;<strong>isolation du plancher bas</strong> (R ≥ 3,0 m²·K/W requis).
          Cette aide, cumulable avec la TVA à 5,5 %, peut prendre en charge
          12 à 25 €/m² selon votre revenu. La pose du parquet et de sa sous-couche
          intervient ensuite, une fois l&apos;isolation du plancher réalisée.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans une démarche de rénovation énergétique globale, l&apos;ordre logique est :
          d&apos;abord{' '}
          <Link href="/blog/isolation-pour-sol-beton" className="text-emerald-700 font-semibold hover:underline">
            isoler la dalle béton par le bas ou par une chape flottante
          </Link>
          , puis poser la sous-couche adaptée à votre parquet. Cette séquence
          maximise à la fois le confort, les économies d&apos;énergie et les aides
          publiques disponibles. De la même façon, si vous envisagez simultanément
          d&apos;installer un{' '}
          <Link href="/blog/pompe-a-chaleur-chauffage-au-sol" className="text-emerald-700 font-semibold hover:underline">
            plancher chauffant couplé à une pompe à chaleur
          </Link>
          , le choix de la sous-couche et du type de parquet doit être décidé
          avant le début des travaux — pas à la dernière minute.
        </p>

        <ArticleCallout type="info" title="Récapitulatif : quelle sous-couche selon votre situation">
          <ul className="space-y-2 mt-2 text-sm">
            <li><strong>Appartement en étage, parquet flottant, isolation acoustique prioritaire :</strong> liège 5–6 mm ou fibre de bois 10 mm</li>
            <li><strong>Maison RDC sur dalle béton, humidité possible :</strong> sous-couche composite avec pare-vapeur intégré 5 mm</li>
            <li><strong>Plancher chauffant hydraulique ou électrique :</strong> mousse PE réticulée 3 mm compatible plancher chauffant (R ≤ 0,15)</li>
            <li><strong>Parquet collé :</strong> pas de sous-couche souple — isolation dans la chape ou panneau rigide</li>
            <li><strong>Budget serré, chambre en étage :</strong> mousse PE réticulée 3–4 mm</li>
          </ul>
        </ArticleCallout>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <ArticleCTA
          title="Isolation plancher bas en Île-de-France — devis RGE sous 48h"
          description="Nos artisans certifiés RGE évaluent votre plancher (dalle sur terre-plein, vide sanitaire ou cave), réalisent l'isolation éligible MaPrimeRénov' et vous proposent un devis complet sous 48h. Intervention sur toute l'Île-de-France."
        />

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;isolation sol sous parquet
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
            href="/blog/isolation-pour-sol-beton"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation pour sol béton : guide complet 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/pompe-a-chaleur-chauffage-au-sol"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur pour plancher chauffant : guide 2026
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
            Isolation plancher par ville en Île-de-France
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
