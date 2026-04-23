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
export type ChauffageActuel = 'gaz' | 'fioul' | 'electrique' | 'bois' | 'autre'

/** Entrée utilisateur consolidée */
export interface SimulationInput {
  foyer: {
    personnes: number // 1+
    zone: ZoneRevenu
  }
  revenuFiscal: number // RFR N-1 (pour demande 2026 → RFR 2024)
  equipement: Equipement
  chauffageActuel: ChauffageActuel
  coutTTC: number
  /** Surface en m² — seulement pertinent pour l'isolation */
  surfaceM2?: number
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
}

/** Résultat complet de la simulation */
export interface SimulationResult {
  tranche: Tranche
  coutTTC: number
  aides: AideLigne[]
  totalAides: number
  resteACharge: number
  disclaimers: string[]
}
