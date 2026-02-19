// lib/maintenance-pricing.test.ts

import * as fc from 'fast-check';
import { getMultiDiscount, calculatePricing } from './maintenance-pricing';
import type { MaintenanceService, MaintenanceOption, BillingPeriod } from '@/types/maintenance';

// ─── Helpers / Generators ───────────────────────────────────────────────────

/** Create a MaintenanceService with a given price (centimes, positive integer). */
function makeService(id: string, priceMonthly: number): MaintenanceService {
  return {
    id,
    name: `Service ${id}`,
    slug: `service-${id}`,
    description: null,
    price_monthly: priceMonthly,
    icon: 'Wrench',
    includes: ['1 intervention annuelle'],
    is_active: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
  };
}

/** Create a MaintenanceOption. */
function makeOption(
  id: string,
  priceMonthly: number,
  exemptFromDiscount: boolean,
  isFlatFee = false
): MaintenanceOption {
  return {
    id,
    name: `Option ${id}`,
    slug: `option-${id}`,
    description: null,
    price_monthly: priceMonthly,
    icon: 'Zap',
    is_active: true,
    is_flat_fee: isFlatFee,
    exempt_from_discount: exemptFromDiscount,
    sort_order: 0,
    created_at: new Date().toISOString(),
  };
}

/** Arbitrary for a positive price in centimes (1–100_000). */
const arbPrice = fc.integer({ min: 1, max: 100_000 });

/** Arbitrary for a non-empty list of services (1–8 services). */
const arbServices = fc
  .array(arbPrice, { minLength: 1, maxLength: 8 })
  .map((prices) => prices.map((p, i) => makeService(`s${i}`, p)));

/** Arbitrary for a list of options (0–4 options) with random exempt flag. */
const arbOptions = fc
  .array(fc.tuple(arbPrice, fc.boolean(), fc.boolean()), { minLength: 0, maxLength: 4 })
  .map((items) =>
    items.map(([p, exempt, flatFee], i) => makeOption(`o${i}`, p, exempt, flatFee))
  );

/** Arbitrary billing period. */
const arbBillingPeriod: fc.Arbitrary<BillingPeriod> = fc.constantFrom(
  'monthly' as BillingPeriod,
  'yearly' as BillingPeriod
);

// ─── Unit Tests ─────────────────────────────────────────────────────────────

describe('getMultiDiscount – unit tests', () => {
  it('returns 0% for 1 service', () => {
    expect(getMultiDiscount(1)).toBe(0);
  });

  it('returns 5% for 2 services', () => {
    expect(getMultiDiscount(2)).toBe(5);
  });

  it('returns 10% for 3 services', () => {
    expect(getMultiDiscount(3)).toBe(10);
  });

  it('returns 15% for 4 services', () => {
    expect(getMultiDiscount(4)).toBe(15);
  });

  it('returns 15% for 6 services (capped)', () => {
    expect(getMultiDiscount(6)).toBe(15);
  });

  it('returns 0% for 0 services', () => {
    expect(getMultiDiscount(0)).toBe(0);
  });
});

describe('calculatePricing – unit tests', () => {
  const svc1 = makeService('a', 1500);
  const svc2 = makeService('b', 2500);
  const svc3 = makeService('c', 2000);
  const svc4 = makeService('d', 1500);
  const exemptOpt = makeOption('x', 5000, true);
  const discountableOpt = makeOption('y', 3000, false);

  it('computes correctly for 1 service, monthly', () => {
    const result = calculatePricing([svc1], [], ['a'], [], 'monthly');
    expect(result.discountMultiPercent).toBe(0);
    expect(result.discountMultiAmount).toBe(0);
    expect(result.servicesAfterMulti).toBe(1500);
    expect(result.totalMonthly).toBe(1500);
    expect(result.savingsTotal).toBe(0);
  });

  it('computes 5% multi discount for 2 services', () => {
    const result = calculatePricing(
      [svc1, svc2], [], ['a', 'b'], [], 'monthly'
    );
    expect(result.discountMultiPercent).toBe(5);
    // (1500+2500)*5/100 = 200
    expect(result.discountMultiAmount).toBe(200);
    expect(result.servicesAfterMulti).toBe(3800);
    expect(result.totalMonthly).toBe(3800);
  });

  it('does not apply discount to exempt options', () => {
    const result = calculatePricing(
      [svc1, svc2], [exemptOpt], ['a', 'b'], ['x'], 'yearly'
    );
    // Services: 4000, multi 5% = 200, after multi = 3800
    // Exempt option: 5000 (no discount)
    // Annual 10% on discountable (3800 + 0) = 380
    // totalMonthly = 3800 + 5000 - 380 = 8420
    expect(result.totalMonthly).toBe(8420);
    // Full price monthly = 4000 + 5000 = 9000
    // Full annual = 108000, actual annual = 8420*12 = 101040
    expect(result.savingsTotal).toBe(108000 - 101040);
  });

  it('applies annual discount on non-exempt options', () => {
    const result = calculatePricing(
      [svc1], [discountableOpt], ['a'], ['y'], 'yearly'
    );
    // Services: 1500, multi 0%, after multi = 1500
    // Discountable option: 3000
    // Annual 10% on (1500 + 3000) = 450
    // totalMonthly = 1500 + 3000 - 450 = 4050
    expect(result.discountAnnualAmount).toBe(450);
    expect(result.totalMonthly).toBe(4050);
  });

  it('total is always positive with at least one service', () => {
    const result = calculatePricing(
      [svc1, svc2, svc3, svc4],
      [exemptOpt, discountableOpt],
      ['a', 'b', 'c', 'd'],
      ['x', 'y'],
      'yearly'
    );
    expect(result.totalMonthly).toBeGreaterThan(0);
    expect(result.totalAnnual).toBeGreaterThan(0);
  });
});

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 1: Calcul remise multi-équipements', () => {
  /**
   * **Validates: Requirements 5.1, 5.2, 5.3**
   *
   * Pour tout ensemble de N services sélectionnés (N ≥ 1),
   * la remise multi DOIT être : 0% si N=1, 5% si N=2, 10% si N=3, 15% si N≥4.
   */
  it('getMultiDiscount returns the correct tier for any service count', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 50 }), (n) => {
        const discount = getMultiDiscount(n);
        if (n === 1) return discount === 0;
        if (n === 2) return discount === 5;
        if (n === 3) return discount === 10;
        return discount === 15; // n >= 4
      }),
      { numRuns: 200 }
    );
  });

  /**
   * **Validates: Requirements 5.1, 5.2, 5.3**
   *
   * calculatePricing must apply the correct multi-discount percentage
   * matching the number of selected services.
   */
  it('calculatePricing applies the correct multi-discount percent', () => {
    fc.assert(
      fc.property(arbServices, (services) => {
        const ids = services.map((s) => s.id);
        const result = calculatePricing(services, [], ids, [], 'monthly');

        const expected = getMultiDiscount(services.length);
        return result.discountMultiPercent === expected;
      }),
      { numRuns: 200 }
    );
  });
});

describe('Property 2: Remise non appliquée aux options exemptées', () => {
  /**
   * **Validates: Requirements 5.4, 5.6**
   *
   * Pour toute option récurrente avec exempt_from_discount=true,
   * son prix NE DOIT PAS être affecté par les remises multi ou annuelle.
   */
  it('exempt recurring options contribute their full price regardless of discounts', () => {
    fc.assert(
      fc.property(
        arbServices,
        fc.array(arbPrice, { minLength: 1, maxLength: 4 }),
        arbBillingPeriod,
        (services, exemptPrices, billing) => {
          const exemptOptions = exemptPrices.map((p, i) =>
            makeOption(`ex${i}`, p, true, false) // recurring, exempt
          );
          const svcIds = services.map((s) => s.id);
          const optIds = exemptOptions.map((o) => o.id);

          // Calculate WITH exempt options
          const withOpts = calculatePricing(
            services, exemptOptions, svcIds, optIds, billing
          );
          // Calculate WITHOUT options
          const withoutOpts = calculatePricing(
            services, [], svcIds, [], billing
          );

          const exemptTotal = exemptOptions.reduce(
            (sum, o) => sum + o.price_monthly, 0
          );

          // The difference in monthly total should be exactly the exempt options total
          // (since exempt options are not discounted at all)
          return withOpts.totalMonthly - withoutOpts.totalMonthly === exemptTotal;
        }
      ),
      { numRuns: 200 }
    );
  });
});

describe('Property 3: Ordre d\'application des remises', () => {
  /**
   * **Validates: Requirements 5.5, 5.7**
   *
   * Pour tout calcul avec remise multi ET remise annuelle,
   * le total final DOIT être égal à :
   * (services × (1 - multi%)) × (1 - annuel%) + options_exemptées + flat_fee/12
   */
  it('discount order: multi first, then annual on (services_after_multi + discountable_options)', () => {
    fc.assert(
      fc.property(
        arbServices,
        arbOptions,
        (services, options) => {
          const svcIds = services.map((s) => s.id);
          const optIds = options.map((o) => o.id);

          const result = calculatePricing(
            services, options, svcIds, optIds, 'yearly'
          );

          const servicesSubtotal = services.reduce(
            (sum, s) => sum + s.price_monthly, 0
          );
          const multiPercent = getMultiDiscount(services.length);
          const multiAmount = Math.round(servicesSubtotal * multiPercent / 100);
          const servicesAfterMulti = servicesSubtotal - multiAmount;

          // Séparer options par type
          const recurringOptions = options.filter((o) => !o.is_flat_fee);
          const flatFeeOptions = options.filter((o) => o.is_flat_fee);

          const exemptTotal = recurringOptions
            .filter((o) => o.exempt_from_discount)
            .reduce((sum, o) => sum + o.price_monthly, 0);
          const discountableTotal = recurringOptions
            .filter((o) => !o.exempt_from_discount)
            .reduce((sum, o) => sum + o.price_monthly, 0);
          const flatFeeTotal = flatFeeOptions.reduce(
            (sum, o) => sum + o.price_monthly, 0
          );

          const discountableSum = servicesAfterMulti + discountableTotal;
          const annualAmount = Math.round(discountableSum * 10 / 100);

          const totalMonthlyRecurring =
            servicesAfterMulti + discountableTotal + exemptTotal - annualAmount;
          const expectedMonthly = totalMonthlyRecurring + Math.round(flatFeeTotal / 12);

          return result.totalMonthly === expectedMonthly;
        }
      ),
      { numRuns: 200 }
    );
  });
});

describe('Property 4: Total toujours positif', () => {
  /**
   * **Validates: Requirements 5.1, 5.2, 5.3, 5.5**
   *
   * Pour toute combinaison de services et options,
   * le total après remises DOIT être strictement positif (> 0)
   * dès qu'au moins un service est sélectionné.
   */
  it('totalMonthly and totalAnnual are strictly positive when ≥1 service selected', () => {
    fc.assert(
      fc.property(
        arbServices,
        arbOptions,
        arbBillingPeriod,
        (services, options, billing) => {
          const svcIds = services.map((s) => s.id);
          const optIds = options.map((o) => o.id);

          const result = calculatePricing(
            services, options, svcIds, optIds, billing
          );

          return result.totalMonthly > 0 && result.totalAnnual > 0;
        }
      ),
      { numRuns: 200 }
    );
  });
});

describe('Property 5: Économies annuelles correctes', () => {
  /**
   * **Validates: Requirements 5.5**
   *
   * Pour tout calcul en mode annuel, les économies affichées
   * DOIVENT être égales à (prix_plein_annuel - prix_remisé_annuel).
   */
  it('savingsTotal equals full annual price minus discounted annual price', () => {
    fc.assert(
      fc.property(
        arbServices,
        arbOptions,
        (services, options) => {
          const svcIds = services.map((s) => s.id);
          const optIds = options.map((o) => o.id);

          const result = calculatePricing(
            services, options, svcIds, optIds, 'yearly'
          );

          const recurringOptions = options.filter((o) => !o.is_flat_fee);
          const flatFeeOptions = options.filter((o) => o.is_flat_fee);
          const flatFeeTotal = flatFeeOptions.reduce((sum, o) => sum + o.price_monthly, 0);

          const fullPriceMonthlyRecurring =
            services.reduce((sum, s) => sum + s.price_monthly, 0) +
            recurringOptions.reduce((sum, o) => sum + o.price_monthly, 0);
          const fullPriceAnnual = fullPriceMonthlyRecurring * 12 + flatFeeTotal;
          const actualAnnual = result.totalAnnual;

          return result.savingsTotal === fullPriceAnnual - actualAnnual;
        }
      ),
      { numRuns: 200 }
    );
  });

  /**
   * **Validates: Requirements 5.5**
   *
   * In monthly mode, savings should reflect the monthly difference
   * between full price and discounted price.
   */
  it('savingsTotal in monthly mode equals full monthly minus discounted monthly', () => {
    fc.assert(
      fc.property(
        arbServices,
        arbOptions,
        (services, options) => {
          const svcIds = services.map((s) => s.id);
          const optIds = options.map((o) => o.id);

          const result = calculatePricing(
            services, options, svcIds, optIds, 'monthly'
          );

          const recurringOptions = options.filter((o) => !o.is_flat_fee);
          const flatFeeOptions = options.filter((o) => o.is_flat_fee);
          const flatFeeTotal = flatFeeOptions.reduce((sum, o) => sum + o.price_monthly, 0);

          const fullPriceMonthlyRecurring =
            services.reduce((sum, s) => sum + s.price_monthly, 0) +
            recurringOptions.reduce((sum, o) => sum + o.price_monthly, 0);
          const fullPriceMonthly = fullPriceMonthlyRecurring + Math.round(flatFeeTotal / 12);

          return result.savingsTotal === fullPriceMonthly - result.totalMonthly;
        }
      ),
      { numRuns: 200 }
    );
  });
});
