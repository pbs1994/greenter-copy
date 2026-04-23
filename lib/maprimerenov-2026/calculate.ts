// =============================================================================
// Orchestration du calcul complet des aides MaPrimeRénov' 2026
// =============================================================================

import type { SimulationInput, SimulationResult, AideLigne } from './types'
import { trancheFromRFR } from './seuils-revenus'
import {
  mprGeste,
  MPR_GESTE_2026,
  ECRETEMENT_GESTE,
  SOURCE_MPR_GESTE,
} from './mpr-geste'
import { primeEDF, SOURCE_PRIME_EDF } from './prime-edf'
import { estimationCEEMedian, estimationCEEMontant, SOURCE_CEE } from './cee'
import { economieTVA, tauxTVA, SOURCE_TVA } from './tva'
import { plafondEcoPTZ, SOURCE_ECO_PTZ } from './eco-ptz'

/**
 * Convertit un coût TTC en HT selon le taux TVA applicable.
 * Utile pour le calcul MPR qui est plafonné en HT.
 */
function coutHT(coutTTC: number, tauxTVA: number): number {
  return coutTTC / (1 + tauxTVA)
}

export function calculate(input: SimulationInput): SimulationResult {
  const disclaimers: string[] = []
  const aides: AideLigne[] = []

  // Étape 1 — Tranche
  const tranche = trancheFromRFR(
    input.revenuFiscal,
    input.foyer.personnes,
    input.foyer.zone,
  )

  // Étape 2 — Détermination TVA pour passer TTC → HT
  const taux = tauxTVA(input.equipement)
  const ht = coutHT(input.coutTTC, taux)

  // ---- A) MaPrimeRénov' parcours par geste ----
  const eq = MPR_GESTE_2026[input.equipement]
  const surfaceOuQte = eq.unite === 'eur_m2' ? (input.surfaceM2 ?? 0) : 1
  const mpr = mprGeste(input.equipement, tranche, ht, surfaceOuQte)
  if (mpr.eligible && mpr.montant > 0) {
    aides.push({
      libelle: `MaPrimeRénov' ${eq.libelle} — tranche ${tranche}`,
      montant: mpr.montant,
      source: SOURCE_MPR_GESTE,
    })
  } else if (mpr.note) {
    aides.push({
      libelle: `MaPrimeRénov' ${eq.libelle}`,
      montant: 0,
      source: SOURCE_MPR_GESTE,
      nonApplicable: mpr.note,
    })
  }

  // ---- B) Prime EDF ----
  const edf = primeEDF({
    tranche,
    equipement: input.equipement,
    chauffageActuel: input.chauffageActuel,
  })
  if (edf.eligible) {
    aides.push({
      libelle: "Prime EDF « Je passe à l'électrique »",
      montant: edf.montant,
      source: SOURCE_PRIME_EDF,
    })
    disclaimers.push(
      "La prime EDF est limitée à 80 000 dossiers (premier arrivé, premier servi). Date limite de dépôt : 7 avril 2027.",
    )
  } else if (edf.raison) {
    aides.push({
      libelle: "Prime EDF « Je passe à l'électrique »",
      montant: 0,
      source: SOURCE_PRIME_EDF,
      nonApplicable: edf.raison,
    })
  }

  // ---- C) Coup de pouce CEE (estimation) ----
  const surfaceChauffee = input.surfaceM2 ?? 100
  const ceeMedian = estimationCEEMedian(
    input.equipement,
    tranche,
    input.chauffageActuel,
    surfaceChauffee,
  )
  const ceeRange = estimationCEEMontant(
    input.equipement,
    tranche,
    input.chauffageActuel,
    surfaceChauffee,
  )
  if (ceeMedian && ceeRange) {
    aides.push({
      libelle: `Coup de pouce chauffage CEE (bonifié ×5) — estimation médiane pour ${surfaceChauffee} m² en zone H1`,
      montant: ceeMedian,
      source: SOURCE_CEE,
      estimation: true,
    })
    disclaimers.push(
      `Fourchette CEE réelle : entre ${ceeRange.min.toLocaleString(
        'fr-FR',
      )} € et ${ceeRange.max.toLocaleString(
        'fr-FR',
      )} €. Montant exact dépend de l'obligé CEE (Effy, TotalEnergies, Engie, Sonergia…) et du volume kWh cumac.`,
    )
  } else if (input.equipement === 'pac_air_eau' || input.equipement === 'pac_geothermique') {
    aides.push({
      libelle: "Coup de pouce chauffage CEE",
      montant: 0,
      source: SOURCE_CEE,
      nonApplicable:
        "Éligible uniquement en remplacement d'une chaudière gaz, fioul ou charbon.",
    })
  }

  // ---- D) Économie TVA (réduit 5,5 % vs taux normal 20 %) ----
  const ecoTVA = economieTVA(input.equipement, input.coutTTC)
  if (ecoTVA > 0) {
    aides.push({
      libelle: `TVA réduite à ${(taux * 100).toFixed(1).replace('.', ',')} % (vs 20 %)`,
      montant: ecoTVA,
      source: SOURCE_TVA,
    })
  }

  // ---- E) Écrêtement MPR + CEE ----
  const cap = ECRETEMENT_GESTE[tranche]
  if (cap != null) {
    const mprIdx = aides.findIndex((a) => a.libelle.startsWith('MaPrimeRénov'))
    const ceeIdx = aides.findIndex((a) => a.libelle.startsWith('Coup de pouce'))
    const mprMontant = mprIdx >= 0 ? aides[mprIdx].montant : 0
    const ceeMontant = ceeIdx >= 0 ? aides[ceeIdx].montant : 0
    const plafondCumule = input.coutTTC * cap
    if (mprMontant + ceeMontant > plafondCumule) {
      // On réduit MPR en priorité (CEE est une estimation volatile)
      const nouveauMpr = Math.max(0, plafondCumule - ceeMontant)
      const reduction = mprMontant - nouveauMpr
      if (mprIdx >= 0 && reduction > 0) {
        aides[mprIdx].montant = Math.round(nouveauMpr)
        disclaimers.push(
          `Le cumul MaPrimeRénov' + CEE est plafonné à ${Math.round(
            cap * 100,
          )} % du coût TTC pour la tranche « ${tranche} » : MaPrimeRénov' a été réduit de ${Math.round(
            reduction,
          ).toLocaleString('fr-FR')} €.`,
        )
      }
    }
  }

  // ---- F) Totaux ----
  const totalAides = aides.reduce((s, a) => s + (a.montant || 0), 0)
  const resteACharge = Math.max(0, Math.round(input.coutTTC - totalAides))

  // ---- G) Éco-PTZ (info) ----
  const eco = plafondEcoPTZ(input.equipement, totalAides > 0)
  disclaimers.push(
    `Vous pouvez financer le reste à charge via ${eco.commentaire} (source : ${SOURCE_ECO_PTZ}).`,
  )

  // Disclaimer RFR
  disclaimers.push(
    "Revenu fiscal de référence à renseigner : celui de l'année N-1 (RFR 2024 pour une demande en 2026).",
  )

  return {
    tranche,
    coutTTC: input.coutTTC,
    aides,
    totalAides: Math.round(totalAides),
    resteACharge,
    disclaimers,
  }
}
