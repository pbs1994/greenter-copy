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
  ARTICLE_META, CONTENU_TABLE, EXEMPLE_TABLE, VERIFICATION_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/note-de-dimensionnement-pompe-a-chaleur'

const HERO_IMAGE = '/images/blog/note-de-dimensionnement-pompe-a-chaleur-deux-unites-exterieures.jpg'
const HERO_ALT = "Deux unités extérieures de pompe à chaleur air-eau posées sur socles devant une maison moderne à bardage bois — note de dimensionnement pompe à chaleur"

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
      width: 1240,
      height: 827,
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
  { name: 'Note de dimensionnement pompe à chaleur', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function NoteDeDimensionnementPompeAChaleur() {
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
            Deux devis pour la même maison, deux pompes à chaleur aux puissances très
            différentes : 8 kW chez le premier installateur, 14 kW chez le second. Lequel a
            raison ? Sans document pour justifier ces chiffres, impossible de trancher. Et
            pourtant, une erreur de puissance se paie pendant quinze à vingt ans, sur la
            facture d&apos;électricité comme sur la durée de vie de l&apos;appareil.
          </p>
          <p>
            La <strong>note de dimensionnement pompe à chaleur</strong> est précisément ce
            document. Rédigée par l&apos;installateur, elle établit les besoins de chauffage de
            votre logement au jour le plus froid de référence, puis démontre que la PAC
            proposée peut les couvrir. Depuis plusieurs années, elle est exigée pour obtenir
            les primes CEE sur une pompe à chaleur air-eau, et elle devrait accompagner tout
            devis sérieux.
          </p>
          <p>
            Ce guide ne refait pas le calcul de puissance, que nous détaillons dans notre
            article sur la{' '}
            <Link href="/blog/puissance-pompe-a-chaleur" className={linkCls}>puissance d&apos;une pompe à chaleur</Link>.
            Il vous apprend à lire le document que l&apos;on vous remet : ce qu&apos;il doit
            contenir, ce que dit la réglementation, et comment repérer une note bâclée avant de
            signer.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Ce qu&apos;est une note de dimensionnement et ce qui la distingue d&apos;un devis</li>
            <li>Quand elle est obligatoire et à quel moment elle doit vous être remise</li>
            <li>Les 8 rubriques qu&apos;elle doit contenir</li>
            <li>Un exemple commenté pour une maison de 110 m² en Essonne</li>
            <li>La méthode en 6 étapes pour la vérifier, et les signaux d&apos;alerte</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : DEFINITION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Qu&apos;est-ce qu&apos;une note de dimensionnement pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dimensionner une pompe à chaleur, c&apos;est choisir la puissance adaptée aux{' '}
          <strong>déperditions thermiques</strong> du logement, c&apos;est-à-dire à la
          quantité de chaleur qui s&apos;échappe par les murs, la toiture, le plancher, les
          fenêtres et la ventilation. Ces pertes augmentent avec l&apos;écart entre
          l&apos;intérieur et l&apos;extérieur : elles sont maximales lors des journées les
          plus froides de l&apos;hiver.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le document formalise ce raisonnement. Elle part d&apos;une{' '}
          <strong>température extérieure de base</strong> (Tbase), valeur de référence qui
          correspond aux journées les plus froides habituellement observées dans votre
          commune, calcule les déperditions de chaque pièce chauffée à cette température, puis
          confronte le total à la puissance que la PAC envisagée est capable de restituer dans
          les mêmes conditions.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ce n&apos;est donc ni un devis, qui chiffre du matériel et de la main-d&apos;œuvre, ni
          un audit énergétique, qui évalue l&apos;ensemble du logement et propose des scénarios
          de travaux. C&apos;est la pièce technique qui justifie le choix du générateur : la
          réponse écrite à la question « pourquoi cette puissance-là ? ».
        </p>

        <ArticleStat stats={[
          { value: 'T = Tbase', label: 'les déperditions doivent être calculées à la température extérieure de base (fiche CEE BAR-TH-171)', color: 'blue' },
          { value: '≈ −7 °C', label: 'ordre de grandeur de la température de base retenue en Île-de-France', color: 'amber' },
          { value: '17 ans', label: 'durée de vie conventionnelle d\'une PAC air-eau retenue pour les primes CEE', color: 'green' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces trois repères disent l&apos;essentiel. Le calcul se fait au jour le plus froid de
          référence, pas en moyenne annuelle. En Île-de-France, cette référence est voisine de
          −7 °C, corrigée selon l&apos;altitude de la commune. Et l&apos;enjeu est durable :
          l&apos;administration elle-même compte sur 17 ans de fonctionnement pour calculer les
          économies d&apos;énergie d&apos;une PAC air-eau. Une erreur de dimensionnement
          s&apos;installe donc pour longtemps.
        </p>

        {/* ---- SECTION 2 : OBLIGATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Note de dimensionnement pompe à chaleur : quand est-elle obligatoire ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;obligation découle des <strong>certificats d&apos;économies d&apos;énergie</strong>{' '}
          (CEE), qui financent la prime énergie et les bonifications « Coup de pouce
          chauffage ». Depuis avril 2022, les fiches CEE des pompes à chaleur exigent une note
          de dimensionnement. La fiche actuelle des PAC air-eau, BAR-TH-171, est sans
          ambiguïté : le professionnel rédige une note de dimensionnement du générateur par
          rapport aux déperditions calculées à T = Tbase, pour les pièces desservies par le
          réseau de chauffage, sans tenir compte des autres générateurs éventuellement
          présents.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Remise à l&apos;engagement de l&apos;opération
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Le calendrier est précis : la note est remise au bénéficiaire à l&apos;engagement de
          l&apos;opération, c&apos;est-à-dire avant que vous ne signiez le devis, puis
          actualisée à l&apos;achèvement des travaux si le projet a évolué. Elle figure parmi
          les pièces justificatives du dossier CEE, et l&apos;attestation sur l&apos;honneur
          que vous signez comporte une case « une note de dimensionnement a été remise au
          bénéficiaire ». Surtout, la PAC installée doit être conforme à ses préconisations :
          poser un autre modèle que celui de la note fragilise le dossier de prime.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Sans tenir compte de la chaudière existante
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Ce point est souvent mal compris. Même si vous conservez votre ancienne chaudière en
          appoint, les déperditions sont calculées comme si la PAC était seule. Le but est
          d&apos;éviter les pompes à chaleur volontairement sous-dimensionnées, qui ne
          chaufferaient qu&apos;une partie de l&apos;année tout en touchant la prime. Le cas des
          systèmes associant les deux générateurs est détaillé dans notre guide sur la{' '}
          <Link href="/blog/pompe-a-chaleur-hybride" className={linkCls}>pompe à chaleur hybride</Link>.
        </p>

        <ArticleCallout type="info" title="Et pour MaPrimeRénov' ?">
          <p>
            Le dossier MaPrimeRénov&apos; ne réclame pas, à ce jour, cette note comme
            pièce justificative distincte. Mais les installateurs
            certifiés RGE QualiPAC doivent dimensionner leurs installations, et
            l&apos;absence de note est relevée lors des audits de qualification. En pratique,
            une PAC aidée par MaPrimeRénov&apos; bénéficie presque toujours aussi des primes
            CEE : la note est donc due dans l&apos;immense majorité des projets.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : CONTENU ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Que doit contenir une note de dimensionnement pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La réglementation impose le principe du calcul, pas un formulaire type : chaque
          installateur présente sa note à sa manière, souvent sous la forme d&apos;un rapport
          généré par un logiciel de calcul thermique. Quelle que soit la présentation, une
          note complète aborde les huit rubriques suivantes.
        </p>

        <ArticleTable {...CONTENU_TABLE} title="Les rubriques d'une note de dimensionnement pompe à chaleur" />

        <p className="text-slate-700 leading-relaxed mb-6">
          Les quatre premières rubriques décrivent le <strong>besoin</strong> : combien de
          chaleur votre maison perd par grand froid, et à quelle température l&apos;eau doit
          circuler dans vos radiateurs ou votre plancher chauffant. Les quatre suivantes
          décrivent la <strong>réponse</strong> : la puissance de la PAC dans ces conditions
          précises, le rôle de l&apos;appoint, la production d&apos;eau chaude et le modèle
          retenu. Une note qui ne contient que la seconde moitié n&apos;est qu&apos;une fiche
          produit.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le piège de la puissance nominale
        </h3>

        <ArticleImageSection
          image="/images/blog/note-de-dimensionnement-pompe-a-chaleur-pac-air-eau-socles.jpg"
          alt="Deux unités extérieures blanches de pompe à chaleur air-eau sur plots béton devant un bardage en bois, pelouse au premier plan"
          imagePosition="right"
        >
          <p>
            Sur un catalogue, la puissance d&apos;une PAC air-eau est le plus souvent mesurée
            à +7 °C dehors avec une eau à 35 °C : des conditions de mi-saison très favorables.
          </p>
          <p className="mt-3">
            Par −7 °C et avec une eau à 45 ou 55 °C pour des radiateurs, la même machine
            restitue nettement moins. C&apos;est cette puissance « à Tbase » que la note doit
            comparer aux déperditions.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;écart entre puissance nominale et puissance à Tbase varie selon les modèles :
          il est plus faible sur les PAC récentes à compresseur inverter optimisées pour le
          froid, plus marqué sur les appareils d&apos;entrée de gamme. Seules les tables de
          performances du fabricant, croisant température extérieure et température
          d&apos;eau, permettent de le connaître. Une note sérieuse cite donc la puissance
          restituée à votre Tbase et à votre régime d&apos;eau, et pas seulement le chiffre
          inscrit dans la référence commerciale du produit.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le régime d&apos;eau des émetteurs
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          La fiche CEE distingue deux usages. Avec un plancher chauffant ou des
          ventilo-convecteurs, la PAC est dite « basse température » et son efficacité
          saisonnière (Etas) doit atteindre au moins 126 %. Avec des radiateurs, y compris
          ceux dits basse température à 45 °C, ou si la PAC produit aussi l&apos;eau chaude,
          elle est « moyenne ou haute température » et le seuil est de 111 %. La note doit donc
          indiquer clairement vos émetteurs et le régime retenu. Pour comprendre comment ce
          choix s&apos;intègre au circuit hydraulique, consultez notre{' '}
          <Link href="/blog/schema-installation-pompe-a-chaleur-air-eau" className={linkCls}>
            schéma d&apos;installation de pompe à chaleur air-eau
          </Link>.
        </p>

        {/* ---- SECTION 4 : EXEMPLE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Exemple concret : une maison de 110 m² en Essonne
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Prenons un cas fréquent dans nos interventions : un pavillon des années 1980 en
          Essonne, de 110 m² habitables sur un niveau, avec combles isolés, double vitrage, murs
          faiblement isolés et radiateurs en acier alimentés jusqu&apos;ici par une chaudière
          gaz. Quatre personnes y vivent. Voici la partie « déperditions » de la note.
        </p>

        <ArticleTable {...EXEMPLE_TABLE} title="Exemple : déperditions pièce par pièce à Tbase" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Les déperditions totales atteignent <strong>7,5 kW</strong> à −7 °C, soit environ
          68 W par m², un ordre de grandeur cohérent pour une maison de cette époque
          partiellement rénovée. Le séjour pèse à lui seul près de 40 % du besoin, en raison
          de sa surface et de sa baie vitrée. La salle de bains, chauffée à 22 °C, perd
          davantage par m² que les chambres maintenues à 19 °C.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Vient ensuite la partie « réponse ». Le relevé des radiateurs montre qu&apos;une eau à
          45 °C suffit à chauffer chaque pièce, à condition de remplacer un radiateur trop
          petit dans le séjour. L&apos;installateur retient une PAC air-eau vendue comme un
          modèle de 9 kW, qui restitue environ 7,6 kW à −7 °C avec une eau à 45 °C d&apos;après
          les données du fabricant : elle couvre donc la totalité des déperditions au jour de
          référence. La résistance électrique intégrée ne sert qu&apos;en secours.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour l&apos;eau chaude, un ballon de 200 litres couvre les besoins de quatre
          personnes. La note conclut par la marque et la référence du modèle, son Etas à 55 °C
          et la classe de son régulateur, les informations que l&apos;on retrouvera sur la
          facture. Le second devis à 14 kW, lui, aurait conduit à une machine presque deux fois
          trop puissante pour ce logement.
        </p>

        <ArticleCallout type="tip" title="Les chiffres de cet exemple">
          <p>
            Ces valeurs sont illustratives et arrondies. Deux maisons de même surface peuvent
            avoir des déperditions très différentes selon l&apos;isolation, l&apos;exposition,
            le vitrage et l&apos;étanchéité à l&apos;air. C&apos;est tout l&apos;intérêt
            d&apos;une note calculée pour votre logement plutôt que d&apos;un ratio au m².
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : VERIFICATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment vérifier le document avant de signer
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Vous n&apos;avez pas besoin d&apos;être thermicien pour juger de la qualité
          d&apos;une note. Quelques contrôles simples suffisent à distinguer un vrai calcul
          d&apos;un document rempli pour la forme. Prenez dix minutes pour les faire, devis en
          main.
        </p>

        <ArticleSteps steps={VERIFICATION_STEPS} />

        <ArticleCallout type="warning" title="Les signaux d'alerte">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Une puissance déduite de la seule surface, sans détail par pièce</li>
            <li>Aucune température de base mentionnée</li>
            <li>Seule la puissance nominale du catalogue est indiquée</li>
            <li>Aucune visite du logement avant l&apos;envoi du devis</li>
            <li>Une note promise « après les travaux » ou jamais remise</li>
            <li>Un modèle sur la note différent de celui du devis</li>
          </ul>
        </ArticleCallout>

        <p className="text-slate-700 leading-relaxed mb-6">
          La visite technique est le premier indicateur. Calculer des déperditions suppose de
          connaître l&apos;épaisseur des isolants, le type de vitrage, les dimensions des
          pièces et les radiateurs existants. Un devis établi par téléphone, sans que personne
          ne soit venu chez vous, ne peut pas s&apos;appuyer sur un calcul de déperditions
          digne de ce nom. Ce réflexe figure d&apos;ailleurs en bonne place dans notre liste
          des{' '}
          <Link href="/blog/pompe-a-chaleur-piege-a-eviter" className={linkCls}>
            pièges à éviter avec une pompe à chaleur
          </Link>.
        </p>

        {/* ---- SECTION 6 : SUR/SOUS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Surdimensionnement, sous-dimensionnement : ce que la note vous évite
        </h2>

        <ArticleImageSection
          image="/images/blog/note-de-dimensionnement-pompe-a-chaleur-unite-murale.jpg"
          alt="Unité extérieure de pompe à chaleur fixée sur support mural contre le bardage gris clair d'une maison, à côté d'une fenêtre, jardin engazonné"
          imagePosition="left"
        >
          <p>
            Une unité extérieure se choisit pour le logement qu&apos;elle chauffe, pas pour
            rassurer : plus grosse n&apos;est pas synonyme de plus confortable.
          </p>
          <p className="mt-3">
            Le bon dimensionnement conditionne aussi l&apos;emplacement, le bruit et
            l&apos;abonnement électrique.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Une PAC trop puissante
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          C&apos;est l&apos;erreur la plus fréquente, souvent par excès de prudence. Une PAC
          surdimensionnée atteint trop vite la température demandée, s&apos;arrête, puis
          redémarre quelques minutes plus tard. Ces <strong>cycles courts</strong> dégradent le
          coefficient de performance, sollicitent le compresseur et réduisent sa durée de vie.
          L&apos;appareil coûte aussi plus cher à l&apos;achat, et parfois impose un abonnement
          électrique plus puissant. C&apos;est l&apos;une des causes que nous analysons dans
          notre article sur la{' '}
          <Link href="/blog/surconsommation-pompe-a-chaleur" className={linkCls}>
            surconsommation d&apos;une pompe à chaleur
          </Link>.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Une PAC trop faible
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          À l&apos;inverse, une PAC sous-dimensionnée ne parvient plus à maintenir la
          température dès que le froid s&apos;installe. La résistance électrique
          d&apos;appoint prend alors le relais, avec un rendement trois à quatre fois moins bon
          que celui de la pompe à chaleur. Le confort baisse et la facture grimpe précisément
          pendant les semaines les plus chères de l&apos;hiver. Notre dossier sur le{' '}
          <Link href="/blog/rendement-pompe-a-chaleur" className={linkCls}>
            rendement d&apos;une pompe à chaleur
          </Link>{' '}
          explique pourquoi chaque degré d&apos;eau supplémentaire et chaque heure
          d&apos;appoint comptent.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Entre ces deux extrêmes, la note cherche le point
          d&apos;équilibre : une PAC qui couvre l&apos;essentiel des besoins, y compris par
          grand froid, sans tourner en sous-régime le reste de l&apos;année. Les PAC inverter
          actuelles, capables de moduler leur puissance, tolèrent mieux une petite marge, mais
          pas un doublement.
        </p>

        {/* ---- SECTION 7 : QUI / PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Qui rédige la note, et combien coûte-t-elle ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans la grande majorité des projets, c&apos;est l&apos;<strong>installateur RGE</strong>{' '}
          qui rédige la note, à partir des relevés faits lors de la visite technique. Il
          utilise un logiciel de calcul des déperditions fondé sur la norme NF EN 12831, qui
          décrit la méthode de calcul de la charge thermique de conception d&apos;un bâtiment.
          La note fait partie de son travail de conception et elle est généralement incluse
          dans le prix du devis.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un <strong>bureau d&apos;études thermiques</strong> indépendant peut aussi la
          réaliser, pour quelques centaines d&apos;euros en général. C&apos;est utile pour une
          maison atypique, une grande surface, un projet de rénovation globale, ou si vous
          voulez un avis neutre pour départager deux installateurs.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, si vous prévoyez d&apos;isoler avant ou en même temps que de changer de
          chauffage, faites-le savoir : les déperditions baissent après isolation, et la
          puissance de la PAC doit être calculée pour la maison isolée. Un{' '}
          <Link href="/services/audit" className={linkCls}>audit énergétique</Link>{' '}
          permet d&apos;ordonner les travaux dans le bon sens et évite d&apos;acheter une PAC
          dimensionnée pour une maison qui n&apos;existera plus après les travaux.
        </p>

        {/* ---- SECTION 8 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Dimensionnement de la PAC et aides financières en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Ce document est d&apos;abord une condition des primes CEE : sans
          elle, le dossier de prime énergie d&apos;une PAC air-eau ne peut pas aboutir. En
          2026, la pompe à chaleur air-eau reste par ailleurs finançable par
          MaPrimeRénov&apos; par geste, contrairement à la plupart des travaux
          d&apos;isolation, et bénéficie de la TVA réduite à 5,5 % lorsqu&apos;elle est posée
          par une entreprise RGE.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces aides se cumulent mais évoluent souvent : vérifiez les montants au moment de
          votre projet et déposez toujours les demandes avant la signature du devis. Pour un
          budget complet, matériel, pose et aides, consultez notre{' '}
          <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className={linkCls}>
            guide des prix de la pompe à chaleur
          </Link>{' '}
          et, si vous remplacez une chaudière, notre article dédié au{' '}
          <Link href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026" className={linkCls}>
            remplacement d&apos;une chaudière gaz par une pompe à chaleur
          </Link>.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Une PAC dimensionnée pour votre maison en Île-de-France"
          description="Nos techniciens certifiés RGE QualiPAC visitent votre logement, calculent les déperditions pièce par pièce et vous remettent une note de dimensionnement détaillée avec le devis. Primes CEE et MaPrimeRénov' gérées pour vous. Visite technique gratuite sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur la note de dimensionnement d&apos;une pompe à chaleur
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
            { href: '/services/pompe-a-chaleur', kicker: 'Notre service', title: 'Pompe à chaleur en Île-de-France', cta: 'Voir le service' },
            { href: '/blog/puissance-pompe-a-chaleur', kicker: 'Guide complémentaire', title: 'Puissance pompe à chaleur : le calcul', cta: 'Lire le guide' },
            { href: '/blog/surconsommation-pompe-a-chaleur', kicker: 'Article associé', title: 'Surconsommation pompe à chaleur', cta: 'Lire le guide' },
            { href: '/blog/consommation-pompe-a-chaleur-maison-100m2', kicker: 'Article associé', title: 'Consommation PAC pour 100 m²', cta: 'Lire le guide' },
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
            Pompe à chaleur par ville en Île-de-France
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
                PAC {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

      </ArticleLayout>
    </>
  )
}
