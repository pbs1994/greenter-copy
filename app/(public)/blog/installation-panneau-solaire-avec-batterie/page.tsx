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
  ARTICLE_META, CAPACITE_TABLE, PRIX_TABLE, INSTALLATION_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/installation-panneau-solaire-avec-batterie'

const HERO_IMAGE = '/images/blog/installation-panneau-solaire-avec-batterie-garage-maison.jpg'
const HERO_ALT = "Maison au toit de tuiles équipé de panneaux solaires, avec dans le garage ouvert une batterie de stockage blanche posée au sol et un onduleur fixé au mur, illustrant une installation panneau solaire avec batterie"

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
      height: 678,
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
  { name: 'Installation panneau solaire avec batterie', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function InstallationPanneauSolaireAvecBatterie() {
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
            À midi, vos panneaux produisent plus que la maison ne consomme. À 20 heures, quand
            tout le monde rentre, cuisine et lance une machine, ils ne produisent plus rien.
            C&apos;est tout le paradoxe du solaire résidentiel, et c&apos;est précisément ce
            décalage qu&apos;une batterie vient combler.
          </p>
          <p>
            Pendant longtemps, revendre ce surplus suffisait. Depuis juin 2026, il n&apos;est
            plus racheté qu&apos;environ 1,1 centime le kWh, alors que le kWh acheté le soir
            coûte près de 20 centimes. L&apos;
            <strong>installation d&apos;un panneau solaire avec batterie</strong> attire donc
            de plus en plus de propriétaires. Encore faut-il qu&apos;elle soit bien
            dimensionnée pour être rentable.
          </p>
          <p>
            Nous expliquons ici comment fonctionne un système avec stockage, quelle capacité
            choisir, ce que coûte l&apos;ensemble, dans quels cas il se rembourse, et comment
            se déroule la pose.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le fonctionnement d&apos;une installation solaire avec stockage</li>
            <li>La capacité de batterie adaptée à votre foyer</li>
            <li>Les prix d&apos;une installation avec batterie en 2026</li>
            <li>La rentabilité réelle, avec et sans stockage</li>
            <li>Les étapes de pose, l&apos;emplacement et la fonction secours</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : FONCTIONNEMENT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment fonctionne une installation panneau solaire avec batterie
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le principe est simple. Les panneaux produisent de l&apos;électricité en journée.
          La maison consomme d&apos;abord ce dont elle a besoin. Le surplus, au lieu de partir
          directement sur le réseau, charge la batterie. Le soir et la nuit, la batterie se
          décharge pour alimenter la maison. Quand elle est vide, le réseau prend le relais.
          Quand elle est pleine, le surplus restant est injecté et revendu.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Tout cela se fait automatiquement, sans intervention. Un système de gestion de
          l&apos;énergie décide à chaque instant où envoyer les kWh, et une application permet
          de suivre la production, l&apos;état de charge et la consommation. Deux
          architectures techniques existent, selon que l&apos;installation est neuve ou
          déjà en place.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le couplage DC avec un onduleur hybride
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour une installation neuve, la solution la plus courante est l&apos;onduleur
          hybride. Il reçoit le courant continu des panneaux, l&apos;envoie directement dans la
          batterie ou le convertit en courant alternatif pour la maison. Comme l&apos;énergie
          stockée ne subit qu&apos;une seule conversion, le rendement est meilleur, et un seul
          appareil gère l&apos;ensemble.
        </p>

        <ArticleImageSection
          image="/images/blog/installation-panneau-solaire-avec-batterie-murale-toit.jpg"
          alt="Batterie solaire murale noire avec écran de contrôle allumé, fixée sur une façade à côté d'une toiture en tuiles couverte de panneaux photovoltaïques, au coucher du soleil"
          imagePosition="right"
        >
          <p>
            Certains systèmes réunissent onduleur et batterie dans un même boîtier mural,
            avec un écran qui affiche l&apos;état de charge et la puissance en temps réel.
          </p>
          <p className="mt-3">
            Au coucher du soleil, la batterie prend le relais des panneaux pour les besoins
            de la soirée.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le couplage AC pour équiper une installation existante
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si vous avez déjà des panneaux avec un onduleur classique ou des micro-onduleurs, on
          ajoute une batterie dotée de son propre onduleur, raccordée côté courant alternatif.
          Elle se charge avec le surplus mesuré au tableau électrique. Cette solution est plus
          souple, mais un peu moins efficace et plus chère, car l&apos;énergie est convertie
          deux fois de plus. Elle reste la seule option pour la plupart des installations
          posées avant 2024.
        </p>

        {/* ---- SECTION 2 : POURQUOI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi la batterie revient au premier plan depuis juin 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;intérêt d&apos;une batterie se mesure à l&apos;écart entre deux prix : celui
          auquel vous revendez un kWh et celui auquel vous le rachetez. Jusqu&apos;en 2024, le
          surplus était payé plus de 10 centimes. L&apos;écart était faible, et la batterie
          avait rarement du sens. La réforme du 1er juin 2026 a tout changé.
        </p>

        <ArticleStat stats={[
          { value: '≈ 1,1 c€', label: 'prix de rachat HT du kWh injecté pour les nouveaux contrats depuis juin 2026', color: 'amber' },
          { value: '≈ 19,5 c€', label: 'prix TTC d\'un kWh acheté au réseau en option base, abonnement non compris', color: 'blue' },
          { value: '75 à 85 %', label: 'taux d\'autoconsommation atteint avec une batterie bien dimensionnée, contre 35 à 65 % sans', color: 'green' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-4">
          Chaque kWh stocké puis consommé le soir vaut donc près de vingt fois plus que le
          même kWh revendu à midi. C&apos;est l&apos;argument principal du stockage. Sans
          batterie, un foyer absent en journée ne consomme que 35 à 40 % de sa production :
          le reste part sur le réseau pour presque rien.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Il faut toutefois garder la tête froide. Avant d&apos;investir plusieurs milliers
          d&apos;euros, il existe des moyens peu coûteux d&apos;augmenter
          l&apos;autoconsommation : programmer le ballon d&apos;eau chaude, le lave-linge et le
          lave-vaisselle en journée, ou installer un routeur solaire. Nous y revenons plus bas.
          Les gains globaux du solaire sont détaillés dans notre article sur les{' '}
          <Link href="/blog/avantages-panneaux-solaires" className={linkCls}>
            avantages des panneaux solaires
          </Link>
          .
        </p>

        {/* ---- SECTION 3 : CAPACITE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle capacité de batterie pour votre installation solaire ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est la question qui décide de la rentabilité. Une batterie trop petite se
          remplit en milieu de matinée et laisse filer le reste du surplus. Une batterie trop
          grande ne se charge jamais complètement, et vous payez des kWh de stockage qui ne
          servent à rien.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La bonne capacité se situe à l&apos;intersection de deux valeurs : votre
          consommation entre le coucher du soleil et le lendemain matin, et le surplus moyen
          de vos panneaux en journée. Un repère courant est de 1 à 1,5 kWh de capacité utile
          par kWc installé. Pour 6 kWc, cela donne une batterie de 6 à 9 kWh.
        </p>

        <ArticleTable {...CAPACITE_TABLE} title="Capacité de batterie conseillée selon le profil du foyer" />

        <p className="text-slate-700 leading-relaxed mb-6">
          Attention à la différence entre capacité nominale et capacité utile. Une batterie
          annoncée à 10 kWh ne restitue pas toujours 10 kWh : une partie est réservée pour
          protéger les cellules. Les batteries lithium fer phosphate (LFP), désormais les plus
          répandues, acceptent une décharge de 90 à 100 %, et restituent 90 à 95 % de
          l&apos;énergie stockée. Elles sont aussi plus stables que les anciennes chimies NMC,
          avec un risque d&apos;emballement thermique bien plus faible.
        </p>

        <ArticleCallout type="tip" title="Ne dimensionnez pas sur juillet">
          <p>
            En Île-de-France, une installation de 6 kWc produit environ 900 kWh en juillet et
            seulement 150 à 180 kWh en décembre. De novembre à février, le surplus est souvent
            trop faible pour remplir la batterie, qui sert peu. Une capacité calée sur les
            soirées de printemps et d&apos;automne est généralement le meilleur compromis.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix d&apos;une installation panneau solaire avec batterie en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le coût d&apos;une batterie domestique a fortement baissé ces dernières années,
          mais il reste élevé au regard des économies qu&apos;elle génère. Une batterie de
          10 kWh posée, avec son onduleur, coûte à peu près autant que les panneaux de
          6 kWc eux-mêmes.
        </p>

        <ArticleTable {...PRIX_TABLE} title="Prix d'une installation solaire avec batterie selon la configuration" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix dépend de la capacité, de la marque, de la garantie et de la puissance de
          décharge. Cette dernière compte plus qu&apos;on ne le pense : une batterie qui ne
          délivre que 2,5 kW ne pourra pas alimenter seule un four, une plaque de cuisson et
          une pompe à chaleur en même temps. Le réseau complètera, et une partie de
          l&apos;intérêt sera perdue.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Sur la fiscalité, faites préciser le taux de TVA sur le devis. La TVA à 5,5 %
          s&apos;applique aux installations photovoltaïques jusqu&apos;à 9 kWc. Selon que la
          batterie est facturée avec les panneaux ou séparément, plus tard, son taux peut
          différer. Pour le détail des prix sans stockage, consultez notre article sur le{' '}
          <Link href="/blog/cout-installation-panneaux-solaires" className={linkCls}>
            coût d&apos;installation des panneaux solaires
          </Link>
          . Greenter propose aussi une{' '}
          <Link href="/produits/batterie-solaire-kstar-6kw" className={linkCls}>
            batterie solaire KSTAR
          </Link>{' '}
          LFP, compatible avec nos kits.
        </p>

        {/* ---- SECTION 5 : RENTABILITE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Une batterie solaire est-elle rentable ?
        </h2>

        <ArticleImageSection
          image="/images/blog/installation-panneau-solaire-avec-batterie-toiture-maison.jpg"
          alt="Maison individuelle blanche en pleine campagne dont la toiture grise porte deux rangées de panneaux solaires, avec des montagnes boisées en arrière-plan"
          imagePosition="left"
        >
          <p>
            Sur une maison comme celle-ci, équipée de 6 kWc, une batterie de 10 kWh permet
            de consommer sur place 75 à 85 % de la production, contre 55 à 65 % sans
            stockage.
          </p>
          <p className="mt-3">
            Le gain annuel augmente de 180 à 300 €, pour un investissement de 6 000 à
            9 000 €.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Faisons le calcul pour une maison avec pompe à chaleur et 6 kWc. Sans batterie,
          elle économise 800 à 920 € par an et rembourse son installation en 13 à 15 ans.
          Avec une batterie de 10 kWh, le gain monte à 980 à 1 100 € par an, mais
          l&apos;investissement total passe à 18 000 € environ. Le remboursement recule à
          16 à 18 ans.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Autrement dit, la batterie améliore les économies, mais pas la rentabilité de
          l&apos;ensemble, du moins aux prix actuels. Elle se rembourse rarement avant la fin
          de sa propre durée de vie, de 12 à 20 ans. Ce constat peut évoluer vite : le prix
          des batteries baisse chaque année, et toute hausse du prix de l&apos;électricité
          joue en faveur du stockage.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La batterie se justifie surtout dans quatre situations :
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            une <strong>forte consommation le soir</strong>, avec une{' '}
            <Link href="/services/pompe-a-chaleur" className={linkCls}>pompe à chaleur</Link>,
            une cuisine électrique ou une voiture rechargée en rentrant ;
          </li>
          <li>
            un <strong>foyer absent en journée</strong>, qui revendrait sinon plus de la moitié
            de sa production ;
          </li>
          <li>
            des <strong>coupures de courant fréquentes</strong>, en bout de ligne ou en zone
            rurale, avec un onduleur doté d&apos;une fonction secours ;
          </li>
          <li>
            l&apos;envie d&apos;<strong>autonomie</strong> et de protection contre les hausses
            futures, au-delà du seul calcul financier.
          </li>
        </ul>

        {/* ---- SECTION 6 : ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les étapes d&apos;une installation solaire avec stockage
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Ajouter une batterie ne change pas les démarches administratives : déclaration
          préalable en mairie, Consuel et mise en service Enedis restent les mêmes
          qu&apos;une installation sans stockage. La différence se joue sur l&apos;étude et
          sur la pose, qui demande une demi-journée de plus.
        </p>

        <ArticleSteps steps={INSTALLATION_STEPS} />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Où placer la batterie dans la maison
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;emplacement influe sur la durée de vie de la batterie. Les cellules lithium
          vieillissent plus vite au-delà de 30 °C et se chargent mal sous 5 °C. Un garage
          isolé, un cellier ou une buanderie conviennent bien. Les combles, qui dépassent
          souvent 40 °C l&apos;été, sont à proscrire, tout comme les chambres et les pièces
          humides. Une batterie de 10 kWh pèse 80 à 120 kg : posée au sol ou fixée sur un mur
          porteur, elle doit rester accessible et à proximité du tableau électrique pour
          limiter la longueur des câbles.
        </p>

        {/* ---- SECTION 7 : SECOURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Batterie et coupure de courant : ce que permet la fonction secours
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est une idée reçue tenace : avec une batterie, la maison resterait éclairée
          pendant une panne. Ce n&apos;est pas automatique. Pour la sécurité des techniciens
          d&apos;Enedis qui interviennent sur le réseau, une installation raccordée doit
          s&apos;arrêter dès que le réseau disparaît, batterie comprise.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour garder du courant, il faut un onduleur doté d&apos;une fonction secours, aussi
          appelée backup ou EPS, et un coffret de basculement qui isole la maison du réseau.
          La bascule prend de quelques millisecondes à quelques secondes. En général, seuls
          certains circuits sont secourus : réfrigérateur, congélateur, éclairage, box
          internet, chaudière ou circulateur. Cette option coûte quelques centaines
          d&apos;euros de plus à l&apos;installation, et beaucoup plus si on l&apos;ajoute
          après coup.
        </p>

        {/* ---- SECTION 8 : ALTERNATIVES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les alternatives à la batterie physique
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Avant de stocker l&apos;électricité, il est souvent plus rentable de la consommer au
          bon moment. Le ballon d&apos;eau chaude électrique est la meilleure « batterie »
          de la maison : un ballon de 200 litres absorbe 8 à 10 kWh par jour. Un simple
          programmateur, ou un routeur solaire à 300 à 600 €, qui envoie le surplus dans la
          résistance du ballon, fait gagner 15 à 20 points d&apos;autoconsommation pour un
          coût dix fois inférieur à celui d&apos;une batterie.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La recharge d&apos;une voiture électrique en journée, le pilotage d&apos;une pompe
          à chaleur qui préchauffe la maison en début d&apos;après-midi, ou une piscine filtrée
          aux heures de production jouent le même rôle. Le dimensionnement de l&apos;installation
          compte aussi : une puissance adaptée à vos besoins limite le surplus dès le départ.
          Notre article sur la{' '}
          <Link href="/blog/taille-panneaux-solaires" className={linkCls}>
            taille des panneaux solaires
          </Link>{' '}
          détaille ce point.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Reste la batterie virtuelle, proposée par plusieurs fournisseurs. Le surplus injecté
          est comptabilisé, puis restitué le soir ou l&apos;hiver. Il n&apos;y a pas de
          matériel à installer, mais un abonnement mensuel et souvent des frais par kWh
          restitué. Faites le calcul sur l&apos;année : pour une petite installation, le coût
          de l&apos;abonnement dépasse fréquemment le gain.
        </p>

        <ArticleCallout type="warning" title="Les arguments à vérifier sur un devis avec batterie">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Une promesse d&apos;autonomie totale ou de « facture à zéro » en Île-de-France</li>
            <li>Une capacité supérieure à 2 kWh par kWc installé sans étude de consommation</li>
            <li>Une garantie de moins de 10 ans ou sans seuil de capacité restante</li>
            <li>Une fonction secours mise en avant sans coffret de basculement prévu</li>
            <li>Une chimie de batterie non précisée sur le devis</li>
          </ul>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Panneaux solaires avec ou sans batterie ?"
          description="Nos installateurs RGE QualiPV analysent votre courbe de consommation Linky pour vous dire si une batterie est utile chez vous, et de quelle capacité. Étude et devis gratuits sous 48h en Île-de-France."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;installation d&apos;un panneau solaire avec batterie
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
            { href: '/produits/batterie-solaire-kstar-6kw', kicker: 'Produit', title: 'Batterie solaire KSTAR', cta: 'Voir le produit' },
            { href: '/blog/cout-installation-panneaux-solaires', kicker: 'Article associé', title: 'Coût d\'installation des panneaux solaires', cta: 'Lire l\'article' },
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
