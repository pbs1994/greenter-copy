import { Clock } from 'lucide-react'

interface Step {
  title: string
  detail: string
  duration?: string
}

interface ArticleStepsProps {
  steps: Step[]
}

export function ArticleSteps({ steps }: ArticleStepsProps) {
  return (
    <ol className="my-8 space-y-5">
      {steps.map((step, i) => (
        <li
          key={i}
          className="relative flex gap-5 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 md:p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-3">
              <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
              {step.duration && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  <Clock className="h-3 w-3" />
                  {step.duration}
                </span>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
