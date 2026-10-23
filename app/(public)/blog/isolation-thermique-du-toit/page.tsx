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
  ARTICLE_META, TECHNIQUES_TABLE, ISOLANTS_TABLE, DIAGNOSTIC_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-thermique-du-toit'

const HERO_IMAGE = '/images/blog/isolation-thermique-du-toit-isolant-entre-chevrons.jpg'
const HERO_ALT = "Vue en coupe d'une charpente bois avec panneaux de laine minérale entre les chevrons, écran sous-toiture et couverture en tuiles — isolation thermique du toit"

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
      width: 1254,
      height: 836,
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
  { name: 'Isolation thermique du toit', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function IsolationThermiqueDuToit() {
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
        wordCount={3100}
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
            Une chambre sous les toits glaciale en janvier et étouffante en juillet, une
            chaudière ou une pompe à chaleur qui tourne sans relâche, de la neige qui fond plus
            vite sur votre toit que sur celui des voisins : ces signes ont la même origine.
            L&apos;air chaud monte, et quand rien ne l&apos;arrête, il s&apos;échappe par la
            toiture.
          </p>
          <p>
            L&apos;<strong>isolation thermique du toit</strong> est pour cette raison le
            premier chantier recommandé dans une maison mal isolée. Mais « isoler le toit »
            recouvre des techniques très différentes : souffler de la laine sur le plancher de
            combles perdus n&apos;a rien à voir avec l&apos;isolation des rampants
            d&apos;une chambre mansardée, la pose de panneaux par l&apos;extérieur lors
            d&apos;une réfection de couverture, ou l&apos;isolation d&apos;un toit plat.
          </p>
          <p>
            Ce guide vous aide à identifier la bonne solution pour votre toiture, la
            performance à viser, le budget et les aides disponibles après la réforme de
            MaPrimeRénov&apos; de septembre 2026. Pour chaque technique, nous renvoyons vers nos
            guides détaillés.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Pourquoi le toit est le premier poste de déperdition</li>
            <li>La bonne technique selon votre toit : combles, rampants, sarking, toit plat, bac acier</li>
            <li>Les résistances thermiques à atteindre et les isolants qui protègent aussi de l&apos;été</li>
            <li>L&apos;obligation d&apos;isoler lors d&apos;une réfection de toiture</li>
            <li>Les prix au m² et les aides 2026, après la fin de MaPrimeRénov&apos; par geste</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation thermique du toit : pourquoi c&apos;est le chantier prioritaire
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans une maison individuelle non isolée, la chaleur s&apos;échappe par toutes les
          parois, mais pas à parts égales. Le toit cumule deux handicaps : c&apos;est vers lui
          que l&apos;air chaud s&apos;accumule, et c&apos;est souvent la paroi la plus étendue
          et la plus exposée au vent, à la pluie et au rayonnement nocturne. Une toiture sans
          isolant, ou avec quelques centimètres de laine tassée posés il y a quarante ans,
          laisse filer une part considérable de l&apos;énergie de chauffage.
        </p>

        <ArticleStat stats={[
          { value: '25–30 %', label: 'des pertes de chaleur d\'une maison non isolée passent par la toiture (ADEME)', color: 'blue' },
          { value: 'R ≥ 7', label: 'résistance thermique exigée pour les primes CEE en combles perdus (m².K/W)', color: 'green' },
          { value: '50 %', label: 'de couverture refaite : seuil au-delà duquel l\'isolation devient en principe obligatoire', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-4">
          Ces chiffres se lisent ensemble. Un quart à près d&apos;un tiers des pertes, c&apos;est
          davantage que les murs, les fenêtres ou le plancher pris séparément. L&apos;objectif
          de résistance thermique fixé pour les aides est élevé, ce qui suppose 25 à 30 cm
          d&apos;isolant en combles perdus. Et la réglementation impose d&apos;isoler dès que
          l&apos;on refait une grande partie de la couverture, pour ne pas laisser passer
          l&apos;occasion pendant trente ans.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;isolation de la toiture agit enfin sur le confort d&apos;été, un sujet devenu
          central avec la multiplication des épisodes caniculaires en Île-de-France. Un
          isolant bien choisi freine la chaleur qui traverse les tuiles en plein soleil et
          garde les pièces sous les toits vivables. Si votre logement est chauffé par une{' '}
          <Link href="/services/pompe-a-chaleur" className={linkCls}>pompe à chaleur</Link>,
          les besoins réduits lui permettent en outre de travailler avec une eau moins chaude,
          donc avec un meilleur rendement.
        </p>

        {/* ---- SECTION 2 : TECHNIQUES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle isolation thermique du toit selon votre type de toiture ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le choix de la technique ne se fait pas sur catalogue : il découle de la forme du
          toit, de l&apos;usage des combles et de l&apos;état de la couverture. Le tableau
          ci-dessous résume les cinq situations que nous rencontrons le plus souvent sur nos
          chantiers.
        </p>

        <ArticleTable {...TECHNIQUES_TABLE} title="Isolation thermique du toit : la technique selon votre toiture" />

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;écart de prix entre la première et la troisième ligne est considérable, et il
          s&apos;explique simplement : isoler des combles perdus, c&apos;est poser un isolant
          sur un plancher accessible, alors que le sarking implique de déposer la couverture.
          À performance égale, la technique la moins chère est donc presque toujours celle qui
          isole au plus près du volume chauffé, sans toucher à la toiture elle-même.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Combles perdus : isoler le plancher plutôt que le toit
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Quand les combles ne sont pas habitables, inutile d&apos;isoler sous les tuiles :
          c&apos;est le plancher des combles qui sépare le logement chauffé de l&apos;espace
          froid. On y souffle de la laine de verre, de la laine de roche ou de la ouate de
          cellulose, ou l&apos;on déroule des rouleaux en deux couches croisées. C&apos;est la
          solution la plus rentable de toute la rénovation énergétique, réalisée le plus
          souvent en une journée. Le détail des tarifs figure dans notre guide du{' '}
          <Link href="/blog/prix-isolation-combles-au-m2" className={linkCls}>
            prix de l&apos;isolation des combles au m²
          </Link>.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Combles aménagés : isoler les rampants par l&apos;intérieur
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Si les combles sont habités, l&apos;isolant suit la pente du toit. Il se pose entre
          les chevrons, puis en seconde couche sous les chevrons pour couper les ponts
          thermiques, avec un pare-vapeur ou une membrane hygrorégulante continue côté
          intérieur et un parement en plaques de plâtre. Cette isolation des rampants réduit
          un peu le volume habitable mais ne touche pas à la couverture. Toutes les étapes
          sont décrites dans notre guide sur l&apos;
          <Link href="/blog/isolation-rampants-de-toiture" className={linkCls}>
            isolation des rampants de toiture
          </Link>
          , et si vos combles sont déjà isolés mais restent froids, notre article sur l&apos;
          <Link href="/blog/isolation-comble-rampant" className={linkCls}>
            isolation comble rampant défaillante
          </Link>{' '}
          vous aide à diagnostiquer le problème.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le sarking : l&apos;isolation thermique du toit par l&apos;extérieur
        </h3>

        <ArticleImageSection
          image="/images/blog/isolation-thermique-du-toit-sarking-fibre-de-bois.jpg"
          alt="Couvreur posant un épais panneau de fibre de bois sur les chevrons d'une charpente, à l'extérieur, avant la pose de la couverture"
          imagePosition="right"
        >
          <p>
            Le sarking consiste à poser des panneaux isolants rigides par-dessus les chevrons,
            sous une nouvelle couverture. Ici, des panneaux de fibre de bois, appréciés pour
            leur confort d&apos;été.
          </p>
          <p className="mt-3">
            L&apos;isolant forme une couche continue au-dessus de la charpente, sans aucun
            pont thermique et sans perte de surface habitable.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          C&apos;est la technique la plus performante, mais aussi la plus chère, car elle
          suppose de déposer puis reposer la couverture. Elle prend tout son sens lorsque les
          tuiles ou les ardoises doivent de toute façon être remplacées : le surcoût de
          l&apos;isolation se dilue alors dans un chantier de toiture déjà nécessaire. Elle
          rehausse le toit de quelques centimètres, ce qui peut imposer une déclaration
          préalable en mairie, voire l&apos;avis de l&apos;architecte des Bâtiments de France
          dans un secteur protégé.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Toit plat et toiture-terrasse
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Sur un toit plat, on n&apos;isole quasiment jamais par l&apos;intérieur, qui crée un
          risque de condensation dans la dalle. Deux techniques dominent. En{' '}
          <strong>toiture chaude</strong>, l&apos;isolant rigide est posé sur la dalle, sur un
          pare-vapeur, puis recouvert par l&apos;étanchéité. En{' '}
          <strong>toiture inversée</strong>, l&apos;isolant, insensible à l&apos;eau comme le
          polystyrène extrudé, est posé au-dessus de l&apos;étanchéité et lesté par du gravier,
          des dalles ou une végétalisation.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;isolation d&apos;une toiture-terrasse se fait idéalement lors de la réfection
          de l&apos;étanchéité, d&apos;où un budget global plus élevé. L&apos;objectif pour les
          primes CEE est une résistance R ≥ 4,5 m².K/W. Vérifiez au préalable la hauteur des
          relevés d&apos;étanchéité et des seuils de porte-fenêtre : l&apos;épaisseur ajoutée
          doit pouvoir y trouver sa place.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Toiture métallique en bac acier
        </h3>

        <ArticleImageSection
          image="/images/blog/isolation-thermique-du-toit-pose-laine-bac-acier.jpg"
          alt="Deux ouvriers en tenue haute visibilité déroulant un épais rouleau de laine isolante sur les pannes métalliques d'un toit, avant la pose des tôles de bac acier"
          imagePosition="left"
        >
          <p>
            Sur une toiture en bac acier, l&apos;isolant est déroulé sur les pannes avant la
            pose des tôles, ou intégré dans des panneaux sandwich.
          </p>
          <p className="mt-3">
            Sans isolation, une tôle rayonne la chaleur en été et provoque de la condensation
            en hiver, avec des gouttes qui tombent à l&apos;intérieur.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          Fréquent sur les garages, ateliers, extensions et certaines maisons contemporaines,
          le bac acier se traite le mieux à la construction ou lors du remplacement de la
          couverture. Sur une toiture existante qu&apos;on ne souhaite pas déposer, une
          isolation en sous-face est possible, en veillant à traiter le risque de condensation
          avec un pare-vapeur. Le prix dépend beaucoup de l&apos;accès et de l&apos;usage du
          local : un garage non chauffé ne justifie pas le même niveau d&apos;isolation
          qu&apos;une pièce de vie.
        </p>

        {/* ---- SECTION 3 : ISOLANTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quels isolants choisir pour votre toit ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La performance d&apos;un isolant s&apos;exprime par sa conductivité thermique λ :
          plus elle est faible, moins il faut d&apos;épaisseur pour atteindre une résistance
          donnée. Mais sous un toit, un second critère compte presque autant : la capacité de
          l&apos;isolant à ralentir la chaleur de l&apos;été, que l&apos;on mesure par le{' '}
          <strong>déphasage</strong>.
        </p>

        <ArticleTable {...ISOLANTS_TABLE} title="Comparatif des isolants pour le toit (objectif R = 6)" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Les laines minérales restent les isolants les plus posés en toiture, pour leur prix
          et leur facilité de mise en œuvre. La laine de roche ajoute une excellente tenue au
          feu et de bonnes performances acoustiques, détaillées dans notre guide sur l&apos;
          <Link href="/blog/isolation-par-laine-de-roche" className={linkCls}>
            isolation par laine de roche
          </Link>
          . Le polyuréthane permet de gagner une dizaine de centimètres, précieux sous des
          rampants où chaque centimètre de hauteur compte, mais il protège peu de la chaleur
          estivale.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour des combles aménagés exposés plein sud, la fibre de bois et la ouate de
          cellulose font la différence. Plus denses, elles mettent plusieurs heures de plus que
          les laines légères à laisser passer la chaleur de midi, qui n&apos;atteint alors les
          chambres qu&apos;en soirée, quand on peut ouvrir les fenêtres. Leur prix est plus
          élevé, mais c&apos;est souvent le meilleur investissement pour dormir sous les toits
          en été.
        </p>

        <ArticleCallout type="tip" title="L'épaisseur ne fait pas tout">
          <p>
            Un isolant épais mais mal posé perd une grande partie de sa performance. Les trois
            points qui comptent autant que l&apos;épaisseur : la continuité de l&apos;isolant
            sans espaces entre les panneaux, l&apos;étanchéité à l&apos;air côté intérieur avec
            un pare-vapeur ou une membrane soigneusement raccordée, et le traitement des
            jonctions avec les murs, la cheminée et les fenêtres de toit.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : DIAGNOSTIC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Avant d&apos;isoler votre toit : le diagnostic en 5 étapes
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une isolation de toiture dure plusieurs décennies. Quelques vérifications préalables
          évitent de poser un isolant neuf sur une charpente fragilisée ou sous une couverture
          qui fuit, et d&apos;avoir à tout refaire quelques années plus tard.
        </p>

        <ArticleSteps steps={DIAGNOSTIC_STEPS} />

        {/* ---- SECTION 5 : HUMIDITE / VENTILATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Humidité, ventilation, étanchéité à l&apos;air : les points sensibles
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un toit bien isolé est aussi un toit qui gère l&apos;humidité. La vapeur d&apos;eau
          produite dans le logement, par la cuisine, les douches ou la respiration, cherche à
          traverser les parois vers l&apos;extérieur. Si elle rencontre une surface froide au
          cœur de l&apos;isolant, elle se condense, mouille l&apos;isolant et peut, à terme,
          abîmer la charpente.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est le rôle du <strong>pare-vapeur</strong> ou de la membrane hygrorégulante,
          posé côté chaud de l&apos;isolant, et de la lame d&apos;air ventilée ou de
          l&apos;écran sous-toiture respirant, côté froid. Les deux doivent être continus :
          une membrane percée par des spots encastrés ou mal raccordée aux murs perd une grande
          partie de son efficacité.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, une maison mieux isolée et plus étanche à l&apos;air doit rester bien
          ventilée. Une VMC en bon état évacue l&apos;humidité intérieure et préserve la qualité
          de l&apos;air. Si votre logement n&apos;en a pas, profitez du chantier de toiture pour
          l&apos;envisager, d&apos;autant que les gaines passent souvent par les combles.
        </p>

        {/* ---- SECTION 6 : OBLIGATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Réfection de toiture : l&apos;isolation est-elle obligatoire ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Depuis le décret n° 2016-711, entré en vigueur en 2017, les travaux importants de
          rénovation de toiture déclenchent une obligation d&apos;isolation. Elle s&apos;applique
          notamment lorsque vous remplacez ou recouvrez plus de 50 % de la couverture, hors
          ouvertures, dans un bâtiment d&apos;habitation. C&apos;est ce que l&apos;on appelle
          l&apos;isolation « embarquée » : profiter d&apos;un chantier lourd pour améliorer la
          performance énergétique, au moment où le surcoût est le plus faible.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le texte prévoit des exceptions : impossibilité technique ou juridique, risque de
          pathologie pour le bâti, contrainte architecturale ou patrimoniale, ou disproportion
          manifeste entre le coût et les économies attendues. Dans ces cas, le maître
          d&apos;ouvrage doit pouvoir le justifier, généralement par une note d&apos;un
          professionnel. En pratique, si votre couvreur vous propose de refaire la toiture,
          demandez-lui systématiquement un chiffrage avec isolation.
        </p>

        {/* ---- SECTION 7 : PRIX ET AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix et aides pour l&apos;isolation thermique du toit en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les budgets varient d&apos;un facteur dix selon la technique. Pour une maison de
          100 m² au sol, isoler des combles perdus coûte typiquement entre 1 500 et 4 000 €.
          Isoler 120 m² de rampants par l&apos;intérieur représente le plus souvent 5 000 à
          15 000 €, selon l&apos;isolant et les finitions. Un sarking sur la même surface se
          chiffre entre 18 000 et 30 000 €, couverture comprise ou non selon les devis : lisez
          bien ce que recouvre chaque prix.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour comprendre comment se construit un devis et ce qu&apos;il reste à payer après
          aides, consultez notre guide sur le{' '}
          <Link href="/blog/prix-d-une-isolation-des-combles" className={linkCls}>
            prix d&apos;une isolation des combles
          </Link>
          , qui détaille plusieurs exemples chiffrés.
        </p>

        <ArticleCallout type="warning" title="Ce qui a changé le 1er septembre 2026">
          <p>
            L&apos;isolation des combles perdus, des rampants de toiture et des
            toitures-terrasses n&apos;est plus financée par MaPrimeRénov&apos; par geste
            depuis le 1er septembre 2026, comme l&apos;isolation des murs depuis janvier 2026.
            Elle reste éligible à MaPrimeRénov&apos; dans le cadre d&apos;une{' '}
            <strong>rénovation d&apos;ampleur</strong>, qui combine au moins deux gestes
            d&apos;isolation, vise un gain d&apos;au moins deux classes au DPE et passe par un
            accompagnateur.
          </p>
        </ArticleCallout>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les autres aides restent mobilisables pour une isolation thermique du toit réalisée
          par une entreprise certifiée RGE :
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            les <strong>primes CEE</strong>, ouvertes à tous les ménages, sous réserve
            d&apos;atteindre R ≥ 7 en combles perdus, R ≥ 6 en rampants et R ≥ 4,5 en
            toiture-terrasse ;
          </li>
          <li>
            la <strong>TVA à 5,5 %</strong> sur la fourniture et la pose ;
          </li>
          <li>
            l&apos;<strong>éco-prêt à taux zéro</strong>, pour financer le reste à charge sans
            intérêts ;
          </li>
          <li>
            les éventuelles aides de votre collectivité, à vérifier auprès d&apos;un conseiller
            France Rénov&apos;.
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si vous envisagez à la fois d&apos;isoler et de changer de chauffage, commencez par
          un{' '}
          <Link href="/services/audit" className={linkCls}>audit énergétique</Link>. Il
          ouvre la porte de la rénovation d&apos;ampleur, mieux financée, et garantit que votre
          future pompe à chaleur sera dimensionnée pour la maison isolée, comme nous
          l&apos;expliquons dans notre guide sur la{' '}
          <Link href="/blog/note-de-dimensionnement-pompe-a-chaleur" className={linkCls}>
            note de dimensionnement d&apos;une pompe à chaleur
          </Link>.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Isolation thermique de votre toit en Île-de-France"
          description="Nos artisans certifiés RGE inspectent votre toiture et vos combles, vous conseillent la technique adaptée, combles perdus, rampants, sarking ou toit plat, et montent votre dossier de primes CEE. Visite technique et devis gratuits sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;isolation thermique du toit
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
            { href: '/blog/isolation-rampants-de-toiture', kicker: 'Guide complémentaire', title: 'Isolation des rampants de toiture', cta: 'Lire le guide' },
            { href: '/blog/prix-isolation-combles-au-m2', kicker: 'Article associé', title: 'Prix isolation combles au m²', cta: 'Lire le guide' },
            { href: '/blog/isolation-comble-rampant', kicker: 'Article associé', title: 'Isolation comble rampant : diagnostic', cta: 'Lire le guide' },
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
