import { Info, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'tip' | 'success'

interface ArticleCalloutProps {
  type: CalloutType
  title: string
  children: React.ReactNode
}

const styles: Record<CalloutType, { bg: string; border: string; icon: string; titleColor: string }> = {
  info: { bg: 'bg-blue-50', border: 'border-blue-500', icon: 'text-blue-600', titleColor: 'text-blue-800' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-500', icon: 'text-amber-600', titleColor: 'text-amber-800' },
  tip: { bg: 'bg-emerald-50', border: 'border-emerald-500', icon: 'text-emerald-600', titleColor: 'text-emerald-800' },
  success: { bg: 'bg-green-50', border: 'border-green-500', icon: 'text-green-600', titleColor: 'text-green-800' },
}

const icons: Record<CalloutType, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  success: CheckCircle,
}

export function ArticleCallout({ type, title, children }: ArticleCalloutProps) {
  const s = styles[type]
  const Icon = icons[type]

  return (
    <div className={`my-8 ${s.bg} border-l-4 ${s.border} rounded-r-xl p-5`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${s.icon} mt-0.5 flex-shrink-0`} />
        <div>
          <h4 className={`font-bold ${s.titleColor} mb-1`}>{title}</h4>
          <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
