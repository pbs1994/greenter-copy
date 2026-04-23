// =============================================================================
// Orchestration du calcul complet des aides MaPrimeRénov' 2026
// Supporte un ou plusieurs équipements simultanés (parcours par geste).
// =============================================================================

import type {
  SimulationInput,
  SimulationResult,
  AideLigne,
  EquipementInput,
} from './types'
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
import { plafondEcoPTZ, estEligibleEcoPTZ, SOURCE_ECO_PTZ } from './eco-ptz'

function coutHT(coutTTC: number, taux: number): number {
  return coutTTC / (1 + taux)
}

/**
 * Nombre de gestes comptant pour le bouquet éco-PTZ.
 * Exclut les équipements non éligibles (audit, PAC air-air, …)
 * Note : on n'exige PAS un coût TTC renseigné — l'éco-PTZ peut être
 * envisagé même sans devis encore connu.
 */
function nombreGestesEcoPTZ(equipements: EquipementInput[]): number {
  return equipements.filter((e) => estEligibleEcoPTZ(e.equipement)).length
}

export function calculate(input: SimulationInput): SimulationResult {
  const disclaimers: string[] = []
  const aides: AideLigne[] = []

  if (!input.equipements || input.equipements.length === 0) {
    throw new Error("Aucun équipement sélectionné.")
  }

  // Tranche du foyer (inchangée quel que soit le nombre d'équipements)
  const tranche = trancheFromRFR(
    input.revenuFiscal,
    input.foyer.personnes,
    input.foyer.zone,
  )

  // Coût TTC global = somme des équipements
  const coutTTCGlobal = input.equipements.reduce((s, e) => s + Math.max(0, e.coutTTC), 0)

  // ------------------------------------------------------------------
  // A) MaPrimeRénov' parcours par geste — un calcul par équipement
  // ------------------------------------------------------------------
  for (const eq of input.equipements) {
    const info = MPR_GESTE_2026[eq.equipement]
    const taux = tauxTVA(eq.equipement)
    const ht = coutHT(eq.coutTTC, taux)
    const surfaceOuQte = info.unite === 'eur_m2' ? (eq.surfaceM2 ?? 0) : 1

    const r = mprGeste(eq.equipement, tranche, ht, surfaceOuQte)
    if (r.eligible && r.montant > 0) {
      aides.push({
        libelle: `MaPrimeRénov' — ${info.libelle}`,
        montant: r.montant,
        source: SOURCE_MPR_GESTE,
        equipement: eq.equipement,
      })
    } else if (r.note || info.note) {
      aides.push({
        libelle: `MaPrimeRénov' — ${info.libelle}`,
        montant: 0,
        source: SOURCE_MPR_GESTE,
        nonApplicable:
          r.note ||
          info.note ||
          (tranche === 'rose'
            ? "Non éligible en parcours par geste pour la tranche Rose."
            : "Non éligible."),
        equipement: eq.equipement,
      })
    }
  }

  // ------------------------------------------------------------------
  // B) Prime EDF — UNE SEULE pour le projet, si au moins un équipement éligible
  // ------------------------------------------------------------------
  const aUneEquipementEDF = input.equipements.some((e) =>
    primeEDF({
      tranche,
      equipement: e.equipement,
      chauffageActuel: input.chauffageActuel,
    }).eligible,
  )
  if (aUneEquipementEDF) {
    aides.push({
      libelle: "Prime EDF « Je passe à l'électrique »",
      montant: 1000,
      source: SOURCE_PRIME_EDF,
    })
    disclaimers.push(
      "La prime EDF est limitée à 80 000 dossiers (premier arrivé, premier servi). Date limite de dépôt : 7 avril 2027.",
    )
  } else {
    // Raison la plus probable (première non-éligibilité rencontrée)
    const eq0 = input.equipements[0]
    const edf0 = primeEDF({
      tranche,
      equipement: eq0.equipement,
      chauffageActuel: input.chauffageActuel,
    })
    if (edf0.raison) {
      aides.push({
        libelle: "Prime EDF « Je passe à l'électrique »",
        montant: 0,
        source: SOURCE_PRIME_EDF,
        nonApplicable: edf0.raison,
      })
    }
  }

  // ------------------------------------------------------------------
  // C) Coup de pouce CEE — estimation par équipement éligible
  // ------------------------------------------------------------------
  for (const eq of input.equipements) {
    const median = estimationCEEMedian(
      eq.equipement,
      tranche,
      input.chauffageActuel,
      input.surfaceLogementM2,
    )
    const range = estimationCEEMontant(
      eq.equipement,
      tranche,
      input.chauffageActuel,
      input.surfaceLogementM2,
    )
    if (median != null && range) {
      aides.push({
        libelle: `Coup de pouce CEE ×5 — ${MPR_GESTE_2026[eq.equipement].libelle}`,
        montant: median,
        source: SOURCE_CEE,
        estimation: true,
        equipement: eq.equipement,
      })
      disclaimers.push(
        `Fourchette CEE pour ${MPR_GESTE_2026[eq.equipement].libelle} : entre ${range.min.toLocaleString(
          'fr-FR',
        )} € et ${range.max.toLocaleString('fr-FR')} €. Montant exact selon obligé CEE.`,
      )
    }
  }

  // ------------------------------------------------------------------
  // D) TVA — économie par équipement
  // ------------------------------------------------------------------
  for (const eq of input.equipements) {
    const taux = tauxTVA(eq.equipement)
    const eco = economieTVA(eq.equipement, eq.coutTTC)
    if (eco > 0) {
      aides.push({
        libelle: `TVA réduite à ${(taux * 100).toFixed(1).replace('.', ',')} % — ${MPR_GESTE_2026[eq.equipement].libelle}`,
        montant: eco,
        source: SOURCE_TVA,
        equipement: eq.equipement,
      })
    }
  }

  // ------------------------------------------------------------------
  // E) Écrêtement MPR + CEE global
  // ------------------------------------------------------------------
  const cap = ECRETEMENT_GESTE[tranche]
  if (cap != null) {
    const mprTotal = aides
      .filter((a) => a.libelle.startsWith("MaPrimeRénov'"))
      .reduce((s, a) => s + a.montant, 0)
    const ceeTotal = aides
      .filter((a) => a.libelle.startsWith('Coup de pouce'))
      .reduce((s, a) => s + a.montant, 0)
    const plafondCumule = coutTTCGlobal * cap
    const reduction = mprTotal + ceeTotal - plafondCumule
    if (reduction > 0 && mprTotal > 0) {
      // On réduit MPR proportionnellement au poids de chaque ligne MPR
      const ratio = Math.max(0, 1 - reduction / mprTotal)
      for (const a of aides) {
        if (a.libelle.startsWith("MaPrimeRénov'") && a.montant > 0) {
          a.montant = Math.round(a.montant * ratio)
        }
      }
      disclaimers.push(
        `Cumul MaPrimeRénov' + CEE plafonné à ${Math.round(
          cap * 100,
        )} % du coût total TTC (tranche « ${tranche} ») — MaPrimeRénov' a été réduit de ${Math.round(
          reduction,
        ).toLocaleString('fr-FR')} €.`,
      )
    }
  }

  // ------------------------------------------------------------------
  // F) Totaux + éco-PTZ
  // ------------------------------------------------------------------
  const totalAides = aides.reduce((s, a) => s + (a.montant || 0), 0)
  const resteACharge = Math.max(0, Math.round(coutTTCGlobal - totalAides))

  // L'éco-PTZ "couplé MPR" exige que MaPrimeRénov' soit effectivement perçue
  // (pas juste qu'on ait des CEE/TVA/EDF). On teste donc spécifiquement
  // le total des lignes MPR > 0.
  const mprTotalCalc = aides
    .filter((a) => a.libelle.startsWith("MaPrimeRénov'"))
    .reduce((s, a) => s + a.montant, 0)
  const nbGestes = nombreGestesEcoPTZ(input.equipements)
  const coupleAvecMPR = mprTotalCalc > 0
  const ptz = plafondEcoPTZ(nbGestes, coupleAvecMPR)

  // Disclaimer si certains équipements sélectionnés ne comptent pas pour l'éco-PTZ
  const exclus = input.equipements
    .map((e) => e.equipement)
    .filter((eq) => !estEligibleEcoPTZ(eq))
  if (exclus.length > 0) {
    disclaimers.push(
      `Pour le calcul du bouquet éco-PTZ, ${exclus.length === 1 ? 'cet équipement n\'est pas éligible' : 'ces équipements ne sont pas éligibles'} et ${exclus.length === 1 ? 'a' : 'ont'} été exclu${exclus.length === 1 ? '' : 's'} : ${exclus.map((e) => MPR_GESTE_2026[e]?.libelle ?? e).join(', ')}.`,
    )
  }

  if (ptz.plafond > 0) {
    disclaimers.push(`Vous pouvez financer le reste à charge via l'${ptz.commentaire} (source : ${SOURCE_ECO_PTZ}).`)
  } else {
    disclaimers.push(ptz.commentaire)
  }

  disclaimers.push(
    "Revenu fiscal de référence à renseigner : celui de l'année N-1 (RFR 2024 pour une demande en 2026).",
  )

  return {
    tranche,
    coutTTC: Math.round(coutTTCGlobal),
    aides,
    totalAides: Math.round(totalAides),
    resteACharge,
    disclaimers,
    ecoPTZ: {
      plafond: ptz.plafond,
      dureeMaxAns: ptz.dureeMaxAns,
      commentaire: ptz.commentaire,
    },
  }
}
