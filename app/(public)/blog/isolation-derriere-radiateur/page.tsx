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
  ARTICLE_META, PERTES_TABLE, ISOLANTS_TABLE, POSE_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-derriere-radiateur'

const HERO_IMAGE = '/images/blog/isolation-derriere-radiateur-pose-panneau-reflechissant.jpg'
const HERO_ALT = "Main glissant un panneau isolant réfléchissant en aluminium derrière un radiateur à eau blanc fixé sur un mur — isolation derrière radiateur"

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
      width: 1200,
      height: 800,
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
  { name: 'Isolation derrière radiateur', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function IsolationDerriereRadiateur() {
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
        wordCount={3000}
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
            Posez la main sur le mur juste au-dessus d&apos;un radiateur allumé, puis sur le même
            mur à un mètre de là : la différence de température est souvent frappante. Derrière
            un radiateur, la paroi peut dépasser 35 à 40 °C, alors que le reste du mur stagne
            autour de 18 °C. Quand ce mur donne sur l&apos;extérieur et qu&apos;il n&apos;est
            pas isolé, une partie de la chaleur que vous payez sert surtout à chauffer…
            la façade.
          </p>
          <p>
            L&apos;<strong>isolation derrière radiateur</strong> répond à ce problème avec un
            geste simple et peu coûteux : glisser un panneau réfléchissant entre le radiateur et
            le mur. Mais entre les promesses marketing (« jusqu&apos;à 30 % d&apos;économies ! »)
            et la réalité physique, l&apos;écart est grand. Ce guide vous explique comment ça
            marche, combien vous pouvez réellement économiser, quel isolant choisir et comment
            le poser sans dégrader le fonctionnement de votre chauffage.
          </p>
          <p>
            Nous verrons aussi quand ce petit geste ne suffit plus, et pourquoi une véritable{' '}
            <Link href="/services/isolation" className={linkCls}>isolation des murs</Link>{' '}
            reste la seule solution durable pour un logement qui perd sa chaleur par les parois.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Pourquoi le mur derrière un radiateur est la zone qui perd le plus de chaleur</li>
            <li>Le calcul honnête des économies d&apos;une isolation derrière radiateur</li>
            <li>Le comparatif des isolants : film alu, mousse réfléchissante, polystyrène</li>
            <li>La pose en 5 étapes et les erreurs qui annulent le bénéfice</li>
            <li>Quand passer à l&apos;isolation complète du mur, et avec quelles aides</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation derrière radiateur : pourquoi ce mur perd autant de chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans la plupart des logements, les radiateurs sont installés sur les murs extérieurs,
          très souvent sous les fenêtres, dans la partie de mur appelée l&apos;
          <strong>allège</strong>. Ce choix n&apos;est pas un hasard : la chaleur qui monte du
          radiateur contrecarre l&apos;air froid qui descend le long du vitrage. Mais il a une
          contrepartie : le radiateur chauffe directement la zone du mur la plus exposée au
          froid, et souvent la plus fine, car l&apos;allège est fréquemment moins épaisse que
          le reste de la façade.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Or les pertes de chaleur à travers une paroi sont proportionnelles à l&apos;écart de
          température entre ses deux faces. Un mur à 19 °C côté intérieur et 5 °C côté
          extérieur subit un écart de 14 °C. Derrière un radiateur, la face intérieure monte à
          35 ou 40 °C : l&apos;écart double, voire triple, et les pertes suivent la même
          courbe. Cette zone de quelques dixièmes de mètre carré devient un véritable{' '}
          <strong>pont thermique</strong> localisé.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le phénomène est d&apos;autant plus marqué que l&apos;isolation du logement est
          faible. Selon l&apos;ADEME, dans une maison non isolée, les murs représentent à eux
          seuls une part importante des déperditions thermiques, juste derrière la toiture et
          le renouvellement d&apos;air. Le mur derrière les radiateurs en est la portion la
          plus « gourmande ».
        </p>

        <ArticleStat stats={[
          { value: '20–25 %', label: 'des pertes de chaleur d\'une maison non isolée passent par les murs (ADEME)', color: 'blue' },
          { value: '× 2,5', label: 'pertes du mur derrière un radiateur par rapport au reste de la paroi (estimation Greenter)', color: 'amber' },
          { value: '5–25 €', label: 'prix d\'un panneau réfléchissant pour un radiateur standard', color: 'green' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces chiffres méritent d&apos;être lus ensemble. Le premier rappelle que les murs
          comptent beaucoup dans le bilan d&apos;une maison ancienne. Le deuxième montre que la
          zone derrière les radiateurs concentre une partie disproportionnée de ces pertes.
          Le troisième explique pourquoi l&apos;<strong>isolation derrière radiateur</strong>{' '}
          a autant de succès : rarement un geste d&apos;économie d&apos;énergie aura coûté
          aussi peu.
        </p>

        {/* ---- SECTION 2 : COMMENT CA MARCHE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment fonctionne un panneau réfléchissant derrière un radiateur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un radiateur à eau transmet sa chaleur de deux façons. La majorité passe par{' '}
          <strong>convection</strong> : l&apos;air froid entre par le bas, se réchauffe au
          contact des ailettes et remonte vers le plafond. Le reste est émis par{' '}
          <strong>rayonnement infrarouge</strong>, comme le ferait un poêle ou le soleil, dans
          toutes les directions — y compris vers le mur situé juste derrière. Selon le modèle,
          de 20 à 50 % de la chaleur est rayonnée : la part est plus faible pour un radiateur à
          ailettes moderne, plus forte pour un radiateur en fonte ou un panneau lisse.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          La face aluminium renvoie le rayonnement vers la pièce
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Une surface d&apos;aluminium poli réfléchit l&apos;essentiel du rayonnement
          infrarouge qu&apos;elle reçoit. Placée face au radiateur, elle renvoie vers la
          pièce la chaleur qui aurait été absorbée par le mur. C&apos;est le principe de la
          couverture de survie, appliqué au chauffage domestique. Pour que cette réflexion
          fonctionne, la face brillante doit faire face à un espace d&apos;air : collée
          directement contre le radiateur, elle conduirait simplement la chaleur au mur.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          La couche isolante freine la conduction vers le mur
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Les produits les plus efficaces associent l&apos;aluminium à quelques millimètres de
          mousse de polyéthylène ou de polystyrène. Cette couche, modeste en épaisseur, isole
          la paroi de l&apos;air chaud emprisonné derrière le radiateur et abaisse la
          température de surface du mur. Résultat : moins de chaleur traverse la façade, et
          davantage reste dans la pièce.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-derriere-radiateur-film-aluminium-mur-exterieur.jpg"
          alt="Homme en pull bleu marine plaquant un film isolant aluminium à bulles contre un mur blanc derrière un radiateur à panneaux"
          imagePosition="right"
        >
          <p>
            Le film aluminium à bulles d&apos;air, vendu en rouleau, est l&apos;isolant
            derrière radiateur le plus répandu. Il se découpe aux ciseaux, s&apos;adapte à
            toutes les dimensions de radiateur et se glisse sans démonter l&apos;appareil.
          </p>
          <p className="mt-3">
            Son efficacité dépend surtout de la qualité de la pose : un film plaqué bien à
            plat contre le mur, sans plis ni zones décollées, et une lame d&apos;air dégagée
            côté radiateur donnent les meilleurs résultats.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 3 : ECONOMIES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation derrière radiateur : combien d&apos;économies en réalité ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les emballages promettent volontiers des économies de chauffage spectaculaires. La
          réalité est plus modeste, et il est utile de faire le calcul soi-même. Prenons un mur
          extérieur en maçonnerie non isolée, un cas fréquent dans les maisons d&apos;avant
          1975 et dans de nombreux appartements anciens d&apos;Île-de-France.
        </p>

        <ArticleTable {...PERTES_TABLE} title="Isolation derrière radiateur : estimation des pertes évitables" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Concrètement, chaque radiateur posé sur un mur extérieur non isolé gaspille de
          l&apos;ordre de 50 kWh par hiver uniquement à cause de la surchauffe de la paroi
          qu&apos;il masque. Un bon panneau réfléchissant en récupère une large partie, mais
          pas la totalité : comptez de 30 à 40 kWh économisés par radiateur et par an.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour une maison équipée de six radiateurs sur des murs de façade, le gain annuel se
          situe donc autour de 200 kWh. Avec un chauffage au gaz, cela représente une
          vingtaine d&apos;euros par an ; avec un chauffage électrique, plutôt 40 à 50 €.
          C&apos;est peu à l&apos;échelle d&apos;une facture, mais le panneau coûte rarement
          plus de 15 € par radiateur : il est amorti en un à deux hivers, puis rapporte
          pendant des années.
        </p>

        <ArticleCallout type="warning" title="Méfiez-vous des promesses de 20 à 30 % d'économies">
          <p>
            Ces chiffres ne s&apos;appliquent pas à la facture de chauffage totale. Au mieux,
            ils décrivent la part de chaleur réfléchie par le panneau, sur un radiateur précis,
            dans des conditions de laboratoire. Sur un mur isolé ou une cloison intérieure,
            l&apos;économie réelle est quasi nulle. L&apos;Energy Saving Trust britannique
            estime d&apos;ailleurs le gain d&apos;un équipement complet de la maison à
            quelques dizaines de livres par an — un ordre de grandeur cohérent avec notre
            calcul.
          </p>
        </ArticleCallout>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le confort, en revanche, est souvent plus perceptible que l&apos;économie : la pièce
          monte plus vite en température, et la sensation de paroi froide sous la fenêtre
          s&apos;atténue. C&apos;est l&apos;un des arguments les plus fréquemment cités par
          les foyers qui ont adopté l&apos;isolation derrière radiateur.
        </p>

        {/* ---- SECTION 4 : QUEL ISOLANT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel isolant choisir derrière un radiateur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le rayon chauffage des magasins de bricolage propose plusieurs familles de produits,
          à des prix et des performances très différents. Le critère décisif n&apos;est pas
          l&apos;épaisseur maximale, mais la combinaison d&apos;une surface réfléchissante et
          d&apos;une épaisseur compatible avec l&apos;espace disponible derrière votre
          radiateur.
        </p>

        <ArticleTable {...ISOLANTS_TABLE} title="Comparatif des solutions d'isolation derrière radiateur" />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le meilleur rapport qualité-prix : la mousse réfléchissante de 3 à 5 mm
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Pour la grande majorité des radiateurs à eau, un rouleau de mousse polyéthylène
          recouverte d&apos;aluminium offre le meilleur équilibre. Il réfléchit le
          rayonnement, isole légèrement la paroi et reste assez fin pour préserver la
          circulation de l&apos;air. Un rouleau d&apos;environ 5 m² suffit généralement pour
          quatre à six radiateurs.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le panneau en polystyrène pour les radiateurs éloignés du mur
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Si votre radiateur est fixé à 4 ou 5 cm du mur, un panneau rigide en polystyrène à
          face alu de 4 à 6 mm isole un peu mieux et se pose plus facilement bien à plat. À
          l&apos;inverse, évitez les isolants minces multicouches de plus d&apos;un
          centimètre : ils réduisent trop l&apos;espace d&apos;air et peuvent faire perdre au
          radiateur une partie de sa puissance de convection.
        </p>

        {/* ---- SECTION 5 : UTILE OU INUTILE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Dans quels cas isoler derrière un radiateur est utile (ou inutile) ?
        </h2>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les situations où le panneau est rentable
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed mb-6">
          <li>Radiateur fixé sur un <strong>mur extérieur non isolé</strong> : façade, pignon, allège sous fenêtre.</li>
          <li>Mur mitoyen d&apos;un <strong>local non chauffé</strong> : garage, cellier, cage d&apos;escalier froide.</li>
          <li>Logement en location où des travaux d&apos;isolation du mur ne sont pas envisageables.</li>
          <li>Pièce difficile à chauffer, où chaque watt récupéré améliore sensiblement le confort.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les situations où il ne sert presque à rien
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed mb-6">
          <li>Radiateur sur une <strong>cloison intérieure</strong> : la chaleur qui traverse réchauffe la pièce voisine, elle n&apos;est pas perdue.</li>
          <li>Mur déjà isolé par l&apos;intérieur ou par l&apos;extérieur : la paroi laisse déjà très peu passer la chaleur.</li>
          <li>Radiateur collé au mur, avec moins d&apos;un centimètre d&apos;espace : l&apos;isolant gênerait la convection.</li>
          <li>Plancher chauffant ou chauffage par l&apos;air : il n&apos;y a pas de « dos » de radiateur à traiter.</li>
        </ul>

        {/* ---- SECTION 6 : POSE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment poser un isolant derrière un radiateur : les 5 étapes
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La pose d&apos;un panneau réfléchissant ne demande ni outillage spécifique ni
          démontage du radiateur. Prévoyez un mètre, un cutter, une règle, de l&apos;adhésif
          double face et une vingtaine de minutes par radiateur. Le principal piège est
          d&apos;oublier la circulation de l&apos;air : l&apos;isolant doit se faire oublier.
        </p>

        <ArticleSteps steps={POSE_STEPS} />

        <ArticleFullImage
          image="/images/blog/isolation-derriere-radiateur-mesure-hauteur-radiateur.jpg"
          alt="Mètre pliant tenu verticalement contre le côté d'un radiateur à panneaux blanc pour mesurer sa hauteur avant de découper l'isolant"
          caption="Avant de découper l'isolant, mesurez la hauteur et la largeur du radiateur ainsi que l'espace jusqu'au mur : le panneau doit rester 1 à 2 cm plus petit que le radiateur et laisser au moins 2 cm d'air libre."
        />

        {/* ---- SECTION 7 : ERREURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les erreurs qui annulent le bénéfice de l&apos;isolation derrière radiateur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un panneau mal posé peut ne rien apporter, voire dégrader légèrement le rendement du
          radiateur. Voici les erreurs que nos techniciens constatent le plus souvent lors de
          leurs visites.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed mb-6">
          <li><strong>Inverser les faces</strong> : la face aluminium collée au mur ne réfléchit plus rien vers la pièce.</li>
          <li><strong>Toucher le radiateur</strong> : le contact transforme le panneau en conducteur de chaleur vers le mur.</li>
          <li><strong>Boucher le haut ou le bas</strong> : un panneau qui déborde sous ou au-dessus du radiateur freine la convection.</li>
          <li><strong>Choisir un isolant trop épais</strong> : au-delà de 6 mm sur un radiateur proche du mur, l&apos;air ne circule plus.</li>
          <li><strong>Poser sur un mur humide</strong> : le film étanche empêche la paroi de sécher et favorise les moisissures.</li>
        </ul>

        <ArticleCallout type="tip" title="Comment reconnaître une pose réussie">
          <p>
            Le panneau est collé à plat contre le mur, légèrement plus petit que le radiateur,
            face brillante vers l&apos;appareil, et il reste invisible une fois en place. Si
            vous remarquez des traces noires ou une odeur de moisi derrière le panneau quelques
            mois plus tard, retirez-le : le mur a un problème d&apos;humidité à traiter en
            priorité, comme nous l&apos;expliquons dans notre guide sur l&apos;
            <Link href="/blog/isolation-murs-humides" className={linkCls}>isolation des murs humides</Link>.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 8 : TYPES DE RADIATEURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Radiateur à eau, en fonte ou électrique : les précautions à prendre
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les <strong>radiateurs à eau en acier</strong>, raccordés à une chaudière ou à une
          pompe à chaleur, sont les candidats idéaux : ils sont généralement fixés à quelques
          centimètres du mur et chauffent largement par convection. Les{' '}
          <strong>radiateurs en fonte</strong>, plus massifs, rayonnent davantage : le panneau
          réfléchissant y est encore plus utile, à condition de bien respecter l&apos;espace
          d&apos;air autour des éléments.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour un <strong>radiateur électrique</strong>, convecteur, panneau rayonnant ou
          appareil à inertie, la pose reste possible mais demande plus de prudence : respectez
          les distances indiquées dans la notice, choisissez un isolant dont la tenue en
          température est garantie, et ne masquez jamais les grilles d&apos;aération ni la
          sonde de température. En cas de doute, demandez l&apos;avis du fabricant avant de
          poser quoi que ce soit derrière l&apos;appareil.
        </p>

        {/* ---- SECTION 9 : ISOLER LE MUR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Aller plus loin : isoler le mur derrière le radiateur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le panneau réfléchissant traite un symptôme : la surchauffe d&apos;une petite zone de
          mur. Il ne change rien aux pertes du reste de la façade, qui reste froide au toucher
          et continue de laisser fuir la chaleur. Pour un logement réellement mal isolé, la
          solution de fond est l&apos;<strong>isolation des murs</strong>, par l&apos;intérieur
          (ITI) ou par l&apos;extérieur (ITE).
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Isolation par l&apos;intérieur : le radiateur doit être déplacé
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Une isolation par l&apos;intérieur ajoute 10 à 14 cm de doublage sur le mur. Les
          radiateurs doivent donc être déposés, les tubes de chauffage rallongés et les
          consoles refixées dans le nouveau doublage, sur des renforts prévus à cet effet.
          C&apos;est aussi le moment de soigner l&apos;isolation derrière radiateur de façon
          définitive : l&apos;isolant est continu, sans interruption au droit de
          l&apos;appareil. Notre guide sur l&apos;
          <Link href="/blog/isolation-mur-interieur-quelle-epaisseur" className={linkCls}>
            épaisseur d&apos;une isolation de mur intérieur
          </Link>{' '}
          détaille les choix possibles.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Isolation par l&apos;extérieur : les radiateurs restent en place
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;isolation par l&apos;extérieur enveloppe la façade sans toucher à
          l&apos;intérieur du logement : les radiateurs ne bougent pas, et le mur derrière eux
          devient chaud et sec. C&apos;est la technique la plus efficace contre les ponts
          thermiques, mais aussi la plus coûteuse, et elle nécessite une déclaration préalable
          en mairie.
        </p>

        <ArticleCallout type="tip" title="Des aides pour isoler le mur, pas pour le panneau">
          <p>
            Le panneau réfléchissant ne donne droit à aucune aide. En revanche, l&apos;isolation
            des murs réalisée par une entreprise certifiée RGE peut bénéficier des primes CEE
            (résistance thermique R ≥ 3,7 m².K/W), de la TVA à 5,5 % et, selon votre situation,
            de MaPrimeRénov&apos;. Les conditions évoluent régulièrement : vérifiez-les sur
            France Rénov&apos; ou demandez à votre artisan de monter le dossier avant le début
            des travaux.
          </p>
        </ArticleCallout>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour choisir le matériau, notre comparatif du{' '}
          <Link href="/blog/meilleur-isolant-thermique-murs-interieur-2026" className={linkCls}>
            meilleur isolant thermique pour murs intérieurs
          </Link>{' '}
          compare laine de verre, laine de roche, fibre de bois et polyuréthane selon leur
          performance, leur encombrement et leur prix.
        </p>

        {/* ---- SECTION 10 : AUTRES GESTES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          5 gestes complémentaires pour que vos radiateurs chauffent mieux
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;isolation derrière radiateur donne le meilleur d&apos;elle-même lorsque le
          radiateur fonctionne correctement. Ces gestes simples, souvent négligés, se
          combinent parfaitement avec la pose d&apos;un panneau réfléchissant.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed mb-6">
          <li><strong>Purger les radiateurs</strong> en début de saison : l&apos;air emprisonné empêche l&apos;eau chaude de circuler dans le haut du radiateur.</li>
          <li><strong>Installer des robinets thermostatiques</strong> pour régler chaque pièce indépendamment et éviter de surchauffer.</li>
          <li><strong>Dégager les radiateurs</strong> : un canapé, un meuble ou de longs rideaux devant l&apos;appareil bloquent la diffusion de la chaleur.</li>
          <li><strong>Ajouter une tablette</strong> au-dessus d&apos;un radiateur placé sous une fenêtre, pour dévier l&apos;air chaud vers la pièce plutôt que vers le vitrage.</li>
          <li><strong>Faire entretenir le circuit</strong> : un désembouage redonne du rendement à une installation ancienne dont les radiateurs chauffent mal en bas.</li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, si vos radiateurs sont alimentés par une vieille chaudière, les remplacer par
          une{' '}
          <Link href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026" className={linkCls}>
            pompe à chaleur air-eau
          </Link>{' '}
          peut réduire la facture bien plus fortement qu&apos;aucun panneau. Dans ce cas,
          isoler d&apos;abord les murs permet aussi de choisir une pompe à chaleur moins
          puissante, donc moins chère.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Vos murs restent froids malgré le chauffage ? Faites-les isoler en Île-de-France"
          description="Nos artisans certifiés RGE évaluent vos murs, vous conseillent entre isolation par l'intérieur et par l'extérieur, et montent votre dossier d'aides CEE. Visite technique et devis gratuits sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;isolation derrière radiateur
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
            { href: '/blog/isolation-mur-interieur-quelle-epaisseur', kicker: 'Guide complémentaire', title: 'Isolation mur intérieur : quelle épaisseur ?', cta: 'Lire le guide' },
            { href: '/blog/meilleur-isolant-thermique-murs-interieur-2026', kicker: 'Article associé', title: 'Meilleur isolant thermique pour murs intérieurs', cta: 'Lire le guide' },
            { href: '/blog/isolation-murs-humides', kicker: 'Article associé', title: 'Isolation des murs humides', cta: 'Lire le guide' },
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
            Isolation des murs par ville en Île-de-France
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
