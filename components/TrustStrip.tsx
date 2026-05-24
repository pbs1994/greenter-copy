import { Shield, Star, MapPin, Home, Banknote, Zap } from "lucide-react"

const ITEMS = [
  { icon: Shield, text: "Certifié RGE QualiPAC & QualiPV" },
  { icon: Star,   text: "4.9 / 5 sur Google — avis vérifiés" },
  { icon: MapPin, text: "77 Seine-et-Marne · 91 Essonne · 78 Yvelines" },
  { icon: Home,   text: "+200 installations réalisées en Île-de-France" },
  { icon: Banknote, text: "MaPrimeRénov' jusqu'à 15 000€ d'aide" },
  { icon: Zap,    text: "Devis gratuit — réponse garantie sous 48h" },
]

export function TrustStrip() {
  return (
    <div
      className="bg-green-900 overflow-hidden py-3 select-none"
      aria-hidden="true"
    >
      <div className="flex w-max animate-scroll-infinite hover:[animation-play-state:paused]">
        {[...ITEMS, ...ITEMS].map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="flex items-center gap-2.5 mx-8 sm:mx-12 whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-sm font-medium text-green-100">{item.text}</span>
              <span className="text-green-600 ml-2 text-xs">◆</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
