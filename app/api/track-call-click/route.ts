import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isRateLimitedPerMinute } from '@/lib/rate-limit'
import { REFERRAL_COOKIE, resolveReferralCode } from '@/lib/referral'

/**
 * Fire-and-forget signal from PhoneCallTracker: a visitor attributed to an
 * agent's referral link clicked a "Appeler" button. We have no way to know
 * if the call actually happened (tel: links don't report back), so this
 * only logs a placeholder dossier for manual reconciliation by the admin —
 * see the "log click + manual reconciliation" option chosen over dynamic
 * call-tracking numbers (too costly for this network's size) or relying on
 * the client to mention the agent by name (not guaranteed).
 */
export async function POST(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'track-call-click', 20)) {
      return NextResponse.json({ ok: false }, { status: 429 })
    }

    const { page } = await request.json().catch(() => ({ page: undefined }))
    const agent = await resolveReferralCode(request.cookies.get(REFERRAL_COOKIE)?.value)
    if (!agent) {
      // Not an error — most callers of this endpoint have no referral cookie.
      return NextResponse.json({ ok: true, tracked: false })
    }

    const safePage = typeof page === 'string' ? page.replace(/[\r\n]/g, '').slice(0, 300) : null
    const timestamp = new Date().toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    )
    const { error } = await supabase.from('deals').insert({
      agent_id: agent.id,
      first_touch_agent_id: agent.id,
      client_name: 'Appel potentiel (clic bouton "Appeler")',
      deal_type: 'devis',
      status: 'nouveau',
      source: 'agent_link_call',
      notes: `Clic sur le bouton d'appel le ${timestamp}${safePage ? ` depuis ${safePage}` : ''}. À rapprocher d'un appel entrant reçu vers cette heure-là.`,
    })

    if (error) {
      console.error('track-call-click: échec insertion dossier:', error)
      return NextResponse.json({ ok: false }, { status: 500 })
    }

    return NextResponse.json({ ok: true, tracked: true })
  } catch (error) {
    console.error('track-call-click error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
