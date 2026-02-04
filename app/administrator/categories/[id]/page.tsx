import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { CategoryForm } from '@/components/administrator/CategoryForm';
import Link from 'next/link';
import type { Category } from '@/types/database';

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const { id } = await params;

  // Query the category by ID
  const supabase = await createSupabaseServerClient();
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  // Show 404 if category not found
  if (error || !category) {
    notFound();
  }

  return (
    <div>
      {/* Header with back link */}
      <div className="mb-6">
        <Link
          href="/administrator/categories"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour aux catégories
        </Link>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Modifier la catégorie
        </h1>
        <p className="text-neutral-500 mt-1">
          Modifiez les informations et les champs de spécification de la catégorie
        </p>
      </div>

      {/* Category form in edit mode */}
      <CategoryForm mode="edit" category={category as Category} />
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
