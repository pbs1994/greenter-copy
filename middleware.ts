/**
 * Edge middleware: gate /administrator/* with a Supabase Auth session check.
 *
 * The deeper "is this email actually an admin?" check happens in the admin
 * layout (`requireAdmin()` in `lib/admin-auth.ts`). Doing the email lookup
 * in middleware would either require the service-role key at the edge
 * (forbidden — it bypasses RLS) or an RPC round-trip on every request.
 *
 * This middleware also keeps the Supabase Auth cookies refreshed so the
 * session lives across navigations — that part runs on every request the
 * matcher accepts.
 *
 * The login form lives at /login (top-level), not under /administrator,
 * so it's exempt from the auth gate.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

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

  const path = request.nextUrl.pathname
  const isAdminPath = path.startsWith('/administrator')
  const isLoginPath = path === '/login'

  if (isAdminPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }

  // If they're already logged in and visit /login, send them home.
  // The admin layout will still re-check admin status; this is just a UX tweak.
  if (isLoginPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/administrator'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  // Intercept /administrator paths and the /login page (the latter so we
  // can refresh the auth cookie + bounce already-logged-in users).
  matcher: ['/administrator/:path*', '/login'],
}
