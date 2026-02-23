'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { duplicateCategory } from '@/app/administrator/actions/categories';

interface DuplicateCategoryButtonProps {
  categoryId: string;
}

export function DuplicateCategoryButton({ categoryId }: DuplicateCategoryButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDuplicate = () => {
    startTransition(async () => {
      const result = await duplicateCategory(categoryId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Erreur lors de la duplication');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDuplicate}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
    >
      <CopyIcon className="w-4 h-4" />
      {isPending ? 'Duplication...' : 'Dupliquer'}
    </button>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
      />
    </svg>
  );
}
