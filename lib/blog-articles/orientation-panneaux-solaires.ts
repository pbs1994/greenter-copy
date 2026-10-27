// =============================================================================
// Données article : Orientation des panneaux solaires (2026)
// Angle : ce que coûte réellement chaque orientation et inclinaison en
// Île-de-France (coefficients arrondis issus de PVGIS), pourquoi l'est-ouest
// est devenu intéressant avec l'autoconsommation depuis la baisse du tarif de
// rachat (juin 2026), ombrage, toit plat, façade / balcon, méthode pour
// mesurer l'azimut et la pente de son toit, règles d'urbanisme.
// Complète avantages-panneaux-solaires (rentabilité) sans le cannibaliser.
// Sources : PVGIS (JRC), photovoltaique.info (Hespul), ADEME, Géoportail,
// service-public.fr (déclaration préalable)
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Orientation des panneaux solaires : sud, est-ouest ou nord, quelle production ?",
  subtitle:
    "Orientation des panneaux solaires : production selon l'azimut et l'inclinaison, cas de l'est-ouest, du toit plat et de l'ombrage, et méthode pour mesurer votre toit.",
  slug: "orientation-panneaux-solaires",
  date: "27 octobre 2026",
  dateISO: "2026-10-27",
  readingTime: 14,
  author: "Greenter",
}

// Production relative selon orientation et inclinaison (Île-de-France)
export const COEFFICIENTS_TABLE = {
  columns: [
    { header: "Inclinaison", key: "inclinaison" },
    { header: "Est", key: "est" },
    { header: "Sud-est", key: "sudEst" },
    { header: "Sud", key: "sud", highlight: true },
    { header: "Sud-ouest", key: "sudOuest" },
    { header: "Ouest", key: "ouest" },
  ],
  rows: [
    { inclinaison: "0° (à plat)", est: "87 %", sudEst: "87 %", sud: "87 %", sudOuest: "87 %", ouest: "87 %" },
    { inclinaison: "15°", est: "85 %", sudEst: "93 %", sud: "96 %", sudOuest: "93 %", ouest: "85 %" },
    { inclinaison: "30°", est: "81 %", sudEst: "94 %", sud: "100 %", sudOuest: "94 %", ouest: "81 %" },
    { inclinaison: "45°", est: "76 %", sudEst: "92 %", sud: "99 %", sudOuest: "92 %", ouest: "76 %" },
    { inclinaison: "60°", est: "70 %", sudEst: "86 %", sud: "94 %", sudOuest: "86 %", ouest: "70 %" },
    { inclinaison: "90° (façade)", est: "52 %", sudEst: "64 %", sud: "70 %", sudOuest: "64 %", ouest: "52 %" },
  ],
  caption:
    "Production annuelle en pourcentage de l'optimum (plein sud, 30 à 35°), ordres de grandeur arrondis pour l'Île-de-France calculés à partir de PVGIS, sans ombrage. Plus au sud, les écarts entre orientations se resserrent légèrement. Une orientation plein nord donne environ 72 % à 15° et 55 à 60 % à 30°.",
}

// Exemple de production pour 3 kWc selon la configuration
export const EXEMPLES_TABLE = {
  columns: [
    { header: "Configuration (3 kWc)", key: "config" },
    { header: "Production annuelle", key: "production", highlight: true },
    { header: "Profil dans la journée", key: "profil" },
  ],
  rows: [
    { config: "Plein sud, toit incliné à 35°", production: "≈ 3 300 kWh", profil: "Pic marqué entre 12 h et 15 h" },
    { config: "Sud-ouest, toit incliné à 30°", production: "≈ 3 100 kWh", profil: "Pic décalé vers 14 h à 15 h, utile en fin de journée" },
    { config: "Est-ouest à 15°, toit plat ou deux pans", production: "≈ 2 800 kWh", profil: "Production étalée de 8 h à 19 h, sans pic" },
    { config: "Plein est, toit incliné à 30°", production: "≈ 2 700 kWh", profil: "Production concentrée le matin" },
    { config: "Façade ou garde-corps plein sud, vertical", production: "≈ 2 300 kWh", profil: "Bonne production en hiver, faible en été" },
    { config: "Plein nord, toit incliné à 30°", production: "≈ 1 900 kWh", profil: "Production faible, surtout en été" },
  ],
  caption:
    "Estimations pour une maison d'Île-de-France sans ombrage, environ 1 100 kWh par kWc et par an à l'optimum. Une simulation PVGIS ou une étude sur site affine ces chiffres pour votre adresse.",
}

// Méthode pour connaître l'orientation de son toit
export const METHODE_STEPS = [
  {
    title: "Repérer le toit sur une vue aérienne",
    detail:
      "Ouvrez Géoportail ou la vue satellite de Google Maps, nord en haut de l'écran. Identifiez le pan de toit utilisable : la direction vers laquelle il descend est son orientation.",
  },
  {
    title: "Mesurer l'azimut",
    detail:
      "L'azimut est l'angle entre la direction du pan et le sud. L'outil de mesure de Géoportail, ou la boussole d'un smartphone posée contre la façade parallèle au faîtage, donne une précision suffisante. Éloignez le téléphone des masses métalliques.",
  },
  {
    title: "Estimer l'inclinaison",
    detail:
      "Une application d'inclinomètre posée sur un chevron dans les combles donne l'angle directement. À défaut, les tuiles mécaniques sont souvent posées entre 25 et 35°, les ardoises au-delà de 35°.",
  },
  {
    title: "Relever les ombres",
    detail:
      "Notez les cheminées, lucarnes, arbres, immeubles voisins et reliefs. Pensez à l'hiver : le soleil reste bas et un arbre lointain peut alors masquer le toit pendant plusieurs heures.",
  },
  {
    title: "Simuler la production",
    detail:
      "Saisissez votre adresse, l'azimut et l'inclinaison dans PVGIS, l'outil gratuit de la Commission européenne. Attention à sa convention : 0° correspond au sud, −90° à l'est et 90° à l'ouest.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quelle est la meilleure orientation pour des panneaux solaires ?",
    answer:
      "En France, l'orientation des panneaux solaires qui produit le plus sur l'année est le plein sud, avec une inclinaison de 30 à 35°. Mais l'écart avec le sud-est ou le sud-ouest est faible, de l'ordre de 5 %. Une orientation est-ouest produit environ 15 à 20 % de moins, en répartissant mieux la production sur la journée.",
  },
  {
    question: "Des panneaux solaires orientés est-ouest sont-ils rentables ?",
    answer:
      "Oui, souvent. Ils produisent moins au total, mais le matin et en fin d'après-midi, quand le foyer consomme. Depuis que le surplus n'est plus racheté qu'environ 1,1 centime le kWh, une production mieux consommée compense en grande partie la perte de kWh. Sur un toit plat, l'est-ouest permet en outre de poser davantage de panneaux.",
  },
  {
    question: "Peut-on installer des panneaux solaires orientés nord ?",
    answer:
      "C'est rarement conseillé. Sur un toit incliné à 30°, un pan nord produit environ 40 à 45 % de moins qu'un pan sud. L'option se discute seulement sur une toiture très peu pentue, à moins de 15°, où la perte se limite à 25 à 30 %, ou en complément d'un autre pan mieux exposé.",
  },
  {
    question: "Quelle inclinaison pour des panneaux solaires en Île-de-France ?",
    answer:
      "L'inclinaison optimale se situe entre 30 et 35° en Île-de-France pour maximiser la production annuelle. Entre 15 et 45°, la perte reste inférieure à 5 % pour une orientation sud. Une pente plus forte favorise l'hiver, une pente plus faible favorise l'été.",
  },
  {
    question: "Qu'est-ce que l'azimut d'un panneau solaire ?",
    answer:
      "L'azimut est l'angle entre la direction vers laquelle le panneau est tourné et le sud. Un panneau plein sud a un azimut de 0°, un panneau plein est de −90° et un panneau plein ouest de +90° dans la convention de PVGIS. Certains outils comptent l'azimut depuis le nord : le sud vaut alors 180°.",
  },
  {
    question: "L'ombre est-elle plus grave qu'une mauvaise orientation ?",
    answer:
      "Souvent, oui. Sur une installation avec onduleur central, l'ombre d'une cheminée sur un seul panneau peut réduire la production de toute la chaîne. Les micro-onduleurs ou les optimiseurs limitent la perte au seul panneau ombragé. Une étude d'ombrage doit faire partie de tout devis sérieux.",
  },
  {
    question: "Comment orienter des panneaux solaires sur un toit plat ?",
    answer:
      "Deux choix sont possibles : des panneaux plein sud inclinés à 15 à 30°, espacés pour ne pas se faire d'ombre, ou des rangées est-ouest inclinées à 10 à 15° et dos à dos. La seconde configuration produit un peu moins par panneau mais permet d'en poser davantage, et offre moins de prise au vent, ce qui réduit le lestage.",
  },
  {
    question: "Faut-il une autorisation pour installer des panneaux solaires ?",
    answer:
      "Oui, une déclaration préalable de travaux en mairie est nécessaire pour poser des panneaux sur un toit. Le plan local d'urbanisme peut imposer une pose parallèle au pan de toiture ou limiter les panneaux visibles depuis la rue, et l'architecte des Bâtiments de France donne son avis dans les secteurs protégés.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "Commission européenne (JRC) : PVGIS, Photovoltaic Geographical Information System",
    url: "https://re.jrc.ec.europa.eu/pvg_tools/fr/",
    date: "2026",
  },
  {
    name: "Hespul : photovoltaique.info, implantation et orientation d'une installation",
    url: "https://www.photovoltaique.info",
    date: "2026",
  },
  {
    name: "ADEME : produire de l'électricité grâce au soleil",
    url: "https://agirpourlatransition.ademe.fr/particuliers/maison/energies-renouvelables",
    date: "2025",
  },
  {
    name: "IGN : Géoportail, cartes et outils de mesure",
    url: "https://www.geoportail.gouv.fr",
    date: "2026",
  },
  {
    name: "Service-public.fr : déclaration préalable de travaux pour des panneaux solaires",
    url: "https://www.service-public.fr",
    date: "2026",
  },
]
