/**
 * POST /api/auth/logout — terminates the current Supabase Auth session and
 * redirects back to /login. Restricted to POST so it can't be triggered by
 * a `<a>` tag or `<img>` smuggled into a third-party site.
 */

import { NextResponse } from 'next/server'
import { createSupabaseServerActionClient } from '@/lib/supabase-server'

export async function POST(request: Request) {
  const supabase = await createSupabaseServerActionClient()
  await supabase.auth.signOut()

  const url = new URL('/login', request.url)
  return NextResponse.redirect(url, { status: 303 })
}
