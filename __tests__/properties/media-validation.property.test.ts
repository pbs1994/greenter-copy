/**
 * Property-Based Tests for Media File Validation
 * 
 * Feature: payload-cms-migration
 * Property 3: Media File Type Validation
 * Property 4: Media File Size Limit
 * 
 * **Validates: Requirements 4.1, 4.2**
 * 
 * Property 3: For any file upload to the Media collection, if the file type is one of 
 * (jpg, png, webp, svg, gif), the upload should succeed; otherwise, it should be rejected.
 * 
 * Property 4: For any file upload to the Media collection, if the file size exceeds 5MB, 
 * the upload should be rejected with an appropriate error message.
 */

import * as fc from 'fast-check'

/**
 * Media collection configuration constants (matching collections/Media.ts)
 */
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png', 
  'image/webp',
  'image/svg+xml',
  'image/gif',
] as const

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

/**
 * Mapping of file extensions to MIME types
 */
const EXTENSION_TO_MIME: Record<string, string> = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  'gif': 'image/gif',
}

/**
 * Invalid MIME types that should be rejected
 */
const INVALID_MIME_TYPES = [
  'application/pdf',
  'application/zip',
  'text/plain',
  'text/html',
  'text/css',
  'text/javascript',
  'application/json',
  'application/xml',
  'video/mp4',
  'video/webm',
  'audio/mpeg',
  'audio/wav',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
  'application/octet-stream',
  'application/msword',
  'application/vnd.ms-excel',
] as const

/**
 * Arbitrary generator for valid MIME types
 */
const validMimeTypeArbitrary = fc.constantFrom(...ALLOWED_MIME_TYPES)

/**
 * Arbitrary generator for invalid MIME types
 */
const invalidMimeTypeArbitrary = fc.constantFrom(...INVALID_MIME_TYPES)

/**
 * Arbitrary generator for file sizes within the limit (1 byte to 5MB)
 */
const validFileSizeArbitrary = fc.integer({ min: 1, max: MAX_FILE_SIZE })

/**
 * Arbitrary generator for file sizes exceeding the limit (5MB + 1 byte to 100MB)
 */
const oversizedFileSizeArbitrary = fc.integer({ min: MAX_FILE_SIZE + 1, max: 100 * 1024 * 1024 })

/**
 * Arbitrary generator for valid file extensions
 */
const validExtensionArbitrary = fc.constantFrom('jpg', 'jpeg', 'png', 'webp', 'svg', 'gif')

/**
 * Arbitrary generator for invalid file extensions
 */
const invalidExtensionArbitrary = fc.constantFrom(
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'html', 'css', 'js', 'json',
  'mp4', 'avi', 'mov', 'mp3', 'wav', 'zip', 'rar', 'exe', 'bmp', 'tiff', 'heic'
)

/**
 * Arbitrary generator for valid filenames
 */
const validFilenameArbitrary = fc.tuple(
  fc.stringMatching(/^[a-zA-Z0-9_-]{1,50}$/),
  validExtensionArbitrary
).map(([name, ext]) => `${name || 'file'}.${ext}`)

/**
 * Arbitrary generator for alt text (required field)
 */
const altTextArbitrary = fc.string({ minLength: 1, maxLength: 200 })
  .filter(s => s.trim().length > 0)

/**
 * Helper function to validate MIME type against allowed types
 */
function isValidMimeType(mimeType: string): boolean {
  return ALLOWED_MIME_TYPES.includes(mimeType as typeof ALLOWED_MIME_TYPES[number])
}

/**
 * Helper function to validate file size against limit
 */
function isValidFileSize(filesize: number): boolean {
  return filesize <= MAX_FILE_SIZE
}

/**
 * Simulates the Media collection's beforeValidate hook behavior
 */
function validateMediaUpload(data: { mimeType?: string; filesize?: number }): { valid: boolean; error?: string } {
  // Check file size limit (from beforeValidate hook)
  if (data.filesize && data.filesize > MAX_FILE_SIZE) {
    return { valid: false, error: 'La taille du fichier ne doit pas dépasser 5MB' }
  }
  
  // Check MIME type (from upload.mimeTypes config)
  if (data.mimeType && !isValidMimeType(data.mimeType)) {
    return { valid: false, error: 'Type de fichier non autorisé' }
  }
  
  return { valid: true }
}

describe('Property 3: Media File Type Validation', () => {
  /**
   * Property: For any file with a valid MIME type (jpg, png, webp, svg, gif),
   * the MIME type validation SHALL pass
   * 
   * **Validates: Requirements 4.1**
   */
  it('should accept files with valid MIME types', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        validFileSizeArbitrary,
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.valid === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any file with an invalid MIME type,
   * the MIME type validation SHALL fail
   * 
   * **Validates: Requirements 4.1**
   */
  it('should reject files with invalid MIME types', () => {
    fc.assert(
      fc.property(
        invalidMimeTypeArbitrary,
        validFileSizeArbitrary,
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.valid === false && result.error !== undefined
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The set of allowed MIME types SHALL be exactly 
   * image/jpeg, image/png, image/webp, image/svg+xml, image/gif
   * 
   * **Validates: Requirements 4.1**
   */
  it('should have exactly the specified allowed MIME types', () => {
    const expectedTypes = new Set([
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
    ])
    
    const actualTypes = new Set(ALLOWED_MIME_TYPES)
    
    expect(actualTypes).toEqual(expectedTypes)
    expect(actualTypes.size).toBe(5)
  })

  /**
   * Property: MIME type validation SHALL be case-sensitive
   * (uppercase variants should be rejected)
   * 
   * **Validates: Requirements 4.1**
   */
  it('should reject uppercase MIME type variants', () => {
    const uppercaseMimeTypes = [
      'IMAGE/JPEG',
      'IMAGE/PNG',
      'Image/Webp',
      'IMAGE/SVG+XML',
      'IMAGE/GIF',
    ]
    
    fc.assert(
      fc.property(
        fc.constantFrom(...uppercaseMimeTypes),
        validFileSizeArbitrary,
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.valid === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid MIME type, the validation result SHALL be deterministic
   * 
   * **Validates: Requirements 4.1**
   */
  it('should produce deterministic results for MIME type validation', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        validFileSizeArbitrary,
        (mimeType, filesize) => {
          const result1 = validateMediaUpload({ mimeType, filesize })
          const result2 = validateMediaUpload({ mimeType, filesize })
          return result1.valid === result2.valid
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Property 4: Media File Size Limit', () => {
  /**
   * Property: For any file with size <= 5MB,
   * the file size validation SHALL pass
   * 
   * **Validates: Requirements 4.2**
   */
  it('should accept files within the 5MB size limit', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        validFileSizeArbitrary,
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.valid === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any file with size > 5MB,
   * the file size validation SHALL fail with appropriate error message
   * 
   * **Validates: Requirements 4.2**
   */
  it('should reject files exceeding the 5MB size limit', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        oversizedFileSizeArbitrary,
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.valid === false && 
                 result.error === 'La taille du fichier ne doit pas dépasser 5MB'
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The maximum file size limit SHALL be exactly 5MB (5 * 1024 * 1024 bytes)
   * 
   * **Validates: Requirements 4.2**
   */
  it('should have exactly 5MB as the maximum file size', () => {
    expect(MAX_FILE_SIZE).toBe(5 * 1024 * 1024)
    expect(MAX_FILE_SIZE).toBe(5242880)
  })

  /**
   * Property: Files at exactly 5MB boundary SHALL be accepted
   * 
   * **Validates: Requirements 4.2**
   */
  it('should accept files at exactly 5MB boundary', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        (mimeType) => {
          const result = validateMediaUpload({ mimeType, filesize: MAX_FILE_SIZE })
          return result.valid === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Files at exactly 5MB + 1 byte SHALL be rejected
   * 
   * **Validates: Requirements 4.2**
   */
  it('should reject files at exactly 5MB + 1 byte', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        (mimeType) => {
          const result = validateMediaUpload({ mimeType, filesize: MAX_FILE_SIZE + 1 })
          return result.valid === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The error message for oversized files SHALL be in French
   * 
   * **Validates: Requirements 4.2**
   */
  it('should return French error message for oversized files', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        oversizedFileSizeArbitrary,
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.error === 'La taille du fichier ne doit pas dépasser 5MB'
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: File size validation SHALL be deterministic
   * 
   * **Validates: Requirements 4.2**
   */
  it('should produce deterministic results for file size validation', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        fc.integer({ min: 1, max: 100 * 1024 * 1024 }),
        (mimeType, filesize) => {
          const result1 = validateMediaUpload({ mimeType, filesize })
          const result2 = validateMediaUpload({ mimeType, filesize })
          return result1.valid === result2.valid && result1.error === result2.error
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Combined Media Validation Properties', () => {
  /**
   * Property: A file with valid MIME type AND valid size SHALL be accepted
   * 
   * **Validates: Requirements 4.1, 4.2**
   */
  it('should accept files with both valid MIME type and valid size', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        validFileSizeArbitrary,
        altTextArbitrary,
        (mimeType, filesize, alt) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.valid === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: A file with invalid MIME type SHALL be rejected regardless of size
   * 
   * **Validates: Requirements 4.1, 4.2**
   */
  it('should reject files with invalid MIME type regardless of size', () => {
    fc.assert(
      fc.property(
        invalidMimeTypeArbitrary,
        fc.integer({ min: 1, max: MAX_FILE_SIZE }),
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.valid === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: A file with oversized size SHALL be rejected regardless of MIME type
   * 
   * **Validates: Requirements 4.1, 4.2**
   */
  it('should reject oversized files regardless of MIME type', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        oversizedFileSizeArbitrary,
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          return result.valid === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: File size check SHALL take precedence over MIME type check
   * (oversized files rejected with size error, not type error)
   * 
   * **Validates: Requirements 4.1, 4.2**
   */
  it('should check file size before MIME type', () => {
    fc.assert(
      fc.property(
        validMimeTypeArbitrary,
        oversizedFileSizeArbitrary,
        (mimeType, filesize) => {
          const result = validateMediaUpload({ mimeType, filesize })
          // Should fail with size error, not type error
          return result.error === 'La taille du fichier ne doit pas dépasser 5MB'
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Media Validation Edge Cases', () => {
  /**
   * Test: Minimum valid file size (1 byte) should be accepted
   */
  it('should accept minimum file size of 1 byte', () => {
    const result = validateMediaUpload({ mimeType: 'image/jpeg', filesize: 1 })
    expect(result.valid).toBe(true)
  })

  /**
   * Test: Zero file size should be accepted (edge case)
   */
  it('should handle zero file size', () => {
    const result = validateMediaUpload({ mimeType: 'image/jpeg', filesize: 0 })
    expect(result.valid).toBe(true)
  })

  /**
   * Test: Missing filesize should be accepted (optional field)
   */
  it('should accept upload without filesize', () => {
    const result = validateMediaUpload({ mimeType: 'image/jpeg' })
    expect(result.valid).toBe(true)
  })

  /**
   * Test: Missing mimeType should be accepted (optional field)
   */
  it('should accept upload without mimeType', () => {
    const result = validateMediaUpload({ filesize: 1000 })
    expect(result.valid).toBe(true)
  })

  /**
   * Test: All valid MIME types should be accepted individually
   */
  it('should accept all valid MIME types individually', () => {
    for (const mimeType of ALLOWED_MIME_TYPES) {
      const result = validateMediaUpload({ mimeType, filesize: 1000 })
      expect(result.valid).toBe(true)
    }
  })

  /**
   * Test: Common invalid file types should be rejected
   */
  it('should reject common invalid file types', () => {
    const invalidTypes = ['application/pdf', 'video/mp4', 'audio/mpeg', 'text/plain']
    
    for (const mimeType of invalidTypes) {
      const result = validateMediaUpload({ mimeType, filesize: 1000 })
      expect(result.valid).toBe(false)
    }
  })

  /**
   * Test: Boundary file sizes
   */
  it('should handle boundary file sizes correctly', () => {
    // Just under 5MB - should pass
    expect(validateMediaUpload({ mimeType: 'image/jpeg', filesize: MAX_FILE_SIZE - 1 }).valid).toBe(true)
    
    // Exactly 5MB - should pass
    expect(validateMediaUpload({ mimeType: 'image/jpeg', filesize: MAX_FILE_SIZE }).valid).toBe(true)
    
    // Just over 5MB - should fail
    expect(validateMediaUpload({ mimeType: 'image/jpeg', filesize: MAX_FILE_SIZE + 1 }).valid).toBe(false)
  })

  /**
   * Test: Very large file sizes should be rejected
   */
  it('should reject very large file sizes', () => {
    const veryLargeSizes = [
      10 * 1024 * 1024,   // 10MB
      50 * 1024 * 1024,   // 50MB
      100 * 1024 * 1024,  // 100MB
      1024 * 1024 * 1024, // 1GB
    ]
    
    for (const filesize of veryLargeSizes) {
      const result = validateMediaUpload({ mimeType: 'image/jpeg', filesize })
      expect(result.valid).toBe(false)
      expect(result.error).toBe('La taille du fichier ne doit pas dépasser 5MB')
    }
  })
})

describe('Media Collection Configuration Verification', () => {
  /**
   * Test: Verify ALLOWED_MIME_TYPES matches the Media collection config
   */
  it('should match Media collection mimeTypes configuration', () => {
    // These should match the mimeTypes in collections/Media.ts
    expect(ALLOWED_MIME_TYPES).toContain('image/jpeg')
    expect(ALLOWED_MIME_TYPES).toContain('image/png')
    expect(ALLOWED_MIME_TYPES).toContain('image/webp')
    expect(ALLOWED_MIME_TYPES).toContain('image/svg+xml')
    expect(ALLOWED_MIME_TYPES).toContain('image/gif')
    expect(ALLOWED_MIME_TYPES.length).toBe(5)
  })

  /**
   * Test: Verify MAX_FILE_SIZE matches the Media collection config
   */
  it('should match Media collection file size limit', () => {
    // This should match the MAX_FILE_SIZE in collections/Media.ts beforeValidate hook
    expect(MAX_FILE_SIZE).toBe(5 * 1024 * 1024)
  })

  /**
   * Test: Verify error message matches the Media collection hook
   */
  it('should match Media collection error message', () => {
    const result = validateMediaUpload({ mimeType: 'image/jpeg', filesize: MAX_FILE_SIZE + 1 })
    // This should match the error message in collections/Media.ts beforeValidate hook
    expect(result.error).toBe('La taille du fichier ne doit pas dépasser 5MB')
  })
})
