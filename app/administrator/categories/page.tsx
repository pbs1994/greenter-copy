import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import type { Category } from '@/types/database';
import { DeleteCategoryButton } from './DeleteCategoryButton';
import { DuplicateCategoryButton } from './DuplicateCategoryButton';

// Extended category type with product count
interface CategoryWithProductCount extends Category {
  product_count: number;
}

export default async function CategoriesListPage() {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const supabase = await createSupabaseServerClient();

  // Query all categories with product count
  const { data: categories, error } = await supabase
    .from('categories')
    .select(`
      *,
      products:products(count)
    `)
    .order('created_at', { ascending: false });

  // Transform the data to include product count
  const categoriesWithCount: CategoryWithProductCount[] = (categories || []).map((cat) => ({
    ...cat,
    product_count: (cat.products as { count: number }[])?.[0]?.count || 0,
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Catégories
        </h1>
        <Link
          href="/administrator/categories/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Ajouter une catégorie
        </Link>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des catégories: {error.message}
          </p>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {categoriesWithCount.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Champs de spécification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Produits
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {categoriesWithCount.map((category) => (
                  <CategoryRow key={category.id} category={category} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <CategoryIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 mb-4">Aucune catégorie pour le moment</p>
            <Link
              href="/administrator/categories/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
            >
              <PlusIcon className="w-4 h-4" />
              Créer votre première catégorie
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Category row component with delete action
function CategoryRow({ category }: { category: CategoryWithProductCount }) {
  const specFieldsCount = category.spec_fields?.length || 0;

  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-neutral-900">{category.name}</span>
      </td>
      <td className="px-6 py-4">
        <code className="text-sm text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
          {category.slug}
        </code>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">
          {specFieldsCount} {specFieldsCount === 1 ? 'champ' : 'champs'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">
          {category.product_count} {category.product_count === 1 ? 'produit' : 'produits'}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/administrator/categories/${category.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <EditIcon className="w-4 h-4" />
            Modifier
          </Link>
          <DuplicateCategoryButton categoryId={category.id} />
          <DeleteCategoryButton categoryId={category.id} hasProducts={category.product_count > 0} />
        </div>
      </td>
    </tr>
  );
}



// Icon components
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}

function CategoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
      />
    </svg>
  );
}
