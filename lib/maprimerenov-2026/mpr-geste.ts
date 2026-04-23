// =============================================================================
// MaPrimeRénov' Parcours par geste — barème 2026
// Source : Guide ANAH 2026, p. 10-18.
// Valeurs en €. Rose non éligible (hors rénovation d'ampleur).
// =============================================================================

import type { Equipement, Tranche } from './types'

export const SOURCE_MPR_GESTE =
  "Guide ANAH 2026, barème Parcours par geste (p. 10-18)"

type MontantsTranche = {
  bleu: number | null
  jaune: number | null
  violet: number | null
  rose: null // jamais éligible en parcours par geste
  /** Plafond de dépenses éligibles (€ pour un forfait, €/m² ou €/équipement selon l'unité) */
  plafond: number | null
  /** Unité du montant affiché */
  unite: 'forfait' | 'eur_m2' | 'eur_equipement'
  /** True si équipement présent dans le barème 2026 (false = retiré) */
  eligible: boolean
  /** Libellé humain */
  libelle: string
  /** Note / restriction éventuelle */
  note?: string
}

/**
 * Barème MaPrimeRénov' Parcours par geste 2026.
 * null = non éligible pour cette tranche (Rose toujours null en geste).
 */
export const MPR_GESTE_2026: Record<Equipement, MontantsTranche> = {
  pac_air_eau: {
    bleu: 5000, jaune: 4000, violet: 3000, rose: null, plafond: 12000,
    unite: 'forfait', eligible: true,
    libelle: "PAC air-eau (dont hybrides)",
  },
  pac_geothermique: {
    bleu: 11000, jaune: 9000, violet: 6000, rose: null, plafond: 18000,
    unite: 'forfait', eligible: true,
    libelle: "PAC géothermique / solarothermique",
  },
  pac_air_air: {
    bleu: null, jaune: null, violet: null, rose: null, plafond: null,
    unite: 'forfait', eligible: false,
    libelle: "PAC air-air (climatisation réversible)",
    note:
      "Non éligible à MaPrimeRénov' parcours par geste. Reste éligible à la prime CEE Coup de pouce chauffage si COP saisonnier ≥ 3,9.",
  },
  cesi: {
    bleu: 4000, jaune: 3000, violet: 2000, rose: null, plafond: 7000,
    unite: 'forfait', eligible: true,
    libelle: "Chauffe-eau solaire individuel (CESI)",
  },
  ssc: {
    bleu: 10000, jaune: 8000, violet: 4000, rose: null, plafond: 16000,
    unite: 'forfait', eligible: true,
    libelle: "Système solaire combiné (SSC)",
  },
  chauffe_eau_thermo: {
    bleu: 1200, jaune: 800, violet: 400, rose: null, plafond: 3500,
    unite: 'forfait', eligible: true,
    libelle: "Chauffe-eau thermodynamique",
  },
  poele_granules: {
    bleu: 1250, jaune: 1000, violet: 750, rose: null, plafond: 5000,
    unite: 'forfait', eligible: true,
    libelle: "Poêle à granulés",
  },
  poele_buches: {
    bleu: 1250, jaune: 1000, violet: 500, rose: null, plafond: 4000,
    unite: 'forfait', eligible: true,
    libelle: "Poêle à bûches",
  },
  iso_combles_perdus: {
    // Retirée du parcours par geste au 1er janvier 2026.
    // Reste éligible en rénovation d'ampleur (parcours accompagné) — non
    // couvert par ce simulateur — et au CEE Coup de pouce isolation.
    bleu: null, jaune: null, violet: null, rose: null, plafond: null,
    unite: 'eur_m2', eligible: false,
    libelle: "Isolation des combles perdus",
    note:
      "Retirée du barème MaPrimeRénov' parcours par geste au 1er janvier 2026. Reste éligible en rénovation d'ampleur ou via les CEE.",
  },
  iso_rampants: {
    bleu: 25, jaune: 20, violet: 15, rose: null, plafond: 75,
    unite: 'eur_m2', eligible: true,
    libelle: "Isolation des rampants / plafonds de combles",
  },
  iso_toit_terrasse: {
    bleu: 75, jaune: 60, violet: 40, rose: null, plafond: 180,
    unite: 'eur_m2', eligible: true,
    libelle: "Isolation des toitures-terrasses",
  },
  audit_energetique: {
    bleu: 500, jaune: 400, violet: 300, rose: null, plafond: 800,
    unite: 'forfait', eligible: true,
    libelle: "Audit énergétique (hors obligation réglementaire)",
    note:
      "Conditionné à la réalisation d'au moins un geste de travaux éligible.",
  },
  vmc_double_flux: {
    // Depuis le 1er janvier 2026, la VMC double flux n'est plus aidée en
    // monogeste : elle doit faire partie d'un BOUQUET cohérent de travaux
    // (rénovation d'ampleur ou parcours accompagné). On désactive donc
    // explicitement le calcul en parcours par geste.
    bleu: null, jaune: null, violet: null, rose: null, plafond: null,
    unite: 'forfait', eligible: false,
    libelle: "VMC double flux",
    note:
      "Depuis le 1er janvier 2026, plus éligible en monogeste — uniquement dans le cadre d'un bouquet de travaux (rénovation d'ampleur).",
  },
} as const

/**
 * Calcule le montant MaPrimeRénov' parcours par geste pour un équipement.
 *
 * @param equipement clé dans MPR_GESTE_2026
 * @param tranche classification foyer
 * @param coutHT coût hors taxes (€)
 * @param surfaceOuQte surface en m² OU nombre d'équipements (défaut 1 pour un forfait)
 */
export function mprGeste(
  equipement: Equipement,
  tranche: Tranche,
  coutHT: number,
  surfaceOuQte = 1,
): { montant: number; eligible: boolean; note?: string } {
  const b = MPR_GESTE_2026[equipement]
  if (!b.eligible) {
    return { montant: 0, eligible: false, note: b.note }
  }
  const forfaitTranche = b[tranche]
  if (forfaitTranche == null || b.plafond == null) {
    return {
      montant: 0,
      eligible: false,
      note:
        tranche === 'rose'
          ? "Revenus supérieurs (Rose) : pas d'aide MPR en parcours par geste."
          : undefined,
    }
  }
  const unite = surfaceOuQte
  const forfait = forfaitTranche * (b.unite === 'forfait' ? 1 : unite)
  const plafondDepenses = b.plafond * (b.unite === 'forfait' ? 1 : unite)
  const depenseEligible = Math.min(Math.max(0, coutHT), plafondDepenses)
  // La prime ne peut excéder ni le forfait ni la dépense éligible.
  const montant = Math.min(forfait, depenseEligible)
  return { montant: Math.round(montant), eligible: true, note: b.note }
}

/**
 * Plafonds d'écrêtement cumul MPR + CEE (parcours par geste) :
 * - Bleu : 90 % de la dépense TTC
 * - Jaune : 75 %
 * - Violet : 60 %
 * - Rose : non applicable
 */
export const ECRETEMENT_GESTE: Record<Tranche, number | null> = {
  bleu: 0.9,
  jaune: 0.75,
  violet: 0.6,
  rose: null,
}
