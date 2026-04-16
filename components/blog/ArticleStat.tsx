interface StatItem {
  value: string
  label: string
  color?: 'green' | 'blue' | 'amber' | 'red'
}

interface ArticleStatProps {
  stats: StatItem[]
}

const colorMap = {
  green: 'bg-emerald-50 text-emerald-700',
  blue: 'bg-sky-50 text-sky-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
}

export function ArticleStat({ stats }: ArticleStatProps) {
  return (
    <div className={`my-8 grid grid-cols-2 ${stats.length >= 3 ? 'sm:grid-cols-3' : ''} ${stats.length >= 4 ? 'lg:grid-cols-4' : ''} gap-4`}>
      {stats.map((stat, i) => (
        <div key={i} className={`${colorMap[stat.color || 'green']} rounded-xl p-5 text-center`}>
          <p className="text-3xl font-bold mb-1">{stat.value}</p>
          <p className="text-sm text-slate-600">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
