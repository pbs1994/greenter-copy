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
  ARTICLE_META, COEFFICIENTS_TABLE, EXEMPLES_TABLE, METHODE_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/orientation-panneaux-solaires'

const HERO_IMAGE = '/images/blog/orientation-panneaux-solaires-toit-boussole.jpg'
const HERO_ALT = "Maison en briques avec huit panneaux solaires sur un toit en tuiles brunes et une boussole indiquant les points cardinaux, pour illustrer l'orientation des panneaux solaires"

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
      width: 1600,
      height: 853,
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
  { name: 'Orientation des panneaux solaires', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function OrientationPanneauxSolaires() {
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
            « Mon toit est orienté à l&apos;est, est-ce que ça vaut quand même le coup ? »
            C&apos;est l&apos;une des questions que l&apos;on nous pose le plus souvent lors
            des visites techniques. La réponse est rarement non. Le plein sud reste la
            référence, mais l&apos;écart avec les autres expositions est souvent plus faible
            qu&apos;on ne l&apos;imagine.
          </p>
          <p>
            L&apos;<strong>orientation des panneaux solaires</strong> n&apos;est par ailleurs
            qu&apos;un paramètre parmi d&apos;autres. L&apos;inclinaison du toit, les ombres
            portées et surtout le moment où vous consommez l&apos;électricité pèsent tout
            autant sur l&apos;intérêt d&apos;une installation. Depuis que le surplus injecté
            sur le réseau n&apos;est presque plus rémunéré, un toit est-ouest bien utilisé peut
            même faire mieux qu&apos;un toit sud mal dimensionné.
          </p>
          <p>
            Cet article vous donne les chiffres de production pour chaque orientation et
            chaque pente en Île-de-France, explique comment mesurer votre propre toit et
            détaille les solutions pour un toit plat, une façade ou un jardin.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La production attendue selon l&apos;orientation et l&apos;inclinaison</li>
            <li>Sud, sud-ouest, est-ouest, nord : ce que chaque exposition change</li>
            <li>Toit plat, façade, balcon et jardin : les bons réglages</li>
            <li>L&apos;ombrage, souvent plus pénalisant qu&apos;une mauvaise orientation</li>
            <li>La méthode pour mesurer l&apos;azimut et la pente de votre toit</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI LE SUD ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Orientation des panneaux solaires : pourquoi le plein sud reste la référence
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans l&apos;hémisphère nord, le soleil se lève à l&apos;est, culmine plein sud vers
          14 h en heure d&apos;été, puis se couche à l&apos;ouest. Un panneau tourné vers le
          sud reçoit donc le rayonnement le plus direct au moment où il est le plus intense.
          C&apos;est ce qui fait du plein sud l&apos;orientation qui produit le plus de kWh sur
          l&apos;année.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour décrire précisément l&apos;orientation d&apos;un toit, on utilise
          l&apos;<strong>azimut</strong>, l&apos;angle entre la direction du pan et le sud.
          Plein sud correspond à 0°, plein est à −90° et plein ouest à +90°. Un pan sud-ouest
          se situe autour de +45°.
        </p>

        <ArticleStat stats={[
          { value: '≈ 1 100 kWh', label: 'produits par kWc et par an en Île-de-France, plein sud et incliné à 35° (PVGIS)', color: 'green' },
          { value: '− 5 %', label: 'environ pour un toit sud-est ou sud-ouest par rapport au plein sud', color: 'blue' },
          { value: '− 15 à 20 %', label: 'pour un toit orienté plein est ou plein ouest à 30°', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces trois chiffres résument l&apos;essentiel. Le plein sud n&apos;est pas une
          condition indispensable : entre le sud-est et le sud-ouest, la perte reste minime et
          ne justifie aucun renoncement. Même plein est ou plein ouest, une installation garde
          plus de 80 % de son potentiel. Il faut descendre vers le nord ou vers une pose
          verticale pour que la perte devienne vraiment pénalisante.
        </p>

        {/* ---- SECTION 2 : TABLEAU ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle production selon l&apos;orientation et l&apos;inclinaison ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le tableau ci-dessous croise les deux paramètres. Chaque case indique la production
          annuelle en pourcentage de la configuration idéale. Il se lit simplement :
          repérez la pente de votre toit en ligne, son orientation en colonne.
        </p>

        <ArticleTable {...COEFFICIENTS_TABLE} title="Production selon l'orientation des panneaux solaires et leur inclinaison" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Deux enseignements ressortent. D&apos;abord, la zone verte est large : toutes les
          configurations comprises entre le sud-est et le sud-ouest, inclinées de 15 à 45°,
          produisent plus de 90 % de l&apos;optimum. La très grande majorité des toits en pente
          français entrent dans cette zone.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ensuite, plus le toit est plat, moins l&apos;orientation compte. À 0°, un panneau
          produit la même chose quelle que soit sa direction. À l&apos;inverse, sur une façade
          verticale, l&apos;écart entre le sud et l&apos;est atteint près de 20 points.
          C&apos;est pourquoi un toit faiblement incliné tourné vers l&apos;est reste une bonne
          surface, alors qu&apos;une façade exposée à l&apos;est l&apos;est beaucoup moins.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Sud-est et sud-ouest : une perte minime
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Un toit sud-ouest produit environ 5 % de moins qu&apos;un toit plein sud, mais il
          décale le pic de production vers 14 h ou 15 h. Pour un foyer qui rentre en fin
          d&apos;après-midi ou qui recharge une voiture électrique en début de soirée, ce
          décalage est plutôt un avantage. Le sud-est fait l&apos;inverse : il produit plus tôt
          dans la matinée, ce qui convient aux foyers en télétravail ou aux personnes
          retraitées qui lancent leurs appareils le matin.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Orientation est-ouest : moins de kWh, mieux répartis
        </h3>

        <ArticleImageSection
          image="/images/blog/orientation-panneaux-solaires-integres-toiture-tuiles.jpg"
          alt="Dix panneaux solaires noirs intégrés en deux rangées dans une toiture en tuiles rouges d'une maison à façade jaune, avec un conifère au premier plan"
          imagePosition="right"
        >
          <p>
            Sur une maison à deux pans orientés est et ouest, on peut équiper les deux côtés
            du toit. La production démarre tôt le matin sur le pan est et se prolonge en
            soirée sur le pan ouest.
          </p>
          <p className="mt-3">
            La courbe obtenue est plus plate et plus longue que celle d&apos;un toit sud.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pendant longtemps, l&apos;est-ouest était vu comme un pis-aller. Le raisonnement a
          changé avec la baisse du tarif de rachat. Quand le kWh revendu valait 13 centimes,
          seul le volume total comptait. Aujourd&apos;hui, un kWh injecté rapporte environ un
          centime, contre près de 20 centimes pour un kWh autoconsommé. Ce qui compte,
          c&apos;est donc de produire au moment où l&apos;on consomme.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Or un toit sud concentre sa production autour de midi, quand la maison est souvent
          vide, et crée un gros surplus. Une installation est-ouest produit 15 à 20 % de moins
          au total, mais couvre mieux le petit-déjeuner et le début de soirée. Pour un foyer
          actif, la part autoconsommée progresse, et l&apos;écart d&apos;économie réelle avec un
          toit sud se réduit nettement. Nous le détaillons dans notre article sur les{' '}
          <Link href="/blog/avantages-panneaux-solaires" className={linkCls}>
            avantages des panneaux solaires
          </Link>
          , qui chiffre la rentabilité selon le taux d&apos;autoconsommation.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Orientation nord : dans quels cas l&apos;envisager
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Un pan nord incliné à 30° perd 40 à 45 % de production par rapport au sud, et
          presque tout ce qu&apos;il produit arrive en été. Nous le déconseillons dans la
          plupart des cas. Deux exceptions existent : une toiture très peu pentue, à moins de
          15°, où la perte tombe vers 25 à 30 %, et un pan nord qui vient compléter un pan sud
          déjà équipé, quand le besoin d&apos;électricité estival est important, par exemple
          pour une climatisation ou une piscine.
        </p>

        {/* ---- SECTION 3 : EXEMPLES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Exemple : 3 kWc selon six orientations
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les pourcentages parlent mieux une fois traduits en kWh. Voici la production
          annuelle estimée d&apos;une même installation de 3 kWc, soit 7 à 8 panneaux
          récents, posée sur une maison d&apos;Île-de-France dans six configurations
          différentes.
        </p>

        <ArticleTable {...EXEMPLES_TABLE} title="Production d'une installation de 3 kWc selon son orientation" />

        <p className="text-slate-700 leading-relaxed mb-6">
          Entre le meilleur et le pire cas raisonnable, le plein sud et le plein est,
          l&apos;écart est d&apos;environ 600 kWh par an. Valorisés à 19,5 centimes, cela
          représente un peu plus de 100 € par an si tout était autoconsommé, et beaucoup moins
          si l&apos;écart correspond surtout à du surplus de midi. C&apos;est une différence
          réelle, mais elle ne remet presque jamais en cause un projet. Pour obtenir une
          estimation sur votre adresse, essayez notre{' '}
          <Link href="/simulateur-solaire" className={linkCls}>simulateur solaire</Link>.
        </p>

        {/* ---- SECTION 4 : INCLINAISON ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          L&apos;inclinaison, l&apos;autre moitié de l&apos;équation
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;angle idéal dépend de la latitude. Plus on monte vers le nord, plus le soleil
          est bas et plus les panneaux doivent être redressés pour le recevoir de face. En
          France, l&apos;optimum annuel se situe entre 30° dans le Sud et 35° dans le Nord.
          En Île-de-France, une pente de 30 à 35° est idéale, et la perte reste inférieure à
          5 % entre 15 et 45°.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La saison compte aussi. Un panneau très incliné, à 50 ou 60°, capte mieux le soleil
          bas de l&apos;hiver mais perd en été. Un panneau presque à plat fait l&apos;inverse.
          Si vous possédez une{' '}
          <Link href="/services/pompe-a-chaleur" className={linkCls}>pompe à chaleur</Link>,
          dont la consommation se concentre entre octobre et avril, une pente un peu plus forte
          peut se justifier sur un support réglable. Sur une toiture, en revanche, les
          panneaux suivent la pente existante : on ne refait pas une charpente pour gagner
          quelques pourcents.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Toit plat : plein sud incliné ou rangées est-ouest
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Sur un toit plat ou une toiture-terrasse, l&apos;orientation est un choix et non une
          contrainte. Les panneaux sont posés sur des supports lestés, sans percer
          l&apos;étanchéité. Deux implantations dominent.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            <strong>Plein sud, incliné de 15 à 30°.</strong> Chaque panneau produit au maximum,
            mais les rangées doivent être espacées pour ne pas se faire d&apos;ombre en hiver,
            ce qui limite le nombre de panneaux sur une surface donnée.
          </li>
          <li>
            <strong>Est-ouest, incliné de 10 à 15°.</strong> Les panneaux sont posés dos à
            dos, presque sans espace. Chacun produit un peu moins, mais la surface est mieux
            occupée, la prise au vent est plus faible et la production plus étalée sur la
            journée.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Façade, balcon, jardin : régler soi-même l&apos;orientation
        </h3>

        <ArticleImageSection
          image="/images/blog/orientation-panneaux-solaires-reglage-inclinaison-kit.jpg"
          alt="Homme agenouillé sur une terrasse réglant l'inclinaison d'un panneau solaire sur support en aluminium, relié à une prise extérieure, dans un jardin fleuri"
          imagePosition="left"
        >
          <p>
            Les kits solaires prêts à brancher, posés au sol ou sur un balcon, s&apos;orientent
            librement. Un support réglable permet de changer l&apos;inclinaison selon la
            saison.
          </p>
          <p className="mt-3">
            Visez le sud ou le sud-ouest, à 30 ou 35°, à l&apos;écart des ombres de la maison
            et des haies.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          Fixé à la verticale sur un garde-corps, un panneau perd environ 30 % de production
          par rapport à la position idéale, mais produit relativement bien en hiver, quand le
          soleil est bas. Au sol, un support incliné à 30° tourné vers le sud donne le meilleur
          résultat. Dans tous les cas, ces petites installations restent limitées : quelques
          centaines de kWh par an par panneau. Pour couvrir une part importante de la
          consommation d&apos;une maison, une installation sur toiture ou un{' '}
          <Link href="/produits/carport-solaire" className={linkCls}>carport solaire</Link>{' '}
          reste plus adaptée.
        </p>

        {/* ---- SECTION 5 : OMBRAGE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Ombrage : souvent plus pénalisant qu&apos;une mauvaise orientation
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          On s&apos;inquiète beaucoup de l&apos;orientation et pas assez des ombres. Un panneau
          est composé de cellules reliées en série : quand quelques-unes sont dans
          l&apos;ombre, elles freinent tout le module. Et sur une installation équipée
          d&apos;un onduleur central, les panneaux d&apos;une même chaîne sont eux aussi reliés
          en série. L&apos;ombre d&apos;une cheminée sur un seul module peut alors faire chuter
          la production de toute la chaîne.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Trois solutions limitent ce problème. Les diodes de dérivation intégrées aux
          panneaux isolent la partie ombragée. Les <strong>micro-onduleurs</strong>, un par
          panneau, rendent chaque module indépendant. Les <strong>optimiseurs</strong> font de
          même tout en conservant un onduleur central. Sur un toit avec cheminée, lucarne ou
          arbre proche, l&apos;une de ces deux dernières options est presque toujours
          justifiée.
        </p>

        <ArticleCallout type="warning" title="Pensez au soleil d'hiver">
          <p>
            Une visite de toiture en juillet peut être trompeuse. En décembre, le soleil ne
            monte qu&apos;à 18° environ au-dessus de l&apos;horizon à Paris, contre 65° en juin.
            Un arbre, un immeuble ou un relief qui semble lointain peut alors masquer les
            panneaux une bonne partie de la journée. Une étude d&apos;ombrage sérieuse tient
            compte de la course du soleil sur toute l&apos;année.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 6 : METHODE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment connaître l&apos;orientation de votre toit en 5 étapes
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pas besoin de monter sur le toit pour savoir s&apos;il convient. Avec un ordinateur
          et un smartphone, vous obtenez en une demi-heure une première estimation fiable de
          l&apos;orientation de vos futurs panneaux solaires et de leur production.
        </p>

        <ArticleSteps steps={METHODE_STEPS} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Cette estimation vous permet d&apos;aborder les devis en connaissance de cause. Si un
          installateur annonce une production très supérieure à celle de PVGIS pour votre
          adresse, demandez-lui ses hypothèses. Un écart de quelques pourcents est normal,
          un écart de 20 % ne l&apos;est pas.
        </p>

        {/* ---- SECTION 7 : ORIENTATION ET AUTOCONSOMMATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Choisir l&apos;orientation de ses panneaux solaires selon sa consommation
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Quand on a le choix entre plusieurs pans de toit, ou qu&apos;on installe des panneaux
          sur un toit plat, la meilleure orientation n&apos;est pas toujours celle qui produit
          le plus. Elle dépend de vos horaires.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            <strong>Foyer présent en journée</strong> (télétravail, retraite, jeunes enfants) :
            le plein sud valorise bien le pic de midi, surtout avec un ballon d&apos;eau chaude
            programmé à ces heures.
          </li>
          <li>
            <strong>Foyer absent de 8 h à 18 h</strong> : l&apos;est-ouest ou le sud-ouest
            produisent davantage aux heures de présence, le matin et en fin de journée.
          </li>
          <li>
            <strong>Voiture électrique rechargée le soir</strong> : un pan ouest ou sud-ouest
            prolonge la production jusqu&apos;à 19 ou 20 h en été.
          </li>
          <li>
            <strong>Maison avec batterie</strong> : l&apos;orientation compte moins, car la
            batterie stocke le surplus de midi pour la soirée. Le plein sud retrouve alors
            l&apos;avantage du volume.
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-6">
          Avant de choisir, analysez votre courbe de consommation heure par heure, disponible
          sur votre espace client ou l&apos;application de votre fournisseur. Elle montre à
          quel moment de la journée vous consommez réellement, et donc quelle orientation de
          panneaux solaires vous fera économiser le plus.
        </p>

        {/* ---- SECTION 8 : URBANISME ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Ce que disent les règles d&apos;urbanisme
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Installer des panneaux sur un toit demande une déclaration préalable de travaux en
          mairie, avec un délai d&apos;instruction d&apos;un mois, porté à deux mois dans un
          secteur protégé. Le plan local d&apos;urbanisme peut fixer des règles qui touchent
          directement à l&apos;orientation : pose obligatoirement parallèle au pan de toiture,
          interdiction de surélever les panneaux, limitation des installations visibles depuis
          la voie publique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Aux abords d&apos;un monument historique ou dans un site patrimonial remarquable,
          nombreux en Île-de-France, l&apos;architecte des Bâtiments de France donne son avis.
          Il peut demander des panneaux entièrement noirs, une pose intégrée ou
          l&apos;implantation sur un pan moins visible, parfois moins bien orienté. Consultez
          le PLU de votre commune avant de faire réaliser des devis, et vérifiez en même temps
          l&apos;état de votre couverture : si elle doit être refaite ou isolée, faites-le
          avant la pose. Notre article sur l&apos;
          <Link href="/blog/isolation-thermique-du-toit" className={linkCls}>
            isolation thermique du toit
          </Link>{' '}
          détaille les options. Sur un toit en tuiles, le choix des crochets est expliqué dans
          notre article sur la{' '}
          <Link href="/blog/fixation-panneaux-solaires-sur-tuiles" className={linkCls}>
            fixation des panneaux solaires sur tuiles
          </Link>
          .
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Étude de toiture gratuite en Île-de-France"
          description="Nos installateurs RGE QualiPV mesurent l'orientation, l'inclinaison et les ombres de votre toit, simulent la production heure par heure et vous proposent l'implantation qui maximise votre autoconsommation. Devis gratuit sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;orientation des panneaux solaires
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
            { href: '/services/panneaux-solaires', kicker: 'Notre service', title: 'Installation de panneaux solaires', cta: 'Voir le service' },
            { href: '/blog/avantages-panneaux-solaires', kicker: 'Article associé', title: 'Avantages des panneaux solaires', cta: 'Lire l\'article' },
            { href: '/simulateur-solaire', kicker: 'Outil gratuit', title: 'Simulateur de production solaire', cta: 'Faire la simulation' },
            { href: '/produits/carport-solaire', kicker: 'Produit', title: 'Carport et pergola solaire', cta: 'Voir le produit' },
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
            Panneaux solaires par ville en Île-de-France
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Paris', slug: 'paris' },
              { name: 'Versailles', slug: 'versailles' },
              { name: 'Saint-Germain-en-Laye', slug: 'saint-germain-en-laye' },
              { name: 'Vincennes', slug: 'vincennes' },
              { name: 'Palaiseau', slug: 'palaiseau' },
              { name: 'Chelles', slug: 'chelles' },
              { name: 'Ozoir-la-Ferrière', slug: 'ozoir-la-ferriere' },
              { name: 'Noisy-le-Grand', slug: 'noisy-le-grand' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/services/panneaux-solaires/${city.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                Panneaux solaires {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

      </ArticleLayout>
    </>
  )
}
