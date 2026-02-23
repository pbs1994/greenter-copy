import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatEUR } from '@/lib/format';
import Link from 'next/link';
import type { Product, Category } from '@/types/database';
import { ToggleActiveButton, DeleteProductButton, DuplicateProductButton } from './ProductActions';

// Extended product type with category info
interface ProductWithCategory extends Product {
  category: Category | null;
}

interface Props {
  searchParams: Promise<{ category?: string; status?: string }>;
}

export default async function ProductsListPage({ searchParams }: Props) {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const params = await searchParams;
  const categoryFilter = params.category || '';
  const statusFilter = params.status || 'all';

  const supabase = await createSupabaseServerClient();

  // Query all categories for the filter dropdown
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true });

  // Build products query with filters
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .order('created_at', { ascending: false });

  // Apply category filter
  if (categoryFilter) {
    query = query.eq('category_id', categoryFilter);
  }

  // Apply active status filter
  if (statusFilter === 'active') {
    query = query.eq('is_active', true);
  } else if (statusFilter === 'inactive') {
    query = query.eq('is_active', false);
  }

  const { data: products, error } = await query;

  const productsWithCategory = (products || []) as ProductWithCategory[];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Produits
        </h1>
        <Link
          href="/administrator/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Ajouter un produit
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 mb-6">
        <form method="GET" className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
              Catégorie
            </label>
            <select
              id="category"
              name="category"
              defaultValue={categoryFilter}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Toutes les catégories</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Active Status Filter */}
          <div className="flex-1">
            <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
              Statut
            </label>
            <select
              id="status"
              name="status"
              defaultValue={statusFilter}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">Tous</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>

          {/* Filter Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Filtrer
            </button>
          </div>
        </form>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des produits: {error.message}
          </p>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {productsWithCategory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {productsWithCategory.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <ProductIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 mb-4">Aucun produit pour le moment</p>
            <Link
              href="/administrator/products/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
            >
              <PlusIcon className="w-4 h-4" />
              Créer votre premier produit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Product row component with actions
function ProductRow({ product }: { product: ProductWithCategory }) {
  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-neutral-900">{product.name}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">
          {product.category?.name || 'Sans catégorie'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-neutral-900">
          {formatEUR(product.price)}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          {product.is_active ? 'Actif' : 'Inactif'}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <ToggleActiveButton productId={product.id} isActive={product.is_active} />
          <Link
            href={`/administrator/products/${product.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <EditIcon className="w-4 h-4" />
            Modifier
          </Link>
          <DuplicateProductButton productId={product.id} />
          <DeleteProductButton productId={product.id} />
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

function ProductIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
}
