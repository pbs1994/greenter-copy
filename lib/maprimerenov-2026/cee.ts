// =============================================================================
// Coup de pouce chauffage CEE — 2026
// Source : https://www.ecologie.gouv.fr/politiques-publiques/coup-pouce-chauffage
// Base : avis CSE du 04/09/2025 + arrêté 74e (fiches PAC individuelles)
// =============================================================================

import type { ChauffageActuel, Equipement, Tranche } from './types'

export const SOURCE_CEE =
  "Ministère Transition Écologique — Coup de pouce chauffage (arrêté 74e, avis CSE 04/09/2025)"

/**
 * Coefficients de bonification 2026 par équipement ciblé.
 * Le montant FINAL dépend aussi de (a) les kWh cumac de la fiche
 * standardisée (variables selon zone + surface + équipement) et
 * (b) du prix de rachat CEE négocié avec l'obligé (7-9 €/MWh cumac).
 */
export const COEFFICIENTS_CEE_2026: Partial<Record<Equipement, { modestes: number; autres: number }>> = {
  pac_air_eau:      { modestes: 5, autres: 5 },
  pac_geothermique: { modestes: 5, autres: 5 },
  ssc:              { modestes: 2, autres: 2 },
  // PAC air-air : éligible aux CEE "classiques" seulement si COP saisonnier ≥ 3,9
  // (pas de bonification Coup de pouce). Laisse à la négociation obligé.
}

/**
 * Estimation indicative du montant CEE Coup de pouce en euros pour une PAC
 * air-eau ou géothermique remplaçant gaz/fioul en Île-de-France (zone H1).
 *
 * Basé sur les fourchettes observées 2025-2026 auprès des obligés (Effy,
 * TotalEnergies, Engie, Sonergia, etc.). La valeur EXACTE nécessite un devis
 * spécifique par l'obligé choisi — afficher toujours comme fourchette.
 *
 * @param surfaceM2 surface chauffée en m²
 * @returns { min, max } en €
 */
export function estimationCEEMontant(
  equipement: Equipement,
  tranche: Tranche,
  chauffageActuel: ChauffageActuel,
  surfaceM2: number,
): { min: number; max: number } | null {
  const coef = COEFFICIENTS_CEE_2026[equipement]
  if (!coef) return null
  const remplacementEligible = chauffageActuel === 'gaz' || chauffageActuel === 'fioul'
  if (!remplacementEligible) return null

  const surface = Math.max(40, Math.min(300, surfaceM2))
  // Heuristique calibrée sur données publiques obligés IdF (zone H1) :
  // - PAC air-eau : 25 à 45 €/m² pour modestes, 15 à 30 €/m² pour autres
  // - PAC géothermique : ~1,5x la PAC air-eau
  const estModeste = tranche === 'bleu' || tranche === 'jaune'
  let baseMin: number
  let baseMax: number
  if (equipement === 'pac_air_eau') {
    baseMin = estModeste ? 25 : 15
    baseMax = estModeste ? 45 : 30
  } else if (equipement === 'pac_geothermique') {
    baseMin = estModeste ? 40 : 25
    baseMax = estModeste ? 70 : 45
  } else {
    baseMin = 10
    baseMax = 20
  }
  return {
    min: Math.round(surface * baseMin),
    max: Math.round(surface * baseMax),
  }
}

/**
 * Valeur médiane à utiliser pour l'affichage du "reste à charge estimé"
 * (sans en faire un chiffre garanti).
 */
export function estimationCEEMedian(
  equipement: Equipement,
  tranche: Tranche,
  chauffageActuel: ChauffageActuel,
  surfaceM2: number,
): number | null {
  const r = estimationCEEMontant(equipement, tranche, chauffageActuel, surfaceM2)
  if (!r) return null
  return Math.round((r.min + r.max) / 2)
}
