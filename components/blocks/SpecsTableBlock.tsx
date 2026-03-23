/**
 * SpecsTableBlock Component
 * 
 * Renders technical specifications in a formatted table with
 * alternating row colors and optional section grouping.
 * 
 * @validates Requirements 13.3
 */
'use client'

interface Spec {
  label: string
  value: string
  unit?: string | null
}

interface SpecsTableBlockProps {
  title?: string | null
  auto_populate?: boolean | null
  specs?: Array<{ label: string; value: string }> | null
  columns?: number | null
  // Product specs passed from parent when auto_populate is true
  productSpecs?: Spec[] | null
}

export function SpecsTableBlock({
  title,
  auto_populate = true,
  specs,
  columns = 2,
  productSpecs,
}: SpecsTableBlockProps) {
  // Use product specs if auto-populate is enabled, otherwise use manual specs
  const displaySpecs = auto_populate && productSpecs
    ? productSpecs.map(s => ({ label: s.label, value: s.unit ? `${s.value} ${s.unit}` : s.value }))
    : specs || []

  if (displaySpecs.length === 0) {
    return null
  }

  // Split specs into columns
  const columnCount = Math.min(columns || 2, 3)
  const itemsPerColumn = Math.ceil(displaySpecs.length / columnCount)
  const columnData: typeof displaySpecs[] = []
  
  for (let i = 0; i < columnCount; i++) {
    columnData.push(displaySpecs.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn))
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {title}
          </h2>
        )}
        
        <div className={`grid gap-8 ${columnCount === 1 ? 'grid-cols-1' : columnCount === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {columnData.map((column, colIndex) => (
            <div key={colIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <tbody>
                  {column.map((spec, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-600 border-b border-gray-100">
                        {spec.label}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 text-right">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
