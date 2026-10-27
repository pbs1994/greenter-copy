// =============================================================================
// Données article : Avantages des panneaux solaires (2026)
// Angle : bilan honnête des avantages après la réforme du 5 juin 2026 (fin de
// la prime à l'autoconsommation, surplus racheté environ 1,1 c€/kWh) et la TVA
// à 5,5 % depuis le 1er octobre 2025. Le principal avantage devient
// l'autoconsommation : exemples chiffrés en Île-de-France, durée de vie,
// bilan carbone, DPE, limites, étapes du projet. Renvoie vers l'article
// orientation-panneaux-solaires pour l'implantation.
// Sources : CRE / EDF OA, arrêté du 1er juin 2026, PVGIS (JRC), ADEME,
// photovoltaique.info (Hespul), Soren, service-public.fr
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Avantages des panneaux solaires : ce qu'ils rapportent vraiment en 2026",
  subtitle:
    "Avantages des panneaux solaires en 2026 : économies sur la facture, rentabilité chiffrée, durée de vie, bilan carbone, DPE. Ce qui a changé et les limites à connaître.",
  slug: "avantages-panneaux-solaires",
  date: "27 octobre 2026",
  dateISO: "2026-10-27",
  readingTime: 15,
  author: "Greenter",
}

// Rentabilité : trois profils de foyer en Île-de-France
export const RENTABILITE_TABLE = {
  columns: [
    { header: "Installation", key: "installation" },
    { header: "Production annuelle", key: "production" },
    { header: "Part autoconsommée", key: "autoconso" },
    { header: "Gain annuel estimé", key: "gain", highlight: true },
    { header: "Retour sur investissement", key: "roi" },
  ],
  rows: [
    { installation: "3 kWc, sans batterie, foyer absent la journée", production: "≈ 3 300 kWh", autoconso: "35 à 40 %", gain: "≈ 250 à 280 €", roi: "plus de 25 ans" },
    { installation: "3 kWc, sans batterie, ballon d'eau chaude piloté", production: "≈ 3 300 kWh", autoconso: "55 à 65 %", gain: "≈ 370 à 430 €", roi: "17 à 20 ans" },
    { installation: "6 kWc, pompe à chaleur et véhicule électrique", production: "≈ 6 600 kWh", autoconso: "60 à 70 %", gain: "≈ 800 à 920 €", roi: "13 à 15 ans" },
    { installation: "6 kWc avec batterie de 10 kWh", production: "≈ 6 600 kWh", autoconso: "75 à 85 %", gain: "≈ 980 à 1 100 €", roi: "16 à 18 ans" },
  ],
  caption:
    "Hypothèses : toiture orientée sud à sud-ouest, inclinaison 30 à 35°, environ 1 100 kWh produits par kWc et par an en Île-de-France (PVGIS), électricité du réseau à 0,195 € TTC/kWh, surplus racheté 1,1 c€/kWh. Prix posés TTC avec TVA à 5,5 % : 3 kWc ≈ 7 500 €, 6 kWc ≈ 12 000 €, batterie ≈ 6 000 € de plus. Calcul sans hausse du prix de l'électricité : chaque hausse raccourcit le retour sur investissement.",
}

// Durée de vie des composants
export const DUREE_TABLE = {
  columns: [
    { header: "Composant", key: "composant" },
    { header: "Durée de vie courante", key: "duree", highlight: true },
    { header: "Garantie habituelle", key: "garantie" },
  ],
  rows: [
    { composant: "Panneaux photovoltaïques", duree: "30 à 40 ans", garantie: "Produit 15 à 30 ans, performance 80 à 90 % à 25 ou 30 ans" },
    { composant: "Micro-onduleurs", duree: "20 à 25 ans", garantie: "20 à 25 ans" },
    { composant: "Onduleur central", duree: "10 à 15 ans", garantie: "5 à 12 ans (extensible)" },
    { composant: "Batterie lithium-fer-phosphate", duree: "10 à 15 ans (6 000 cycles et plus)", garantie: "10 ans" },
    { composant: "Structure et fixations", duree: "Durée de la toiture", garantie: "10 ans (décennale de l'installateur)" },
  ],
  caption:
    "Valeurs constatées sur le marché résidentiel en 2026. La perte de rendement des panneaux récents se situe autour de 0,3 à 0,5 % par an.",
}

// Étapes d'un projet
export const PROJET_STEPS = [
  {
    title: "Analyser votre consommation",
    detail:
      "Récupérez vos relevés sur votre espace client ou sur l'application de votre fournisseur. La consommation en journée, et pas seulement le total annuel, détermine la puissance utile et la part que vous pourrez autoconsommer.",
  },
  {
    title: "Vérifier la toiture",
    detail:
      "Orientation, inclinaison, ombres portées, état de la couverture et de la charpente : une toiture à refaire dans les cinq ans doit l'être avant la pose. C'est aussi le moment de l'isoler si besoin.",
  },
  {
    title: "Dimensionner l'installation",
    detail:
      "Un installateur sérieux simule la production heure par heure et la compare à votre courbe de consommation. Il vaut mieux 3 kWc bien autoconsommés que 9 kWc dont la moitié part sur le réseau à un centime le kWh.",
  },
  {
    title: "Comparer des devis RGE QualiPV",
    detail:
      "Exigez la marque des panneaux et de l'onduleur, la puissance exacte, la production estimée, les garanties, le prix TTC avec TVA à 5,5 % et la prise en charge des démarches. Méfiez-vous des promesses d'autonomie totale.",
  },
  {
    title: "Faire les démarches administratives",
    detail:
      "Déclaration préalable de travaux en mairie, demande de raccordement auprès d'Enedis, attestation Consuel et contrat de rachat du surplus avec EDF OA. L'installateur s'en charge le plus souvent.",
  },
  {
    title: "Suivre la production",
    detail:
      "L'application de l'onduleur ou des micro-onduleurs affiche la production en temps réel. Elle permet de décaler les usages vers les heures ensoleillées et de repérer rapidement une panne.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quels sont les principaux avantages des panneaux solaires ?",
    answer:
      "Le premier avantage des panneaux solaires est de produire une électricité que vous consommez sur place, à la place de celle du réseau facturée près de 20 centimes le kWh. S'y ajoutent une longue durée de vie de 30 à 40 ans, un entretien très réduit, une protection contre les hausses de tarif, une électricité bas carbone et une amélioration possible du DPE du logement.",
  },
  {
    question: "Les panneaux solaires sont-ils encore rentables en 2026 ?",
    answer:
      "Oui, à condition de consommer une grande partie de sa production. Depuis le 5 juin 2026, la prime à l'autoconsommation n'existe plus pour les nouvelles installations et le surplus n'est racheté qu'environ 1,1 centime le kWh. En Île-de-France, le retour sur investissement se situe autour de 13 à 20 ans selon le taux d'autoconsommation, moins si le prix de l'électricité continue d'augmenter, pour des panneaux qui durent 30 ans ou plus.",
  },
  {
    question: "Quelles aides pour installer des panneaux solaires en 2026 ?",
    answer:
      "La principale aide est la TVA à 5,5 % sur le matériel et la pose pour les installations jusqu'à 9 kWc, en vigueur depuis le 1er octobre 2025. La prime à l'autoconsommation a été supprimée pour les demandes de raccordement déposées à partir du 5 juin 2026. Le photovoltaïque n'est éligible ni à MaPrimeRénov' ni aux primes CEE, mais certaines collectivités proposent des aides locales.",
  },
  {
    question: "Faut-il une batterie avec des panneaux solaires ?",
    answer:
      "Pas forcément. Une batterie fait passer l'autoconsommation de 35 à 40 % à 75 à 85 %, ce qui a plus de valeur depuis que le surplus est racheté très peu cher. Mais elle coûte plusieurs milliers d'euros et allonge souvent le retour sur investissement. Piloter d'abord le ballon d'eau chaude, la pompe à chaleur ou la recharge du véhicule est généralement plus rentable.",
  },
  {
    question: "Combien de temps durent des panneaux solaires ?",
    answer:
      "Les panneaux photovoltaïques actuels durent 30 à 40 ans. Les fabricants garantissent en général 80 à 90 % de la puissance d'origine au bout de 25 ou 30 ans. L'onduleur central doit être remplacé une fois au cours de cette période, vers 10 à 15 ans, alors que les micro-onduleurs durent en principe aussi longtemps que les panneaux.",
  },
  {
    question: "Les panneaux solaires fonctionnent-ils en hiver et par temps nuageux ?",
    answer:
      "Oui, mais beaucoup moins. Les panneaux captent la lumière et non la chaleur : ils produisent même par ciel couvert, avec un rendement réduit. En Île-de-France, la production d'un mois de décembre représente environ un cinquième de celle d'un mois de juin. Le froid, lui, améliore légèrement le rendement des cellules.",
  },
  {
    question: "Les panneaux solaires sont-ils écologiques ?",
    answer:
      "Leur électricité émet environ 25 à 45 g de CO2 par kWh sur l'ensemble du cycle de vie, essentiellement lors de la fabrication. Un panneau rembourse l'énergie nécessaire à sa fabrication en un à trois ans, pour 30 ans de production. En fin de vie, il est recyclable à plus de 90 % de sa masse, via la filière Soren financée par une éco-participation.",
  },
  {
    question: "Des panneaux solaires permettent-ils d'avoir du courant pendant une coupure ?",
    answer:
      "Pas une installation standard. Par sécurité, un onduleur raccordé au réseau se coupe automatiquement lors d'une panne d'Enedis, même en plein soleil. Pour garder du courant, il faut une batterie associée à un onduleur doté d'une fonction de secours, qui alimente alors un circuit dédié.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "Arrêté du 1er juin 2026 modifiant les conditions d'achat de l'électricité produite par les installations photovoltaïques sur bâtiment (JO du 4 juin 2026)",
    url: "https://www.legifrance.gouv.fr",
    date: "2026",
  },
  {
    name: "EDF OA : tarifs d'achat et contrat de vente du surplus",
    url: "https://www.edf-oa.fr",
    date: "2026",
  },
  {
    name: "Service-public.fr : taux de TVA applicable aux installations photovoltaïques jusqu'à 9 kWc",
    url: "https://www.service-public.fr",
    date: "2025",
  },
  {
    name: "Commission européenne (JRC) : PVGIS, estimation de la production photovoltaïque",
    url: "https://re.jrc.ec.europa.eu/pvg_tools/fr/",
    date: "2026",
  },
  {
    name: "ADEME : Base Empreinte, facteurs d'émission de l'électricité photovoltaïque",
    url: "https://base-empreinte.ademe.fr",
    date: "2025",
  },
  {
    name: "Hespul : photovoltaique.info, démarches et fonctionnement d'une installation",
    url: "https://www.photovoltaique.info",
    date: "2026",
  },
  {
    name: "Soren : collecte et recyclage des panneaux photovoltaïques",
    url: "https://www.soren.eco",
    date: "2025",
  },
]
