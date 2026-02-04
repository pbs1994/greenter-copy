'use client';

import { useState, useTransition } from 'react';
import { updateOrderStatus } from '@/app/administrator/actions/orders';
import type { OrderStatus } from '@/types/database';

interface OrderStatusDropdownProps {
  orderId: string;
  currentStatus: OrderStatus;
  validTransitions: OrderStatus[];
  statusLabels: Record<OrderStatus, string>;
}

/**
 * Client component for updating order status.
 * Shows only valid transitions based on the current status.
 * 
 * Validates: Requirements 6.3, 6.4
 */
export function OrderStatusDropdown({
  orderId,
  currentStatus,
  validTransitions,
  statusLabels,
}: OrderStatusDropdownProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');

  const handleStatusChange = async () => {
    if (!selectedStatus) return;

    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, selectedStatus);

      if (result.success) {
        setSuccess(`Statut mis à jour: ${statusLabels[selectedStatus]}`);
        setSelectedStatus('');
      } else {
        setError(result.error || 'Une erreur est survenue');
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
          disabled={isPending}
          className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
        >
          <option value="">Sélectionner un nouveau statut</option>
          {validTransitions.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
        <button
          onClick={handleStatusChange}
          disabled={isPending || !selectedStatus}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
        >
          {isPending ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {/* Help text showing valid transitions */}
      <p className="text-xs text-neutral-500">
        Transitions disponibles depuis le statut actuel:{' '}
        {validTransitions.map((s) => statusLabels[s]).join(', ')}
      </p>
    </div>
  );
}
