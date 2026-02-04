'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerActionClient } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';
import type { OrderStatus } from '@/types/database';

/**
 * Result type for server actions
 */
export interface ActionResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

/**
 * Valid status transitions based on the order status flow:
 * - pending → paid → shipped → delivered
 * - pending → cancelled
 * - paid → cancelled
 */
const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
};

/**
 * Update the status of an order.
 * Validates that the status transition is allowed according to the order flow.
 * 
 * @param orderId - The UUID of the order to update
 * @param newStatus - The new status to set
 * @returns ActionResult indicating success or failure
 * 
 * Validates: Requirements 6.3
 */
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus
): Promise<ActionResult> {
  const supabase = await createSupabaseServerActionClient();
  await requireAdmin();

  if (!orderId) {
    return { success: false, error: 'ID de commande invalide' };
  }

  const validStatuses: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(newStatus)) {
    return { success: false, error: 'Statut invalide' };
  }

  // Fetch the current order to check the current status
  const { data: order, error: fetchError } = await supabase
    .from('orders')
    .select('id, status')
    .eq('id', orderId)
    .single();

  if (fetchError || !order) {
    return { success: false, error: 'Commande non trouvée' };
  }

  const currentStatus = order.status as OrderStatus;

  // Check if the transition is valid
  const allowedTransitions = VALID_TRANSITIONS[currentStatus];
  if (!allowedTransitions.includes(newStatus)) {
    return {
      success: false,
      error: `Transition de statut non autorisée: ${currentStatus} → ${newStatus}`,
    };
  }

  // Update the order status
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePath('/administrator/orders');
  revalidatePath(`/administrator/orders/${orderId}`);
  return { success: true };
}
