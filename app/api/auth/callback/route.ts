/**
 * Magic-link callback. Supabase Auth redirects here with a `code` query
 * param after the user clicks the link in their email; we exchange the
 * code for a session cookie and bounce them to /administrator.
 *
 * The redirect target is also validated against an allow-list so a
 * forged ?next=https://evil.com link can't turn this route into an
 * open redirect.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerActionClient } from '@/lib/supabase-server'

const DEFAULT_NEXT = '/administrator'

function safeNext(raw: string | null): string {
  if (!raw) return DEFAULT_NEXT
  // Only allow same-origin paths starting with /administrator (avoid open redirect).
  if (raw.startsWith('/administrator')) return raw
  return DEFAULT_NEXT
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const next = safeNext(request.nextUrl.searchParams.get('next'))

  if (!code) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.search = '?error=missing_code'
    return NextResponse.redirect(url)
  }

  const supabase = await createSupabaseServerActionClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.search = '?error=exchange_failed'
    return NextResponse.redirect(url)
  }

  const dest = request.nextUrl.clone()
  dest.pathname = next
  dest.search = ''
  return NextResponse.redirect(dest)
}
