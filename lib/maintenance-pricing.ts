// lib/maintenance-pricing.ts

import type {
  MaintenanceService,
  MaintenanceOption,
  PricingSummary,
} from '@/types/maintenance';

/**
 * Retourne le pourcentage de remise multi-équipements selon le nombre de services.
 * 1 service = 0%, 2 = 5%, 3 = 10%, 4+ = 15%
 */
export function getMultiDiscount(serviceCount: number): number {
  if (serviceCount >= 4) return 15;
  if (serviceCount === 3) return 10;
  if (serviceCount === 2) return 5;
  return 0;
}

/**
 * Calcule le récapitulatif de pricing pour une sélection de services et options.
 * Facturation annuelle uniquement, avec remise multi-équipements.
 *
 * Ordre de calcul :
 * 1. Remise multi-équipements sur les services uniquement
 * 2. Les options flat fee (is_flat_fee=true) sont un forfait unique ajouté au total annuel
 *
 * Tous les prix sont en centimes (integers), Math.round pour les divisions.
 */
export function calculatePricing(
  services: MaintenanceService[],
  options: MaintenanceOption[],
  selectedServiceIds: string[],
  selectedOptionIds: string[]
): PricingSummary {
  const selectedServices = services.filter(s => selectedServiceIds.includes(s.id));
  const selectedOptions = options.filter(o => selectedOptionIds.includes(o.id));

  // Séparer options flat fee vs récurrentes
  const flatFeeOptions = selectedOptions.filter(o => o.is_flat_fee);
  const recurringOptions = selectedOptions.filter(o => !o.is_flat_fee);

  // Total brut services (mensuel)
  const servicesSubtotal = selectedServices.reduce((sum, s) => sum + s.price_monthly, 0);

  // Remise multi-équipements (services uniquement)
  const discountMultiPercent = getMultiDiscount(selectedServices.length);
  const discountMultiAmount = Math.round(servicesSubtotal * discountMultiPercent / 100);
  const servicesAfterMulti = servicesSubtotal - discountMultiAmount;

  // Options récurrentes
  const optionsTotal = recurringOptions.reduce((sum, o) => sum + o.price_monthly, 0);

  // Forfaits uniques (flat fee)
  const flatFeeTotal = flatFeeOptions.reduce((sum, o) => sum + o.price_monthly, 0);

  // Total mensuel (indicatif)
  const totalMonthly = servicesAfterMulti + optionsTotal;

  // Total annuel (ce qui sera facturé)
  const totalAnnual = totalMonthly * 12 + flatFeeTotal;

  // Économies grâce à la remise multi
  const savingsTotal = discountMultiAmount * 12;

  return {
    servicesSubtotal,
    discountMultiPercent,
    discountMultiAmount,
    servicesAfterMulti,
    optionsTotal: optionsTotal + flatFeeTotal,
    discountAnnualPercent: 0, // Plus de remise annuelle
    discountAnnualAmount: 0,
    totalMonthly,
    totalAnnual,
    totalDisplay: totalAnnual, // Toujours annuel
    savingsTotal,
    flatFeeTotal,
  };
}
