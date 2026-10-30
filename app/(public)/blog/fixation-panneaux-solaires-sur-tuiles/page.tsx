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
  ARTICLE_META, SYSTEMES_TABLE, TUILES_TABLE, POSE_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/fixation-panneaux-solaires-sur-tuiles'

const HERO_IMAGE = '/images/blog/fixation-panneaux-solaires-sur-tuiles-rails-crochets.jpg'
const HERO_ALT = "Deux panneaux solaires noirs fixés en surimposition sur une toiture en tuiles mécaniques rouges, avec les rails en aluminium et les crochets visibles sur le côté"

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
      height: 1200,
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
  { name: 'Fixation des panneaux solaires sur tuiles', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function FixationPanneauxSolairesSurTuiles() {
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
            Vingt kilos par panneau, des rafales qui peuvent dépasser 100 km/h, de la neige,
            et trente ans sans bouger : ce que l&apos;on demande à la fixation d&apos;un panneau
            solaire n&apos;est pas anodin. Sur un toit en tuiles, s&apos;y ajoute une exigence
            de plus, ne jamais laisser passer l&apos;eau.
          </p>
          <p>
            La <strong>fixation des panneaux solaires sur tuiles</strong> est pourtant la
            partie d&apos;un projet dont on parle le moins. Les devis détaillent la marque des
            panneaux et de l&apos;onduleur, beaucoup plus rarement les crochets. C&apos;est
            dommage, car la plupart des sinistres sur les installations photovoltaïques
            résidentielles concernent la toiture, et non l&apos;électricité.
          </p>
          <p>
            Cet article explique comment des panneaux tiennent sur un toit en tuiles, quel
            crochet convient à chaque modèle de tuile, comment se déroule la pose, quelles
            règles encadrent ces travaux et quelles erreurs repérer avant qu&apos;elles ne
            deviennent des fuites.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Surimposition ou intégration : les systèmes de pose sur tuiles</li>
            <li>Le crochet adapté à votre tuile : mécanique, romane, canal, plate, béton</li>
            <li>Les 8 étapes d&apos;une pose dans les règles</li>
            <li>Les erreurs de fixation qui provoquent des fuites</li>
            <li>Normes, assurance, coût et entretien</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : SYSTEMES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Fixation des panneaux solaires sur tuiles : les systèmes de pose
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Il existe deux grandes familles de pose sur une toiture en pente. Dans la{' '}
          <strong>surimposition</strong>, les panneaux sont posés au-dessus des tuiles, qui
          restent en place. Dans l&apos;<strong>intégration au bâti</strong>, ils remplacent
          une partie de la couverture et participent à l&apos;étanchéité. Pendant des années,
          l&apos;intégration a été encouragée par un tarif de rachat plus avantageux. Elle a
          laissé derrière elle un nombre important de toitures qui fuient.
        </p>

        <ArticleTable {...SYSTEMES_TABLE} title="Les systèmes de fixation des panneaux solaires sur une toiture en tuiles" />

        <p className="text-slate-700 leading-relaxed mb-6">
          Aujourd&apos;hui, la quasi-totalité des installations sur maison se font en
          surimposition. Le principe est simple et éprouvé : la toiture garde ses tuiles et
          donc son étanchéité d&apos;origine, les panneaux sont simplement portés quelques
          centimètres au-dessus. Le seul point de contact entre l&apos;installation et la
          couverture est le crochet, qui passe entre deux tuiles. C&apos;est sur lui que
          repose toute la qualité de la pose.
        </p>

        <ArticleStat stats={[
          { value: '12 à 15 kg/m²', label: 'charge ajoutée par les panneaux, rails et crochets sur la toiture', color: 'blue' },
          { value: '≈ 2 crochets', label: 'par panneau en moyenne, davantage en bordure de toit et en zone ventée', color: 'green' },
          { value: '0 tuile percée', label: 'avec une surimposition bien posée : les crochets passent entre les tuiles', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-6">
          La charge ajoutée est modeste au regard de ce que supporte déjà une charpente :
          une couverture en tuiles de terre cuite pèse à elle seule 40 à 70 kg par m². La
          vraie contrainte est ailleurs. Par vent fort, le panneau agit comme une voile, et
          l&apos;effort qui tend à l&apos;arracher du toit peut largement dépasser son
          poids. D&apos;où l&apos;importance du nombre de crochets, de leur ancrage dans la
          charpente et de leur répartition. Pour le poids et les dimensions des modules, notre
          article sur la{' '}
          <Link href="/blog/taille-panneaux-solaires" className={linkCls}>
            taille des panneaux solaires
          </Link>{' '}
          donne les valeurs par format.
        </p>

        {/* ---- SECTION 2 : CROCHET PAR TUILE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel crochet pour quelle tuile ?
        </h2>

        <ArticleImageSection
          image="/images/blog/fixation-panneaux-solaires-sur-tuiles-crochet-reglable.jpg"
          alt="Crochet de fixation en acier galvanisé réglable en hauteur posé sur une tuile mécanique en terre cuite, avec sa vis de fixation et une semelle caoutchouc"
          imagePosition="right"
        >
          <p>
            Un crochet de toiture se compose d&apos;une platine vissée dans le chevron et
            d&apos;un bras qui contourne la tuile pour ressortir au-dessus, où viendra se fixer
            le rail.
          </p>
          <p className="mt-3">
            Les modèles réglables permettent d&apos;ajuster la hauteur pour que le bras ne
            touche jamais la tuile.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Il n&apos;existe pas de crochet universel. Chaque type de tuile a son profil, son
          épaisseur et son recouvrement, et le crochet doit s&apos;y adapter pour passer entre
          deux tuiles sans les soulever. Les fabricants de systèmes de fixation proposent des
          gammes complètes, avec des crochets dédiés aux principaux modèles du marché
          français.
        </p>

        <ArticleTable {...TUILES_TABLE} title="Fixation des panneaux solaires selon le type de tuile" />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Tuiles mécaniques et tuiles béton : le cas le plus simple
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Les tuiles mécaniques à emboîtement, très répandues en Île-de-France sur les
          pavillons construits depuis les années 1950, se prêtent bien à la surimposition. On
          soulève la tuile, on visse le crochet sur le chevron, on règle sa hauteur, puis on
          repose la tuile. Celle-ci est parfois légèrement entaillée à la meuleuse pour
          laisser passer le bras du crochet. Les tuiles en béton, plus lourdes et moins
          cassantes, se traitent de la même façon, avec un crochet à plus grande amplitude de
          réglage.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Fixation des panneaux solaires sur tuiles canal
        </h3>

        <ArticleImageSection
          image="/images/blog/fixation-panneaux-solaires-sur-tuiles-crochet-tuile-canal.jpg"
          alt="Crochet de fixation en aluminium pour panneau solaire inséré entre deux rangées de tuiles canal en terre cuite, avant la pose du rail"
          imagePosition="left"
        >
          <p>
            Sur une couverture en tuiles canal, le crochet passe dans le creux entre deux
            tuiles de couvert et doit ressortir au-dessus de leur forte courbure.
          </p>
          <p className="mt-3">
            Ces tuiles sont fragiles : le couvreur prévoit toujours des tuiles de rechange.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          Plus rares en Île-de-France que dans le Sud, les tuiles canal demandent davantage de
          soin. Elles sont posées en deux couches, tuiles de courant et tuiles de couvert, et
          parfois scellées au mortier ou posées sur des plaques sous-tuiles ondulées. Selon le
          support, on utilise un crochet long spécifique, une tuile de remplacement métallique
          munie d&apos;une platine, ou une fixation traversant la plaque support, rendue
          étanche par une pièce dédiée. Dans tous les cas, l&apos;intervention d&apos;un
          couvreur habitué à ce type de toiture est préférable.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Tuiles plates : beaucoup de petites pièces à manipuler
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Les tuiles plates de petit moule, fréquentes sur les maisons anciennes et en secteur
          protégé, se recouvrent sur plusieurs épaisseurs. Le crochet doit être plat et fin
          pour ne pas soulever les tuiles du rang supérieur. Une autre solution consiste à
          remplacer les tuiles concernées par des plaques métalliques de même format, sur
          lesquelles le support est fixé. Ces tuiles étant souvent anciennes, prévoyez un
          budget pour remplacer celles qui cassent pendant le chantier.
        </p>

        {/* ---- SECTION 3 : ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 8 étapes d&apos;une fixation sur tuiles dans les règles
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Sur une maison, la pose d&apos;une installation de 3 à 6 kWc prend généralement une à
          deux journées pour une équipe de deux ou trois personnes. Le travail en toiture
          représente la moitié de ce temps environ. Voici comment il se déroule.
        </p>

        <ArticleSteps steps={POSE_STEPS} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Deux points distinguent une pose soignée d&apos;une pose expédiée. D&apos;abord, le
          remplacement préventif des tuiles abîmées autour du champ de panneaux, car une tuile
          fêlée sous un panneau est très difficile à repérer et à changer ensuite. Ensuite, la
          vérification finale de chaque tuile reposée : aucune ne doit rester soulevée par un
          crochet, au risque de laisser entrer la pluie poussée par le vent.
        </p>

        {/* ---- SECTION 4 : ERREURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les erreurs de fixation qui provoquent des fuites
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les problèmes que nous constatons lors de nos interventions sur des installations
          posées par d&apos;autres entreprises reviennent presque toujours aux mêmes causes.
          Toutes sont évitables.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            <strong>Le crochet qui repose sur la tuile.</strong> Mal réglé, il appuie sur la
            tuile du dessous. Sous le poids du panneau, de la neige ou d&apos;un technicien,
            la tuile finit par casser, souvent sans que cela se voie depuis le sol.
          </li>
          <li>
            <strong>La tuile soulevée.</strong> Si la tuile du dessus n&apos;est pas entaillée
            alors que le crochet la gêne, elle ne retrouve pas son emboîtement. Lors
            d&apos;une pluie battante poussée par le vent, l&apos;eau s&apos;infiltre par
            l&apos;interstice.
          </li>
          <li>
            <strong>La fixation dans les liteaux.</strong> Les liteaux portent les tuiles, pas
            les panneaux. Un crochet vissé dans un liteau peut céder lors d&apos;une tempête.
          </li>
          <li>
            <strong>La tuile percée.</strong> Faire passer une vis ou un câble à travers une
            tuile crée un point d&apos;infiltration permanent, que les joints de mastic ne
            colmatent que quelques années.
          </li>
          <li>
            <strong>Le mélange de métaux.</strong> Associer de l&apos;acier ordinaire et de
            l&apos;aluminium au contact de l&apos;humidité provoque une corrosion
            galvanique. La visserie doit être en inox et les pièces compatibles entre elles.
          </li>
          <li>
            <strong>Des crochets trop espacés en bordure.</strong> Les rives et les angles du
            toit subissent les efforts de vent les plus forts. C&apos;est là que les crochets
            doivent être les plus rapprochés.
          </li>
        </ul>

        <ArticleCallout type="warning" title="Le passage des câbles, point faible oublié">
          <p>
            Les câbles qui relient les panneaux à l&apos;onduleur doivent traverser la
            couverture. La bonne méthode passe par une tuile à douille ou une chatière
            prévue à cet effet, avec une boucle d&apos;égouttement pour que l&apos;eau ne
            suive pas le câble. Un câble glissé sous une tuile soulevée, ou passé par un trou
            percé et rempli de silicone, est une cause fréquente de fuite quelques années
            après la pose.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : NORMES / ASSURANCE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Normes, garanties et assurance
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La fixation des panneaux solaires sur tuiles touche à la fois à la couverture, à la
          structure et à l&apos;électricité. Plusieurs références encadrent donc ces travaux.
          Les DTU de la série 40.2 fixent les règles de pose des couvertures en tuiles, que
          l&apos;installation ne doit pas compromettre. Les Eurocodes définissent les charges
          de vent et de neige à prendre en compte selon la région et l&apos;altitude, et donc
          le nombre de crochets. Côté électrique, le guide UTE C15-712-1 complète la norme
          NF C 15-100 pour les installations photovoltaïques.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le système de fixation lui-même doit disposer d&apos;une évaluation technique
          reconnue par les assureurs : Avis technique du CSTB, Pass&apos;Innovation ou Enquête
          de technique nouvelle réalisée par un bureau de contrôle. Sans elle, la garantie
          décennale de l&apos;installateur peut ne pas couvrir un sinistre lié à la toiture.
          Demandez la référence du système proposé et le document d&apos;évaluation
          correspondant.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Choisissez enfin une entreprise qualifiée RGE QualiPV, titulaire d&apos;une
          assurance décennale couvrant explicitement les travaux photovoltaïques en toiture.
          Une fois l&apos;installation en service, déclarez-la à votre assureur habitation :
          elle augmente la valeur assurée du bien et doit être couverte en cas de tempête ou
          de grêle.
        </p>

        {/* ---- SECTION 6 : AVANT LA POSE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Avant la pose : vérifier la toiture et la charpente
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Des panneaux solaires durent trente ans ou plus. Les poser sur une couverture qui
          devra être refaite dans cinq ans oblige à tout démonter et remonter, pour un coût
          de plusieurs centaines à quelques milliers d&apos;euros. Avant de signer, faites
          évaluer l&apos;état de vos tuiles : porosité, mousses, tuiles cassées ou
          déplacées, âge de la couverture.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La charpente mérite le même examen. Les crochets s&apos;ancrent dans les chevrons,
          qui doivent être sains et suffisamment épais pour recevoir les vis. Si une
          rénovation de toiture s&apos;impose, profitez-en pour isoler : l&apos;obligation
          d&apos;isoler lors d&apos;une réfection importante et les techniques possibles sont
          détaillées dans notre article sur l&apos;
          <Link href="/blog/isolation-thermique-du-toit" className={linkCls}>
            isolation thermique du toit
          </Link>
          . Côté exposition, vérifiez aussi que le pan choisi est le bon, à l&apos;aide de
          notre article sur l&apos;
          <Link href="/blog/orientation-panneaux-solaires" className={linkCls}>
            orientation des panneaux solaires
          </Link>
          .
        </p>

        {/* ---- SECTION 7 : COUT / ENTRETIEN ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Coût et entretien de la fixation
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le matériel de fixation représente une part modeste du budget : 300 à 600 €
          environ pour une installation de 3 kWc en surimposition sur tuiles mécaniques, un
          peu plus pour des tuiles canal ou plates qui demandent des pièces spécifiques. Il
          est compris dans le prix d&apos;une installation clé en main, de l&apos;ordre de
          7 000 à 9 500 € TTC pour 3 kWc avec la TVA à 5,5 %. Économiser sur ce poste est un
          mauvais calcul, puisque c&apos;est lui qui protège la toiture pendant trente ans.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Une fixation bien posée ne demande presque aucun entretien. Après une tempête,
          un coup d&apos;œil depuis le sol aux jumelles permet de vérifier qu&apos;aucun
          panneau n&apos;a bougé et qu&apos;aucune tuile n&apos;a glissé. Tous les trois à
          cinq ans, ou à l&apos;occasion d&apos;une intervention sur le toit, un contrôle du
          serrage des brides et de l&apos;état des tuiles sous les panneaux est utile. Nos
          équipes assurent ce suivi dans le cadre de nos{' '}
          <Link href="/services/maintenance" className={linkCls}>contrats d&apos;entretien</Link>.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Une pose de panneaux solaires qui respecte votre toiture"
          description="Nos installateurs RGE QualiPV identifient votre tuile, vérifient la charpente, choisissent un système de fixation sous évaluation technique et posent vos panneaux sans percer une seule tuile. Visite technique et devis gratuits sous 48h en Île-de-France."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur la fixation des panneaux solaires sur tuiles
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
            { href: '/blog/taille-panneaux-solaires', kicker: 'Article associé', title: 'Taille des panneaux solaires', cta: 'Lire l\'article' },
            { href: '/blog/avantages-panneaux-solaires', kicker: 'Article associé', title: 'Avantages des panneaux solaires', cta: 'Lire l\'article' },
            { href: '/blog/isolation-thermique-du-toit', kicker: 'Avant la pose', title: 'Isolation thermique du toit', cta: 'Lire l\'article' },
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
              { name: 'Sartrouville', slug: 'sartrouville' },
              { name: 'Conflans-Sainte-Honorine', slug: 'conflans-sainte-honorine' },
              { name: 'Maisons-Alfort', slug: 'maisons-alfort' },
              { name: 'Sainte-Geneviève-des-Bois', slug: 'sainte-genevieve-des-bois' },
              { name: 'Lagny-sur-Marne', slug: 'lagny-sur-marne' },
              { name: 'Savigny-le-Temple', slug: 'savigny-le-temple' },
              { name: 'Rosny-sous-Bois', slug: 'rosny-sous-bois' },
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
