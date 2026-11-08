import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSources,
  ArticleFaq, ArticleLinkCards, PacCityLinks,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, PRIX_TABLE, CONSO_TABLE, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/chauffe-eau-thermodynamique-prix'

const HERO_IMAGE = '/images/blog/geothermie-local-technique-ballons-tampon.jpg'
const HERO_ALT = "Local technique en bois avec deux grands ballons d'eau chaude blancs, des modules de pompe à chaleur et des tuyauteries calorifugées noires, illustrant le prix d'un chauffe-eau thermodynamique et de son installation"

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
    images: [{ url: `https://www.greenter.fr${HERO_IMAGE}`, width: 1600, height: 782, alt: HERO_ALT }],
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
  { name: 'Chauffe-eau thermodynamique : prix', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function ChauffeEauThermodynamiquePrix() {
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
        wordCount={2400}
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
            Dans une maison chauffée à l’électricité, l’eau chaude représente souvent le
            deuxième poste de la facture, juste après le chauffage. Un cumulus de 200 litres
            consomme près de 3 000 kWh par an pour une famille de quatre personnes.
          </p>
          <p>
            Le chauffe-eau thermodynamique fait le même travail avec trois fois moins
            d’électricité. Il fonctionne comme une petite pompe à chaleur posée sur un ballon.
            Son <strong>prix</strong> reste toutefois plus élevé que celui d’un cumulus, et ses
            aides ont changé au 1er septembre 2026.
          </p>
          <p>
            Voici ce que coûte un <strong>chauffe-eau thermodynamique</strong> posé, ce qu’il
            fait réellement économiser, les aides encore disponibles et les erreurs
            d’emplacement qui ruinent son rendement.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le fonctionnement d’un chauffe-eau thermodynamique</li>
            <li>Les prix posés selon le type et la capacité</li>
            <li>La consommation et les économies face à un cumulus</li>
            <li>Les aides restantes après la réforme de septembre 2026</li>
            <li>Le bon emplacement et le couplage avec des panneaux solaires</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : FONCTIONNEMENT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment fonctionne un chauffe-eau thermodynamique
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un chauffe-eau thermodynamique associe un ballon de stockage, de 150 à 300 litres,
          et une pompe à chaleur. Un ventilateur aspire de l’air, ambiant ou extérieur. Un
          fluide frigorigène y capte des calories, un compresseur les concentre, et un
          échangeur les transmet à l’eau du ballon. Une résistance électrique prend le relais
          lorsque l’air est trop froid ou qu’un besoin important survient.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Son efficacité se mesure par un coefficient de performance, le COP, mesuré selon
          la norme NF EN 16147. Un bon appareil affiche un COP de 2,5 à 3,5 : il fournit 2,5 à
          3,5 kWh de chaleur pour 1 kWh d’électricité. C’est le même principe que la{' '}
          <Link href="/blog/pompe-a-chaleur-air-eau-fonctionnement" className={linkCls}>
            pompe à chaleur air-eau
          </Link>{' '}
          qui chauffe une maison, à une échelle plus petite.
        </p>

        <ArticleStat stats={[
          { value: '≈ 3 fois', label: 'moins d’électricité qu’un cumulus pour la même eau chaude', color: 'green' },
          { value: '300 à 400 €', label: 'économie annuelle pour une famille de quatre personnes', color: 'blue' },
          { value: '1er sept. 2026', label: 'fin de MaPrimeRénov’ pour un chauffe-eau thermodynamique seul', color: 'amber' },
        ]} />

        {/* ---- SECTION 2 : PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix d’un chauffe-eau thermodynamique posé en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix dépend d’abord de la source d’air. Le modèle le plus courant, et le moins
          cher, puise l’air de la pièce où il est installé. Les modèles gainés aspirent et
          rejettent l’air à l’extérieur par deux conduits. Les modèles split séparent le
          ballon et une petite unité extérieure, comme une climatisation.
        </p>

        <ArticleTable {...PRIX_TABLE} title="Prix d’un chauffe-eau thermodynamique selon le type" />

        <p className="text-slate-700 leading-relaxed mb-4">
          La capacité se choisit selon le nombre de personnes : comptez 50 à 60 litres par
          personne avec un appareil thermodynamique, un peu plus qu’avec un cumulus car il
          chauffe plus lentement. Un ballon de 200 litres convient à trois personnes, 250 à
          270 litres à quatre ou cinq. Surdimensionner coûte plus cher à l’achat et augmente
          les pertes.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          À la pose, plusieurs détails font varier le devis : évacuation des condensats, qui
          doit rejoindre un écoulement, percements pour les gaines d’un modèle sur air
          extérieur, groupe de sécurité neuf, réducteur de pression si celle du réseau
          dépasse 3 bars. Un ballon de 270 litres plein pèse près de 350 kg : le sol doit le
          supporter, ce qui exclut certains planchers anciens en étage.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les critères pour bien choisir son modèle
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Au-delà du prix, cinq critères distinguent un bon chauffe-eau thermodynamique.
          Le premier est le COP, mesuré selon la norme NF EN 16147 à une température d’air
          précisée : comparez des COP mesurés dans les mêmes conditions, à 7 °C pour l’air
          extérieur ou à 15 °C pour l’air ambiant. Le deuxième est la plage de
          fonctionnement : certains modèles s’arrêtent dès 5 °C, d’autres fonctionnent
          jusqu’à −10 ou −15 °C, ce qui compte pour un modèle sur air extérieur.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Viennent ensuite le niveau sonore, la qualité de la cuve, émaillée ou en inox,
          avec une anode magnésium ou à courant imposé qui dure plus longtemps, et la
          programmation. Un modèle connecté, capable de suivre les heures creuses ou le
          surplus de panneaux solaires, rapporte vite les quelques dizaines d’euros qu’il
          coûte en plus. Vérifiez enfin la durée de garantie de la cuve, souvent cinq ans,
          et celle du compresseur, parfois deux seulement.
        </p>

        {/* ---- SECTION 3 : CONSO ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Consommation et économies face à un cumulus électrique
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une famille de quatre personnes utilise environ 200 litres d’eau chaude par jour.
          Pour les chauffer et compenser les pertes du ballon, un cumulus consomme près de
          2 900 kWh par an. Un chauffe-eau thermodynamique au COP de 2,8 en consomme environ
          1 050.
        </p>

        <ArticleTable {...CONSO_TABLE} title="Coût annuel de l’eau chaude pour une famille de quatre personnes" />

        <p className="text-slate-700 leading-relaxed mb-4">
          L’économie atteint donc 300 à 400 € par an. Face au surcoût d’achat, de 1 500 à
          2 500 € par rapport à un cumulus neuf, le remboursement intervient en six à dix ans.
          C’est plus rapide si vous remplacez un cumulus en fin de vie : l’achat d’un cumulus
          neuf aurait de toute façon coûté 700 à 1 200 €.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le rendement réel dépend beaucoup de l’emplacement. Sur air ambiant, l’appareil
          fonctionne bien tant que la pièce reste au-dessus de 7 à 10 °C. Dans un garage très
          froid en janvier, la résistance électrique prend le relais plus souvent, et le COP
          annuel baisse. C’est pourquoi un modèle sur air extérieur, plus cher, peut être plus
          rentable dans certaines maisons.
        </p>

        {/* ---- SECTION 4 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelles aides pour un chauffe-eau thermodynamique en 2026 ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Jusqu’à fin août 2026, MaPrimeRénov’ versait un forfait pour un chauffe-eau
          thermodynamique installé seul. Un décret publié fin août a supprimé ce forfait pour
          toute demande déposée depuis le 1er septembre 2026. L’appareil reste éligible
          uniquement dans le cadre d’une rénovation d’ampleur accompagnée, qui combine
          plusieurs travaux et un gain d’au moins deux classes de DPE.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour compenser, la prime CEE correspondante a été temporairement bonifiée pour les
          opérations engagées avant le 1er janvier 2027, avec un coefficient plus élevé pour
          les ménages modestes. Son montant varie selon le fournisseur d’énergie. Comme pour
          toute prime CEE, l’offre doit être acceptée avant la signature du devis.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La TVA à 5,5 % et l’éco-prêt à taux zéro restent accessibles, à condition de faire
          appel à une entreprise RGE. Le tableau complet des aides pour les équipements de
          chauffage figure dans notre article sur l’{' '}
          <Link href="/blog/aide-pompe-a-chaleur-2026" className={linkCls}>
            aide pompe à chaleur 2026
          </Link>
          .
        </p>

        <ArticleCallout type="warning" title="Une bonification limitée dans le temps">
          <p>
            La bonification de la prime CEE ne concerne que les opérations engagées avant le
            1er janvier 2027, c’est-à-dire dont le devis est signé avant cette date. Si votre
            cumulus montre des signes de fatigue, c’est le moment de comparer les offres.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : EMPLACEMENT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Où installer un chauffe-eau thermodynamique
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un modèle sur air ambiant a besoin d’un volume d’air suffisant, en général au moins
          20 m³, soit une pièce de 8 m² sous 2,5 m de plafond. Il doit être placé dans une
          pièce non chauffée : garage, cellier, buanderie, sous-sol. Installé dans une pièce
          chauffée, il refroidirait l’air que votre chauffage vient de produire, et une partie
          de l’économie serait perdue.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          L’appareil rejette un air plus frais de 5 à 8 °C. C’est un atout dans une cave à vin
          ou un cellier l’été, un inconvénient dans un garage qui sert d’atelier en hiver. Il
          produit aussi 40 à 50 dB(A) à proximité, sans gêne dans un local technique, mais à
          éviter contre le mur d’une chambre.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Sans local adapté, deux solutions existent. Le modèle gainé aspire l’air extérieur
          par un conduit, ce qui permet de placer le ballon dans une pièce chauffée. Le modèle
          split déporte le compresseur dehors : le ballon peut alors tenir dans un placard,
          comme un cumulus classique.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Comment se passe le remplacement d’un cumulus
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le chantier dure une demi-journée à une journée. Le technicien vidange et dépose
          l’ancien cumulus, vérifie le support ou le sol, puis installe le nouveau ballon et
          son groupe de sécurité. Il raccorde l’eau froide, l’eau chaude, l’évacuation des
          condensats et l’alimentation électrique, en général sur la ligne existante.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La mise en service comprend le remplissage, le réglage de la température de
          consigne, souvent 55 °C, et la programmation du cycle anti-légionelles, qui monte
          l’eau à 60 °C ou plus une fois par semaine. Prévoyez une coupure d’eau chaude de
          quelques heures, et une première chauffe plus longue qu’avec un cumulus : il faut
          six à dix heures pour porter 250 litres à température, contre quatre à six heures
          pour un ballon électrique.
        </p>

        {/* ---- SECTION 6 : SOLAIRE / PAC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Chauffe-eau thermodynamique, solaire ou pompe à chaleur air-eau ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le chauffe-eau thermodynamique fonctionne très bien avec des panneaux
          photovoltaïques. Programmé pour chauffer l’eau entre 11 h et 15 h, il absorbe une
          partie du surplus de production, revendu seulement 1,1 centime le kWh depuis juin
          2026. L’eau chaude devient presque gratuite d’avril à septembre. Nous détaillons ce
          principe dans notre article sur l’{' '}
          <Link href="/blog/installation-panneau-solaire-avec-batterie" className={linkCls}>
            installation de panneaux solaires avec batterie
          </Link>
          , où le ballon d’eau chaude joue le rôle de batterie la moins chère de la maison.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si vous envisagez de remplacer votre chauffage, la question se pose autrement. Une
          pompe à chaleur air-eau produit à la fois le chauffage et l’eau chaude sanitaire,
          avec un ballon intégré ou séparé. Ajouter un chauffe-eau thermodynamique serait un
          doublon. Mieux vaut alors intégrer l’eau chaude au projet de PAC, mieux aidé en 2026.
          Voir notre article sur le{' '}
          <Link href="/blog/cout-installation-pompe-a-chaleur" className={linkCls}>
            coût d’installation d’une pompe à chaleur
          </Link>
          .
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le chauffe-eau thermodynamique reste donc la bonne solution dans trois cas : une
          maison chauffée par convecteurs, par un poêle ou par une PAC air-air, qui ne produit
          pas d’eau chaude ; une chaudière récente qu’on veut garder encore quelques années ;
          ou un cumulus en fin de vie à remplacer sans attendre un projet de chauffage plus
          large.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Thermodynamique ou chauffe-eau solaire ?
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le chauffe-eau solaire thermique utilise des capteurs sur le toit qui chauffent
          directement l’eau du ballon. En Île-de-France, il couvre 50 à 60 % des besoins
          annuels en eau chaude, avec un appoint électrique ou raccordé à la chaudière pour
          l’hiver. Il coûte en revanche 4 500 à 7 000 € posé, demande une toiture bien
          orientée et un entretien du circuit de capteurs.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour la plupart des maisons, le chauffe-eau thermodynamique offre un meilleur
          rapport entre prix et économies, surtout s’il est couplé à des panneaux
          photovoltaïques qui servent aussi au reste de la maison. Le solaire thermique garde
          l’avantage dans les foyers nombreux, avec de gros besoins d’eau chaude l’été, et
          sur les toitures trop petites pour une installation photovoltaïque rentable. Pour
          dimensionner des panneaux, voir notre article sur la 
          <Link href="/blog/taille-panneaux-solaires" className={linkCls}>
            taille des panneaux solaires
          </Link>
          .
        </p>

        <ArticleCallout type="tip" title="Entretien : trois gestes simples">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Nettoyer le filtre à air deux à trois fois par an</li>
            <li>Vérifier que l’évacuation des condensats n’est pas bouchée</li>
            <li>Faire contrôler l’anode et détartrer tous les deux à trois ans en eau calcaire</li>
          </ul>
        </ArticleCallout>

        <ArticleCTA
          title="Eau chaude : thermodynamique ou pompe à chaleur ?"
          description="Nos techniciens RGE étudient votre logement, votre chauffage actuel et vos besoins en eau chaude pour vous proposer la solution la plus rentable, avec les aides 2026 déduites. Devis gratuit sous 48h en Île-de-France."
        />

        <ArticleFaq title="Questions fréquentes sur le chauffe-eau thermodynamique" items={FAQ_ITEMS} />

        <ArticleSources sources={SOURCES} />

        <ArticleLinkCards cards={[
          { href: '/services/pompe-a-chaleur', kicker: 'Notre service', title: 'Installation de pompe à chaleur', cta: 'Voir le service' },
          { href: '/blog/aide-pompe-a-chaleur-2026', kicker: 'Article associé', title: 'Aide pompe à chaleur 2026', cta: 'Lire l’article' },
          { href: '/blog/prix-pompe-a-chaleur-air-air', kicker: 'Article associé', title: 'Prix d’une pompe à chaleur air-air', cta: 'Lire l’article' },
          { href: '/services/panneaux-solaires', kicker: 'Notre service', title: 'Installation de panneaux solaires', cta: 'Voir le service' },
        ]} />

        <PacCityLinks cities={[
          { name: 'Ozoir-la-Ferrière', slug: 'ozoir-la-ferriere' },
          { name: 'Roissy-en-Brie', slug: 'roissy-en-brie' },
          { name: 'Torcy', slug: 'torcy' },
          { name: 'Lagny-sur-Marne', slug: 'lagny-sur-marne' },
          { name: 'Savigny-le-Temple', slug: 'savigny-le-temple' },
          { name: 'Évry-Courcouronnes', slug: 'evry-courcouronnes' },
          { name: 'Poissy', slug: 'poissy' },
          { name: 'Rosny-sous-Bois', slug: 'rosny-sous-bois' },
        ]} />

      </ArticleLayout>
    </>
  )
}
