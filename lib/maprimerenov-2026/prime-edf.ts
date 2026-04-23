// =============================================================================
// Prime EDF « Je passe à l'électrique » — avril 2026
// Source : https://particulier.edf.fr/fr/accueil/guide-energie/electricite/prime-pompe-a-chaleur.html
// Annonce officielle : 8 avril 2026 (B. Fontana, PDG EDF)
// =============================================================================

import type { ChauffageActuel, Equipement, Tranche } from './types'

export const SOURCE_PRIME_EDF = "EDF Particulier — Prime Je passe à l'électrique (avril 2026)"

export const PRIME_EDF_2026 = {
  montant: 1000,
  dateDebut: '2026-04-08',
  /** Date limite de DÉPÔT du dossier */
  dateFinDepot: '2027-04-07',
  /** Date limite d'ACHÈVEMENT des travaux */
  dateFinTravaux: '2027-12-31',
  /** Conservé pour rétro-compatibilité — alias sur dateFinDepot */
  dateFin: '2027-04-07',
  dossiersMax: 80_000,
  /** Tranches éligibles : uniquement Bleu + Jaune (modestes) */
  tranchesEligibles: ['bleu', 'jaune'] as const,
  /** Équipements éligibles */
  equipementsEligibles: ['pac_air_eau', 'pac_geothermique'] as Equipement[],
  /** Chauffages remplacés éligibles */
  chauffagesRemplacesEligibles: ['gaz', 'fioul'] as ChauffageActuel[],
} as const

/**
 * Vérifie l'éligibilité + retourne le montant de la prime EDF 1 000 €.
 */
export function primeEDF(args: {
  tranche: Tranche
  equipement: Equipement
  chauffageActuel: ChauffageActuel
  dateDevisISO?: string // défaut : aujourd'hui
}): { eligible: boolean; montant: number; raison?: string } {
  const { tranche, equipement, chauffageActuel } = args
  const date = args.dateDevisISO ?? new Date().toISOString().slice(0, 10)

  if (
    !PRIME_EDF_2026.tranchesEligibles.includes(
      tranche as (typeof PRIME_EDF_2026.tranchesEligibles)[number],
    )
  ) {
    return {
      eligible: false,
      montant: 0,
      raison: "Réservée aux ménages Bleu et Jaune (modestes + très modestes).",
    }
  }
  if (!PRIME_EDF_2026.equipementsEligibles.includes(equipement)) {
    return {
      eligible: false,
      montant: 0,
      raison: "Éligible uniquement pour une PAC air-eau ou eau-eau (géothermique).",
    }
  }
  if (!PRIME_EDF_2026.chauffagesRemplacesEligibles.includes(chauffageActuel)) {
    return {
      eligible: false,
      montant: 0,
      raison: "Uniquement en remplacement d'une chaudière gaz ou fioul.",
    }
  }
  if (date < PRIME_EDF_2026.dateDebut || date > PRIME_EDF_2026.dateFin) {
    return {
      eligible: false,
      montant: 0,
      raison: `Devis à signer entre le ${PRIME_EDF_2026.dateDebut} et le ${PRIME_EDF_2026.dateFin}.`,
    }
  }
  return { eligible: true, montant: PRIME_EDF_2026.montant }
}
