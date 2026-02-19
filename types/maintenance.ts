// types/maintenance.ts

export interface MaintenanceService {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_monthly: number; // centimes
  icon: string;
  includes: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface MaintenanceOption {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_monthly: number; // centimes (mensuel si is_flat_fee=false, forfait unique si is_flat_fee=true)
  icon: string;
  is_active: boolean;
  is_flat_fee: boolean;
  exempt_from_discount: boolean;
  sort_order: number;
  created_at: string;
}

export type BillingPeriod = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'paused';

export interface MaintenanceSubscription {
  id: string;
  customer_id: string;
  stripe_subscription_id: string | null;
  billing_period: BillingPeriod;
  status: SubscriptionStatus;
  total_monthly: number; // centimes, avant remises
  discount_multi_percent: number;
  discount_annual_percent: number;
  total_after_discounts: number; // centimes, montant final
  created_at: string;
  cancelled_at: string | null;
}

export interface MaintenanceSubscriptionItem {
  id: string;
  subscription_id: string;
  item_type: 'service' | 'option';
  maintenance_service_id: string | null;
  maintenance_option_id: string | null;
  name: string;
  unit_price: number; // centimes
}

// Types pour le configurateur côté client
export interface ConfiguratorState {
  selectedServices: string[]; // IDs des services sélectionnés
  selectedOptions: string[]; // IDs des options sélectionnées
  billingPeriod: BillingPeriod;
}

export interface PricingSummary {
  servicesSubtotal: number; // centimes, total brut services
  discountMultiPercent: number;
  discountMultiAmount: number; // centimes
  servicesAfterMulti: number; // centimes
  optionsTotal: number; // centimes
  discountAnnualPercent: number;
  discountAnnualAmount: number; // centimes
  totalMonthly: number; // centimes
  totalAnnual: number; // centimes
  totalDisplay: number; // centimes, selon billingPeriod
  savingsTotal: number; // centimes, économies totales vs prix plein
  flatFeeTotal: number; // centimes, total des forfaits uniques
}
