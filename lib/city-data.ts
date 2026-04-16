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
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "combs-la-ville": {
    slug: "combs-la-ville", population: 23000, logements: 8800, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1970-1995",
    caracteristique: "Commune résidentielle de Sénart avec un tissu pavillonnaire dense. Gare RER D et proximité de la Francilienne. Nombreuses maisons des années 70-80 avec chaudières gaz à remplacer.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "lognes": {
    slug: "lognes", population: 15000, logements: 6000, pctMaisons: 48,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1980-2000",
    caracteristique: "Ville nouvelle de Marne-la-Vallée, urbanisme moderne. Parc immobilier plus récent que la moyenne avec des normes d'isolation correctes. Potentiel fort pour le solaire photovoltaïque.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon"
  },
  "noisiel": {
    slug: "noisiel", population: 16000, logements: 6200, pctMaisons: 40,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1990",
    caracteristique: "Ancienne cité ouvrière Menier, patrimoine industriel classé. Ville de Marne-la-Vallée avec un mélange de logements sociaux et pavillons. Chocolaterie historique reconvertie.",
    economieChauffage: "750€ à 1 150€", potentielSolaire: "Bon"
  },
  "lagny-sur-marne": {
    slug: "lagny-sur-marne", population: 22000, logements: 9200, pctMaisons: 50,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "avant 1975",
    caracteristique: "Cité médiévale au bord de la Marne avec un centre historique pittoresque. Mélange de maisons de ville anciennes et pavillons en périphérie. Fort potentiel de rénovation thermique.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "villeparisis": {
    slug: "villeparisis", population: 27000, logements: 10500, pctMaisons: 58,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1965-1990",
    caracteristique: "Commune en bordure du canal de l'Ourcq, entre Seine-et-Marne et Seine-Saint-Denis. Quartiers pavillonnaires étendus avec maisons des années 70, souvent chauffées au fioul ou gaz.",
    economieChauffage: "900€ à 1 350€", potentielSolaire: "Bon"
  },
  "moissy-cramayel": {
    slug: "moissy-cramayel", population: 19000, logements: 7200, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Ville de Sénart avec zones d'activités importantes. Parc résidentiel mixte, quartiers pavillonnaires et collectifs récents. Proximité A5 et Francilienne.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "dammarie-les-lys": {
    slug: "dammarie-les-lys", population: 23000, logements: 9800, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1960-1985",
    caracteristique: "Limitrophe de Melun, en bord de Seine. Base de loisirs et forêt de Fontainebleau à proximité. Logements des années 60-80 nécessitant une rénovation thermique globale.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "le-mee-sur-seine": {
    slug: "le-mee-sur-seine", population: 21000, logements: 8800, pctMaisons: 40,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1960-1985",
    caracteristique: "Ville résidentielle en bord de Seine, proche de Melun. Grands ensembles et quartiers pavillonnaires. Programme de rénovation urbaine en cours, opportunité pour la transition énergétique.",
    economieChauffage: "800€ à 1 250€", potentielSolaire: "Bon"
  },
  "cesson": {
    slug: "cesson", population: 10000, logements: 4000, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Petite commune entre Melun et Sénart avec un caractère semi-rural préservé. Pavillons avec jardins et quelques résidences récentes. Calme et verdoyant.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "servon": {
    slug: "servon", population: 3500, logements: 1400, pctMaisons: 85,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1980-2005",
    caracteristique: "Village pavillonnaire entre Brie-Comte-Robert et Lésigny. Zone commerciale importante. Maisons récentes avec jardins, bon ensoleillement pour le photovoltaïque.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon"
  },
  "lieusaint": {
    slug: "lieusaint", population: 14000, logements: 5200, pctMaisons: 50,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1990-2010",
    caracteristique: "Ville nouvelle de Sénart avec le centre commercial Carré Sénart. Parc immobilier récent et bien isolé. Fort développement urbain avec écoquartiers.",
    economieChauffage: "650€ à 1 000€", potentielSolaire: "Bon"
  },
  "senart": {
    slug: "senart", population: 120000, logements: 45000, pctMaisons: 52,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1985-2010",
    caracteristique: "Ville nouvelle regroupant 8 communes au sud de la Seine-et-Marne. Urbanisme planifié avec espaces verts. Parc immobilier parmi les plus récents d'Île-de-France.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon"
  },
  // ---- Val-de-Marne (94) ----
  "creteil": {
    slug: "creteil", population: 92000, logements: 40000, pctMaisons: 18,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1980",
    caracteristique: "Préfecture du Val-de-Marne, lac et base de loisirs. Architecture des années 70 avec grands ensembles et dalles. Quartiers pavillonnaires au sud. Université Paris-Est.",
    economieChauffage: "750€ à 1 100€", potentielSolaire: "Bon"
  },
  "maisons-alfort": {
    slug: "maisons-alfort", population: 56000, logements: 27000, pctMaisons: 25,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville dense en bord de Marne et Seine. École vétérinaire historique. Immeubles anciens et pavillons en quartier Charentonneau. Fort potentiel de rénovation des copropriétés.",
    economieChauffage: "750€ à 1 100€", potentielSolaire: "Bon"
  },
  "saint-maur-des-fosses": {
    slug: "saint-maur-des-fosses", population: 78000, logements: 35000, pctMaisons: 58,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle prisée dans la boucle de la Marne. Nombreux pavillons bourgeois avec jardins. Parc immobilier ancien mais bien entretenu. Forte demande en rénovation énergétique haut de gamme.",
    economieChauffage: "950€ à 1 500€", potentielSolaire: "Bon"
  },
  "champigny-sur-marne": {
    slug: "champigny-sur-marne", population: 77000, logements: 31000, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1985",
    caracteristique: "Grande ville du Val-de-Marne en bord de Marne. Quartiers pavillonnaires (Le Plant, Coeuilly) et grands ensembles. Arrivée du Grand Paris Express dynamisera la rénovation.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "vincennes": {
    slug: "vincennes", population: 50000, logements: 28000, pctMaisons: 12,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Ville dense limitrophe de Paris avec le célèbre château et bois de Vincennes. Immeubles anciens haussmanniens et art déco. Rénovation en copropriété avec PAC collective adaptée.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon"
  },
  "nogent-sur-marne": {
    slug: "nogent-sur-marne", population: 33000, logements: 17000, pctMaisons: 30,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville élégante en bord de Marne, connue pour ses guinguettes. Pavillons cossus et immeubles de standing. Clientèle sensible à la transition écologique et au confort thermique.",
    economieChauffage: "850€ à 1 350€", potentielSolaire: "Bon"
  },
  "sucy-en-brie": {
    slug: "sucy-en-brie", population: 27000, logements: 10500, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Commune résidentielle verdoyante avec fort de Sucy et parc du château. Quartiers pavillonnaires prisés des familles. Maisons des années 70-90 avec chaudières gaz à remplacer.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon"
  },
  "ormesson-sur-marne": {
    slug: "ormesson-sur-marne", population: 10000, logements: 4200, pctMaisons: 72,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1975-2000",
    caracteristique: "Petite ville pavillonnaire et boisée au charme résidentiel. Lac et parc du château. Maisons avec jardins spacieux, population aisée investissant dans la rénovation énergétique.",
    economieChauffage: "900€ à 1 400€", potentielSolaire: "Bon"
  },
  "boissy-saint-leger": {
    slug: "boissy-saint-leger", population: 17000, logements: 6800, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Terminus du RER A, porte d'entrée de la Brie. Mélange de pavillons et de résidences. Proximité du bois Notre-Dame. Forte demande de remplacement de chaudières anciennes.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "villeneuve-saint-georges": {
    slug: "villeneuve-saint-georges", population: 34000, logements: 14000, pctMaisons: 35,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville en confluent Seine-Yerres avec un important parc ancien. Programme ANRU de renouvellement urbain. Logements énergivores avec DPE moyen E, priorité nationale de rénovation.",
    economieChauffage: "1 000€ à 1 500€", potentielSolaire: "Bon"
  },
  // ---- Essonne (91) ----
  "evry-courcouronnes": {
    slug: "evry-courcouronnes", population: 67000, logements: 27000, pctMaisons: 32,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Préfecture de l'Essonne, ville nouvelle avec cathédrale contemporaine. Grands ensembles et quartiers pavillonnaires. Université Paris-Saclay à proximité. Fort enjeu de transition énergétique.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "corbeil-essonnes": {
    slug: "corbeil-essonnes", population: 52000, logements: 22000, pctMaisons: 35,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville historique au confluent Seine-Essonne. Patrimoine industriel (imprimeries). Parc ancien nécessitant rénovation thermique. Programme de renouvellement urbain en cours.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "yerres": {
    slug: "yerres", population: 30000, logements: 12500, pctMaisons: 62,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Ville verte en bord de l'Yerres, propriété Caillebotte. Quartiers pavillonnaires prisés avec jardins. Population sensible à l'environnement, forte demande en solutions vertes.",
    economieChauffage: "900€ à 1 350€", potentielSolaire: "Bon"
  },
  "brunoy": {
    slug: "brunoy", population: 26000, logements: 11000, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle en vallée de l'Yerres, forêt de Sénart. Pavillons anciens et résidences. Gare RER D bien desservie. Patrimoine bâti ancien avec fort besoin d'isolation.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "montgeron": {
    slug: "montgeron", population: 24000, logements: 10200, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville connue pour le départ du Tour de France cycliste. Bords de l'Yerres et forêt de Sénart. Pavillons des années 60-70 avec chauffage au fioul encore fréquent à convertir.",
    economieChauffage: "950€ à 1 400€", potentielSolaire: "Bon"
  },
  "vigneux-sur-seine": {
    slug: "vigneux-sur-seine", population: 32000, logements: 12500, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1990",
    caracteristique: "Ville en bord de Seine avec lac Daumesnil et base de loisirs. Quartiers pavillonnaires et collectifs. Proximité A6 et RER D. Parc des années 60-80 à rénover.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  // ---- Seine-Saint-Denis (93) ----
  "noisy-le-grand": {
    slug: "noisy-le-grand", population: 67000, logements: 27000, pctMaisons: 38,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1975-1995",
    caracteristique: "Ville de Marne-la-Vallée avec les Arènes de Picasso et le Palacio d'Abraxas (architectures postmodernes). Mélange de grands ensembles et pavillons. RER A et futur Grand Paris Express.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "livry-gargan": {
    slug: "livry-gargan", population: 45000, logements: 18000, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1960-1990",
    caracteristique: "Commune résidentielle en lisière de la forêt de Bondy. Importante proportion de pavillons des années 60-80. Abbaye de Livry historique. Forte demande de rénovation chauffage.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "gagny": {
    slug: "gagny", population: 40000, logements: 16000, pctMaisons: 50,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1960-1990",
    caracteristique: "Ville sur les coteaux dominant la Marne. Forêt de Bondy et parc forestier de la Poudrerie. Quartiers pavillonnaires sur les hauteurs, collectifs en vallée. Vue dégagée pour le solaire.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "montfermeil": {
    slug: "montfermeil", population: 27000, logements: 9500, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1965-1990",
    caracteristique: "Ville perchée sur les hauteurs avec vue sur Paris. Citée dans Les Misérables de Hugo. Grands programmes de rénovation urbaine ANRU. Transition énergétique des copropriétés en cours.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "le-raincy": {
    slug: "le-raincy", population: 15000, logements: 7000, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Surnommée le Neuilly de la Seine-Saint-Denis. Église Notre-Dame classée, allée du Château. Villas et pavillons bourgeois avec jardins. Clientèle exigeante en rénovation premium.",
    economieChauffage: "900€ à 1 400€", potentielSolaire: "Bon"
  },
  "villemomble": {
    slug: "villemomble", population: 30000, logements: 13500, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle entre Raincy et Rosny. Pavillons anciens et résidences. Parc Lefèvre et allées arborées. Population familiale investissant dans le confort thermique.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "rosny-sous-bois": {
    slug: "rosny-sous-bois", population: 46000, logements: 20000, pctMaisons: 35,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1990",
    caracteristique: "Ville dynamique avec centre commercial Rosny 2 et Domus. Fort de Rosny. Mélange de collectifs et pavillons. Futur Grand Paris Express boostera la valorisation immobilière.",
    economieChauffage: "800€ à 1 150€", potentielSolaire: "Bon"
  },
  // ---- Paris (75) ----
  "paris": {
    slug: "paris", population: 2133000, logements: 1380000, pctMaisons: 2,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Capitale avec un parc immobilier très ancien, majoritairement haussmannien. 85% des logements classés D, E ou F. Obligation de rénovation des passoires thermiques d'ici 2034.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon"
  },
  "paris-20": {
    slug: "paris-20", population: 195000, logements: 105000, pctMaisons: 3,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Arrondissement populaire de l'Est parisien, Père-Lachaise et Belleville. Immeubles faubouriens et petits collectifs. Siège de Greenter au 38 rue de Ménilmontant. Forte densité.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon"
  },
  "paris-12": {
    slug: "paris-12", population: 143000, logements: 80000, pctMaisons: 4,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Arrondissement entre Bastille et Bois de Vincennes. Coulée verte et viaduc des Arts. Mélange d'immeubles anciens et de constructions des années 60-70. Bercy Village.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon"
  },
  "paris-11": {
    slug: "paris-11", population: 147000, logements: 88000, pctMaisons: 2,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Arrondissement très dense autour de Bastille, Oberkampf et République. Immeubles anciens avec cours intérieures. Forte demande de rénovation énergétique en copropriété.",
    economieChauffage: "700€ à 1 000€", potentielSolaire: "Bon"
  },
}
