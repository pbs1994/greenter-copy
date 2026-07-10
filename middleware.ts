/**
 * Edge middleware: gate /administrator/* and /partenaires/* with a
 * Supabase Auth session check.
 *
 * The deeper "is this email actually an admin?" / "is this an approved
 * agent?" checks happen further down the stack (`requireAdmin()` in
 * `lib/admin-auth.ts`, `requireAgent()` in `lib/partenaires-auth.ts`).
 * Doing those lookups in middleware would either require the
 * service-role key at the edge (forbidden — it bypasses RLS) or an RPC
 * round-trip on every request.
 *
 * This middleware also keeps the Supabase Auth cookies refreshed so the
 * session lives across navigations — that part runs on every request the
 * matcher accepts.
 *
 * The two login forms (/login, /partenaires/login) are exempt from the
 * "must be authenticated" gate — that's the whole point of a login page —
 * but are still watched so an already-logged-in visitor gets bounced
 * straight past them.
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
  const isPartenairesLoginPath = path === '/partenaires/login'
  const isPartenairesPath = path.startsWith('/partenaires') && !isPartenairesLoginPath

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

  return response
}

export const config = {
  // Intercept /administrator and /partenaires paths, plus their two login
  // pages (so we can refresh the auth cookie + bounce already-logged-in
  // visitors past the form).
  matcher: ['/administrator/:path*', '/login', '/partenaires/:path*'],
}
