// =============================================================================
// Données article : Isolation plafond des caves — guide 2026
// Angle : approfondissement du seul plafond de cave (= plancher bas du
// logement) : gain réel, types de supports (dalle, hourdis, voûte, solives),
// choix de l'isolant pour R ≥ 3, pose, contraintes (réseaux, humidité, feu),
// cas de la copropriété, prix et aides. Complémentaire de "isolation-pour-cave"
// (vue d'ensemble murs + sol + plafond), sans la cannibaliser.
// Sources : ADEME, fiche CEE BAR-EN-103, France Rénov', ANAH
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation plafond des caves : isolants, pose, prix et aides en 2026",
  subtitle:
    "Isolation plafond des caves : quel isolant pour atteindre R ≥ 3, quelle pose selon votre plafond, quel prix et quelles aides, en maison ou en copropriété.",
  slug: "isolation-plafond-des-caves",
  date: "19 octobre 2026",
  dateISO: "2026-10-19",
  readingTime: 15,
  author: "Greenter",
}

// Estimation du gain d'une isolation du plafond de cave
export const GAIN_TABLE = {
  columns: [
    { header: "Hypothèse", key: "hypothese" },
    { header: "Valeur", key: "valeur", highlight: true },
  ],
  rows: [
    { hypothese: "Maison de 100 m² sur cave non chauffée, facture de chauffage annuelle", valeur: "≈ 1 800 €" },
    { hypothese: "Part des pertes par le plancher bas (fourchette ADEME 7 à 10 %)", valeur: "≈ 8 %, soit ≈ 145 €/an" },
    { hypothese: "Pertes évitées par une isolation R ≥ 3 sous une dalle non isolée", valeur: "≈ 75 %" },
    { hypothese: "Économie annuelle estimée", valeur: "≈ 100 à 120 €/an" },
    { hypothese: "Gain de température en surface du sol de la pièce au-dessus", valeur: "+2 à +4 °C" },
  ],
  caption:
    "Estimation Greenter, ordre de grandeur pour une maison de plain-pied ou à étage chauffée au-dessus d'une cave non chauffée. Le gain de confort (fini les pieds froids) est souvent plus perceptible que l'économie sur la facture.",
}

// Comparatif des isolants pour plafond de cave
export const ISOLANTS_TABLE = {
  columns: [
    { header: "Isolant", key: "isolant" },
    { header: "Épaisseur pour R = 3", key: "epaisseur" },
    { header: "Comportement au feu", key: "feu" },
    { header: "Points forts", key: "atouts", highlight: true },
  ],
  rows: [
    { isolant: "Laine de roche (panneaux rigides)", epaisseur: "≈ 105 – 120 mm", feu: "Incombustible (A1)", atouts: "Sécurité incendie, acoustique, référence en copropriété" },
    { isolant: "Polystyrène expansé (PSE)", epaisseur: "≈ 100 – 120 mm", feu: "Combustible, à protéger", atouts: "Léger, peu cher, insensible à l'humidité" },
    { isolant: "Polyuréthane (PU / PIR)", epaisseur: "≈ 70 – 80 mm", feu: "Combustible, à protéger", atouts: "Le plus fin : préserve la hauteur sous plafond" },
    { isolant: "Fibre de bois rigide", epaisseur: "≈ 115 – 125 mm", feu: "Combustible", atouts: "Biosourcé, régule l'humidité" },
    { isolant: "Panneaux composites laine de roche + parement", epaisseur: "≈ 110 – 130 mm", feu: "Selon classement du produit", atouts: "Finition décorative, adaptés aux parkings et caves collectives" },
    { isolant: "Isolant mince réfléchissant", epaisseur: "Inatteignable seul", feu: "Variable", atouts: "Complément uniquement, non éligible aux aides seul" },
  ],
  caption:
    "Épaisseurs indicatives calculées avec des conductivités thermiques courantes (λ de 0,022 à 0,040 W/m.K). Vérifiez la résistance thermique R certifiée (ACERMI) du produit choisi et son classement de réaction au feu.",
}

// Étapes de pose
export const POSE_STEPS = [
  {
    title: "Diagnostiquer le plafond et la cave",
    detail:
      "Identifiez la nature du plafond (dalle béton, hourdis, voûte, solives bois), mesurez la hauteur disponible et vérifiez l'humidité de la cave. Des traces d'infiltration ou de salpêtre doivent être traitées avant d'isoler.",
  },
  {
    title: "Dégager et préparer les réseaux",
    detail:
      "Repérez canalisations, gaines électriques, conduits de ventilation et luminaires. Les réseaux qui doivent rester accessibles sont rehaussés, déplacés ou contournés, et les points lumineux prévus à la bonne hauteur sous le futur isolant.",
  },
  {
    title: "Nettoyer et préparer le support",
    detail:
      "Brossez la dalle pour retirer poussière et parties friables, rebouchez les fissures et vérifiez la planéité. Un support sain garantit la bonne tenue des chevilles ou de la colle.",
  },
  {
    title: "Poser les panneaux isolants",
    detail:
      "Les panneaux sont posés bord à bord, en quinconce, sans espace entre eux, puis fixés mécaniquement avec des chevilles à rosace adaptées au support. Sur une dalle plane, un collage complété de chevilles est possible selon le fabricant.",
  },
  {
    title: "Traiter les jonctions et les points singuliers",
    detail:
      "Le pourtour des murs, les passages de tuyaux et les retombées de poutres sont soigneusement calfeutrés pour éviter les ponts thermiques. Sur les murs de la cave, un retour d'isolant de 50 cm limite le pont thermique en périphérie.",
  },
  {
    title: "Contrôler et remettre en service",
    detail:
      "Vérifiez la continuité de l'isolant, remettez en place luminaires et équipements, et assurez-vous que la cave reste ventilée par ses soupiraux ou grilles : une cave isolée en plafond devient plus fraîche et doit continuer à respirer.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "L'isolation du plafond des caves est-elle vraiment utile ?",
    answer:
      "Oui, dès que la cave n'est pas chauffée. Le plafond de la cave est le plancher bas de votre logement, par lequel l'ADEME estime que passent 7 à 10 % des pertes de chaleur d'une maison non isolée. L'isolation réduit ces pertes d'environ trois quarts, et surtout supprime la sensation de sol froid dans les pièces situées au-dessus.",
  },
  {
    question: "Quel est le meilleur isolant pour le plafond d'une cave ?",
    answer:
      "Les panneaux rigides de laine de roche sont la référence : incombustibles, insensibles à l'humidité et efficaces aussi contre le bruit. Le polyuréthane convient quand la hauteur sous plafond est limitée, car il atteint R = 3 avec environ 8 cm seulement. Le polystyrène est économique mais combustible : il doit être protégé et il est généralement exclu des caves collectives.",
  },
  {
    question: "Quelle épaisseur d'isolant pour le plafond d'une cave ?",
    answer:
      "Visez une résistance thermique R ≥ 3 m².K/W, le seuil exigé pour les primes CEE. Cela correspond à environ 10 à 12 cm de laine de roche ou de polystyrène, 7 à 8 cm de polyuréthane, ou 12 cm de fibre de bois. Une épaisseur supérieure améliore encore le résultat si la hauteur sous plafond le permet.",
  },
  {
    question: "Combien coûte l'isolation du plafond des caves ?",
    answer:
      "Comptez en moyenne 20 à 60 € TTC par m² posé pour des panneaux isolants fixés sous une dalle béton, selon l'isolant, l'épaisseur et le nombre de réseaux à contourner. Un plafond voûté ou très encombré coûte plus cher. Les primes CEE et la TVA à 5,5 % réduisent la facture lorsque les travaux sont réalisés par une entreprise RGE.",
  },
  {
    question: "Peut-on isoler soi-même le plafond de sa cave ?",
    answer:
      "C'est possible sur une dalle béton plane et peu encombrée, avec des panneaux et des chevilles adaptés. Mais vous ne bénéficierez pas des aides, réservées aux travaux réalisés par un professionnel RGE, et la pose au plafond est physiquement exigeante. Sur une voûte, un plancher bois ou une cave humide, l'avis d'un professionnel est vivement recommandé.",
  },
  {
    question: "Faut-il un pare-vapeur pour isoler le plafond d'une cave ?",
    answer:
      "Sous une dalle béton, en général non : la dalle freine déjà la vapeur venant du logement et l'isolant posé côté cave n'est pas exposé au risque de condensation. Sous un plancher bois, la question se pose davantage et dépend de l'humidité de la cave : un professionnel peut recommander une membrane hygrorégulante. Dans tous les cas, la cave doit rester ventilée.",
  },
  {
    question: "Comment isoler le plafond d'une cave voûtée ?",
    answer:
      "La voûte rend la pose de panneaux rigides difficile. Les solutions courantes sont la projection d'isolant (laine minérale ou mousse polyuréthane) qui épouse la forme de la voûte, ou la création d'un faux plafond droit isolé sous la voûte si la hauteur le permet. Un isolant mince réfléchissant seul ne suffit pas à atteindre une performance éligible aux aides.",
  },
  {
    question: "Comment isoler le plafond des caves en copropriété ?",
    answer:
      "Les caves et sous-sols font partie des parties communes : les travaux doivent être votés en assemblée générale, sur la base de devis présentés par le syndic. L'isolant doit respecter la réglementation incendie applicable aux parties communes, ce qui oriente généralement vers la laine de roche ou des panneaux incombustibles. Les primes CEE et, selon le projet, MaPrimeRénov' Copropriété peuvent financer une partie des travaux.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Isoler sa maison : répartition des déperditions thermiques et isolation des planchers bas",
    url: "https://agirpourlatransition.ademe.fr/particuliers/maison/isolation",
    date: "2025",
  },
  {
    name: "Ministère de la Transition écologique — Fiche CEE BAR-EN-103 « Isolation d'un plancher »",
    url: "https://www.ecologie.gouv.fr/operations-standardisees-deconomies-denergie",
    date: "2026",
  },
  {
    name: "France Rénov' — Isolation des planchers bas et aides disponibles",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "ANAH — MaPrimeRénov' Copropriété : conditions et montants",
    url: "https://www.anah.gouv.fr",
    date: "2026",
  },
]
