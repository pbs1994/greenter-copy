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

/**
 * Create a new category with name, slug, and spec_fields.
 * Auto-generates slug from category name with French character normalization.
 * 
 * @param formData - Form data containing 'name' and 'spec_fields' (JSON string)
 * @returns ActionResult indicating success or failure
 * 
 * Validates: Requirements 4.2
 */
export async function createCategory(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  const name = formData.get('name') as string;
  const specFieldsRaw = formData.get('spec_fields') as string;

  if (!name || name.trim() === '') {
    return { success: false, error: 'Le nom de la catégorie est requis' };
  }

  const slug = slugify(name);
  
  let specFields = [];
  try {
    specFields = specFieldsRaw ? JSON.parse(specFieldsRaw) : [];
  } catch {
    return { success: false, error: 'Format des champs de spécification invalide' };
  }

  const { error } = await supabase
    .from('categories')
    .insert({ name: name.trim(), slug, spec_fields: specFields });

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'Ce slug existe déjà' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/categories');
  return { success: true };
}

/**
 * Update an existing category.
 * 
 * @param id - The UUID of the category to update
 * @param formData - Form data containing 'name' and 'spec_fields' (JSON string)
 * @returns ActionResult indicating success or failure
 * 
 * Validates: Requirements 4.4
 */
export async function updateCategory(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  const name = formData.get('name') as string;
  const specFieldsRaw = formData.get('spec_fields') as string;

  if (!name || name.trim() === '') {
    return { success: false, error: 'Le nom de la catégorie est requis' };
  }

  if (!id) {
    return { success: false, error: 'ID de catégorie invalide' };
  }

  const slug = slugify(name);

  let specFields = [];
  try {
    specFields = specFieldsRaw ? JSON.parse(specFieldsRaw) : [];
  } catch {
    return { success: false, error: 'Format des champs de spécification invalide' };
  }

  const { error } = await supabase
    .from('categories')
    .update({ name: name.trim(), slug, spec_fields: specFields })
    .eq('id', id);

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'Ce slug existe déjà' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/categories');
  revalidatePath(`/administrator/categories/${id}`);
  return { success: true };
}

/**
 * Delete a category.
 * Prevents deletion if the category has associated products.
 * 
 * @param id - The UUID of the category to delete
 * @returns ActionResult indicating success or failure
 * 
 * Validates: Requirements 4.5, 4.6
 */
export async function deleteCategory(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de catégorie invalide' };
  }

  // Check for associated products
  const { count, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id);

  if (countError) {
    return { success: false, error: countError.message };
  }

  if (count && count > 0) {
    return { 
      success: false, 
      error: 'Impossible de supprimer une catégorie avec des produits associés' 
    };
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/categories');
  return { success: true };
}


/**
 * Duplicate an existing category.
 * Creates a copy with " (copie)" appended to the name.
 * 
 * @param id - The UUID of the category to duplicate
 * @returns ActionResult indicating success or failure with the new category ID
 */
export async function duplicateCategory(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de catégorie invalide' };
  }

  // Fetch the original category
  const { data: original, error: fetchError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !original) {
    return { success: false, error: 'Catégorie non trouvée' };
  }

  // Generate new name and slug
  const newName = `${original.name} (copie)`;
  const newSlug = slugify(newName);

  // Insert the duplicate
  const { data: newCategory, error: insertError } = await supabase
    .from('categories')
    .insert({
      name: newName,
      slug: newSlug,
      spec_fields: original.spec_fields,
    })
    .select('id')
    .single();

  if (insertError) {
    if (insertError.code === '23505') {
      return { success: false, error: 'Une catégorie avec ce nom existe déjà' };
    }
    return { success: false, error: insertError.message };
  }

  revalidatePath('/administrator/categories');
  return { success: true, data: { id: newCategory.id } };
}
