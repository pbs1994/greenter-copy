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
  ARTICLE_META, RENTABILITE_TABLE, DUREE_TABLE, PROJET_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/avantages-panneaux-solaires'

const HERO_IMAGE = '/images/blog/avantages-panneaux-solaires-toiture-tuiles-panneaux-noirs.jpg'
const HERO_ALT = "Panneaux solaires noirs posés sur une toiture en tuiles canal d'une maison entourée d'arbres, illustrant les avantages des panneaux solaires pour un particulier"

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
      height: 900,
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
  { name: 'Avantages des panneaux solaires', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function AvantagesPanneauxSolaires() {
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
            Il y a encore trois ans, on installait des panneaux solaires en partie pour revendre
            l&apos;électricité à EDF. Ce modèle a vécu. Depuis le 5 juin 2026, la prime à
            l&apos;autoconsommation a disparu pour les nouvelles installations et le surplus
            injecté sur le réseau n&apos;est plus racheté qu&apos;un peu plus d&apos;un centime
            le kWh.
          </p>
          <p>
            Les <strong>avantages des panneaux solaires</strong> n&apos;ont pas disparu pour
            autant. Ils se sont déplacés. Aujourd&apos;hui, une installation photovoltaïque est
            intéressante quand elle remplace l&apos;électricité que vous achetez, facturée près
            de 20 centimes le kWh, par une électricité produite sur votre toit. Tout le calcul
            repose sur une question : quelle part de votre production pourrez-vous consommer
            vous-même ?
          </p>
          <p>
            Nous faisons ici le point, chiffres à l&apos;appui, sur ce que des panneaux
            solaires rapportent réellement à un foyer d&apos;Île-de-France en 2026, sur ce
            qu&apos;ils apportent au-delà de la facture, et sur les limites qu&apos;un
            installateur honnête doit vous signaler avant de signer.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Ce que la réforme de juin 2026 change pour un particulier</li>
            <li>L&apos;autoconsommation, premier avantage des panneaux solaires</li>
            <li>La rentabilité chiffrée pour quatre profils de foyer</li>
            <li>Durée de vie, entretien, bilan carbone, DPE : les autres bénéfices</li>
            <li>Les limites à connaître et les étapes d&apos;un projet réussi</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : CONTEXTE 2026 ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Avantages des panneaux solaires : ce qui a changé en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Deux décisions publiques ont redessiné le marché du solaire résidentiel en moins
          d&apos;un an. La première est favorable : depuis le 1er octobre 2025, les
          installations jusqu&apos;à 9 kWc bénéficient d&apos;une TVA à 5,5 % sur le matériel
          et la pose, au lieu de 10 % jusqu&apos;à 3 kWc et 20 % au-delà. Pour une installation
          de 6 kWc facturée 10 000 € HT, la facture passe ainsi de 12 000 € à 10 550 € TTC.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La seconde est moins favorable. L&apos;arrêté du 1er juin 2026, publié au Journal
          officiel le 4 juin, a supprimé la prime à l&apos;autoconsommation pour les demandes
          de raccordement déposées à partir du 5 juin. Il a aussi abaissé le tarif de rachat
          du surplus à environ 1,1 c€ HT par kWh, contre 4 c€ quelques semaines plus tôt, et
          plus de 10 c€ en 2024.
        </p>

        <ArticleStat stats={[
          { value: '5,5 %', label: 'TVA sur une installation jusqu\'à 9 kWc, matériel et pose compris, depuis octobre 2025', color: 'green' },
          { value: '≈ 1,1 c€', label: 'prix de rachat HT du kWh injecté sur le réseau pour les nouveaux contrats depuis juin 2026', color: 'amber' },
          { value: '≈ 19,5 c€', label: 'prix TTC d\'un kWh acheté au réseau en option base, abonnement non compris', color: 'blue' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-4">
          Mis côte à côte, ces trois chiffres disent l&apos;essentiel. Un kWh que vous
          consommez vous-même vaut environ dix-sept fois plus qu&apos;un kWh que vous revendez.
          Une installation pensée pour la revente n&apos;a donc plus de sens pour un
          particulier, et la vente de la totalité de la production n&apos;est d&apos;ailleurs
          plus possible sous 9 kWc. À l&apos;inverse, une installation dimensionnée pour être
          consommée sur place garde un vrai intérêt économique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si votre demande de raccordement a été acceptée par Enedis avant le 5 juin 2026,
          rien ne change pour vous : la prime et le tarif de rachat en vigueur à cette date
          restent acquis pour la durée du contrat, soit vingt ans.
        </p>

        {/* ---- SECTION 2 : AUTOCONSOMMATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Le premier avantage des panneaux solaires : une facture qui baisse durablement
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le principe de l&apos;autoconsommation est simple. Les panneaux produisent du courant
          continu, que l&apos;onduleur transforme en courant alternatif injecté dans le tableau
          électrique de la maison. Vos appareils en marche à ce moment-là consomment cette
          électricité en priorité. Ce qui n&apos;est pas utilisé part sur le réseau public et
          vous est racheté au tarif du surplus.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Chaque kWh autoconsommé est un kWh que votre fournisseur ne vous facture pas, avec
          les taxes et le coût d&apos;acheminement qui l&apos;accompagnent. C&apos;est pour
          cette raison que l&apos;avantage financier des panneaux solaires dépend moins de la
          puissance installée que du <strong>taux d&apos;autoconsommation</strong>, la part de
          la production réellement utilisée dans le logement.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Pourquoi le taux d&apos;autoconsommation fait toute la différence
        </h3>

        <ArticleImageSection
          image="/images/blog/avantages-panneaux-solaires-maison-toit-tuiles-arbre.jpg"
          alt="Rangées de panneaux photovoltaïques fixés sur un toit en tuiles mécaniques rouges, sous un ciel bleu, avec un grand chêne en arrière-plan"
          imagePosition="right"
        >
          <p>
            Une installation de 3 kWc comme celle-ci produit environ 3 300 kWh par an en
            Île-de-France, avec un pic entre 11 h et 15 h.
          </p>
          <p className="mt-3">
            Si personne n&apos;est à la maison à ces heures-là, une grande partie de cette
            électricité part sur le réseau pour presque rien.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans un foyer absent toute la journée, sans pilotage particulier, le taux
          d&apos;autoconsommation plafonne souvent entre 30 et 40 %. Le réfrigérateur, la box
          internet et les appareils en veille consomment en continu, mais ils ne représentent
          que quelques centaines de watts. Le reste de la production, celui des belles
          après-midi, est injecté.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le même foyer peut monter à 55 ou 65 % sans rien changer à son mode de vie, en
          programmant simplement le lave-linge, le lave-vaisselle et surtout le ballon
          d&apos;eau chaude sur les heures ensoleillées. Un cumulus électrique de 200 litres
          absorbe à lui seul 2 à 3 kWh par jour, soit une bonne part de la production
          d&apos;une installation de 3 kWc.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Ballon d&apos;eau chaude, pompe à chaleur, voiture : augmenter la part consommée
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les foyers qui tirent le meilleur parti des panneaux solaires sont ceux qui possèdent
          des équipements capables de « stocker » l&apos;énergie sous une autre forme. Un ballon
          d&apos;eau chaude chauffé à midi garde sa chaleur jusqu&apos;au soir. Une voiture
          électrique rechargée le week-end ou en télétravail fait le plein gratuitement. Une{' '}
          <Link href="/services/pompe-a-chaleur" className={linkCls}>pompe à chaleur</Link>{' '}
          produit l&apos;eau chaude sanitaire en journée et, au printemps comme à
          l&apos;automne, couvre une partie du chauffage avec l&apos;électricité solaire.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;association panneaux solaires et pompe à chaleur air-eau est
          particulièrement cohérente : la PAC divise par trois environ la consommation de
          chauffage par rapport à des radiateurs électriques, et les panneaux couvrent une
          partie de ce qui reste. Pour comprendre comment la PAC utilise l&apos;électricité,
          lisez notre article sur le{' '}
          <Link href="/blog/pompe-a-chaleur-air-eau-fonctionnement" className={linkCls}>
            fonctionnement d&apos;une pompe à chaleur air-eau
          </Link>.
        </p>

        <ArticleCallout type="tip" title="La batterie, un complément et non un point de départ">
          <p>
            Une batterie domestique stocke l&apos;électricité de la journée pour la soirée et
            fait grimper l&apos;autoconsommation à 75 ou 85 %. Elle a gagné en intérêt avec la
            baisse du tarif de rachat, mais elle coûte plusieurs milliers d&apos;euros. Dans la
            plupart des maisons, mieux vaut d&apos;abord piloter le ballon et les gros appareils,
            puis envisager une{' '}
            <Link href="/produits/batterie-solaire-kstar-6kw" className={linkCls}>
              batterie solaire
            </Link>{' '}
            si la consommation du soir reste élevée.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : RENTABILITE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Combien rapportent des panneaux solaires ? Quatre exemples chiffrés
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour que les chiffres aient un sens, il faut les rapporter à une situation réelle.
          Le tableau ci-dessous compare quatre profils de maisons en Île-de-France, avec des
          prix et un tarif de l&apos;électricité de 2026. Les hypothèses sont volontairement
          prudentes : aucun scénario ne suppose de hausse du prix de l&apos;électricité.
        </p>

        <ArticleTable {...RENTABILITE_TABLE} title="Avantage financier des panneaux solaires selon le profil du foyer" />

        <p className="text-slate-700 leading-relaxed mb-4">
          La première ligne montre ce qu&apos;il faut éviter : une petite installation dans un
          logement vide en journée, dont l&apos;électricité est surtout revendue. Le
          rendement de l&apos;investissement y est faible. À l&apos;autre bout, une maison
          équipée d&apos;une pompe à chaleur et d&apos;un véhicule électrique valorise
          l&apos;essentiel de sa production et économise 800 à 900 € par an.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le cas de la batterie mérite d&apos;être lu attentivement. Elle augmente bien le
          gain annuel, mais son coût fait reculer le retour sur investissement de deux à trois
          ans. Elle se justifie surtout quand la consommation du soir est forte et que le
          pilotage des appareils a atteint ses limites.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Gardez enfin en tête l&apos;horizon de temps. Avec un retour sur investissement de
          13 à 15 ans pour une installation bien utilisée, il reste quinze à vingt-cinq ans de
          production quasiment gratuite. Et si le prix de l&apos;électricité continue de
          progresser de 2 à 3 % par an, comme sur les quinze dernières années en moyenne,
          l&apos;installation est remboursée deux à trois ans plus tôt. Pour une estimation
          adaptée à votre toiture, utilisez notre{' '}
          <Link href="/simulateur-solaire" className={linkCls}>simulateur solaire</Link>.
        </p>

        {/* ---- SECTION 4 : DUREE DE VIE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Une installation durable qui demande très peu d&apos;entretien
        </h2>

        <ArticleImageSection
          image="/images/blog/avantages-panneaux-solaires-modules-photovoltaiques-ciel-bleu.jpg"
          alt="Gros plan sur des modules photovoltaïques monocristallins alignés, dans lesquels se reflètent les nuages d'un ciel bleu d'été"
          imagePosition="left"
        >
          <p>
            Un panneau photovoltaïque n&apos;a aucune pièce mobile. Les cellules de silicium
            sont protégées par un verre trempé et un cadre en aluminium conçus pour résister à
            la grêle, au vent et au gel.
          </p>
          <p className="mt-3">
            C&apos;est ce qui explique leur longévité, bien supérieure à celle de la plupart
            des équipements de la maison.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          La durée de vie est l&apos;un des avantages des panneaux solaires les plus sous-estimés.
          Les premiers modules installés en Europe dans les années 1980 produisent encore. Les
          fabricants garantissent aujourd&apos;hui 80 à 90 % de la puissance d&apos;origine au
          bout de 25 ou 30 ans, ce qui correspond à une perte de 0,3 à 0,5 % par an.
        </p>

        <ArticleTable {...DUREE_TABLE} title="Durée de vie et garanties d'une installation photovoltaïque" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Le maillon le plus fragile est l&apos;onduleur central, qu&apos;il faut prévoir de
          remplacer une fois, pour 1 000 à 2 000 €. Les micro-onduleurs, fixés sous chaque
          panneau, ont une durée de vie proche de celle des modules et rendent
          l&apos;installation moins sensible à l&apos;ombre d&apos;une cheminée ou d&apos;un
          arbre.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Côté entretien, la pluie suffit le plus souvent à nettoyer des panneaux inclinés à
          plus de 15°. Un contrôle visuel annuel, un coup d&apos;œil régulier à
          l&apos;application de suivi et, en cas de baisse anormale de production, une visite
          de l&apos;installateur suffisent. Pas de ramonage, pas de recharge en fluide, pas de
          pièce d&apos;usure : peu d&apos;équipements énergétiques sont aussi sobres.
        </p>

        {/* ---- SECTION 5 : ECOLOGIE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les avantages écologiques des panneaux solaires, sans exagération
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une électricité solaire n&apos;émet rien pendant sa production. Son empreinte carbone
          vient presque entièrement de la fabrication des modules, majoritairement réalisée en
          Asie. Sur l&apos;ensemble du cycle de vie, la base de données de l&apos;ADEME retient
          de l&apos;ordre de 25 à 45 g de CO2 par kWh, selon l&apos;origine des panneaux.
        </p>

        <ArticleStat stats={[
          { value: '25 à 45 g', label: 'de CO2 par kWh solaire sur tout le cycle de vie (ADEME)', color: 'green' },
          { value: '1 à 3 ans', label: 'pour qu\'un panneau rembourse l\'énergie consommée par sa fabrication', color: 'blue' },
          { value: '> 90 %', label: 'de la masse d\'un panneau recyclée en fin de vie par la filière Soren', color: 'green' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-4">
          Ces chiffres méritent d&apos;être replacés dans le contexte français. Notre
          électricité, d&apos;origine nucléaire et hydraulique en grande partie, est déjà
          l&apos;une des moins carbonées d&apos;Europe. Le gain climatique d&apos;un kWh solaire
          produit en France est donc plus modeste qu&apos;en Allemagne ou en Pologne. Il reste
          réel, en particulier quand la production solaire évite de faire tourner des
          centrales à gaz en fin de journée ou alimente une voiture à la place de
          l&apos;essence.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La fin de vie est désormais bien organisée. Les panneaux sont des déchets
          d&apos;équipements électriques : leur recyclage est financé par une éco-participation
          payée à l&apos;achat. Le verre, l&apos;aluminium du cadre, le cuivre et le silicium
          sont récupérés. Une installation remplacée après trente ans ne finit pas en décharge.
        </p>

        {/* ---- SECTION 6 : DPE / VALEUR / AUTONOMIE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          DPE, valeur du logement, indépendance : les avantages moins connus
        </h2>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Un DPE amélioré, mais rarement d&apos;une classe entière
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Depuis la réforme du diagnostic de performance énergétique de 2021, la production
          photovoltaïque autoconsommée est déduite de la consommation d&apos;énergie du
          logement. Des panneaux solaires peuvent donc faire gagner des points au DPE. Dans une
          maison chauffée au gaz ou au fioul, l&apos;effet reste limité, car le solaire ne
          couvre que l&apos;électricité. Dans une maison tout électrique ou équipée d&apos;une
          pompe à chaleur, il peut aider à franchir un seuil. Si vous visez un saut de classe,
          un{' '}
          <Link href="/services/audit" className={linkCls}>audit énergétique</Link>{' '}
          indique quels travaux combiner, l&apos;isolation passant généralement en premier.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Une valeur verte pour le bien immobilier
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Une maison qui affiche une facture d&apos;électricité réduite et un équipement
          récent sous garantie se vend plus facilement. L&apos;effet sur le prix est difficile
          à isoler et varie d&apos;un marché local à l&apos;autre, mais les notaires constatent
          une prime pour les logements bien classés au DPE. Conservez soigneusement les
          factures, les garanties et le contrat de rachat : ils se transmettent à
          l&apos;acquéreur.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Moins exposé aux hausses de prix, mais pas autonome
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Le tarif réglementé de l&apos;électricité a augmenté de près de 60 % entre 2021 et
          2024, avant une baisse partielle en 2025. Chaque kWh produit sur votre toit échappe à ces hausses pendant trente ans.
          C&apos;est une forme d&apos;assurance contre l&apos;incertitude, que l&apos;on
          oublie souvent dans les calculs de rentabilité.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          Attention en revanche à une idée reçue : des panneaux solaires ne garantissent pas
          du courant pendant une coupure. Par sécurité, l&apos;onduleur se déconnecte dès que
          le réseau tombe, pour ne pas mettre en danger les techniciens d&apos;Enedis. Seule
          une batterie associée à un onduleur doté d&apos;une fonction de secours permet
          d&apos;alimenter un circuit dédié pendant une panne.
        </p>

        {/* ---- SECTION 7 : LIMITES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les limites à connaître avant de se lancer
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Parler des avantages des panneaux solaires sans évoquer leurs inconvénients serait
          vous rendre un mauvais service. Voici ceux que nous expliquons systématiquement lors
          de nos visites techniques.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            <strong>Une production décalée par rapport aux besoins.</strong> En Île-de-France,
            un mois de décembre produit environ cinq fois moins qu&apos;un mois de juin, alors
            que c&apos;est en hiver que l&apos;on consomme le plus. Le solaire réduit la
            facture, il ne la supprime pas.
          </li>
          <li>
            <strong>Un investissement de départ.</strong> Comptez 7 000 à 9 500 € TTC pour
            3 kWc et 11 000 à 15 000 € pour 6 kWc, posés, avec la TVA à 5,5 %. Le photovoltaïque
            n&apos;est éligible ni à MaPrimeRénov&apos; ni aux primes CEE.
          </li>
          <li>
            <strong>Une toiture adaptée.</strong> Une orientation plein nord, des ombres
            importantes ou une couverture à refaire peuvent rendre le projet peu pertinent.
            L&apos;exposition idéale et les alternatives sont détaillées dans notre article sur
            l&apos;
            <Link href="/blog/orientation-panneaux-solaires" className={linkCls}>
              orientation des panneaux solaires
            </Link>
            .
          </li>
          <li>
            <strong>Un intérêt lié aux habitudes de consommation.</strong> Un logement vide
            en journée, sans ballon électrique ni équipement pilotable, rentabilise mal une
            installation.
          </li>
          <li>
            <strong>Des démarches administratives.</strong> Déclaration préalable en mairie,
            raccordement, attestation Consuel : quelques semaines à quelques mois selon les
            communes, surtout en secteur protégé.
          </li>
        </ul>

        <ArticleCallout type="warning" title="Méfiez-vous des promesses trop belles">
          <p>
            « Panneaux gratuits », « autonomie totale », « rentabilisé en cinq ans » : ces
            arguments relèvent du démarchage abusif. Une installation résidentielle sérieuse
            n&apos;est jamais gratuite, ne rend pas autonome du réseau et ne se rembourse pas
            en cinq ans avec les tarifs de 2026. Vérifiez la qualification RGE QualiPV de
            l&apos;entreprise sur le site France Rénov&apos; et ne signez rien le jour du
            premier rendez-vous.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 8 : ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Profiter pleinement des avantages des panneaux solaires : les étapes
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La rentabilité d&apos;une installation se joue en grande partie avant la pose, au
          moment du dimensionnement. Voici le déroulé d&apos;un projet bien mené, de
          l&apos;analyse de vos factures à la mise en service.
        </p>

        <ArticleSteps steps={PROJET_STEPS} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Si votre toiture doit être refaite ou isolée dans les prochaines années, faites-le
          avant d&apos;installer les panneaux : les déposer puis les reposer coûte cher. Notre
          article sur l&apos;
          <Link href="/blog/isolation-thermique-du-toit" className={linkCls}>
            isolation thermique du toit
          </Link>{' '}
          vous aide à choisir la bonne technique selon votre toiture. Pour savoir combien de
          modules votre toit peut accueillir, consultez notre article sur la{' '}
          <Link href="/blog/taille-panneaux-solaires" className={linkCls}>
            taille des panneaux solaires
          </Link>
          .
        </p>

        {/* ---- SECTION 9 : PRIX ET AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix et aides pour des panneaux solaires en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix d&apos;une installation photovoltaïque a beaucoup baissé en dix ans, porté
          par la chute du coût des modules. En 2026, une installation résidentielle posée sur
          toiture coûte en moyenne 2 000 à 2 800 € TTC par kWc pour 3 kWc, et un peu moins
          par kWc pour 6 à 9 kWc, car les frais fixes (étude, démarches, raccordement) se
          répartissent sur plus de panneaux.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Côté aides, le paysage est désormais simple :
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            la <strong>TVA à 5,5 %</strong> sur le matériel et la pose, pour les installations
            jusqu&apos;à 9 kWc respectant les critères environnementaux fixés par
            l&apos;administration ;
          </li>
          <li>
            le <strong>contrat de rachat du surplus</strong> avec EDF OA, sur vingt ans, à
            environ 1,1 c€ HT par kWh pour les nouvelles demandes ;
          </li>
          <li>
            d&apos;éventuelles <strong>aides locales</strong> de votre région, de votre
            département ou de votre commune, à vérifier auprès d&apos;un conseiller France
            Rénov&apos; ;
          </li>
          <li>
            l&apos;<strong>exonération d&apos;impôt</strong> sur les revenus de la vente du
            surplus pour les installations jusqu&apos;à 3 kWc, sous conditions.
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-6">
          Nos kits d&apos;autoconsommation{' '}
          <Link href="/produits/kit-autoconsommation-3kwc" className={linkCls}>3 kWc</Link> et{' '}
          <Link href="/produits/kit-autoconsommation-6kwc" className={linkCls}>6 kWc</Link>{' '}
          donnent un ordre de prix du matériel. Pour une installation clé en main, la page{' '}
          <Link href="/services/panneaux-solaires" className={linkCls}>
            installation de panneaux solaires
          </Link>{' '}
          présente notre accompagnement, de l&apos;étude au raccordement.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Vos panneaux solaires en Île-de-France"
          description="Nos installateurs RGE QualiPV analysent votre consommation et votre toiture, dimensionnent l'installation pour maximiser l'autoconsommation et prennent en charge les démarches. Étude et devis gratuits sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur les avantages des panneaux solaires
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
            { href: '/blog/orientation-panneaux-solaires', kicker: 'Article associé', title: 'Orientation des panneaux solaires', cta: 'Lire l\'article' },
            { href: '/simulateur-solaire', kicker: 'Outil gratuit', title: 'Simulateur de production solaire', cta: 'Faire la simulation' },
            { href: '/produits/batterie-solaire-kstar-6kw', kicker: 'Produit', title: 'Batterie solaire KSTAR 6 kW', cta: 'Voir le produit' },
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
              { name: 'Créteil', slug: 'creteil' },
              { name: 'Saint-Maur-des-Fossés', slug: 'saint-maur-des-fosses' },
              { name: 'Massy', slug: 'massy' },
              { name: 'Meaux', slug: 'meaux' },
              { name: 'Melun', slug: 'melun' },
              { name: 'Pontault-Combault', slug: 'pontault-combault' },
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
