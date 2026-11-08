import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSources, ArticleImageSection,
  ArticleFaq, ArticleLinkCards, PacCityLinks,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, PRIX_TABLE, VARIATION_TABLE, CONSO_TABLE, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/prix-pompe-a-chaleur-air-air'

const HERO_IMAGE = '/images/blog/pac-unite-exterieure-maison-briques-plantes.jpg'
const HERO_ALT = "Unité extérieure blanche de pompe à chaleur air-air fixée sur équerres contre le mur en briques rouges d'une maison, avec ses liaisons frigorifiques sous gaine et un arbuste en pot au premier plan"

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
    images: [{ url: `https://www.greenter.fr${HERO_IMAGE}`, width: 1200, height: 800, alt: HERO_ALT }],
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
  { name: 'Prix pompe à chaleur air-air', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function PrixPompeAChaleurAirAir() {
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
        wordCount={2700}
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
            Dans beaucoup de maisons des années 1970 et 1980, le chauffage tient encore dans
            une dizaine de convecteurs. Ils ne coûtaient presque rien à l’achat. Ils coûtent
            cher chaque hiver. Et l’été, rien ne rafraîchit les chambres sous les toits.
          </p>
          <p>
            La pompe à chaleur air-air répond aux deux problèmes avec un seul appareil. Elle
            prélève les calories de l’air extérieur pour chauffer, et inverse son cycle pour
            climatiser. Mais son <strong>prix</strong> varie du simple au quintuple selon la
            configuration, et elle ne bénéficie presque d’aucune aide en 2026.
          </p>
          <p>
            Voici ce que coûte réellement une <strong>pompe à chaleur air-air</strong> posée,
            ce qui fait varier le devis, combien elle permet d’économiser, et dans quels cas
            une PAC air-eau reste un meilleur choix.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le prix d’une PAC air-air posée selon le nombre d’unités</li>
            <li>Les postes qui font varier un devis</li>
            <li>La consommation et les économies face aux convecteurs</li>
            <li>Les aides encore disponibles en 2026</li>
            <li>Les règles de pose, de bruit et d’entretien</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : FONCTIONNEMENT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pompe à chaleur air-air : comment elle chauffe et rafraîchit
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une PAC air-air se compose d’une unité extérieure, qui contient le compresseur et
          un grand ventilateur, et d’une ou plusieurs unités intérieures qui soufflent l’air
          chaud ou froid dans les pièces. Les deux sont reliées par des liaisons frigorifiques
          en cuivre, dans lesquelles circule un fluide, le plus souvent du R32 aujourd’hui.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          En hiver, le fluide capte la chaleur de l’air extérieur, même à 0 °C, puis le
          compresseur la porte à une température suffisante pour chauffer la maison. Pour 1 kWh
          d’électricité consommé, l’appareil restitue 3 à 5 kWh de chaleur selon la
          température extérieure. L’été, une vanne inverse le cycle : la chaleur est extraite
          des pièces et rejetée dehors. C’est ce qui distingue la PAC air-air de la{' '}
          <Link href="/blog/pompe-a-chaleur-air-eau-fonctionnement" className={linkCls}>
            pompe à chaleur air-eau
          </Link>
          , qui chauffe de l’eau pour des radiateurs ou un plancher chauffant.
        </p>

        <ArticleStat stats={[
          { value: '3 à 5', label: 'kWh de chaleur restitués pour 1 kWh d’électricité consommé', color: 'green' },
          { value: '10 %', label: 'taux de TVA sur une PAC air-air, contre 5,5 % pour une air-eau', color: 'amber' },
          { value: '0 €', label: 'MaPrimeRénov’ pour une PAC air-air en 2026', color: 'red' },
        ]} />

        {/* ---- SECTION 2 : PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix d’une pompe à chaleur air-air posée en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le premier facteur de prix est le nombre d’unités intérieures. Un monosplit, une
          unité extérieure pour une unité intérieure, convient à une pièce ou à un séjour
          ouvert. Un multisplit relie une seule unité extérieure à deux, trois, voire cinq
          unités intérieures. Le gainable, lui, cache une unité unique dans les combles ou un
          faux plafond et distribue l’air par des gaines vers chaque pièce.
        </p>

        <ArticleTable {...PRIX_TABLE} title="Prix d’une pompe à chaleur air-air selon la configuration" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Le gainable est le plus cher, mais aussi le plus discret : seules des grilles de
          soufflage apparaissent au plafond. Il demande en revanche des combles accessibles
          ou un faux plafond, et un réseau de gaines bien isolé, sans quoi une partie de la
          chaleur est perdue en route. Dans une maison existante, le multisplit mural reste la
          solution la plus courante, car il se pose en un à deux jours sans gros travaux.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La marque et la gamme pèsent aussi. Entre un modèle d’entrée de gamme et un modèle
          haut de gamme de même puissance, l’écart atteint souvent 30 à 40 %. Il se retrouve
          dans le niveau sonore, la performance par grand froid, la qualité de la
          régulation et la durée de garantie du compresseur.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Monosplit, multisplit ou gainable : lequel choisir ?
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le monosplit convient pour chauffer et rafraîchir une seule pièce, un séjour ou une
          chambre sous les toits, en complément du chauffage existant. Le multisplit est la
          solution de remplacement complet des convecteurs dans une maison déjà habitée : il
          se pose sans toucher aux plafonds, et chaque pièce garde son propre réglage. Le
          gainable se justifie surtout lors d’une rénovation lourde ou d’une extension, quand
          les plafonds sont ouverts et que les gaines peuvent passer dans un volume isolé.
          Dans une maison de plain-pied avec combles perdus, il offre le meilleur confort
          visuel et acoustique, mais une seule régulation pour plusieurs pièces, sauf à
          ajouter des registres motorisés.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Ce qui fait varier un devis
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          À configuration identique, deux devis peuvent différer de plusieurs centaines
          d’euros. L’écart vient rarement du matériel, et presque toujours de la pose.
        </p>

        <ArticleTable {...VARIATION_TABLE} title="Les postes annexes d’une installation air-air" />

        <ArticleImageSection
          image="/images/blog/pac-unite-exterieure-mur-briques.jpg"
          alt="Unité extérieure de climatisation réversible fixée sur équerres contre un mur en briques peintes, avec ses liaisons frigorifiques remontant dans une goulotte métallique et un interrupteur de proximité à droite"
          imagePosition="right"
        >
          <p>
            Une pose soignée se reconnaît aux détails : liaisons sous goulotte, unité sur
            équerres avec plots antivibratiles, interrupteur de coupure à proximité.
          </p>
          <p className="mt-3">
            Ces éléments ont un coût, mais ils évitent les vibrations, les fuites et les
            remarques du voisinage.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Combien d’unités et quelle puissance pour votre maison ?
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          La puissance ne se choisit pas au mètre carré, contrairement à une idée répandue.
          Une chambre de 12 m² sous des combles mal isolés peut demander plus de puissance
          qu’un séjour de 30 m² bien orienté. L’installateur doit calculer les déperditions de
          chaque pièce, en tenant compte des murs, des fenêtres, de l’isolation et de la
          température extérieure de base du secteur, autour de −7 °C en Île-de-France.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          En pratique, on place une unité dans chaque pièce de vie et dans les chambres que
          l’on veut chauffer ou climatiser. Les pièces ouvertes les unes sur les autres
          peuvent partager une unité. Une salle de bains reste en général équipée d’un
          sèche-serviettes électrique, car une unité murale y serait exposée à l’humidité.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Un multisplit a aussi ses limites. Une seule unité extérieure alimente au maximum
          quatre à cinq unités intérieures, et toutes s’arrêtent si elle tombe en panne.
          Pour une grande maison, deux systèmes séparés offrent plus de souplesse. Notre
          article sur la 
          <Link href="/blog/note-de-dimensionnement-pompe-a-chaleur" className={linkCls}>
            note de dimensionnement d’une pompe à chaleur
          </Link> 
          explique ce que doit contenir cette étude.
        </p>

        {/* ---- SECTION 3 : CONSOMMATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Consommation et économies : la PAC air-air face aux convecteurs
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          C’est face au chauffage électrique direct que la PAC air-air se montre la plus
          rentable. Un convecteur transforme 1 kWh d’électricité en 1 kWh de chaleur. Une
          pompe à chaleur en produit trois à quatre fois plus en moyenne sur la saison. Le
          rapport entre la chaleur produite et l’électricité consommée sur un hiver complet
          s’appelle le SCOP.
        </p>

        <ArticleTable {...CONSO_TABLE} title="Coût annuel du chauffage d’une maison de 100 m²" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Sur cet exemple, l’économie atteint environ 1 600 € par an par rapport aux
          convecteurs. Un multisplit à 8 000 € se rembourse donc en cinq ans environ, sans
          aucune aide. Face à des radiateurs à inertie récents, le gain est un peu plus faible,
          mais le retour sur investissement reste inférieur à dix ans.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Deux nuances à garder en tête. D’abord, une PAC air-air chauffe par soufflage :
          certaines personnes trouvent l’air brassé moins agréable que la chaleur douce d’un
          radiateur. Ensuite, l’usage de la climatisation l’été ajoute une consommation qui
          n’existait pas avant. Elle reste modeste, de l’ordre de 200 à 400 kWh par an pour
          rafraîchir les chambres, mais elle grignote une partie des économies. Notre article
          sur la{' '}
          <Link href="/blog/consommation-pompe-a-chaleur-maison-100m2" className={linkCls}>
            consommation d’une pompe à chaleur pour 100 m²
          </Link>{' '}
          détaille ces ordres de grandeur.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le coût sur quinze ans
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour comparer deux solutions de chauffage, il faut additionner l’achat, la
          consommation et l’entretien sur toute la durée de vie. Sur quinze ans, notre
          multisplit à 8 000 € consomme environ 8 100 € d’électricité et demande sept à huit
          visites d’entretien, soit près de 1 500 €. Total : environ 17 600 €.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Les convecteurs, eux, ne coûtent presque rien en entretien, mais leur consommation
          atteint près de 32 000 € sur la même période, à prix de l’électricité constant. Même
          en ajoutant le remplacement d’un compresseur hors garantie, la pompe à chaleur
          air-air reste deux fois moins chère à l’usage, et elle apporte le confort de la
          climatisation l’été.
        </p>

        {/* ---- SECTION 4 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelles aides pour une PAC air-air en 2026 ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La réponse courte : presque aucune. La pompe à chaleur air-air est exclue de
          MaPrimeRénov’, et elle n’est pas concernée par le Coup de pouce chauffage, réservé
          aux PAC air-eau et eau-eau agréées qui remplacent une chaudière fossile. Elle est
          facturée avec une TVA à 10 %, contre 5,5 % pour une PAC air-eau.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Une prime CEE classique existe pour certains appareils performants, mais peu de
          fournisseurs la proposent et son montant dépasse rarement quelques centaines
          d’euros. Le comparatif complet des aides est dans notre article sur l’{' '}
          <Link href="/blog/aide-pompe-a-chaleur-2026" className={linkCls}>
            aide pompe à chaleur 2026
          </Link>
          .
        </p>

        <ArticleCallout type="tip" title="Air-air ou air-eau : comment trancher">
          <p>
            Si votre maison a déjà des radiateurs à eau ou un plancher chauffant alimentés
            par une chaudière, la PAC air-eau est presque toujours plus logique : elle reprend
            le réseau existant, produit l’eau chaude et reste bien aidée. La PAC air-air
            s’impose surtout dans les maisons tout électriques sans circuit d’eau, ou en
            complément pour climatiser quelques pièces.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : POSE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pose, bruit et règles à respecter
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La pose d’une PAC air-air impose de manipuler des fluides frigorigènes. Seule une
          entreprise titulaire d’une attestation de capacité peut le faire. C’est une
          obligation réglementaire, et c’est aussi la condition pour que la garantie du
          fabricant s’applique. Un appareil acheté en grande surface et posé soi-même perd
          généralement sa garantie.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          L’emplacement de l’unité extérieure demande de la réflexion. Le Code de la santé
          publique limite le bruit perçu chez le voisin à 5 dB(A) au-dessus du bruit ambiant
          le jour, et 3 dB(A) la nuit. En lotissement, cela exclut souvent la façade qui donne
          sur les chambres d’à côté. Nos conseils d’implantation sont détaillés dans notre
          article sur la{' '}
          <Link href="/blog/pompe-a-chaleur-et-bruit" className={linkCls}>
            pompe à chaleur et le bruit
          </Link>
          .
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Côté urbanisme, une unité visible depuis la rue modifie l’aspect de la façade. La
          plupart des communes demandent alors une déclaration préalable. En copropriété,
          l’accord de l’assemblée générale est indispensable pour une pose sur la façade ou
          un balcon. Pour un appartement, notre article sur la{' '}
          <Link href="/blog/pompe-a-chaleur-pour-appartement" className={linkCls}>
            pompe à chaleur en appartement
          </Link>{' '}
          détaille les démarches.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Un entretien obligatoire tous les deux ans
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Depuis 2020, les pompes à chaleur de 4 à 70 kW doivent être entretenues par un
          professionnel au moins tous les deux ans. Comptez 150 à 250 € la visite pour un
          multisplit. Entre deux visites, nettoyez vous-même les filtres des unités
          intérieures, tous les mois en période d’usage : un filtre encrassé fait chuter le
          rendement et dégrade la qualité de l’air. Un appareil bien entretenu dure 15 à
          20 ans.
        </p>

        <ArticleCallout type="warning" title="Les points à vérifier sur un devis air-air">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La puissance de chaque unité, justifiée par une étude pièce par pièce</li>
            <li>La longueur de liaisons incluse et le prix du mètre supplémentaire</li>
            <li>Le SCOP et le niveau sonore de l’unité extérieure</li>
            <li>L’attestation de capacité de l’entreprise pour les fluides</li>
            <li>La TVA à 10 % : un taux de 5,5 % sur de l’air-air est une erreur</li>
          </ul>
        </ArticleCallout>

        <ArticleCTA
          title="Un devis pour votre pompe à chaleur air-air ?"
          description="Nos techniciens RGE QualiPAC dimensionnent chaque unité pièce par pièce et vous indiquent si une PAC air-eau, mieux aidée, serait plus adaptée chez vous. Visite et devis gratuits sous 48h en Île-de-France."
        />

        <ArticleFaq title="Questions fréquentes sur le prix d’une pompe à chaleur air-air" items={FAQ_ITEMS} />

        <ArticleSources sources={SOURCES} />

        <ArticleLinkCards cards={[
          { href: '/services/pompe-a-chaleur', kicker: 'Notre service', title: 'Installation de pompe à chaleur', cta: 'Voir le service' },
          { href: '/blog/aide-pompe-a-chaleur-2026', kicker: 'Article associé', title: 'Aide pompe à chaleur 2026', cta: 'Lire l’article' },
          { href: '/blog/puissance-pompe-a-chaleur', kicker: 'Article associé', title: 'Quelle puissance de pompe à chaleur ?', cta: 'Lire l’article' },
          { href: '/blog/entretien-pompe-a-chaleur-air-eau', kicker: 'Article associé', title: 'Entretien d’une pompe à chaleur', cta: 'Lire l’article' },
        ]} />

        <PacCityLinks cities={[
          { name: 'Paris', slug: 'paris' },
          { name: 'Vincennes', slug: 'vincennes' },
          { name: 'Saint-Maur-des-Fossés', slug: 'saint-maur-des-fosses' },
          { name: 'Lésigny', slug: 'lesigny' },
          { name: 'Chelles', slug: 'chelles' },
          { name: 'Sartrouville', slug: 'sartrouville' },
          { name: 'Palaiseau', slug: 'palaiseau' },
          { name: 'Noisy-le-Grand', slug: 'noisy-le-grand' },
        ]} />

      </ArticleLayout>
    </>
  )
}
