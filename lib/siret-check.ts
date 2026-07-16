// =============================================================================
// Vérification automatique du statut juridique d'un agent — API Recherche
// d'Entreprises (recherche-entreprises.api.gouv.fr)
// =============================================================================
//
// API publique du gouvernement français, gratuite, sans clé ni OAuth
// (contrairement à l'API Sirene directe de l'INSEE) — appelée uniquement
// côté serveur (jamais depuis le client) par le Route Handler d'inscription
// avant toute création de compte.
//
// Documentation : https://api.gouv.fr/documentation/api-recherche-entreprises

const API_URL = "https://recherche-entreprises.api.gouv.fr/search"

interface RechercheEntreprisesEtablissement {
  siret: string
  etat_administratif?: string
}

interface RechercheEntreprisesResult {
  siren: string
  siret: string
  nom_complet?: string
  nom_raison_sociale?: string
  nature_juridique?: string
  etat_administratif?: string
  siege?: RechercheEntreprisesEtablissement
  matching_etablissements?: RechercheEntreprisesEtablissement[]
}

interface RechercheEntreprisesResponse {
  results: RechercheEntreprisesResult[]
}

export interface SiretSnapshot {
  siret: string
  siren: string
  denomination: string
  etatAdministratif: string
  natureJuridique: string
  active: boolean
  checkedAt: string
}

export interface SiretCheckResult {
  valid: boolean
  snapshot: SiretSnapshot | null
  error?: string
}

/**
 * Vérifie qu'un SIRET existe et correspond à un établissement actif.
 *
 * Ne bloque QUE sur le statut actif/fermé (`etat_administratif === "A"`) —
 * la catégorie juridique (auto-entrepreneur, SARL, etc.) est renvoyée dans
 * le snapshot pour information à l'admin, mais ne fait pas l'objet d'un
 * rejet automatique : la classification est trop fine pour être fiable en
 * gate dur (voir docs/agent-network-plan.md section 8).
 */
export async function verifySiret(siret: string): Promise<SiretCheckResult> {
  const cleaned = siret.replace(/\s/g, "")

  if (!/^\d{14}$/.test(cleaned)) {
    return { valid: false, snapshot: null, error: "Le SIRET doit comporter 14 chiffres." }
  }

  try {
    const response = await fetch(`${API_URL}?q=${cleaned}&per_page=1`, {
      headers: { Accept: "application/json" },
    })

    if (!response.ok) {
      console.error(`[siret-check] Erreur API recherche-entreprises: ${response.status} ${response.statusText}`)
      return { valid: false, snapshot: null, error: "Impossible de vérifier ce SIRET pour le moment, réessayez plus tard." }
    }

    const data: RechercheEntreprisesResponse = await response.json()
    const result = (data.results || [])[0]

    if (!result) {
      return { valid: false, snapshot: null, error: "Aucune entreprise ne correspond à ce SIRET." }
    }

    // Le SIRET recherché peut être un établissement secondaire : on préfère
    // l'etat_administratif de l'établissement exactement matché (siège ou
    // matching_etablissements) à celui, plus général, de l'entreprise.
    const etablissement =
      result.siege?.siret === cleaned
        ? result.siege
        : result.matching_etablissements?.find((e) => e.siret === cleaned) || result.siege

    const etatAdministratif = etablissement?.etat_administratif || result.etat_administratif || "inconnu"
    const active = etatAdministratif === "A"

    const snapshot: SiretSnapshot = {
      siret: cleaned,
      siren: result.siren,
      denomination: result.nom_complet || result.nom_raison_sociale || "—",
      etatAdministratif,
      natureJuridique: result.nature_juridique || "—",
      active,
      checkedAt: new Date().toISOString(),
    }

    if (!active) {
      return { valid: false, snapshot, error: "Cette entreprise est enregistrée comme fermée (SIRET inactif)." }
    }

    return { valid: true, snapshot }
  } catch (error) {
    console.error("[siret-check] Erreur lors de l'appel API:", error)
    return { valid: false, snapshot: null, error: "Impossible de vérifier ce SIRET pour le moment, réessayez plus tard." }
  }
}
