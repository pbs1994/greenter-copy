interface Column {
  header: string
  key: string
  highlight?: boolean
}

interface ArticleTableProps {
  title?: string
  columns: Column[]
  rows: Record<string, string>[]
  caption?: string
}

export function ArticleTable({ title, columns, rows, caption }: ArticleTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      {title && (
        <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
      )}
      <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-slate-800 text-white">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 border-t border-slate-100 ${col.highlight ? 'font-bold text-emerald-700' : 'text-slate-700'}`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <p className="text-xs text-slate-400 mt-2 italic">{caption}</p>
      )}
    </div>
  )
}
