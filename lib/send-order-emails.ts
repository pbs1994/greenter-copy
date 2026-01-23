import { resend } from './resend'
import { orderConfirmationTemplate, orderNotificationTemplate, OrderData } from './email-templates'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@greenter.fr'
const FROM_EMAIL = process.env.FROM_EMAIL ? `Greenter <${process.env.FROM_EMAIL}>` : 'Greenter <contact@greenter.fr>'

interface SendOrderEmailsParams {
  order: OrderData
  invoicePdf: Buffer | Uint8Array
}

/**
 * Envoie les 2 emails après une commande :
 * 1. Email de confirmation au client (avec facture)
 * 2. Email de notification à l'admin (avec facture)
 */
export async function sendOrderEmails({ order, invoicePdf }: SendOrderEmailsParams) {
  const invoiceFilename = `facture-${order.orderNumber}.pdf`
  
  // Convertir le PDF en base64 pour Resend
  const pdfBase64 = Buffer.from(invoicePdf).toString('base64')

  const attachments = [
    {
      filename: invoiceFilename,
      content: pdfBase64,
    },
  ]

  try {
    // 1. Email de confirmation au client
    const clientEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customerEmail,
      subject: `Confirmation de commande ${order.orderNumber} - Greenter`,
      html: orderConfirmationTemplate(order),
      attachments,
    })

    if (clientEmailResult.error) {
      console.error('Erreur envoi email client:', clientEmailResult.error)
    }

    // 2. Email de notification admin
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🎉 Nouvelle commande ${order.orderNumber} - ${order.amount.toLocaleString('fr-FR')} €`,
      html: orderNotificationTemplate(order),
      attachments,
    })

    if (adminEmailResult.error) {
      console.error('Erreur envoi email admin:', adminEmailResult.error)
    }

    return {
      success: true,
      clientEmail: clientEmailResult.data,
      adminEmail: adminEmailResult.data,
    }
  } catch (error) {
    console.error('Erreur envoi emails commande:', error)
    return {
      success: false,
      error,
    }
  }
}
