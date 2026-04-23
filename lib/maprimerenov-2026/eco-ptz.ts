// =============================================================================
// Éco-prêt à taux zéro (éco-PTZ) 2026
// Sources : article 244 quater U du CGI + Guide ANAH 2026 p. 42-46
// =============================================================================

import type { Equipement } from './types'

export const SOURCE_ECO_PTZ = "Article 244 quater U du CGI + Guide ANAH 2026 (p. 42-46)"

export const ECO_PTZ_2026 = {
  monogeste:              { plafond: 15_000, dureeMaxAns: 15 },
  monogeste_parois:       { plafond: 7_000,  dureeMaxAns: 15 }, // si parois vitrées seules
  bouquet_2:              { plafond: 25_000, dureeMaxAns: 15 },
  bouquet_3_plus:         { plafond: 30_000, dureeMaxAns: 15 },
  performance_globale:    { plafond: 50_000, dureeMaxAns: 20 }, // + 2 classes DPE
  couple_mpr:             { plafond: 50_000, dureeMaxAns: 20 }, // éco-PTZ MaPrimeRénov'
} as const

/**
 * Plafond éco-PTZ mobilisable pour un geste unique + éligible MPR.
 * Quand il est couplé à MaPrimeRénov', le plafond passe à 50 000 €.
 */
export function plafondEcoPTZ(equipement: Equipement, coupleAvecMPR: boolean): {
  plafond: number
  dureeMaxAns: number
  commentaire: string
} {
  if (coupleAvecMPR) {
    return {
      plafond: ECO_PTZ_2026.couple_mpr.plafond,
      dureeMaxAns: ECO_PTZ_2026.couple_mpr.dureeMaxAns,
      commentaire: "Éco-PTZ couplé MaPrimeRénov' — jusqu'à 50 000 € sur 20 ans.",
    }
  }
  const parois = false // simplification : notre simulateur ne propose pas les parois vitrées seules
  const p = parois ? ECO_PTZ_2026.monogeste_parois : ECO_PTZ_2026.monogeste
  return {
    plafond: p.plafond,
    dureeMaxAns: p.dureeMaxAns,
    commentaire: `Éco-PTZ monogeste — jusqu'à ${p.plafond.toLocaleString('fr-FR')} € sur ${p.dureeMaxAns} ans.`,
  }
}
