import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';

/**
 * Get the currently authenticated admin user.
 * Returns the user object if authenticated, null otherwise.
 */
export async function getAdminUser() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Require an authenticated admin user.
 * Redirects to login if not authenticated.
 * Returns the user object if authenticated.
 */
export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) {
    redirect('/administrator/login');
  }
  return user;
}
