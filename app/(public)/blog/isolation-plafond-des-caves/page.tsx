import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSteps, ArticleSources,
  ArticleImageSection,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, GAIN_TABLE, ISOLANTS_TABLE, POSE_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-plafond-des-caves'

const HERO_IMAGE = '/images/blog/isolation-plafond-des-caves-pose-laine-de-roche-dalle-beton.jpg'
const HERO_ALT = "Artisan en combinaison blanche fixant un panneau de laine de roche sous la dalle béton d'une cave — isolation plafond des caves"

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
      url: `https://www.greenter.fr${HERO_IMAGE}`,
      width: 2000,
      height: 1333,
      alt: HERO_ALT,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: [`https://www.greenter.fr${HERO_IMAGE}`],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Isolation plafond des caves', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function IsolationPlafondDesCaves() {
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
        image={`https://www.greenter.fr${HERO_IMAGE}`}
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={3300}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage={HERO_IMAGE}
        heroAlt={HERO_ALT}
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Un carrelage glacé au saut du lit, un salon qui ne parvient jamais à être
            vraiment confortable malgré des radiateurs bien chauds : dans une maison
            construite sur cave, le froid vient souvent d&apos;en dessous. La cave, rarement
            chauffée, reste à une température proche de celle du sol, autour de 10 à 12 °C
            en hiver, et la dalle qui la sépare de votre logement laisse filer la chaleur
            vers le bas en permanence.
          </p>
          <p>
            L&apos;<strong>isolation plafond des caves</strong> consiste à poser un isolant
            sous cette dalle, côté cave. C&apos;est l&apos;un des chantiers d&apos;isolation
            les plus simples et les plus rapides : pas de travaux dans les pièces de vie, pas
            de sol à refaire, souvent une seule journée d&apos;intervention. Encore faut-il
            choisir le bon isolant, adapter la pose au type de plafond et gérer les tuyaux qui
            courent sous la dalle.
          </p>
          <p>
            Ce guide se concentre exclusivement sur le plafond. Si vous envisagez
            d&apos;aménager votre sous-sol et d&apos;isoler aussi les murs et le sol, notre
            guide complet sur l&apos;
            <Link href="/blog/isolation-pour-cave" className={linkCls}>isolation pour cave</Link>{' '}
            présente l&apos;ensemble des solutions.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le gain réel d&apos;une isolation du plafond de cave, chiffré honnêtement</li>
            <li>Les techniques selon votre plafond : dalle béton, hourdis, voûte, solives bois</li>
            <li>Le comparatif des isolants pour atteindre R ≥ 3</li>
            <li>La pose en 6 étapes, avec les réseaux, l&apos;humidité et la hauteur sous plafond</li>
            <li>Le cas des copropriétés, le prix au m² et les aides 2026</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation plafond des caves : pourquoi c&apos;est un chantier prioritaire
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Vu de la cave, c&apos;est un plafond. Vu du logement, c&apos;est le{' '}
          <strong>plancher bas</strong> : la paroi qui sépare l&apos;espace chauffé
          d&apos;un local froid. En thermique du bâtiment, tout ce qui sépare un volume
          chauffé d&apos;un volume non chauffé fait partie de l&apos;enveloppe à isoler, au
          même titre que les murs extérieurs ou la toiture.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La part du plancher bas dans les pertes de chaleur est plus modeste que celle de la
          toiture, mais l&apos;isolation de la cave a deux atouts que les autres chantiers
          n&apos;ont pas : elle se réalise sans toucher aux pièces habitées, et elle agit
          directement sur la température du sol, celle que vous ressentez sous vos pieds.
          C&apos;est pourquoi elle figure parmi les premiers gestes recommandés dans les
          maisons anciennes construites sur sous-sol, très nombreuses en Île-de-France.
        </p>

        <ArticleStat stats={[
          { value: '7–10 %', label: 'des pertes de chaleur d\'une maison non isolée passent par le plancher bas (ADEME)', color: 'blue' },
          { value: 'R ≥ 3', label: 'résistance thermique exigée pour les primes CEE sur un plancher bas (m².K/W)', color: 'green' },
          { value: '1 jour', label: 'durée habituelle du chantier pour une cave de maison individuelle', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces trois chiffres résument l&apos;intérêt du chantier. Le premier rappelle que le
          gain financier, réel, reste mesuré. Le deuxième fixe l&apos;objectif technique à
          atteindre pour bénéficier des aides et obtenir un résultat durable. Le troisième
          explique pourquoi l&apos;isolation plafond des caves offre l&apos;un des meilleurs
          rapports entre confort gagné et dérangement subi.
        </p>

        {/* ---- SECTION 2 : GAIN ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel gain attendre de l&apos;isolation du plafond de votre cave ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Plutôt que de promettre un pourcentage spectaculaire, faisons le calcul sur un cas
          type : une maison de 100 m² construite sur une cave non chauffée, avec une dalle
          béton jamais isolée, et une facture de chauffage d&apos;environ 1 800 € par an.
        </p>

        <ArticleTable {...GAIN_TABLE} title="Isolation plafond des caves : estimation des économies" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Une centaine d&apos;euros par an peut sembler peu. Mais l&apos;investissement,
          après aides, est souvent amorti en 5 à 10 ans, et le bénéfice de
          confort est immédiat : un sol plus chaud de quelques degrés permet souvent de
          baisser la consigne du thermostat d&apos;un degré sans perdre en confort. Or,
          selon l&apos;ADEME, chaque degré en moins représente environ 7 % de consommation de
          chauffage en moins — une économie qui s&apos;ajoute à celle du tableau.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;effet est plus marqué encore si les pièces au-dessus de la cave ont un sol
          carrelé, un matériau froid au toucher, ou si votre logement est chauffé par une{' '}
          <Link href="/services/pompe-a-chaleur" className={linkCls}>pompe à chaleur</Link> :
          en réduisant les besoins de chauffage, vous permettez à la PAC de fonctionner avec
          une eau moins chaude, donc avec un meilleur rendement.
        </p>

        {/* ---- SECTION 3 : TYPES DE PLAFOND ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation plafond des caves : la technique dépend de votre plafond
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Avant de choisir un isolant, levez les yeux. La nature du plafond de votre cave
          détermine la méthode de pose, la fixation et parfois même le type d&apos;isolant
          utilisable. On rencontre quatre grandes familles de plafonds de cave en
          Île-de-France.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Dalle béton pleine : le cas le plus simple
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Fréquente dans les maisons construites depuis les années 1960, la dalle béton plane
          se prête idéalement à la pose de panneaux rigides, fixés par des chevilles à rosace
          qui traversent l&apos;isolant et s&apos;ancrent dans le béton. Le chantier est
          rapide et le résultat très homogène, à condition de traiter soigneusement les
          retombées de poutres et la jonction avec les murs.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Plancher à poutrelles et hourdis
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Très répandu dans les pavillons des années 1970 à 2000, le plancher à poutrelles
          béton et hourdis présente une sous-face moins régulière. Les hourdis creux, en béton
          ou en terre cuite, n&apos;offrent pas toujours une bonne prise aux chevilles : il
          faut des fixations adaptées, ancrées de préférence dans les poutrelles. Une
          vérification préalable de la tenue du support est indispensable.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Cave voûtée en pierre ou en briques
        </h3>

        <ArticleImageSection
          image="/images/blog/isolation-plafond-des-caves-voute-pierre-isolant-mince.jpg"
          alt="Artisan en veste orange posant de l'adhésif aluminium entre deux lés d'isolant mince réfléchissant fixés au plafond d'une cave aux murs en pierre"
          imagePosition="right"
        >
          <p>
            Les caves voûtées des maisons anciennes et des immeubles haussmanniens sont les
            plus délicates à isoler : les panneaux rigides ne peuvent pas épouser la courbe de
            la voûte.
          </p>
          <p className="mt-3">
            On voit souvent des isolants minces réfléchissants posés dans ces caves, comme
            ici. Leur souplesse facilite la pose, mais seuls, ils n&apos;atteignent pas la
            résistance thermique R ≥ 3 exigée pour les aides. Ils ne valent qu&apos;en
            complément d&apos;un isolant épais.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour une voûte, deux solutions donnent de vrais résultats : la{' '}
          <strong>projection d&apos;isolant</strong> (laine minérale ou mousse polyuréthane)
          qui épouse parfaitement la forme du plafond, ou la création d&apos;un{' '}
          <strong>faux plafond droit isolé</strong> sous la voûte, lorsque la hauteur
          disponible le permet. Attention aussi à l&apos;humidité, fréquente dans les caves
          voûtées anciennes : les murs en pierre doivent pouvoir continuer à respirer.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Plancher bois sur solives
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Dans certaines maisons anciennes, le plafond de la cave est formé de solives en
          bois portant le plancher de l&apos;étage. L&apos;isolant se place alors entre les
          solives, maintenu par des suspentes ou un parement, éventuellement complété par une
          couche continue sous les solives pour couper les ponts thermiques. Le bois étant
          sensible à l&apos;humidité, ce cas demande une attention particulière à la
          ventilation de la cave et au choix de la membrane, comme nous l&apos;expliquons dans
          notre guide sur l&apos;
          <Link href="/blog/isolation-sol-sous-parquet" className={linkCls}>
            isolation du sol sous parquet
          </Link>.
        </p>

        {/* ---- SECTION 4 : ISOLANTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel isolant choisir pour le plafond d&apos;une cave ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le choix de l&apos;isolant répond à quatre critères propres à la cave : la{' '}
          <strong>résistance thermique</strong> à atteindre (R ≥ 3 m².K/W), la{' '}
          <strong>hauteur sous plafond</strong> disponible, la{' '}
          <strong>sécurité incendie</strong> — la cave abrite souvent une chaudière, un
          tableau électrique ou des produits inflammables — et la tenue à l&apos;
          <strong>humidité</strong>.
        </p>

        <ArticleTable {...ISOLANTS_TABLE} title="Comparatif des isolants pour l'isolation plafond des caves" />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          La laine de roche, référence pour le plafond des caves
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Incombustible, stable dans le temps, insensible à l&apos;humidité ambiante et
          performante en acoustique, la laine de roche en panneaux rigides coche toutes les
          cases. C&apos;est l&apos;isolant que nos équipes posent le plus souvent en plafond de
          cave, et pratiquement le seul envisageable dans les caves collectives. Notre guide
          sur l&apos;
          <Link href="/blog/isolation-par-laine-de-roche" className={linkCls}>
            isolation par laine de roche
          </Link>{' '}
          détaille ses propriétés.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-plafond-des-caves-panneaux-polystyrene.jpg"
          alt="Homme en t-shirt bleu posant des panneaux de polystyrène expansé blanc bord à bord sous un plafond en béton brut"
          imagePosition="left"
        >
          <p>
            Le polystyrène expansé est léger, économique et facile à découper : il reste très
            utilisé pour isoler le plafond d&apos;une cave de maison individuelle.
          </p>
          <p className="mt-3">
            Étant combustible, il doit cependant être protégé lorsque la cave abrite une
            chaudière ou un local technique, et il est généralement exclu des sous-sols de
            copropriété au profit d&apos;isolants incombustibles.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Polyuréthane : la solution quand la hauteur manque
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Avec la meilleure performance par centimètre, le polyuréthane atteint R = 3 avec
          seulement 7 à 8 cm. C&apos;est la solution des caves basses de plafond, où chaque
          centimètre compte pour continuer à circuler debout. Il est en revanche plus cher et,
          comme le polystyrène, combustible.
        </p>

        {/* ---- SECTION 5 : POSE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment isoler le plafond d&apos;une cave : les 6 étapes
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Sur une dalle béton, le chantier suit toujours le même déroulé. La qualité du
          résultat tient moins à l&apos;isolant qu&apos;à la continuité de la pose : le moindre
          espace entre deux panneaux, ou un pourtour non traité, crée un pont thermique qui
          réduit sensiblement la performance globale.
        </p>

        <ArticleSteps steps={POSE_STEPS} />

        {/* ---- SECTION 6 : CONTRAINTES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Réseaux, humidité, hauteur : les pièges du plafond de cave
        </h2>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Canalisations, gaines et luminaires
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Le plafond d&apos;une cave est rarement nu : tuyaux de chauffage, évacuations,
          câbles électriques, gaine de ventilation. Les réseaux qui doivent rester accessibles
          — vannes, regards, boîtes de dérivation — ne doivent jamais être enfermés sous
          l&apos;isolant. Les tuyaux d&apos;eau qui se retrouvent du côté froid après isolation
          doivent être calorifugés pour éviter le gel en hiver, un point souvent oublié.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Humidité et ventilation de la cave
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Une fois le plafond isolé, la cave ne reçoit plus la chaleur qui fuyait du logement :
          elle devient plus fraîche, et l&apos;humidité relative peut augmenter. C&apos;est
          normal, mais la cave doit impérativement rester ventilée par ses soupiraux ou ses
          grilles d&apos;aération. Si les murs présentent déjà des infiltrations ou du
          salpêtre, traitez-les avant d&apos;isoler : notre guide sur l&apos;
          <Link href="/blog/isolation-murs-humides" className={linkCls}>
            isolation des murs humides
          </Link>{' '}
          explique comment procéder.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Hauteur sous plafond
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Une isolation R ≥ 3 retire 8 à 13 cm de hauteur selon l&apos;isolant. Dans une cave
          de 2,20 m, cela ne pose aucun problème ; dans une cave de 1,90 m où l&apos;on passe
          déjà en se baissant, le polyuréthane devient presque incontournable. Mesurez aussi
          le dégagement devant la porte et sous les retombées de poutres avant de choisir.
        </p>

        {/* ---- SECTION 7 : COPROPRIETE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation plafond des caves en copropriété
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans un immeuble, le plafond des caves est aussi le plancher des appartements du
          rez-de-chaussée, souvent les plus difficiles à chauffer de la résidence. Isoler le
          plafond des caves et du sous-sol est donc un chantier collectif particulièrement
          rentable : une seule intervention améliore le confort de plusieurs logements, sans
          aucuns travaux chez les occupants.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Un vote en assemblée générale
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Les caves et sous-sols étant des parties communes, les travaux doivent être votés en
          assemblée générale, sur la base de devis présentés par le syndic. La majorité
          requise dépend de la nature des travaux : interrogez votre syndic en amont pour
          inscrire la résolution à l&apos;ordre du jour dans les bonnes conditions.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Sécurité incendie : un critère décisif
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Les sous-sols d&apos;immeubles d&apos;habitation sont soumis à une réglementation
          incendie plus stricte qu&apos;une maison individuelle. L&apos;isolant posé en
          plafond doit présenter une réaction au feu adaptée, ce qui oriente généralement vers
          la laine de roche ou des panneaux composites incombustibles, parfois avec un
          parement de finition. Le polystyrène nu est en pratique à proscrire dans ces
          espaces.
        </p>

        {/* ---- SECTION 8 : PRIX ET AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix et aides pour l&apos;isolation du plafond des caves en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour une pose de panneaux isolants sous une dalle béton, comptez en moyenne{' '}
          <strong>20 à 60 € TTC par m²</strong>, fourniture et pose comprises. Le prix varie
          selon l&apos;isolant, l&apos;épaisseur, l&apos;accessibilité de la cave et surtout le
          nombre de réseaux à contourner. Une voûte à isoler par projection ou un faux plafond
          isolé se situe plus haut. Pour une cave de 60 m², le budget se situe donc le plus
          souvent entre 1 200 et 3 600 € avant aides.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ce prix est à rapprocher de celui des autres chantiers d&apos;isolation : à surface
          égale, isoler un plafond de cave coûte nettement moins qu&apos;une{' '}
          <Link href="/blog/isolation-pour-sol-beton" className={linkCls}>
            isolation de sol béton par-dessus la dalle
          </Link>
          , qui impose de refaire chape et revêtement dans les pièces de vie.
        </p>

        <ArticleCallout type="tip" title="Les aides mobilisables">
          <p>
            L&apos;isolation d&apos;un plancher bas réalisée par une entreprise certifiée RGE
            ouvre droit aux primes CEE, à condition d&apos;atteindre une résistance thermique
            R ≥ 3 m².K/W, ainsi qu&apos;à la TVA réduite à 5,5 %. Selon vos revenus et votre
            projet, MaPrimeRénov&apos; peut s&apos;ajouter, notamment dans le cadre d&apos;une
            rénovation d&apos;ampleur ; en copropriété, MaPrimeRénov&apos; Copropriété peut
            financer un programme de travaux collectif. Les conditions évoluent chaque année :
            le dossier doit toujours être déposé avant la signature du devis.
          </p>
        </ArticleCallout>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si votre maison souffre aussi de pertes par la toiture, gardez en tête l&apos;ordre
          de priorité : les combles restent le premier poste de déperdition, comme le rappelle
          notre guide sur le{' '}
          <Link href="/blog/prix-d-une-isolation-des-combles" className={linkCls}>
            prix d&apos;une isolation des combles
          </Link>
          . Les deux chantiers se combinent très bien dans un même projet, et une seule visite
          technique permet de chiffrer l&apos;ensemble.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Isolation du plafond de votre cave en Île-de-France"
          description="Nos artisans certifiés RGE évaluent votre plafond de cave, choisissent l'isolant adapté à votre hauteur et à vos réseaux, et montent votre dossier d'aides CEE. Maisons et copropriétés. Visite technique et devis gratuits sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;isolation du plafond des caves
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
          {[
            { href: '/services/isolation', kicker: 'Notre service', title: 'Isolation thermique en Île-de-France', cta: 'Voir le service' },
            { href: '/blog/isolation-pour-cave', kicker: 'Guide complémentaire', title: 'Isolation pour cave : le guide complet', cta: 'Lire le guide' },
            { href: '/blog/isolation-par-laine-de-roche', kicker: 'Article associé', title: 'Isolation par laine de roche', cta: 'Lire le guide' },
            { href: '/blog/isolation-pour-sol-beton', kicker: 'Article associé', title: 'Isolation pour sol béton', cta: 'Lire le guide' },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{card.kicker}</p>
              <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">{card.title}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
                {card.cta} <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </Link>
          ))}
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Isolation par ville en Île-de-France
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
