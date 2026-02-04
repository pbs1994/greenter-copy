'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCategory } from '@/app/administrator/actions/categories';

interface DeleteCategoryButtonProps {
  categoryId: string;
  hasProducts: boolean;
}

export function DeleteCategoryButton({ categoryId, hasProducts }: DeleteCategoryButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      return;
    }

    startTransition(async () => {
      const result = await deleteCategory(categoryId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Erreur lors de la suppression');
      }
    });
  };

  if (hasProducts) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-400 bg-neutral-100 rounded-lg cursor-not-allowed"
        title="Impossible de supprimer une catégorie avec des produits associés"
      >
        <TrashIcon className="w-4 h-4" />
        Supprimer
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      <TrashIcon className="w-4 h-4" />
      {isPending ? 'Suppression...' : 'Supprimer'}
    </button>
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
