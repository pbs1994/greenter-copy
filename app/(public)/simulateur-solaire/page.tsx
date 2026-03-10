"use client"

import { useState, useMemo } from "react"
import { 
  Sun, Battery, Home, Zap, ArrowRight, Phone, 
  ChevronDown, HelpCircle, Lightbulb, Check,
  TrendingDown, Gauge, Calendar
} from "lucide-react"
import Link from "next/link"

// ============================================
// DONNÉES TECHNIQUES (cachées au client)
// ============================================

const REGIONS = [
  { id: "nord", label: "Nord (Lille, Amiens)", production: 900 },
  { id: "idf", label: "Île-de-France (Paris)", production: 950 },
  { id: "est", label: "Est (Strasbourg, Nancy)", production: 1000 },
  { id: "ouest", label: "Ouest (Nantes, Rennes)", production: 1050 },
  { id: "centre", label: "Centre (Tours, Orléans)", production: 1100 },
  { id: "sud-ouest", label: "Sud-Ouest (Bordeaux, Toulouse)", production: 1200 },
  { id: "rhone-alpes", label: "Rhône-Alpes (Lyon)", production: 1150 },
  { id: "mediterranee", label: "Sud (Marseille, Nice)", production: 1350 },
]

// Taux d'utilisation selon présence (simplifié)
const PRESENCE_FACTOR = {
  "absent": 0.30,    // Au travail → utilise peu en journée
  "partiel": 0.45,   // Télétravail → utilise moyennement
  "present": 0.55,   // À la maison → utilise bien
}

// Gain avec batterie (simplifié)
const BATTERY_BOOST = {
  0: 0,
  5: 15,   // +15% de couverture
  10: 25,  // +25%
  15: 32,  // +32%
  20: 38,  // +38%
}

export default function SimulateurSolairePage() {
  // Questions simples au client
  const [step, setStep] = useState(1)
  const [consumption, setConsumption] = useState<number | null>(null)
  const [region, setRegion] = useState("")
  const [presence, setPresence] = useState("")
  const [objective, setObjective] = useState<number | null>(null)
  const [withBattery, setWithBattery] = useState(false)
  const [batterySize, setBatterySize] = useState(10)

  // Calculs
  const results = useMemo(() => {
    if (!consumption || !region || !presence || !objective) return null

    const regionData = REGIONS.find(r => r.id === region)
    if (!regionData) return null

    const presenceFactor = PRESENCE_FACTOR[presence as keyof typeof PRESENCE_FACTOR]
    const productionPerKwc = regionData.production

    // Calcul du kWc nécessaire pour atteindre l'objectif
    // Formule simplifiée : kWc = (conso × objectif%) / (prod/kWc × taux utilisation)
    const targetKwh = consumption * (objective / 100)
    const rawKwc = targetKwh / (productionPerKwc * presenceFactor)
    
    // Arrondi au 0.5 kWc supérieur, min 3 kWc
    const recommendedKwc = Math.max(3, Math.ceil(rawKwc * 2) / 2)
    
    // Production réelle avec ce kWc
    const annualProduction = recommendedKwc * productionPerKwc
    
    // Ce qu'on utilise vraiment (sans batterie)
    const usedWithoutBattery = Math.min(annualProduction * presenceFactor, consumption)
    const coverageWithoutBattery = Math.round((usedWithoutBattery / consumption) * 100)
    
    // Avec batterie
    const batteryBoost = withBattery ? BATTERY_BOOST[batterySize as keyof typeof BATTERY_BOOST] : 0
    const coverageWithBattery = Math.min(95, coverageWithoutBattery + batteryBoost)
    
    const finalCoverage = withBattery ? coverageWithBattery : coverageWithoutBattery
    
    // Nombre de panneaux (500W standard)
    const nbPanels = Math.ceil((recommendedKwc * 1000) / 500)
    const roofArea = Math.round(nbPanels * 1.9) // ~1.9m² par panneau
    
    // Saisonnalité (été ~150%, hiver ~50% de la moyenne)
    const summerCoverage = Math.min(100, Math.round(finalCoverage * 1.5))
    const winterCoverage = Math.round(finalCoverage * 0.5)
    
    // Économies en € (tarif moyen 0.20€/kWh)
    const annualSavings = Math.round(consumption * (finalCoverage / 100) * 0.20)
    const monthlySavings = Math.round(annualSavings / 12)
    
    // Ce qui reste à payer
    const remainingBill = Math.round(consumption * ((100 - finalCoverage) / 100) * 0.20)

    return {
      recommendedKwc,
      nbPanels,
      roofArea,
      finalCoverage,
      coverageWithoutBattery,
      coverageWithBattery,
      summerCoverage,
      winterCoverage,
      annualSavings,
      monthlySavings,
      remainingBill,
      annualProduction: Math.round(annualProduction),
      needsBattery: objective > 60 && !withBattery,
    }
  }, [consumption, region, presence, objective, withBattery, batterySize])

  // Vérifier si on peut passer à l'étape suivante
  const canProceed = () => {
    if (step === 1) return consumption && consumption >= 1000
    if (step === 2) return region !== ""
    if (step === 3) return presence !== ""
    if (step === 4) return objective !== null
    return true
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Mon projet solaire</h1>
              <p className="text-sm text-slate-400">Découvrez l'installation adaptée à vos besoins</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl px-4 py-8">
        
        {/* Indicateur d'étapes */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step > s 
                  ? 'bg-emerald-500 text-white' 
                  : step === s 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-slate-700 text-slate-400'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 4 && <div className={`w-12 h-1 mx-1 rounded ${step > s ? 'bg-emerald-500' : 'bg-slate-700'}`} />}
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            ÉTAPE 1 : CONSOMMATION
        ═══════════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Combien consommez-vous d'électricité ?
              </h2>
              <p className="text-slate-400">
                Ce chiffre se trouve sur votre facture annuelle EDF/Engie
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <input
                  type="number"
                  value={consumption || ""}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  placeholder="Ex: 8000"
                  className="w-full bg-slate-900 border-2 border-slate-600 focus:border-amber-500 rounded-xl px-6 py-4 text-3xl font-bold text-white text-center focus:outline-none transition-colors"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 text-lg">kWh/an</span>
              </div>

              {/* Aide visuelle */}
              <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Vous ne connaissez pas votre consommation ?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Appartement", value: 4000 },
                    { label: "Petite maison", value: 7000 },
                    { label: "Maison moyenne", value: 10000 },
                    { label: "Grande maison", value: 15000 },
                  ].map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setConsumption(preset.value)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        consumption === preset.value
                          ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <div className="font-medium">{preset.label}</div>
                      <div className="text-xs opacity-70">{preset.value.toLocaleString()} kWh</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => canProceed() && setStep(2)}
                disabled={!canProceed()}
                className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
                  canProceed()
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                Continuer
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            ÉTAPE 2 : RÉGION
        ═══════════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <Sun className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Où habitez-vous ?
              </h2>
              <p className="text-slate-400">
                L'ensoleillement varie selon les régions
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="space-y-2 mb-6">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${
                      region === r.id
                        ? 'bg-orange-500/20 border-2 border-orange-500/50'
                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className={`font-medium ${region === r.id ? 'text-orange-400' : 'text-white'}`}>
                      {r.label}
                    </span>
                    {region === r.id && <Check className="w-5 h-5 text-orange-400" />}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-xl font-medium bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                >
                  Retour
                </button>
                <button
                  onClick={() => canProceed() && setStep(3)}
                  disabled={!canProceed()}
                  className={`flex-1 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
                    canProceed()
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            ÉTAPE 3 : PRÉSENCE
        ═══════════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Home className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Êtes-vous souvent chez vous en journée ?
              </h2>
              <p className="text-slate-400">
                Les panneaux produisent quand il y a du soleil (la journée)
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="space-y-3 mb-6">
                {[
                  { id: "absent", icon: "🏢", label: "Rarement", desc: "Je travaille à l'extérieur" },
                  { id: "partiel", icon: "💻", label: "Parfois", desc: "Télétravail ou mi-temps" },
                  { id: "present", icon: "🏠", label: "Souvent", desc: "Retraité ou travail à domicile" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPresence(p.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                      presence === p.id
                        ? 'bg-blue-500/20 border-2 border-blue-500/50'
                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-3xl">{p.icon}</span>
                    <div className="flex-1">
                      <p className={`font-medium ${presence === p.id ? 'text-blue-400' : 'text-white'}`}>{p.label}</p>
                      <p className="text-sm text-slate-500">{p.desc}</p>
                    </div>
                    {presence === p.id && <Check className="w-5 h-5 text-blue-400" />}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
                <p className="text-xs text-slate-400 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Si vous êtes absent la journée, vous consommez surtout le soir quand les panneaux ne produisent plus. 
                    Une batterie peut alors être utile.
                  </span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-4 rounded-xl font-medium bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                >
                  Retour
                </button>
                <button
                  onClick={() => canProceed() && setStep(4)}
                  disabled={!canProceed()}
                  className={`flex-1 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
                    canProceed()
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            ÉTAPE 4 : OBJECTIF
        ═══════════════════════════════════════════════════════════════ */}
        {step === 4 && (
          <div className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Quel est votre objectif ?
              </h2>
              <p className="text-slate-400">
                Quelle part de votre facture voulez-vous réduire ?
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="space-y-3 mb-6">
                {[
                  { value: 30, label: "Réduire un peu", desc: "~30% d'économies", color: "emerald" },
                  { value: 50, label: "Réduire de moitié", desc: "~50% d'économies", color: "emerald" },
                  { value: 70, label: "Réduire fortement", desc: "~70% d'économies", color: "amber" },
                  { value: 90, label: "Quasi autonome", desc: "~90% d'économies (batterie conseillée)", color: "orange" },
                ].map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setObjective(o.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${
                      objective === o.value
                        ? 'bg-emerald-500/20 border-2 border-emerald-500/50'
                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <p className={`font-medium ${objective === o.value ? 'text-emerald-400' : 'text-white'}`}>
                        {o.label}
                      </p>
                      <p className="text-sm text-slate-500">{o.desc}</p>
                    </div>
                    <div className={`text-2xl font-bold ${objective === o.value ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {o.value}%
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-4 rounded-xl font-medium bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                >
                  Retour
                </button>
                <button
                  onClick={() => canProceed() && setStep(5)}
                  disabled={!canProceed()}
                  className={`flex-1 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
                    canProceed()
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Voir mon résultat
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            ÉTAPE 5 : RÉSULTATS
        ═══════════════════════════════════════════════════════════════ */}
        {step === 5 && results && (
          <div className="space-y-6">
            
            {/* Résultat principal */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 rounded-2xl p-6 md:p-8 border border-emerald-500/30 text-center">
              <p className="text-slate-400 mb-2">Pour atteindre votre objectif, il vous faut</p>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <div>
                  <span className="text-6xl font-bold text-emerald-400">{results.recommendedKwc}</span>
                  <span className="text-2xl text-slate-400 ml-2">kWc</span>
                </div>
              </div>
              
              <p className="text-lg text-white mb-6">
                soit <span className="text-emerald-400 font-semibold">{results.nbPanels} panneaux</span> sur environ <span className="text-emerald-400 font-semibold">{results.roofArea} m²</span> de toiture
              </p>

              {/* Jauge de couverture */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Couverture de vos besoins</span>
                  <span className="text-emerald-400 font-bold">{results.finalCoverage}%</span>
                </div>
                <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                    style={{ width: `${results.finalCoverage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {results.finalCoverage}% de votre électricité sera produite par vos panneaux
                </p>
              </div>
            </div>

            {/* Ce que ça veut dire concrètement */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-amber-400" />
                Concrètement, qu'est-ce que ça donne ?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Économies */}
                <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                  <p className="text-sm text-slate-400 mb-1">Vous économisez environ</p>
                  <p className="text-3xl font-bold text-emerald-400">{results.annualSavings} €<span className="text-lg text-slate-400">/an</span></p>
                  <p className="text-sm text-slate-500 mt-1">soit ~{results.monthlySavings} €/mois</p>
                </div>
                
                {/* Reste à payer */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Il vous reste à payer</p>
                  <p className="text-3xl font-bold text-white">{results.remainingBill} €<span className="text-lg text-slate-400">/an</span></p>
                  <p className="text-sm text-slate-500 mt-1">pour les {100 - results.finalCoverage}% restants</p>
                </div>
              </div>
            </div>

            {/* Variation été/hiver */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                Été vs Hiver : quelle différence ?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">☀️</span>
                    <div>
                      <p className="text-orange-400 font-medium">En été</p>
                      <p className="text-xs text-slate-400">Juin, juillet, août</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{results.summerCoverage}%</p>
                  <p className="text-sm text-slate-400">de vos besoins couverts</p>
                  {results.summerCoverage >= 100 && (
                    <p className="text-xs text-emerald-400 mt-2">✓ Vous êtes quasi autonome !</p>
                  )}
                </div>
                
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">❄️</span>
                    <div>
                      <p className="text-blue-400 font-medium">En hiver</p>
                      <p className="text-xs text-slate-400">Décembre, janvier, février</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{results.winterCoverage}%</p>
                  <p className="text-sm text-slate-400">de vos besoins couverts</p>
                  <p className="text-xs text-slate-500 mt-2">Le soleil est moins présent</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 mt-4 text-center">
                C'est normal : en France, on produit environ 3× plus en été qu'en hiver.
              </p>
            </div>

            {/* Option batterie */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Battery className="w-5 h-5 text-blue-400" />
                Et si j'ajoute une batterie ?
              </h3>
              
              <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
                <p className="text-sm text-slate-400">
                  <span className="text-blue-400 font-medium">À quoi ça sert ?</span> La batterie stocke l'électricité 
                  produite en journée pour l'utiliser le soir. Utile si vous êtes absent la journée.
                </p>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setWithBattery(!withBattery)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    withBattery ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    withBattery ? 'left-7' : 'left-1'
                  }`} />
                </button>
                <span className="text-white font-medium">
                  {withBattery ? 'Avec batterie' : 'Sans batterie'}
                </span>
              </div>
              
              {withBattery && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Taille de la batterie :</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 15, 20].map((size) => (
                        <button
                          key={size}
                          onClick={() => setBatterySize(size)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            batterySize === size
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-700'
                          }`}
                        >
                          <p className="font-bold">{size}</p>
                          <p className="text-xs opacity-70">kWh</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Sans batterie</p>
                        <p className="text-xl font-bold text-white">{results.coverageWithoutBattery}%</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-blue-400" />
                      <div>
                        <p className="text-sm text-slate-400">Avec batterie {batterySize} kWh</p>
                        <p className="text-xl font-bold text-blue-400">{results.coverageWithBattery}%</p>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-400 mt-2 text-center">
                      +{results.coverageWithBattery - results.coverageWithoutBattery}% de couverture en plus
                    </p>
                  </div>
                </div>
              )}
              
              {!withBattery && results.needsBattery && (
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <p className="text-sm text-amber-400">
                    💡 <strong>Conseil :</strong> Pour atteindre {objective}% de couverture, 
                    une batterie serait utile car vous êtes {presence === "absent" ? "souvent absent en journée" : "parfois absent en journée"}.
                  </p>
                </div>
              )}
            </div>

            {/* Récapitulatif */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">📋 Récapitulatif de votre projet</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-amber-400">{results.recommendedKwc}</p>
                  <p className="text-xs text-slate-400">kWc</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-blue-400">{results.nbPanels}</p>
                  <p className="text-xs text-slate-400">panneaux</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-400">{results.finalCoverage}%</p>
                  <p className="text-xs text-slate-400">couverture</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-violet-400">{results.annualSavings}€</p>
                  <p className="text-xs text-slate-400">économies/an</p>
                </div>
              </div>
              
              {withBattery && (
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-sm text-blue-400">
                    <Battery className="w-4 h-4" />
                    + Batterie {batterySize} kWh
                  </span>
                </div>
              )}
              
              <button
                onClick={() => setStep(1)}
                className="w-full py-3 rounded-xl font-medium bg-slate-700 hover:bg-slate-600 text-white transition-colors text-sm"
              >
                Modifier mes réponses
              </button>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 rounded-2xl p-8 text-center border border-emerald-500/30">
              <h3 className="text-xl font-semibold text-white mb-2">Intéressé par ce projet ?</h3>
              <p className="text-slate-400 mb-6">
                Contactez-nous pour une étude personnalisée gratuite basée sur votre toiture réelle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
                >
                  Demander une étude gratuite
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a 
                  href="tel:+33609455056" 
                  className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium px-8 py-4 rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  06 09 45 50 56
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
