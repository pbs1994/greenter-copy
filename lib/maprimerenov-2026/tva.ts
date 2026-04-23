// =============================================================================
// TVA sur travaux de rénovation énergétique — 2026
// Sources :
//  - CGI art. 279-0 bis & 278-0 bis A
//  - Arrêté du 4 décembre 2024 (taux 5,5 %, matériel éligible)
//  - Guide ANAH 2026 p. 35-37
// =============================================================================

import type { Equipement } from './types'

export const SOURCE_TVA =
  "CGI art. 279-0 bis & 278-0 bis A + Arrêté du 4 décembre 2024"

export const TVA_2026 = {
  reduit_5_5: 0.055, // énergétique éligible
  reduit_10:  0.10,  // autres travaux d'amélioration
  normal_20:  0.20,  // taux plein
} as const

/**
 * Taux TVA applicable selon l'équipement (logement > 2 ans).
 */
export function tauxTVA(equipement: Equipement): number {
  // Tous les équipements éligibles MPR + climatisation réversible sont au 5,5 %
  // si logement > 2 ans. Seules les chaudières fossiles (gaz) restent à 20 %
  // depuis l'arrêté du 4 décembre 2024 — jamais présentes dans notre simulateur.
  switch (equipement) {
    case 'pac_air_eau':
    case 'pac_geothermique':
    case 'pac_air_air':
    case 'cesi':
    case 'ssc':
    case 'chauffe_eau_thermo':
    case 'poele_granules':
    case 'poele_buches':
    case 'iso_combles_perdus':
    case 'iso_rampants':
    case 'iso_toit_terrasse':
    case 'vmc_double_flux':
    case 'audit_energetique':
      return TVA_2026.reduit_5_5
    default:
      return TVA_2026.reduit_10
  }
}

/**
 * Calcule l'économie TVA par rapport au taux normal 20 % pour un coût TTC
 * déjà affiché par l'artisan (qui applique déjà la TVA réduite).
 *
 * L'économie TVA = (20% - tauxRéduit) × HT. Mais nous partons du TTC.
 * Formule : HT = TTC / (1 + tauxRéduit) ; économie = HT × (0.20 - tauxRéduit).
 */
export function economieTVA(equipement: Equipement, coutTTC: number): number {
  const taux = tauxTVA(equipement)
  if (taux >= TVA_2026.normal_20) return 0
  const ht = coutTTC / (1 + taux)
  const economie = ht * (TVA_2026.normal_20 - taux)
  return Math.round(economie)
}
