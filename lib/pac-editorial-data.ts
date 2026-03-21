/**
 * PAC Editorial Content - Data File
 * 
 * Données statiques pour le contenu éditorial de la page pompe à chaleur.
 * Toutes les données proviennent de sources officielles (EDF, ADEME, economie.gouv.fr, france-renov.gouv.fr).
 * 
 * Requirements: 2.1, 2.4, 2.5, 2.6, 3.2, 5.1, 5.2, 5.3, 5.9, 6.1, 6.2, 7.1, 7.2, 10.1
 */

// ============================================================================
// Types TypeScript
// ============================================================================

export interface PACType {
  id: 'air-air' | 'air-eau' | 'eau-eau' | 'hybride';
  name: string;
  description: string;
  priceRange: {
    min: number;
    max: number;
    unit?: string;
  };
  savings: string;
  advantages: string[];
  disadvantages: string[];
  idealFor: string;
  cop: {
    min: number;
    max: number;
  };
}

export interface AideFinanciere {
  id: string;
  name: string;
  description: string;
  amounts: {
    tresModeste?: number;
    modeste?: number;
    intermediaire?: number;
    aise?: number;
  };
  plafond?: number;
  conditions: string[];
  source: SourceReference;
  cumulable: boolean;
}

export interface SourceReference {
  name: string;
  url: string;
  date: string;
  type: 'official' | 'study' | 'regulation';
}

export interface InstallationStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  icon?: string;
}

export interface R290Data {
  gwp: number;
  gwpR410A: number;
  odp: number;
  regulation: string;
  maxGwpNewEquipment: number;
  advantages: string[];
}

export interface EnvironmentalData {
  co2Reduction: string;
  savingsRange: string;
  copRange: {
    min: number;
    max: number;
  };
  freeEnergyRatio: number;
  source: string;
}


// ============================================================================
// PAC_TYPES - Les 4 types de pompes à chaleur avec données prix 2026
// Requirements: 2.1, 2.4, 2.5, 2.6
// ============================================================================

export const PAC_TYPES: PACType[] = [
  {
    id: 'air-air',
    name: 'PAC Air/Air',
    description: 'Climatisation réversible',
    priceRange: { min: 2000, max: 5000, unit: 'par unité' },
    savings: "jusqu'à 40%",
    advantages: [
      'Climatisation été incluse',
      'Installation rapide',
      'Coût abordable',
    ],
    disadvantages: [
      "Ne produit pas d'eau chaude",
      'Moins efficace par grand froid',
    ],
    idealFor: 'Appartements, maisons sans chauffage central',
    cop: { min: 3, max: 4 },
  },
  {
    id: 'air-eau',
    name: 'PAC Air/Eau',
    description: 'Chauffage central + eau chaude',
    priceRange: { min: 5000, max: 15000 },
    savings: '50-70%',
    advantages: [
      'Remplace chaudière',
      'Eau chaude sanitaire',
      'Compatible radiateurs',
    ],
    disadvantages: [
      'Coût initial plus élevé',
      'Travaux plus importants',
    ],
    idealFor: 'Maisons avec chauffage central existant',
    cop: { min: 3, max: 5 },
  },
  {
    id: 'eau-eau',
    name: 'PAC Géothermique',
    description: 'Exploite chaleur du sol',
    priceRange: { min: 15000, max: 25000 },
    savings: '60-75%',
    advantages: [
      'Rendement constant',
      'Très efficace',
      'Durée de vie longue',
    ],
    disadvantages: [
      'Coût élevé',
      'Travaux de forage',
      'Terrain nécessaire',
    ],
    idealFor: 'Constructions neuves, grands terrains',
    cop: { min: 4, max: 5.5 },
  },
  {
    id: 'hybride',
    name: 'PAC Hybride',
    description: 'PAC + chaudière gaz',
    priceRange: { min: 6000, max: 12000 },
    savings: '40-60%',
    advantages: [
      'Optimisation automatique',
      'Sécurité par grand froid',
      'Transition douce',
    ],
    disadvantages: [
      'Dépendance gaz partielle',
      'Entretien double système',
    ],
    idealFor: 'Rénovation progressive, climats rigoureux',
    cop: { min: 3, max: 4.5 },
  },
];


// ============================================================================
// AIDES_2026 - Aides financières avec MaPrimeRénov' rouvert 23/02/2026
// Requirements: 5.1, 5.2, 5.3, 5.9
// ============================================================================

export const AIDES_2026: AideFinanciere[] = [
  {
    id: 'maprimerenov',
    name: "MaPrimeRénov'",
    description: "Aide principale de l'État pour la rénovation énergétique - ROUVERT depuis le 23 février 2026",
    amounts: {
      tresModeste: 5000,
      modeste: 4000,
      intermediaire: 3000,
    },
    plafond: 12000,
    conditions: [
      'Résidence principale occupée 8 mois/an minimum',
      'Logement construit depuis au moins 15 ans',
      'Travaux réalisés par artisan RGE',
    ],
    source: {
      name: 'economie.gouv.fr',
      url: 'https://www.economie.gouv.fr/particuliers/prime-renovation-energetique',
      date: 'mars 2026',
      type: 'official',
    },
    cumulable: true,
  },
  {
    id: 'ecoptz',
    name: 'Éco-PTZ',
    description: 'Prêt à taux zéro pour financer le reste à charge',
    amounts: {},
    plafond: 50000,
    conditions: [
      'Logement de plus de 2 ans',
      'Travaux réalisés par artisan RGE',
    ],
    source: {
      name: 'service-public.fr',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F19905',
      date: 'mars 2026',
      type: 'official',
    },
    cumulable: true,
  },
  {
    id: 'cee',
    name: "CEE (Certificats d'Économies d'Énergie)",
    description: "Prime versée par les fournisseurs d'énergie",
    amounts: {
      tresModeste: 4000,
      modeste: 2500,
      intermediaire: 1500,
    },
    conditions: [
      'Logement de plus de 2 ans',
      'Travaux réalisés par artisan RGE',
    ],
    source: {
      name: 'ecologie.gouv.fr',
      url: 'https://www.ecologie.gouv.fr/dispositif-des-certificats-deconomies-denergie',
      date: 'mars 2026',
      type: 'official',
    },
    cumulable: true,
  },
  {
    id: 'tva-reduite',
    name: 'TVA réduite 5,5%',
    description: "Taux réduit sur l'installation",
    amounts: {},
    conditions: [
      'Logement de plus de 2 ans',
      'Résidence principale ou secondaire',
    ],
    source: {
      name: 'service-public.fr',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F10871',
      date: 'mars 2026',
      type: 'official',
    },
    cumulable: true,
  },
];


// ============================================================================
// INSTALLATION_STEPS - 5 étapes d'installation avec durées
// Requirements: 6.1, 6.2
// ============================================================================

export const INSTALLATION_STEPS: InstallationStep[] = [
  {
    step: 1,
    title: 'Visite technique gratuite',
    duration: '1h environ',
    description:
      'Évaluation du logement : isolation, surface, système actuel, emplacement unité extérieure.',
    icon: 'clipboard-check',
  },
  {
    step: 2,
    title: 'Étude et dimensionnement',
    duration: '48h',
    description:
      'Calcul thermique précis pour dimensionner correctement la PAC (ni sous, ni surdimensionnée).',
    icon: 'calculator',
  },
  {
    step: 3,
    title: 'Devis détaillé',
    duration: 'Sous 48h',
    description:
      'Matériel, installation, aides déduites, reste à charge. Tout est transparent.',
    icon: 'document-text',
  },
  {
    step: 4,
    title: 'Installation',
    duration: '1 à 2 jours',
    description:
      'Pose unité extérieure, raccordement, mise en service et réglages.',
    icon: 'wrench-screwdriver',
  },
];


// ============================================================================
// OFFICIAL_SOURCES - Minimum 5 sources officielles
// Requirements: 10.1
// ============================================================================

export const OFFICIAL_SOURCES: SourceReference[] = [
  {
    name: 'EDF',
    url: 'https://www.edf.fr/groupe-edf/espaces-dedies/l-energie-de-a-a-z/tout-sur-l-energie/le-developpement-durable/la-pompe-a-chaleur',
    date: 'février 2025',
    type: 'study',
  },
  {
    name: 'ADEME',
    url: 'https://www.ademe.fr/particuliers-eco-citoyens/habitation/construire/pompe-chaleur/',
    date: 'mars 2026',
    type: 'official',
  },
  {
    name: 'economie.gouv.fr',
    url: 'https://www.economie.gouv.fr/particuliers/prime-renovation-energetique',
    date: 'mars 2026',
    type: 'official',
  },
  {
    name: "France Rénov'",
    url: 'https://france-renov.gouv.fr/',
    date: 'mars 2026',
    type: 'official',
  },
  {
    name: 'Règlement EU 2024/573',
    url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R0573',
    date: '2024',
    type: 'regulation',
  },
];


// ============================================================================
// R290_DATA - Données fluide R290 (GWP 3, ODP 0, comparaison R410A)
// Requirements: 3.2
// ============================================================================

export const R290_DATA: R290Data = {
  gwp: 3,
  gwpR410A: 1430,
  odp: 0,
  regulation: 'EU 2024/573',
  maxGwpNewEquipment: 150,
  advantages: [
    'GWP 477x plus faible que R410A',
    'Meilleur rendement thermodynamique',
    'Fluide naturel (propane)',
    'Conforme réglementation EU 2024',
  ],
};

// ============================================================================
// ENVIRONMENTAL_DATA - Données environnementales (90% réduction CO2, 50-70% économies)
// Requirements: 7.1, 7.2
// ============================================================================

export const ENVIRONMENTAL_DATA: EnvironmentalData = {
  co2Reduction: '90%', // vs chaudière gaz/fioul
  savingsRange: '50-70%', // sur consommation chauffage
  copRange: { min: 3, max: 5 },
  freeEnergyRatio: 0.75, // 3/4 de l'énergie est gratuite (air)
  source: 'EDF',
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Calcule le temps de lecture estimé en minutes
 * Basé sur une vitesse de lecture moyenne de 200 mots par minute
 * 
 * @param wordCount - Nombre de mots dans le contenu
 * @returns Temps de lecture en minutes (arrondi au supérieur)
 */
export const calculateReadingTime = (wordCount: number): number => {
  return Math.ceil(wordCount / 200);
};
