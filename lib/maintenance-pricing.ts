// lib/maintenance-pricing.ts

import type {
  MaintenanceService,
  MaintenanceOption,
  PricingSummary,
  BillingPeriod,
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
 * Supporte les quantités multiples et les deux modes de facturation (mensuel/annuel).
 *
 * Ordre de calcul :
 * 1. Remise multi-équipements sur les services uniquement (basée sur le nombre total de services)
 * 2. Remise annuelle "2 mois offerts" si billingPeriod === 'yearly' (annuel = mensuel × 10)
 * 3. Les options flat fee (is_flat_fee=true) sont un forfait unique ajouté au total annuel
 *
 * Tous les prix sont en centimes (integers), Math.round pour les divisions.
 */
export function calculatePricing(
  services: MaintenanceService[],
  options: MaintenanceOption[],
  selectedServiceIds: string[],
  selectedOptionIds: string[],
  billingPeriod: BillingPeriod = 'yearly'
): PricingSummary {
  // Count service quantities (serviceIds can have duplicates for multiple quantities)
  const serviceQuantities: Record<string, number> = {};
  for (const id of selectedServiceIds) {
    serviceQuantities[id] = (serviceQuantities[id] || 0) + 1;
  }

  const selectedServices = services.filter(s => selectedServiceIds.includes(s.id));
  const selectedOptions = options.filter(o => selectedOptionIds.includes(o.id));

  // Séparer options flat fee vs récurrentes
  const flatFeeOptions = selectedOptions.filter(o => o.is_flat_fee);
  const recurringOptions = selectedOptions.filter(o => !o.is_flat_fee);

  // Total brut services (mensuel) avec quantités
  let servicesSubtotal = 0;
  let totalServiceCount = 0;
  for (const service of selectedServices) {
    const qty = serviceQuantities[service.id] || 1;
    servicesSubtotal += service.price_monthly * qty;
    totalServiceCount += qty;
  }

  // Remise multi-équipements (basée sur le nombre total de services)
  const discountMultiPercent = getMultiDiscount(totalServiceCount);
  const discountMultiAmount = Math.round(servicesSubtotal * discountMultiPercent / 100);
  const servicesAfterMulti = servicesSubtotal - discountMultiAmount;

  // Options récurrentes
  const optionsTotal = recurringOptions.reduce((sum, o) => sum + o.price_monthly, 0);

  // Forfaits uniques (flat fee)
  const flatFeeTotal = flatFeeOptions.reduce((sum, o) => sum + o.price_monthly, 0);

  // Total mensuel (services après remise multi + options récurrentes)
  const totalMonthly = servicesAfterMulti + optionsTotal;

  // Remise annuelle "2 mois offerts" (~16.67%)
  const discountAnnualPercent = billingPeriod === 'yearly' ? 16.67 : 0;
  const discountAnnualAmount = billingPeriod === 'yearly' ? Math.round(totalMonthly * 2) : 0; // 2 mois offerts

  // Total annuel (10 mois au lieu de 12 si yearly + flat fees)
  const totalAnnual = billingPeriod === 'yearly'
    ? (totalMonthly * 10) + flatFeeTotal  // 2 mois offerts = 10 mois
    : (totalMonthly * 12) + flatFeeTotal;

  // Économies grâce à la remise multi
  const savingsTotal = discountMultiAmount * 12;

  return {
    servicesSubtotal,
    discountMultiPercent,
    discountMultiAmount,
    servicesAfterMulti,
    optionsTotal: optionsTotal + flatFeeTotal,
    discountAnnualPercent,
    discountAnnualAmount,
    totalMonthly,
    totalAnnual,
    totalDisplay: billingPeriod === 'yearly' ? totalAnnual : totalMonthly,
    savingsTotal,
    flatFeeTotal,
  };
}
