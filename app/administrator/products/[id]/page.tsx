import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { ProductForm } from '@/components/administrator/ProductForm';
import Link from 'next/link';
import type { Product, Category } from '@/types/database';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  // Query the product by ID with its category
  const { data: product, error: productError } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .single();

  // Show 404 if product not found
  if (productError || !product) {
    notFound();
  }

  // Query all categories from Supabase to pass to the form
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (categoriesError) {
    return (
      <div>
        <div className="mb-6">
          <Link
            href="/administrator/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour aux produits
          </Link>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">
            Modifier le produit
          </h1>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des catégories: {categoriesError.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with back link */}
      <div className="mb-6">
        <Link
          href="/administrator/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour aux produits
        </Link>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Modifier le produit
        </h1>
        <p className="text-neutral-500 mt-1">
          Modifiez les informations du produit. Les champs de spécification dépendent de la catégorie sélectionnée.
        </p>
      </div>

      {/* Product form in edit mode */}
      <ProductForm 
        product={product as Product} 
        categories={(categories || []) as Category[]} 
        mode="edit" 
      />
    </div>
  );
}

// Icon component
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}
