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
  const svc1 = makeService('a', 1500); // 15€/mois
  const svc2 = makeService('b', 2500); // 25€/mois
  const svc3 = makeService('c', 2000); // 20€/mois
  const svc4 = makeService('d', 1500); // 15€/mois
  const recurringOpt = makeOption('y', 3000, false); // 30€/mois recurring
  const flatFeeOpt = makeOption('z', 5000, false, true); // 50€ one-time

  it('computes correctly for 1 service, monthly billing', () => {
    const result = calculatePricing([svc1], [], ['a'], [], 'monthly');
    expect(result.discountMultiPercent).toBe(0);
    expect(result.discountMultiAmount).toBe(0);
    expect(result.servicesAfterMulti).toBe(1500);
    expect(result.totalMonthly).toBe(1500);
    expect(result.discountAnnualPercent).toBe(0); // No annual discount in monthly mode
    expect(result.discountAnnualAmount).toBe(0);
    expect(result.totalAnnual).toBe(1500 * 12); // 18000
  });

  it('computes correctly for 1 service, yearly billing (2 mois offerts)', () => {
    const result = calculatePricing([svc1], [], ['a'], [], 'yearly');
    expect(result.discountMultiPercent).toBe(0);
    expect(result.totalMonthly).toBe(1500);
    expect(result.discountAnnualPercent).toBe(16.67);
    expect(result.discountAnnualAmount).toBe(3000); // 2 months = 1500 * 2
    expect(result.totalAnnual).toBe(1500 * 10); // 10 months instead of 12
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

  it('applies both multi and annual discounts for yearly billing', () => {
    const result = calculatePricing(
      [svc1, svc2], [], ['a', 'b'], [], 'yearly'
    );
    // Services: 4000, multi 5% = 200, after multi = 3800
    expect(result.servicesAfterMulti).toBe(3800);
    expect(result.totalMonthly).toBe(3800);
    // Annual: 10 months instead of 12 (2 mois offerts)
    expect(result.totalAnnual).toBe(3800 * 10); // 38000
    expect(result.discountAnnualAmount).toBe(3800 * 2); // 7600
  });

  it('handles recurring options correctly', () => {
    const result = calculatePricing(
      [svc1], [recurringOpt], ['a'], ['y'], 'yearly'
    );
    // Services: 1500, multi 0%, after multi = 1500
    // Recurring option: 3000
    // totalMonthly = 1500 + 3000 = 4500
    expect(result.totalMonthly).toBe(4500);
    // Annual: 10 months (2 mois offerts)
    expect(result.totalAnnual).toBe(4500 * 10); // 45000
    expect(result.discountAnnualAmount).toBe(4500 * 2); // 9000
  });

  it('handles flat fee options correctly (added to annual only)', () => {
    const result = calculatePricing(
      [svc1], [flatFeeOpt], ['a'], ['z'], 'yearly'
    );
    // Services: 1500, multi 0%
    expect(result.totalMonthly).toBe(1500);
    // Annual: 10 months + flat fee
    expect(result.totalAnnual).toBe(1500 * 10 + 5000); // 15000 + 5000 = 20000
    expect(result.flatFeeTotal).toBe(5000);
  });

  it('handles service quantities (duplicate IDs)', () => {
    // 2x service a = should count as 2 services for multi discount
    const result = calculatePricing(
      [svc1], [], ['a', 'a'], [], 'monthly'
    );
    // 2 services = 5% discount
    expect(result.discountMultiPercent).toBe(5);
    // Subtotal: 1500 * 2 = 3000
    expect(result.servicesSubtotal).toBe(3000);
    // Discount: 3000 * 5% = 150
    expect(result.discountMultiAmount).toBe(150);
    expect(result.servicesAfterMulti).toBe(2850);
    expect(result.totalMonthly).toBe(2850);
  });

  it('total is always positive with at least one service', () => {
    const result = calculatePricing(
      [svc1, svc2, svc3, svc4],
      [recurringOpt, flatFeeOpt],
      ['a', 'b', 'c', 'd'],
      ['y', 'z'],
      'yearly'
    );
    expect(result.totalMonthly).toBeGreaterThan(0);
    expect(result.totalAnnual).toBeGreaterThan(0);
  });
});

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 1: Calcul remise multi-équipements', () => {
  /**
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
   * calculatePricing must apply the correct multi-discount percentage
   * matching the number of selected services (counting quantities).
   */
  it('calculatePricing applies the correct multi-discount percent based on total quantity', () => {
    fc.assert(
      fc.property(arbServices, fc.integer({ min: 1, max: 3 }), (services, multiplier) => {
        // Create IDs with potential duplicates to test quantity handling
        const ids = services.flatMap((s) => Array(multiplier).fill(s.id));
        const totalCount = services.length * multiplier;
        
        const result = calculatePricing(services, [], ids, [], 'monthly');
        const expected = getMultiDiscount(totalCount);
        
        return result.discountMultiPercent === expected;
      }),
      { numRuns: 200 }
    );
  });
});

describe('Property 2: Annual discount is 2 months free', () => {
  /**
   * For yearly billing, the annual total should be exactly 10 months
   * of the monthly total (plus flat fees).
   */
  it('yearly total equals 10 months of monthly total plus flat fees', () => {
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

          const flatFeeTotal = options
            .filter((o) => o.is_flat_fee)
            .reduce((sum, o) => sum + o.price_monthly, 0);

          // Annual = 10 months + flat fees
          const expectedAnnual = result.totalMonthly * 10 + flatFeeTotal;
          
          return result.totalAnnual === expectedAnnual;
        }
      ),
      { numRuns: 200 }
    );
  });

  /**
   * For monthly billing, no annual discount should be applied.
   */
  it('monthly billing has no annual discount', () => {
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

          return result.discountAnnualPercent === 0 && result.discountAnnualAmount === 0;
        }
      ),
      { numRuns: 200 }
    );
  });
});

describe('Property 3: Flat fees are one-time charges', () => {
  /**
   * Flat fee options should only be added to the annual total,
   * not affect the monthly recurring amount.
   */
  it('flat fees do not affect totalMonthly', () => {
    fc.assert(
      fc.property(
        arbServices,
        arbOptions,
        arbBillingPeriod,
        (services, options, billing) => {
          const svcIds = services.map((s) => s.id);
          const allOptIds = options.map((o) => o.id);
          const recurringOptIds = options.filter((o) => !o.is_flat_fee).map((o) => o.id);

          const withFlatFees = calculatePricing(
            services, options, svcIds, allOptIds, billing
          );
          const withoutFlatFees = calculatePricing(
            services, options.filter((o) => !o.is_flat_fee), svcIds, recurringOptIds, billing
          );

          // Monthly totals should be the same
          return withFlatFees.totalMonthly === withoutFlatFees.totalMonthly;
        }
      ),
      { numRuns: 200 }
    );
  });
});

describe('Property 4: Total toujours positif', () => {
  /**
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

describe('Property 5: Multi-discount savings calculation', () => {
  /**
   * savingsTotal should equal the multi-discount amount times 12 months.
   */
  it('savingsTotal equals discountMultiAmount * 12', () => {
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

          return result.savingsTotal === result.discountMultiAmount * 12;
        }
      ),
      { numRuns: 200 }
    );
  });
});

describe('Property 6: Service quantities are handled correctly', () => {
  /**
   * Duplicate service IDs should be counted as multiple services
   * for both pricing and multi-discount calculation.
   */
  it('duplicate service IDs increase total and affect multi-discount tier', () => {
    fc.assert(
      fc.property(
        arbServices.filter((s) => s.length >= 1),
        fc.integer({ min: 1, max: 4 }),
        arbBillingPeriod,
        (services, quantity, billing) => {
          const service = services[0];
          const singleId = [service.id];
          const multipleIds = Array(quantity).fill(service.id);

          const singleResult = calculatePricing(
            [service], [], singleId, [], billing
          );
          const multipleResult = calculatePricing(
            [service], [], multipleIds, [], billing
          );

          // Subtotal should scale with quantity
          const subtotalScales = multipleResult.servicesSubtotal === singleResult.servicesSubtotal * quantity;
          
          // Multi-discount should be based on total quantity
          const correctDiscount = multipleResult.discountMultiPercent === getMultiDiscount(quantity);

          return subtotalScales && correctDiscount;
        }
      ),
      { numRuns: 200 }
    );
  });
});
