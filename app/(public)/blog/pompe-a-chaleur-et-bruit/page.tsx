import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  ArticleLayout, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSources, ArticleTable, ArticleSteps,
  ArticleImageSection, ArticleFullImage,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pompe-a-chaleur-et-bruit'

export const metadata: Metadata = {
  title: "Pompe à chaleur et bruit : causes, niveau sonore et solutions 2026 | Greenter",
  description:
    "Pompe à chaleur et bruit : quel est le niveau sonore réel d'une pompe à chaleur ? Causes du bruit, réglementation sur le voisinage et solutions pour réduire le bruit d'une pompe à chaleur air-eau ou air-air. Guide 2026.",
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: "Pompe à chaleur et bruit : causes, niveau sonore et solutions",
    description:
      "Bruit du compresseur, du ventilateur, réglementation sur les bruits de voisinage, caisson anti-bruit, plots anti-vibratiles : tout savoir sur le bruit d'une pompe à chaleur en 2026.",
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/pompe-a-chaleur-bruit-unite-exterieure-gravier-jardin.jpeg',
      width: 1200,
      height: 800,
      alt: "Unité extérieure de pompe à chaleur installée sur lit de gravier dans un jardin — pompe à chaleur et bruit",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pompe à chaleur et bruit : causes, niveau sonore et solutions",
    description:
      "Niveau sonore réel, réglementation sur le voisinage et solutions concrètes pour réduire le bruit d'une pompe à chaleur en 2026.",
    images: ['https://www.greenter.fr/images/blog/pompe-a-chaleur-bruit-unite-exterieure-gravier-jardin.jpeg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Pompe à chaleur et bruit", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PompeAChaleurEtBruit() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Pompe à chaleur et bruit : causes, niveau sonore et solutions 2026"
        description="Quel est le niveau sonore réel d'une pompe à chaleur ? Causes du bruit, réglementation sur le voisinage et solutions pour réduire le bruit d'une pompe à chaleur air-eau ou air-air."
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: ARTICLE_META.author, url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/pompe-a-chaleur-bruit-unite-exterieure-gravier-jardin.jpeg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={3100}
      />

      <ArticleLayout
        title="Pompe à chaleur et bruit : causes, niveau sonore et solutions 2026"
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        author={ARTICLE_META.author}
        heroImage="/images/blog/pompe-a-chaleur-bruit-unite-exterieure-gravier-jardin.jpeg"
        heroAlt="Unité extérieure blanche d'une pompe à chaleur air-eau posée sur lit de gravier dans un jardin, illustrant la question du bruit d'une pompe à chaleur"
        breadcrumbs={breadcrumbs}
      >

        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            La question <strong>pompe à chaleur et bruit</strong> revient dans
            presque tous les projets de rénovation énergétique. C&apos;est même,
            avec le prix, l&apos;une des premières inquiétudes exprimées par les
            propriétaires avant l&apos;<strong>installation d&apos;une pompe à
            chaleur</strong> : le voisin va-t-il se plaindre ? Va-t-on entendre
            l&apos;unité extérieure depuis la chambre ? Cette crainte est
            légitime — mais elle repose en grande partie sur des modèles
            anciens et des installations mal réalisées, pas sur la réalité des
            <strong> pompes à chaleur</strong> vendues aujourd&apos;hui.
          </p>
          <p>
            Une pompe à chaleur émet effectivement un bruit lors de son
            fonctionnement : c&apos;est un appareil mécanique, avec un
            compresseur et un ventilateur. Mais le <strong>niveau sonore</strong>
            d&apos;un modèle récent, correctement dimensionné et bien installé,
            reste comparable à celui d&apos;un lave-vaisselle ou d&apos;une
            conversation à voix basse. La différence entre une <strong>pompe à
            chaleur bruyante</strong> qui empoisonne les relations de voisinage
            et un appareil que l&apos;on oublie au bout d&apos;une semaine tient
            presque toujours aux mêmes facteurs : le choix du modèle,
            l&apos;emplacement de l&apos;unité extérieure et la qualité de la pose.
          </p>
          <p>
            Ce guide complet répond à toutes les questions que l&apos;on se pose
            sur le <strong>bruit d&apos;une pompe à chaleur</strong> : d&apos;où
            vient ce bruit, quel niveau sonore attendre selon les modèles de
            pompes à chaleur, ce que dit la loi sur les nuisances sonores et le
            voisinage, et surtout — les solutions concrètes pour réduire le
            bruit d&apos;une pompe à chaleur, que vous soyez en train de choisir
            votre appareil ou que vous cherchiez à atténuer le bruit d&apos;une
            installation déjà en place.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Pourquoi une pompe à chaleur émet un bruit et d&apos;où vient cette source de bruit</li>
            <li>Le niveau sonore réel d&apos;une pompe à chaleur air-eau, air-air ou géothermique</li>
            <li>Ce que dit le Code de la santé publique sur le bruit de voisinage</li>
            <li>Les solutions qui fonctionnent vraiment pour réduire le bruit d&apos;une pompe à chaleur</li>
            <li>Les erreurs d&apos;installation qui rendent une pompe à chaleur bruyante</li>
            <li>Que faire si votre pompe à chaleur devient bruyante après quelques mois ou années</li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 1 : POURQUOI ──────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi une pompe à chaleur émet-elle du bruit ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour comprendre comment réduire les nuisances sonores d&apos;une
          pompe à chaleur, il faut d&apos;abord savoir d&apos;où vient le bruit
          généré par l&apos;appareil. Une pompe à chaleur aérothermique (air-air
          ou air-eau) capte les calories de l&apos;air extérieur pour les
          restituer sous forme de chauffage ou d&apos;eau chaude. Ce transfert
          d&apos;énergie repose sur un cycle thermodynamique qui fait intervenir
          plusieurs composants mécaniques, chacun étant une source de bruit
          potentielle.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Le compresseur, principale source de bruit
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Le compresseur comprime le fluide frigorigène pour élever sa
          température : c&apos;est le cœur mécanique de la pompe à chaleur, et
          la source de bruit la plus caractéristique. Sur les modèles récents,
          le compresseur est de type inverter (à vitesse variable), ce qui
          permet de moduler sa puissance selon les besoins réels et donc de
          réduire le bruit généré en dehors des pics de demande — contrairement
          aux anciens compresseurs tout-ou-rien, qui démarraient et
          s&apos;arrêtaient brutalement à pleine puissance, avec un bruit
          particulier à chaque cycle.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Le ventilateur de l&apos;unité extérieure
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Le ventilateur de l&apos;<strong>unité extérieure</strong> brasse
          l&apos;air ambiant à travers l&apos;échangeur thermique. C&apos;est
          souvent lui, et non le compresseur, que l&apos;on entend le plus au
          quotidien, car son bruit — un bruit de fond continu, proche d&apos;un
          souffle d&apos;air — se propage plus facilement à distance. La taille
          des pales, leur vitesse de rotation et la qualité des roulements
          influencent directement le niveau de bruit généré : un ventilateur
          plus grand tournant plus lentement est presque toujours plus
          silencieux qu&apos;un petit ventilateur à haute vitesse pour une
          puissance de chauffage équivalente.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Les vibrations transmises au bâti
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Un troisième phénomène, souvent sous-estimé, aggrave le bruit
          perçu : les vibrations d&apos;une pompe à chaleur peuvent se
          transmettre au mur, au socle ou à la dalle sur lesquels elle repose,
          puis se propager dans toute la structure du bâtiment sous forme de
          bruit solidien. C&apos;est ce mécanisme qui explique qu&apos;une
          pompe à chaleur mal fixée puisse s&apos;entendre depuis une chambre
          située à l&apos;étage, alors même que son niveau sonore mesuré à
          l&apos;extérieur reste dans la norme.
        </p>

        <ArticleStat stats={[
          { value: '35–60 dB(A)', label: 'niveau sonore courant d\'une pompe à chaleur à 1 m de l\'unité extérieure', color: 'blue' },
          { value: '5 dB(A)', label: 'émergence sonore maximale tolérée le jour au niveau du terrain voisin', color: 'green' },
          { value: '3 dB(A)', label: 'émergence sonore maximale tolérée la nuit (22h-7h)', color: 'amber' },
        ]} />

        {/* ── SECTION 2 : NIVEAU SONORE ─────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel est le niveau sonore d&apos;une pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le niveau sonore d&apos;une pompe à chaleur varie selon le modèle, la
          puissance, le régime de fonctionnement (démarrage, régime nominal,
          mode nuit) et la distance à laquelle la mesure est effectuée. Les
          fabricants indiquent deux valeurs sur la fiche technique : le niveau
          de puissance acoustique (Lw, mesuré en laboratoire selon la norme NF
          EN 12102, indépendant de la distance) et le niveau de pression
          acoustique (Lp, exprimé à une distance donnée, généralement 1 ou 5
          mètres). C&apos;est ce second chiffre qui donne une idée concrète du
          bruit ambiant perçu près de l&apos;appareil.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-bruit-unite-exterieure-ventilateur-jardin.jpeg"
          alt="Gros plan sur le ventilateur d'une unité extérieure de pompe à chaleur dans un jardin, source principale du bruit ambiant perçu"
          imagePosition="right"
        >
          <p className="text-slate-700 leading-relaxed">
            À titre de repère, le bruit d&apos;une pompe à chaleur au régime
            nominal se situe généralement entre 40 et 55 dB(A) à 1 mètre pour
            un modèle résidentiel de 6 à 16 kW — un niveau comparable à une
            conversation à voix normale (60 dB) ou à un réfrigérateur (40 dB).
            En mode nuit silencieux, la plupart des modèles descendent à 30-38
            dB(A), un niveau proche du bruit de fond d&apos;une pièce calme.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Le bruit perçu par l&apos;oreille humaine double subjectivement
            tous les 10 dB(A) : une différence de 3 dB(A) est à peine
            perceptible, tandis qu&apos;un écart de 10 dB(A) change radicalement
            la sensation sonore. C&apos;est pourquoi comparer les modèles de
            pompes à chaleur uniquement sur leur puissance de chauffage, sans
            regarder leur fiche acoustique, peut réserver de mauvaises
            surprises une fois l&apos;appareil installé.
          </p>
        </ArticleImageSection>

        <ArticleTable
          title="Niveau sonore indicatif par type de pompe à chaleur (à 1 m, régime nominal)"
          columns={[
            { header: 'Type de pompe à chaleur', key: 'type' },
            { header: 'Niveau sonore courant', key: 'niveau', highlight: true },
            { header: 'Source principale du bruit', key: 'source' },
          ]}
          rows={[
            { type: 'Pompe à chaleur air-air', niveau: '45–58 dB(A)', source: 'Ventilateur intérieur et extérieur' },
            { type: 'Pompe à chaleur air-eau', niveau: '40–55 dB(A)', source: 'Compresseur et ventilateur extérieur' },
            { type: 'Pompe à chaleur géothermique', niveau: '30–42 dB(A)', source: 'Compresseur (souvent en intérieur)' },
          ]}
          caption="Valeurs indicatives à régime nominal — se référer à la fiche technique du fabricant (norme NF EN 12102) pour un modèle précis."
        />

        <p className="text-slate-700 leading-relaxed mb-4 mt-6">
          Les <strong>pompes à chaleur géothermiques</strong> affichent
          généralement le niveau de bruit le plus bas, car leur compresseur est
          souvent installé à l&apos;intérieur d&apos;un local technique et ne
          comporte pas d&apos;unité extérieure exposée à l&apos;air libre avec
          ventilateur. Entre une <strong>pompe à chaleur air-eau</strong> et une
          pompe à chaleur air-air, l&apos;écart de bruit est généralement plus
          faible que ce que l&apos;on pense — il dépend surtout de la qualité
          du modèle et de son <strong>installation</strong> que du type de
          technologie retenu. Notre guide sur le{' '}
          <Link href="/blog/rendement-pompe-a-chaleur" className="text-emerald-700 font-semibold hover:underline">
            rendement d&apos;une pompe à chaleur
          </Link>{' '}
          détaille d&apos;ailleurs comment la puissance et le dimensionnement de
          l&apos;appareil influencent à la fois sa performance énergétique et
          son fonctionnement acoustique au quotidien.
        </p>

        {/* ── SECTION 3 : DIFFERENCES SELON TYPE ───────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pompe à chaleur air-air, air-eau ou géothermique : quelles différences de bruit ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une <strong>pompe à chaleur air-air</strong> comporte une unité
          extérieure et une ou plusieurs unités intérieures (les splits). Le
          bruit généré côté intérieur reste en général très faible (20-30
          dB(A) en mode confort), mais le bruit de l&apos;<strong>unité
          extérieure</strong> reste le point de vigilance principal, exactement
          comme pour une pompe à chaleur air-eau. Une{' '}
          <strong>pompe à chaleur air-eau</strong> ne comporte qu&apos;une seule
          unité extérieure reliée au circuit de chauffage central ou au{' '}
          <Link href="/blog/pompe-a-chaleur-chauffage-au-sol" className="text-emerald-700 font-semibold hover:underline">
            plancher chauffant
          </Link>{' '}
          — l&apos;absence d&apos;unité intérieure bruyante en fait souvent un
          choix perçu comme plus discret à l&apos;intérieur du logement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les <strong>pompes à chaleur géothermiques</strong> captent les
          calories dans le sol via des capteurs enterrés ou des sondes
          verticales, sans échange direct avec l&apos;air ambiant extérieur.
          Leur unité de production de chaleur est installée en intérieur, ce
          qui supprime la principale source de bruit perçue par le voisinage —
          le ventilateur exposé à l&apos;air libre. En contrepartie, leur coût
          d&apos;installation est nettement supérieur à celui d&apos;une pompe
          à chaleur aérothermique, ce qui explique que les pompes à chaleur
          <strong> aérothermiques</strong> (air-air et air-eau) restent de loin
          les plus installées en France pour l&apos;habitat individuel.
        </p>

        <ArticleCallout type="tip" title="Ce qui influence vraiment le bruit, au-delà du type de pompe à chaleur">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>La qualité du modèle</strong> : compresseur inverter, ventilateur à basse vitesse, capot insonorisé</li>
            <li><strong>Le dimensionnement</strong> : une pompe à chaleur surdimensionnée fonctionne par à-coups, plus bruyants qu&apos;un régime stable</li>
            <li><strong>L&apos;emplacement</strong> : orientation, distance aux ouvertures, présence de surfaces réfléchissantes</li>
            <li><strong>La pose</strong> : plots anti-vibratiles, fixation rigide, absence de contact direct avec le mur porteur</li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 4 : REGLEMENTATION ────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Que dit la loi sur le bruit d&apos;une pompe à chaleur et le voisinage ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Contrairement à une idée répandue, il n&apos;existe pas de seuil
          unique en décibels ni de distance minimale fixée nationalement pour
          l&apos;<strong>installation d&apos;une pompe à chaleur</strong> par
          rapport à un terrain voisin. La réglementation applicable, prévue par
          le <strong>Code de la santé publique</strong> (articles R1336-5 à
          R1336-11) et précisée par l&apos;arrêté du 27 février 2019 relatif
          aux <strong>bruits de voisinage</strong>, repose sur la notion
          <strong> d&apos;émergence sonore</strong> : la différence entre le
          niveau de bruit ambiant mesuré chez le voisin avec la pompe à chaleur
          en fonctionnement, et le niveau de bruit résiduel mesuré sans elle.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Cette émergence ne doit pas dépasser <strong>5 dB(A) le jour</strong>
          (7h-22h) et <strong>3 dB(A) la nuit</strong> (22h-7h), avec une
          tolérance supplémentaire variable selon la durée d&apos;apparition
          du bruit. Au-delà de ces seuils, on parle de <strong>bruit
          anormal</strong> de voisinage, que le maire ou la police municipale
          peuvent constater sur plainte, via une mesure sonométrique réalisée
          par un technicien assermenté directement chez la personne qui se
          plaint — et non depuis le jardin de celui qui possède la pompe à
          chaleur. C&apos;est une différence importante : le seuil ne
          s&apos;applique pas au bruit émis à la source, mais bien à
          l&apos;émergence perçue chez le tiers concerné.
        </p>

        <ArticleCallout type="warning" title="Anticiper plutôt que subir un litige de voisinage">
          <p>
            La grande majorité des conflits liés au bruit d&apos;une pompe à
            chaleur pourraient être évités par une simple anticipation avant
            travaux : prévenir le voisin du projet d&apos;installation,
            choisir un emplacement qui limite l&apos;exposition de ses
            fenêtres, et demander à l&apos;installateur RGE une fiche
            technique précisant le niveau de puissance acoustique du modèle
            retenu. Un installateur QualiPAC sérieux sait dimensionner
            l&apos;implantation pour respecter les seuils réglementaires dès
            la conception du projet, plutôt que de devoir corriger
            l&apos;installation après coup.
          </p>
        </ArticleCallout>

        {/* ── SECTION 5 : SOLUTIONS ─────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment réduire le bruit d&apos;une pompe à chaleur ? Les solutions qui fonctionnent
        </h2>

        <p className="text-slate-700 leading-relaxed mb-8">
          Qu&apos;il s&apos;agisse d&apos;anticiper avant l&apos;achat ou
          d&apos;atténuer le bruit d&apos;une installation déjà en place,
          plusieurs leviers permettent concrètement de réduire les nuisances
          sonores d&apos;une pompe à chaleur — souvent en les combinant.
        </p>

        <ArticleSteps steps={[
          {
            title: "Bien choisir l'emplacement de l'unité extérieure",
            detail: "Éviter les angles fermés, les cours intérieures ou les espaces entre deux murs qui favorisent la réverbération du bruit. Orienter la sortie d'air à l'écart des fenêtres de chambres — les vôtres et celles du voisinage — et privilégier un support éloigné des chambres à coucher.",
            duration: "Étude préalable",
          },
          {
            title: "Poser des plots anti-vibratiles ou des silent-blocs",
            detail: "Ces supports en caoutchouc ou à ressort absorbent les vibrations du compresseur et du ventilateur avant qu'elles n'atteignent le sol, le mur ou le socle, coupant ainsi la transmission du bruit solidien vers l'intérieur du bâtiment.",
            duration: "0,5 jour",
          },
          {
            title: "Installer un caisson anti-bruit ou un écran acoustique",
            detail: "Un caisson en bois ajouré ou un écran acoustique placé entre l'unité extérieure et la zone sensible (terrasse, chambre, terrain voisin) atténue la propagation du bruit tout en préservant la circulation d'air nécessaire au bon fonctionnement de l'appareil.",
            duration: "1 jour",
          },
          {
            title: "Activer le mode nuit silencieux",
            detail: "La plupart des modèles récents proposent un mode qui réduit automatiquement la vitesse du ventilateur et la puissance du compresseur la nuit, au prix d'une légère perte de performance de chauffage, largement compensée par le gain de tranquillité pour le voisinage.",
            duration: "Réglage",
          },
          {
            title: "Vérifier régulièrement la fixation et l'entretien",
            detail: "Un panneau de carrosserie desserré, un ventilateur encrassé ou un roulement usé peuvent faire grimper le niveau de bruit de façon disproportionnée. Un contrat d'entretien annuel avec un professionnel RGE permet de détecter ces anomalies avant qu'elles ne s'aggravent.",
            duration: "1x/an",
          },
        ]} />

        <ArticleFullImage
          image="/images/blog/pompe-a-chaleur-bruit-caisson-anti-bruit-bois-jardin.jpg"
          alt="Caisson anti-bruit en bois ajouré installé autour d'une unité extérieure de pompe à chaleur dans un jardin, pour atténuer le bruit perçu par le voisinage"
          caption="Un caisson anti-bruit en bois ajouré atténue la propagation du bruit vers le voisinage tout en laissant circuler l'air nécessaire au fonctionnement de la pompe à chaleur."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          Ces solutions se combinent efficacement : un emplacement bien choisi,
          des plots anti-vibratiles et un caisson anti-bruit permettent souvent
          de gagner 6 à 10 dB(A) par rapport à une installation standard posée
          sans précaution particulière — un écart largement suffisant pour
          transformer une pompe à chaleur perçue comme gênante en un appareil
          qui passe totalement inaperçu au quotidien.
        </p>

        {/* ── SECTION 6 : ERREURS ──────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les erreurs qui rendent une pompe à chaleur bruyante
        </h2>

        <p className="text-slate-700 leading-relaxed mb-8">
          La plupart des cas de <strong>pompe à chaleur bruyante</strong>
          signalés par nos clients proviennent d&apos;une poignée
          d&apos;erreurs récurrentes, commises lors du choix du modèle ou de
          l&apos;installation. Notre article sur les{' '}
          <Link href="/blog/pompe-a-chaleur-piege-a-eviter" className="text-emerald-700 font-semibold hover:underline">
            10 pièges à éviter avec une pompe à chaleur
          </Link>{' '}
          couvre plus largement les erreurs fréquentes ; voici les cinq qui
          concernent spécifiquement le bruit.
        </p>

        <div className="space-y-6 my-8">
          {[
            {
              num: 1,
              titre: "Choisir un modèle sans regarder sa fiche acoustique",
              texte: "Se focaliser uniquement sur le prix ou le COP en ignorant le niveau de puissance acoustique (Lw) indiqué sur la fiche technique. Deux pompes à chaleur de puissance équivalente peuvent afficher un écart de 8 à 10 dB(A) — soit une différence de bruit ressentie très importante — sans que cela se voie sur le prix de vente.",
            },
            {
              num: 2,
              titre: "Poser l'unité extérieure sans plots anti-vibratiles",
              texte: "Fixer directement l'appareil sur un mur porteur ou un socle rigide sans interposer de plots anti-vibratiles transforme le mur en caisse de résonance : les vibrations du compresseur se propagent dans toute la structure du bâtiment, parfois jusqu'à l'étage.",
            },
            {
              num: 3,
              titre: "Orienter l'unité vers une cour fermée ou le terrain voisin",
              texte: "Une unité extérieure orientée vers un espace fermé entre deux murs, ou directement vers la fenêtre du voisin, favorise la réverbération du bruit et concentre l'émergence sonore exactement là où elle sera la plus mal perçue.",
            },
            {
              num: 4,
              titre: "Surdimensionner la pompe à chaleur",
              texte: "Une pompe à chaleur trop puissante pour le logement fonctionne par cycles courts et répétés (marche-arrêt fréquent) plutôt qu'à un régime stable et modulé, ce qui génère davantage de bruit de démarrage et use prématurément le compresseur. Notre guide sur le calcul de la puissance pompe à chaleur détaille comment éviter cette erreur de dimensionnement.",
            },
            {
              num: 5,
              titre: "Négliger l'entretien annuel",
              texte: "Un ventilateur encrassé par les feuilles ou la poussière, un manque de fluide frigorigène ou un roulement usé font progressivement grimper le niveau de bruit généré, souvent de façon si progressive que les occupants du logement ne s'en rendent pas compte avant que le voisinage ne s'en plaigne.",
            },
          ].map((e) => (
            <div key={e.num} className="flex gap-4 rounded-xl border border-amber-100 bg-amber-50 p-5">
              <span className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-sm">
                {e.num}
              </span>
              <div>
                <p className="font-bold text-slate-900 mb-2">{e.titre}</p>
                <p className="text-slate-700 leading-relaxed text-sm">{e.texte}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECTION 7 : DIAGNOSTIC ────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pompe à chaleur bruyante après installation : diagnostiquer et agir
        </h2>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-bruit-unite-exterieure-fenetre-voisinage.jpeg"
          alt="Unité extérieure de pompe à chaleur installée près d'une fenêtre, illustrant l'importance de l'emplacement pour la tranquillité du voisinage"
          imagePosition="left"
        >
          <p className="text-slate-700 leading-relaxed">
            Si votre <strong>pompe à chaleur fait du bruit</strong> alors
            qu&apos;elle fonctionnait normalement jusque-là, commencez par
            identifier le type de bruit émis : un cliquetis régulier évoque
            souvent un panneau de carrosserie desserré, un sifflement aigu
            peut signaler un manque de fluide frigorigène, tandis qu&apos;un
            grondement sourd et continu pointe généralement vers un roulement
            de ventilateur ou de compresseur en fin de vie.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Notre article sur la{' '}
            <Link href="/blog/duree-de-vie-pompe-a-chaleur" className="text-emerald-700 font-semibold hover:underline">
              durée de vie d&apos;une pompe à chaleur
            </Link>{' '}
            détaille les signes d&apos;usure à surveiller — le bruit croissant
            en fait partie, au même titre qu&apos;une baisse de rendement.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si le bruit persiste malgré ces vérifications, faites réaliser un
          diagnostic par votre installateur RGE QualiPAC : il pourra mesurer
          objectivement le niveau sonore de l&apos;appareil, comparer la valeur
          relevée à celle annoncée par le fabricant, et identifier si le
          problème vient d&apos;un défaut de l&apos;appareil (couvert par la
          garantie), d&apos;un défaut de pose (à corriger par
          l&apos;installateur), ou d&apos;un emplacement à repenser. En cas de
          désaccord persistant sur un bruit de voisinage, la mairie peut
          faire réaliser une mesure sonométrique officielle pour trancher
          objectivement le litige.
        </p>

        <ArticleCallout type="info" title="Récapitulatif : bien vivre avec sa pompe à chaleur, sans bruit">
          <ul className="space-y-2 mt-2 text-sm">
            <li><strong>Avant l&apos;achat :</strong> comparer le niveau de puissance acoustique (Lw) des modèles, pas seulement le prix</li>
            <li><strong>À l&apos;installation :</strong> emplacement réfléchi, plots anti-vibratiles, orientation à l&apos;écart des chambres</li>
            <li><strong>En cas de gêne persistante :</strong> caisson anti-bruit ou écran acoustique en complément</li>
            <li><strong>Au quotidien :</strong> mode nuit silencieux activé, entretien annuel programmé</li>
            <li><strong>En cas de litige de voisinage :</strong> mesure de l&apos;émergence sonore, pas du niveau brut à la source</li>
          </ul>
        </ArticleCallout>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <ArticleCTA
          title="Installation de pompe à chaleur silencieuse en Île-de-France — devis RGE sous 48h"
          description="Nos techniciens certifiés RGE QualiPAC étudient l'emplacement idéal pour votre unité extérieure, sélectionnent un modèle adapté à votre besoin réel et posent les équipements anti-vibratiles nécessaires. Devis gratuit sous 48h."
        />

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur la pompe à chaleur et le bruit
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

        {/* ── SOURCES ────────────────────────────────────────────────────── */}
        <ArticleSources sources={SOURCES} />

        {/* ── LIENS INTERNES ─────────────────────────────────────────────── */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/services/pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur en Île-de-France
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/puissance-pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Puissance pompe à chaleur : comment bien la calculer
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/pompe-a-chaleur-piege-a-eviter"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur : 10 pièges à éviter en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/duree-de-vie-pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Durée de vie d&apos;une pompe à chaleur : tout savoir
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ── LIENS VILLES ───────────────────────────────────────────────── */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Installation de pompe à chaleur par ville en Île-de-France
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Ozoir-la-Ferrière", slug: "ozoir-la-ferriere" },
              { name: "Pontault-Combault", slug: "pontault-combault" },
              { name: "Roissy-en-Brie", slug: "roissy-en-brie" },
              { name: "Brie-Comte-Robert", slug: "brie-comte-robert" },
              { name: "Tournan-en-Brie", slug: "tournan-en-brie" },
              { name: "Créteil", slug: "creteil" },
              { name: "Versailles", slug: "versailles" },
              { name: "Meaux", slug: "meaux" },
              { name: "Massy", slug: "massy" },
              { name: "Vincennes", slug: "vincennes" },
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
