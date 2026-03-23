/**
 * ComparisonChartBlock Component
 * 
 * Renders a comparison table with configurable columns, rows,
 * and cell types (text, checkmark, cross). Supports highlighting
 * a recommended column.
 * 
 * @validates Requirements 16.5
 */
'use client'

import { Check, X } from 'lucide-react'

interface Cell {
  value?: string | null
  type: 'text' | 'check' | 'cross'
}

interface Row {
  feature: string
  cells: Cell[]
}

interface Column {
  header: string
}

interface ComparisonChartBlockProps {
  title?: string | null
  columns: Column[]
  rows: Row[]
  highlight_column?: number | null
}

export function ComparisonChartBlock({
  title,
  columns,
  rows,
  highlight_column,
}: ComparisonChartBlockProps) {
  if (!columns?.length || !rows?.length) {
    return null
  }

  const renderCell = (cell: Cell) => {
    switch (cell.type) {
      case 'check':
        return <Check className="w-5 h-5 text-green-600 mx-auto" />
      case 'cross':
        return <X className="w-5 h-5 text-red-500 mx-auto" />
      default:
        return <span>{cell.value || '-'}</span>
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {title}
          </h2>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left bg-gray-100 border-b-2 border-gray-200 font-semibold text-gray-700">
                  Caract�ristique
                </th>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`p-4 text-center border-b-2 font-semibold ${
                      highlight_column === index + 1
                        ? 'bg-green-100 border-green-300 text-green-800'
                        : 'bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                  >
                    {col.header}
                    {highlight_column === index + 1 && (
                      <span className="block text-xs font-normal text-green-600 mt-1">
                        Recommand�
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4 text-left font-medium text-gray-700 border-b border-gray-100">
                    {row.feature}
                  </td>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`p-4 text-center border-b ${
                        highlight_column === cellIndex + 1
                          ? 'bg-green-50 border-green-100'
                          : 'border-gray-100'
                      }`}
                    >
                      {renderCell(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
