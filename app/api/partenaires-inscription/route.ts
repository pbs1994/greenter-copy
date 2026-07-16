import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
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
 * a lieu avant toute écriture dans auth.users.
 *
 * Création en DEUX temps, pas un simple signInWithOtp({ shouldCreateUser })
 * comme pour le login existant — Supabase envoie un template d'email
 * DIFFÉRENT selon que l'utilisateur est nouveau ou existant, même à travers
 * un appel identique à signInWithOtp : un tout nouvel utilisateur reçoit le
 * template "Confirm signup" (celui par défaut, non personnalisé, sans code —
 * observé en prod, voir la conversation qui a mené à ce correctif), alors
 * qu'un utilisateur déjà existant reçoit le template "Magic Link" (celui
 * personnalisé avec lien + code, utilisé par app/partenaires/login).
 * Pour obtenir systématiquement ce dernier :
 *   1. auth.admin.createUser({ email_confirm: true, user_metadata }) crée le
 *      compte directement (service-role, pas d'email envoyé par cet appel) —
 *      les métadonnées atterrissent dans raw_user_meta_data, recopiées dans
 *      profiles par le trigger on_agent_signup (supabase/partenaires-schema.sql).
 *   2. signInWithOtp({ email }) est alors appelé sur un email qui existe déjà
 *      → Supabase envoie le template Magic Link (avec code), pas Confirm signup.
 * Si l'email existe déjà (agent existant ou candidature déjà déposée),
 * createUser échoue silencieusement (ignoré) et on passe directement à
 * l'étape 2 — même comportement générique qu'avant, sans révéler si le
 * compte existait déjà.
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

    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    )

    // Étape 1 — crée le compte (si l'email n'existe pas déjà) avec les
    // métadonnées d'inscription ; n'envoie aucun email. Erreur ignorée (le
    // cas le plus courant est "email déjà enregistré", qu'on ne distingue
    // pas volontairement d'un succès pour ne rien révéler à l'appelant).
    const { error: createError } = await adminClient.auth.admin.createUser({
      email: sanitizedEmail,
      email_confirm: true,
      user_metadata: {
        full_name: sanitizedName,
        phone: sanitizedPhone,
        siret: siretCheck.snapshot!.siret,
        siret_verified: true,
        siret_check: siretCheck.snapshot,
        contract_accepted_at: new Date().toISOString(),
        contract_version: CONTRACT_VERSION,
      },
    })
    const isDuplicateEmail = createError?.message?.toLowerCase().includes('already') ?? false
    if (createError && !isDuplicateEmail) {
      console.error('[partenaires-inscription] createUser failed:', createError.message)
    }

    // Étape 2 — envoie le lien + code de connexion. L'email existe forcément
    // à ce stade (créé juste au-dessus, ou déjà existant) → toujours le
    // template Magic Link personnalisé, jamais "Confirm signup".
    const supabase = await createSupabaseServerActionClient()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const { error } = await supabase.auth.signInWithOtp({
      email: sanitizedEmail,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${siteUrl}/api/auth/callback?next=/partenaires`,
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
