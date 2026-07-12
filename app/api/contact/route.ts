import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { resend } from '@/lib/resend'
import { contactRequestTemplate } from '@/lib/email-templates'
import { isRateLimitedPerMinute } from '@/lib/rate-limit'
import { REFERRAL_COOKIE, resolveReferralCode } from '@/lib/referral'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@greenter.fr'
const FROM_EMAIL = process.env.FROM_EMAIL ? `Greenter <${process.env.FROM_EMAIL}>` : 'Greenter <contact@greenter.fr>'

/**
 * Sanitize user input: strip HTML tags and control characters
 */
function sanitizeInput(input: string, maxLength = 500): string {
  return input
    .replace(/[\r\n]+/g, ' ')     // Replace newlines (prevent header injection)
    .replace(/<[^>]*>/g, '')       // Strip HTML tags
    .replace(/[<>&"']/g, '')       // Remove dangerous characters
    .trim()
    .slice(0, maxLength)
}

/**
 * Phone numbers go into `tel:` HTML hrefs in the admin email. Restrict to
 * the strict set of characters a phone number can legally contain so that
 * no URL scheme or HTML attribute can be smuggled in via a stray
 * `javascript:` / quote / whitespace, even if `sanitizeInput` upstream
 * changes one day.
 */
function sanitizePhone(input: string, maxLength = 20): string {
  return input.replace(/[^+\d\s().-]/g, '').trim().slice(0, maxLength)
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'contact', 5)) {
      return NextResponse.json({ error: 'Trop de requêtes, veuillez réessayer plus tard' }, { status: 429 })
    }

    const { name, email, phone, service, message } = await request.json()

    // Validation basique - email optionnel pour le formulaire simplifié
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Le nom et le téléphone sont obligatoires' },
        { status: 400 }
      )
    }

    // Validate string types
    if (typeof name !== 'string' || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Format invalide' }, { status: 400 })
    }

    // Valider le format email et rejeter les tentatives d'injection d'en-têtes
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const sanitizedEmail = email && typeof email === 'string'
      && emailRegex.test(email) && !email.includes('\n') && !email.includes('\r')
      ? email.slice(0, 254)
      : undefined

    // Lead venant d'un lien de parrainage agent ? Le cookie ne contient que
    // le code brut (posé par middleware.ts sur n'importe quelle page) — on
    // ne le résout en agent que maintenant, seulement si nécessaire.
    const referralCode = request.cookies.get(REFERRAL_COOKIE)?.value
    const agent = await resolveReferralCode(referralCode)

    const sanitizedName = sanitizeInput(name, 100)
    const sanitizedServiceLabel = sanitizeInput(service || '', 100)
    const sanitizedMessage = sanitizeInput(message || 'Demande de devis', 2000)
    const sanitizedPhoneValue = sanitizePhone(phone)

    // Envoyer l'email au gérant
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: sanitizedEmail,
      subject: `Nouvelle demande de contact - ${sanitizedName}`,
      html: contactRequestTemplate({
        name: sanitizedName,
        email: sanitizedEmail || 'Non renseigné',
        phone: sanitizedPhoneValue,
        service: sanitizedServiceLabel,
        message: sanitizedMessage,
        agentName: agent?.full_name ? sanitizeInput(agent.full_name, 100) : undefined,
      }),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 })
    }

    // Si le lead vient d'un agent, créer aussi son dossier dans l'Espace
    // Partenaires (sinon l'admin serait "au courant" par email mais l'agent
    // ne verrait jamais rien apparaître dans son propre pipeline).
    if (agent) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false, autoRefreshToken: false } }
      )
      const { error: dealError } = await supabase.from('deals').insert({
        agent_id: agent.id,
        first_touch_agent_id: agent.id,
        client_name: sanitizedName,
        client_phone: sanitizedPhoneValue,
        client_email: sanitizedEmail || null,
        product: sanitizedServiceLabel || null,
        deal_type: 'devis',
        status: 'nouveau',
        source: 'agent_link_contact_form',
        notes: sanitizedMessage,
      })
      if (dealError) {
        // Ne pas faire échouer la requête pour le visiteur — l'email admin
        // est déjà parti, c'est le canal de secours si ce insert rate.
        console.error('Contact form: échec création dossier agent:', dealError)
      }
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
