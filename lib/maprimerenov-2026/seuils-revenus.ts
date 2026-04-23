// =============================================================================
// Seuils de revenus MaPrimeRénov' 2026
// Source : Guide ANAH "Les aides financières en 2026" (février 2026), page 8
// URL : https://www.anah.gouv.fr/sites/default/files/2026-02/Anah-FR-Guide_des_aides_Fev2026_WEB_20260224.pdf
// Base : Revenu Fiscal de Référence (RFR) N-1 — pour 2026, c'est le RFR 2024.
// =============================================================================

import type { Tranche, ZoneRevenu } from './types'

export const SOURCE_SEUILS =
  "Guide ANAH « Les aides financières en 2026 » (éd. février 2026, p.8)"

/**
 * Plafonds Île-de-France (en €).
 * Tableau : valeur à personnes 1, 2, 3, 4, 5. Au-delà : + parPersonneSupp.
 */
const IDF = {
  bleu:   { base: [24_031, 35_270, 42_357, 49_455, 56_580], parPersonneSupp: 7_116 },
  jaune:  { base: [29_253, 42_933, 51_564, 60_208, 68_877], parPersonneSupp: 8_663 },
  violet: { base: [40_851, 60_051, 71_846, 84_562, 96_817], parPersonneSupp: 12_257 },
} as const

/** Plafonds hors Île-de-France + Outre-mer (en €). */
const HORS_IDF = {
  bleu:   { base: [17_363, 25_393, 30_540, 35_676, 40_835], parPersonneSupp: 5_151 },
  jaune:  { base: [22_259, 32_553, 39_148, 45_735, 52_348], parPersonneSupp: 6_598 },
  violet: { base: [31_185, 45_842, 55_196, 64_550, 73_907], parPersonneSupp: 9_357 },
} as const

export const SEUILS_REVENUS_2026 = { idf: IDF, hors_idf: HORS_IDF } as const

/**
 * Retourne le plafond exact pour une tranche donnée, en fonction du nombre
 * de personnes dans le foyer et de la zone.
 */
export function plafondPourTranche(
  tranche: Exclude<Tranche, 'rose'>,
  personnes: number,
  zone: ZoneRevenu,
): number {
  const table = zone === 'idf' ? IDF : HORS_IDF
  const entry = table[tranche]
  if (personnes <= 5) {
    return entry.base[Math.max(1, personnes) - 1]
  }
  return entry.base[4] + entry.parPersonneSupp * (personnes - 5)
}

/**
 * Calcule la tranche MaPrimeRénov' d'un foyer à partir de son RFR.
 *
 * Règle : on prend la tranche la plus basse dont le plafond est >= RFR.
 * Au-dessus du plafond Violet, le foyer est en tranche Rose.
 */
export function trancheFromRFR(
  rfr: number,
  personnes: number,
  zone: ZoneRevenu,
): Tranche {
  if (rfr < 0 || !Number.isFinite(rfr)) {
    throw new Error("Revenu fiscal de référence invalide")
  }
  const n = Math.max(1, Math.floor(personnes))
  if (rfr <= plafondPourTranche('bleu', n, zone)) return 'bleu'
  if (rfr <= plafondPourTranche('jaune', n, zone)) return 'jaune'
  if (rfr <= plafondPourTranche('violet', n, zone)) return 'violet'
  return 'rose'
}

/** Libellé humain d'une tranche (pour l'UI) */
export const LIBELLE_TRANCHE: Record<Tranche, string> = {
  bleu: 'Bleu — très modestes',
  jaune: 'Jaune — modestes',
  violet: 'Violet — intermédiaires',
  rose: 'Rose — supérieurs',
}
