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
  ARTICLE_META, COMPARATIF_TABLE, POSE_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-par-laine-de-roche'

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
      url: 'https://www.greenter.fr/images/blog/laine-de-roche-installation-rouleau-technicien.jpg',
      width: 1600,
      height: 1067,
      alt: "Installateur en combinaison de protection posant un rouleau de laine de roche — isolation par laine de roche",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/laine-de-roche-installation-rouleau-technicien.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Isolation par laine de roche', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function IsolationParLaineDeRoche() {
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
        image="https://www.greenter.fr/images/blog/laine-de-roche-installation-rouleau-technicien.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2600}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/laine-de-roche-installation-rouleau-technicien.jpg"
        heroAlt="Installateur en combinaison de protection blanche posant un rouleau de laine de roche dans une ossature métallique sur un chantier d'isolation"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            L&apos;<strong>isolation par laine de roche</strong> compte parmi les solutions les
            plus utilisées en France pour isoler thermiquement et acoustiquement une maison —
            et pour de bonnes raisons. Cet isolant minéral, fabriqué à partir de roche
            volcanique fondue puis fibrée, combine une excellente performance thermique
            (conductivité λ de 0,034 à 0,040 W/m.K), une résistance au feu incombustible
            (classement A1) et une atténuation acoustique supérieure à la plupart des autres
            isolants courants.
          </p>
          <p>
            Que ce soit pour des <strong>combles perdus</strong> isolés par soufflage ou pose
            de rouleaux, des <strong>combles aménageables</strong> sous rampants, des{' '}
            <strong>murs intérieurs</strong> sur ossature, ou même une{' '}
            <strong>isolation thermique par l&apos;extérieur</strong> (ITE), la laine de
            roche s&apos;adapte à la quasi-totalité des configurations d&apos;un logement. Son
            prix, compris entre <strong>20 et 45 € par m²</strong> pose comprise selon la
            forme et l&apos;épaisseur, en fait également un investissement rentable, éligible
            aux aides MaPrimeRénov&apos; lorsque les travaux sont réalisés par un artisan RGE.
          </p>
          <p>
            Ce guide détaille tout ce qu&apos;il faut savoir avant de choisir l&apos;
            <strong>isolation en laine de roche</strong> pour votre projet : sa fabrication,
            ses usages selon les pièces de la maison, un comparatif face à la laine de verre
            et la fibre de bois, la méthode de pose étape par étape, et les précautions à
            respecter pour un chantier réussi.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Comment est fabriquée la laine de roche et pourquoi elle isole si bien</li>
            <li>Les usages possibles : combles, murs, cloisons et isolation par l&apos;extérieur</li>
            <li>Un comparatif face à la laine de verre et la fibre de bois</li>
            <li>Le prix moyen au m² selon la forme et l&apos;épaisseur</li>
            <li>Les 5 étapes clés pour poser correctement la laine de roche</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : QU'EST-CE QUE LA LAINE DE ROCHE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Qu&apos;est-ce que la laine de roche et pourquoi l&apos;utiliser pour l&apos;isolation ?
        </h2>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Comment est fabriquée la laine de roche ?
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>laine de roche</strong> est un isolant minéral obtenu à partir de basalte
          — une roche volcanique — fondu à plus de 1 500 °C, puis fibré par centrifugation, un
          peu comme la fabrication de la barbe à papa. Les fibres obtenues sont ensuite liées
          par une résine et compressées sous forme de rouleaux ou de panneaux. Ce procédé de
          fabrication à partir d&apos;une matière première abondante explique pourquoi la{' '}
          <strong>laine de roche</strong> reste l&apos;un des isolants les plus produits en
          Europe, aux côtés de sa cousine la laine de verre.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les propriétés qui distinguent la laine de roche
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          La structure fibreuse et enchevêtrée de la <strong>laine de roche</strong> emprisonne
          une grande quantité d&apos;air immobile, ce qui limite considérablement les transferts
          de chaleur — c&apos;est le principe même de l&apos;isolation thermique. Sa
          conductivité thermique λ se situe entre 0,034 et 0,040 W/m.K selon la densité du
          produit, ce qui la place parmi les meilleurs isolants minéraux du marché.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Mais ce qui distingue vraiment la <strong>laine de roche</strong> des autres
          isolants, c&apos;est sa <strong>résistance au feu</strong>. Classée A1 selon la
          classification européenne Euroclasses — la meilleure classe possible — elle est
          totalement incombustible et ne dégage aucune fumée toxique en cas d&apos;incendie.
          Sa masse volumique plus élevée que la laine de verre lui confère également une{' '}
          <strong>isolation phonique</strong> particulièrement performante, ce qui en fait un
          choix privilégié pour les cloisons entre pièces, les murs mitoyens ou les logements
          exposés au bruit routier.
        </p>

        <ArticleStat stats={[
          { value: '0,034–0,040', label: 'conductivité thermique λ (W/m.K) — plus la valeur est basse, plus l\'isolant est performant', color: 'blue' },
          { value: 'A1', label: 'classement au feu — incombustible, la meilleure classe possible', color: 'green' },
          { value: '20–45 €', label: 'prix moyen au m² pose comprise selon la forme et l\'épaisseur', color: 'amber' },
        ]} />

        {/* ---- SECTION 2 : USAGES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation par laine de roche : quels usages dans la maison ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La polyvalence de la <strong>laine de roche</strong> est l&apos;une des raisons de
          son succès : elle se décline en plusieurs formats (rouleaux, panneaux semi-rigides,
          panneaux rigides, flocons pour soufflage) qui couvrent pratiquement tous les besoins
          d&apos;isolation d&apos;un logement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour les <strong>combles perdus</strong>, la laine de roche se pose en rouleaux
          déroulés directement sur le plancher, ou en flocons soufflés à l&apos;aide d&apos;une
          machine pneumatique — une méthode rapide qui épouse parfaitement les irrégularités
          du plancher. Notre guide sur le{' '}
          <Link href="/blog/prix-d-une-isolation-des-combles" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            prix d&apos;une isolation des combles
          </Link>{' '}
          détaille le budget à prévoir pour ce type de chantier, laine de roche comprise.
        </p>

        <ArticleImageSection
          image="/images/blog/laine-de-roche-panneau-combles-perdus-mesure.jpg"
          alt="Technicien en combinaison de protection mesurant un panneau de laine de roche posé entre les solives d'un plancher de combles perdus"
          imagePosition="right"
        >
          <p>
            Pour des <strong>combles aménageables</strong>, la laine de roche se pose en
            panneaux semi-rigides entre les chevrons, sous rampants de toiture. Sa tenue
            mécanique légèrement supérieure à la laine de verre facilite le maintien entre
            les montants avant la pose du pare-vapeur et des finitions. Notre article sur l&apos;
            <Link href="/blog/isolation-rampants-de-toiture" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              isolation des rampants de toiture
            </Link>{' '}
            compare en détail la laine de roche aux autres isolants pour cet usage précis.
          </p>
          <p className="mt-3">
            Pour l&apos;<strong>isolation des murs intérieurs</strong>, la laine de roche se
            glisse entre les montants d&apos;une ossature métallique ou bois, avant la pose
            d&apos;une plaque de plâtre. C&apos;est une solution particulièrement adaptée aux
            pièces humides (salle de bain, cuisine) grâce à sa bonne tenue face à l&apos;humidité,
            et aux pièces nécessitant une isolation phonique renforcée.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Enfin, pour une <strong>isolation thermique par l&apos;extérieur</strong> (ITE), des
          panneaux rigides de laine de roche à haute densité sont fixés sur la façade puis
          recouverts d&apos;un enduit ou d&apos;un bardage. Cette technique traite les ponts
          thermiques au niveau des planchers et évite de réduire la surface habitable
          intérieure — un avantage décisif lors d&apos;une rénovation lourde. La laine de roche
          convient également très bien à l&apos;isolation des <strong>cloisons acoustiques</strong>{' '}
          entre logements ou entre une pièce de vie et un local technique bruyant (chaufferie,
          buanderie).
        </p>

        <ArticleFullImage
          image="/images/blog/laine-de-roche-panneaux-empiles-ossature-bois.jpg"
          alt="Panneaux de laine de roche empilés devant une ossature bois avec pare-vapeur, prêts à être posés pour l'isolation d'un mur intérieur"
          caption="Panneaux de laine de roche prêts à être insérés entre les montants d'une ossature bois. Le pare-vapeur visible en arrière-plan doit être posé côté chaud pour éviter les problèmes de condensation."
        />

        {/* ---- SECTION 3 : ROULEAUX OU PANNEAUX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Laine de roche en rouleaux ou en panneaux : quelle différence pour la pose ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le choix entre <strong>rouleaux</strong> et <strong>panneaux semi-rigides</strong>{' '}
          de laine de roche dépend avant tout de la surface à isoler et de sa configuration.
          Les rouleaux, plus souples, conviennent parfaitement aux grandes surfaces planes et
          dégagées comme un plancher de combles perdus : ils se déroulent rapidement et
          couvrent une grande superficie avec peu de découpes.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Les <strong>panneaux semi-rigides</strong>, plus denses et plus fermes, sont mieux
          adaptés à une pose verticale entre des montants — murs, cloisons, rampants — car ils
          tiennent en place par simple compression sans s&apos;affaisser sous leur propre
          poids. Les <strong>panneaux rigides</strong> à très haute densité, enfin, sont
          réservés aux usages qui demandent une résistance mécanique accrue, comme
          l&apos;isolation thermique par l&apos;extérieur sous enduit, où le panneau doit
          supporter le poids de la finition sans se déformer.
        </p>

        {/* ---- SECTION 4 : COMPARATIF ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation par laine de roche vs laine de verre vs fibre de bois : comparatif
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour choisir entre la <strong>laine de roche</strong> et les autres isolants
          courants, il faut comparer non seulement le prix mais aussi la performance
          thermique, la réaction au feu et les usages privilégiés de chaque matériau. Le
          tableau ci-dessous résume les principales différences.
        </p>

        <ArticleTable {...COMPARATIF_TABLE} title="Comparatif laine de roche, laine de verre, fibre de bois et ouate de cellulose — 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Face à la <strong>laine de verre</strong>, la laine de roche affiche une performance
          thermique très proche — la différence se joue surtout sur la résistance au feu
          (systématiquement A1 pour la laine de roche) et l&apos;isolation phonique, supérieure
          grâce à sa densité plus élevée. La laine de verre reste néanmoins souvent un peu
          moins chère et plus légère à manipuler, ce qui explique sa popularité pour les
          grandes surfaces de combles perdus.
        </p>

        <ArticleImageSection
          image="/images/blog/fibre-de-bois-panneau-rigide-comparatif-isolant.jpg"
          alt="Panneau rigide de fibre de bois haute densité, un isolant biosourcé alternatif à la laine de roche pour l'isolation thermique par l'extérieur"
          imagePosition="left"
        >
          <p>
            Face à la <strong>fibre de bois</strong>, la comparaison est différente : ce
            matériau biosourcé offre un excellent déphasage thermique (confort d&apos;été
            supérieur) mais une conductivité thermique légèrement moins bonne et une réaction
            au feu combustible, contrairement à la laine de roche. Son prix est également
            plus élevé (30 à 60 €/m² contre 20 à 45 €/m² pour la laine de roche).
          </p>
          <p className="mt-3">
            En résumé : la laine de roche s&apos;impose dès que la <strong>sécurité
            incendie</strong> ou l&apos;<strong>isolation acoustique</strong> sont prioritaires,
            tandis que la fibre de bois séduit les projets recherchant un matériau biosourcé
            avec un excellent confort d&apos;été.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 5 : EPAISSEUR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle épaisseur de laine de roche pour une bonne isolation thermique ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;épaisseur nécessaire de <strong>laine de roche</strong> se calcule à partir de
          la formule R = e / λ, où R est la résistance thermique visée (en m².K/W), e
          l&apos;épaisseur de l&apos;isolant (en mètres) et λ sa conductivité thermique. Pour
          des combles perdus, MaPrimeRénov&apos; exige en 2026 une résistance thermique R ≥ 7
          m².K/W, ce qui correspond à environ 280 à 350 mm de laine de roche selon la densité
          du produit choisi.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour l&apos;isolation des murs intérieurs, l&apos;objectif de référence est
          généralement R = 3,7 m².K/W, atteint avec 130 à 150 mm de laine de roche en panneaux
          semi-rigides. Notre article sur l&apos;
          <Link href="/blog/isolation-mur-interieur-quelle-epaisseur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            épaisseur d&apos;isolant pour mur intérieur
          </Link>{' '}
          détaille ce calcul pour chaque niveau de performance et chaque type d&apos;isolant,
          laine de roche comprise.
        </p>

        <ArticleCallout type="tip" title="Ne pas confondre épaisseur nominale et épaisseur utile">
          <p>
            Un panneau de laine de roche légèrement comprimé lors de la pose perd une partie
            de son pouvoir isolant : veillez à ce que l&apos;épaisseur annoncée par le
            fabricant corresponde bien à l&apos;épaisseur réellement disponible entre les
            montants ou chevrons, sans compression excessive du matériau.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 6 : PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel est le prix d&apos;une isolation en laine de roche en 2026 ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix de l&apos;<strong>isolation par laine de roche</strong> varie entre 20 et
          45 € par m² pose comprise, selon la forme du produit et l&apos;épaisseur posée. Les
          rouleaux pour combles perdus se situent en bas de cette fourchette (20 à 30 €/m²),
          tandis que les panneaux rigides destinés à une isolation par l&apos;extérieur sont
          plus onéreux (35 à 45 €/m²) en raison de leur densité supérieure et de la complexité
          de mise en œuvre.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Comme pour tout matériau isolant, le prix final dépend aussi de la surface totale à
          traiter, de l&apos;accessibilité du chantier et de la région. Les travaux réalisés
          par un artisan certifié RGE restent éligibles à MaPrimeRénov&apos; et aux primes CEE,
          ce qui peut réduire significativement le reste à charge. Pour une vision complète du
          budget selon la taille de votre logement, consultez notre guide sur le{' '}
          <Link href="/blog/prix-isolation-combles-au-m2" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            prix de l&apos;isolation des combles au m²
          </Link>, qui détaille également les barèmes d&apos;aides applicables en 2026.
        </p>

        {/* ---- SECTION 7 : POSE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment poser de la laine de roche : les étapes clés
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Que ce soit pour des combles, un mur ou une cloison, la pose de la{' '}
          <strong>laine de roche</strong> suit une méthode assez similaire d&apos;un chantier à
          l&apos;autre. Voici les cinq étapes clés à respecter pour un résultat conforme aux
          performances annoncées par le fabricant.
        </p>

        <ArticleSteps steps={POSE_STEPS} />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ces étapes, bien que simples en apparence, demandent une certaine rigueur : un
          pare-vapeur mal posé ou une découpe imprécise autour d&apos;un obstacle (câble,
          conduit) peut créer un pont thermique localisé qui réduit sensiblement la
          performance globale de l&apos;isolation. C&apos;est pourquoi la pose par un artisan
          certifié RGE reste recommandée, notamment pour rester éligible aux aides
          financières.
        </p>

        {/* ---- SECTION 8 : AVANTAGES INCONVENIENTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Laine de roche : avantages, inconvénients et précautions à la pose
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les <strong>avantages de la laine de roche</strong> sont nombreux : excellente
          performance thermique, incombustibilité totale (classe A1), bonne isolation
          acoustique, résistance à l&apos;humidité et durabilité dans le temps sans tassement
          significatif. Elle est également recyclable en fin de vie, un critère de plus en
          plus valorisé dans les projets de rénovation énergétique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Côté <strong>inconvénients</strong>, la laine de roche est plus lourde que la laine
          de verre, ce qui peut compliquer légèrement sa manipulation sur un chantier en
          hauteur. Son prix est également un peu supérieur à celui de la laine de verre à
          performance équivalente. Enfin, comme tout isolant minéral, elle nécessite un{' '}
          <strong>équipement de protection individuelle</strong> lors de la pose.
        </p>

        <ArticleCallout type="warning" title="Les précautions indispensables à la pose">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Porter des gants, des lunettes de protection et un masque anti-poussière lors de la découpe et de la manipulation</li>
            <li>Porter des vêtements couvrants pour éviter le contact direct des fibres avec la peau, potentiellement irritant</li>
            <li>Aérer la pièce pendant et après la pose pour évacuer les particules en suspension</li>
            <li>Ne jamais tasser excessivement le matériau, au risque de réduire sa performance thermique réelle</li>
          </ul>
        </ArticleCallout>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si votre projet concerne également l&apos;isolation d&apos;une cave ou d&apos;un
          sous-sol, sachez que la laine de roche n&apos;est pas toujours la solution la plus
          adaptée face à l&apos;humidité permanente de ces espaces. Notre guide sur l&apos;
          <Link href="/blog/isolation-pour-cave" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            isolation pour cave
          </Link>{' '}
          détaille les matériaux les mieux adaptés à ces environnements spécifiques.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Obtenez un devis d'isolation en laine de roche en Île-de-France"
          description="Nos artisans certifiés RGE réalisent le diagnostic de votre chantier, vous conseillent sur l'épaisseur et la forme de laine de roche adaptées, et montent votre dossier MaPrimeRénov' 2026. Devis gratuit sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;isolation par laine de roche
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

        {/* ---- SOURCES ---- */}
        <ArticleSources sources={SOURCES} />

        {/* ---- LIENS INTERNES ---- */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              Isolation mur intérieur : quelle épaisseur ?
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/isolation-rampants-de-toiture"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation rampants de toiture : guide complet
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/prix-d-une-isolation-des-combles"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une isolation des combles
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Isolation en laine de roche par ville en Île-de-France
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
