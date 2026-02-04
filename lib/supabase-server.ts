import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Creates a Supabase client for Server Components (read-only cookies).
 * Use this in pages and layouts where you can't modify cookies.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // In Server Components, we can't set cookies.
          // This is fine for read operations - token refresh will happen
          // on the next request that goes through middleware or a route handler.
        },
      },
    }
  );
}

/**
 * Creates a Supabase client for Server Actions and Route Handlers.
 * Use this when you need to modify cookies (login, logout, token refresh).
 */
export async function createSupabaseServerActionClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}
