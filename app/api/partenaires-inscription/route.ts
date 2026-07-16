import { NextRequest, NextResponse } from 'next/server'
import { isRateLimitedPerMinute } from '@/lib/rate-limit'
import { verifySiret } from '@/lib/siret-check'
import { CONTRACT_VERSION } from '@/lib/partenaires-contract'
import { createSupabaseServerActionClient } from '@/lib/supabase-server'

/**
 * Inscription publique à l'Espace Partenaires (docs/agent-network-plan.md
 * section 8). Route Handler plutôt que Server Action — contrairement aux
 * écrits admin de /partenaires (100% Server Actions, authentifiés), ce
 * formulaire est public et non authentifié, donc exposé au spam au même
 * titre que app/api/contact/route.ts, dont ce fichier reprend le patron
 * (rate-limit, sanitisation) plutôt que celui des Server Actions.
 *
 * Ne crée AUCUN compte si le SIRET n'est pas vérifié actif : la vérification
 * a lieu avant tout appel à signInWithOtp. Si elle passe, les infos
 * d'inscription (nom, SIRET, instantané de vérification, acceptation du
 * contrat) partent dans `options.data`, qui atterrit dans
 * auth.users.raw_user_meta_data — recopié dans profiles par le trigger
 * on_agent_signup (supabase/partenaires-schema.sql). Si l'email existe déjà
 * (agent existant ou candidature déjà déposée), signInWithOtp se contente
 * d'envoyer un email de connexion, sans dupliquer ni écraser le profil (le
 * trigger ne se déclenche que sur un INSERT dans auth.users).
 */

function sanitizeInput(input: string, maxLength = 200): string {
  return input
    .replace(/[\r\n]+/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>&"']/g, '')
    .trim()
    .slice(0, maxLength)
}

function sanitizePhone(input: string, maxLength = 20): string {
  return input.replace(/[^+\d\s().-]/g, '').trim().slice(0, maxLength)
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const GENERIC_MESSAGE =
  "Si votre candidature est recevable, un email contenant un lien et un code de vérification vous a été envoyé."

export async function POST(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'partenaires-inscription', 5)) {
      return NextResponse.json({ ok: false, message: 'Trop de tentatives, veuillez réessayer plus tard.' }, { status: 429 })
    }

    const body = await request.json()
    const { full_name, email, phone, siret, contract_accepted, website } = body

    // Honeypot — champ caché côté formulaire, un humain ne le remplit jamais.
    // Vérifié ici côté serveur (contrairement au honeypot du formulaire de
    // contact, qui n'est vérifié que côté client) : on renvoie exactement la
    // même réponse générique de succès, sans rien créer, pour ne donner
    // aucun indice à un bot.
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ ok: true, message: GENERIC_MESSAGE })
    }

    if (typeof full_name !== 'string' || typeof email !== 'string' || typeof phone !== 'string' || typeof siret !== 'string') {
      return NextResponse.json({ ok: false, message: 'Formulaire incomplet.' }, { status: 400 })
    }

    if (!contract_accepted) {
      return NextResponse.json({ ok: false, message: "Vous devez accepter le contrat d'apporteur d'affaires." }, { status: 400 })
    }

    const sanitizedEmail = email.trim().toLowerCase()
    if (!EMAIL_REGEX.test(sanitizedEmail) || sanitizedEmail.includes('\n') || sanitizedEmail.includes('\r')) {
      return NextResponse.json({ ok: false, message: 'Adresse email invalide.' }, { status: 400 })
    }

    const sanitizedName = sanitizeInput(full_name, 100)
    if (sanitizedName.length < 2) {
      return NextResponse.json({ ok: false, message: 'Nom complet invalide.' }, { status: 400 })
    }

    const sanitizedPhone = sanitizePhone(phone, 20)
    if (sanitizedPhone.length < 6) {
      return NextResponse.json({ ok: false, message: 'Numéro de téléphone invalide.' }, { status: 400 })
    }

    // Vérification du statut juridique — avant tout, aucun compte n'est créé
    // si elle échoue. Voir lib/siret-check.ts pour le détail (seul le statut
    // actif/fermé est un gate dur, la catégorie juridique est juste
    // remontée à l'admin pour information).
    const siretCheck = await verifySiret(siret)
    if (!siretCheck.valid) {
      return NextResponse.json({ ok: false, message: siretCheck.error || 'SIRET invalide.' }, { status: 400 })
    }

    const supabase = await createSupabaseServerActionClient()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const { error } = await supabase.auth.signInWithOtp({
      email: sanitizedEmail,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${siteUrl}/api/auth/callback?next=/partenaires`,
        data: {
          full_name: sanitizedName,
          phone: sanitizedPhone,
          siret: siretCheck.snapshot!.siret,
          siret_verified: true,
          siret_check: siretCheck.snapshot,
          contract_accepted_at: new Date().toISOString(),
          contract_version: CONTRACT_VERSION,
        },
      },
    })

    if (error) {
      console.error('[partenaires-inscription] signInWithOtp failed:', error.message)
    }

    return NextResponse.json({ ok: true, message: GENERIC_MESSAGE })
  } catch (error) {
    console.error('[partenaires-inscription] Erreur inattendue:', error)
    return NextResponse.json({ ok: false, message: 'Une erreur est survenue, veuillez réessayer.' }, { status: 500 })
  }
}
