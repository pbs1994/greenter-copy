// =============================================================================
// Point d'entrée public — MaPrimeRénov' 2026
// =============================================================================

export type {
  Tranche,
  ZoneRevenu,
  Equipement,
  ChauffageActuel,
  SimulationInput,
  SimulationResult,
  AideLigne,
} from './types'

export { trancheFromRFR, LIBELLE_TRANCHE, plafondPourTranche, SOURCE_SEUILS } from './seuils-revenus'
export { mprGeste, MPR_GESTE_2026, ECRETEMENT_GESTE, SOURCE_MPR_GESTE } from './mpr-geste'
export { primeEDF, PRIME_EDF_2026, SOURCE_PRIME_EDF } from './prime-edf'
export { estimationCEEMontant, estimationCEEMedian, COEFFICIENTS_CEE_2026, SOURCE_CEE } from './cee'
export { tauxTVA, economieTVA, TVA_2026, SOURCE_TVA } from './tva'
export { plafondEcoPTZ, ECO_PTZ_2026, SOURCE_ECO_PTZ } from './eco-ptz'
export { calculate } from './calculate'
