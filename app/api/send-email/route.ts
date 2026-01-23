import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, from, attachments } = await request.json()

    const { data, error } = await resend.emails.send({
      from: from || 'Greenter <contact@greenter.fr>', // Remplace par ton domaine vérifié
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      attachments: attachments || [],
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
