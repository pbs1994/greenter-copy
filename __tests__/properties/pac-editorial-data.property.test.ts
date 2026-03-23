/**
 * Property-Based Tests for PAC Editorial Data
 *
 * Feature: pac-editorial-content
 * Tests data integrity and completeness for editorial content
 *
 * **Validates: Requirements 2.1, 2.2, 3.2, 5.3, 5.4, 5.6, 6.1, 6.2**
 */

import fc from 'fast-check';
import {
  PAC_TYPES,
  AIDES_2026,
  INSTALLATION_STEPS,
  OFFICIAL_SOURCES,
  R290_DATA,
} from '@/lib/pac-editorial-data';

describe('PAC Editorial Data Properties', () => {
  /**
   * Feature: pac-editorial-content, Property 5: PAC Type Data Completeness
   *
   * *For any* PAC type displayed in the Editorial_Content, the data object SHALL contain
   * all required fields: id, name, description, priceRange (with min and max), savings percentage,
   * advantages array (non-empty), disadvantages array (non-empty), idealFor string, and cop range
   * (with min and max).
   *
   * **Validates: Requirements 2.1, 2.2**
   */
  it('all PAC types have required fields', () => {
    fc.assert(
      fc.property(fc.constantFrom(...PAC_TYPES), (pacType) => {
        return (
          pacType.id !== undefined &&
          pacType.name.length >= 3 &&
          pacType.priceRange.min < pacType.priceRange.max &&
          pacType.advantages.length > 0 &&
          pacType.disadvantages.length > 0 &&
          pacType.idealFor.length > 0 &&
          pacType.cop.min >= 1 &&
          pacType.cop.max <= 7
        );
      }),
      { numRuns: 10 }
    );
  });

  /**
   * Feature: pac-editorial-content, Property 6: R290 Data Accuracy
   *
   * *For any* R290 section content, the displayed GWP value SHALL equal 3,
   * the ODP value SHALL equal 0, and the R410A comparison GWP SHALL equal 1430.
   *
   * **Validates: Requirements 3.2**
   */
  it('R290 data values are accurate', () => {
    expect(R290_DATA.gwp).toBe(3);
    expect(R290_DATA.gwpR410A).toBe(1430);
    expect(R290_DATA.odp).toBe(0);
  });

  /**
   * Feature: pac-editorial-content, Property 7: Aids Data Completeness
   *
   * *For any* AideFinanciere displayed in the Editorial_Content, the data object SHALL contain:
   * name, description, at least one amount or plafond value, conditions array (non-empty),
   * and a source reference with name, url, and date.
   *
   * **Validates: Requirements 5.3, 5.4, 5.6**
   */
  it('all aids have required fields and official sources', () => {
    fc.assert(
      fc.property(fc.constantFrom(...AIDES_2026), (aide) => {
        const hasRequiredFields =
          aide.name.length > 0 &&
          aide.description.length > 0 &&
          aide.conditions.length > 0 &&
          aide.source.url.length > 0;

        const isOfficialSource =
          aide.source.url.includes('gouv.fr') ||
          aide.source.url.includes('service-public.fr') ||
          aide.source.url.includes('ademe.fr') ||
          aide.source.url.includes('europa.eu');

        return hasRequiredFields && isOfficialSource;
      }),
      { numRuns: 10 }
    );
  });

  /**
   * Feature: pac-editorial-content, Property 8: Installation Steps Completeness
   *
   * *For any* installation step displayed, the data SHALL contain: step number (1-4),
   * title, duration string, and description. The steps SHALL be rendered in ascending
   * order by step number.
   *
   * **Validates: Requirements 6.1, 6.2**
   */
  it('installation steps are complete and ordered', () => {
    // Test each step has required fields
    fc.assert(
      fc.property(fc.constantFrom(...INSTALLATION_STEPS), (step) => {
        return (
          step.step >= 1 &&
          step.step <= 4 &&
          step.title.length > 0 &&
          step.duration.length > 0 &&
          step.description.length > 0
        );
      }),
      { numRuns: 10 }
    );

    // Verify ordering
    const stepNumbers = INSTALLATION_STEPS.map((s) => s.step);
    expect(stepNumbers).toEqual([1, 2, 3, 4]);
  });
});
