/**
 * Property-Based Tests for Required Spec Fields Validation
 * 
 * Feature: admin-backend
 * Property 7: Required Spec Fields Validation
 * 
 * **Validates: Requirements 5.9**
 * 
 * For any product save operation where the product's category has required spec_fields 
 * defined, if any required field is missing or empty in the product's specs, the save 
 * operation SHALL fail with a validation error.
 */

import * as fc from 'fast-check'
import type { SpecField } from '@/types/database'

/**
 * Recreate the validateRequiredSpecFields function for direct testing.
 * This mirrors the implementation in app/administrator/actions/products.ts
 */
function validateRequiredSpecFields(
  specs: Record<string, string | number>,
  specFields: SpecField[]
): boolean {
  for (const field of specFields) {
    if (field.required) {
      const value = specs[field.key];
      if (value === undefined || value === null || value === '') {
        return false;
      }
    }
  }
  return true;
}

/**
 * The expected French error message when validation fails
 */
const EXPECTED_ERROR_MESSAGE = 'Tous les champs obligatoires doivent être remplis';

/**
 * Arbitrary generator for valid spec field keys (alphanumeric with underscores)
 */
const specFieldKeyArbitrary = fc.stringMatching(/^[a-z][a-z0-9_]{0,29}$/);

/**
 * Arbitrary generator for spec field names (human-readable French names)
 */
const specFieldNameArbitrary = fc.string({ minLength: 1, maxLength: 50 });


/**
 * Arbitrary generator for spec field types
 */
const specFieldTypeArbitrary = fc.constantFrom('text', 'number', 'textarea', 'select') as fc.Arbitrary<'text' | 'number' | 'textarea' | 'select'>;

/**
 * Arbitrary generator for non-empty spec values (valid values)
 */
const nonEmptySpecValueArbitrary = fc.oneof(
  fc.string({ minLength: 1, maxLength: 100 }),
  fc.integer({ min: 0, max: 1000000 })
);

/**
 * Arbitrary generator for empty/missing spec values (invalid values for required fields)
 */
const emptySpecValueArbitrary = fc.constantFrom('', undefined as unknown as string);

/**
 * Arbitrary generator for a single SpecField
 */
const specFieldArbitrary = fc.record({
  name: specFieldNameArbitrary,
  key: specFieldKeyArbitrary,
  type: specFieldTypeArbitrary,
  required: fc.boolean(),
  options: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }), { nil: undefined }),
  unit: fc.option(fc.string({ minLength: 1, maxLength: 10 }), { nil: undefined }),
}) as fc.Arbitrary<SpecField>;

/**
 * Arbitrary generator for a required SpecField
 */
const requiredSpecFieldArbitrary = fc.record({
  name: specFieldNameArbitrary,
  key: specFieldKeyArbitrary,
  type: specFieldTypeArbitrary,
  required: fc.constant(true),
  options: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }), { nil: undefined }),
  unit: fc.option(fc.string({ minLength: 1, maxLength: 10 }), { nil: undefined }),
}) as fc.Arbitrary<SpecField>;

/**
 * Arbitrary generator for an optional SpecField
 */
const optionalSpecFieldArbitrary = fc.record({
  name: specFieldNameArbitrary,
  key: specFieldKeyArbitrary,
  type: specFieldTypeArbitrary,
  required: fc.constant(false),
  options: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }), { nil: undefined }),
  unit: fc.option(fc.string({ minLength: 1, maxLength: 10 }), { nil: undefined }),
}) as fc.Arbitrary<SpecField>;


/**
 * Helper function to generate specs with all required fields filled
 */
function generateFilledSpecs(specFields: SpecField[]): Record<string, string | number> {
  const specs: Record<string, string | number> = {};
  for (const field of specFields) {
    // Generate a valid value based on field type
    if (field.type === 'number') {
      specs[field.key] = Math.floor(Math.random() * 1000);
    } else if (field.type === 'select' && field.options && field.options.length > 0) {
      specs[field.key] = field.options[0];
    } else {
      specs[field.key] = `value_${field.key}`;
    }
  }
  return specs;
}

/**
 * Helper function to generate specs with one required field missing
 */
function generateSpecsWithMissingRequired(
  specFields: SpecField[],
  missingFieldKey: string
): Record<string, string | number> {
  const specs = generateFilledSpecs(specFields);
  delete specs[missingFieldKey];
  return specs;
}

/**
 * Helper function to generate specs with one required field empty
 */
function generateSpecsWithEmptyRequired(
  specFields: SpecField[],
  emptyFieldKey: string
): Record<string, string | number> {
  const specs = generateFilledSpecs(specFields);
  specs[emptyFieldKey] = '';
  return specs;
}

describe('Property 7: Required Spec Fields Validation', () => {
  /**
   * Property: When all required spec_fields are filled, validation SHALL pass
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass validation when all required spec_fields are filled', () => {
    fc.assert(
      fc.property(
        fc.array(specFieldArbitrary, { minLength: 0, maxLength: 10 }),
        (specFields) => {
          // Ensure unique keys
          const uniqueFields = specFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          const specs = generateFilledSpecs(uniqueFields);
          const result = validateRequiredSpecFields(specs, uniqueFields);
          
          return result === true;
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Property: When any required spec_field is missing, validation SHALL fail
   * 
   * **Validates: Requirements 5.9**
   */
  it('should fail validation when any required spec_field is missing', () => {
    fc.assert(
      fc.property(
        fc.array(requiredSpecFieldArbitrary, { minLength: 1, maxLength: 10 }),
        fc.nat({ max: 9 }),
        (requiredFields, indexSeed) => {
          // Ensure unique keys
          const uniqueFields = requiredFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          if (uniqueFields.length === 0) return true; // Skip if no unique fields
          
          // Pick a random required field to omit
          const indexToOmit = indexSeed % uniqueFields.length;
          const fieldToOmit = uniqueFields[indexToOmit];
          
          const specs = generateSpecsWithMissingRequired(uniqueFields, fieldToOmit.key);
          const result = validateRequiredSpecFields(specs, uniqueFields);
          
          return result === false;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: When any required spec_field is empty string, validation SHALL fail
   * 
   * **Validates: Requirements 5.9**
   */
  it('should fail validation when any required spec_field is empty string', () => {
    fc.assert(
      fc.property(
        fc.array(requiredSpecFieldArbitrary, { minLength: 1, maxLength: 10 }),
        fc.nat({ max: 9 }),
        (requiredFields, indexSeed) => {
          // Ensure unique keys
          const uniqueFields = requiredFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          if (uniqueFields.length === 0) return true; // Skip if no unique fields
          
          // Pick a random required field to make empty
          const indexToEmpty = indexSeed % uniqueFields.length;
          const fieldToEmpty = uniqueFields[indexToEmpty];
          
          const specs = generateSpecsWithEmptyRequired(uniqueFields, fieldToEmpty.key);
          const result = validateRequiredSpecFields(specs, uniqueFields);
          
          return result === false;
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Property: Optional fields don't affect validation - 
   * missing optional fields should not cause validation to fail
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass validation when optional fields are missing but required fields are filled', () => {
    fc.assert(
      fc.property(
        fc.array(requiredSpecFieldArbitrary, { minLength: 0, maxLength: 5 }),
        fc.array(optionalSpecFieldArbitrary, { minLength: 1, maxLength: 5 }),
        (requiredFields, optionalFields) => {
          // Combine and ensure unique keys
          const allFields = [...requiredFields, ...optionalFields];
          const uniqueFields = allFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          // Only fill required fields, leave optional fields empty/missing
          const specs: Record<string, string | number> = {};
          for (const field of uniqueFields) {
            if (field.required) {
              specs[field.key] = field.type === 'number' ? 42 : 'filled_value';
            }
            // Intentionally don't fill optional fields
          }
          
          const result = validateRequiredSpecFields(specs, uniqueFields);
          
          return result === true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Empty optional fields should not cause validation to fail
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass validation when optional fields are empty string but required fields are filled', () => {
    fc.assert(
      fc.property(
        fc.array(requiredSpecFieldArbitrary, { minLength: 0, maxLength: 5 }),
        fc.array(optionalSpecFieldArbitrary, { minLength: 1, maxLength: 5 }),
        (requiredFields, optionalFields) => {
          // Combine and ensure unique keys
          const allFields = [...requiredFields, ...optionalFields];
          const uniqueFields = allFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          // Fill required fields, set optional fields to empty string
          const specs: Record<string, string | number> = {};
          for (const field of uniqueFields) {
            if (field.required) {
              specs[field.key] = field.type === 'number' ? 42 : 'filled_value';
            } else {
              specs[field.key] = ''; // Empty optional field
            }
          }
          
          const result = validateRequiredSpecFields(specs, uniqueFields);
          
          return result === true;
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Property: Validation should be idempotent - 
   * calling it multiple times with the same input should produce the same result
   * 
   * **Validates: Requirements 5.9**
   */
  it('should be idempotent for validation checks', () => {
    fc.assert(
      fc.property(
        fc.array(specFieldArbitrary, { minLength: 0, maxLength: 10 }),
        fc.boolean(),
        (specFields, fillAllRequired) => {
          // Ensure unique keys
          const uniqueFields = specFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          let specs: Record<string, string | number>;
          if (fillAllRequired) {
            specs = generateFilledSpecs(uniqueFields);
          } else {
            // Randomly leave some required fields empty
            specs = {};
            for (const field of uniqueFields) {
              if (!field.required || Math.random() > 0.5) {
                specs[field.key] = field.type === 'number' ? 42 : 'value';
              }
            }
          }
          
          const result1 = validateRequiredSpecFields(specs, uniqueFields);
          const result2 = validateRequiredSpecFields(specs, uniqueFields);
          const result3 = validateRequiredSpecFields(specs, uniqueFields);
          
          return result1 === result2 && result2 === result3;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Empty spec_fields array should always pass validation
   * (no required fields means nothing to validate)
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass validation when spec_fields array is empty', () => {
    fc.assert(
      fc.property(
        fc.dictionary(fc.string({ minLength: 1, maxLength: 20 }), nonEmptySpecValueArbitrary),
        (specs) => {
          const result = validateRequiredSpecFields(specs, []);
          return result === true;
        }
      ),
      { numRuns: 100 }
    );
  });
});


/**
 * Track mock state for createProduct action tests
 */
let mockCategorySpecFields: SpecField[] = [];
let mockCategoryError: { message: string } | null = null;
let mockInsertError: { message: string; code?: string } | null = null;
let mockInsertCalled = false;
let mockRevalidatePathCalls: string[] = [];

// Mock Next.js redirect function
jest.mock('next/navigation', () => ({
  redirect: (url: string) => {
    const error = new Error('NEXT_REDIRECT');
    (error as Error & { digest: string }).digest = `NEXT_REDIRECT;replace;${url};307;`;
    throw error;
  },
}));

// Mock Next.js cache revalidation
jest.mock('next/cache', () => ({
  revalidatePath: (path: string) => {
    mockRevalidatePathCalls.push(path);
  },
}));

// Mock the Supabase server client
jest.mock('@/lib/supabase-server', () => ({
  createSupabaseServerClient: jest.fn().mockImplementation(async () => ({
    from: (table: string) => {
      if (table === 'categories') {
        return {
          select: () => ({
            eq: () => ({
              single: () => ({
                data: mockCategoryError ? null : { spec_fields: mockCategorySpecFields },
                error: mockCategoryError,
              }),
            }),
          }),
        };
      }
      if (table === 'products') {
        return {
          insert: () => {
            mockInsertCalled = true;
            return {
              error: mockInsertError,
            };
          },
        };
      }
      return {};
    },
    auth: {
      getUser: async () => ({ data: { user: { id: 'admin-user-id', email: 'admin@test.com' } } }),
    },
  })),
}));


// Mock the auth module to always return an authenticated admin
jest.mock('@/lib/auth', () => ({
  requireAdmin: jest.fn().mockResolvedValue({ id: 'admin-user-id', email: 'admin@test.com' }),
  getAdminUser: jest.fn().mockResolvedValue({ id: 'admin-user-id', email: 'admin@test.com' }),
}));

// Import after mocks are set up
import { createProduct } from '@/app/administrator/actions/products';

/**
 * Helper function to reset mock state before each test
 */
function resetMocks() {
  mockCategorySpecFields = [];
  mockCategoryError = null;
  mockInsertError = null;
  mockInsertCalled = false;
  mockRevalidatePathCalls = [];
}

/**
 * Helper function to create FormData for product creation
 */
function createProductFormData(overrides: Partial<{
  name: string;
  category_id: string;
  price: string;
  specs: string;
  features: string;
  faq: string;
  image_url: string;
  description: string;
  short_description: string;
  stripe_price_id: string;
  is_active: string;
}> = {}): FormData {
  const formData = new FormData();
  formData.set('name', overrides.name ?? 'Test Product');
  formData.set('category_id', overrides.category_id ?? 'test-category-id');
  formData.set('price', overrides.price ?? '10000');
  formData.set('specs', overrides.specs ?? '{}');
  formData.set('features', overrides.features ?? '[]');
  formData.set('faq', overrides.faq ?? '[]');
  formData.set('image_url', overrides.image_url ?? '');
  formData.set('description', overrides.description ?? '');
  formData.set('short_description', overrides.short_description ?? '');
  formData.set('stripe_price_id', overrides.stripe_price_id ?? '');
  formData.set('is_active', overrides.is_active ?? 'true');
  return formData;
}


describe('createProduct Action - Required Spec Fields Validation', () => {
  beforeEach(() => {
    resetMocks();
  });

  /**
   * Property: When required spec_fields are missing, createProduct SHALL fail 
   * with the expected French error message
   * 
   * **Validates: Requirements 5.9**
   */
  it('should return the correct French error message when required fields are missing', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(requiredSpecFieldArbitrary, { minLength: 1, maxLength: 5 }),
        async (requiredFields) => {
          // Ensure unique keys
          const uniqueFields = requiredFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          if (uniqueFields.length === 0) return true;
          
          resetMocks();
          mockCategorySpecFields = uniqueFields;
          
          // Create form data with empty specs (missing all required fields)
          const formData = createProductFormData({ specs: '{}' });
          
          const result = await createProduct(formData);
          
          return result.success === false && result.error === EXPECTED_ERROR_MESSAGE;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: When required spec_fields are empty strings, createProduct SHALL fail 
   * with the expected French error message
   * 
   * **Validates: Requirements 5.9**
   */
  it('should return the correct French error message when required fields are empty strings', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(requiredSpecFieldArbitrary, { minLength: 1, maxLength: 5 }),
        async (requiredFields) => {
          // Ensure unique keys
          const uniqueFields = requiredFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          if (uniqueFields.length === 0) return true;
          
          resetMocks();
          mockCategorySpecFields = uniqueFields;
          
          // Create specs with all required fields set to empty string
          const emptySpecs: Record<string, string> = {};
          for (const field of uniqueFields) {
            emptySpecs[field.key] = '';
          }
          
          const formData = createProductFormData({ specs: JSON.stringify(emptySpecs) });
          
          const result = await createProduct(formData);
          
          return result.success === false && result.error === EXPECTED_ERROR_MESSAGE;
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Property: When all required spec_fields are filled, createProduct SHALL NOT fail 
   * due to spec validation (may fail for other reasons)
   * 
   * **Validates: Requirements 5.9**
   */
  it('should not fail with spec validation error when all required fields are filled', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(requiredSpecFieldArbitrary, { minLength: 1, maxLength: 5 }),
        async (requiredFields) => {
          // Ensure unique keys
          const uniqueFields = requiredFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          if (uniqueFields.length === 0) return true;
          
          resetMocks();
          mockCategorySpecFields = uniqueFields;
          mockInsertError = null;
          
          // Create specs with all required fields filled
          const filledSpecs = generateFilledSpecs(uniqueFields);
          
          const formData = createProductFormData({ specs: JSON.stringify(filledSpecs) });
          
          const result = await createProduct(formData);
          
          // Should either succeed or fail with a different error (not spec validation)
          return result.success === true || result.error !== EXPECTED_ERROR_MESSAGE;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: The insert operation SHALL NOT be called when validation fails
   * 
   * **Validates: Requirements 5.9**
   */
  it('should not call insert when required spec_fields validation fails', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(requiredSpecFieldArbitrary, { minLength: 1, maxLength: 5 }),
        async (requiredFields) => {
          // Ensure unique keys
          const uniqueFields = requiredFields.filter((field, index, self) =>
            index === self.findIndex(f => f.key === field.key)
          );
          
          if (uniqueFields.length === 0) return true;
          
          resetMocks();
          mockCategorySpecFields = uniqueFields;
          
          // Create form data with empty specs
          const formData = createProductFormData({ specs: '{}' });
          
          await createProduct(formData);
          
          return mockInsertCalled === false;
        }
      ),
      { numRuns: 100 }
    );
  });
});


/**
 * Edge case tests for spec fields validation
 */
describe('Spec Fields Validation Edge Cases', () => {
  beforeEach(() => {
    resetMocks();
  });

  /**
   * Test: Single required field missing should fail validation
   * 
   * **Validates: Requirements 5.9**
   */
  it('should fail when single required field is missing', () => {
    const specFields: SpecField[] = [
      { name: 'Power Rating', key: 'power_rating', type: 'text', required: true },
    ];
    
    const specs = {};
    const result = validateRequiredSpecFields(specs, specFields);
    
    expect(result).toBe(false);
  });

  /**
   * Test: Single required field with empty string should fail validation
   * 
   * **Validates: Requirements 5.9**
   */
  it('should fail when single required field is empty string', () => {
    const specFields: SpecField[] = [
      { name: 'Power Rating', key: 'power_rating', type: 'text', required: true },
    ];
    
    const specs = { power_rating: '' };
    const result = validateRequiredSpecFields(specs, specFields);
    
    expect(result).toBe(false);
  });

  /**
   * Test: Single required field filled should pass validation
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass when single required field is filled', () => {
    const specFields: SpecField[] = [
      { name: 'Power Rating', key: 'power_rating', type: 'text', required: true },
    ];
    
    const specs = { power_rating: '6kW' };
    const result = validateRequiredSpecFields(specs, specFields);
    
    expect(result).toBe(true);
  });

  /**
   * Test: Number value 0 should be considered valid (not empty)
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass when required number field is 0', () => {
    const specFields: SpecField[] = [
      { name: 'Count', key: 'count', type: 'number', required: true },
    ];
    
    const specs = { count: 0 };
    const result = validateRequiredSpecFields(specs, specFields);
    
    expect(result).toBe(true);
  });


  /**
   * Test: Mix of required and optional fields - only required matter
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass when required fields are filled and optional are missing', () => {
    const specFields: SpecField[] = [
      { name: 'Power Rating', key: 'power_rating', type: 'text', required: true },
      { name: 'Optional Note', key: 'optional_note', type: 'textarea', required: false },
    ];
    
    const specs = { power_rating: '6kW' };
    const result = validateRequiredSpecFields(specs, specFields);
    
    expect(result).toBe(true);
  });

  /**
   * Test: All optional fields should always pass
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass when all fields are optional', () => {
    const specFields: SpecField[] = [
      { name: 'Note 1', key: 'note1', type: 'text', required: false },
      { name: 'Note 2', key: 'note2', type: 'textarea', required: false },
    ];
    
    const specs = {};
    const result = validateRequiredSpecFields(specs, specFields);
    
    expect(result).toBe(true);
  });

  /**
   * Test: Multiple required fields - all must be filled
   * 
   * **Validates: Requirements 5.9**
   */
  it('should fail when one of multiple required fields is missing', () => {
    const specFields: SpecField[] = [
      { name: 'Power Rating', key: 'power_rating', type: 'text', required: true },
      { name: 'Capacity', key: 'capacity', type: 'number', required: true },
      { name: 'Cell Type', key: 'cell_type', type: 'select', required: true, options: ['LiFePO4', 'Li-ion'] },
    ];
    
    // Missing cell_type
    const specs = { power_rating: '6kW', capacity: 10 };
    const result = validateRequiredSpecFields(specs, specFields);
    
    expect(result).toBe(false);
  });

  /**
   * Test: Multiple required fields - all filled should pass
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass when all multiple required fields are filled', () => {
    const specFields: SpecField[] = [
      { name: 'Power Rating', key: 'power_rating', type: 'text', required: true },
      { name: 'Capacity', key: 'capacity', type: 'number', required: true },
      { name: 'Cell Type', key: 'cell_type', type: 'select', required: true, options: ['LiFePO4', 'Li-ion'] },
    ];
    
    const specs = { power_rating: '6kW', capacity: 10, cell_type: 'LiFePO4' };
    const result = validateRequiredSpecFields(specs, specFields);
    
    expect(result).toBe(true);
  });
});


/**
 * Tests for error message consistency
 */
describe('Spec Fields Validation Error Message Consistency', () => {
  beforeEach(() => {
    resetMocks();
  });

  /**
   * Test: Error message should be the expected French message
   * 
   * **Validates: Requirements 5.9**
   */
  it('should return the expected French error message', async () => {
    mockCategorySpecFields = [
      { name: 'Power Rating', key: 'power_rating', type: 'text', required: true },
    ];
    
    const formData = createProductFormData({ specs: '{}' });
    const result = await createProduct(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toBe(EXPECTED_ERROR_MESSAGE);
  });

  /**
   * Property: Error message should be consistent regardless of which required field is missing
   * 
   * **Validates: Requirements 5.9**
   */
  it('should return the same error message regardless of which field is missing', async () => {
    const specFields: SpecField[] = [
      { name: 'Field A', key: 'field_a', type: 'text', required: true },
      { name: 'Field B', key: 'field_b', type: 'number', required: true },
      { name: 'Field C', key: 'field_c', type: 'textarea', required: true },
    ];
    
    const errorMessages: string[] = [];
    
    // Test missing each field individually
    for (const field of specFields) {
      resetMocks();
      mockCategorySpecFields = specFields;
      
      const specs: Record<string, string | number> = {};
      for (const f of specFields) {
        if (f.key !== field.key) {
          specs[f.key] = f.type === 'number' ? 42 : 'value';
        }
      }
      
      const formData = createProductFormData({ specs: JSON.stringify(specs) });
      const result = await createProduct(formData);
      
      if (result.error) {
        errorMessages.push(result.error);
      }
    }
    
    // All error messages should be identical
    expect(new Set(errorMessages).size).toBe(1);
    expect(errorMessages[0]).toBe(EXPECTED_ERROR_MESSAGE);
  });
});


/**
 * Real-world scenario tests based on Greenter battery product spec_fields
 */
describe('Real-world Spec Fields Validation Scenarios', () => {
  beforeEach(() => {
    resetMocks();
  });

  /**
   * Test: Battery product spec_fields from Greenter
   * 
   * **Validates: Requirements 5.9**
   */
  it('should validate battery product spec_fields correctly', () => {
    const batterySpecFields: SpecField[] = [
      { name: 'Puissance nominale', key: 'power_rating', type: 'text', required: true, unit: 'kW' },
      { name: 'Capacité batterie', key: 'battery_capacity', type: 'number', required: true, unit: 'kWh' },
      { name: 'Type de cellules', key: 'cell_type', type: 'select', required: true, options: ['LiFePO4', 'Li-ion', 'Plomb'] },
      { name: 'Cycles', key: 'cycles', type: 'number', required: false },
      { name: 'Rendement', key: 'efficiency', type: 'text', required: false, unit: '%' },
    ];
    
    // Valid battery specs
    const validSpecs = {
      power_rating: '6',
      battery_capacity: 10.2,
      cell_type: 'LiFePO4',
    };
    
    expect(validateRequiredSpecFields(validSpecs, batterySpecFields)).toBe(true);
    
    // Missing required cell_type
    const invalidSpecs = {
      power_rating: '6',
      battery_capacity: 10.2,
    };
    
    expect(validateRequiredSpecFields(invalidSpecs, batterySpecFields)).toBe(false);
  });

  /**
   * Test: createProduct with battery spec_fields
   * 
   * **Validates: Requirements 5.9**
   */
  it('should fail createProduct when battery required fields are missing', async () => {
    mockCategorySpecFields = [
      { name: 'Puissance nominale', key: 'power_rating', type: 'text', required: true, unit: 'kW' },
      { name: 'Capacité batterie', key: 'battery_capacity', type: 'number', required: true, unit: 'kWh' },
      { name: 'Type de cellules', key: 'cell_type', type: 'select', required: true, options: ['LiFePO4', 'Li-ion', 'Plomb'] },
    ];
    
    // Missing cell_type
    const specs = {
      power_rating: '6',
      battery_capacity: 10.2,
    };
    
    const formData = createProductFormData({ specs: JSON.stringify(specs) });
    const result = await createProduct(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toBe(EXPECTED_ERROR_MESSAGE);
  });

  /**
   * Test: createProduct with all battery required fields filled
   * 
   * **Validates: Requirements 5.9**
   */
  it('should pass createProduct when all battery required fields are filled', async () => {
    mockCategorySpecFields = [
      { name: 'Puissance nominale', key: 'power_rating', type: 'text', required: true, unit: 'kW' },
      { name: 'Capacité batterie', key: 'battery_capacity', type: 'number', required: true, unit: 'kWh' },
      { name: 'Type de cellules', key: 'cell_type', type: 'select', required: true, options: ['LiFePO4', 'Li-ion', 'Plomb'] },
    ];
    mockInsertError = null;
    
    const specs = {
      power_rating: '6',
      battery_capacity: 10.2,
      cell_type: 'LiFePO4',
    };
    
    const formData = createProductFormData({ specs: JSON.stringify(specs) });
    const result = await createProduct(formData);
    
    expect(result.success).toBe(true);
    expect(mockInsertCalled).toBe(true);
  });
});
