// =============================================================================
// Données enrichies par ville — Sources : INSEE 2022, ADEME, Météo France
// =============================================================================

export interface CityData {
  slug: string
  population: number
  logements: number
  pctMaisons: number
  dpeMoyen: string
  zoneClimatique: string
  dju: number
  anneeConstruction: string
  caracteristique: string
  economieChauffage: string
  potentielSolaire: string
  // Données énergétiques détaillées
  pctChauffageGaz: number        // % logements chauffés au gaz
  pctChauffageFioul: number      // % logements chauffés au fioul
  pctChauffageElec: number       // % logements chauffés à l'électricité
  pctPassoiresThermiques: number // % logements DPE F ou G
  consommationMoyenne: number    // kWh/m²/an moyenne du parc
  recommendationPAC: string      // Recommandation PAC spécifique à la ville
  contexteEnergetique: string    // Paragraphe unique sur le contexte énergétique local
}

export function getCityData(slug: string): CityData | null {
  return CITIES_DATA[slug] || null
}

export const CITIES_DATA: Record<string, CityData> = {
  // ---- Seine-et-Marne (77) - Zone primaire ----
  "ozoir-la-ferriere": {
    slug: "ozoir-la-ferriere", population: 21000, logements: 8200, pctMaisons: 78,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1970-1990",
    caracteristique: "Commune pavillonnaire de Grande Couronne avec un parc de maisons individuelles des années 70-90, souvent chauffées au gaz. Cadre verdoyant proche de la forêt de Rougeau, idéal pour les PAC air-eau.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 62, pctChauffageFioul: 12, pctChauffageElec: 22, pctPassoiresThermiques: 18, consommationMoyenne: 245,
    recommendationPAC: "PAC air-eau recommandée pour les pavillons avec chauffage central gaz existant. Remplacement direct de la chaudière sans modifier les radiateurs.",
    contexteEnergetique: "Avec 78% de maisons individuelles construites majoritairement entre 1970 et 1990, Ozoir-la-Ferrière présente un parc immobilier typique de la Grande Couronne où le chauffage au gaz domine (62%). La RT 2012 n'était pas en vigueur lors de la construction de ces maisons : isolation insuffisante des combles et murs, simple vitrage souvent remplacé mais ponts thermiques persistants. Le passage à la pompe à chaleur air-eau permet de conserver le réseau de radiateurs existant tout en divisant la facture par 3."
  },
  "roissy-en-brie": {
    slug: "roissy-en-brie", population: 24000, logements: 9100, pctMaisons: 72,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1995",
    caracteristique: "Ville résidentielle avec de nombreux pavillons des années 80. Forte proportion de chauffage au gaz individuel. Proximité du RER E facilitant l'accès aux artisans.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon",
    pctChauffageGaz: 58, pctChauffageFioul: 8, pctChauffageElec: 28, pctPassoiresThermiques: 15, consommationMoyenne: 230,
    recommendationPAC: "PAC air-eau idéale pour les maisons avec chauffage central. PAC air-air en complément pour les maisons tout électrique avec convecteurs vieillissants.",
    contexteEnergetique: "Roissy-en-Brie s'est développée dans les années 80 avec de grands lotissements pavillonnaires. Le parc est relativement homogène : maisons de 90 à 120 m² avec sous-sol, chauffage gaz ou électrique. Les chaudières gaz installées à l'époque arrivent en fin de vie (30+ ans) et leur remplacement par une PAC air-eau est le choix le plus rentable. La ville bénéficie d'un bon ensoleillement pour coupler PAC + panneaux solaires."
  },
  "chevry-cossigny": {
    slug: "chevry-cossigny", population: 3200, logements: 1200, pctMaisons: 88,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1980-2000",
    caracteristique: "Petit village rural très pavillonnaire entre Brie-Comte-Robert et Ozoir. Maisons avec grands jardins et terrains spacieux, parfaits pour l'implantation d'unités extérieures PAC.",
    economieChauffage: "950€ à 1 400€", potentielSolaire: "Bon",
    pctChauffageGaz: 45, pctChauffageFioul: 25, pctChauffageElec: 25, pctPassoiresThermiques: 20, consommationMoyenne: 260,
    recommendationPAC: "PAC air-eau fortement recommandée, surtout pour remplacer les chaudières fioul encore nombreuses. Les grands terrains facilitent l'installation de l'unité extérieure loin des voisins.",
    contexteEnergetique: "Village rural où le fioul représente encore 25% du chauffage — un record pour l'Île-de-France. L'interdiction progressive du fioul (2022 pour le neuf, 2028 pour le remplacement) rend le passage à la PAC urgent. Les maisons spacieuses avec grands jardins sont idéales : aucune contrainte de bruit pour l'unité extérieure, et la possibilité d'installer des capteurs solaires en complément."
  },
  "lesigny": {
    slug: "lesigny", population: 8000, logements: 3100, pctMaisons: 82,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1995",
    caracteristique: "Commune verte avec golf et espaces boisés. Parc immobilier dominé par des pavillons familiaux des années 80, souvent équipés de chaudières gaz vieillissantes à remplacer.",
    economieChauffage: "900€ à 1 350€", potentielSolaire: "Bon",
    pctChauffageGaz: 55, pctChauffageFioul: 15, pctChauffageElec: 25, pctPassoiresThermiques: 17, consommationMoyenne: 240,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage central, ou PAC hybride gaz+PAC pour les hivers rigoureux en lisière de forêt.",
    contexteEnergetique: "Lésigny est une commune résidentielle aisée où les propriétaires investissent dans la valorisation de leur patrimoine. Le golf et les espaces boisés créent un microclimat légèrement plus froid en hiver (DJU 2600). Les maisons des années 80, souvent de standing (120-150 m²), consomment en moyenne 240 kWh/m²/an — bien au-dessus du seuil de 180 kWh visé après rénovation. La PAC air-eau combinée à une isolation des combles permet d'atteindre cet objectif."
  },
  "pontault-combault": {
    slug: "pontault-combault", population: 38000, logements: 14800, pctMaisons: 68,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1970-1990",
    caracteristique: "Grande commune mixte avec zones pavillonnaires et petits collectifs. Centre commercial dynamique. Beaucoup de maisons des années 70 avec isolation d'origine à rénover.",
    economieChauffage: "850€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 60, pctChauffageFioul: 10, pctChauffageElec: 26, pctPassoiresThermiques: 22, consommationMoyenne: 250,
    recommendationPAC: "PAC air-eau pour les maisons individuelles, PAC air-air gainable pour les petits collectifs en copropriété.",
    contexteEnergetique: "Plus grande ville de la zone avec 38 000 habitants, Pontault-Combault a un parc immobilier varié. Les quartiers pavillonnaires des années 70 (Le Bois l'Évêque, La Haie Passart) sont les plus énergivores : 22% de passoires thermiques (DPE F ou G). La loi Climat oblige les propriétaires de logements classés G à rénover avant 2025 et F avant 2028. C'est la commune où le potentiel de rénovation est le plus important du secteur."
  },
  "gretz-armainvilliers": {
    slug: "gretz-armainvilliers", population: 9500, logements: 3700, pctMaisons: 75,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1960-1990",
    caracteristique: "Bourg ancien avec extension pavillonnaire, proche de la forêt d'Armainvilliers. Maisons anciennes avec déperditions thermiques importantes, fort potentiel de rénovation énergétique.",
    economieChauffage: "950€ à 1 400€", potentielSolaire: "Bon",
    pctChauffageGaz: 50, pctChauffageFioul: 20, pctChauffageElec: 24, pctPassoiresThermiques: 25, consommationMoyenne: 270,
    recommendationPAC: "PAC air-eau haute température recommandée pour les maisons anciennes avec radiateurs fonte. Permet de garder les émetteurs existants.",
    contexteEnergetique: "Gretz-Armainvilliers possède un parc immobilier parmi les plus anciens du secteur, avec de nombreuses maisons d'avant 1975 aux murs en pierre ou parpaing sans isolation. Le taux de passoires thermiques atteint 25%, le plus élevé de la zone. La proximité de la forêt d'Armainvilliers rend les hivers plus froids (2650 DJU). Une PAC haute température (65°C) est recommandée pour fonctionner avec les radiateurs fonte d'origine sans les remplacer."
  },
  "tournan-en-brie": {
    slug: "tournan-en-brie", population: 9000, logements: 3500, pctMaisons: 73,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1970-2000",
    caracteristique: "Bourg historique de la Brie avec un marché réputé. Mélange de maisons anciennes en centre-ville et pavillons récents en périphérie. Gare Transilien facilitant les interventions.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 18, pctChauffageElec: 25, pctPassoiresThermiques: 20, consommationMoyenne: 255,
    recommendationPAC: "PAC air-eau pour les pavillons neufs en périphérie, PAC haute température pour les maisons anciennes du centre-bourg.",
    contexteEnergetique: "Tournan-en-Brie présente un double visage énergétique : le centre ancien avec des maisons de ville en pierre (XVIIe-XIXe siècle) très énergivores, et les extensions pavillonnaires des années 80-2000 mieux isolées. Le fioul reste présent (18%) dans les maisons anciennes du centre. Le raccordement gaz étant limité dans certains quartiers excentrés, la PAC est souvent la seule alternative économique au fioul."
  },
  "brie-comte-robert": {
    slug: "brie-comte-robert", population: 18000, logements: 7000, pctMaisons: 70,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Ville médiévale avec château classé et centre historique. Extensions pavillonnaires des années 80-90. Proximité de l'A5 et de Sénart, bassin de vie en pleine croissance.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon",
    pctChauffageGaz: 58, pctChauffageFioul: 10, pctChauffageElec: 27, pctPassoiresThermiques: 16, consommationMoyenne: 235,
    recommendationPAC: "PAC air-eau pour les pavillons récents, PAC hybride pour les maisons du centre historique avec contraintes architecturales.",
    contexteEnergetique: "Brie-Comte-Robert est en pleine expansion grâce à sa position entre la Francilienne et l'A5. Les nouveaux quartiers (post-2000) respectent la RT 2005/2012 et sont bien isolés, mais les lotissements des années 80 autour du centre médiéval présentent des consommations élevées. Le centre historique classé impose des contraintes sur les unités extérieures : un modèle discret et silencieux est indispensable."
  },
  "melun": {
    slug: "melun", population: 41000, logements: 19500, pctMaisons: 42,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "avant 1975",
    caracteristique: "Préfecture de Seine-et-Marne avec un centre-ville dense et ancien. Quartiers pavillonnaires en périphérie. Important parc de logements anciens mal isolés, gros potentiel de rénovation.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 55, pctChauffageFioul: 8, pctChauffageElec: 30, pctPassoiresThermiques: 24, consommationMoyenne: 255,
    recommendationPAC: "PAC air-eau pour les pavillons périphériques avec chauffage central. Pour les copropriétés du centre-ville, PAC air-air multisplit ou raccordement au réseau de chaleur urbain.",
    contexteEnergetique: "Préfecture de Seine-et-Marne, Melun possède un parc immobilier ancien et dense en centre-ville, avec de nombreux immeubles datant d'avant 1975. Le quartier de l'île Saint-Étienne et les rives de Seine concentrent les logements les plus énergivores (DPE E et F). En périphérie, les quartiers pavillonnaires de l'Almont et de la Plaine de Montaigu offrent un meilleur potentiel pour l'installation de PAC air-eau. Le taux de passoires thermiques de 24% place Melun parmi les villes prioritaires du département pour la rénovation énergétique."
  },
  "meaux": {
    slug: "meaux", population: 56000, logements: 24000, pctMaisons: 38,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2700, anneeConstruction: "avant 1975",
    caracteristique: "Sous-préfecture historique au bord de la Marne. Cathédrale et musée Bossuet. Mélange de collectifs et pavillons. Zone plus froide du nord Seine-et-Marne, consommation chauffage élevée.",
    economieChauffage: "900€ à 1 400€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 10, pctChauffageElec: 30, pctPassoiresThermiques: 22, consommationMoyenne: 265,
    recommendationPAC: "PAC air-eau haute température recommandée pour les maisons anciennes du centre historique. PAC air-air gainable pour les pavillons des quartiers nord avec chauffage électrique.",
    contexteEnergetique: "Meaux, sous-préfecture au bord de la Marne, subit un climat sensiblement plus froid que le sud du département (2700 DJU), ce qui alourdit les factures de chauffage. Le centre historique autour de la cathédrale Saint-Étienne et du musée Bossuet abrite des immeubles anciens très énergivores. Les quartiers Beauval et la Pierre Collinet, construits dans les années 60-70, font l'objet de programmes de rénovation ANRU. La forte proportion de logements classés D et E (22% de passoires) justifie une politique ambitieuse de transition vers les pompes à chaleur."
  },
  "chelles": {
    slug: "chelles", population: 55000, logements: 22000, pctMaisons: 52,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1960-1990",
    caracteristique: "Grande ville à la limite de la Seine-Saint-Denis, bien desservie par le RER E. Quartiers pavillonnaires variés et grands ensembles. Fort besoin de rénovation du parc ancien.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon",
    pctChauffageGaz: 55, pctChauffageFioul: 7, pctChauffageElec: 32, pctPassoiresThermiques: 21, consommationMoyenne: 248,
    recommendationPAC: "PAC air-eau pour les nombreux pavillons des quartiers résidentiels. PAC air-air multisplit pour les maisons tout-électrique des lotissements des années 80.",
    contexteEnergetique: "Avec 55 000 habitants, Chelles est l'une des plus grandes villes de Seine-et-Marne, à la lisière de la Seine-Saint-Denis. Les quartiers pavillonnaires de l'Aulnoy et des Coudreaux comptent de nombreuses maisons des années 60-80 chauffées au gaz ou à l'électricité. Le RER E permet un accès rapide à Paris et attire des familles qui investissent dans la rénovation. Le taux de chauffage électrique élevé (32%) s'explique par les constructions des années 80 équipées de convecteurs grille-pain, désormais obsolètes et très énergivores."
  },
  "savigny-le-temple": {
    slug: "savigny-le-temple", population: 32000, logements: 11500, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Ville nouvelle de Sénart avec un parc immobilier relativement récent. Mélange équilibré de maisons et petits collectifs. Bonnes performances énergétiques mais potentiel solaire intéressant.",
    economieChauffage: "750€ à 1 100€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 5, pctChauffageElec: 35, pctPassoiresThermiques: 14, consommationMoyenne: 220,
    recommendationPAC: "PAC air-air réversible idéale pour les maisons récentes avec chauffage électrique. PAC air-eau pour les pavillons avec chauffage central gaz.",
    contexteEnergetique: "Savigny-le-Temple fait partie de la ville nouvelle de Sénart et bénéficie d'un parc immobilier relativement récent (1975-2000). Les quartiers de la Grange du Bois et du Bois de la Grange ont été construits avec des normes d'isolation supérieures à la moyenne francilienne. Cependant, le chauffage électrique reste dominant (35%) avec des convecteurs d'ancienne génération. Le remplacement par une PAC air-air réversible permet de diviser la facture par 3 tout en ajoutant la climatisation estivale, un vrai plus avec les canicules de plus en plus fréquentes."
  },
  "torcy": {
    slug: "torcy", population: 23000, logements: 9500, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1995",
    caracteristique: "Ville de Marne-la-Vallée proche de Disneyland Paris. Base de loisirs et plan d'eau. Quartiers résidentiels avec pavillons et petits immeubles, souvent chauffés électriquement.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 45, pctChauffageFioul: 5, pctChauffageElec: 38, pctPassoiresThermiques: 16, consommationMoyenne: 230,
    recommendationPAC: "PAC air-air réversible pour les logements tout-électrique nombreux à Torcy. PAC air-eau pour les pavillons avec jardin autour de la base de loisirs.",
    contexteEnergetique: "Torcy, au coeur de Marne-la-Vallée, est une ville marquée par l'urbanisme des années 80 avec une forte proportion de chauffage électrique (38%). La proximité de la base de loisirs de Vaires-Torcy et du centre commercial Bay 1 en fait un secteur résidentiel attractif. Les petits immeubles des quartiers de l'Arche Guédon et du Mail sont souvent équipés de convecteurs électriques vieillissants. Le passage à la PAC air-air permet une économie moyenne de 800€/an tout en apportant le confort de la climatisation réversible."
  },
  "combs-la-ville": {
    slug: "combs-la-ville", population: 23000, logements: 8800, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1970-1995",
    caracteristique: "Commune résidentielle de Sénart avec un tissu pavillonnaire dense. Gare RER D et proximité de la Francilienne. Nombreuses maisons des années 70-80 avec chaudières gaz à remplacer.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 58, pctChauffageFioul: 10, pctChauffageElec: 26, pctPassoiresThermiques: 19, consommationMoyenne: 245,
    recommendationPAC: "PAC air-eau pour les maisons avec chauffage gaz central, très répandues dans les lotissements des années 70-80. Remplacement direct de la chaudière gaz vieillissante.",
    contexteEnergetique: "Combs-la-Ville est une commune résidentielle de Sénart avec un tissu pavillonnaire dense le long de la RD 306. Les quartiers du Bois l'Évêque et des Hauldres concentrent des maisons des années 70-80 chauffées au gaz, dont les chaudières atteignent 30 à 40 ans d'âge. La gare RER D facilite l'accès pour les techniciens et l'approvisionnement en matériel. Le remplacement des vieilles chaudières gaz par des PAC air-eau est le projet de rénovation le plus courant et le plus rentable dans cette commune."
  },
  "lognes": {
    slug: "lognes", population: 15000, logements: 6000, pctMaisons: 48,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1980-2000",
    caracteristique: "Ville nouvelle de Marne-la-Vallée, urbanisme moderne. Parc immobilier plus récent que la moyenne avec des normes d'isolation correctes. Potentiel fort pour le solaire photovoltaïque.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon",
    pctChauffageGaz: 40, pctChauffageFioul: 3, pctChauffageElec: 42, pctPassoiresThermiques: 12, consommationMoyenne: 210,
    recommendationPAC: "PAC air-air réversible pour les maisons récentes tout-électrique. PAC air-eau pour les pavillons avec plancher chauffant, fréquents dans les constructions post-1990.",
    contexteEnergetique: "Lognes fait partie de la ville nouvelle de Marne-la-Vallée et bénéficie d'un parc immobilier parmi les plus récents du secteur (1980-2000). L'urbanisme planifié a favorisé des constructions mieux isolées que la moyenne avec un DPE moyen C. Le chauffage électrique domine (42%), souvent via des planchers chauffants ou des convecteurs de bonne facture. Le potentiel solaire est excellent grâce aux toitures bien orientées des lotissements. Le couplage PAC + panneaux photovoltaïques en autoconsommation est la solution optimale pour ces logements."
  },
  "noisiel": {
    slug: "noisiel", population: 16000, logements: 6200, pctMaisons: 40,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1990",
    caracteristique: "Ancienne cité ouvrière Menier, patrimoine industriel classé. Ville de Marne-la-Vallée avec un mélange de logements sociaux et pavillons. Chocolaterie historique reconvertie.",
    economieChauffage: "750€ à 1 150€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 5, pctChauffageElec: 32, pctPassoiresThermiques: 18, consommationMoyenne: 235,
    recommendationPAC: "PAC air-eau pour les pavillons autour du parc de Noisiel. Pour les copropriétés de l'ancienne cité Menier, PAC collective ou raccordement au réseau de chaleur.",
    contexteEnergetique: "Noisiel est marquée par son patrimoine industriel unique : l'ancienne chocolaterie Menier, classée monument historique, a donné naissance à une cité ouvrière devenue quartier résidentiel. Les logements sociaux des années 75-90 représentent une part importante du parc et sont souvent mal isolés. Le siège de Nestlé France et la proximité du Val d'Europe dynamisent l'immobilier local. La rénovation thermique des copropriétés est un enjeu majeur, avec 18% de passoires thermiques concentrées dans les immeubles les plus anciens du quartier du Luzard."
  },
  "lagny-sur-marne": {
    slug: "lagny-sur-marne", population: 22000, logements: 9200, pctMaisons: 50,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "avant 1975",
    caracteristique: "Cité médiévale au bord de la Marne avec un centre historique pittoresque. Mélange de maisons de ville anciennes et pavillons en périphérie. Fort potentiel de rénovation thermique.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 50, pctChauffageFioul: 12, pctChauffageElec: 28, pctPassoiresThermiques: 23, consommationMoyenne: 258,
    recommendationPAC: "PAC air-eau haute température pour les maisons de ville anciennes du centre médiéval. PAC air-eau standard pour les pavillons plus récents en périphérie.",
    contexteEnergetique: "Lagny-sur-Marne est une cité médiévale au bord de la Marne dont le centre historique concentre des maisons de ville en pierre et meulière très énergivores. Le quartier de la Fontaine du Cou et les rives de la Marne abritent un patrimoine bâti ancien avec 23% de passoires thermiques. Les extensions pavillonnaires vers Thorigny et Pomponne sont mieux isolées mais les chaudières gaz vieillissent. Le fioul reste présent (12%) dans les maisons anciennes du centre. La PAC haute température (65°C) est recommandée pour ces bâtisses aux murs épais et radiateurs fonte."
  },
  "villeparisis": {
    slug: "villeparisis", population: 27000, logements: 10500, pctMaisons: 58,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1965-1990",
    caracteristique: "Commune en bordure du canal de l'Ourcq, entre Seine-et-Marne et Seine-Saint-Denis. Quartiers pavillonnaires étendus avec maisons des années 70, souvent chauffées au fioul ou gaz.",
    economieChauffage: "900€ à 1 350€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 15, pctChauffageElec: 27, pctPassoiresThermiques: 21, consommationMoyenne: 255,
    recommendationPAC: "PAC air-eau recommandée pour remplacer les chaudières fioul et gaz vieillissantes. Les grands terrains pavillonnaires facilitent l'installation de l'unité extérieure.",
    contexteEnergetique: "Villeparisis, à cheval entre la Seine-et-Marne et la Seine-Saint-Denis, possède un parc pavillonnaire étendu construit entre 1965 et 1990 le long du canal de l'Ourcq. Le fioul reste étonnamment présent (15%) dans les maisons des années 60, notamment dans les quartiers proches de Mitry-Mory. Les DJU légèrement plus élevés (2650) en raison de l'exposition au vent du nord-est augmentent les besoins en chauffage. Le remplacement des chaudières fioul par des PAC air-eau est une priorité, d'autant que l'interdiction des chaudières fioul neuves est effective depuis 2022."
  },
  "moissy-cramayel": {
    slug: "moissy-cramayel", population: 19000, logements: 7200, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Ville de Sénart avec zones d'activités importantes. Parc résidentiel mixte, quartiers pavillonnaires et collectifs récents. Proximité A5 et Francilienne.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 50, pctChauffageFioul: 8, pctChauffageElec: 34, pctPassoiresThermiques: 16, consommationMoyenne: 228,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage central. PAC air-air gainable pour les maisons récentes tout-électrique des quartiers de Sénart.",
    contexteEnergetique: "Moissy-Cramayel, commune de Sénart, présente un parc immobilier mixte entre les constructions récentes de la ville nouvelle et les logements plus anciens du bourg originel. Les zones d'activités (Chanteloup, A5) génèrent un bassin d'emploi dynamique et attirent des familles qui investissent dans leur logement. Le chauffage électrique est fréquent (34%) dans les constructions post-1985. La proximité de l'A5 et de la Francilienne facilite les interventions des techniciens. Le couplage PAC + isolation des combles est le meilleur rapport coût/économie pour ce parc immobilier."
  },
  "dammarie-les-lys": {
    slug: "dammarie-les-lys", population: 23000, logements: 9800, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1960-1985",
    caracteristique: "Limitrophe de Melun, en bord de Seine. Base de loisirs et forêt de Fontainebleau à proximité. Logements des années 60-80 nécessitant une rénovation thermique globale.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 10, pctChauffageElec: 28, pctPassoiresThermiques: 23, consommationMoyenne: 252,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage gaz. PAC haute température pour les logements anciens des années 60 avec radiateurs fonte en centre-ville.",
    contexteEnergetique: "Dammarie-les-Lys, limitrophe de Melun en bord de Seine, possède un parc immobilier construit principalement entre 1960 et 1985. Les grands ensembles de la Plaine du Lys et les quartiers proches de la base de loisirs concentrent les logements les plus énergivores, avec 23% de passoires thermiques. La proximité de la forêt de Fontainebleau rend les hivers légèrement plus froids. Un programme ANRU de rénovation urbaine est en cours et intègre la transition énergétique. Pour les maisons individuelles du quartier de la Cartonnerie, la PAC air-eau est la solution optimale."
  },
  "le-mee-sur-seine": {
    slug: "le-mee-sur-seine", population: 21000, logements: 8800, pctMaisons: 40,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1960-1985",
    caracteristique: "Ville résidentielle en bord de Seine, proche de Melun. Grands ensembles et quartiers pavillonnaires. Programme de rénovation urbaine en cours, opportunité pour la transition énergétique.",
    economieChauffage: "800€ à 1 250€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 8, pctChauffageElec: 32, pctPassoiresThermiques: 24, consommationMoyenne: 255,
    recommendationPAC: "PAC air-eau pour les pavillons des quartiers résidentiels. Pour les copropriétés en programme ANRU, PAC collective ou solutions hybrides avec réseau de chaleur.",
    contexteEnergetique: "Le Mée-sur-Seine, en bord de Seine face à Melun, présente un parc immobilier hétérogène avec des grands ensembles des années 60-70 (quartier de la Croix Blanche) et des pavillons en périphérie. Le programme de rénovation urbaine en cours offre une opportunité unique pour la transition énergétique à l'échelle du quartier. Avec 24% de passoires thermiques, c'est l'une des communes les plus énergivores du bassin melunais. Les pavillons individuels du sud de la ville, avec leurs jardins, sont parfaitement adaptés à l'installation de PAC air-eau."
  },
  "cesson": {
    slug: "cesson", population: 10000, logements: 4000, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Petite commune entre Melun et Sénart avec un caractère semi-rural préservé. Pavillons avec jardins et quelques résidences récentes. Calme et verdoyant.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 12, pctChauffageElec: 28, pctPassoiresThermiques: 17, consommationMoyenne: 238,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage gaz ou fioul. Les jardins spacieux permettent un positionnement optimal de l'unité extérieure loin de la maison.",
    contexteEnergetique: "Cesson est une petite commune semi-rurale entre Melun et Sénart qui a conservé un charme villageois avec ses pavillons entourés de jardins. Le fioul reste présent (12%) dans les maisons les plus anciennes du bourg, tandis que le gaz domine dans les lotissements des années 80-90. La commune bénéficie d'un cadre verdoyant et calme, sans contrainte de bruit particulière pour les unités extérieures de PAC. La proximité de la forêt de Rougeau et du parc de Sénart en fait un secteur prisé où les propriétaires investissent volontiers dans la valorisation énergétique."
  },
  "servon": {
    slug: "servon", population: 3500, logements: 1400, pctMaisons: 85,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1980-2005",
    caracteristique: "Village pavillonnaire entre Brie-Comte-Robert et Lésigny. Zone commerciale importante. Maisons récentes avec jardins, bon ensoleillement pour le photovoltaïque.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 8, pctChauffageElec: 35, pctPassoiresThermiques: 13, consommationMoyenne: 218,
    recommendationPAC: "PAC air-air réversible pour les maisons récentes tout-électrique. PAC air-eau si chauffage central existant. Excellent potentiel pour le couplage PAC + panneaux solaires.",
    contexteEnergetique: "Servon est un village pavillonnaire entre Brie-Comte-Robert et Lésigny, avec une zone commerciale importante le long de la Francilienne. Les maisons, relativement récentes (1980-2005), sont mieux isolées que la moyenne et affichent un taux de passoires thermiques bas (13%). Le chauffage électrique est fréquent (35%) dans les constructions des années 90-2000. Les toitures bien orientées et les faibles ombres portées offrent un potentiel solaire excellent. Le couplage PAC air-air + panneaux photovoltaïques en autoconsommation est la combinaison la plus rentable pour ce parc immobilier."
  },
  "lieusaint": {
    slug: "lieusaint", population: 14000, logements: 5200, pctMaisons: 50,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1990-2010",
    caracteristique: "Ville nouvelle de Sénart avec le centre commercial Carré Sénart. Parc immobilier récent et bien isolé. Fort développement urbain avec écoquartiers.",
    economieChauffage: "650€ à 1 000€", potentielSolaire: "Bon",
    pctChauffageGaz: 38, pctChauffageFioul: 2, pctChauffageElec: 45, pctPassoiresThermiques: 8, consommationMoyenne: 195,
    recommendationPAC: "PAC air-air réversible idéale pour les constructions récentes tout-électrique. Pour les écoquartiers, PAC géothermique si le terrain le permet.",
    contexteEnergetique: "Lieusaint est le coeur commercial de Sénart avec le centre Carré Sénart, et bénéficie d'un parc immobilier parmi les plus récents d'Île-de-France (1990-2010). Les écoquartiers comme l'Eau Vive intègrent déjà des normes thermiques avancées (RT 2005 et 2012). Le chauffage électrique domine largement (45%) mais avec des équipements récents (planchers chauffants, radiateurs à inertie). Le très faible taux de passoires thermiques (8%) montre que l'enjeu ici est davantage l'optimisation énergétique que la rénovation lourde. La PAC air-air réversible apporte confort été/hiver à moindre coût."
  },
  "senart": {
    slug: "senart", population: 120000, logements: 45000, pctMaisons: 52,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1985-2010",
    caracteristique: "Ville nouvelle regroupant 8 communes au sud de la Seine-et-Marne. Urbanisme planifié avec espaces verts. Parc immobilier parmi les plus récents d'Île-de-France.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon",
    pctChauffageGaz: 42, pctChauffageFioul: 3, pctChauffageElec: 40, pctPassoiresThermiques: 10, consommationMoyenne: 205,
    recommendationPAC: "PAC air-air réversible pour le parc récent tout-électrique. PAC air-eau pour les pavillons avec chauffage central dans les communes les plus anciennes de l'agglomération.",
    contexteEnergetique: "Sénart, ville nouvelle regroupant 8 communes et 120 000 habitants, possède le parc immobilier le plus récent d'Île-de-France (1985-2010). L'urbanisme planifié a intégré des espaces verts généreux et des normes de construction supérieures. Le chauffage électrique est très répandu (40%) avec des équipements de meilleure qualité que dans les villes plus anciennes. Le taux de passoires thermiques est le plus bas du secteur (10%). L'enjeu principal est le remplacement des convecteurs électriques par des PAC air-air performantes et la pose de panneaux solaires sur les toitures bien orientées des lotissements."
  },
  // ---- Val-de-Marne (94) ----
  "creteil": {
    slug: "creteil", population: 92000, logements: 40000, pctMaisons: 18,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1980",
    caracteristique: "Préfecture du Val-de-Marne, lac et base de loisirs. Architecture des années 70 avec grands ensembles et dalles. Quartiers pavillonnaires au sud. Université Paris-Est.",
    economieChauffage: "750€ à 1 100€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 3, pctChauffageElec: 35, pctPassoiresThermiques: 22, consommationMoyenne: 248,
    recommendationPAC: "PAC air-eau pour les quartiers pavillonnaires du sud. Pour les copropriétés des années 70 (Créteil Soleil, Mont-Mesly), PAC collective ou solutions individuelles air-air.",
    contexteEnergetique: "Créteil, préfecture du Val-de-Marne, est marquée par l'architecture des années 60-70 avec les grands ensembles du Mont-Mesly et les dalles du Palais. Le lac de Créteil et la base de loisirs apportent un microclimat légèrement plus doux. Avec seulement 18% de maisons, l'enjeu principal est la rénovation des copropriétés : les immeubles des années 60-80 autour du centre commercial Créteil Soleil sont parmi les plus énergivores (22% de passoires thermiques). Les quartiers pavillonnaires du sud (Bords de Marne, Buttes-Halage) sont parfaitement adaptés aux PAC air-eau individuelles."
  },
  "maisons-alfort": {
    slug: "maisons-alfort", population: 56000, logements: 27000, pctMaisons: 25,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville dense en bord de Marne et Seine. École vétérinaire historique. Immeubles anciens et pavillons en quartier Charentonneau. Fort potentiel de rénovation des copropriétés.",
    economieChauffage: "750€ à 1 100€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 4, pctChauffageElec: 32, pctPassoiresThermiques: 25, consommationMoyenne: 260,
    recommendationPAC: "PAC air-eau pour les pavillons du quartier Charentonneau. Pour les copropriétés anciennes proches de l'école vétérinaire, PAC collective adaptée au bâti ancien.",
    contexteEnergetique: "Maisons-Alfort est une ville dense en bord de Marne et Seine, célèbre pour son École nationale vétérinaire fondée en 1765. Le parc immobilier est majoritairement ancien (avant 1975) avec une forte proportion d'immeubles en copropriété. Le quartier Charentonneau, plus pavillonnaire, offre les meilleures opportunités pour les PAC individuelles. Le taux de passoires thermiques est élevé (25%) en raison de l'ancienneté du bâti. Les immeubles le long de la rue Jean-Jaurès et du quai de la Marne nécessitent des solutions collectives de type PAC air-eau sur boucle d'eau."
  },
  "saint-maur-des-fosses": {
    slug: "saint-maur-des-fosses", population: 78000, logements: 35000, pctMaisons: 58,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle prisée dans la boucle de la Marne. Nombreux pavillons bourgeois avec jardins. Parc immobilier ancien mais bien entretenu. Forte demande en rénovation énergétique haut de gamme.",
    economieChauffage: "950€ à 1 500€", potentielSolaire: "Bon",
    pctChauffageGaz: 58, pctChauffageFioul: 8, pctChauffageElec: 28, pctPassoiresThermiques: 20, consommationMoyenne: 252,
    recommendationPAC: "PAC air-eau premium pour les pavillons bourgeois avec chauffage central. Modèles silencieux et discrets indispensables dans ce secteur résidentiel haut de gamme.",
    contexteEnergetique: "Saint-Maur-des-Fossés, dans la boucle de la Marne, est l'une des villes les plus résidentielles et prisées du Val-de-Marne avec 58% de maisons individuelles. Les pavillons bourgeois des quartiers de La Varenne-Saint-Hilaire, Adamville et Le Parc sont souvent de belles demeures des années 30-60 chauffées au gaz. La clientèle aisée est sensible au confort et à la valorisation patrimoniale. Le remplacement d'une chaudière gaz par une PAC air-eau haut de gamme peut générer jusqu'à 1 500€ d'économies annuelles sur ces grandes surfaces habitables (120-200 m²)."
  },
  "champigny-sur-marne": {
    slug: "champigny-sur-marne", population: 77000, logements: 31000, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1985",
    caracteristique: "Grande ville du Val-de-Marne en bord de Marne. Quartiers pavillonnaires (Le Plant, Coeuilly) et grands ensembles. Arrivée du Grand Paris Express dynamisera la rénovation.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 5, pctChauffageElec: 30, pctPassoiresThermiques: 20, consommationMoyenne: 245,
    recommendationPAC: "PAC air-eau pour les pavillons des quartiers Le Plant et Coeuilly. PAC air-air pour les maisons tout-électrique. Futurs travaux de copropriété liés au Grand Paris Express.",
    contexteEnergetique: "Champigny-sur-Marne est la deuxième ville du Val-de-Marne avec 77 000 habitants et un parc immobilier très diversifié. Les quartiers pavillonnaires de Coeuilly et du Plant comptent de nombreuses maisons des années 60-80 avec chaudières gaz vieillissantes. Les grands ensembles du Bois-l'Abbé font l'objet d'un programme ANRU ambitieux. L'arrivée du Grand Paris Express (ligne 15) va dynamiser la rénovation immobilière et augmenter la valeur des biens. C'est le moment idéal pour investir dans une PAC et améliorer le DPE avant la mise en vente ou location."
  },
  "vincennes": {
    slug: "vincennes", population: 50000, logements: 28000, pctMaisons: 12,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Ville dense limitrophe de Paris avec le célèbre château et bois de Vincennes. Immeubles anciens haussmanniens et art déco. Rénovation en copropriété avec PAC collective adaptée.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon",
    pctChauffageGaz: 45, pctChauffageFioul: 2, pctChauffageElec: 35, pctPassoiresThermiques: 28, consommationMoyenne: 265,
    recommendationPAC: "PAC air-eau collective pour les copropriétés haussmanniennes et art déco. PAC air-air discrète pour les rares pavillons. Contraintes architecturales fortes en secteur classé.",
    contexteEnergetique: "Vincennes est une ville très dense limitrophe de Paris avec un parc immobilier ancien et prestigieux. Les immeubles haussmanniens et art déco le long de l'avenue de Paris et autour du château concentrent des logements classés D et E. Avec 28% de passoires thermiques, la rénovation est urgente mais complexe en raison des contraintes architecturales (ABF) et de la densité urbaine. Les copropriétés doivent privilégier des PAC collectives sur boucle d'eau ou des PAC air-eau compactes installées en toiture. Le bois de Vincennes tout proche tempère légèrement le climat urbain."
  },
  "nogent-sur-marne": {
    slug: "nogent-sur-marne", population: 33000, logements: 17000, pctMaisons: 30,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville élégante en bord de Marne, connue pour ses guinguettes. Pavillons cossus et immeubles de standing. Clientèle sensible à la transition écologique et au confort thermique.",
    economieChauffage: "850€ à 1 350€", potentielSolaire: "Bon",
    pctChauffageGaz: 55, pctChauffageFioul: 5, pctChauffageElec: 30, pctPassoiresThermiques: 22, consommationMoyenne: 255,
    recommendationPAC: "PAC air-eau haut de gamme pour les pavillons cossus avec chauffage central. Modèles ultra-silencieux requis dans ce quartier résidentiel prisé en bord de Marne.",
    contexteEnergetique: "Nogent-sur-Marne est une ville élégante et bourgeoise en bord de Marne, célèbre pour ses guinguettes et son patrimoine architectural. Les pavillons cossus des quartiers du Perreux et de Beauté-sur-Marne sont souvent chauffés au gaz avec des chaudières de 25-35 ans d'âge. Les immeubles de standing du centre-ville datent d'avant 1975 et affichent des DPE médiocres. La clientèle aisée et sensible à l'écologie est un public naturel pour la PAC air-eau premium. Les économies peuvent atteindre 1 350€/an sur les grandes surfaces de ces propriétés résidentielles."
  },
  "sucy-en-brie": {
    slug: "sucy-en-brie", population: 27000, logements: 10500, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Commune résidentielle verdoyante avec fort de Sucy et parc du château. Quartiers pavillonnaires prisés des familles. Maisons des années 70-90 avec chaudières gaz à remplacer.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 58, pctChauffageFioul: 10, pctChauffageElec: 25, pctPassoiresThermiques: 18, consommationMoyenne: 242,
    recommendationPAC: "PAC air-eau pour les pavillons des années 70-90 avec chauffage central gaz. Remplacement direct de la chaudière, économie de 900€ à 1 300€ par an.",
    contexteEnergetique: "Sucy-en-Brie est une commune résidentielle verdoyante prisée des familles, avec le fort de Sucy et le parc du château. Les quartiers pavillonnaires des Bruyères et du Grand Val comptent de nombreuses maisons des années 70-90 chauffées au gaz. Le fioul est encore présent (10%) dans les maisons les plus anciennes proches du centre historique. Les DJU légèrement supérieurs (2550) à la moyenne parisienne justifient un investissement dans le chauffage performant. La PAC air-eau permet de conserver le circuit de radiateurs existant tout en divisant la facture énergétique par 3."
  },
  "ormesson-sur-marne": {
    slug: "ormesson-sur-marne", population: 10000, logements: 4200, pctMaisons: 72,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1975-2000",
    caracteristique: "Petite ville pavillonnaire et boisée au charme résidentiel. Lac et parc du château. Maisons avec jardins spacieux, population aisée investissant dans la rénovation énergétique.",
    economieChauffage: "900€ à 1 400€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 10, pctChauffageElec: 30, pctPassoiresThermiques: 16, consommationMoyenne: 235,
    recommendationPAC: "PAC air-eau pour les pavillons avec jardins spacieux. Modèles silencieux recommandés en raison de la proximité des voisins dans ce cadre résidentiel calme.",
    contexteEnergetique: "Ormesson-sur-Marne est une petite ville pavillonnaire au charme résidentiel avec son lac et le parc du château. La population aisée investit régulièrement dans la rénovation de ses propriétés. Le fioul reste étonnamment présent (10%) dans les maisons des années 75-85. Les jardins spacieux facilitent l'installation d'unités extérieures de PAC sans gêne pour le voisinage. Le lac d'Ormesson crée un microclimat légèrement plus humide mais tempéré. Le passage du fioul à la PAC air-eau est particulièrement rentable ici, avec des économies pouvant atteindre 1 400€ par an."
  },
  "boissy-saint-leger": {
    slug: "boissy-saint-leger", population: 17000, logements: 6800, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Terminus du RER A, porte d'entrée de la Brie. Mélange de pavillons et de résidences. Proximité du bois Notre-Dame. Forte demande de remplacement de chaudières anciennes.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon",
    pctChauffageGaz: 55, pctChauffageFioul: 10, pctChauffageElec: 28, pctPassoiresThermiques: 19, consommationMoyenne: 242,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage central. Terminus du RER A : bonne accessibilité pour l'installation et la maintenance.",
    contexteEnergetique: "Boissy-Saint-Léger, terminus du RER A, est la porte d'entrée de la Brie avec un mélange de pavillons et de résidences collectives. Le bois Notre-Dame en lisière de la commune apporte un cadre verdoyant mais des hivers légèrement plus frais (2550 DJU). Les maisons des années 70-90, construites au moment de l'arrivée du RER, arrivent à un âge critique pour le remplacement de leurs chaudières gaz et fioul. La proximité du terminus RER A facilite l'accès des techniciens et l'approvisionnement en matériel. Le remplacement de chaudière par PAC air-eau est le projet type de cette commune."
  },
  "villeneuve-saint-georges": {
    slug: "villeneuve-saint-georges", population: 34000, logements: 14000, pctMaisons: 35,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville en confluent Seine-Yerres avec un important parc ancien. Programme ANRU de renouvellement urbain. Logements énergivores avec DPE moyen E, priorité nationale de rénovation.",
    economieChauffage: "1 000€ à 1 500€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 8, pctChauffageElec: 30, pctPassoiresThermiques: 30, consommationMoyenne: 280,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage central. Isolation préalable fortement recommandée en raison du DPE moyen E. Aides MaPrimeRénov' majorées en quartier prioritaire.",
    contexteEnergetique: "Villeneuve-Saint-Georges, au confluent de la Seine et de l'Yerres, possède le parc immobilier le plus énergivore du Val-de-Marne avec un DPE moyen E et 30% de passoires thermiques. Les immeubles anciens du centre-ville et les grands ensembles des années 60 sont en première ligne. Le programme ANRU de renouvellement urbain en cours offre des opportunités de financement pour la transition énergétique. Les pavillons des quartiers hauts (Les Bergeries) sont mieux adaptés aux PAC individuelles. La consommation moyenne de 280 kWh/m²/an est la plus élevée du secteur — le potentiel d'économies est donc considérable."
  },
  // ---- Essonne (91) ----
  "evry-courcouronnes": {
    slug: "evry-courcouronnes", population: 67000, logements: 27000, pctMaisons: 32,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Préfecture de l'Essonne, ville nouvelle avec cathédrale contemporaine. Grands ensembles et quartiers pavillonnaires. Université Paris-Saclay à proximité. Fort enjeu de transition énergétique.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 50, pctChauffageFioul: 5, pctChauffageElec: 33, pctPassoiresThermiques: 21, consommationMoyenne: 248,
    recommendationPAC: "PAC air-eau pour les pavillons des quartiers résidentiels. Pour les copropriétés des grands ensembles, PAC collective dans le cadre des programmes de rénovation ANRU.",
    contexteEnergetique: "Évry-Courcouronnes, préfecture de l'Essonne issue de la fusion en 2019, est une ville nouvelle des années 70 avec la cathédrale de la Résurrection comme emblème contemporain. Les grands ensembles des Pyramides et du Parc aux Lièvres concentrent les logements les plus énergivores (21% de passoires thermiques). Les quartiers pavillonnaires de Courcouronnes offrent un meilleur potentiel pour les PAC individuelles. La proximité de l'université Paris-Saclay et du Génopole attire une population jeune et dynamique, sensible aux enjeux écologiques et à la maîtrise des charges énergétiques."
  },
  "corbeil-essonnes": {
    slug: "corbeil-essonnes", population: 52000, logements: 22000, pctMaisons: 35,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville historique au confluent Seine-Essonne. Patrimoine industriel (imprimeries). Parc ancien nécessitant rénovation thermique. Programme de renouvellement urbain en cours.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 10, pctChauffageElec: 30, pctPassoiresThermiques: 24, consommationMoyenne: 258,
    recommendationPAC: "PAC air-eau haute température pour les maisons anciennes du centre historique. PAC standard pour les pavillons des quartiers périphériques avec chauffage gaz.",
    contexteEnergetique: "Corbeil-Essonnes, au confluent de la Seine et de l'Essonne, possède un riche patrimoine industriel (anciennes imprimeries) et un centre historique ancien. Le parc immobilier d'avant 1975 domine avec 24% de passoires thermiques, l'un des taux les plus élevés de l'Essonne. Le programme de renouvellement urbain des Tarterêts transforme les grands ensembles. Le fioul reste présent (10%) dans les maisons anciennes des quartiers de Robinson et de la Nacelle. La PAC haute température est recommandée pour ces bâtisses aux murs épais et aux radiateurs fonte, permettant un remplacement direct sans modification du circuit de chauffage."
  },
  "yerres": {
    slug: "yerres", population: 30000, logements: 12500, pctMaisons: 62,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Ville verte en bord de l'Yerres, propriété Caillebotte. Quartiers pavillonnaires prisés avec jardins. Population sensible à l'environnement, forte demande en solutions vertes.",
    economieChauffage: "900€ à 1 350€", potentielSolaire: "Bon",
    pctChauffageGaz: 55, pctChauffageFioul: 10, pctChauffageElec: 28, pctPassoiresThermiques: 18, consommationMoyenne: 242,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage central gaz. Couplage PAC + panneaux solaires très recommandé grâce aux toitures bien orientées des lotissements.",
    contexteEnergetique: "Yerres est une ville verte en bord de la rivière éponyme, célèbre pour la propriété Caillebotte (peintre impressionniste) transformée en musée. Les quartiers pavillonnaires de Concy et de la Grange sont prisés des familles et comptent de nombreuses maisons des années 70-90 chauffées au gaz. La population, sensible à l'environnement et au cadre de vie, est particulièrement réceptive aux solutions écologiques. Le fioul subsiste (10%) dans les maisons anciennes proches du centre. Le couplage PAC air-eau + panneaux solaires en autoconsommation est la combinaison idéale pour ces pavillons avec jardins."
  },
  "brunoy": {
    slug: "brunoy", population: 26000, logements: 11000, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle en vallée de l'Yerres, forêt de Sénart. Pavillons anciens et résidences. Gare RER D bien desservie. Patrimoine bâti ancien avec fort besoin d'isolation.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 12, pctChauffageElec: 28, pctPassoiresThermiques: 22, consommationMoyenne: 255,
    recommendationPAC: "PAC air-eau haute température pour les maisons anciennes du centre en pierre meulière. PAC standard pour les pavillons récents. Isolation des combles en complément prioritaire.",
    contexteEnergetique: "Brunoy est une ville résidentielle en vallée de l'Yerres, en lisière de la forêt de Sénart. Le centre ancien compte de belles maisons en meulière d'avant 1975, très énergivores avec 22% de passoires thermiques. Le fioul est encore fréquent (12%) dans ces maisons anciennes aux murs épais et aux caves à cuve. La gare RER D facilite l'accès et fait de Brunoy un secteur résidentiel prisé. La PAC haute température (65°C) est recommandée pour les radiateurs fonte des maisons meulière, tandis que les pavillons plus récents des hauteurs peuvent opter pour une PAC standard."
  },
  "montgeron": {
    slug: "montgeron", population: 24000, logements: 10200, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville connue pour le départ du Tour de France cycliste. Bords de l'Yerres et forêt de Sénart. Pavillons des années 60-70 avec chauffage au fioul encore fréquent à convertir.",
    economieChauffage: "950€ à 1 400€", potentielSolaire: "Bon",
    pctChauffageGaz: 50, pctChauffageFioul: 15, pctChauffageElec: 28, pctPassoiresThermiques: 22, consommationMoyenne: 260,
    recommendationPAC: "PAC air-eau fortement recommandée pour remplacer les chaudières fioul encore nombreuses. Les économies atteignent 950€ à 1 400€/an en remplacement du fioul.",
    contexteEnergetique: "Montgeron est historiquement connue comme le lieu de départ du premier Tour de France cycliste en 1903. La ville s'étend entre les bords de l'Yerres et la forêt de Sénart, avec un parc immobilier dominé par des pavillons des années 60-70. Le fioul reste anormalement présent (15%) dans les maisons anciennes du centre et des quartiers proches de la forêt, non raccordés au gaz de ville. L'interdiction progressive du fioul rend le passage à la PAC urgent pour ces foyers. Les économies sont particulièrement spectaculaires en remplacement du fioul : jusqu'à 1 400€ par an pour une maison de 120 m²."
  },
  "vigneux-sur-seine": {
    slug: "vigneux-sur-seine", population: 32000, logements: 12500, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1990",
    caracteristique: "Ville en bord de Seine avec lac Daumesnil et base de loisirs. Quartiers pavillonnaires et collectifs. Proximité A6 et RER D. Parc des années 60-80 à rénover.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 50, pctChauffageFioul: 8, pctChauffageElec: 32, pctPassoiresThermiques: 20, consommationMoyenne: 245,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage gaz. PAC air-air pour les maisons tout-électrique des années 80. Potentiel solaire intéressant près du lac.",
    contexteEnergetique: "Vigneux-sur-Seine est une ville en bord de Seine avec le lac Daumesnil et une base de loisirs offrant un cadre agréable. Les quartiers pavillonnaires des années 60-80 (La Croix Blanche, Les Bergeries) présentent des consommations élevées avec 20% de passoires thermiques. Le chauffage électrique est fréquent (32%) dans les constructions des années 80. La proximité de l'A6 et du RER D facilite l'accès des techniciens. Le remplacement des convecteurs électriques vieillissants par des PAC air-air modernes divise la facture par 3, tandis que les maisons avec chauffage central gaz bénéficient pleinement d'une PAC air-eau."
  },
  // ---- Seine-Saint-Denis (93) ----
  "noisy-le-grand": {
    slug: "noisy-le-grand", population: 67000, logements: 27000, pctMaisons: 38,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1975-1995",
    caracteristique: "Ville de Marne-la-Vallée avec les Arènes de Picasso et le Palacio d'Abraxas (architectures postmodernes). Mélange de grands ensembles et pavillons. RER A et futur Grand Paris Express.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 4, pctChauffageElec: 35, pctPassoiresThermiques: 19, consommationMoyenne: 240,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage central. PAC air-air multisplit pour les logements en copropriété. Travaux facilités par l'arrivée du Grand Paris Express.",
    contexteEnergetique: "Noisy-le-Grand est une ville emblématique de Marne-la-Vallée avec ses architectures postmodernes signées Ricardo Bofill (Arènes de Picasso, Palacio d'Abraxas). Le parc immobilier, construit entre 1975 et 1995, est majoritairement collectif mais les quartiers pavillonnaires du Pavé Neuf et des Richardets offrent un bon potentiel pour les PAC individuelles. Le chauffage électrique est très présent (35%) dans les immeubles des années 80. L'arrivée du Grand Paris Express (ligne 15) va considérablement augmenter la valeur des biens et inciter les propriétaires à rénover pour améliorer leur DPE."
  },
  "livry-gargan": {
    slug: "livry-gargan", population: 45000, logements: 18000, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1960-1990",
    caracteristique: "Commune résidentielle en lisière de la forêt de Bondy. Importante proportion de pavillons des années 60-80. Abbaye de Livry historique. Forte demande de rénovation chauffage.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 55, pctChauffageFioul: 8, pctChauffageElec: 28, pctPassoiresThermiques: 20, consommationMoyenne: 248,
    recommendationPAC: "PAC air-eau pour les nombreux pavillons des années 60-80 avec chauffage gaz. Remplacement des chaudières vieillissantes par des PAC air-eau moyenne température.",
    contexteEnergetique: "Livry-Gargan est une commune résidentielle en lisière de la forêt de Bondy, avec 55% de maisons individuelles — un taux élevé pour la Seine-Saint-Denis. Les pavillons des années 60-80 des quartiers de l'Abbaye et de la forêt de Bondy sont majoritairement chauffés au gaz avec des chaudières vieillissantes. L'abbaye historique et les espaces boisés confèrent un charme résidentiel qui attire des familles investisseuses. Le fioul subsiste (8%) dans les maisons les plus anciennes. La forte demande de remplacement de chaudières fait de Livry-Gargan l'un des marchés les plus actifs du département pour les PAC air-eau."
  },
  "gagny": {
    slug: "gagny", population: 40000, logements: 16000, pctMaisons: 50,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1960-1990",
    caracteristique: "Ville sur les coteaux dominant la Marne. Forêt de Bondy et parc forestier de la Poudrerie. Quartiers pavillonnaires sur les hauteurs, collectifs en vallée. Vue dégagée pour le solaire.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 8, pctChauffageElec: 30, pctPassoiresThermiques: 20, consommationMoyenne: 248,
    recommendationPAC: "PAC air-eau pour les pavillons des coteaux avec vue dégagée. PAC air-air gainable pour les maisons avec combles aménagés des quartiers hauts.",
    contexteEnergetique: "Gagny s'étend sur les coteaux dominant la Marne, entre la forêt de Bondy et le parc de la Poudrerie. Les quartiers pavillonnaires sur les hauteurs (Le Chenay, Les Abbesses) bénéficient d'une vue dégagée idéale pour le solaire photovoltaïque. En vallée, les collectifs des années 60-70 sont plus énergivores. Le gaz reste le chauffage dominant (52%) dans les pavillons, avec des chaudières de 25-35 ans d'âge à remplacer. La topographie en coteau favorise un bon ensoleillement des toitures sud. Le couplage PAC + solaire est particulièrement pertinent sur les hauteurs de Gagny."
  },
  "montfermeil": {
    slug: "montfermeil", population: 27000, logements: 9500, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1965-1990",
    caracteristique: "Ville perchée sur les hauteurs avec vue sur Paris. Citée dans Les Misérables de Hugo. Grands programmes de rénovation urbaine ANRU. Transition énergétique des copropriétés en cours.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 6, pctChauffageElec: 32, pctPassoiresThermiques: 22, consommationMoyenne: 252,
    recommendationPAC: "PAC air-eau pour les pavillons des quartiers rénovés. Pour les copropriétés en programme ANRU, intégration de PAC collectives dans le cadre de la rénovation globale.",
    contexteEnergetique: "Montfermeil, perchée sur les hauteurs entre Gagny et Clichy-sous-Bois, est célèbre pour être le décor des Misérables de Victor Hugo. Les grands programmes ANRU de rénovation urbaine transforment les quartiers des Bosquets et de la Francilienne. Ces travaux intègrent désormais systématiquement la transition énergétique avec des PAC collectives. Les quartiers pavillonnaires historiques sur le plateau offrent un bon potentiel individuel. Le taux de passoires thermiques de 22% reflète l'ancienneté du parc des années 65-90. La vue panoramique sur Paris depuis les hauteurs favorise l'ensoleillement pour le photovoltaïque."
  },
  "le-raincy": {
    slug: "le-raincy", population: 15000, logements: 7000, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Surnommée le Neuilly de la Seine-Saint-Denis. Église Notre-Dame classée, allée du Château. Villas et pavillons bourgeois avec jardins. Clientèle exigeante en rénovation premium.",
    economieChauffage: "900€ à 1 400€", potentielSolaire: "Bon",
    pctChauffageGaz: 55, pctChauffageFioul: 8, pctChauffageElec: 28, pctPassoiresThermiques: 23, consommationMoyenne: 262,
    recommendationPAC: "PAC air-eau premium pour les villas et pavillons bourgeois. Modèles ultra-silencieux et discrets requis dans ce secteur résidentiel haut de gamme.",
    contexteEnergetique: "Le Raincy, surnommé « le Neuilly de la Seine-Saint-Denis », est une ville résidentielle cossue avec des villas et pavillons bourgeois du début du XXe siècle. L'église Notre-Dame du Raincy, chef-d'oeuvre d'Auguste Perret classé monument historique, symbolise le patrimoine architectural local. Le parc immobilier ancien (avant 1975) est bien entretenu mais énergivore : 23% de passoires thermiques et une consommation moyenne de 262 kWh/m²/an. La clientèle exigeante attend des solutions premium et des installations discrètes. Les économies de 900€ à 1 400€/an sont un argument décisif pour cette population aisée."
  },
  "villemomble": {
    slug: "villemomble", population: 30000, logements: 13500, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle entre Raincy et Rosny. Pavillons anciens et résidences. Parc Lefèvre et allées arborées. Population familiale investissant dans le confort thermique.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon",
    pctChauffageGaz: 52, pctChauffageFioul: 5, pctChauffageElec: 32, pctPassoiresThermiques: 24, consommationMoyenne: 258,
    recommendationPAC: "PAC air-eau pour les pavillons avec chauffage central. PAC air-air pour les maisons tout-électrique. Isolation des combles en priorité complémentaire.",
    contexteEnergetique: "Villemomble est une ville résidentielle entre Le Raincy et Rosny-sous-Bois, avec un parc immobilier ancien dominé par des pavillons et des petits immeubles d'avant 1975. Le parc Lefèvre et les allées arborées confèrent un charme verdoyant apprécié des familles. Le taux de passoires thermiques est élevé (24%) en raison de l'ancienneté du bâti. Les maisons du quartier de la gare et de la rue de Neuilly sont les plus énergivores. Le gaz domine (52%) mais le chauffage électrique progresse (32%) dans les rénovations récentes. Le remplacement des vieilles chaudières par des PAC air-eau reste la solution la plus rentable."
  },
  "rosny-sous-bois": {
    slug: "rosny-sous-bois", population: 46000, logements: 20000, pctMaisons: 35,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1990",
    caracteristique: "Ville dynamique avec centre commercial Rosny 2 et Domus. Fort de Rosny. Mélange de collectifs et pavillons. Futur Grand Paris Express boostera la valorisation immobilière.",
    economieChauffage: "800€ à 1 150€", potentielSolaire: "Bon",
    pctChauffageGaz: 48, pctChauffageFioul: 3, pctChauffageElec: 35, pctPassoiresThermiques: 20, consommationMoyenne: 242,
    recommendationPAC: "PAC air-eau pour les pavillons des quartiers résidentiels. PAC air-air pour les copropriétés. Le Grand Paris Express (ligne 11) va dynamiser la rénovation immobilière.",
    contexteEnergetique: "Rosny-sous-Bois est une ville dynamique avec le centre commercial Rosny 2, Domus et le fort de Rosny. Le parc immobilier mêle collectifs des années 60-80 et pavillons résidentiels. L'arrivée du Grand Paris Express (ligne 11) va considérablement valoriser les biens et inciter les propriétaires à investir dans la rénovation énergétique. Le chauffage électrique est fréquent (35%) dans les immeubles et les maisons des années 80. Les quartiers pavillonnaires proches du fort et de la zone des Mobiles sont les plus propices aux installations de PAC individuelles. Le fort potentiel de plus-value immobilière rend la rénovation DPE très attractive."
  },
  // ---- Paris (75) ----
  "paris": {
    slug: "paris", population: 2133000, logements: 1380000, pctMaisons: 2,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Capitale avec un parc immobilier très ancien, majoritairement haussmannien. 85% des logements classés D, E ou F. Obligation de rénovation des passoires thermiques d'ici 2034.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon",
    pctChauffageGaz: 38, pctChauffageFioul: 2, pctChauffageElec: 35, pctPassoiresThermiques: 32, consommationMoyenne: 275,
    recommendationPAC: "PAC air-eau collective pour les copropriétés haussmanniennes. PAC air-air individuelle pour les appartements en chauffage électrique. Contraintes ABF strictes dans les secteurs classés.",
    contexteEnergetique: "Paris possède le parc immobilier le plus ancien de France avec 70% des logements construits avant 1948. Les immeubles haussmanniens, faubouriens et les constructions du XIXe siècle dominent, avec un DPE moyen E et 32% de passoires thermiques — le taux le plus élevé de la région. Le gaz de ville et le chauffage collectif au fioul sont historiquement dominants, mais l'électricité progresse dans les rénovations. L'obligation de rénovation des passoires thermiques (G en 2025, F en 2028, E en 2034) touche des centaines de milliers de logements parisiens. Les contraintes architecturales (ABF, PLU) imposent des solutions discrètes et sur mesure."
  },
  "paris-20": {
    slug: "paris-20", population: 195000, logements: 105000, pctMaisons: 3,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Arrondissement populaire de l'Est parisien, Père-Lachaise et Belleville. Immeubles faubouriens et petits collectifs. Siège de Greenter au 38 rue de Ménilmontant. Forte densité.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon",
    pctChauffageGaz: 40, pctChauffageFioul: 2, pctChauffageElec: 33, pctPassoiresThermiques: 30, consommationMoyenne: 270,
    recommendationPAC: "PAC air-eau collective pour les copropriétés faubouriennes de Belleville et Ménilmontant. PAC air-air individuelle pour les appartements tout-électrique. Siège Greenter au 38 rue de Ménilmontant.",
    contexteEnergetique: "Le 20e arrondissement, quartier populaire de l'Est parisien, englobe Belleville, Ménilmontant et le Père-Lachaise. C'est aussi le siège de Greenter au 38 rue de Ménilmontant. Les immeubles faubouriens du XIXe siècle dominent avec des murs en pierre et des hauteurs sous plafond généreuses mais une isolation quasi inexistante. Le taux de passoires thermiques atteint 30%, l'un des plus élevés de Paris. Le chauffage collectif au gaz est fréquent dans les immeubles anciens, tandis que l'électrique domine dans les rénovations récentes. La forte densité urbaine impose des PAC compactes et ultra-silencieuses respectant les règles de copropriété."
  },
  "paris-12": {
    slug: "paris-12", population: 143000, logements: 80000, pctMaisons: 4,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Arrondissement entre Bastille et Bois de Vincennes. Coulée verte et viaduc des Arts. Mélange d'immeubles anciens et de constructions des années 60-70. Bercy Village.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon",
    pctChauffageGaz: 42, pctChauffageFioul: 2, pctChauffageElec: 35, pctPassoiresThermiques: 25, consommationMoyenne: 255,
    recommendationPAC: "PAC air-eau collective pour les copropriétés le long de l'avenue Daumesnil. PAC air-air pour les appartements individuels. Bon potentiel solaire sur les toits plats des immeubles des années 60-70.",
    contexteEnergetique: "Le 12e arrondissement s'étend de la Bastille au bois de Vincennes en passant par Bercy et la Coulée verte. Le parc immobilier est hétérogène : immeubles haussmanniens autour de la place de la Nation, constructions des années 60-70 à Picpus et Bel-Air, et aménagements récents à Bercy Village. Les immeubles anciens concentrent 25% de passoires thermiques, tandis que les constructions post-1990 de la ZAC Bercy respectent des normes thermiques correctes. Le bois de Vincennes crée un effet de poumon vert tempérant légèrement les îlots de chaleur urbains."
  },
  "paris-11": {
    slug: "paris-11", population: 147000, logements: 88000, pctMaisons: 2,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Arrondissement très dense autour de Bastille, Oberkampf et République. Immeubles anciens avec cours intérieures. Forte demande de rénovation énergétique en copropriété.",
    economieChauffage: "700€ à 1 000€", potentielSolaire: "Bon",
    pctChauffageGaz: 42, pctChauffageFioul: 1, pctChauffageElec: 34, pctPassoiresThermiques: 30, consommationMoyenne: 268,
    recommendationPAC: "PAC air-eau collective pour les copropriétés anciennes autour d'Oberkampf et de la Bastille. PAC air-air individuelle pour les appartements avec chauffage électrique. Solutions ultra-compactes obligatoires.",
    contexteEnergetique: "Le 11e arrondissement est l'un des plus denses de Paris, articulé autour de la Bastille, d'Oberkampf et de la place de la République. Les immeubles anciens du XIXe siècle, avec leurs cours intérieures et cages d'escalier étroites, posent des défis techniques pour l'installation de PAC. Le taux de passoires thermiques atteint 30% en raison de l'ancienneté du bâti et de l'absence quasi totale d'isolation. Le fioul a pratiquement disparu (1%) au profit du gaz collectif et de l'électricité. La forte demande de rénovation en copropriété crée un marché dynamique pour les solutions collectives de type PAC sur boucle d'eau."
  },
}
