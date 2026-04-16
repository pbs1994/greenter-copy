import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { contactRequestTemplate } from '@/lib/email-templates'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@greenter.fr'
const FROM_EMAIL = process.env.FROM_EMAIL ? `Greenter <${process.env.FROM_EMAIL}>` : 'Greenter <contact@greenter.fr>'

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = requestCounts.get(ip)
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return false
  }
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

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

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    if (isRateLimited(ip)) {
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

    // Envoyer l'email au gérant
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: sanitizedEmail,
      subject: `Nouvelle demande de contact - ${sanitizeInput(name, 100)}`,
      html: contactRequestTemplate({
        name: sanitizeInput(name, 100),
        email: sanitizedEmail || 'Non renseigné',
        phone: sanitizeInput(phone, 20),
        service: sanitizeInput(service || '', 100),
        message: sanitizeInput(message || 'Demande de devis', 2000),
      }),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 })
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
