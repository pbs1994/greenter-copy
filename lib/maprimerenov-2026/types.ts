// =============================================================================
// Types communs — MaPrimeRénov' 2026
// =============================================================================

/** Tranches de revenus officielles MaPrimeRénov' (couleurs Anah) */
export type Tranche = 'bleu' | 'jaune' | 'violet' | 'rose'

/** Zone géographique pour les plafonds de revenus */
export type ZoneRevenu = 'idf' | 'hors_idf'

/** Équipements couverts par le simulateur */
export type Equipement =
  | 'pac_air_eau'
  | 'pac_geothermique'
  | 'pac_air_air'
  | 'cesi'
  | 'ssc'
  | 'chauffe_eau_thermo'
  | 'poele_granules'
  | 'poele_buches'
  | 'iso_combles_perdus'
  | 'iso_rampants'
  | 'iso_toit_terrasse'
  | 'audit_energetique'
  | 'vmc_double_flux'

/** Mode de chauffage actuel (pour EDF + CEE) */
export type ChauffageActuel = 'gaz' | 'fioul' | 'charbon' | 'electrique' | 'bois' | 'autre'

/** Un équipement choisi par l'utilisateur, avec son coût et — si isolation — sa surface. */
export interface EquipementInput {
  equipement: Equipement
  coutTTC: number
  /** Surface en m² — requise pour les gestes d'isolation (barème €/m²) */
  surfaceM2?: number
}

/** Entrée utilisateur consolidée — une simulation peut couvrir 1 à N équipements */
export interface SimulationInput {
  foyer: {
    personnes: number
    zone: ZoneRevenu
  }
  revenuFiscal: number // RFR N-1 (pour demande 2026 → RFR 2024)
  chauffageActuel: ChauffageActuel
  /** Surface chauffée totale du logement (pour estimation CEE) */
  surfaceLogementM2: number
  /** Liste d'équipements sélectionnés (au moins 1) */
  equipements: EquipementInput[]
}

/** Ligne détaillée dans le résultat */
export interface AideLigne {
  libelle: string
  montant: number // en euros, entier
  source: string
  /** Estimation ou montant garanti */
  estimation?: boolean
  /** Si non applicable, raison */
  nonApplicable?: string
  /** Équipement auquel cette aide est rattachée (si applicable) */
  equipement?: Equipement
}

/** Résultat complet de la simulation */
export interface SimulationResult {
  tranche: Tranche
  /** Coût TTC total (somme des équipements) */
  coutTTC: number
  aides: AideLigne[]
  totalAides: number
  resteACharge: number
  disclaimers: string[]
  /** Plafond éco-PTZ mobilisable selon le nombre de gestes éligibles */
  ecoPTZ: {
    plafond: number
    dureeMaxAns: number
    commentaire: string
  }
}
