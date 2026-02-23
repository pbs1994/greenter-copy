'use client';

import { useTransition } from 'react';
import {
  deleteService,
  toggleServiceActive,
  deleteOption,
  toggleOptionActive,
} from '@/app/administrator/actions/maintenance';

// ─── Service Actions ─────────────────────────────────────────────────────────

interface ToggleServiceActiveButtonProps {
  serviceId: string;
  isActive: boolean;
}

export function ToggleServiceActiveButton({ serviceId, isActive }: ToggleServiceActiveButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleServiceActive(serviceId);
      if (!result.success) {
        alert(result.error || 'Erreur lors du changement de statut');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
        isActive
          ? 'text-yellow-700 bg-yellow-50 hover:bg-yellow-100'
          : 'text-green-700 bg-green-50 hover:bg-green-100'
      }`}
      title={isActive ? 'Désactiver le service' : 'Activer le service'}
    >
      <ToggleIcon className="w-4 h-4" />
      {isPending ? '...' : isActive ? 'Désactiver' : 'Activer'}
    </button>
  );
}

interface DeleteServiceButtonProps {
  serviceId: string;
}

export function DeleteServiceButton({ serviceId }: DeleteServiceButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      return;
    }
    startTransition(async () => {
      const result = await deleteService(serviceId);
      if (!result.success) {
        alert(result.error || 'Erreur lors de la suppression');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      <TrashIcon className="w-4 h-4" />
      {isPending ? '...' : 'Supprimer'}
    </button>
  );
}

// ─── Option Actions ──────────────────────────────────────────────────────────

interface ToggleOptionActiveButtonProps {
  optionId: string;
  isActive: boolean;
}

export function ToggleOptionActiveButton({ optionId, isActive }: ToggleOptionActiveButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleOptionActive(optionId);
      if (!result.success) {
        alert(result.error || 'Erreur lors du changement de statut');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
        isActive
          ? 'text-yellow-700 bg-yellow-50 hover:bg-yellow-100'
          : 'text-green-700 bg-green-50 hover:bg-green-100'
      }`}
      title={isActive ? "Désactiver l'option" : "Activer l'option"}
    >
      <ToggleIcon className="w-4 h-4" />
      {isPending ? '...' : isActive ? 'Désactiver' : 'Activer'}
    </button>
  );
}

interface DeleteOptionButtonProps {
  optionId: string;
}

export function DeleteOptionButton({ optionId }: DeleteOptionButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette option ?')) {
      return;
    }
    startTransition(async () => {
      const result = await deleteOption(optionId);
      if (!result.success) {
        alert(result.error || 'Erreur lors de la suppression');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      <TrashIcon className="w-4 h-4" />
      {isPending ? '...' : 'Supprimer'}
    </button>
  );
}

// ─── Icon Components ─────────────────────────────────────────────────────────

function ToggleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
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
