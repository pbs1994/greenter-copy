import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { orderConfirmationTemplate, orderNotificationTemplate, type OrderData } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@greenter.fr'
const FROM_EMAIL = process.env.FROM_EMAIL || 'commandes@greenter.fr'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderData, sessionId } = body as { orderData: OrderData; sessionId: string }

    if (!orderData || !sessionId) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    // Récupérer le PDF de la facture
    let attachments: { filename: string; content: Buffer }[] = []
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const pdfResponse = await fetch(`${baseUrl}/api/invoice/${sessionId}`)
      
      if (pdfResponse.ok) {
        const pdfBuffer = await pdfResponse.arrayBuffer()
        attachments = [{
          filename: `facture-${orderData.orderNumber}.pdf`,
          content: Buffer.from(pdfBuffer),
        }]
      }
    } catch (pdfError) {
      console.error('Error fetching PDF:', pdfError)
      // Continue sans pièce jointe si erreur
    }

    // 1. Email de confirmation au client
    const clientEmail = await resend.emails.send({
      from: `Greenter <${FROM_EMAIL}>`,
      to: orderData.customerEmail,
      subject: `Confirmation de commande ${orderData.orderNumber} - Greenter`,
      html: orderConfirmationTemplate(orderData),
      attachments,
    })

    // 2. Email de notification à l'admin
    const adminEmail = await resend.emails.send({
      from: `Greenter <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `💰 Nouvelle commande ${orderData.orderNumber} - ${orderData.amount.toLocaleString('fr-FR')} €`,
      html: orderNotificationTemplate(orderData),
      attachments,
    })

    return NextResponse.json({ 
      success: true, 
      clientEmailId: clientEmail.data?.id,
      adminEmailId: adminEmail.data?.id,
    })

  } catch (error) {
    console.error('Error sending emails:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'envoi des emails' }, { status: 500 })
  }
}
