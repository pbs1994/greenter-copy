import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, AlertTriangle } from 'lucide-react'
import {
  ArticleLayout, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSources,
  ArticleImageSection, ArticleFullImage,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pompe-a-chaleur-piege-a-eviter'

export const metadata: Metadata = {
  title: "Pompe à chaleur : 10 pièges à éviter absolument en 2026 | Greenter",
  description:
    "Quels sont les pièges à éviter avec une pompe à chaleur ? Mauvais dimensionnement, artisan non-RGE, isolation insuffisante, aides ratées... Les 10 erreurs les plus coûteuses avant d'installer une PAC.",
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: "Pompe à chaleur : 10 pièges à éviter absolument en 2026",
    description:
      "Mauvais dimensionnement, artisan non-RGE, emplacement bruyant, isolation insuffisante, aides ratées... Le guide complet des 10 erreurs à ne pas commettre avec une pompe à chaleur.",
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/pac-piege-eviter-unite-exterieure-moderne.jpg',
      width: 1200,
      height: 800,
      alt: "Unité extérieure de pompe à chaleur air-eau installée dans un jardin — pièges à éviter pour une installation réussie",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pompe à chaleur : 10 pièges à éviter en 2026",
    description:
      "Les 10 erreurs les plus coûteuses à éviter avant d'installer une pompe à chaleur en 2026.",
    images: ['https://www.greenter.fr/images/blog/pac-piege-eviter-unite-exterieure-moderne.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Pompe à chaleur pièges à éviter", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const PIEGES = [
  {
    num: 1,
    titre: "Choisir une PAC mal dimensionnée",
    accroche: "Le piège le plus fréquent — et le plus coûteux",
    contenu: [
      "Le dimensionnement d'une pompe à chaleur est sans doute le paramètre le plus critique de toute l'installation, et pourtant c'est aussi le plus souvent bâclé. Trop d'installateurs se contentent d'appliquer une règle empirique du type « 1 kW par 10 m² » sans réaliser un calcul de déperditions thermiques sérieux. Cette approche paresseuse aboutit soit à une PAC surdimensionnée, soit à une PAC sous-dimensionnée — et dans les deux cas, vous perdez de l'argent.",
      "Une PAC trop puissante démarre, atteint la température de consigne en quelques minutes, s'arrête, puis redémarre. Ce cycle incessant s'appelle le « cycling » ou fonctionnement en tout-ou-rien. Il use prématurément le compresseur (le composant le plus coûteux d'une PAC, comptez 800 à 2 000 € pour le remplacer), consomme davantage d'énergie au démarrage que pendant le fonctionnement stabilisé, et dégrade le COP réel de 15 à 30 % par rapport aux valeurs affichées en laboratoire. Une PAC avec compresseur Inverter limite ce phénomène mais ne l'élimine pas si le surdimensionnement est excessif.",
      "À l'inverse, une PAC sous-dimensionnée ne peut pas couvrir les besoins du logement lors des épisodes de grand froid. Elle force alors sur le mode appoint électrique — une résistance électrique intégrée qui consomme 2 à 3 fois plus qu'une PAC en fonctionnement normal. Résultat : votre facture explose précisément aux moments où vous avez le plus besoin de chaleur.",
      "La bonne pratique : exigez systématiquement un calcul de déperditions thermiques selon la norme NF EN 12831, qui prend en compte la surface, la zone climatique, l'isolation des parois, les vitrages et le renouvellement d'air. Ce calcul doit figurer dans le devis. Un professionnel sérieux ne peut pas estimer correctement la puissance nécessaire sans ces données.",
    ],
  },
  {
    num: 2,
    titre: "Installer une PAC dans un logement mal isolé",
    accroche: "L'ordre des priorités change tout",
    contenu: [
      "Une pompe à chaleur air-eau est une machine conçue pour produire de l'eau chaude à basse température — entre 35 et 55 °C selon les modèles. C'est précisément cette basse température qui lui permet d'afficher un COP de 3 à 4 : pour 1 kWh d'électricité consommé, elle produit 3 à 4 kWh de chaleur. Mais cet avantage disparaît si le logement perd de la chaleur plus vite que la PAC ne peut en produire.",
      "Dans une maison classée DPE E, F ou G, les déperditions thermiques sont tellement importantes que la PAC doit monter en température pour compenser. Or, chaque degré supplémentaire de température d'eau dégrade le COP d'environ 2,5 %. Une PAC qui doit produire de l'eau à 60 °C au lieu de 45 °C perd 30 à 40 % de son rendement — et la rentabilité de l'investissement s'effondre.",
      "Le conseil des professionnels est unanime : avant d'installer une PAC, traitez en priorité l'isolation des combles perdus (jusqu'à 30 % des déperditions), puis des murs et du plancher bas. Une amélioration du DPE de E à C avant l'installation permet souvent de réduire la puissance nécessaire de la PAC de 20 à 30 %, ce qui diminue le coût de l'équipement ET améliore son rendement réel au quotidien.",
      "L'autre avantage de l'isolation préalable : elle fait souvent sauter un seuil de DPE, ce qui peut augmenter les aides MaPrimeRénov' disponibles pour la PAC elle-même et ouvrir droit au parcours « rénovation d'ampleur » avec des subventions encore plus importantes.",
    ],
  },
  {
    num: 3,
    titre: "Confier l'installation à un artisan non-RGE",
    accroche: "Perdre des milliers d'euros d'aides pour avoir voulu économiser quelques centaines",
    contenu: [
      "C'est le piège le plus classique, et aussi le plus inutile. De nombreux propriétaires acceptent un devis d'un installateur non certifié parce qu'il est légèrement moins cher — pour ensuite découvrir qu'ils ont perdu l'intégralité des aides de l'État. En 2026, pour un ménage à revenus modestes, MaPrimeRénov' pour une PAC air-eau peut atteindre 4 000 à 6 300 €. Auxquels s'ajoutent le Coup de pouce CEE (1 000 à 2 500 €) et la TVA réduite à 5,5 %. Le total peut dépasser 8 000 € d'aides perdues pour avoir fait confiance au mauvais installateur.",
      "La certification RGE (Reconnu Garant de l'Environnement) n'est pas qu'une formalité administrative : elle garantit que l'installateur a suivi une formation spécifique, a passé des audits qualité sur chantier, et maîtrise les normes d'installation en vigueur. Pour les PAC, le label QualiPAC (porté par Qualit'EnR) est la certification RGE de référence. Vérifiez systématiquement la validité de la certification sur le site france-renov.gouv.fr avant de signer quoi que ce soit.",
      "Un deuxième point légal, souvent ignoré : tout technicien manipulant des fluides frigorigènes doit être titulaire d'une attestation d'aptitude délivrée par un organisme accrédité (arrêté du 22 juin 2020). Un installateur sans cette attestation ne peut légalement pas raccorder le circuit frigorifique de votre PAC. Si votre installation présente une fuite ultérieure, vous pourriez aussi vous retrouver sans recours en garantie.",
    ],
  },
  {
    num: 4,
    titre: "Négliger l'emplacement de l'unité extérieure",
    accroche: "Bruit, performance dégradée et conflits de voisinage",
    contenu: [
      "L'unité extérieure d'une PAC air-eau n'est pas un équipement discret. Elle émet un bruit continu de 45 à 60 dB(A) selon les modèles et les conditions d'utilisation — comparable à une conversation normale ou à un bureau calme. Mal positionnée, elle peut devenir une source de nuisances sonores sérieuses pour vous, pour vos voisins, ou pour les deux à la fois.",
      "La réglementation est claire : le bruit généré par une PAC ne doit pas dépasser 5 dB(A) de plus que le bruit ambiant la nuit (arrêté du 5 décembre 2006 relatif aux bruits de voisinage). En pratique, cela signifie que si votre quartier est calme la nuit (bruit ambiant < 35 dB(A)), votre PAC ne peut pas émettre plus de 40 dB(A) à la limite de propriété. Certains modèles récents avec mode « nuit silencieux » y parviennent, mais beaucoup ne respectent pas cette limite si l'unité est mal placée.",
      "Les erreurs d'emplacement les plus fréquentes : installer l'unité trop près d'une fenêtre de chambre (la vôtre ou celle du voisin), la placer dans un angle ou une niche qui amplifie les sons par effet de résonance, la poser directement sur le sol béton sans plots anti-vibratoires, ou la placer sans tenir compte des vents dominants (ce qui peut amplifier le bruit ou réduire l'aspiration d'air frais). Préférez toujours une installation avec plots silentblocs, à au moins 3 m des fenêtres des chambres et à une distance respectueuse des limites de propriété.",
      "À long terme, mal positionner l'unité extérieure peut aussi dégrader les performances. Une unité placée dans un espace trop confiné (couloir entre deux murs, angle derrière des buissons) recircule l'air qu'elle vient de refroidir : elle « aspire froid » au lieu d'aspirer l'air ambiant, ce qui dégrade le COP de 10 à 25 %.",
    ],
  },
  {
    num: 5,
    titre: "Ignorer la compatibilité avec les émetteurs de chaleur existants",
    accroche: "Radiateurs haute température et PAC : un mariage souvent raté",
    contenu: [
      "La pompe à chaleur air-eau fonctionne idéalement à des températures d'eau comprises entre 35 et 50 °C. Les radiateurs en fonte et les convecteurs classiques, eux, ont été dimensionnés pour fonctionner à 70–90 °C : à 45 °C, ils ne diffusent qu'une fraction de leur puissance nominale et ne peuvent plus chauffer correctement le logement. C'est un piège dans lequel tombent de nombreux propriétaires qui souhaitent garder leurs anciens radiateurs pour réduire le coût de l'installation.",
      "La solution paresseuse — et fréquemment vendue par des installateurs peu scrupuleux — consiste à configurer la PAC pour produire de l'eau à 60–65 °C afin de « forcer » les vieux radiateurs. Cette configuration anéantit l'avantage thermodynamique de la PAC : à ces températures, le COP tombe à 2 voire 1,5, ce qui n'est guère mieux qu'une simple chaudière électrique... pour un prix d'équipement bien plus élevé.",
      "Le plancher chauffant hydraulique (25–35 °C) et les radiateurs basse température (45–50 °C) sont les émetteurs de prédilection d'une PAC. Si votre logement dispose uniquement de radiateurs haute température, vous avez deux options honnêtes : les remplacer par des radiateurs basse température (comptez 200 à 600 € par radiateur), ou opter pour une PAC haute température (dite « haute temp », capable de produire jusqu'à 65–80 °C), plus coûteuse à l'achat mais compatible avec l'existant.",
      "Avant de signer tout devis, exigez un diagnostic de compatibilité entre la PAC proposée et vos émetteurs actuels. Un installateur sérieux ne peut pas vous proposer une installation sans avoir inspecté vos radiateurs et calculé si leur surface d'échange est suffisante à basse température.",
    ],
  },
  {
    num: 6,
    titre: "Se fier uniquement au prix d'achat sans calculer le coût total",
    accroche: "Le prix affiché n'est jamais le prix réel",
    contenu: [
      "Le piège du prix bas est particulièrement fréquent dans le secteur des PAC, où les marges commerciales sont importantes et où la concurrence entre installateurs est féroce. Il n'est pas rare de recevoir deux devis pour la même prestation avec un écart de 2 000 à 5 000 €. La tentation de choisir le moins cher est forte — et souvent regrettée.",
      "Un devis bas peut cacher plusieurs problèmes : une marque d'équipement peu fiable avec un SAV inexistant en France, l'absence de prise en charge des travaux annexes nécessaires (adaptation du réseau hydraulique, remplacement de la nourrice, raccordement électrique renforcé pour un disjoncteur 32A), l'omission du ballon d'eau chaude sanitaire (ECS) si vous avez besoin de le coupler à la PAC, ou encore des délais de livraison non garantis.",
      "Le bon réflexe : comparez le coût total sur 10 ans, pas seulement l'achat initial. Prenez en compte le SCOP annuel estimé (coefficient de performance saisonnier), le tarif du contrat d'entretien annuel obligatoire, la durée et l'étendue de la garantie pièces et main-d'œuvre, et le prix des pièces de rechange facilement disponibles. Une PAC d'une marque reconnue (Daikin, Atlantic, De Dietrich, Mitsubishi, Viessmann, Vaillant) avec 5 ans de garantie et SAV en 48h peut valoir 1 500 à 3 000 € de plus à l'achat, mais économiser 5 000 à 8 000 € sur 10 ans en évitant les pannes coûteuses.",
    ],
  },
  {
    num: 7,
    titre: "Négliger l'entretien annuel obligatoire",
    accroche: "Une obligation légale que beaucoup ignorent jusqu'à la panne",
    contenu: [
      "Depuis le décret du 9 septembre 2009 (modifié par le décret du 12 avril 2012), l'entretien annuel est obligatoire pour toute PAC d'une puissance supérieure à 4 kW — ce qui couvre la quasi-totalité des installations résidentielles. Cet entretien doit être réalisé par un professionnel qualifié et donne lieu à la remise d'un « bon d'entretien » que vous devez conserver.",
      "L'entretien annuel n'est pas qu'une formalité : c'est une vérification complète du système qui permet de détecter précocement les problèmes. Un professionnel vérifie la pression du circuit frigorifique, mesure le COP réel en conditions d'utilisation réelles (souvent 20 à 30 % inférieur aux valeurs laboratoire quand la PAC n'est pas entretenue), nettoie les échangeurs encrassés qui peuvent réduire les performances de 10 à 15 %, et s'assure de l'absence de fuite de fluide frigorigène — les fuites non détectées dégradent progressivement les performances et peuvent vider le circuit en quelques mois.",
      "La plupart des garanties constructeur exigent explicitement la preuve d'un entretien annuel régulier pour être valides. Si votre PAC tombe en panne 4 ans après l'installation et que vous ne pouvez pas présenter les bons d'entretien, le fabricant peut légitimement refuser de prendre en charge la réparation sous garantie — quand bien même la panne ne serait pas liée à un défaut d'entretien. Prévoyez systématiquement un contrat d'entretien annuel dès l'installation, à raison de 100 à 200 € par an selon le prestataire.",
    ],
  },
  {
    num: 8,
    titre: "Commencer les travaux avant de déposer le dossier MaPrimeRénov'",
    accroche: "Une erreur administrative qui peut coûter des milliers d'euros",
    contenu: [
      "C'est l'une des erreurs les plus douloureuses — et des plus évitables. MaPrimeRénov' comporte une règle absolue : le dossier de demande d'aide doit être soumis sur france-renov.gouv.fr AVANT toute commande de matériel et avant tout début de travaux. Les travaux commencés (même informellement, même juste une visite technique) avant la date de dépôt du dossier ne sont pas éligibles, point final.",
      "Des installateurs peu scrupuleux, pressés de signer le bon de commande, vous diront que « ça se fait après » ou que « l'administration est souple sur les dates ». C'est faux. L'ANAH (qui gère MaPrimeRénov') contrôle les dates et refuse systématiquement les dossiers dont la date de devis est antérieure à la date de dépôt en ligne. Certains propriétaires ont ainsi perdu 4 000 à 6 300 € d'aides pour avoir signé un bon de commande trop tôt.",
      "La procédure correcte en 2026 est la suivante : 1) Obtenez des devis détaillés de plusieurs artisans RGE — ces devis ne constituent pas un engagement. 2) Déposez votre dossier MaPrimeRénov' sur france-renov.gouv.fr (ou faites-le faire par un Mon Accompagnateur Rénov'). 3) Attendez l'accord de principe de l'ANAH. 4) Signez le bon de commande et démarrez les travaux. 5) Après réception des travaux, soumettez les justificatifs pour percevoir l'aide.",
      "En parallèle, renseignez-vous sur les Certificats d'Économies d'Énergie (CEE) — le « Coup de pouce » PAC peut apporter 1 000 à 2 500 € supplémentaires, cumulables avec MaPrimeRénov'. Ces primes CEE sont versées par les fournisseurs d'énergie et ont leurs propres conditions : certains exigent un accord préalable lui aussi avant travaux.",
    ],
  },
  {
    num: 9,
    titre: "Choisir une PAC air-air comme seul système de chauffage en zone froide",
    accroche: "Air-air vs air-eau : une confusion aux conséquences sévères en hiver",
    contenu: [
      "La PAC air-air (climatisation réversible) est souvent vendue comme une solution de chauffage principale pour des raisons commerciales évidentes : elle coûte moins cher à l'achat (3 000 à 8 000 € contre 8 000 à 15 000 € pour une PAC air-eau) et l'installation est plus simple. Mais elle présente des limites rédhibitoires comme seul système de chauffage dans les zones climatiques H1 et H2 (la majeure partie de la France).",
      "Première limite : les PAC air-air soufflent de l'air chaud directement dans la pièce — elles ne chauffent pas l'eau du circuit de chauffage. Résultat : les pièces sans unité intérieure (couloirs, salles de bain, certaines chambres) restent froides. Une installation multi-split avec une unité intérieure par pièce est envisageable mais son coût total rejoint rapidement celui d'une PAC air-eau.",
      "Deuxième limite, plus critique : les PAC air-air voient leurs performances chuter rapidement quand la température extérieure descend en dessous de -5 °C. En zone H1 (Alsace, montagne, nord-est), les hivers peuvent amener des températures de -10 à -20 °C pendant plusieurs jours. À ces températures, une PAC air-air conventionnelle passe en dégivrage constant ou s'arrête complètement. Sans système de chauffage d'appoint, la maison refroidit.",
      "La PAC air-eau avec technologie Inverter et compresseur basse température (capable de fonctionner jusqu'à -20 °C, comme les modèles « Arctic » de certaines marques) est la seule solution adaptée comme chauffage principal en zone froide. La PAC air-air reste un excellent complément pour les appartements, les régions au climat doux (zone H3 : côtes atlantiques et méditerranée), ou comme climatisation estivale en complément d'un autre système de chauffage.",
    ],
  },
  {
    num: 10,
    titre: "Ne pas lire les conditions de garantie avant de signer",
    accroche: "La garantie qui ne garantit rien... si vous ne lisez pas les clauses",
    contenu: [
      "Le dernier piège, et non des moindres. Les brochures commerciales parlent de « 5 ans de garantie » ou « garantie pièces 7 ans » avec enthousiasme. La réalité est souvent plus nuancée, et les conditions de garantie comportent fréquemment des clauses restrictives que découvrent les propriétaires uniquement au moment d'une panne.",
      "Les clauses restrictives les plus fréquentes : garantie conditionnée à un entretien annuel réalisé par un professionnel agréé par la marque (pas n'importe quel technicien RGE) ; exclusion du fluide frigorigène de la garantie après la première année ; garantie pièces incluant les frais d'expédition mais excluant la main-d'œuvre (qui peut atteindre 400 à 800 € pour un remplacement de compresseur) ; garantie non transférable en cas de vente du logement, ce qui peut compliquer une revente.",
      "Vérifiez également la disponibilité du SAV local : une PAC d'une marque européenne peu connue peut avoir un délai de réparation de 3 à 6 semaines si la pièce doit être commandée à l'étranger — et vous rester sans chauffage en janvier. Les marques avec un réseau de techniciens agréés en France (Daikin, Atlantic, Mitsubishi, Viessmann) garantissent généralement une intervention en 24 à 72h.",
      "Demandez toujours, avant de signer le contrat d'installation : quelle est la durée de garantie pièces ET main-d'œuvre ? Quelles sont les exclusions ? L'entretien annuel doit-il obligatoirement être fait par un technicien agréé de la marque ? La garantie est-elle transférable ? Existe-t-il un numéro d'urgence 24h/24 pour les pannes en hiver ? Ces questions simples vous éviteront des surprises désagréables.",
    ],
  },
]

export default function PompeAChaleurPiegeAEviter() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Pompe à chaleur : 10 pièges à éviter absolument en 2026"
        description="Mauvais dimensionnement, artisan non-RGE, isolation insuffisante, emplacement bruyant, aides ratées, entretien négligé : le guide complet des 10 erreurs les plus coûteuses à éviter avant d'installer une pompe à chaleur."
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: ARTICLE_META.author, url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/pac-piege-eviter-unite-exterieure-moderne.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={3200}
      />

      <ArticleLayout
        title="Pompe à chaleur : 10 pièges à éviter absolument en 2026"
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        author={ARTICLE_META.author}
        heroImage="/images/blog/pac-piege-eviter-unite-exterieure-moderne.jpg"
        heroAlt="Unité extérieure de pompe à chaleur air-eau installée dans un jardin soigné — guide des pièges à éviter pour une installation réussie"
        breadcrumbs={breadcrumbs}
      >
        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            La <strong>pompe à chaleur</strong> est devenue le système de chauffage
            le plus installé en France : plus de 600 000 unités posées en 2024 selon
            l&apos;ADEME. Portée par les aides MaPrimeRénov&apos;, la hausse du prix
            du gaz et la prise de conscience écologique, cette technologie séduit
            chaque année davantage de propriétaires. Pourtant, derrière les promesses
            de COP 4 et de factures divisées par trois, la réalité du terrain est
            parfois bien différente.
          </p>
          <p>
            Les retours d&apos;expérience collectés par les associations de consommateurs,
            les syndicats professionnels et l&apos;ADEME convergent : une installation de{' '}
            <strong>pompe à chaleur</strong> sur quatre ne tient pas ses promesses de
            performance. Non pas parce que la technologie est défaillante, mais parce
            que des <strong>pièges à éviter</strong> bien identifiés ont été ignorés —
            par le propriétaire, par l&apos;installateur, ou par les deux.
          </p>
          <p>
            Ce guide recense les <strong>10 pièges à éviter</strong> avant et après
            l&apos;installation d&apos;une <strong>pompe à chaleur</strong> en 2026.
            Certains de ces pièges coûtent quelques centaines d&apos;euros. D&apos;autres
            peuvent vous faire perdre plusieurs milliers d&apos;euros d&apos;aides ou vous
            condamner à une installation sous-performante pour dix ans. Mieux vaut
            les connaître avant de signer.
          </p>
        </div>

        <ArticleCallout type="warning" title="Ce que ce guide vous permet d'éviter">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Un mauvais dimensionnement qui use le compresseur prématurément</li>
            <li>La perte de 4 000 à 8 000 € d&apos;aides pour un vice de procédure</li>
            <li>Des conflits de voisinage pour bruit excessif de l&apos;unité extérieure</li>
            <li>Des radiateurs incompatibles qui font chuter le COP de 40 %</li>
            <li>Une garantie qui ne couvre rien parce qu&apos;une clause a été ignorée</li>
            <li>Une PAC qui s&apos;arrête à -5 °C en plein hiver</li>
          </ul>
        </ArticleCallout>

        <ArticleStat stats={[
          { value: '1 sur 4', label: 'installations de PAC sous-performantes selon les relevés de COP réel en conditions d\'usage (ADEME 2025)', color: 'blue' },
          { value: '8 000 €', label: 'aides cumulables maximum perdues si l\'artisan n\'est pas RGE (MaPrimeRénov\' + CEE 2026)', color: 'blue' },
          { value: '−30 %', label: 'de COP réel en cas de mauvais dimensionnement ou d\'entretien négligé', color: 'blue' },
        ]} />

        {/* ── PIÈGES 1-2 ─────────────────────────────────────────────────── */}
        {PIEGES.slice(0, 2).map((piege) => (
          <div key={piege.num}>
            <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-3 flex items-start gap-3">
              <span className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 text-lg font-black mt-0.5">
                {piege.num}
              </span>
              {piege.titre}
            </h2>
            <p className="text-base font-semibold text-red-600 mb-5 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {piege.accroche}
            </p>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              {piege.contenu.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        ))}

        {/* ── IMAGE 2 ────────────────────────────────────────────────────── */}
        <ArticleImageSection
          image="/images/blog/pac-piege-eviter-technicien-maintenance.webp"
          alt="Technicien certifié RGE contrôlant le circuit frigorifique d'une pompe à chaleur lors de l'entretien annuel obligatoire"
          imagePosition="right"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-start gap-3">
            <span className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 text-lg font-black mt-0.5">
              3
            </span>
            {PIEGES[2].titre}
          </h2>
          <p className="text-base font-semibold text-red-600 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            {PIEGES[2].accroche}
          </p>
          <div className="space-y-3 text-slate-700 leading-relaxed">
            {PIEGES[2].contenu.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Pour trouver un installateur certifié, consultez notre service de{' '}
            <Link href="/services/pompe-a-chaleur" className="text-emerald-700 font-semibold hover:underline">
              pose de pompe à chaleur en Île-de-France
            </Link>{' '}
            — tous nos partenaires sont certifiés QualiPAC RGE avec attestation fluides frigorigènes.
            Et si l&apos;on vous a promis une installation « à 1 euro », méfiance : notre article sur la{' '}
            <Link href="/blog/pompe-a-chaleur-a-1-euro-vrai-ou-faux" className="text-emerald-700 font-semibold hover:underline">
              pompe à chaleur à 1 euro (vrai ou faux)
            </Link>{' '}
            explique en détail pourquoi ce type d&apos;offre est presque toujours un signal d&apos;arnaque.
          </p>
        </ArticleImageSection>

        {/* ── PIÈGES 4-5 ─────────────────────────────────────────────────── */}
        {PIEGES.slice(3, 5).map((piege) => (
          <div key={piege.num}>
            <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-3 flex items-start gap-3">
              <span className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 text-lg font-black mt-0.5">
                {piege.num}
              </span>
              {piege.titre}
            </h2>
            <p className="text-base font-semibold text-red-600 mb-5 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {piege.accroche}
            </p>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              {piege.contenu.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        ))}

        {/* ── IMAGE 3 ────────────────────────────────────────────────────── */}
        <ArticleFullImage
          image="/images/blog/pac-piege-eviter-installation-exterieure.png"
          alt="Unité extérieure de pompe à chaleur mal installée contre un mur de briques — exemple de mauvais emplacement à éviter pour la ventilation et le bruit"
          caption="Un emplacement mal choisi pour l'unité extérieure est un piège classique : trop proche du mur, sans dégagement suffisant pour la circulation d'air, l'unité recircule l'air qu'elle vient de refroidir et dégrade son COP de 10 à 25 %."
        />

        {/* ── PIÈGES 6-8 ─────────────────────────────────────────────────── */}
        {PIEGES.slice(5, 8).map((piege) => (
          <div key={piege.num}>
            <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-3 flex items-start gap-3">
              <span className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 text-lg font-black mt-0.5">
                {piege.num}
              </span>
              {piege.titre}
            </h2>
            <p className="text-base font-semibold text-red-600 mb-5 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {piege.accroche}
            </p>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              {piege.contenu.map((para, i) => (
                <p key={i}>
                  {i === 0 && piege.num === 8 ? (
                    <>
                      {para}{' '}
                      Notre guide complet sur le{' '}
                      <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 font-semibold hover:underline">
                        prix d&apos;une pompe à chaleur en 2026
                      </Link>{' '}
                      détaille tous les dispositifs d&apos;aides cumulables et leur procédure de demande.
                    </>
                  ) : para}
                </p>
              ))}
            </div>
          </div>
        ))}

        <ArticleCallout type="success" title="La procédure correcte pour MaPrimeRénov' en 2026">
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Obtenez des devis d&apos;artisans RGE (sans signer ni rien commander)</li>
            <li>Déposez votre dossier sur <strong>france-renov.gouv.fr</strong> avec les devis</li>
            <li>Attendez l&apos;accord de principe de l&apos;ANAH</li>
            <li>Signez le bon de commande et démarrez les travaux</li>
            <li>Après réception, soumettez les justificatifs pour percevoir l&apos;aide</li>
          </ol>
        </ArticleCallout>

        {/* ── IMAGE 4 + PIÈGES 9-10 ──────────────────────────────────────── */}
        <ArticleImageSection
          image="/images/blog/pac-piege-eviter-unite-fixee-mur.jpg"
          alt="Pompe à chaleur compacte fixée en hauteur sur mur extérieur — installation adaptée aux contraintes de petits espaces et appartements"
          imagePosition="left"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-start gap-3">
            <span className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 text-lg font-black mt-0.5">
              9
            </span>
            {PIEGES[8].titre}
          </h2>
          <p className="text-base font-semibold text-red-600 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            {PIEGES[8].accroche}
          </p>
          <div className="space-y-3 text-slate-700 leading-relaxed">
            {PIEGES[8].contenu.slice(0, 2).map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Pour savoir quel type de PAC choisir selon votre zone climatique et votre
            configuration, lisez notre comparatif{' '}
            <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 font-semibold hover:underline">
              prix et types de pompes à chaleur en 2026
            </Link>.
          </p>
        </ArticleImageSection>

        <div className="space-y-4 text-slate-700 leading-relaxed mt-6">
          {PIEGES[8].contenu.slice(2).map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {/* ── PIÈGE 10 ───────────────────────────────────────────────────── */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-3 flex items-start gap-3">
            <span className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 text-lg font-black mt-0.5">
              10
            </span>
            {PIEGES[9].titre}
          </h2>
          <p className="text-base font-semibold text-red-600 mb-5 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            {PIEGES[9].accroche}
          </p>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            {PIEGES[9].contenu.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>

        {/* ── RÉCAP ──────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Récapitulatif : les 10 pièges à éviter avec une pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Une <strong>pompe à chaleur</strong> bien choisie, bien dimensionnée et bien
          installée est un investissement rentable sur 10 à 15 ans. Mais chacun de
          ces 10 <strong>pièges</strong> peut transformer cette rentabilité attendue en
          déception coûteuse. La bonne nouvelle : ils sont tous évitables, à condition
          de s&apos;informer avant de signer et de choisir un professionnel certifié RGE
          qui prend le temps de faire les choses correctement.
        </p>

        <div className="my-8 grid sm:grid-cols-2 gap-3">
          {PIEGES.map((p) => (
            <div key={p.num} className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
              <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white text-sm font-bold">
                {p.num}
              </span>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{p.titre}</p>
                <p className="text-xs text-red-600 mt-0.5">{p.accroche}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si vous envisagez de{' '}
          <Link href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026" className="text-emerald-700 font-semibold hover:underline">
            remplacer votre chaudière gaz par une pompe à chaleur
          </Link>
          , notre guide dédié vous explique étape par étape la procédure complète,
          les aides disponibles et comment choisir le bon modèle pour votre logement.
          Et si vous vous posez des questions sur la{' '}
          <Link href="/blog/duree-de-vie-pompe-a-chaleur" className="text-emerald-700 font-semibold hover:underline">
            durée de vie d&apos;une pompe à chaleur
          </Link>
          , nous avons aussi un guide complet sur le sujet.
        </p>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <ArticleCTA
          title="Obtenez un devis PAC sans les pièges — artisan RGE certifié QualiPAC"
          description="Nos installateurs certifiés RGE réalisent un calcul de déperditions thermiques, vérifient la compatibilité de vos émetteurs, montent votre dossier MaPrimeRénov' et vous proposent un devis transparent sous 48h. Intervention sur toute l'Île-de-France."
        />

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur les pièges à éviter avec une pompe à chaleur
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
              Installation pompe à chaleur en Île-de-France
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/guide-prix-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une pompe à chaleur en 2026 : coûts, aides et rentabilité
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Remplacer sa chaudière gaz par une PAC : guide 2026
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
              Durée de vie d&apos;une pompe à chaleur : tout ce qu&apos;il faut savoir
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ── LIENS VILLES ───────────────────────────────────────────────── */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Installation PAC par ville en Île-de-France
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
                PAC {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </ArticleLayout>
    </>
  )
}
