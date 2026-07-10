/**
 * Magic-link callback. Supabase Auth redirects here with a `code` query
 * param after the user clicks the link in their email; we exchange the
 * code for a session cookie and bounce them to `next` (/administrator or
 * /partenaires by default, one per "family" of login page).
 *
 * The redirect target is validated against an allow-list so a forged
 * ?next=https://evil.com link can't turn this route into an open redirect.
 * Errors bounce back to the login page of the same family, not always
 * /login, so a partner clicking an expired /partenaires link doesn't land
 * on the admin login form.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerActionClient } from '@/lib/supabase-server'

const FAMILIES = [
  { prefix: '/partenaires', defaultNext: '/partenaires', loginPath: '/partenaires/login' },
  { prefix: '/administrator', defaultNext: '/administrator', loginPath: '/login' },
] as const

function resolveFamily(raw: string | null) {
  const match = raw ? FAMILIES.find((f) => raw.startsWith(f.prefix)) : undefined
  return match ?? FAMILIES[1] // default: admin family, unchanged from before
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const family = resolveFamily(request.nextUrl.searchParams.get('next'))
  const next = request.nextUrl.searchParams.get('next')?.startsWith(family.prefix)
    ? request.nextUrl.searchParams.get('next')!
    : family.defaultNext

  if (!code) {
    const url = request.nextUrl.clone()
    url.pathname = family.loginPath
    url.search = '?error=missing_code'
    return NextResponse.redirect(url)
  }

  const supabase = await createSupabaseServerActionClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    const url = request.nextUrl.clone()
    url.pathname = family.loginPath
    url.search = '?error=exchange_failed'
    return NextResponse.redirect(url)
  }

  const dest = request.nextUrl.clone()
  dest.pathname = next
  dest.search = ''
  return NextResponse.redirect(dest)
}
