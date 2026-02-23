'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerActionClient } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';
import { slugify } from '@/lib/slugify';
import { 
  createStripeProduct, 
  updateStripeProduct, 
  updateStripePrice,
  archiveStripeProduct 
} from '@/lib/stripe';
import type { SpecField } from '@/types/database';

/**
 * Result type for server actions
 */
export interface ActionResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

/**
 * Validates that all required spec_fields are filled in the product specs.
 * 
 * @param specs - The product specs object
 * @param specFields - The category's spec_fields configuration
 * @returns true if all required fields are filled, false otherwise
 */
function validateRequiredSpecFields(
  specs: Record<string, string | number>,
  specFields: SpecField[]
): boolean {
  for (const field of specFields) {
    if (field.required) {
      const value = specs[field.key];
      // Check if value is missing, empty string, or undefined
      if (value === undefined || value === null || value === '') {
        return false;
      }
    }
  }
  return true;
}

/**
 * Create a new product with dynamic spec_fields validation.
 * Auto-generates slug from product name with French character normalization.
 * 
 * @param formData - Form data containing product fields
 * @returns ActionResult indicating success or failure
 * 
 * Validates: Requirements 5.2, 5.5, 5.8, 5.9
 */
export async function createProduct(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  const name = formData.get('name') as string;
  const categoryId = formData.get('category_id') as string;
  const priceRaw = formData.get('price') as string;
  const imageUrl = formData.get('image_url') as string | null;
  const description = formData.get('description') as string | null;
  const shortDescription = formData.get('short_description') as string | null;
  const specsRaw = formData.get('specs') as string;
  const featuresRaw = formData.get('features') as string;
  const faqRaw = formData.get('faq') as string;
  const stripePriceId = formData.get('stripe_price_id') as string | null;
  const isActive = formData.get('is_active') === 'true';
  const isCustomPage = formData.get('is_custom_page') === 'true';

  // Validate required fields
  if (!name || name.trim() === '') {
    return { success: false, error: 'Le nom du produit est requis' };
  }

  if (!categoryId) {
    return { success: false, error: 'La catégorie est requise' };
  }

  const price = parseInt(priceRaw, 10);
  if (isNaN(price) || price < 0) {
    return { success: false, error: 'Le prix doit être un nombre positif' };
  }

  // Parse JSON fields
  let specs: Record<string, string | number> = {};
  let features: Array<{ icon: string; title: string; description: string }> = [];
  let faq: Array<{ question: string; answer: string }> = [];

  try {
    specs = specsRaw ? JSON.parse(specsRaw) : {};
  } catch {
    return { success: false, error: 'Format des spécifications invalide' };
  }

  try {
    features = featuresRaw ? JSON.parse(featuresRaw) : [];
  } catch {
    return { success: false, error: 'Format des fonctionnalités invalide' };
  }

  try {
    faq = faqRaw ? JSON.parse(faqRaw) : [];
  } catch {
    return { success: false, error: 'Format de la FAQ invalide' };
  }

  // Fetch category to get spec_fields for validation
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('spec_fields')
    .eq('id', categoryId)
    .single();

  if (categoryError || !category) {
    return { success: false, error: 'Catégorie non trouvée' };
  }

  // Validate required spec_fields
  const specFields = category.spec_fields as SpecField[];
  if (!validateRequiredSpecFields(specs, specFields)) {
    return { success: false, error: 'Tous les champs obligatoires doivent être remplis' };
  }

  const slug = slugify(name);

  // Create product on Stripe
  let stripeProductId: string | null = null;
  let stripePriceIdFinal: string | null = null;

  try {
    const stripeResult = await createStripeProduct({
      name: name.trim(),
      description: description || undefined,
      imageUrl: imageUrl || undefined,
      priceInCents: price,
    });
    stripeProductId = stripeResult.productId;
    stripePriceIdFinal = stripeResult.priceId;
  } catch (stripeError) {
    console.error('Stripe error:', stripeError);
    return { success: false, error: 'Erreur lors de la création sur Stripe' };
  }

  const { error } = await supabase
    .from('products')
    .insert({
      name: name.trim(),
      slug,
      category_id: categoryId,
      price,
      image_url: imageUrl || null,
      description: description || null,
      short_description: shortDescription || null,
      specs,
      features,
      faq,
      stripe_product_id: stripeProductId,
      stripe_price_id: stripePriceIdFinal,
      is_active: isActive,
      is_custom_page: isCustomPage,
    });

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'Ce slug existe déjà pour cette catégorie' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/products');
  return { success: true };
}

/**
 * Update an existing product with dynamic spec_fields validation.
 * 
 * @param id - The UUID of the product to update
 * @param formData - Form data containing product fields
 * @returns ActionResult indicating success or failure
 * 
 * Validates: Requirements 5.3, 5.5, 5.9
 */
export async function updateProduct(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de produit invalide' };
  }

  // Fetch current product to compare changes
  const { data: currentProduct, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !currentProduct) {
    return { success: false, error: 'Produit non trouvé' };
  }

  const name = formData.get('name') as string;
  const categoryId = formData.get('category_id') as string;
  const priceRaw = formData.get('price') as string;
  const imageUrl = formData.get('image_url') as string | null;
  const description = formData.get('description') as string | null;
  const shortDescription = formData.get('short_description') as string | null;
  const specsRaw = formData.get('specs') as string;
  const featuresRaw = formData.get('features') as string;
  const faqRaw = formData.get('faq') as string;
  const isActive = formData.get('is_active') === 'true';
  const isCustomPage = formData.get('is_custom_page') === 'true';

  // Validate required fields
  if (!name || name.trim() === '') {
    return { success: false, error: 'Le nom du produit est requis' };
  }

  if (!categoryId) {
    return { success: false, error: 'La catégorie est requise' };
  }

  const price = parseInt(priceRaw, 10);
  if (isNaN(price) || price < 0) {
    return { success: false, error: 'Le prix doit être un nombre positif' };
  }

  // Parse JSON fields
  let specs: Record<string, string | number> = {};
  let features: Array<{ icon: string; title: string; description: string }> = [];
  let faq: Array<{ question: string; answer: string }> = [];

  try {
    specs = specsRaw ? JSON.parse(specsRaw) : {};
  } catch {
    return { success: false, error: 'Format des spécifications invalide' };
  }

  try {
    features = featuresRaw ? JSON.parse(featuresRaw) : [];
  } catch {
    return { success: false, error: 'Format des fonctionnalités invalide' };
  }

  try {
    faq = faqRaw ? JSON.parse(faqRaw) : [];
  } catch {
    return { success: false, error: 'Format de la FAQ invalide' };
  }

  // Fetch category to get spec_fields for validation
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('spec_fields')
    .eq('id', categoryId)
    .single();

  if (categoryError || !category) {
    return { success: false, error: 'Catégorie non trouvée' };
  }

  // Validate required spec_fields
  const specFields = category.spec_fields as SpecField[];
  if (!validateRequiredSpecFields(specs, specFields)) {
    return { success: false, error: 'Tous les champs obligatoires doivent être remplis' };
  }

  const slug = slugify(name);

  // Sync with Stripe
  let stripeProductId = currentProduct.stripe_product_id;
  let stripePriceId = currentProduct.stripe_price_id;

  try {
    if (stripeProductId) {
      // Update product info on Stripe (name, description, image)
      const productInfoChanged = 
        name.trim() !== currentProduct.name ||
        (description || '') !== (currentProduct.description || '') ||
        (imageUrl || '') !== (currentProduct.image_url || '');

      if (productInfoChanged) {
        await updateStripeProduct(stripeProductId, {
          name: name.trim(),
          description: description || undefined,
          imageUrl: imageUrl || undefined,
        });
      }

      // If price changed, create new price and archive old one
      if (price !== currentProduct.price && stripePriceId) {
        stripePriceId = await updateStripePrice(stripeProductId, stripePriceId, price);
      }
    } else {
      // No Stripe product yet, create one
      const stripeResult = await createStripeProduct({
        name: name.trim(),
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        priceInCents: price,
      });
      stripeProductId = stripeResult.productId;
      stripePriceId = stripeResult.priceId;
    }
  } catch (stripeError) {
    console.error('Stripe sync error:', stripeError);
    // Continue with local update even if Stripe fails
  }

  const { error } = await supabase
    .from('products')
    .update({
      name: name.trim(),
      slug,
      category_id: categoryId,
      price,
      image_url: imageUrl || null,
      description: description || null,
      short_description: shortDescription || null,
      specs,
      features,
      faq,
      stripe_product_id: stripeProductId,
      stripe_price_id: stripePriceId,
      is_active: isActive,
      is_custom_page: isCustomPage,
    })
    .eq('id', id);

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'Ce slug existe déjà pour cette catégorie' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/products');
  revalidatePath(`/administrator/products/${id}`);
  return { success: true };
}

/**
 * Delete a product.
 * Prevents deletion if the product has associated order items.
 * 
 * @param id - The UUID of the product to delete
 * @returns ActionResult indicating success or failure
 * 
 * Validates: Requirements 5.6, 5.7
 */
export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de produit invalide' };
  }

  // Check for associated order items
  const { count, error: countError } = await supabase
    .from('order_items')
    .select('*', { count: 'exact', head: true })
    .eq('product_id', id);

  if (countError) {
    return { success: false, error: countError.message };
  }

  if (count && count > 0) {
    return { 
      success: false, 
      error: 'Impossible de supprimer un produit avec des commandes associées' 
    };
  }

  // Get product to archive on Stripe
  const { data: product } = await supabase
    .from('products')
    .select('stripe_product_id')
    .eq('id', id)
    .single();

  // Archive on Stripe if product exists there
  if (product?.stripe_product_id) {
    try {
      await archiveStripeProduct(product.stripe_product_id);
    } catch (stripeError) {
      console.error('Stripe archive error:', stripeError);
      // Continue with deletion even if Stripe fails
    }
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/products');
  return { success: true };
}

/**
 * Toggle the active status of a product.
 * 
 * @param id - The UUID of the product to toggle
 * @returns ActionResult indicating success or failure
 * 
 * Validates: Requirements 5.4
 */
export async function toggleActive(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de produit invalide' };
  }

  // First, get the current product
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('is_active, stripe_product_id')
    .eq('id', id)
    .single();

  if (fetchError || !product) {
    return { success: false, error: 'Produit non trouvé' };
  }

  const newActiveStatus = !product.is_active;

  // Sync with Stripe - archive if deactivating, reactivate if activating
  if (product.stripe_product_id) {
    try {
      const { stripe } = await import('@/lib/stripe');
      await stripe.products.update(product.stripe_product_id, {
        active: newActiveStatus,
      });
    } catch (stripeError) {
      console.error('Stripe sync error:', stripeError);
      // Continue with local update even if Stripe fails
    }
  }

  // Toggle the status
  const { error } = await supabase
    .from('products')
    .update({ is_active: newActiveStatus })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/administrator/products');
  revalidatePath(`/administrator/products/${id}`);
  return { success: true, data: { is_active: newActiveStatus } };
}


/**
 * Duplicate an existing product.
 * Creates a copy with " (copie)" appended to the name.
 * Clears the stripe_price_id as it should be unique per product.
 * 
 * @param id - The UUID of the product to duplicate
 * @returns ActionResult indicating success or failure with the new product ID
 */
export async function duplicateProduct(id: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!id) {
    return { success: false, error: 'ID de produit invalide' };
  }

  // Fetch the original product
  const { data: original, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !original) {
    return { success: false, error: 'Produit non trouvé' };
  }

  // Generate new name and slug
  const newName = `${original.name} (copie)`;
  const newSlug = slugify(newName);

  // Insert the duplicate (without stripe_price_id)
  const { data: newProduct, error: insertError } = await supabase
    .from('products')
    .insert({
      name: newName,
      slug: newSlug,
      category_id: original.category_id,
      price: original.price,
      image_url: original.image_url,
      description: original.description,
      short_description: original.short_description,
      specs: original.specs,
      features: original.features,
      faq: original.faq,
      stripe_price_id: null, // Clear stripe_price_id for the copy
      is_active: false, // Set as inactive by default
      is_custom_page: original.is_custom_page,
    })
    .select('id')
    .single();

  if (insertError) {
    if (insertError.code === '23505') {
      return { success: false, error: 'Un produit avec ce nom existe déjà dans cette catégorie' };
    }
    return { success: false, error: insertError.message };
  }

  revalidatePath('/administrator/products');
  return { success: true, data: { id: newProduct.id } };
}
