import { Check } from 'lucide-react'

interface ProgressBarProps {
  current: number
  total: number
  labels: string[]
}

export function ProgressBar({ current, total, labels }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Mobile — compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-neutral-900">
            Étape {Math.min(current + 1, total)} / {total}
          </span>
          <span className="text-sm text-neutral-500">
            {labels[Math.min(current, total - 1)]}
          </span>
        </div>
        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
            style={{ width: `${(Math.min(current, total - 1) / (total - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop — steps with labels */}
      <div className="hidden md:flex items-center gap-1 w-full">
        {labels.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <div key={label} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                    done
                      ? 'bg-emerald-600 text-white'
                      : active
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {done ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs text-center font-medium ${
                    active ? 'text-emerald-700' : done ? 'text-neutral-700' : 'text-neutral-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < labels.length - 1 && (
                <div className={`h-0.5 flex-1 -mt-6 ${done ? 'bg-emerald-600' : 'bg-neutral-200'}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
