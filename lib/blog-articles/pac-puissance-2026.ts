// =============================================================================
// Données article : Puissance pompe à chaleur — calcul et dimensionnement 2026
// Sources : ADEME, AFPAC, DTU 65.16, france-renov.gouv.fr
// Date de recherche : mai 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Puissance pompe à chaleur : comment calculer et choisir ? Guide 2026",
  subtitle:
    "Quelle puissance pour une pompe à chaleur ? Formule de calcul, tableau de 50 à 300 m², zones climatiques et clés pour bien dimensionner votre PAC en 2026.",
  slug: "puissance-pompe-a-chaleur",
  date: "27 mai 2026",
  dateISO: "2026-05-27",
  readingTime: 14,
  author: "Greenter",
}

// Tableau puissance PAC selon la surface et l'isolation — zone H2
export const PUISSANCE_TABLE = {
  columns: [
    { header: "Surface du logement", key: "surface" },
    { header: "Bien isolé (DPE B-C)", key: "bien_isole", highlight: true },
    { header: "Isolation moyenne (DPE D)", key: "moyen", highlight: true },
    { header: "Mal isolé (DPE E-G)", key: "mal_isole" },
  ],
  rows: [
    { surface: "50 m²", bien_isole: "4–5 kW", moyen: "5–7 kW", mal_isole: "7–10 kW" },
    { surface: "80 m²", bien_isole: "5–7 kW", moyen: "7–10 kW", mal_isole: "10–14 kW" },
    { surface: "100 m²", bien_isole: "7–9 kW", moyen: "9–12 kW", mal_isole: "12–16 kW" },
    { surface: "120 m²", bien_isole: "8–11 kW", moyen: "11–14 kW", mal_isole: "14–19 kW" },
    { surface: "150 m²", bien_isole: "10–13 kW", moyen: "13–17 kW", mal_isole: "18–24 kW" },
    { surface: "200 m²", bien_isole: "13–17 kW", moyen: "17–22 kW", mal_isole: "24–32 kW" },
    { surface: "300 m²", bien_isole: "18–24 kW", moyen: "24–32 kW", mal_isole: "36–46 kW" },
  ],
  caption:
    "Zone H2 (Île-de-France, Centre), température extérieure de base −7 °C. Pour zone H1 (Nord, Alpes) : +20 %. Pour zone H3 (Sud, PACA) : −15 %. ECS non incluse (+1 à 3 kW selon les occupants). Sources : ADEME, DTU 65.16, AFPAC 2025.",
}

// Tableau zones climatiques
export const ZONE_TABLE = {
  columns: [
    { header: "Zone climatique", key: "zone" },
    { header: "Régions concernées", key: "regions" },
    { header: "Temp. extérieure de base", key: "temp", highlight: true },
    { header: "Coefficient correcteur", key: "coeff", highlight: true },
    { header: "Puissance pour 100 m² bien isolé", key: "exemple" },
  ],
  rows: [
    {
      zone: "H1",
      regions: "Nord, Alsace, Alpes, Massif Central",
      temp: "−12 à −15 °C",
      coeff: "×1,20–1,30",
      exemple: "9–12 kW",
    },
    {
      zone: "H2",
      regions: "Île-de-France, Centre, Bretagne, Normandie",
      temp: "−7 à −9 °C",
      coeff: "×1,0 (base)",
      exemple: "7–9 kW",
    },
    {
      zone: "H3",
      regions: "Sud, PACA, Languedoc, Corse, Pays Basque",
      temp: "−3 à 0 °C",
      coeff: "×0,80–0,85",
      exemple: "5–7 kW",
    },
  ],
  caption:
    "Températures extérieures de base selon NF EN 12831 et DTU 65.16. La zone climatique est l'un des trois facteurs clés du dimensionnement, avec la surface et le niveau d'isolation.",
}

// Exemple de calcul chiffré
export const EXAMPLE_CALCULATION = {
  title:
    "Calcul de la puissance PAC — maison 100 m² bien isolée (DPE C), zone H2, 3 occupants",
  lines: [
    { label: "Surface chauffée", amount: "100 m²" },
    {
      label: "Coefficient de déperdition (DPE C, zone H2)",
      amount: "70 W/m²",
    },
    {
      label: "Déperditions thermiques (100 × 70 ÷ 1 000)",
      amount: "7,0 kW",
    },
    {
      label: "Ajout production eau chaude sanitaire (3 personnes)",
      amount: "+ 1,5 kW",
    },
    { label: "Puissance brute nécessaire", amount: "8,5 kW" },
    { label: "Marge de sécurité (+15 %)", amount: "× 1,15" },
  ],
  total: { label: "Puissance PAC recommandée", amount: "≈ 10 kW" },
  savings: "1 kWh électrique → 4 kWh de chaleur (COP 4)",
  roi: "MaPrimeRénov' jusqu'à 12 000 € pour l'installation",
}

// Étapes pour bien dimensionner sa PAC
export const TIPS_STEPS = [
  {
    title: "Obtenir ou mettre à jour votre DPE",
    detail:
      "Le Diagnostic de Performance Énergétique classe votre logement de A (très performant) à G (passoire thermique). Il donne le coefficient de déperdition moyen et les besoins thermiques par m². C'est le point de départ obligatoire : sans DPE récent, tout calcul de puissance est une estimation approximative.",
  },
  {
    title: "Identifier votre zone climatique (H1, H2 ou H3)",
    detail:
      "La France est découpée en trois zones réglementaires. La zone H1 (Nord, Alsace, Alpes) impose les températures extérieures de base les plus basses (−12 à −15 °C) et nécessite une PAC plus puissante de 20 à 30 % par rapport à la zone H2. La zone H3 (Sud, PACA) peut se contenter d'une puissance inférieure de 15 à 20 %.",
  },
  {
    title: "Calculer la surface réellement chauffée",
    detail:
      "Ne comptez que les surfaces habitables et chauffées : salon, chambres, cuisine, couloirs. Excluez les garages, caves, greniers non aménagés. Si la hauteur sous plafond dépasse 2,80 m, appliquez un coefficient correcteur de 1,1 à 1,2 pour tenir compte du volume d'air supplémentaire à chauffer.",
  },
  {
    title: "Intégrer la production d'eau chaude sanitaire",
    detail:
      "Si votre PAC air-eau assure la production d'eau chaude sanitaire, ajoutez à la puissance calculée : +1 kW pour 1-2 personnes, +1,5 kW pour 3-4 personnes, +2 à 3 kW pour 5 personnes et plus. Certains modèles intègrent un ballon d'ECS thermodynamique dédié qui optimise cette production.",
  },
  {
    title: "Appliquer la marge de sécurité (10 à 15 %)",
    detail:
      "Un bon dimensionnement intègre une marge de 10 à 15 % pour les hivers exceptionnellement froids ou une dégradation future de l'isolation. Cette marge ne doit pas dépasser 20 % : une PAC trop surdimensionnée fonctionne en cycles courts (phénomène de court-cycling) qui dégradent son COP et accélèrent l'usure du compresseur.",
  },
  {
    title: "Faire valider par un installateur RGE QualiPAC",
    detail:
      "Le calcul final doit être réalisé ou validé par un professionnel certifié RGE QualiPAC. Cette étape est obligatoire pour bénéficier de MaPrimeRénov'. Le technicien effectue un bilan thermique selon la méthode DTU 65.16, qui calcule les déperditions pièce par pièce à partir de l'orientation, des matériaux et des ponts thermiques.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quelle puissance pour une pompe à chaleur pour 100 m² ?",
    answer:
      "Pour une maison de 100 m² bien isolée (DPE B-C) en zone H2 (Île-de-France), il faut une PAC de 7 à 9 kW. Avec une isolation moyenne (DPE D), comptez 9 à 12 kW. Pour une maison mal isolée (DPE E-G), il faut 12 à 16 kW. Ces valeurs incluent une marge de sécurité de 15 % et excluent la production d'eau chaude sanitaire (ajouter 1 à 2 kW).",
  },
  {
    question: "Comment calculer la puissance d'une pompe à chaleur ?",
    answer:
      "La formule est : Puissance (kW) = Surface (m²) × Coefficient de déperdition (W/m²) ÷ 1 000 + ECS. Le coefficient varie de 40-50 W/m² pour un logement très bien isolé (DPE A-B) à 150-200 W/m² pour une passoire thermique (DPE F-G). En zone H2 pour une maison DPE C, comptez environ 70 W/m².",
  },
  {
    question: "Quelle est la puissance minimale d'une pompe à chaleur ?",
    answer:
      "Les PAC air-eau résidentielles démarrent à 4-5 kW, ce qui couvre un logement de 40 à 60 m² bien isolé. Pour une PAC air-air, les unités monosplit commencent à 2-3 kW pour une seule pièce. En dessous de 4 kW, on parle de micro-PAC, adaptées aux très petites surfaces ou aux appartements bien isolés.",
  },
  {
    question: "Une PAC trop puissante, est-ce un problème ?",
    answer:
      "Oui. Une pompe à chaleur surdimensionnée fonctionne en cycles courts (court-cycling) : elle atteint rapidement la consigne, s'arrête, puis redémarre fréquemment. Ces cycles dégradent le COP de 15 à 25 %, usent prématurément le compresseur et créent une chaleur moins homogène. Une PAC bien dimensionnée fonctionne en continu à faible charge — son mode de fonctionnement optimal.",
  },
  {
    question: "Quelle puissance pour une pompe à chaleur de 150 m² ?",
    answer:
      "Pour 150 m² en zone H2, il faut une PAC de 10 à 13 kW si le logement est bien isolé (DPE B-C), de 13 à 17 kW pour une isolation moyenne, et de 18 à 24 kW pour une passoire. En zone H1 (Nord, Alpes), majorez ces valeurs de 20 %. Ces puissances sont compatibles avec MaPrimeRénov' qui ne plafonne pas selon la surface.",
  },
  {
    question: "Quelle différence entre kW thermique et kW électrique pour une PAC ?",
    answer:
      "La puissance d'une PAC est exprimée en kW thermiques — c'est la chaleur qu'elle produit. La puissance électrique absorbée est toujours inférieure grâce au COP. Une PAC de 10 kW thermiques avec un COP de 4 consomme seulement 2,5 kW électriques pour produire 10 kW de chaleur. Sur la fiche technique, vérifiez la puissance calorifique (kW thermiques) et non la puissance absorbée.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Guide pratique dimensionnement des pompes à chaleur résidentielles, 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "DTU 65.16 — Installations de pompes à chaleur, règles de dimensionnement thermique",
    url: "https://www.boutique.afnor.org",
    date: "2024",
  },
  {
    name: "AFPAC — Référentiel des puissances PAC en rénovation résidentielle",
    url: "https://www.afpac.org",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' installation PAC, conditions d'éligibilité 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
]
