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
  ARTICLE_META, NIVEAUX_TABLE, RADIATEUR_TABLE, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pompe-a-chaleur-haute-temperature'

const HERO_IMAGE = '/images/blog/pac-unite-exterieure-neige-hiver.jpg'
const HERO_ALT = "Unité extérieure noire de pompe à chaleur haute température au fluide R290, posée sur des plots devant une maison, sous la neige en plein hiver"

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
    images: [{ url: `https://www.greenter.fr${HERO_IMAGE}`, width: 1920, height: 1080, alt: HERO_ALT }],
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
  { name: 'Pompe à chaleur haute température', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function PompeAChaleurHauteTemperature() {
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
        wordCount={2500}
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
            « Avec mes radiateurs en fonte, une pompe à chaleur ne chauffera jamais assez. »
            C’est l’une des phrases que nous entendons le plus souvent lors des visites
            techniques, dans les maisons en meulière comme dans les pavillons des années 1960.
            Elle est parfois vraie. Elle est plus souvent fausse.
          </p>
          <p>
            La <strong>pompe à chaleur haute température</strong> a été conçue pour ces
            maisons-là : elle produit de l’eau à 65 °C ou plus, comme une chaudière, et permet
            de garder les radiateurs d’origine. Mais elle coûte plus cher et consomme davantage
            qu’une PAC classique. La choisir par précaution, sans vérifier qu’elle est
            nécessaire, revient à payer deux fois.
          </p>
          <p>
            Voici comment savoir si votre maison en a vraiment besoin, ce qu’elle coûte, ce
            qu’elle consomme, et quelles alternatives permettent parfois de s’en passer.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La différence entre PAC basse, moyenne et haute température</li>
            <li>Pourquoi la température de l’eau compte autant</li>
            <li>Les technologies qui permettent de monter à 65 ou 75 °C</li>
            <li>Le prix, la consommation et les aides en 2026</li>
            <li>Un test simple pour savoir si vous en avez besoin</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : DEFINITION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pompe à chaleur haute température : de quoi parle-t-on ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une pompe à chaleur air-eau capte les calories de l’air extérieur et les transmet
          à l’eau du circuit de chauffage. On la classe selon la température d’eau qu’elle
          peut fournir efficacement. Les modèles basse température sont faits pour les
          planchers chauffants, qui se contentent de 35 °C. Les modèles moyenne température
          alimentent la plupart des radiateurs en rénovation. Les modèles haute température
          prennent le relais quand il faut 60 °C ou davantage.
        </p>

        <ArticleTable {...NIVEAUX_TABLE} title="Basse, moyenne ou haute température : comparatif" />

        <p className="text-slate-700 leading-relaxed mb-6">
          La limite entre ces catégories est un peu floue, et les fabricants l’utilisent
          volontiers comme argument commercial. La plupart des PAC récentes atteignent
          60 °C en sortie, au prix d’un rendement dégradé. Ce qui distingue une vraie PAC
          haute température, c’est sa capacité à maintenir 65 °C et sa pleine puissance par
          −7 ou −10 °C dehors, sans faire appel à la résistance électrique d’appoint.
        </p>

        {/* ---- SECTION 2 : POURQUOI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi la température de l’eau change tout
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un radiateur ne fournit pas une puissance fixe. Il chauffe d’autant plus que l’eau
          qui le traverse est chaude. Les radiateurs installés avec une chaudière fioul ou gaz
          des années 1970 ont été dimensionnés pour une eau à 70 ou 80 °C. Si l’on y fait
          circuler de l’eau à 50 °C, leur puissance chute de moitié.
        </p>

        <ArticleTable {...RADIATEUR_TABLE} title="Puissance d’un radiateur selon la température de l’eau" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Ce tableau explique la crainte des propriétaires. Mais il ne raconte qu’une partie
          de l’histoire. D’abord, les radiateurs d’origine ont presque toujours été
          surdimensionnés, par prudence. Ensuite, la maison a souvent été améliorée depuis :
          combles isolés, fenêtres changées. Ses besoins ont baissé de 30 à 50 %, alors que
          les radiateurs, eux, sont restés les mêmes.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, la pompe à chaleur ne produit pas la même température tout l’hiver. Une
          régulation appelée loi d’eau ajuste la température de départ en fonction de la
          température extérieure. Par 10 °C dehors, de l’eau à 35 ou 40 °C suffit souvent.
          La température maximale n’est demandée que lors des quelques jours les plus froids
          de l’année. Le fonctionnement complet est décrit dans notre article sur la{' '}
          <Link href="/blog/pompe-a-chaleur-air-eau-fonctionnement" className={linkCls}>
            pompe à chaleur air-eau
          </Link>
          .
        </p>

        <ArticleStat stats={[
          { value: '≈ 50 %', label: 'puissance d’un radiateur à 50 °C par rapport à son régime nominal', color: 'amber' },
          { value: '30 à 50 %', label: 'baisse typique des besoins après isolation des combles et des fenêtres', color: 'green' },
          { value: '75 °C', label: 'température atteinte par les meilleures PAC au R290', color: 'blue' },
        ]} />

        {/* ---- SECTION 3 : TECHNOLOGIES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment une PAC atteint 65 à 75 °C
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pendant longtemps, produire de l’eau à 65 °C avec une pompe à chaleur imposait des
          montages complexes. Deux technologies ont simplifié les choses. La plus répandue
          aujourd’hui est le fluide R290, autrement dit du propane. Ses propriétés permettent
          d’atteindre 70 à 75 °C avec un seul compresseur, et son impact sur le climat est
          presque nul en cas de fuite. La plupart des fabricants européens l’ont adopté sur
          leurs gammes monobloc depuis 2023.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-air-eau-appartement-unite-murale.jpeg"
          alt="Pompe à chaleur air-eau monobloc grise à grille noire fixée sur un support mural contre une façade enduite, avec son bac de récupération des condensats en dessous"
          imagePosition="right"
        >
          <p>
            Les PAC monobloc au R290 contiennent tout le circuit frigorifique dans l’unité
            extérieure. Seule de l’eau entre dans la maison.
          </p>
          <p className="mt-3">
            Le propane étant inflammable, il ne doit jamais circuler à l’intérieur : c’est
            pourquoi ces modèles sont presque tous monobloc.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          La seconde approche consiste à associer deux circuits frigorifiques en cascade,
          chacun avec son compresseur. Le premier capte la chaleur de l’air, le second la
          porte à haute température. Ces machines, dites bi-étagées, montent jusqu’à 80 °C,
          mais elles sont plus chères et plus encombrantes. Quant aux PAC au CO2, qui
          atteignent 90 °C, elles sont surtout utilisées pour produire de l’eau chaude
          sanitaire.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Haute température et eau chaude sanitaire
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Une PAC haute température produit aussi l’eau chaude sanitaire avec un bon
          rendement. C’est un avantage réel : chauffer un ballon à 55 °C, la température qui
          limite le développement des légionelles, demande moins d’effort à une machine
          conçue pour monter à 70 °C qu’à un modèle standard, qui fait souvent appel à sa
          résistance électrique pour finir le travail. Dans une famille nombreuse, la
          différence se voit sur la facture.
        </p>

        {/* ---- SECTION 4 : PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix et consommation d’une pompe à chaleur haute température
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour une maison de 100 à 140 m², une PAC air-eau haute température coûte
          14 000 à 20 000 € TTC posée, avec le ballon d’eau chaude. C’est 2 000 à 4 000 € de
          plus qu’un modèle moyenne température, car il faut souvent une puissance supérieure
          pour compenser une maison moins isolée. Le détail des prix par puissance figure
          dans notre article sur le{' '}
          <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className={linkCls}>
            prix d’une pompe à chaleur en 2026
          </Link>
          .
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Côté consommation, la règle est simple : plus l’eau est chaude, plus le
          compresseur travaille. À 35 °C, une bonne PAC restitue 4 à 5 kWh de chaleur par kWh
          d’électricité. À 65 °C par temps froid, ce ratio tombe autour de 2 à 2,5. Sur une
          saison complète, une PAC haute température affiche un rendement moyen de 2,6 à 3,3.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Prenons une maison en meulière de 120 m² qui consommait 2 200 litres de fioul.
          Avec une PAC haute température et un rendement saisonnier de 2,8, la consommation
          électrique atteint environ 7 500 kWh, soit 1 460 € par an à 0,195 € le kWh. Le fioul
          coûtait plus de 2 500 €. L’économie dépasse 1 000 € par an, même dans le cas le
          moins favorable à la pompe à chaleur.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les aides en 2026
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Une PAC haute température est une PAC air-eau comme une autre aux yeux des aides.
          Elle ouvre droit à MaPrimeRénov’ (3 000 à 5 000 € selon les revenus), à la prime
          CEE bonifiée par le Coup de pouce si elle remplace une chaudière fioul ou gaz et
          figure sur la liste des modèles agréés, à la TVA à 5,5 % et à l’éco-PTZ. Le seuil
          d’efficacité saisonnière exigé est même un peu plus bas que pour une PAC basse
          température, pour tenir compte de son usage. Tous les détails sont dans notre
          article sur l’{' '}
          <Link href="/blog/aide-pompe-a-chaleur-2026" className={linkCls}>
            aide pompe à chaleur 2026
          </Link>
          .
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Haute température ou PAC hybride ?
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pendant des années, la PAC hybride a été présentée comme la solution des maisons
          anciennes : la pompe à chaleur couvre l’essentiel de l’hiver, et une chaudière gaz
          prend le relais les jours de grand froid. Le principe reste valable, mais le
          contexte a changé. L’hybride n’est plus bonifiée par le Coup de pouce chauffage
          depuis janvier 2026, elle impose de garder un abonnement et un entretien gaz, et
          elle suppose que la maison soit raccordée au réseau, ce qui exclut la plupart des
          maisons au fioul.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Les PAC au R290 capables de produire 70 °C sans appoint ont rendu l’hybride beaucoup
          moins nécessaire. Elle garde un intérêt dans une maison très énergivore, déjà au gaz,
          dont l’isolation est prévue à moyen terme. Nous comparons les deux approches dans
          notre article sur la 
          <Link href="/blog/pompe-a-chaleur-hybride" className={linkCls}>
            pompe à chaleur hybride
          </Link>
          .
        </p>

        {/* ---- SECTION 5 : TEST ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Avez-vous vraiment besoin d’une PAC haute température ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le meilleur moyen de le savoir ne coûte rien. Pendant une semaine froide, idéalement
          avec des températures proches de 0 °C, réglez la température de départ de votre
          chaudière sur 55 °C. Laissez les robinets thermostatiques ouverts et observez
          chaque pièce.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            <strong>Toutes les pièces restent à 19 ou 20 °C</strong> : une PAC moyenne
            température suffit. Elle sera moins chère et consommera moins.
          </li>
          <li>
            <strong>Une ou deux pièces refroidissent</strong> : remplacer leurs radiateurs par
            des modèles plus grands coûte 400 à 900 € par pièce, bien moins que le surcoût
            d’une PAC haute température.
          </li>
          <li>
            <strong>Toute la maison refroidit</strong> : la haute température est justifiée,
            ou l’isolation doit passer d’abord.
          </li>
        </ul>

        <ArticleCallout type="tip" title="Isoler d’abord, si c’est possible">
          <p>
            Isoler les combles coûte souvent moins de 30 € le m² et réduit les besoins de
            chauffage de 20 à 30 %. Fait avant la pose, ce chantier permet souvent de passer
            d’une PAC haute température à une PAC moyenne température, moins puissante, moins
            chère et plus économe. Voir notre article sur le{' '}
            <Link href="/blog/prix-isolation-combles-au-m2" className={linkCls}>
              prix de l’isolation des combles au m²
            </Link>
            .
          </p>
        </ArticleCallout>

        <p className="text-slate-700 leading-relaxed mb-4">
          Restent les cas où la PAC haute température est la bonne réponse : maison ancienne
          en pierre ou en meulière qu’on ne peut pas isoler par l’extérieur, radiateurs en
          fonte appréciés qu’on veut garder, façade classée qui interdit certains travaux. Dans
          ces maisons, souvent chauffées au fioul, elle permet de sortir des énergies fossiles
          sans tout refaire. Notre article sur le{' '}
          <Link href="/blog/remplacer-chaudiere-fioul-par-pompe-a-chaleur" className={linkCls}>
            remplacement d’une chaudière fioul par une pompe à chaleur
          </Link>{' '}
          détaille ce chantier.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Dans tous les cas, méfiez-vous d’un installateur qui propose une PAC haute
          température sans avoir relevé vos radiateurs pièce par pièce. Le choix doit découler
          d’un calcul, pas d’une habitude. Notre article sur la{' '}
          <Link href="/blog/note-de-dimensionnement-pompe-a-chaleur" className={linkCls}>
            note de dimensionnement d’une pompe à chaleur
          </Link>{' '}
          explique ce que doit contenir cette étude.
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les erreurs fréquentes avec une PAC haute température
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Nous intervenons régulièrement sur des installations récentes qui consomment plus
          que prévu. Dans la plupart des cas, le matériel n’est pas en cause. Ce sont les
          réglages ou le choix initial qui posent problème.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            <strong>Une température de départ fixe à 65 °C</strong> toute la saison, au lieu
            d’une loi d’eau qui descend à 35 ou 40 °C par temps doux. C’est l’erreur la plus
            coûteuse : elle peut augmenter la consommation de 30 %.
          </li>
          <li>
            <strong>Des robinets thermostatiques fermés</strong> dans la moitié des pièces,
            qui obligent la PAC à monter en température pour chauffer les autres.
          </li>
          <li>
            <strong>Une puissance calquée sur l’ancienne chaudière</strong>, souvent deux
            fois trop forte, qui fait fonctionner le compresseur par cycles courts.
          </li>
          <li>
            <strong>Un circuit non désemboué</strong> après des décennies de chaudière : les
            boues réduisent l’échange dans les radiateurs et forcent à chauffer plus fort.
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si votre facture vous semble anormale, notre article sur la 
          <Link href="/blog/surconsommation-pompe-a-chaleur" className={linkCls}>
            surconsommation d’une pompe à chaleur
          </Link> 
          détaille les vérifications à faire. Un réglage de loi d’eau bien fait est souvent
          le moyen le plus rapide de gagner plusieurs centaines d’euros par an.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Ce que doit contenir un devis sérieux
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Un devis de PAC haute température doit mentionner la référence exacte de l’unité
          extérieure et du module intérieur, la puissance à −7 °C pour une eau à 65 °C, et
          pas seulement la puissance nominale à +7 °C, le fluide utilisé, le SCOP selon la
          norme NF EN 14825 et l’ETAS. Il doit aussi préciser la température de départ
          retenue par grand froid, issue de l’étude des radiateurs, et le désembouage du
          circuit. Un devis qui ne fait apparaître qu’une puissance et un prix ne permet pas
          de comparer les offres.
        </p>

        <ArticleCTA
          title="Haute température ou pas ? Nous vérifions chez vous"
          description="Nos techniciens RGE QualiPAC relèvent chaque radiateur, calculent la température d’eau nécessaire et vous proposent la PAC juste suffisante, ni plus, ni moins. Visite et devis gratuits sous 48h en Île-de-France."
        />

        <ArticleFaq title="Questions fréquentes sur la pompe à chaleur haute température" items={FAQ_ITEMS} />

        <ArticleSources sources={SOURCES} />

        <ArticleLinkCards cards={[
          { href: '/services/pompe-a-chaleur', kicker: 'Notre service', title: 'Installation de pompe à chaleur', cta: 'Voir le service' },
          { href: '/blog/remplacer-chaudiere-fioul-par-pompe-a-chaleur', kicker: 'Article associé', title: 'Remplacer une chaudière fioul par une PAC', cta: 'Lire l’article' },
          { href: '/blog/puissance-pompe-a-chaleur', kicker: 'Article associé', title: 'Quelle puissance de pompe à chaleur ?', cta: 'Lire l’article' },
          { href: '/blog/surconsommation-pompe-a-chaleur', kicker: 'Article associé', title: 'Surconsommation d’une pompe à chaleur', cta: 'Lire l’article' },
        ]} />

        <PacCityLinks cities={[
          { name: 'Gretz-Armainvilliers', slug: 'gretz-armainvilliers' },
          { name: 'Tournan-en-Brie', slug: 'tournan-en-brie' },
          { name: 'Saint-Maur-des-Fossés', slug: 'saint-maur-des-fosses' },
          { name: 'Vincennes', slug: 'vincennes' },
          { name: 'Saint-Germain-en-Laye', slug: 'saint-germain-en-laye' },
          { name: 'Versailles', slug: 'versailles' },
          { name: 'Melun', slug: 'melun' },
          { name: 'Corbeil-Essonnes', slug: 'corbeil-essonnes' },
        ]} />

      </ArticleLayout>
    </>
  )
}
