import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSteps, ArticleSources,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, MONOBLOC_BIBLOC_TABLE, COMPOSANTS_TABLE, INSTALLATION_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/schema-installation-pompe-a-chaleur-air-eau'

const HERO_IMAGE = '/images/lp/greenter-technicien-pac.jpg'
const HERO_ALT = "Technicien Greenter fixant l'unité extérieure d'une pompe à chaleur air-eau sur ses supports muraux, première étape du schéma d'installation"
const SCHEMA_IMAGE = '/images/blog/schema-installation-pompe-a-chaleur-air-eau-circuit-hydraulique.jpg'

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
      width: 2048,
      height: 1136,
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
  { name: 'Schéma installation pompe à chaleur air-eau', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

// Les schémas doivent rester entiers : ArticleFullImage recadre en 21/9.
function DiagramFigure({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption: string }) {
  return (
    <figure className="my-10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 768px"
        className="w-full h-auto rounded-2xl shadow-lg bg-white"
      />
      <figcaption className="text-center text-sm text-slate-400 mt-3 italic px-4">{caption}</figcaption>
    </figure>
  )
}

export default function SchemaInstallationPompeAChaleurAirEau() {
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
        wordCount={3300}
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
            Sur un devis de pompe à chaleur, on trouve souvent une ligne laconique :
            « fourniture et pose d&apos;une PAC air-eau, raccordement au réseau existant ».
            Derrière ces quelques mots se cache pourtant tout un circuit : une unité
            extérieure, un module hydraulique, des vannes, un vase d&apos;expansion, parfois un
            ballon tampon, un ballon d&apos;eau chaude et une ligne électrique dédiée. Comprendre
            le <strong>schéma d&apos;installation d&apos;une pompe à chaleur air-eau</strong>,
            c&apos;est pouvoir lire un devis, poser les bonnes questions à l&apos;installateur
            et repérer un oubli avant qu&apos;il ne vous coûte cher.
          </p>
          <p>
            Ce guide décompose le <strong>schéma installation pompe à chaleur air-eau</strong>{' '}
            élément par élément : la différence entre monobloc et bibloc, le rôle de chaque
            composant du circuit hydraulique, les variantes selon vos émetteurs et votre
            production d&apos;eau chaude, le raccordement électrique et l&apos;emplacement de
            l&apos;unité extérieure.
          </p>
          <p>
            Si vous souhaitez d&apos;abord comprendre comment une PAC produit de la chaleur à
            partir de l&apos;air, notre article sur le{' '}
            <Link href="/blog/pompe-a-chaleur-air-eau-fonctionnement" className={linkCls}>
              fonctionnement d&apos;une pompe à chaleur air-eau
            </Link>{' '}
            détaille le cycle thermodynamique. Ici, nous nous concentrons sur la façon dont
            l&apos;ensemble est installé et raccordé dans votre maison.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le schéma d&apos;ensemble d&apos;une installation de PAC air-eau en 3 blocs</li>
            <li>Monobloc ou bibloc : deux schémas d&apos;installation différents</li>
            <li>Le rôle de chaque composant du circuit hydraulique</li>
            <li>Les variantes : radiateurs, plancher chauffant, eau chaude, relève de chaudière</li>
            <li>Le raccordement électrique, l&apos;emplacement extérieur et les étapes du chantier</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : VUE D'ENSEMBLE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Schéma installation pompe à chaleur air-eau : la vue d&apos;ensemble
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Quel que soit le modèle, le schéma d&apos;une PAC air-eau se lit comme une chaîne
          en trois maillons. À l&apos;extérieur, le <strong>groupe extérieur</strong> aspire
          l&apos;air grâce à son ventilateur et en extrait les calories, même par temps froid.
          À l&apos;intérieur, le <strong>module hydraulique</strong> transfère cette chaleur à
          l&apos;eau du circuit de chauffage. Enfin, le <strong>réseau de distribution</strong>{' '}
          — radiateurs, plancher chauffant ou les deux — diffuse la chaleur dans les pièces,
          tandis qu&apos;un ballon peut stocker l&apos;eau chaude sanitaire.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Entre ces maillons, l&apos;eau circule en boucle fermée : elle part chaude vers les
          émetteurs par le circuit de départ, puis revient refroidie vers la PAC par le circuit
          de retour. C&apos;est ce que représentent les tuyaux rouges et bleus sur le schéma
          ci-dessous. Tout l&apos;enjeu d&apos;une bonne installation est de faire
          circuler cette eau au bon débit et à la plus basse température possible, car
          c&apos;est là que la pompe à chaleur obtient son meilleur rendement.
        </p>

        <DiagramFigure
          src={SCHEMA_IMAGE}
          alt="Schéma d'installation d'une pompe à chaleur air-eau : groupe extérieur avec ventilateur relié à la pompe à chaleur intérieure, qui alimente un radiateur, un plancher chauffant et un ballon d'eau chaude, départs en rouge et retours en bleu"
          width={1024}
          height={828}
          caption="Schéma installation pompe à chaleur air-eau : le groupe extérieur capte les calories de l'air, la PAC intérieure chauffe l'eau, qui part vers les radiateurs, le plancher chauffant et le ballon d'eau chaude (rouge) puis revient refroidie (bleu)."
        />

        <ArticleStat stats={[
          { value: '3', label: 'blocs dans tout schéma de PAC air-eau : groupe extérieur, module hydraulique, émetteurs', color: 'green' },
          { value: '30–35 °C', label: 'température d\'eau typique pour un plancher chauffant, contre 45–55 °C pour des radiateurs', color: 'blue' },
          { value: '2 à 4 jours', label: 'durée habituelle du chantier pour une maison individuelle', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces trois repères structurent tout le reste de l&apos;article. Les trois blocs se
          retrouvent dans toutes les installations, mais leur organisation varie selon le
          type de PAC. La température d&apos;eau, elle, dépend surtout de vos émetteurs et
          conditionne le rendement : plus elle est basse, moins la PAC consomme. Quant à la
          durée du chantier, elle s&apos;allonge lorsqu&apos;il faut créer un local technique,
          désembouer un vieux réseau ou remplacer des radiateurs.
        </p>

        {/* ---- SECTION 2 : MONOBLOC / BIBLOC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Monobloc ou bibloc : deux schémas d&apos;installation différents
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le premier choix qui façonne le schéma d&apos;installation est l&apos;architecture de
          la PAC. Les deux familles produisent la même chaleur, mais elles ne répartissent pas
          leurs composants de la même façon entre l&apos;extérieur et l&apos;intérieur — ce
          qui change la nature des liaisons, les précautions de pose et les compétences
          requises pour la mise en service.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le schéma d&apos;une PAC air-eau bibloc
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dans une PAC <strong>bibloc</strong>, aussi appelée split, l&apos;unité extérieure
          contient l&apos;évaporateur, le compresseur et le ventilateur, tandis que le
          condenseur se trouve dans le module hydraulique intérieur. Les deux unités sont
          reliées par une <strong>liaison frigorifique</strong> : deux tubes de cuivre isolés
          dans lesquels circule le fluide frigorigène. L&apos;eau de chauffage reste donc
          entièrement à l&apos;intérieur de la maison.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          Ce schéma évite tout risque de gel des canalisations, mais la longueur de la liaison
          est limitée par le fabricant, et son raccordement impose l&apos;intervention
          d&apos;un technicien titulaire d&apos;une attestation de capacité à manipuler les
          fluides frigorigènes.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le schéma d&apos;une PAC air-eau monobloc
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Dans une PAC <strong>monobloc</strong>, tout le circuit frigorifique est assemblé et
          scellé en usine dans l&apos;unité extérieure. Ce sont des tuyaux d&apos;eau de
          chauffage qui traversent le mur pour rejoindre la maison. La mise en service est plus
          simple, mais l&apos;eau qui circule dehors doit être protégée du gel, soit par un
          mélange antigel (eau glycolée), soit par des vannes antigel qui vidangent
          automatiquement la portion extérieure en cas de coupure par grand froid.
        </p>

        <ArticleTable {...MONOBLOC_BIBLOC_TABLE} title="Schéma installation pompe à chaleur air-eau : monobloc ou bibloc ?" />

        {/* ---- SECTION 3 : COMPOSANTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les composants du circuit hydraulique, un par un
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le cœur du schéma d&apos;installation d&apos;une PAC air-eau est son circuit
          hydraulique. Une partie des composants est souvent intégrée d&apos;usine dans le
          module intérieur ; les autres sont ajoutés par l&apos;installateur selon la
          configuration du logement. Le tableau ci-dessous les récapitule avant que nous
          revenions sur les plus importants.
        </p>

        <ArticleTable {...COMPOSANTS_TABLE} title="Composants d'un schéma hydraulique de PAC air-eau" />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Circulateur, vase d&apos;expansion et soupape : le trio de sécurité
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Le <strong>circulateur</strong> est la petite pompe qui fait tourner l&apos;eau dans
          le circuit ; sur les modèles récents, il module sa vitesse pour ajuster le débit aux
          besoins. Le <strong>vase d&apos;expansion</strong> absorbe l&apos;augmentation de
          volume de l&apos;eau lorsqu&apos;elle chauffe, et la <strong>soupape de
          sécurité</strong> libère la pression si elle dépasse le seuil prévu, généralement
          autour de 3 bars. Un manomètre permet de surveiller la pression : entre 1 et 2 bars
          à froid sur la plupart des installations.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le filtre désemboueur : indispensable sur un réseau ancien
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Lorsqu&apos;une PAC remplace une chaudière, elle hérite d&apos;un réseau de chauffage
          qui contient souvent des boues et des particules d&apos;oxyde de fer accumulées au fil
          des années. Or l&apos;échangeur d&apos;une PAC est bien plus sensible à
          l&apos;encrassement que le corps de chauffe d&apos;une chaudière. Un{' '}
          <strong>filtre désemboueur magnétique</strong>, placé sur le retour juste avant la
          PAC, capte ces impuretés. Associé à un désembouage du circuit avant la mise en
          service, il protège durablement l&apos;installation.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Ballon tampon et bouteille de découplage : quand les ajouter ?
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Chaque fabricant impose un volume d&apos;eau minimal dans l&apos;installation pour
          que la PAC fonctionne par cycles longs et puisse dégivrer correctement. Si le réseau
          contient trop peu d&apos;eau — peu de radiateurs, ou des robinets thermostatiques qui
          ferment une grande partie du circuit — un <strong>ballon tampon</strong> vient
          compléter ce volume. La <strong>bouteille de découplage</strong>, elle, sépare
          hydrauliquement la PAC de plusieurs circuits d&apos;émetteurs ou d&apos;une chaudière
          d&apos;appoint, pour que chaque circulateur travaille sans perturber les autres.
        </p>

        <DiagramFigure
          src="/images/blog/schema-installation-pompe-a-chaleur-air-eau-composants-unite-exterieure.jpg"
          alt="Vue en coupe d'une unité extérieure de pompe à chaleur air-eau montrant évaporateur, compresseur, détendeur et condenseur, reliée à un ballon accumulateur et à un radiateur du chauffage central"
          width={895}
          height={756}
          caption="Vue en coupe d'une installation de PAC air-eau : l'air extérieur traverse l'évaporateur, le compresseur élève la température du fluide, le condenseur chauffe l'eau du circuit, puis le circulateur l'envoie vers le ballon et les radiateurs à une température de 45 à 65 °C selon le type d'émetteur."
        />

        {/* ---- SECTION 4 : EMETTEURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Schéma d&apos;installation avec radiateurs, plancher chauffant ou les deux
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les émetteurs déterminent la température d&apos;eau dont la PAC a besoin, et donc
          son rendement. Le schéma le plus simple relie la PAC à un seul circuit de{' '}
          <strong>radiateurs</strong>. Des radiateurs récents ou surdimensionnés chauffent
          correctement avec une eau à 45–50 °C ; de vieux radiateurs en fonte calculés pour une
          chaudière à 70 °C peuvent exiger une PAC haute température, ou le remplacement de
          quelques émetteurs dans les pièces les plus froides.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>plancher chauffant hydraulique</strong> est le partenaire idéal d&apos;une
          PAC : sa grande surface d&apos;échange lui permet de chauffer avec une eau à 30–35 °C,
          la température à laquelle la pompe à chaleur est la plus efficace. Notre guide
          consacré à la{' '}
          <Link href="/blog/pompe-a-chaleur-chauffage-au-sol" className={linkCls}>
            pompe à chaleur avec chauffage au sol
          </Link>{' '}
          détaille ce cas.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Lorsque la maison combine les deux, par exemple un plancher chauffant au
          rez-de-chaussée et des radiateurs à l&apos;étage, le schéma prévoit{' '}
          <strong>deux circuits</strong> : l&apos;un à haute température pour les radiateurs,
          l&apos;autre abaissé par une <strong>vanne mélangeuse</strong> pour le plancher, avec
          son propre circulateur. Chaque zone dispose alors de sa courbe de chauffe et de sa
          sonde d&apos;ambiance.
        </p>

        {/* ---- SECTION 5 : ECS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Schéma installation pompe à chaleur air-eau avec eau chaude sanitaire
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une PAC air-eau peut aussi produire l&apos;eau chaude sanitaire. Dans le schéma le
          plus répandu, une <strong>vanne 3 voies</strong> placée en sortie de PAC oriente
          l&apos;eau chaude soit vers le chauffage, soit vers le serpentin d&apos;un{' '}
          <strong>ballon d&apos;eau chaude</strong> séparé. La production d&apos;eau chaude est
          prioritaire : pendant que le ballon se recharge, le chauffage est brièvement
          interrompu, ce qui passe inaperçu dans une maison bien isolée.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Certains modèles, dits double service, intègrent directement un ballon de 180 à
          250 litres dans le module intérieur, ce qui simplifie le schéma et réduit
          l&apos;encombrement. Comptez en général 150 à 200 litres pour un foyer de deux à
          quatre personnes, 250 à 300 litres au-delà. Un cycle anti-légionellose, qui porte
          l&apos;eau à plus de 60 °C, doit être programmé à intervalles réguliers — une fois
          par semaine suffit dans la plupart des cas.
        </p>

        {/* ---- SECTION 6 : RELEVE CHAUDIERE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Le schéma en relève de chaudière
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Dans certaines maisons anciennes, on conserve la chaudière existante en appoint : la
          PAC assure le chauffage la plus grande partie de l&apos;année, et la chaudière prend
          le relais par grand froid, quand le rendement de la PAC devient moins intéressant.
          Le schéma d&apos;installation relie alors les deux générateurs à une bouteille de
          découplage, pilotés par une régulation commune qui choisit le plus économique selon
          la température extérieure. Les{' '}
          <Link href="/blog/pompe-a-chaleur-hybride" className={linkCls}>
            pompes à chaleur hybrides
          </Link>{' '}
          réunissent d&apos;origine les deux appareils dans un même système. Pour un
          remplacement complet, notre guide sur le{' '}
          <Link href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026" className={linkCls}>
            remplacement d&apos;une chaudière gaz par une pompe à chaleur
          </Link>{' '}
          vous accompagne pas à pas.
        </p>

        {/* ---- SECTION 7 : ELECTRIQUE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Le raccordement électrique d&apos;une PAC air-eau
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le schéma électrique est la partie la plus souvent oubliée des explications, alors
          qu&apos;il conditionne la sécurité de l&apos;installation. Une PAC air-eau doit être
          alimentée par une <strong>ligne dédiée</strong> depuis le tableau électrique,
          protégée par son propre disjoncteur et par un dispositif différentiel, conformément à
          la norme NF C 15-100. La section des câbles dépend de la puissance de l&apos;appareil
          et de la distance au tableau.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Il faut aussi vérifier l&apos;abonnement. Avec la résistance d&apos;appoint, une PAC
          peut appeler plusieurs kilowatts au moment où le four, les plaques et le
          lave-linge fonctionnent : de nombreux foyers passent de 6 à 9 kVA, voire 12 kVA. Les
          PAC de forte puissance existent en version triphasée, à réserver aux logements déjà
          équipés ou aux très grandes maisons. Un délestage peut enfin couper temporairement
          l&apos;appoint pour éviter de faire disjoncter le compteur.
        </p>

        {/* ---- SECTION 8 : EMPLACEMENT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Où placer l&apos;unité extérieure dans le schéma d&apos;installation ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;emplacement de l&apos;unité extérieure se décide dès l&apos;étude : il
          conditionne la longueur des liaisons, le bruit perçu par le voisinage et le
          rendement de la PAC. L&apos;unité doit être posée sur un support stable, avec des
          plots antivibratiles, et surélevée de quelques dizaines de centimètres pour évacuer
          l&apos;eau de dégivrage et rester dégagée en cas de neige.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le bon emplacement est un compromis entre plusieurs contraintes. L&apos;unité doit
          respirer : il faut respecter les dégagements indiqués par le fabricant à
          l&apos;arrière et devant le ventilateur, et éviter les recoins où elle recyclerait son
          propre air froid. Elle doit être aussi proche que possible du module intérieur, pour
          limiter la longueur des liaisons et les pertes. Enfin, les{' '}
          <strong>condensats</strong> — l&apos;eau produite lors du dégivrage — doivent pouvoir
          s&apos;évacuer sans former de plaque de glace sur un passage.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le bruit est la dernière contrainte, et pas la moindre. Le Code de la santé publique
          encadre les bruits de voisinage : une PAC placée sous la fenêtre de la chambre du
          voisin est une source de litige classique. Notre article sur{' '}
          <Link href="/blog/pompe-a-chaleur-et-bruit" className={linkCls}>
            le bruit d&apos;une pompe à chaleur
          </Link>{' '}
          détaille les distances et les solutions. Selon la commune et l&apos;aspect de la
          façade, une déclaration préalable de travaux en mairie peut aussi être nécessaire,
          et en copropriété, l&apos;accord de l&apos;assemblée générale.
        </p>

        {/* ---- SECTION 9 : ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Du schéma au chantier : les 6 étapes d&apos;une installation de PAC air-eau
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un schéma d&apos;installation n&apos;a de valeur que s&apos;il est fondé sur une
          étude sérieuse du logement. Voici comment se déroule un chantier mené dans les
          règles, de la visite technique à la remise des clés. Pour le budget correspondant,
          consultez notre guide sur le{' '}
          <Link href="/blog/cout-installation-pompe-a-chaleur" className={linkCls}>
            coût d&apos;installation d&apos;une pompe à chaleur
          </Link>.
        </p>

        <ArticleSteps steps={INSTALLATION_STEPS} />

        {/* ---- SECTION 10 : ERREURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les erreurs de schéma d&apos;installation qui coûtent cher
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La plupart des PAC qui déçoivent ne sont pas de mauvais appareils, mais des appareils
          mal intégrés. Nos techniciens rencontrent régulièrement les mêmes erreurs lorsqu&apos;ils
          reprennent des installations réalisées par d&apos;autres :
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed mb-6">
          <li><strong>PAC mal dimensionnée</strong>, faute de calcul des déperditions : trop petite, elle sollicite sans cesse l&apos;appoint ; trop grande, elle multiplie les cycles courts. Notre guide sur la <Link href="/blog/puissance-pompe-a-chaleur" className={linkCls}>puissance d&apos;une pompe à chaleur</Link> explique le bon calcul.</li>
          <li><strong>Absence de ballon tampon</strong> alors que le volume d&apos;eau du réseau est insuffisant : cycles courts, dégivrages difficiles, usure du compresseur.</li>
          <li><strong>Pas de filtre ni de désembouage</strong> sur un vieux réseau : l&apos;échangeur s&apos;encrasse et le rendement chute en quelques saisons.</li>
          <li><strong>Liaisons trop longues ou mal isolées</strong> : la chaleur se perd avant d&apos;arriver dans la maison.</li>
          <li><strong>Courbe de chauffe laissée au réglage d&apos;usine</strong> : la PAC chauffe l&apos;eau plus que nécessaire, une cause fréquente de <Link href="/blog/surconsommation-pompe-a-chaleur" className={linkCls}>surconsommation de pompe à chaleur</Link>.</li>
        </ul>

        <ArticleCallout type="tip" title="Demandez le schéma de principe à votre installateur">
          <p>
            Un installateur sérieux doit pouvoir vous remettre un schéma de principe de votre
            future installation, même simplifié : emplacement des deux unités, présence ou non
            d&apos;un ballon tampon, nombre de circuits, production d&apos;eau chaude. C&apos;est
            aussi un bon moyen de comparer deux devis sur une base identique. Pour bénéficier des
            aides, l&apos;entreprise doit être certifiée RGE, par exemple QualiPAC.
          </p>
        </ArticleCallout>

        <p className="text-slate-700 leading-relaxed mb-6">
          Une fois l&apos;installation en service, un entretien régulier maintient ses
          performances : il est obligatoire au moins tous les deux ans pour les PAC de 4 à
          70 kW, comme nous l&apos;expliquons dans notre guide sur l&apos;
          <Link href="/blog/entretien-pompe-a-chaleur-air-eau" className={linkCls}>
            entretien d&apos;une pompe à chaleur air-eau
          </Link>.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Un projet de pompe à chaleur air-eau en Île-de-France ?"
          description="Nos techniciens certifiés RGE QualiPAC étudient votre logement, conçoivent le schéma d'installation adapté à vos émetteurs et à votre eau chaude, et s'occupent de vos aides. Visite technique et devis gratuits sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur le schéma d&apos;installation d&apos;une pompe à chaleur air-eau
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
            { href: '/services/pompe-a-chaleur', kicker: 'Notre service', title: 'Installation de pompe à chaleur en Île-de-France', cta: 'Voir le service' },
            { href: '/blog/pompe-a-chaleur-air-eau-fonctionnement', kicker: 'Guide complémentaire', title: 'Pompe à chaleur air-eau : fonctionnement', cta: 'Lire le guide' },
            { href: '/blog/cout-installation-pompe-a-chaleur', kicker: 'Article associé', title: 'Coût d\'installation d\'une pompe à chaleur', cta: 'Lire le guide' },
            { href: '/blog/pompe-a-chaleur-chauffage-au-sol', kicker: 'Article associé', title: 'Pompe à chaleur et chauffage au sol', cta: 'Lire le guide' },
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
            Installation de pompe à chaleur par ville en Île-de-France
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
                href={`/services/pompe-a-chaleur/${city.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                Pompe à chaleur {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

      </ArticleLayout>
    </>
  )
}
