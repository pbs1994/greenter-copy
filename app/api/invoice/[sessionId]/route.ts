import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { generateInvoicePdf } from '@/lib/generate-invoice-pdf'
import { verifyInvoiceSignature } from '@/lib/invoice-signing'
import { isRateLimitedPerMinute } from '@/lib/rate-limit'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    if (isRateLimitedPerMinute(request, 'invoice', 5)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
    }

    const { sessionId } = await params

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID manquant' }, { status: 400 })
    }

    // Validate Stripe session ID format (cs_test_... or cs_live_...)
    if (!/^cs_(test|live)_[a-zA-Z0-9]+$/.test(sessionId)) {
      return NextResponse.json({ error: 'Format de Session ID invalide' }, { status: 400 })
    }

    // Stripe session IDs are not secrets — they appear in logs, browser
    // history, analytics. The signed `exp`/`sig` query params bind the URL
    // to a server-side HMAC and an expiry, so a leaked session ID alone
    // cannot fetch the customer's PII-bearing invoice.
    const exp = request.nextUrl.searchParams.get('exp')
    const sig = request.nextUrl.searchParams.get('sig')
    if (!verifyInvoiceSignature(sessionId, exp, sig)) {
      return NextResponse.json({ error: 'Lien invalide ou expiré' }, { status: 403 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    })

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Paiement non confirmé' }, { status: 404 })
    }

    const { bytes, invoiceNumber } = await generateInvoicePdf(session)

    return new NextResponse(Buffer.from(bytes), {
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
