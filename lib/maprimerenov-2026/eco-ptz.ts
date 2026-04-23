// =============================================================================
// Éco-prêt à taux zéro (éco-PTZ) 2026
// Sources : article 244 quater U du CGI + R319-1 et suivants du CCH
//          + Service Public F19905 + Guide ANAH 2026 (p. 42-46)
// =============================================================================

import type { Equipement } from './types'

export const SOURCE_ECO_PTZ = "Article 244 quater U du CGI + Service Public F19905 + Guide ANAH 2026"

export const ECO_PTZ_2026 = {
  monogeste:           { plafond: 15_000, dureeMaxAns: 15 },
  monogeste_parois:    { plafond: 7_000,  dureeMaxAns: 15 },
  bouquet_2:           { plafond: 25_000, dureeMaxAns: 15 },
  bouquet_3_plus:      { plafond: 30_000, dureeMaxAns: 15 },
  performance_globale: { plafond: 50_000, dureeMaxAns: 20 }, // gain ≥ 35 % conso ou 2 classes DPE
  couple_mpr:          { plafond: 50_000, dureeMaxAns: 20 }, // éco-PTZ couplé MPR
} as const

/**
 * Liste blanche des équipements de notre simulateur qui constituent une
 * "action" éligible à l'éco-PTZ (au sens de l'article 244 quater U du CGI).
 *
 * Catégories éligibles éco-PTZ :
 * 1. Isolation toiture (combles perdus, rampants, toit-terrasse)
 * 2. Isolation murs extérieurs
 * 3. Parois vitrées (plafond 7 000 € si seules)
 * 4. Isolation planchers bas
 * 5. Système de chauffage / ECS performant
 * 6. Équipement de chauffage utilisant une énergie renouvelable
 *    (PAC air-eau, géothermique, poêles bois) — PAS PAC air-air
 * 7. Équipement ECS utilisant EnR (CESI, SSC, chauffe-eau thermo)
 *
 * Exclus explicitement :
 * - Audit énergétique : prérequis pour rénovation globale, jamais une "action"
 * - PAC air-air : exclue depuis 2020 (sources : Compte CO2, Quelle Énergie,
 *   Garanka). La climatisation réversible n'ouvre pas l'éco-PTZ.
 * - VMC double flux en monogeste : non éligible depuis le 1er janvier 2026,
 *   mais reste comptabilisée si elle accompagne d'autres gestes (catégorie 5).
 */
export const EQUIPEMENTS_ECO_PTZ_ELIGIBLES: Record<Equipement, boolean> = {
  pac_air_eau:         true,
  pac_geothermique:    true,
  pac_air_air:         false, // exclu depuis 2020
  cesi:                true,
  ssc:                 true,
  chauffe_eau_thermo:  true,
  poele_granules:      true,
  poele_buches:        true,
  iso_combles_perdus:  true,
  iso_rampants:        true,
  iso_toit_terrasse:   true,
  vmc_double_flux:     true, // OK si dans un bouquet (cat. 5 chauffage/ventilation)
  audit_energetique:   false, // jamais une "action" éco-PTZ
}

/**
 * True si l'équipement est éligible à l'éco-PTZ (compte dans le bouquet).
 */
export function estEligibleEcoPTZ(equipement: Equipement): boolean {
  return EQUIPEMENTS_ECO_PTZ_ELIGIBLES[equipement] === true
}

/**
 * Plafond éco-PTZ mobilisable selon le nombre de gestes éligibles
 * et le couplage avec MaPrimeRénov'.
 *
 * @param nbGestesEligibles nombre d'équipements éligibles éco-PTZ
 *                          (audit + PAC air-air NON comptés)
 * @param coupleAvecMPR     true si MaPrimeRénov' est effectivement perçue
 */
export function plafondEcoPTZ(
  nbGestesEligibles: number,
  coupleAvecMPR: boolean,
): { plafond: number; dureeMaxAns: number; commentaire: string } {
  if (coupleAvecMPR) {
    return {
      plafond: ECO_PTZ_2026.couple_mpr.plafond,
      dureeMaxAns: ECO_PTZ_2026.couple_mpr.dureeMaxAns,
      commentaire: "éco-PTZ couplé MaPrimeRénov' — jusqu'à 50 000 € sur 20 ans.",
    }
  }
  if (nbGestesEligibles >= 3) {
    return {
      plafond: ECO_PTZ_2026.bouquet_3_plus.plafond,
      dureeMaxAns: ECO_PTZ_2026.bouquet_3_plus.dureeMaxAns,
      commentaire: "éco-PTZ bouquet 3 actions ou plus — jusqu'à 30 000 € sur 15 ans.",
    }
  }
  if (nbGestesEligibles === 2) {
    return {
      plafond: ECO_PTZ_2026.bouquet_2.plafond,
      dureeMaxAns: ECO_PTZ_2026.bouquet_2.dureeMaxAns,
      commentaire: "éco-PTZ bouquet 2 actions — jusqu'à 25 000 € sur 15 ans.",
    }
  }
  if (nbGestesEligibles === 1) {
    return {
      plafond: ECO_PTZ_2026.monogeste.plafond,
      dureeMaxAns: ECO_PTZ_2026.monogeste.dureeMaxAns,
      commentaire: "éco-PTZ monogeste — jusqu'à 15 000 € sur 15 ans.",
    }
  }
  return {
    plafond: 0,
    dureeMaxAns: 0,
    commentaire:
      "Aucun équipement de votre sélection n'est éligible à l'éco-PTZ (audit énergétique et PAC air-air sont exclus).",
  }
}
