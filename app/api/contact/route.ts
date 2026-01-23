import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { contactRequestTemplate } from '@/lib/email-templates'

const ADMIN_EMAIL = 'contact@greenter.fr'
const FROM_EMAIL = 'Greenter <contact@greenter.fr>'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, message } = await request.json()

    // Validation basique
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Envoyer l'email au gérant
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `📩 Nouvelle demande de contact - ${name}`,
      html: contactRequestTemplate({ name, email, phone, service, message }),
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
