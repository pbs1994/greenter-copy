/**
 * POST /api/auth/logout — terminates the current Supabase Auth session and
 * redirects back to /login (or /partenaires/login via ?next=, allow-listed
 * to avoid an open redirect). Restricted to POST so it can't be triggered
 * by a `<a>` tag or `<img>` smuggled into a third-party site.
 */

import { NextResponse } from 'next/server'
import { createSupabaseServerActionClient } from '@/lib/supabase-server'

const ALLOWED_NEXT = new Set(['/login', '/partenaires/login'])

function safeNext(raw: string | null): string {
  if (raw && ALLOWED_NEXT.has(raw)) return raw
  return '/login'
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerActionClient()
  await supabase.auth.signOut()

  const next = safeNext(new URL(request.url).searchParams.get('next'))
  const url = new URL(next, request.url)
  return NextResponse.redirect(url, { status: 303 })
}
