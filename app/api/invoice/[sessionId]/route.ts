import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

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

// Formater un nombre en prix
function formatPrice(value: number): string {
  return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// Charger le logo
let logoBytes: Uint8Array | null = null
try {
  const logoPath = path.join(process.cwd(), 'public', 'logo.png')
  logoBytes = fs.readFileSync(logoPath)
} catch {
  console.warn('Logo not found')
}

// Couleurs
const colors = {
  primary: rgb(0.08, 0.33, 0.18),
  primaryDark: rgb(0.05, 0.25, 0.12),
  secondary: rgb(0.05, 0.58, 0.53),
  dark: rgb(0.12, 0.16, 0.21),
  medium: rgb(0.42, 0.45, 0.50),
  light: rgb(0.61, 0.64, 0.66),
  success: rgb(0.09, 0.64, 0.29),
  successBg: rgb(0.86, 0.99, 0.91),
  white: rgb(1, 1, 1),
  lightGray: rgb(0.97, 0.97, 0.98),
  greenLight: rgb(0.94, 0.99, 0.96),
  border: rgb(0.90, 0.91, 0.92),
  accent: rgb(0.73, 0.97, 0.83),
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
    }

    const { sessionId } = await params

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID manquant' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    })

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Paiement non confirmé' }, { status: 404 })
    }

    // Données
    const invoiceNumber = `FAC-${new Date().getFullYear()}-${sessionId.slice(-6).toUpperCase()}`
    const orderNumber = `GRT-${sessionId.slice(-8).toUpperCase()}`
    const orderDate = new Date(session.created * 1000)
    const formattedDate = orderDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).replace(/\u202f/g, ' ')

    const totalTTC = (session.amount_total || 0) / 100
    const tauxTVA = 0.10
    const totalHT = totalTTC / (1 + tauxTVA)
    const montantTVA = totalTTC - totalHT

    const lineItem = session.line_items?.data[0]
    const product = lineItem?.price?.product as Stripe.Product | undefined
    const productName = product?.name || 'Produit'
    const quantity = lineItem?.quantity || 1
    const unitPriceHT = totalHT / quantity

    const customer = session.customer_details
    const addr = customer?.address

    // Créer le PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842])
    const { width, height } = page.getSize()

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // ===== HEADER PREMIUM =====
    // Fond principal
    page.drawRectangle({
      x: 0, y: height - 100,
      width: width, height: 100,
      color: colors.primary,
    })

    // Bande accent
    page.drawRectangle({
      x: 0, y: height - 105,
      width: width, height: 5,
      color: colors.secondary,
    })

    // Logo
    if (logoBytes) {
      try {
        const logoImage = await pdfDoc.embedPng(logoBytes)
        page.drawImage(logoImage, {
          x: 45,
          y: height - 75,
          width: 140,
          height: 46,
        })
      } catch {
        page.drawText('GREENTER', { x: 45, y: height - 55, size: 26, font: fontBold, color: colors.white })
      }
    } else {
      page.drawText('GREENTER', { x: 45, y: height - 55, size: 26, font: fontBold, color: colors.white })
    }

    page.drawText('Renovation energetique', { x: 45, y: height - 92, size: 9, font: fontRegular, color: colors.accent })

    // Titre FACTURE
    page.drawText('FACTURE', { x: width - 145, y: height - 40, size: 28, font: fontBold, color: colors.white })
    page.drawText(invoiceNumber, { x: width - 145, y: height - 58, size: 11, font: fontRegular, color: colors.white })
    page.drawText(`Commande: ${orderNumber}`, { x: width - 145, y: height - 74, size: 9, font: fontRegular, color: colors.accent })
    page.drawText(`Date: ${formattedDate}`, { x: width - 145, y: height - 88, size: 9, font: fontRegular, color: colors.accent })

    // ===== INFO BOXES =====
    const boxY = height - 230
    const boxHeight = 105
    const boxWidth = 250

    // Box Emetteur
    page.drawRectangle({ x: 40, y: boxY, width: boxWidth, height: boxHeight, color: colors.lightGray })
    page.drawRectangle({ x: 40, y: boxY + boxHeight - 3, width: boxWidth, height: 3, color: colors.primary })
    
    page.drawText('EMETTEUR', { x: 55, y: boxY + boxHeight - 22, size: 9, font: fontBold, color: colors.primary })
    page.drawText('GREEN TER', { x: 55, y: boxY + boxHeight - 42, size: 14, font: fontBold, color: colors.dark })
    page.drawText('SASU au capital de 50 000,00 EUR', { x: 55, y: boxY + boxHeight - 58, size: 9, font: fontRegular, color: colors.medium })
    page.drawText('SIREN: 977 485 721', { x: 55, y: boxY + boxHeight - 72, size: 9, font: fontRegular, color: colors.medium })
    page.drawText('TVA: FR XX 977485721', { x: 55, y: boxY + boxHeight - 86, size: 9, font: fontRegular, color: colors.medium })
    page.drawText('38 Rue de Menilmontant, 75020 Paris', { x: 55, y: boxY + boxHeight - 100, size: 9, font: fontRegular, color: colors.medium })

    // Box Client
    page.drawRectangle({ x: width - 40 - boxWidth, y: boxY, width: boxWidth, height: boxHeight, color: colors.greenLight })
    page.drawRectangle({ x: width - 40 - boxWidth, y: boxY + boxHeight - 3, width: boxWidth, height: 3, color: colors.success })
    
    page.drawText('CLIENT', { x: width - 40 - boxWidth + 15, y: boxY + boxHeight - 22, size: 9, font: fontBold, color: colors.primary })
    
    let clientY = boxY + boxHeight - 42
    if (customer?.name) {
      page.drawText(customer.name, { x: width - 40 - boxWidth + 15, y: clientY, size: 14, font: fontBold, color: colors.dark })
      clientY -= 16
    }
    if (customer?.email) {
      page.drawText(customer.email, { x: width - 40 - boxWidth + 15, y: clientY, size: 9, font: fontRegular, color: colors.medium })
      clientY -= 14
    }
    if (customer?.phone) {
      page.drawText(customer.phone, { x: width - 40 - boxWidth + 15, y: clientY, size: 9, font: fontRegular, color: colors.medium })
      clientY -= 14
    }
    if (addr?.line1) {
      page.drawText(addr.line1, { x: width - 40 - boxWidth + 15, y: clientY, size: 9, font: fontRegular, color: colors.medium })
      clientY -= 14
    }
    if (addr?.postal_code || addr?.city) {
      page.drawText(`${addr?.postal_code || ''} ${addr?.city || ''}`.trim(), { x: width - 40 - boxWidth + 15, y: clientY, size: 9, font: fontRegular, color: colors.medium })
    }

    // ===== TABLEAU PRODUITS =====
    const tableY = boxY - 40
    const headerH = 35
    const rowH = 70

    // Header
    page.drawRectangle({ x: 40, y: tableY - headerH, width: width - 80, height: headerH, color: colors.primary })
    page.drawText('DESIGNATION', { x: 55, y: tableY - 22, size: 10, font: fontBold, color: colors.white })
    page.drawText('QTE', { x: 350, y: tableY - 22, size: 10, font: fontBold, color: colors.white })
    page.drawText('P.U. HT', { x: 410, y: tableY - 22, size: 10, font: fontBold, color: colors.white })
    page.drawText('TOTAL HT', { x: 490, y: tableY - 22, size: 10, font: fontBold, color: colors.white })

    // Ligne produit
    const rowY = tableY - headerH - rowH
    page.drawRectangle({ x: 40, y: rowY, width: width - 80, height: rowH, color: colors.lightGray })
    
    page.drawText(productName, { x: 55, y: rowY + rowH - 22, size: 12, font: fontBold, color: colors.dark })
    page.drawText('Livraison incluse', { x: 55, y: rowY + rowH - 40, size: 9, font: fontRegular, color: colors.success })
    page.drawText('Installation par technicien certifie RGE', { x: 55, y: rowY + rowH - 54, size: 9, font: fontRegular, color: colors.success })
    
    page.drawText(quantity.toString(), { x: 358, y: rowY + rowH - 22, size: 11, font: fontRegular, color: colors.dark })
    page.drawText(`${formatPrice(unitPriceHT)} EUR`, { x: 400, y: rowY + rowH - 22, size: 11, font: fontRegular, color: colors.dark })
    page.drawText(`${formatPrice(totalHT)} EUR`, { x: 480, y: rowY + rowH - 22, size: 11, font: fontBold, color: colors.dark })

    // Ligne séparatrice
    page.drawLine({ start: { x: 40, y: rowY - 1 }, end: { x: width - 40, y: rowY - 1 }, thickness: 1, color: colors.border })

    // ===== TOTAUX =====
    const totalsY = rowY - 50

    // Badge PAYE
    page.drawRectangle({ x: 40, y: totalsY - 5, width: 90, height: 40, color: colors.successBg })
    page.drawRectangle({ x: 40, y: totalsY + 32, width: 90, height: 3, color: colors.success })
    page.drawText('PAYE', { x: 62, y: totalsY + 10, size: 14, font: fontBold, color: colors.success })

    // Totaux droite
    const totalsX = 390
    page.drawText('Sous-total HT', { x: totalsX, y: totalsY + 28, size: 10, font: fontRegular, color: colors.medium })
    page.drawText(`${formatPrice(totalHT)} EUR`, { x: 490, y: totalsY + 28, size: 10, font: fontRegular, color: colors.dark })

    page.drawText('TVA (10%)', { x: totalsX, y: totalsY + 10, size: 10, font: fontRegular, color: colors.medium })
    page.drawText(`${formatPrice(montantTVA)} EUR`, { x: 490, y: totalsY + 10, size: 10, font: fontRegular, color: colors.dark })

    // Total TTC
    page.drawRectangle({ x: totalsX - 15, y: totalsY - 30, width: 170, height: 35, color: colors.primary })
    page.drawText('TOTAL TTC', { x: totalsX, y: totalsY - 18, size: 12, font: fontBold, color: colors.white })
    page.drawText(`${formatPrice(totalTTC)} EUR`, { x: 478, y: totalsY - 18, size: 12, font: fontBold, color: colors.white })

    // ===== FOOTER =====
    const footerY = 55

    // Ligne accent
    page.drawRectangle({ x: 40, y: footerY + 40, width: width - 80, height: 3, color: colors.secondary })
    
    // Infos légales
    page.drawText('GREEN TER - SASU au capital de 50 000,00 EUR - RCS Paris 977 485 721 - TVA FR XX 977485721', { x: 105, y: footerY + 25, size: 7, font: fontRegular, color: colors.light })
    page.drawText('38 Rue de Menilmontant, 75020 Paris | contact@greenter.fr | 06 09 45 50 56', { x: 140, y: footerY + 13, size: 7, font: fontRegular, color: colors.light })
    
    // Certifications
    page.drawText('Certifie RGE - QualiPAC - QualiPV - Qualibat', { x: 195, y: footerY - 5, size: 9, font: fontBold, color: colors.primary })

    // Générer le PDF
    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="facture-${invoiceNumber}.pdf"`,
      },
    })

  } catch (error) {
    console.error('Error generating invoice:', error)
    return NextResponse.json({ error: 'Erreur lors de la génération de la facture' }, { status: 500 })
  }
}
