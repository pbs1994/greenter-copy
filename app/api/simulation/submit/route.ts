import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import type { SimulationResult, Tranche } from '@/lib/maprimerenov-2026'
import { LIBELLE_TRANCHE, MPR_GESTE_2026 } from '@/lib/maprimerenov-2026'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@greenter.fr'
const FROM_EMAIL = process.env.FROM_EMAIL
  ? `Greenter <${process.env.FROM_EMAIL}>`
  : 'Greenter <contact@greenter.fr>'

// ---- Rate limiting (même pattern que /api/contact) --------------------------
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

function sanitize(input: unknown, maxLength = 500): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[\r\n]+/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>&"']/g, '')
    .trim()
    .slice(0, maxLength)
}

// -----------------------------------------------------------------------------

interface SimulationPayload {
  contact: {
    name: string
    email: string
    phone: string
    address?: string
    message?: string
  }
  simulation: {
    foyer: { personnes: number; zone: 'idf' | 'hors_idf' }
    revenuFiscal: number
    chauffageActuel: string
    surfaceLogementM2: number
    equipements: Array<{ equipement: string; coutTTC: number; surfaceM2?: number }>
  }
  result: SimulationResult
}

const fmt = (n: number) => n.toLocaleString('fr-FR')

function emailHTML(payload: SimulationPayload): string {
  const { contact, simulation, result } = payload
  const tranche = result.tranche as Tranche
  const aidesLines = result.aides
    .filter((a) => a.montant > 0)
    .map(
      (a) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111;">${a.libelle}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#059669;font-weight:600;text-align:right;">${fmt(a.montant)} €</td>
        </tr>`,
    )
    .join('')

  const equipementsLines = simulation.equipements
    .map((e) => {
      const label = MPR_GESTE_2026[e.equipement as keyof typeof MPR_GESTE_2026]?.libelle ?? e.equipement
      const extra = []
      if (e.coutTTC > 0) extra.push(`${fmt(e.coutTTC)} € TTC`)
      if (e.surfaceM2) extra.push(`${e.surfaceM2} m²`)
      const extraStr = extra.length ? ` (${extra.join(' · ')})` : ''
      return `<li>${label}${extraStr}</li>`
    })
    .join('')

  const hasDevis = simulation.equipements.some((e) => e.coutTTC > 0)

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;background:#fff;">
    <div style="background:linear-gradient(135deg,#0f7a3d 0%,#1a9e52 100%);padding:24px;color:#fff;">
      <h1 style="margin:0;font-size:22px;">🎯 Nouvelle demande de devis — simulateur</h1>
      <p style="margin:4px 0 0;opacity:.9;font-size:14px;">
        ${contact.name} a rempli le simulateur MaPrimeRénov' 2026
      </p>
    </div>

    <div style="padding:24px;">
      <!-- Contact -->
      <h2 style="font-size:16px;color:#0f7a3d;margin:0 0 12px;border-bottom:2px solid #0f7a3d;padding-bottom:6px;">Contact</h2>
      <table style="width:100%;font-size:14px;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#6b7280;width:120px;">Nom</td><td style="font-weight:600;">${contact.name}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td><a href="mailto:${contact.email}" style="color:#0f7a3d;">${contact.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Téléphone</td><td><a href="tel:${contact.phone}" style="color:#0f7a3d;">${contact.phone}</a></td></tr>
        ${contact.address ? `<tr><td style="padding:6px 0;color:#6b7280;">Adresse</td><td>${contact.address}</td></tr>` : ''}
      </table>

      ${
        contact.message
          ? `<div style="padding:12px;background:#f3f4f6;border-radius:8px;margin-bottom:24px;">
              <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px;">Message</div>
              <div style="font-size:14px;color:#111;">${contact.message.replace(/\n/g, '<br>')}</div>
            </div>`
          : ''
      }

      <!-- Simulation -->
      <h2 style="font-size:16px;color:#0f7a3d;margin:0 0 12px;border-bottom:2px solid #0f7a3d;padding-bottom:6px;">Simulation</h2>
      <table style="width:100%;font-size:14px;margin-bottom:16px;">
        <tr><td style="padding:6px 0;color:#6b7280;width:160px;">Foyer</td><td>${simulation.foyer.personnes} personne${simulation.foyer.personnes > 1 ? 's' : ''} — ${simulation.foyer.zone === 'idf' ? 'Île-de-France' : 'Hors IdF'}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Revenu fiscal</td><td>${fmt(simulation.revenuFiscal)} €</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Tranche MPR</td><td style="font-weight:600;">${LIBELLE_TRANCHE[tranche]}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Chauffage actuel</td><td>${simulation.chauffageActuel}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Surface logement</td><td>${simulation.surfaceLogementM2} m²</td></tr>
      </table>

      <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Équipements souhaités</div>
      <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#111;">
        ${equipementsLines}
      </ul>

      <!-- Résultat -->
      <h2 style="font-size:16px;color:#0f7a3d;margin:0 0 12px;border-bottom:2px solid #0f7a3d;padding-bottom:6px;">Aides simulées</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px;">
        ${aidesLines}
      </table>

      <div style="background:#ecfdf5;border-left:4px solid #0f7a3d;padding:12px 16px;border-radius:4px;">
        <div style="font-size:12px;color:#6b7280;">Total aides mobilisables</div>
        <div style="font-size:24px;font-weight:700;color:#0f7a3d;">${fmt(result.totalAides)} €</div>
        ${
          hasDevis
            ? `<div style="margin-top:8px;font-size:13px;color:#374151;">
                Coût TTC total : <strong>${fmt(result.coutTTC)} €</strong> — Reste à charge : <strong>${fmt(result.resteACharge)} €</strong>
              </div>`
            : `<div style="margin-top:8px;font-size:13px;color:#6b7280;font-style:italic;">
                (Coût du devis non renseigné — à estimer lors du RDV)
              </div>`
        }
      </div>
    </div>

    <div style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
      Demande envoyée via le simulateur MaPrimeRénov' 2026 de greenter.fr. Calcul basé sur le Guide ANAH
      « Les aides financières en 2026 ».
    </div>
  </div>
  `
}

// -----------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes, veuillez réessayer plus tard' },
        { status: 429 },
      )
    }

    const body = (await request.json()) as SimulationPayload

    // Validation minimale
    const { contact, simulation, result } = body || ({} as SimulationPayload)
    if (!contact?.name || !contact?.email || !contact?.phone) {
      return NextResponse.json(
        { error: 'Nom, email et téléphone sont obligatoires' },
        { status: 400 },
      )
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contact.email) || contact.email.includes('\n') || contact.email.includes('\r')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    if (!simulation || !result) {
      return NextResponse.json({ error: 'Données de simulation manquantes' }, { status: 400 })
    }

    // Sanitisation
    const safeContact = {
      name: sanitize(contact.name, 100),
      email: contact.email.slice(0, 254),
      phone: sanitize(contact.phone, 20),
      address: sanitize(contact.address ?? '', 200),
      message: sanitize(contact.message ?? '', 2000),
    }

    const html = emailHTML({ contact: safeContact, simulation, result })

    // Envoi email admin
    const { error: adminError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: safeContact.email,
      subject: `🎯 Simulation MaPrimeRénov' — ${safeContact.name} — ${fmt(result.totalAides)} € d'aides`,
      html,
    })

    if (adminError) {
      console.error('Resend admin error:', adminError)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 },
      )
    }

    // Email de confirmation utilisateur (optionnel, échec non bloquant)
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: safeContact.email,
        subject: "Votre simulation MaPrimeRénov' — Greenter vous recontacte",
        html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#0f7a3d 0%,#1a9e52 100%);padding:24px;color:#fff;">
            <h1 style="margin:0;font-size:22px;">Merci ${safeContact.name} 👋</h1>
          </div>
          <div style="padding:24px;color:#111;">
            <p>Nous avons bien reçu votre simulation.</p>
            <p style="font-size:16px;"><strong>Aides mobilisables estimées : ${fmt(result.totalAides)} €</strong></p>
            <p>Un de nos techniciens certifiés RGE QualiPAC vous contactera sous <strong>48 h ouvrées</strong>
            pour affiner le chiffrage et organiser une visite technique gratuite.</p>
            <p style="margin-top:24px;">Pour nous joindre d'ici là :</p>
            <ul>
              <li>📞 07 66 97 50 99</li>
              <li>✉️ <a href="mailto:contact@greenter.fr" style="color:#0f7a3d;">contact@greenter.fr</a></li>
            </ul>
            <p style="margin-top:24px;font-size:12px;color:#6b7280;">Greenter — Installateur RGE QualiPAC en Île-de-France</p>
          </div>
        </div>
        `,
      })
    } catch {
      // ignorer échec email confirmation
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Simulation submit error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
