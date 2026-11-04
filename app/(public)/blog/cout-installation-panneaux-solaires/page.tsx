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
  ARTICLE_META, PRIX_PUISSANCE_TABLE, REPARTITION_TABLE, PROJET_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/cout-installation-panneaux-solaires'

const HERO_IMAGE = '/images/blog/cout-installation-panneaux-solaires-pose-modules-toiture-tuiles.jpg'
const HERO_ALT = "Deux installateurs posent des panneaux solaires sur des rails en aluminium fixés à une toiture en tuiles rouges, sous un ciel bleu, une étape qui pèse dans le coût d'installation des panneaux solaires"

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
      height: 725,
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
  { name: "Coût d'installation des panneaux solaires", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function CoutInstallationPanneauxSolaires() {
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
        wordCount={3200}
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
            Un devis à 7 000 €, un autre à 13 000 € pour la même maison : quand on se lance dans
            le solaire, les écarts de prix ont de quoi dérouter. Ils s&apos;expliquent pourtant
            assez bien, à condition de savoir ce que recouvre chaque ligne du devis.
          </p>
          <p>
            Le <strong>coût d&apos;installation des panneaux solaires</strong> ne se limite pas
            au prix des modules. Il comprend l&apos;onduleur, les fixations, la pose sur le
            toit, le raccordement électrique et une série de démarches administratives. Et
            depuis juin 2026, le contexte a changé : la prime à l&apos;autoconsommation a
            disparu et le surplus revendu ne rapporte presque plus rien.
          </p>
          <p>
            Nous détaillons ici les prix observés en 2026 selon la puissance, la répartition
            d&apos;un devis poste par poste, les frais annexes souvent oubliés, les aides qui
            restent et la façon de juger si l&apos;investissement sera rentable chez vous.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le prix d&apos;une installation solaire de 3, 4,5, 6 et 9 kWc en 2026</li>
            <li>La répartition du coût entre matériel, pose et démarches</li>
            <li>Les facteurs qui font monter la facture et les frais annexes</li>
            <li>Les aides encore disponibles après la réforme de juin 2026</li>
            <li>Le délai de remboursement et les étapes du projet</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : PRIX PAR PUISSANCE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Coût d&apos;installation des panneaux solaires en 2026 : les prix par puissance
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le premier critère qui fixe le prix, c&apos;est la puissance de l&apos;installation,
          exprimée en kilowatts-crête (kWc). Sur une maison, elle se situe presque toujours
          entre 3 et 9 kWc. Le seuil de 9 kWc n&apos;est pas un hasard : c&apos;est le plafond
          de la TVA réduite à 5,5 %, qui pèse lourd dans le total.
        </p>

        <ArticleStat stats={[
          { value: '2 000 à 2 800 €', label: 'prix moyen TTC par kWc pour une installation de 3 kWc posée sur toiture en 2026', color: 'blue' },
          { value: '5,5 %', label: 'taux de TVA appliqué aux installations jusqu\'à 9 kWc, au lieu de 20 %', color: 'green' },
          { value: '≈ 1,1 c€', label: 'prix de rachat HT du kWh injecté pour les nouveaux contrats depuis juin 2026', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-4">
          Ces trois chiffres résument la situation. Une installation solaire coûte aujourd&apos;hui
          deux à trois fois moins cher par kWc qu&apos;il y a quinze ans, la fiscalité est
          favorable, mais la revente du surplus ne finance plus grand-chose. C&apos;est donc
          l&apos;électricité que vous consommez vous-même qui rembourse l&apos;investissement.
        </p>

        <ArticleTable {...PRIX_PUISSANCE_TABLE} title="Coût d'installation des panneaux solaires selon la puissance" />

        <p className="text-slate-700 leading-relaxed mb-6">
          Les fourchettes sont larges, et c&apos;est normal. Le bas de la fourchette correspond
          à une toiture simple, d&apos;accès facile, avec des panneaux de milieu de gamme et un
          onduleur central. Le haut concerne des panneaux premium, des micro-onduleurs, une
          toiture complexe ou un installateur qui inclut un suivi plus complet. Chez Greenter,
          nos kits{' '}
          <Link href="/produits/kit-autoconsommation-3kwc" className={linkCls}>3 kWc</Link> et{' '}
          <Link href="/produits/kit-autoconsommation-6kwc" className={linkCls}>6 kWc</Link>{' '}
          affichent un prix tout compris, pose et déclaration en mairie incluses, avec un
          supplément fixe de 700 € pour le Consuel et le raccordement.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Pourquoi le prix par kWc baisse avec la puissance
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une partie des coûts ne dépend pas du nombre de panneaux : la visite technique, la
          déclaration préalable, le déplacement de l&apos;équipe, l&apos;installation des
          protections électriques, le Consuel et la mise en service. Sur 3 kWc, ces frais fixes
          pèsent lourd. Sur 9 kWc, ils sont répartis sur trois fois plus de puissance.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Faut-il pour autant viser plus grand ? Pas forcément. Une installation de 9 kWc dans
          une maison qui consomme 4 000 kWh par an revendrait plus de la moitié de sa production
          à 1,1 centime le kWh. Le prix par kWc serait plus bas, mais le coût par kWh réellement
          utilisé serait bien plus élevé. Notre article sur la{' '}
          <Link href="/blog/taille-panneaux-solaires" className={linkCls}>
            taille des panneaux solaires
          </Link>{' '}
          explique comment choisir la puissance adaptée à votre consommation.
        </p>

        {/* ---- SECTION 2 : REPARTITION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Ce que contient le prix d&apos;une installation photovoltaïque
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Beaucoup de particuliers pensent que les panneaux représentent l&apos;essentiel de la
          facture. C&apos;était vrai il y a quinze ans. Ce n&apos;est plus le cas : le prix des
          modules a tellement baissé que la pose et les équipements électriques pèsent
          désormais davantage.
        </p>

        <ArticleTable {...REPARTITION_TABLE} title="Répartition du coût d'une installation solaire de 3 kWc" />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les panneaux : moins chers qu&apos;avant, mais pas tous égaux
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Sur le marché européen de gros, un panneau monocristallin standard se négocie
          aujourd&apos;hui à moins de 15 centimes par watt-crête. Pour un particulier, le prix
          facturé est plus élevé, car il intègre le transport, le stockage, la garantie et la
          marge de l&apos;installateur, mais le poste reste modeste : environ 1 500 à 1 900 €
          pour 3 kWc.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Les écarts de prix entre marques tiennent surtout au rendement, à la technologie
          (N-type, TOPCon, hétérojonction), à la garantie produit et à la solidité financière du
          fabricant. Un panneau garanti 25 ans par une marque qui risque de disparaître dans
          cinq ans ne vaut pas grand-chose. Le surcoût d&apos;un module haut de gamme se
          justifie surtout quand la surface de toit est limitée.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Onduleur central ou micro-onduleurs : un écart de quelques centaines d&apos;euros
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;onduleur transforme le courant continu produit par les panneaux en courant
          alternatif utilisable dans la maison. Deux architectures se partagent le marché.
          L&apos;onduleur central, installé dans le garage ou le cellier, est le moins cher à
          l&apos;achat. Les micro-onduleurs, fixés sous chaque panneau ou sous chaque paire,
          coûtent 500 à 1 000 € de plus sur 3 kWc.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ce surcoût se rattrape en partie. Les micro-onduleurs limitent les pertes quand un
          panneau est ombragé, permettent de suivre la production module par module et sont
          souvent garantis 20 à 25 ans, contre 10 à 12 ans pour un onduleur central. Sur une
          toiture avec une cheminée ou deux orientations, ils sont souvent le meilleur choix.
          Si vous envisagez une batterie, un onduleur hybride peut en revanche simplifier
          l&apos;installation.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          La pose, premier poste du devis
        </h3>

        <ArticleImageSection
          image="/images/blog/cout-installation-panneaux-solaires-installateur-fixation-module.jpg"
          alt="Installateur agenouillé sur une toiture en tuiles qui fixe un panneau solaire sur son rail, au soleil couchant, au-dessus d'une rue de maisons mitoyennes"
          imagePosition="right"
        >
          <p>
            La pose mobilise en général deux techniciens pendant une à deux journées pour
            3 à 6 kWc, avec les équipements de sécurité exigés pour le travail en hauteur.
          </p>
          <p className="mt-3">
            Elle représente 25 à 30 % du prix, soit le premier poste devant les panneaux
            eux-mêmes.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ce prix couvre bien plus que le montage des modules. Il faut retirer des tuiles,
          poser les crochets dans les chevrons, aligner les rails, câbler les panneaux, faire
          passer les câbles dans la toiture sans créer de fuite, puis installer le coffret de
          protection et raccorder le tableau électrique. Un défaut d&apos;étanchéité coûte bien
          plus cher qu&apos;une pose soignée. Notre article sur la{' '}
          <Link href="/blog/fixation-panneaux-solaires-sur-tuiles" className={linkCls}>
            fixation des panneaux solaires sur tuiles
          </Link>{' '}
          détaille les bonnes pratiques à exiger.
        </p>

        {/* ---- SECTION 3 : FACTEURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les facteurs qui font varier le coût de l&apos;installation
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          À puissance égale, deux maisons voisines peuvent recevoir des devis différents de
          plusieurs milliers d&apos;euros. Voici les principaux éléments qui expliquent ces
          écarts.
        </p>

        <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
          <li>
            <strong>Le type de couverture.</strong> Les tuiles mécaniques sont les plus simples
            à équiper. Les tuiles canal, l&apos;ardoise ou les tuiles plates anciennes demandent
            des crochets spécifiques et plus de temps, avec un surcoût de 10 à 20 %.
          </li>
          <li>
            <strong>La surimposition ou l&apos;intégration au bâti.</strong> Les panneaux posés
            au-dessus des tuiles sont la solution standard. L&apos;intégration, qui remplace la
            couverture, coûte 15 à 25 % de plus et présente davantage de risques
            d&apos;infiltration.
          </li>
          <li>
            <strong>L&apos;accès au toit.</strong> Une maison de plain-pied avec une pente
            douce se traite vite. Un R+2, une pente forte ou une rue étroite imposent un
            échafaudage ou une nacelle, facturés 500 à 1 500 €.
          </li>
          <li>
            <strong>L&apos;installation électrique.</strong> Un tableau ancien, une grande
            distance entre le toit et le compteur ou un passage en triphasé ajoutent du matériel
            et des heures de travail.
          </li>
          <li>
            <strong>Le secteur protégé.</strong> Près d&apos;un monument historique,
            l&apos;architecte des Bâtiments de France peut exiger des panneaux tout noirs ou une
            implantation particulière, avec un impact sur le prix et les délais.
          </li>
          <li>
            <strong>L&apos;orientation de la toiture.</strong> Elle ne change pas le prix, mais
            elle change la production. Une toiture est-ouest produit environ 15 % de moins
            qu&apos;une toiture plein sud, ce qui augmente le coût de chaque kWh. Notre article
            sur l&apos;
            <Link href="/blog/orientation-panneaux-solaires" className={linkCls}>
              orientation des panneaux solaires
            </Link>{' '}
            donne les chiffres par exposition.
          </li>
        </ul>

        <ArticleCallout type="info" title="Et avec une batterie ?">
          <p>
            Une batterie domestique de 5 à 10 kWh ajoute en général 4 000 à 8 000 € au coût
            d&apos;installation des panneaux solaires, pose comprise. Elle augmente la part
            d&apos;électricité consommée sur place, mais allonge souvent le délai de
            remboursement. Nous détaillons les prix et le dimensionnement dans notre article
            sur l&apos;
            <Link href="/blog/installation-panneau-solaire-avec-batterie" className={linkCls}>
              installation d&apos;un panneau solaire avec batterie
            </Link>
            .
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : FRAIS ANNEXES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les frais annexes à prévoir dans votre budget
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un devis attractif peut cacher des frais qui apparaissent plus tard. Avant de
          signer, vérifiez que les éléments suivants sont inclus ou chiffrés à part.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>Le Consuel et le raccordement.</strong> L&apos;attestation de conformité
          électrique est obligatoire avant toute mise en service. Le dossier et la visite
          éventuelle coûtent quelques centaines d&apos;euros, souvent intégrés au devis.
          La mise en service par Enedis est généralement réalisée à distance sur un compteur
          Linky, mais une modification du branchement peut entraîner des travaux facturés.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>Les travaux de toiture.</strong> Poser des panneaux sur une couverture
          fatiguée n&apos;a pas de sens : il faudrait tout démonter dans dix ans pour la
          refaire. Remplacer quelques tuiles cassées coûte peu, mais une charpente à renforcer
          ou une couverture en fibrociment amianté à retirer peut représenter plusieurs milliers
          d&apos;euros. Si vous refaites le toit, profitez-en pour traiter l&apos;
          <Link href="/blog/isolation-thermique-du-toit" className={linkCls}>
            isolation thermique du toit
          </Link>{' '}
          dans le même chantier.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          <strong>Les coûts sur la durée de vie.</strong> Les panneaux eux-mêmes ne demandent
          presque aucun entretien, la pluie suffit le plus souvent à les nettoyer. Il faut en
          revanche prévoir le remplacement d&apos;un onduleur central après 10 à 15 ans, pour
          1 000 à 2 000 €. Une visite de contrôle tous les deux ou trois ans permet de vérifier
          les fixations, les connecteurs et la production. Pensez aussi à déclarer
          l&apos;installation à votre assureur habitation.
        </p>

        {/* ---- SECTION 5 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelles aides pour réduire le coût d&apos;installation des panneaux solaires ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La réforme du 1er juin 2026 a simplifié le paysage, mais pas dans le sens espéré par
          les particuliers. La prime à l&apos;autoconsommation, qui pouvait atteindre plusieurs
          centaines d&apos;euros, n&apos;est plus versée pour les demandes de raccordement
          déposées depuis le 5 juin 2026. Voici ce qui reste :
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            la <strong>TVA à 5,5 %</strong> sur le matériel et la pose, pour les installations
            jusqu&apos;à 9 kWc qui respectent les critères environnementaux fixés par
            l&apos;administration. Sur une installation de 6 kWc facturée 10 000 € HT, la
            facture passe de 12 000 € à 10 550 € TTC ;
          </li>
          <li>
            le <strong>contrat de rachat du surplus</strong> avec EDF OA, signé pour vingt ans,
            à environ 1,1 c€ HT par kWh pour les nouvelles demandes ;
          </li>
          <li>
            l&apos;<strong>exonération d&apos;impôt</strong> sur les revenus de la vente du
            surplus pour les installations jusqu&apos;à 3 kWc, sous conditions ;
          </li>
          <li>
            d&apos;éventuelles <strong>aides locales</strong> de la région, du département ou de
            la commune, à vérifier auprès d&apos;un conseiller France Rénov&apos;.
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-6">
          Deux précisions évitent de mauvaises surprises. MaPrimeRénov&apos; ne finance pas les
          panneaux photovoltaïques, contrairement à ce qu&apos;affirment certains démarcheurs.
          Et la qualification RGE QualiPV de l&apos;installateur reste indispensable : sans
          elle, le contrat de rachat avec EDF OA n&apos;est pas accessible. Le détail des
          gains et des aides figure dans notre article sur les{' '}
          <Link href="/blog/avantages-panneaux-solaires" className={linkCls}>
            avantages des panneaux solaires
          </Link>
          .
        </p>

        {/* ---- SECTION 6 : RENTABILITE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Coût et rentabilité : en combien de temps l&apos;installation est-elle remboursée ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le coût d&apos;une installation solaire n&apos;a de sens que rapporté à ce
          qu&apos;elle fait économiser. Chaque kWh produit et consommé sur place évite
          d&apos;acheter un kWh au réseau, à environ 19,5 centimes TTC en option base. Chaque
          kWh revendu ne rapporte que 1,1 centime. Le taux d&apos;autoconsommation, la part de
          la production utilisée dans la maison, est donc devenu le chiffre clé.
        </p>

        <ArticleStat stats={[
          { value: '≈ 1 100 kWh', label: 'production annuelle d\'un kWc bien orienté en Île-de-France (PVGIS)', color: 'blue' },
          { value: '13 à 15 ans', label: 'retour sur investissement d\'une installation de 6 kWc bien autoconsommée, sans hausse du prix de l\'électricité', color: 'green' },
          { value: '30 ans et plus', label: 'durée de vie courante des panneaux, avec une perte de production d\'environ 0,4 % par an', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-4">
          Prenons deux cas concrets. Une maison de 4 personnes chauffée au gaz installe 3 kWc
          pour 7 500 €. Elle produit 3 300 kWh par an. En pilotant le ballon d&apos;eau chaude
          et les gros appareils en journée, elle en consomme 60 % et économise environ 400 €
          par an. Le remboursement prend 17 à 20 ans.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une maison équipée d&apos;une{' '}
          <Link href="/services/pompe-a-chaleur" className={linkCls}>pompe à chaleur</Link>{' '}
          et d&apos;une voiture électrique installe 6 kWc pour 12 000 €. Elle consomme 65 % de
          sa production de 6 600 kWh, et économise 800 à 900 € par an. Le remboursement tombe à
          13 à 15 ans, avec encore quinze ans de production presque gratuite ensuite.
        </p>

        <ArticleImageSection
          image="/images/blog/cout-installation-panneaux-solaires-pose-panneau-noir.jpg"
          alt="Installateur debout sur un toit qui soulève un panneau solaire full black avant de le fixer à côté d'une rangée de modules déjà posés, sous un ciel bleu intense"
          imagePosition="left"
        >
          <p>
            Un prix d&apos;achat plus bas raccourcit directement le délai de remboursement.
            Sur 3 kWc, chaque tranche de 1 000 € économisée sur le devis fait gagner deux à
            trois ans.
          </p>
          <p className="mt-3">
            C&apos;est pourquoi comparer le prix par kWc reste indispensable.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces calculs sont volontairement prudents : ils ne supposent aucune hausse du prix de
          l&apos;électricité. Or celui-ci a progressé de 2 à 3 % par an en moyenne sur les
          quinze dernières années. Si la tendance se poursuit, le remboursement arrive deux à
          trois ans plus tôt. Pour une estimation adaptée à votre toit, utilisez notre{' '}
          <Link href="/simulateur-solaire" className={linkCls}>simulateur solaire</Link>.
        </p>

        {/* ---- SECTION 7 : ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Du devis à la mise en service : les étapes et les délais
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Entre le premier rendez-vous et la première facture allégée, comptez deux à quatre
          mois. La pose elle-même est rapide. Ce sont les démarches qui prennent du temps,
          d&apos;où l&apos;intérêt d&apos;un installateur qui les gère pour vous.
        </p>

        <ArticleSteps steps={PROJET_STEPS} />

        {/* ---- SECTION 8 : DEVIS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment lire un devis de panneaux solaires
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un devis sérieux permet de comparer les offres ligne par ligne. Il doit mentionner au
          minimum la marque, la référence et la puissance unitaire des panneaux, leur nombre,
          le modèle d&apos;onduleur, le système de fixation adapté à votre couverture, un plan
          de calepinage et une estimation de production. Les démarches incluses (déclaration
          préalable, Consuel, raccordement, contrat de rachat) doivent être listées
          clairement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Vérifiez aussi l&apos;attestation d&apos;assurance décennale, le numéro de
          qualification RGE QualiPV, que vous pouvez contrôler sur l&apos;annuaire France
          Rénov&apos;, et les garanties : produit et performance des panneaux, onduleur, main
          d&apos;œuvre. Un installateur local qui intervient dans les 48 heures en cas de panne
          vaut souvent mieux qu&apos;une offre nationale un peu moins chère.
        </p>

        <ArticleCallout type="warning" title="Les signaux qui doivent alerter">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Un démarchage à domicile ou par téléphone avec une offre valable seulement le jour même</li>
            <li>Un prix supérieur à 3 500 € par kWc sans batterie ni intégration au bâti</li>
            <li>La promesse d&apos;une installation « autofinancée » ou « gratuite grâce aux aides »</li>
            <li>Un crédit affecté proposé et signé dans la foulée du devis</li>
            <li>Une puissance de 9 kWc proposée à un foyer qui consomme 4 000 kWh par an</li>
          </ul>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Le coût réel de votre installation solaire"
          description="Nos installateurs RGE QualiPV étudient votre toiture et votre consommation, puis vous remettent un devis détaillé poste par poste, démarches incluses. Étude et devis gratuits sous 48h en Île-de-France."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur le coût d&apos;installation des panneaux solaires
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
            { href: '/blog/installation-panneau-solaire-avec-batterie', kicker: 'Article associé', title: 'Panneau solaire avec batterie', cta: 'Lire l\'article' },
            { href: '/blog/avantages-panneaux-solaires', kicker: 'Article associé', title: 'Avantages des panneaux solaires', cta: 'Lire l\'article' },
            { href: '/simulateur-solaire', kicker: 'Outil gratuit', title: 'Simulateur de production solaire', cta: 'Faire la simulation' },
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
              { name: 'Poissy', slug: 'poissy' },
              { name: 'Champigny-sur-Marne', slug: 'champigny-sur-marne' },
              { name: 'Évry-Courcouronnes', slug: 'evry-courcouronnes' },
              { name: 'Torcy', slug: 'torcy' },
              { name: 'Combs-la-Ville', slug: 'combs-la-ville' },
              { name: 'Livry-Gargan', slug: 'livry-gargan' },
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
