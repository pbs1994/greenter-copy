/**
 * Edge middleware, two independent jobs sharing one request pass:
 *
 * 1. Gate /administrator/* and /partenaires/* with a Supabase Auth session
 *    check. The deeper "is this email actually an admin?" / "is this an
 *    approved agent?" checks happen further down the stack (`requireAdmin()`
 *    in `lib/admin-auth.ts`, `requireAgent()` in `lib/partenaires-auth.ts`).
 *    Doing those lookups in middleware would either require the
 *    service-role key at the edge (forbidden — it bypasses RLS) or an RPC
 *    round-trip on every request. This also keeps the Supabase Auth
 *    cookies refreshed so the session lives across navigations, but that
 *    (and its RPC-shaped `getUser()` call) only runs for the paths that
 *    actually need it, not for every public page.
 *
 *    The two login forms (/login, /partenaires/login) are exempt from the
 *    "must be authenticated" gate — that's the whole point of a login page
 *    — but are still watched so an already-logged-in visitor gets bounced
 *    straight past them. /partenaires/inscription and /partenaires/contrat
 *    are exempt too (public self-registration + the contract text it links
 *    to), but are NOT bounced when already authenticated — an existing
 *    agent or an admin should still be able to open the contract page.
 *
 * 2. Capture agent referral links (`?ref=<code>`) into a 30-day cookie, on
 *    ANY public page — an agent's link can point at any product/service
 *    page, not just a dedicated landing page. Kept as a raw code (no DB
 *    lookup here); resolving it to an actual agent happens lazily where
 *    it's read (contact form, call tracker, checkout — see lib/referral.ts).
 */

import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { REFERRAL_COOKIE, REFERRAL_COOKIE_MAX_AGE_SECONDS, REFERRAL_CODE_REGEX } from '@/lib/referral'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const path = request.nextUrl.pathname
  const isAdminPath = path.startsWith('/administrator')
  const isLoginPath = path === '/login'
  const isPartenairesLoginPath = path === '/partenaires/login'
  const isPartenairesPublicPath =
    isPartenairesLoginPath || path === '/partenaires/inscription' || path === '/partenaires/contrat'
  const isPartenairesPath = path.startsWith('/partenaires') && !isPartenairesPublicPath
  const needsAuthGate = isAdminPath || isLoginPath || isPartenairesPublicPath || isPartenairesPath

  if (needsAuthGate) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Touch the user — this also refreshes the access token cookie if needed.
    const { data: { user } } = await supabase.auth.getUser()

    if (isAdminPath && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', path)
      return NextResponse.redirect(url)
    }

    if (isPartenairesPath && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/partenaires/login'
      url.searchParams.set('next', path)
      return NextResponse.redirect(url)
    }

    // If they're already logged in and visit a login page, send them past it.
    // The role router (/partenaires) or admin layout still re-checks the
    // actual role; this is just a UX tweak to skip the form.
    if (isLoginPath && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/administrator'
      url.search = ''
      return NextResponse.redirect(url)
    }

    if (isPartenairesLoginPath && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/partenaires'
      url.search = ''
      return NextResponse.redirect(url)
    }
  }

  const ref = request.nextUrl.searchParams.get('ref')
  if (ref && REFERRAL_CODE_REGEX.test(ref)) {
    response.cookies.set(REFERRAL_COOKIE, ref, {
      maxAge: REFERRAL_COOKIE_MAX_AGE_SECONDS,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
    })
  }

  return response
}

export const config = {
  matcher: [
    // Every page except Next internals and static assets (anything with a
    // file extension) — referral capture needs to run broadly; the auth
    // gate above narrows itself back down to /administrator and
    // /partenaires internally.
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\..*).*)',
  ],
}
