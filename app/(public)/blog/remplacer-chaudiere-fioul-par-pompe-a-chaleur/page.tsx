import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSteps, ArticleSources, ArticleImageSection,
  ArticleFaq, ArticleLinkCards, PacCityLinks,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, DEVIS_TABLE, AIDES_TABLE, ECONOMIES_TABLE, ETAPES_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/remplacer-chaudiere-fioul-par-pompe-a-chaleur'

const HERO_IMAGE = '/images/blog/pac-hybride-biofioul.png'
const HERO_ALT = "Unité extérieure grise de pompe à chaleur posée sur une dalle devant une maison, à côté de la porte ouverte d'un local technique abritant un générateur de chauffage au sol avec son conduit, illustrant le remplacement d'une chaudière fioul par une pompe à chaleur"

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
    images: [{ url: `https://www.greenter.fr${HERO_IMAGE}`, width: 1024, height: 1024, alt: HERO_ALT }],
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
  { name: 'Remplacer une chaudière fioul par une pompe à chaleur', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function RemplacerChaudiereFioulParPompeAChaleur() {
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
        wordCount={2800}
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
            Une livraison de fioul à l’automne, une facture qui varie de plusieurs centaines
            d’euros d’une année sur l’autre, une odeur dans la chaufferie et une chaudière
            qui approche les trente ans. C’est encore le quotidien de plusieurs millions de foyers
            français, et d’une part importante des maisons rurales de Seine-et-Marne.
          </p>
          <p>
            Beaucoup ont entendu qu’il faudrait bientôt se débarrasser de leur chaudière. Ce
            n’est pas tout à fait exact. Mais le jour où elle lâche, il n’est plus possible de
            la remplacer par une autre chaudière fioul. <strong>Remplacer une chaudière fioul
            par une pompe à chaleur</strong> devient alors la solution la plus courante, et
            aussi l’une des mieux aidées en 2026.
          </p>
          <p>
            Nous expliquons ici ce que dit vraiment la loi, comment choisir la pompe à
            chaleur selon vos radiateurs, ce que coûte le chantier complet avec la cuve, les
            aides disponibles et les économies à attendre.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Ce que la réglementation impose, et ce qu’elle n’impose pas</li>
            <li>La pompe à chaleur adaptée à une maison chauffée au fioul</li>
            <li>Le prix complet du remplacement, cuve comprise</li>
            <li>Les aides 2026 et le reste à charge</li>
            <li>Les économies réelles et le déroulé du chantier</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : LOI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Chaudière fioul : ce que dit vraiment la loi
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Depuis le 1er juillet 2022, un décret interdit d’installer une chaudière neuve
          fonctionnant au fioul dans un logement, que ce soit en construction ou en
          remplacement. Seules les chaudières capables de fonctionner avec un combustible
          très bas carbone, comme le biofioul, restent autorisées. Des dérogations existent
          lorsqu’aucune autre solution n’est techniquement possible, mais elles sont rares en
          maison individuelle.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          En revanche, aucun texte ne vous oblige à retirer une chaudière fioul qui
          fonctionne. Vous pouvez la garder, l’entretenir chaque année comme l’exige la loi,
          et la faire réparer. Les messages qui annoncent une interdiction du fioul « d’ici
          2028 » ou une obligation de remplacement sont faux, et servent souvent d’argument à
          des démarcheurs.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le vrai risque est ailleurs : une panne en plein hiver sur une chaudière de
          25 ans, dont les pièces ne se trouvent plus. Il faut alors tout décider en
          quelques jours, sans pouvoir comparer les devis ni monter correctement les dossiers
          d’aides. Anticiper le remplacement d’un ou deux ans permet de le faire au bon moment,
          souvent au printemps, quand les installateurs sont plus disponibles.
        </p>

        <ArticleStat stats={[
          { value: '1er juil. 2022', label: 'fin de l’installation des chaudières fioul neuves', color: 'red' },
          { value: '2 ans', label: 'ancienneté minimale du logement pour MaPrimeRénov’ en cas de sortie du fioul', color: 'blue' },
          { value: '≈ 1 000 €', label: 'économie annuelle typique pour une maison de 120 m²', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : QUELLE PAC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle pompe à chaleur pour remplacer une chaudière fioul ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans une maison chauffée au fioul, la solution naturelle est la pompe à chaleur
          air-eau. Elle se raccorde au réseau de radiateurs existant et produit aussi l’eau
          chaude sanitaire. Le module intérieur prend généralement la place de l’ancienne
          chaudière, dans la chaufferie ou le sous-sol. La géothermie est plus performante,
          mais son forage la réserve aux grands terrains et aux budgets plus élevés.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La vraie question est la température d’eau. Une chaudière fioul envoie souvent de
          l’eau à 70 ou 80 °C dans les radiateurs. Une pompe à chaleur standard travaille
          idéalement entre 35 et 55 °C. Tout dépend donc de la taille des radiateurs et du
          niveau d’isolation de la maison.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-geothermique-unite-interieure-local.jpg"
          alt="Chaufferie de maison avec module intérieur blanc de pompe à chaleur, ballon d'eau chaude, vase d'expansion rouge et tuyauteries calorifugées raccordées au circuit de radiateurs"
          imagePosition="right"
        >
          <p>
            Le module intérieur et le ballon s’installent dans l’ancienne chaufferie. Les
            tuyauteries du circuit de chauffage sont conservées.
          </p>
          <p className="mt-3">
            Un filtre magnétique protège la nouvelle installation des boues accumulées
            pendant des années de fonctionnement au fioul.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un test simple, à faire pendant l’hiver qui précède les travaux, aide à trancher.
          Baissez la température de départ de la chaudière à 55 °C pendant une semaine
          froide. Si la maison reste confortable, une PAC moyenne température suffira. Si
          certaines pièces refroidissent, il faudra soit remplacer un ou deux radiateurs
          trop petits, soit choisir une{' '}
          <Link href="/blog/pompe-a-chaleur-haute-temperature" className={linkCls}>
            pompe à chaleur haute température
          </Link>
          , capable de produire de l’eau à 65 °C ou plus.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le dimensionnement se fait à partir de vos consommations réelles de fioul et
          d’une étude pièce par pièce, pas à partir de la puissance de l’ancienne chaudière,
          presque toujours surdimensionnée. Une PAC trop puissante fonctionne par cycles courts,
          s’use plus vite et consomme davantage. Nous détaillons la méthode dans notre article
          sur la{' '}
          <Link href="/blog/puissance-pompe-a-chaleur" className={linkCls}>
            puissance d’une pompe à chaleur
          </Link>
          .
        </p>

        <ArticleCallout type="info" title="Et la PAC hybride ?">
          <p>
            Une pompe à chaleur hybride associe une PAC et une chaudière d’appoint. Avec le
            fioul, l’appoint ne peut plus être une chaudière fioul neuve. Les modèles
            hybrides gaz ne sont possibles que si la maison est raccordée au gaz, ce qui est
            rarement le cas des maisons au fioul. Depuis janvier 2026, l’hybride n’est plus
            bonifiée par le Coup de pouce. Pour sortir du fioul, la PAC air-eau seule est
            presque toujours la meilleure option.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix du remplacement d’une chaudière fioul par une PAC
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le devis d’une sortie du fioul comporte plus de lignes qu’un simple remplacement de
          chaudière gaz. Il faut prévoir le sort de la cuve, souvent le nettoyage du circuit,
          et parfois une remise à niveau de l’installation électrique.
        </p>

        <ArticleTable {...DEVIS_TABLE} title="Postes d’un devis de remplacement fioul vers pompe à chaleur" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Au total, un chantier complet se situe le plus souvent entre 13 000 et 22 000 € TTC
          avant aides, pour une maison de 100 à 140 m². L’écart tient surtout à la
          température de fonctionnement nécessaire et à la cuve. Une cuve aérienne de
          1 500 litres au sous-sol se neutralise facilement. Une cuve enterrée de
          3 000 litres sous le jardin coûte beaucoup plus cher à retirer.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Neutraliser ou enlever la cuve à fioul
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Une cuve qui ne sert plus doit être vidée, dégazée et nettoyée par une entreprise
          spécialisée. Il est ensuite possible de la laisser en place, neutralisée, ou de la
          retirer. La neutralisation est moins chère, mais la cuve reste un volume perdu et
          peut poser question lors d’une vente. Dans les deux cas, une attestation est
          remise : conservez-la avec les documents de la maison. Le fioul restant peut
          souvent être pompé par l’entreprise, et sa valeur déduite de la facture.
        </p>

        {/* ---- SECTION 4 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les aides pour passer du fioul à la pompe à chaleur en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La sortie du fioul est l’un des cas les mieux aidés. MaPrimeRénov’ finance à la fois
          la pompe à chaleur air-eau et la dépose de la cuve, deux gestes qui restent
          éligibles malgré la réforme du 1er septembre 2026. La condition d’ancienneté du
          logement est assouplie : 2 ans au lieu de 15. Et la prime CEE bénéficie du Coup de
          pouce chauffage, à condition que le modèle de PAC figure sur la liste des
          équipements agréés publiée par l’ADEME.
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides pour remplacer une chaudière fioul par une PAC air-eau" />

        <p className="text-slate-700 leading-relaxed mb-6">
          À ces montants s’ajoutent la TVA à 5,5 % sur la pompe à chaleur et l’éco-prêt à
          taux zéro, jusqu’à 15 000 € pour ce seul geste. Pour un ménage modeste et un devis
          de 17 000 €, le reste à charge descend ainsi autour de 8 500 €, finançable sans
          intérêts. Toutes les règles, plafonds de revenus compris, sont détaillées dans notre
          article sur l’{' '}
          <Link href="/blog/aide-pompe-a-chaleur-2026" className={linkCls}>
            aide pompe à chaleur 2026
          </Link>
          .
        </p>

        <ArticleCallout type="warning" title="L’ordre des démarches compte">
          <p>
            Acceptez l’offre de prime CEE avant de signer le devis, et déposez la demande
            MaPrimeRénov’ avant le début des travaux. Une panne en plein hiver pousse souvent
            à tout signer dans l’urgence : c’est précisément ce qui fait perdre les aides.
            Un chauffage d’appoint électrique pendant quelques jours coûte bien moins cher que
            plusieurs milliers d’euros de primes refusées.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : ECONOMIES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Combien économise-t-on en passant du fioul à la PAC ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un litre de fioul contient environ 10 kWh d’énergie. Une chaudière à condensation
          récente en restitue 95 %, une chaudière ancienne plutôt 80 à 85 %. Une pompe à
          chaleur air-eau bien dimensionnée produit, sur une saison complète, environ 3 kWh de
          chaleur pour 1 kWh d’électricité dans une maison avec radiateurs.
        </p>

        <ArticleTable {...ECONOMIES_TABLE} title="Coût annuel du chauffage : fioul ou pompe à chaleur" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Sur cet exemple, l’économie dépasse 1 000 € par an. Elle est plus forte encore si
          l’ancienne chaudière avait un mauvais rendement, ce qui est fréquent au-delà de
          vingt ans. Avec un reste à charge de 8 000 à 9 000 €, le remboursement intervient en
          huit à neuf ans, pour un équipement qui dure 15 à 20 ans.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          L’autre gain est moins visible : la fin des livraisons, de la gestion du niveau de
          cuve et des variations de prix brutales. Le prix du fioul domestique suit celui du
          pétrole et peut augmenter de 30 à 50 % en quelques mois, comme en 2022. L’électricité
          connaît aussi des hausses, mais plus encadrées. Pour aller plus loin sur la
          consommation, consultez notre article sur le{' '}
          <Link href="/blog/rendement-pompe-a-chaleur" className={linkCls}>
            rendement d’une pompe à chaleur
          </Link>
          .
        </p>

        {/* ---- SECTION 6 : ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les étapes du chantier
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Hors traitement de la cuve, le remplacement d’une chaudière fioul par une pompe à
          chaleur prend deux à trois jours. La maison n’est privée de chauffage que pendant
          une à deux journées, ce qui permet d’intervenir même en hiver.
        </p>

        <ArticleSteps steps={ETAPES_STEPS} />

        <ArticleCTA
          title="Vous voulez sortir du fioul ?"
          description="Nos techniciens RGE QualiPAC étudient vos radiateurs et vos consommations, proposent une PAC agréée adaptée et s’occupent de la cuve et des dossiers d’aides. Visite et devis gratuits sous 48h en Île-de-France."
        />

        <ArticleFaq title="Questions fréquentes sur le remplacement d’une chaudière fioul" items={FAQ_ITEMS} />

        <ArticleSources sources={SOURCES} />

        <ArticleLinkCards cards={[
          { href: '/services/pompe-a-chaleur', kicker: 'Notre service', title: 'Installation de pompe à chaleur', cta: 'Voir le service' },
          { href: '/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026', kicker: 'Article associé', title: 'Remplacer une chaudière gaz par une PAC', cta: 'Lire l’article' },
          { href: '/blog/pompe-a-chaleur-haute-temperature', kicker: 'Article associé', title: 'Pompe à chaleur haute température', cta: 'Lire l’article' },
          { href: '/blog/aide-pompe-a-chaleur-2026', kicker: 'Article associé', title: 'Aide pompe à chaleur 2026', cta: 'Lire l’article' },
        ]} />

        <PacCityLinks cities={[
          { name: 'Chevry-Cossigny', slug: 'chevry-cossigny' },
          { name: 'Gretz-Armainvilliers', slug: 'gretz-armainvilliers' },
          { name: 'Tournan-en-Brie', slug: 'tournan-en-brie' },
          { name: 'Lésigny', slug: 'lesigny' },
          { name: 'Meaux', slug: 'meaux' },
          { name: 'Mantes-la-Jolie', slug: 'mantes-la-jolie' },
          { name: 'Conflans-Sainte-Honorine', slug: 'conflans-sainte-honorine' },
          { name: 'Dammarie-les-Lys', slug: 'dammarie-les-lys' },
        ]} />

      </ArticleLayout>
    </>
  )
}
