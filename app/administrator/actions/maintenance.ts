'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerActionClient } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';
import { slugify } from '@/lib/slugify';

/**
 * Result type for server actions
 */
export interface ActionResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

// ─── Services ────────────────────────────────────────────────────────────────

/**
 * Create a new maintenance service.
 *
 * @param formData - Form data containing service fields
 * @returns ActionResult indicating success or failure
 *
 * Validates: Requirements 3.3
 */
export async function createService(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;
  const priceRaw = formData.get('price_monthly') as string;
  const icon = (formData.get('icon') as string) || 'Wrench';
  const includesRaw = formData.get('includes') as string;
  const isActive = formData.get('is_active') === 'true';
  const sortOrderRaw = formData.get('sort_order') as string;

  if (!name || name.trim() === '') {
    return { success: false, error: 'Le nom du service est requis' };
  }

  const priceMontly = parseInt(priceRaw, 10);
  if (isNaN(priceMontly) || priceMontly < 0) {
    return { success: false, error: 'Le prix mensuel doit être un nombre positif' };
  }

  let includes: string[] = [];
  try {
    includes = includesRaw ? JSON.parse(includesRaw) : [];
  } catch {
    return { success: false, error: 'Format du champ "includes" invalide' };
  }

  const slug = slugify(name);
  const sortOrder = parseInt(sortOrderRaw, 10) || 0;

  const { error } = await supabase
    .from('maintenance_services')
    .insert({
      name: name.trim(),
      slug,
      description: description || null,
      price_monthly: priceMontly,
      icon,
      includes,
      is_active: isActive,
      sort_order: sortOrder,
    });

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'Un service avec ce slug existe déjà' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/maintenance');
  return { success: true };
}

/**
 * Update an existing maintenance service.
 *
 * @param id - The UUID of the service to update
 * @param formData - Form data containing service fields
 * @returns ActionResult indicating success or failure
 *
 * Validates: Requirements 3.3
 */
export async function updateService(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de service invalide' };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;
  const priceRaw = formData.get('price_monthly') as string;
  const icon = (formData.get('icon') as string) || 'Wrench';
  const includesRaw = formData.get('includes') as string;
  const isActive = formData.get('is_active') === 'true';
  const sortOrderRaw = formData.get('sort_order') as string;

  if (!name || name.trim() === '') {
    return { success: false, error: 'Le nom du service est requis' };
  }

  const priceMontly = parseInt(priceRaw, 10);
  if (isNaN(priceMontly) || priceMontly < 0) {
    return { success: false, error: 'Le prix mensuel doit être un nombre positif' };
  }

  let includes: string[] = [];
  try {
    includes = includesRaw ? JSON.parse(includesRaw) : [];
  } catch {
    return { success: false, error: 'Format du champ "includes" invalide' };
  }

  const slug = slugify(name);
  const sortOrder = parseInt(sortOrderRaw, 10) || 0;

  const { error } = await supabase
    .from('maintenance_services')
    .update({
      name: name.trim(),
      slug,
      description: description || null,
      price_monthly: priceMontly,
      icon,
      includes,
      is_active: isActive,
      sort_order: sortOrder,
    })
    .eq('id', id);

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'Un service avec ce slug existe déjà' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/maintenance');
  revalidatePath(`/administrator/maintenance/services/${id}`);
  return { success: true };
}

/**
 * Delete a maintenance service.
 * Prevents deletion if the service has active subscriptions.
 *
 * @param id - The UUID of the service to delete
 * @returns ActionResult indicating success or failure
 *
 * Validates: Requirements 3.3, 3.8
 */
export async function deleteService(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de service invalide' };
  }

  // Check for active subscriptions linked to this service
  const { count, error: countError } = await supabase
    .from('maintenance_subscription_items')
    .select(
      '*, maintenance_subscriptions!inner(status)',
      { count: 'exact', head: true }
    )
    .eq('item_type', 'service')
    .eq('maintenance_service_id', id)
    .eq('maintenance_subscriptions.status', 'active');

  if (countError) {
    return { success: false, error: countError.message };
  }

  if (count && count > 0) {
    return {
      success: false,
      error: 'Impossible de supprimer un service ayant des souscriptions actives',
    };
  }

  const { error } = await supabase
    .from('maintenance_services')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/maintenance');
  return { success: true };
}

/**
 * Toggle the active status of a maintenance service.
 *
 * @param id - The UUID of the service to toggle
 * @returns ActionResult indicating success or failure
 *
 * Validates: Requirements 3.5
 */
export async function toggleServiceActive(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de service invalide' };
  }

  const { data: service, error: fetchError } = await supabase
    .from('maintenance_services')
    .select('is_active')
    .eq('id', id)
    .single();

  if (fetchError || !service) {
    return { success: false, error: 'Service non trouvé' };
  }

  const newActiveStatus = !service.is_active;

  const { error } = await supabase
    .from('maintenance_services')
    .update({ is_active: newActiveStatus })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/maintenance');
  revalidatePath(`/administrator/maintenance/services/${id}`);
  return { success: true, data: { is_active: newActiveStatus } };
}

// ─── Options ─────────────────────────────────────────────────────────────────

/**
 * Create a new maintenance option.
 *
 * @param formData - Form data containing option fields
 * @returns ActionResult indicating success or failure
 *
 * Validates: Requirements 3.4
 */
export async function createOption(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;
  const priceRaw = formData.get('price_monthly') as string;
  const icon = (formData.get('icon') as string) || 'Zap';
  const isActive = formData.get('is_active') === 'true';
  const isFlatFee = formData.get('is_flat_fee') === 'true';
  const exemptFromDiscount = formData.get('exempt_from_discount') !== 'false';
  const sortOrderRaw = formData.get('sort_order') as string;

  if (!name || name.trim() === '') {
    return { success: false, error: "Le nom de l'option est requis" };
  }

  const priceMontly = parseInt(priceRaw, 10);
  if (isNaN(priceMontly) || priceMontly < 0) {
    return { success: false, error: 'Le prix mensuel doit être un nombre positif' };
  }

  const slug = slugify(name);
  const sortOrder = parseInt(sortOrderRaw, 10) || 0;

  const { error } = await supabase
    .from('maintenance_options')
    .insert({
      name: name.trim(),
      slug,
      description: description || null,
      price_monthly: priceMontly,
      icon,
      is_active: isActive,
      is_flat_fee: isFlatFee,
      exempt_from_discount: exemptFromDiscount,
      sort_order: sortOrder,
    });

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'Une option avec ce slug existe déjà' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/maintenance');
  return { success: true };
}

/**
 * Update an existing maintenance option.
 *
 * @param id - The UUID of the option to update
 * @param formData - Form data containing option fields
 * @returns ActionResult indicating success or failure
 *
 * Validates: Requirements 3.4
 */
export async function updateOption(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: "ID d'option invalide" };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;
  const priceRaw = formData.get('price_monthly') as string;
  const icon = (formData.get('icon') as string) || 'Zap';
  const isActive = formData.get('is_active') === 'true';
  const isFlatFee = formData.get('is_flat_fee') === 'true';
  const exemptFromDiscount = formData.get('exempt_from_discount') !== 'false';
  const sortOrderRaw = formData.get('sort_order') as string;

  if (!name || name.trim() === '') {
    return { success: false, error: "Le nom de l'option est requis" };
  }

  const priceMontly = parseInt(priceRaw, 10);
  if (isNaN(priceMontly) || priceMontly < 0) {
    return { success: false, error: 'Le prix mensuel doit être un nombre positif' };
  }

  const slug = slugify(name);
  const sortOrder = parseInt(sortOrderRaw, 10) || 0;

  const { error } = await supabase
    .from('maintenance_options')
    .update({
      name: name.trim(),
      slug,
      description: description || null,
      price_monthly: priceMontly,
      icon,
      is_active: isActive,
      is_flat_fee: isFlatFee,
      exempt_from_discount: exemptFromDiscount,
      sort_order: sortOrder,
    })
    .eq('id', id);

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'Une option avec ce slug existe déjà' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/maintenance');
  revalidatePath(`/administrator/maintenance/options/${id}`);
  return { success: true };
}

/**
 * Delete a maintenance option.
 * Prevents deletion if the option has active subscriptions.
 *
 * @param id - The UUID of the option to delete
 * @returns ActionResult indicating success or failure
 *
 * Validates: Requirements 3.4, 3.8
 */
export async function deleteOption(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: "ID d'option invalide" };
  }

  // Check for active subscriptions linked to this option
  const { count, error: countError } = await supabase
    .from('maintenance_subscription_items')
    .select(
      '*, maintenance_subscriptions!inner(status)',
      { count: 'exact', head: true }
    )
    .eq('item_type', 'option')
    .eq('maintenance_option_id', id)
    .eq('maintenance_subscriptions.status', 'active');

  if (countError) {
    return { success: false, error: countError.message };
  }

  if (count && count > 0) {
    return {
      success: false,
      error: 'Impossible de supprimer une option ayant des souscriptions actives',
    };
  }

  const { error } = await supabase
    .from('maintenance_options')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/maintenance');
  return { success: true };
}

/**
 * Toggle the active status of a maintenance option.
 *
 * @param id - The UUID of the option to toggle
 * @returns ActionResult indicating success or failure
 *
 * Validates: Requirements 3.5
 */
export async function toggleOptionActive(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: "ID d'option invalide" };
  }

  const { data: option, error: fetchError } = await supabase
    .from('maintenance_options')
    .select('is_active')
    .eq('id', id)
    .single();

  if (fetchError || !option) {
    return { success: false, error: 'Option non trouvée' };
  }

  const newActiveStatus = !option.is_active;

  const { error } = await supabase
    .from('maintenance_options')
    .update({ is_active: newActiveStatus })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/maintenance');
  revalidatePath(`/administrator/maintenance/options/${id}`);
  return { success: true, data: { is_active: newActiveStatus } };
}
