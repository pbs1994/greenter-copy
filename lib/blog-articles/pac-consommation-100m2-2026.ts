// =============================================================================
// Données article : Consommation pompe à chaleur maison 100 m² — 2026
// Sources : ADEME, CRE, OTB, france-renov.gouv.fr
// Date de recherche : mai 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Consommation pompe à chaleur maison 100 m² : chiffres et calcul 2026",
  subtitle:
    "Quelle est la consommation d'une pompe à chaleur pour une maison de 100 m² ? Chiffres réels, calcul du COP, facteurs et astuces pour réduire votre facture.",
  slug: "consommation-pompe-a-chaleur-maison-100m2",
  date: "27 mai 2026",
  dateISO: "2026-05-27",
  readingTime: 13,
  author: "Greenter",
}

// Tableau comparatif des systèmes de chauffage pour 100 m²
export const CONSUMPTION_TABLE = {
  columns: [
    { header: "Système de chauffage", key: "systeme" },
    { header: "Maison bien isolée", key: "bien_isole", highlight: true },
    { header: "Maison mal isolée", key: "mal_isole", highlight: true },
    { header: "Coût annuel estimé*", key: "cout" },
  ],
  rows: [
    {
      systeme: "PAC air-eau (SCOP 3,5)",
      bien_isole: "2 900–3 500 kWh élec",
      mal_isole: "4 500–5 100 kWh élec",
      cout: "730–1 275 €",
    },
    {
      systeme: "PAC géothermique (SCOP 4,5)",
      bien_isole: "2 200–2 700 kWh élec",
      mal_isole: "3 300–4 000 kWh élec",
      cout: "550–1 000 €",
    },
    {
      systeme: "Chauffage électrique classique",
      bien_isole: "10 000–12 000 kWh élec",
      mal_isole: "15 000–18 000 kWh élec",
      cout: "2 500–4 500 €",
    },
    {
      systeme: "Chaudière gaz condensation",
      bien_isole: "10 000–12 000 kWh gaz",
      mal_isole: "15 000–18 000 kWh gaz",
      cout: "1 260–2 260 €",
    },
  ],
  caption:
    "* Électricité : 0,25 €/kWh (tarif HP/HC moyen 2026). Gaz : 0,1256 €/kWh (CRE, mai 2026). Usage chauffage + ECS, zone H2 (Île-de-France). Sources : ADEME, CRE.",
}

// Tableau consommation PAC selon surface
export const SURFACE_TABLE = {
  columns: [
    { header: "Surface du logement", key: "surface" },
    { header: "Besoins thermiques annuels", key: "besoins" },
    { header: "Consommation PAC air-eau (SCOP 3,5)", key: "pac", highlight: true },
    { header: "Chauffage électrique équivalent", key: "elec" },
  ],
  rows: [
    {
      surface: "50 m² (bien isolé)",
      besoins: "5 000–6 000 kWh",
      pac: "1 400–1 700 kWh",
      elec: "5 000–6 000 kWh",
    },
    {
      surface: "80 m² (bien isolé)",
      besoins: "8 000–10 000 kWh",
      pac: "2 300–2 900 kWh",
      elec: "8 000–10 000 kWh",
    },
    {
      surface: "100 m² (bien isolé)",
      besoins: "10 000–12 000 kWh",
      pac: "2 900–3 500 kWh",
      elec: "10 000–12 000 kWh",
    },
    {
      surface: "100 m² (mal isolé)",
      besoins: "15 000–18 000 kWh",
      pac: "4 500–5 100 kWh",
      elec: "15 000–18 000 kWh",
    },
    {
      surface: "150 m² (bien isolé)",
      besoins: "15 000–18 000 kWh",
      pac: "4 300–5 200 kWh",
      elec: "15 000–18 000 kWh",
    },
    {
      surface: "200 m² (bien isolé)",
      besoins: "20 000–24 000 kWh",
      pac: "5 700–6 900 kWh",
      elec: "20 000–24 000 kWh",
    },
  ],
  caption:
    "SCOP = coefficient de performance saisonnier moyen. Besoins estimés selon DPE moyen, zone climatique H2. Source : ADEME 2025.",
}

// Exemple de calcul chiffré
export const EXAMPLE_CALCULATION = {
  title:
    "Calcul de la consommation : PAC air-eau pour une maison de 100 m² bien isolée en Île-de-France",
  lines: [
    {
      label: "Besoins thermiques annuels (chauffage + eau chaude sanitaire)",
      amount: "12 000 kWh de chaleur",
    },
    { label: "SCOP moyen de la PAC air-eau (zone H2)", amount: "3,5" },
    {
      label: "Consommation électrique = 12 000 ÷ 3,5",
      amount: "≈ 3 430 kWh/an",
    },
    {
      label: "Coût annuel au tarif HP/HC (0,25 €/kWh)",
      amount: "≈ 857 €/an",
    },
    {
      label: "Chauffage électrique direct équivalent",
      amount: "≈ 3 000 €/an",
    },
  ],
  total: { label: "Économie annuelle vs chauffage électrique classique", amount: "≈ 2 100 €" },
  savings: "÷3,5 vs chauffage électrique classique",
  roi: "Amortissement PAC en 8–12 ans (après aides)",
}

// Étapes pour réduire la consommation
export const TIPS_STEPS = [
  {
    title: "Isoler le logement avant tout",
    detail:
      "Une maison bien isolée réduit les besoins thermiques de 30 à 50 %. Commencez par les combles (30 % des déperditions), puis les murs et les fenêtres. Chaque kWh de chaleur évité est un kWh que la PAC n'a pas à produire — c'est le levier numéro un.",
  },
  {
    title: "Programmer la température selon les plages horaires",
    detail:
      "Baisser la consigne de 1 °C réduit la consommation d'environ 7 %. Programmez 19 °C en journée, 16 °C la nuit et pendant les absences. La PAC est plus efficace à basse température de départ — moins vous lui demandez, meilleur est son COP.",
  },
  {
    title: "Assurer l'entretien annuel de la PAC",
    detail:
      "Un filtre encrassé ou un circuit réfrigérant sous-chargé peut faire chuter le COP de 0,5 à 1 point, soit +15 à 30 % de consommation. L'entretien annuel par un technicien certifié est obligatoire au-dessus de 70 kW et fortement recommandé pour toutes les installations.",
  },
  {
    title: "Dimensionner correctement la puissance",
    detail:
      "Une PAC surdimensionnée cycle trop souvent (arrêts/redémarrages fréquents), ce qui dégrade son efficacité. Un bilan thermique précis par un professionnel RGE permet de choisir la puissance exacte correspondant aux déperditions réelles du logement.",
  },
  {
    title: "Préférer les émetteurs basse température",
    detail:
      "Un plancher chauffant ou des radiateurs basse température permettent à la PAC de fonctionner à 35–40 °C au lieu de 55–65 °C. Le SCOP peut passer de 2,8 à 4,0 — soit 30 % de consommation en moins pour la même chaleur produite.",
  },
  {
    title: "Coupler la PAC avec des panneaux solaires photovoltaïques",
    detail:
      "Une installation de 3 kWc peut couvrir 40 à 60 % de la consommation électrique annuelle d'une PAC pour une maison de 100 m². Le surplus est injecté sur le réseau et valorisé. C'est la combinaison optimale pour approcher la neutralité énergétique.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quelle est la consommation d'une pompe à chaleur pour une maison de 100 m² ?",
    answer:
      "Pour une maison de 100 m² en Île-de-France, une PAC air-eau consomme entre 2 900 et 5 100 kWh d'électricité par an selon le niveau d'isolation. Une maison bien isolée se situe dans le bas de cette fourchette (2 900–3 500 kWh), une maison mal isolée dans le haut (4 500–5 100 kWh). À titre de comparaison, un chauffage électrique classique consomme 10 000 à 15 000 kWh pour la même surface.",
  },
  {
    question: "Comment calculer la consommation d'une pompe à chaleur ?",
    answer:
      "La formule est : consommation électrique (kWh) = besoins thermiques (kWh de chaleur) ÷ COP. Pour une maison de 100 m² bien isolée avec des besoins de 12 000 kWh/an et un COP de 3,5, on obtient 12 000 ÷ 3,5 ≈ 3 430 kWh/an. Le COP (coefficient de performance) est indiqué sur la fiche technique de votre PAC. En pratique, on utilise le SCOP (COP saisonnier), plus représentatif car il intègre les variations de température extérieure sur toute l'année.",
  },
  {
    question: "Combien consomme une PAC air-eau par heure en hiver ?",
    answer:
      "Une PAC air-eau de 8 kW de puissance thermique avec un COP de 3 consomme environ 2,7 kW d'électricité par heure. Si elle fonctionne 12 heures par jour, cela représente environ 32 kWh/jour en hiver. En demi-saison, la consommation descend à 8–15 kWh/jour. La consommation varie donc fortement selon la température extérieure et la saison.",
  },
  {
    question: "Quelle différence de consommation entre une maison bien isolée et une maison mal isolée ?",
    answer:
      "La différence est considérable : une maison de 100 m² mal isolée peut nécessiter jusqu'à 18 000 kWh de chaleur par an, contre 10 000–12 000 kWh pour la même surface bien isolée. Avec un SCOP de 3,5, cela représente respectivement 5 100 kWh contre 3 430 kWh d'électricité — soit 48 % de consommation supplémentaire. Isoler avant d'installer une PAC est toujours la stratégie la plus rentable.",
  },
  {
    question: "Comment réduire la consommation électrique d'une pompe à chaleur ?",
    answer:
      "Les leviers les plus efficaces : 1) Améliorer l'isolation (combles, murs, fenêtres), 2) Baisser la consigne de 1–2 °C la nuit et en absence, 3) Utiliser des émetteurs basse température (plancher chauffant, radiateurs à basse température), 4) Entretien annuel de la PAC, 5) Coupler avec du solaire photovoltaïque. Chacun de ces leviers peut réduire la consommation de 10 à 30 %.",
  },
  {
    question: "La PAC consomme-t-elle de l'électricité en dehors de la saison de chauffe ?",
    answer:
      "Oui, mais très peu. En dehors de la saison de chauffe (d'avril à octobre en Île-de-France), une PAC air-eau continue de produire l'eau chaude sanitaire, ce qui représente environ 300 à 500 kWh par an supplémentaires. En été, si le modèle propose un rafraîchissement passif, la consommation est quasi nulle (30–50 W). La PAC consomme donc surtout entre novembre et mars.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Performances réelles des PAC résidentielles en France, étude 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "Commission de Régulation de l'Énergie (CRE) — Prix de référence électricité et gaz, mai 2026",
    url: "https://www.cre.fr",
    date: "mai 2026",
  },
  {
    name: "Observatoire Technique du Bâtiment — Retours d'expérience PAC air-eau en rénovation",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' installation PAC, barèmes 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
]
