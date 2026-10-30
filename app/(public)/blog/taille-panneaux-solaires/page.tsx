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
  ARTICLE_META, FORMATS_TABLE, SURFACE_TABLE, DIMENSIONNEMENT_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/taille-panneaux-solaires'

const HERO_IMAGE = '/images/blog/taille-panneaux-solaires-deux-pans-toiture-tuiles.jpg'
const HERO_ALT = "Maison à deux pans de toiture en tuiles orangées couverts de panneaux solaires bleus, l'un de 14 modules et l'autre de 8 modules, illustrant la taille des panneaux solaires sur un toit"

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
      width: 1024,
      height: 686,
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
  { name: 'Taille des panneaux solaires', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function TaillePanneauxSolaires() {
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
            Avant même de parler de rentabilité, une question pratique se pose à tous ceux qui
            envisagent le solaire : est-ce que ça rentre sur mon toit ? Combien de panneaux
            peut-on y loger, combien pèsent-ils, et quelle puissance cela représente-t-il ?
          </p>
          <p>
            La <strong>taille des panneaux solaires</strong> a beaucoup changé en quelques
            années. Les modules de 60 cellules d&apos;environ 1,65 m, longtemps la norme, ont
            laissé la place à des panneaux un peu plus grands et nettement plus puissants. Dans
            le même temps, des formats de plus de 2,3 m sont apparus, pensés pour les centrales
            au sol et peu adaptés à une maison.
          </p>
          <p>
            Nous détaillons ici les dimensions et le poids des formats actuels, la surface de
            toit nécessaire pour 3, 6 ou 9 kWc, la méthode pour calculer le nombre de panneaux
            sur votre propre toiture, et la bonne taille d&apos;installation selon votre
            consommation.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Les dimensions et le poids d&apos;un panneau solaire standard en 2026</li>
            <li>Les différents formats et ceux qui conviennent à une maison</li>
            <li>La surface de toit à prévoir pour 3, 4,5, 6 et 9 kWc</li>
            <li>Le calcul du nombre de panneaux sur votre toiture, en 5 étapes</li>
            <li>La bonne taille d&apos;installation selon votre consommation</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : DIMENSIONS STANDARD ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Taille des panneaux solaires : les dimensions d&apos;un panneau standard
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La très grande majorité des panneaux posés aujourd&apos;hui sur les maisons
          françaises partagent un même gabarit. Ils comptent 108 demi-cellules de silicium
          monocristallin de 182 mm, découpées en deux pour limiter les pertes électriques, et
          mesurent environ 1,72 à 1,76 m de long sur 1,13 m de large.
        </p>

        <ArticleStat stats={[
          { value: '≈ 1,72 × 1,13 m', label: 'dimensions d\'un panneau résidentiel standard en 2026, pour 30 à 35 mm d\'épaisseur', color: 'blue' },
          { value: '20 à 23 kg', label: 'poids d\'un panneau de 108 demi-cellules, cadre aluminium compris', color: 'amber' },
          { value: '410 à 460 Wc', label: 'puissance crête d\'un panneau de ce format, selon la technologie', color: 'green' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-4">
          Ces trois valeurs suffisent à faire la plupart des calculs. Un panneau standard
          occupe donc environ 2 m² de toiture et fournit un peu plus de 400 Wc. Autrement dit,
          il faut compter près de 5 m² de panneaux par kWc installé, une règle simple à retenir
          avant de mesurer son toit.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La comparaison avec les panneaux d&apos;il y a dix ans montre le chemin parcouru. Un
          module de 60 cellules de 2015 occupait 1,6 m² pour 260 à 280 Wc. Le panneau actuel
          ne prend que 20 % de place en plus, mais fournit plus de 50 % de puissance. Le
          rendement des cellules est passé d&apos;environ 16 % à 21 ou 23 %, grâce aux
          technologies N-type, TOPCon et hétérojonction.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les différents formats de panneaux photovoltaïques
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le format standard n&apos;est pas le seul sur le marché. Le tableau ci-dessous
          compare les quatre gabarits que vous pouvez croiser dans les devis ou les catalogues
          en ligne.
        </p>

        <ArticleTable {...FORMATS_TABLE} title="Taille, puissance et poids des principaux formats de panneaux solaires" />

        <p className="text-slate-700 leading-relaxed mb-6">
          Les deux dernières lignes concernent surtout les bâtiments professionnels et les
          centrales au sol. Sur une maison, un panneau de 2,3 m et 30 kg est difficile à monter
          sur le toit, à manipuler en sécurité sur une pente et à loger entre le faîtage et la
          gouttière. Sa largeur ou sa puissance peuvent aussi dépasser ce que les crochets et
          les micro-onduleurs courants acceptent. Si un devis résidentiel propose ce type de
          module, demandez pourquoi.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Taille ou rendement : ce qui compte vraiment
        </h3>

        <ArticleImageSection
          image="/images/blog/taille-panneaux-solaires-deux-modules-tuiles-canal.jpg"
          alt="Deux panneaux solaires de taille standard posés côte à côte en portrait sur une toiture en tuiles canal couverte de lichen, sous un ciel gris"
          imagePosition="right"
        >
          <p>
            Deux panneaux de format standard couvrent environ 4 m² de toiture et
            représentent 850 à 900 Wc, soit une petite installation d&apos;appoint.
          </p>
          <p className="mt-3">
            Il en faut sept pour atteindre 3 kWc, la puissance la plus courante sur une
            maison individuelle.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un panneau plus grand a une puissance plus élevée, mais il ne produit pas plus par
          m² de toit. La production par m² dépend du <strong>rendement</strong> des cellules,
          c&apos;est-à-dire de la part du rayonnement solaire convertie en électricité. Deux
          panneaux de même rendement, l&apos;un de 1,7 m et l&apos;autre de 2,3 m, produiront
          la même quantité d&apos;électricité pour une même surface de toiture.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour un particulier, c&apos;est donc la puissance par m², autour de 210 à 230 Wc en
          2026, qui permet de comparer les offres quand la surface est limitée. Sur un petit
          toit, un panneau à 22,5 % de rendement loge 10 % de puissance en plus qu&apos;un
          panneau à 20,5 %, à surface égale.
        </p>

        {/* ---- SECTION 2 : SURFACE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle surface de toit pour 3, 6 ou 9 kWc ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La puissance d&apos;une installation s&apos;exprime en kilowatts-crête (kWc), la
          puissance fournie dans des conditions de test normalisées. En France, la grande
          majorité des maisons s&apos;équipent entre 3 et 9 kWc, le seuil de 9 kWc
          correspondant au plafond de la TVA à 5,5 %.
        </p>

        <ArticleTable {...SURFACE_TABLE} title="Taille des panneaux solaires et surface de toit selon la puissance" />

        <p className="text-slate-700 leading-relaxed mb-4">
          La colonne qui compte le plus est celle de la surface de toit conseillée. Le champ de
          panneaux ne peut pas occuper tout le pan : il faut laisser une bande libre le long
          des rives, du faîtage et de l&apos;égout, à la fois pour la tenue au vent et pour
          l&apos;accès lors des interventions. Les zones les plus exposées au vent, en bord de
          toiture, subissent des efforts d&apos;arrachement nettement plus forts que le centre
          du pan.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La forme du pan compte autant que sa surface. Un pan de 8 m de long sur 5 m de
          haut, soit 40 m², accueille 12 panneaux en portrait une fois les marges déduites,
          un peu plus de 5 kWc, car les modules ne remplissent jamais parfaitement un
          rectangle. Si votre toit compte une
          fenêtre de toit, une cheminée ou une antenne, la surface utile baisse vite. Notre{' '}
          <Link href="/simulateur-solaire" className={linkCls}>simulateur solaire</Link>{' '}
          donne une première estimation de la puissance installable et de la production.
        </p>

        <ArticleCallout type="tip" title="Portrait ou paysage ?">
          <p>
            La pose en portrait, le grand côté dans le sens de la pente, est la plus courante
            et la plus économique en rails. Mais sur un pan peu haut, la pose en paysage permet
            parfois de loger davantage de modules. Sur un pan de 8 m de long et 3,45 m de hauteur
            utile, une seule rangée de 6 panneaux tient en portrait (2 × 1,76 m dépasse la
            hauteur), contre trois rangées de 4 en paysage (3 × 1,15 m), soit 12 panneaux sur la
            même toiture.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : CALCUL ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Calculer le nombre de panneaux sur votre toit en 5 étapes
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Vous pouvez faire une première estimation vous-même, avec un mètre, une vue
          aérienne de votre maison et vos factures d&apos;électricité. L&apos;installateur
          affinera ensuite avec un calepinage précis, le plan de pose panneau par panneau.
        </p>

        <ArticleSteps steps={DIMENSIONNEMENT_STEPS} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Prenons un exemple. Un pan sud de 9 m de long sur 4,5 m de haut, avec une fenêtre de
          toit. Après les marges, il reste environ 8 m de longueur utile et 3,8 m de hauteur.
          En portrait, on loge 6 panneaux par rangée sur 2 rangées, soit 12 panneaux, moins
          un pour la fenêtre de toit : 11 panneaux, environ 4,7 kWc. En paysage, on passe à
          4 panneaux sur 3 rangées, moins un : 11 panneaux également. Ici, les deux poses se
          valent et le choix se fera sur l&apos;esthétique et le coût des rails.
        </p>

        {/* ---- SECTION 4 : POIDS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Poids des panneaux solaires : la charpente peut-elle suivre ?
        </h2>

        <ArticleImageSection
          image="/images/blog/taille-panneaux-solaires-toiture-complete-maison.jpg"
          alt="Maison individuelle dont tout le pan de toit en tuiles rouges est couvert de panneaux solaires bleus, au-dessus d'une haie, sous un ciel bleu"
          imagePosition="left"
        >
          <p>
            Une installation de 9 kWc comme celle-ci, d&apos;une vingtaine de panneaux,
            représente environ 550 à 650 kg répartis sur 45 m² de toiture.
          </p>
          <p className="mt-3">
            Rapporté au m², c&apos;est l&apos;équivalent d&apos;une couche de neige de 10 à
            15 cm.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le poids est souvent la première inquiétude des propriétaires, et elle est
          légitime. Un panneau standard pèse 20 à 23 kg. Avec les rails en aluminium et les
          crochets, la charge totale se situe entre 12 et 15 kg par m², répartie sur les
          chevrons par l&apos;intermédiaire des crochets.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour une charpente traditionnelle en bon état, cette charge est faible. Les toitures
          sont calculées pour supporter le poids de la couverture, soit 40 à 70 kg par m²
          pour des tuiles en terre cuite, plus les charges de neige et de vent fixées par les
          Eurocodes. Les panneaux ajoutent l&apos;équivalent de quelques centimètres de neige.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La vigilance s&apos;impose en revanche pour les charpentes industrialisées à
          fermettes, très optimisées, les charpentes anciennes qui ont été modifiées lors
          d&apos;un aménagement des combles, ou les bois attaqués par les insectes ou
          l&apos;humidité. Dans ces cas, un contrôle par un charpentier ou un bureau
          d&apos;études s&apos;impose avant la pose. Si vous aménagez vos combles en même
          temps, notre article sur l&apos;
          <Link href="/blog/isolation-rampants-de-toiture" className={linkCls}>
            isolation des rampants de toiture
          </Link>{' '}
          vous aide à organiser les deux chantiers.
        </p>

        {/* ---- SECTION 5 : TAILLE DE L'INSTALLATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle taille d&apos;installation solaire pour votre maison ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Savoir combien de panneaux tiennent sur le toit ne dit pas combien il faut en poser.
          Depuis la réforme de juin 2026, le surplus injecté sur le réseau n&apos;est plus
          racheté qu&apos;environ 1,1 centime le kWh, contre près de 20 centimes pour un kWh
          acheté. Une installation surdimensionnée revend une grande partie de sa production
          pour presque rien.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La bonne taille est donc celle qui couvre au mieux votre consommation de journée.
          Quelques repères pour une maison d&apos;Île-de-France :
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            <strong>3 kWc, 7 panneaux</strong> : foyer de 2 à 4 personnes, chauffage au gaz ou
            au bois, consommation de 3 000 à 5 000 kWh par an, avec un ballon d&apos;eau chaude
            électrique à piloter en journée.
          </li>
          <li>
            <strong>4,5 kWc, 10 à 11 panneaux</strong> : même foyer avec télétravail, piscine
            ou climatisation, ou consommation proche de 6 000 kWh.
          </li>
          <li>
            <strong>6 kWc, 14 panneaux</strong> : maison équipée d&apos;une{' '}
            <Link href="/services/pompe-a-chaleur" className={linkCls}>pompe à chaleur</Link>{' '}
            ou d&apos;une voiture électrique, consommation de 7 000 à 10 000 kWh.
          </li>
          <li>
            <strong>9 kWc, 21 panneaux</strong> : grande maison très électrifiée, avec PAC,
            véhicule électrique et souvent une batterie pour stocker la production de midi.
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-6">
          Dans le doute, mieux vaut une installation un peu plus petite et bien consommée,
          que l&apos;on pourra compléter plus tard si les besoins augmentent. Nos kits{' '}
          <Link href="/produits/kit-autoconsommation-3kwc" className={linkCls}>3 kWc</Link> et{' '}
          <Link href="/produits/kit-autoconsommation-6kwc" className={linkCls}>6 kWc</Link>{' '}
          correspondent aux deux tailles les plus demandées. Pour la rentabilité détaillée de
          chaque profil, consultez notre article sur les{' '}
          <Link href="/blog/avantages-panneaux-solaires" className={linkCls}>
            avantages des panneaux solaires
          </Link>.
        </p>

        <ArticleCallout type="warning" title="Remplir tout le toit n'est plus la règle">
          <p>
            Tant que le surplus était bien rémunéré, il était logique de couvrir toute la
            toiture. Ce n&apos;est plus le cas. Méfiez-vous d&apos;un devis qui propose 9 kWc
            à un foyer qui consomme 4 000 kWh par an : plus de la moitié de la production
            partirait sur le réseau, et le retour sur investissement s&apos;allongerait de
            plusieurs années.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 6 : AUTRES SUPPORTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Taille des panneaux solaires pour un balcon, un jardin ou un carport
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Hors toiture, la question de la taille se pose différemment. Les kits prêts à
          brancher, vendus pour un balcon ou un jardin, utilisent souvent des panneaux
          standard de 1,72 × 1,13 m. C&apos;est grand pour un garde-corps, et une vingtaine de
          kilos doit être fixée solidement pour résister aux rafales. Des panneaux plus
          compacts, de 100 à 200 Wc, rigides ou souples, s&apos;intègrent mieux à un petit
          balcon, au prix d&apos;une production bien plus modeste.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Au sol ou sur une structure dédiée, la contrainte de surface disparaît presque. Un{' '}
          <Link href="/produits/carport-solaire" className={linkCls}>carport solaire</Link>{' '}
          pour une voiture accueille 6 à 8 panneaux standard, soit 2,5 à 3,5 kWc, avec
          l&apos;avantage de pouvoir choisir librement l&apos;orientation et l&apos;inclinaison.
          Sur ce point, notre article sur l&apos;
          <Link href="/blog/orientation-panneaux-solaires" className={linkCls}>
            orientation des panneaux solaires
          </Link>{' '}
          détaille la production selon l&apos;exposition.
        </p>

        {/* ---- SECTION 7 : POSE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Dimensions et pose : ce qu&apos;il faut vérifier sur le devis
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un devis sérieux ne se contente pas d&apos;annoncer une puissance en kWc. Il précise
          la marque et la référence des panneaux, leur puissance unitaire, leurs dimensions et
          leur nombre. Il joint idéalement un plan de calepinage montrant leur position sur le
          toit, les marges respectées et les obstacles contournés.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Vérifiez aussi que le système de fixation est compatible avec les dimensions des
          modules et avec votre couverture. Sur une toiture en tuiles, les crochets doivent
          être adaptés au modèle de tuile et fixés dans les chevrons, comme nous
          l&apos;expliquons dans notre article sur la{' '}
          <Link href="/blog/fixation-panneaux-solaires-sur-tuiles" className={linkCls}>
            fixation des panneaux solaires sur tuiles
          </Link>
          . Enfin, chaque fabricant de panneaux définit dans sa notice les zones de serrage
          des brides et l&apos;écartement maximal entre les rails : c&apos;est à
          l&apos;installateur de les respecter, faute de quoi la garantie peut tomber.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Combien de panneaux sur votre toit ?"
          description="Nos installateurs RGE QualiPV mesurent votre toiture, réalisent le calepinage et dimensionnent l'installation selon votre consommation réelle, pour éviter de revendre votre production à perte. Étude et devis gratuits sous 48h en Île-de-France."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur la taille des panneaux solaires
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
            { href: '/blog/fixation-panneaux-solaires-sur-tuiles', kicker: 'Article associé', title: 'Fixation des panneaux solaires sur tuiles', cta: 'Lire l\'article' },
            { href: '/blog/orientation-panneaux-solaires', kicker: 'Article associé', title: 'Orientation des panneaux solaires', cta: 'Lire l\'article' },
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
