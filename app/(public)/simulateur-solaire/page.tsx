"use client"

import { useState, useMemo, useEffect } from "react"
import { 
  Sun, Battery, Home, Zap, 
  ArrowRight, Phone, Leaf,
  ThermometerSun, Snowflake,
  FileText, HelpCircle, Lightbulb,
  Plug, PiggyBank, TreePine, Car,
  Info, Euro, Calendar, Clock, MapPin
} from "lucide-react"
import Link from "next/link"

// ============================================
// DONNÉES OFFICIELLES MARS 2026 - FRANCE
// Sources: service-public.fr, CRE, EDF OA
// ============================================

const SOLAR_DATA = {
  // Prix électricité tarif réglementé (TRV) - février 2026
  electricityPrice: { base: 0.194 },
  
  // Tarifs rachat surplus EDF OA - T1 2026
  feedInTariff: { under9kWc: 0.04, under100kWc: 0.0536 },
  
  // Prime autoconsommation - arrêté du 6 octobre 2021 modifié
  selfConsumptionBonus: { under9kWc: 80, under36kWc: 140, under100kWc: 70 },
  
  // TVA applicable
  vat: { under9kWc: 0.055, over9kWc: 0.20 },
  
  // Production régionale (kWh/kWc/an) - données PVGIS/Météo France
  regionProduction: {
    "nord": { annual: 900, summer: 140, winter: 35, label: "Nord", cities: "Lille, Amiens, Calais" },
    "idf": { annual: 950, summer: 145, winter: 40, label: "Île-de-France", cities: "Paris, Versailles" },
    "est": { annual: 1000, summer: 155, winter: 45, label: "Est", cities: "Strasbourg, Nancy, Metz" },
    "ouest": { annual: 1050, summer: 160, winter: 50, label: "Ouest", cities: "Nantes, Rennes, Brest" },
    "centre": { annual: 1100, summer: 165, winter: 55, label: "Centre", cities: "Tours, Orléans, Bourges" },
    "sud-ouest": { annual: 1200, summer: 175, winter: 65, label: "Sud-Ouest", cities: "Bordeaux, Toulouse" },
    "rhone-alpes": { annual: 1150, summer: 170, winter: 60, label: "Rhône-Alpes", cities: "Lyon, Grenoble" },
    "mediterranee": { annual: 1350, summer: 190, winter: 80, label: "Méditerranée", cities: "Marseille, Nice, Montpellier" },
  },
  
  // Facteurs d'orientation (sud = référence 100%)
  orientationFactor: { 
    "sud": 1.0, 
    "sud-est": 0.96, 
    "sud-ouest": 0.96, 
    "est": 0.88, 
    "ouest": 0.88 
  },
  
  // Facteurs d'inclinaison (30° optimal en France)
  inclinationFactor: { 
    "plat": 0.93,      // 0-10°
    "faible": 0.97,    // 10-20°
    "optimal": 1.0,    // 25-35°
    "moyen": 0.97,     // 35-45°
    "fort": 0.90       // >45°
  },

  // Taux d'autoconsommation selon présence et batterie
  selfConsumptionRate: {
    sansBatterie: { absent: 0.25, partiel: 0.35, present: 0.45 },
    avecBatterie: {
      "5": { absent: 0.55, partiel: 0.65, present: 0.70 },
      "10": { absent: 0.65, partiel: 0.75, present: 0.80 },
      "15": { absent: 0.75, partiel: 0.82, present: 0.85 },
    }
  },
  
  // Caractéristiques panneaux (standard 2026)
  panelPower: 500,    // Watts par panneau
  panelSurface: 1.9,  // m² par panneau
  
  // Prix indicatifs installation (€/Wc installé, pose comprise)
  installationCost: {
    panelsOnly: { min: 1.8, max: 2.5 },      // €/Wc sans batterie
    withBattery: { min: 2.5, max: 3.5 },     // €/Wc avec batterie
    batteryOnly: { perKwh: 600 }             // €/kWh de batterie
  }
}

const REGIONS = Object.entries(SOLAR_DATA.regionProduction).map(([key, val]) => ({
  value: key, label: `${val.label} (${val.cities})`,
}))

const ORIENTATIONS = [
  { value: "sud", label: "Sud", factor: "100%", icon: "↑" },
  { value: "sud-est", label: "Sud-Est", factor: "96%", icon: "↗" },
  { value: "sud-ouest", label: "Sud-Ouest", factor: "96%", icon: "↖" },
  { value: "est", label: "Est", factor: "88%", icon: "→" },
  { value: "ouest", label: "Ouest", factor: "88%", icon: "←" },
]

const INCLINATIONS = [
  { value: "plat", label: "Plat", desc: "0-10°", factor: "93%" },
  { value: "faible", label: "Faible", desc: "10-20°", factor: "97%" },
  { value: "optimal", label: "Optimal", desc: "25-35°", factor: "100%" },
  { value: "moyen", label: "Moyen", desc: "35-45°", factor: "97%" },
  { value: "fort", label: "Fort", desc: ">45°", factor: "90%" },
]

// Calcul puissance recommandée basé sur la consommation
function calculateRecommendedPower(consumption: number, regionKey: string, orientFactor: number, incliFactor: number) {
  const regionData = SOLAR_DATA.regionProduction[regionKey as keyof typeof SOLAR_DATA.regionProduction]
  const productionPerKwc = regionData.annual * orientFactor * incliFactor
  const tauxAutoconsoMoyen = 0.40 // Moyenne sans batterie
  
  // On vise à couvrir ~85% des besoins avec l'autoconsommation
  const optimal = Math.round((consumption * 0.85) / (productionPerKwc * tauxAutoconsoMoyen) * 2) / 2
  return Math.max(3, Math.min(optimal, 18)) // Entre 3 et 18 kWc
}


// Composant Tooltip simple
function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <span className="relative group cursor-help">
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700" />
      </span>
    </span>
  )
}

export default function SimulateurSolairePage() {
  // États des entrées utilisateur
  const [consumption, setConsumption] = useState(8000)
  const [region, setRegion] = useState("idf")
  const [orientation, setOrientation] = useState("sud")
  const [inclination, setInclination] = useState("optimal")
  const [presence, setPresence] = useState("partiel")
  const [powerKwc, setPowerKwc] = useState(6)
  const [batteryKwh, setBatteryKwh] = useState(0)
  const [manualOverride, setManualOverride] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Facteurs calculés
  const orientFactor = SOLAR_DATA.orientationFactor[orientation as keyof typeof SOLAR_DATA.orientationFactor]
  const incliFactor = SOLAR_DATA.inclinationFactor[inclination as keyof typeof SOLAR_DATA.inclinationFactor]
  
  // Puissance recommandée automatique
  const recommendedPower = useMemo(() => {
    return calculateRecommendedPower(consumption, region, orientFactor, incliFactor)
  }, [consumption, region, orientFactor, incliFactor])
  
  // Mise à jour auto de la puissance si pas de modification manuelle
  useEffect(() => {
    if (!manualOverride) setPowerKwc(recommendedPower)
  }, [recommendedPower, manualOverride])

  
  // Calculs principaux
  const analysis = useMemo(() => {
    const d = SOLAR_DATA
    const regionData = d.regionProduction[region as keyof typeof d.regionProduction]
    
    // Production annuelle et saisonnière
    const productionAnnuelle = Math.round(regionData.annual * powerKwc * orientFactor * incliFactor)
    const productionEte = Math.round(regionData.summer * powerKwc * orientFactor * incliFactor)
    const productionHiver = Math.round(regionData.winter * powerKwc * orientFactor * incliFactor)
    const productionJourEte = Math.round((productionEte / 30) * 10) / 10
    const productionJourHiver = Math.round((productionHiver / 30) * 10) / 10
    
    // Taux d'autoconsommation selon batterie et présence
    let tauxAutoconso: number
    if (batteryKwh === 0) {
      tauxAutoconso = d.selfConsumptionRate.sansBatterie[presence as keyof typeof d.selfConsumptionRate.sansBatterie]
    } else {
      const rates = d.selfConsumptionRate.avecBatterie[String(batteryKwh) as keyof typeof d.selfConsumptionRate.avecBatterie]
      tauxAutoconso = rates ? rates[presence as keyof typeof rates] : 0.70
    }
    
    // Répartition de l'énergie
    const energieAutoconsommee = Math.min(Math.round(productionAnnuelle * tauxAutoconso), consumption)
    const surplus = productionAnnuelle - energieAutoconsommee
    const resteReseau = consumption - energieAutoconsommee
    const couverture = Math.round((energieAutoconsommee / consumption) * 100)
    
    // Installation physique
    const nbPanneaux = Math.ceil((powerKwc * 1000) / d.panelPower)
    const surface = Math.round(nbPanneaux * d.panelSurface * 10) / 10
    
    // Aides et tarifs
    const tarifRachat = powerKwc <= 9 ? d.feedInTariff.under9kWc : d.feedInTariff.under100kWc
    const primeKwc = powerKwc <= 9 ? d.selfConsumptionBonus.under9kWc : d.selfConsumptionBonus.under36kWc
    const tva = powerKwc <= 9 ? d.vat.under9kWc : d.vat.over9kWc
    
    // Économies annuelles
    const economieAutoconso = Math.round(energieAutoconsommee * d.electricityPrice.base)
    const revenuSurplus = Math.round(surplus * tarifRachat)
    const economieAnnuelle = economieAutoconso + revenuSurplus
    const economieMensuelle = Math.round(economieAnnuelle / 12)
    
    // Estimation coût installation
    const coutPanneaux = powerKwc * 1000 * (batteryKwh > 0 ? d.installationCost.withBattery.min : d.installationCost.panelsOnly.min)
    const coutBatterie = batteryKwh * d.installationCost.batteryOnly.perKwh
    const coutTotalHT = coutPanneaux + coutBatterie
    const coutTotalTTC = Math.round(coutTotalHT * (1 + tva))
    const coutApresAides = coutTotalTTC - Math.round(powerKwc * primeKwc)
    
    // Rentabilité
    const retourInvestissement = Math.round(coutApresAides / economieAnnuelle * 10) / 10
    
    // Impact environnemental
    const co2Evite = Math.round(productionAnnuelle * 0.05) // 50g CO2/kWh évité
    const kmVoiture = Math.round(co2Evite / 0.12) // ~120g CO2/km
    const arbres = Math.round(co2Evite / 25) // ~25kg CO2/arbre/an
    
    return {
      productionAnnuelle, productionEte, productionHiver, productionJourEte, productionJourHiver,
      tauxAutoconso: Math.round(tauxAutoconso * 100),
      energieAutoconsommee, surplus, resteReseau, couverture,
      nbPanneaux, surface,
      tarifRachat, primeKwc, primeTotal: Math.round(powerKwc * primeKwc), tva: Math.round(tva * 100),
      economieAutoconso, revenuSurplus, economieAnnuelle, economieMensuelle,
      coutTotalTTC, coutApresAides, retourInvestissement,
      co2Evite, kmVoiture, arbres,
      regionLabel: regionData.label,
    }
  }, [consumption, region, orientation, inclination, presence, powerKwc, batteryKwh, orientFactor, incliFactor])


  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Header professionnel */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Étude Solaire Personnalisée</h1>
                <p className="text-xs text-slate-400">Simulation basée sur vos données réelles</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Données officielles T1 2026</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        
        {/* Introduction pédagogique */}
        <div className="mb-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <div className="text-sm text-slate-300">
              <p className="font-medium text-blue-400 mb-1">Comment fonctionne cette étude ?</p>
              <p className="text-slate-400">
                Entrez votre consommation électrique annuelle (visible sur votre facture), 
                et nous calculons automatiquement l'installation idéale pour vous. 
                Tous les chiffres sont basés sur les tarifs officiels de mars 2026.
              </p>
            </div>
          </div>
        </div>


        {/* ═══════════════════════════════════════════════════════════════════
            ÉTAPE 1 : VOTRE CONSOMMATION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">1</div>
            <div>
              <h2 className="text-xl font-semibold text-white">Votre consommation électrique</h2>
              <p className="text-xs text-slate-400">Trouvez ce chiffre sur votre facture EDF/Engie</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Entrée consommation */}
              <div>
                <label className="block text-sm text-slate-300 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Consommation annuelle
                  <Tooltip text="Regardez votre facture annuelle ou multipliez votre facture mensuelle par 12">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                  </Tooltip>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={consumption}
                    onChange={(e) => { setConsumption(Number(e.target.value)); setManualOverride(false) }}
                    className="w-full bg-slate-900 border-2 border-blue-500/50 rounded-xl px-4 py-4 text-3xl font-bold text-white focus:border-blue-500 focus:outline-none transition-colors"
                    min="1000"
                    max="50000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kWh/an</span>
                </div>
                
                {/* Aide visuelle consommation */}
                <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
                  <p className="text-xs text-slate-400 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    Repères de consommation typiques :
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "Appartement (1-2 pers.)", range: "3 000 - 5 000", color: "bg-emerald-500" },
                      { label: "Maison moyenne (3-4 pers.)", range: "6 000 - 10 000", color: "bg-blue-500" },
                      { label: "Grande maison / tout élec.", range: "12 000 - 20 000", color: "bg-violet-500" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-xs text-slate-400 flex-1">{item.label}</span>
                        <span className="text-xs text-slate-500 font-mono">{item.range} kWh</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              
              {/* Région et présence */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    Votre région
                    <Tooltip text="L'ensoleillement varie selon les régions : +50% dans le Sud vs le Nord">
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                    </Tooltip>
                  </label>
                  <select
                    value={region}
                    onChange={(e) => { setRegion(e.target.value); setManualOverride(false) }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    {REGIONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-slate-300 mb-2 flex items-center gap-2">
                    <Home className="w-4 h-4 text-blue-400" />
                    Présence en journée
                    <Tooltip text="Plus vous êtes présent, plus vous consommez directement l'énergie produite">
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                    </Tooltip>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "absent", label: "Rarement", desc: "Au travail", icon: "🏢" },
                      { value: "partiel", label: "Parfois", desc: "Télétravail", icon: "💻" },
                      { value: "present", label: "Souvent", desc: "À la maison", icon: "🏠" },
                    ].map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setPresence(p.value)}
                        className={`p-3 rounded-xl text-center transition-all ${
                          presence === p.value 
                            ? 'bg-blue-500 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-800' 
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-700'
                        }`}
                      >
                        <span className="text-lg">{p.icon}</span>
                        <p className="font-medium text-sm mt-1">{p.label}</p>
                        <p className="text-xs opacity-70">{p.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            
            {/* Options avancées (orientation/inclinaison) */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <span className={`transform transition-transform ${showAdvanced ? 'rotate-90' : ''}`}>▶</span>
                Options avancées (orientation et inclinaison du toit)
              </button>
              
              {showAdvanced && (
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                  {/* Orientation */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Orientation de votre toiture
                      <span className="text-slate-500 ml-2 text-xs">(idéal : Sud)</span>
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {ORIENTATIONS.map((o) => (
                        <button
                          key={o.value}
                          onClick={() => { setOrientation(o.value); setManualOverride(false) }}
                          className={`p-2 rounded-lg text-center transition-all ${
                            orientation === o.value 
                              ? 'bg-amber-500 text-white' 
                              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-700'
                          }`}
                        >
                          <span className="text-lg">{o.icon}</span>
                          <p className="text-xs mt-1">{o.label}</p>
                          <p className="text-xs opacity-60">{o.factor}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Inclinaison */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Inclinaison du toit
                      <span className="text-slate-500 ml-2 text-xs">(idéal : 30°)</span>
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {INCLINATIONS.map((inc) => (
                        <button
                          key={inc.value}
                          onClick={() => { setInclination(inc.value); setManualOverride(false) }}
                          className={`p-2 rounded-lg text-center transition-all ${
                            inclination === inc.value 
                              ? 'bg-amber-500 text-white' 
                              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-700'
                          }`}
                        >
                          <p className="text-xs font-medium">{inc.label}</p>
                          <p className="text-xs opacity-60">{inc.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════════
            ÉTAPE 2 : INSTALLATION RECOMMANDÉE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg shadow-amber-500/30">2</div>
            <div>
              <h2 className="text-xl font-semibold text-white">L'installation adaptée à vos besoins</h2>
              <p className="text-xs text-slate-400">Calculée automatiquement selon votre consommation</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-900/20 to-slate-800/50 rounded-2xl p-6 border border-amber-500/30">
            {/* Explication du calcul */}
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-300 mb-2">
                <span className="text-amber-400 font-medium">💡 Comment on calcule ça ?</span>
              </p>
              <p className="text-xs text-slate-400">
                Vous consommez <span className="text-white font-medium">{consumption.toLocaleString()} kWh/an</span>. 
                En région <span className="text-white font-medium">{analysis.regionLabel}</span>, 
                1 kWc de panneaux produit environ <span className="text-white font-medium">{Math.round(SOLAR_DATA.regionProduction[region as keyof typeof SOLAR_DATA.regionProduction].annual * orientFactor * incliFactor)} kWh/an</span>.
                Pour couvrir vos besoins, il vous faut donc environ <span className="text-amber-400 font-bold">{recommendedPower} kWc</span>.
              </p>
            </div>
            
            {/* Recommandation principale */}
            <div className="text-center mb-6">
              <p className="text-slate-400 text-sm mb-2">Installation recommandée :</p>
              <div className="inline-flex items-baseline gap-2">
                <span className="text-6xl font-bold text-amber-400">{powerKwc}</span>
                <span className="text-2xl text-slate-400">kWc</span>
              </div>
              {manualOverride && powerKwc !== recommendedPower && (
                <p className="text-xs text-amber-400/70 mt-2">
                  (Recommandation : {recommendedPower} kWc)
                </p>
              )}
            </div>
            
            {/* Visualisation panneaux */}
            <div className="flex flex-wrap justify-center gap-1 mb-4">
              {Array.from({ length: Math.min(analysis.nbPanneaux, 24) }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-8 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-sm border border-blue-500/50 flex items-center justify-center"
                  title={`Panneau ${i + 1}`}
                >
                  <div className="w-6 h-4 border border-blue-400/30 rounded-sm" />
                </div>
              ))}
              {analysis.nbPanneaux > 24 && (
                <span className="text-slate-500 text-sm self-center ml-2">+{analysis.nbPanneaux - 24}</span>
              )}
            </div>
            
            <p className="text-center text-slate-400 text-sm mb-6">
              <span className="text-white font-medium">{analysis.nbPanneaux} panneaux</span> de 500W 
              = <span className="text-white font-medium">{analysis.surface} m²</span> de toiture
            </p>

            
            {/* Slider ajustement */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Ajuster manuellement :</span>
                {manualOverride && (
                  <button 
                    onClick={() => { setManualOverride(false); setPowerKwc(recommendedPower) }}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                  >
                    ↺ Revenir à la recommandation
                  </button>
                )}
              </div>
              <input
                type="range"
                min="3"
                max="18"
                step="0.5"
                value={powerKwc}
                onChange={(e) => { setManualOverride(true); setPowerKwc(Number(e.target.value)) }}
                className="w-full h-3 bg-slate-700 rounded-full appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>3 kWc</span>
                <span>9 kWc</span>
                <span>18 kWc</span>
              </div>
            </div>
            
            {/* Option batterie */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Battery className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-white font-medium">Ajouter une batterie de stockage ?</span>
                <Tooltip text="La batterie stocke l'électricité produite le jour pour l'utiliser le soir quand le soleil est couché">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                </Tooltip>
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-3 mb-4">
                <p className="text-xs text-slate-400">
                  <span className="text-blue-400">🔋 À quoi ça sert ?</span> Sans batterie, l'électricité non utilisée immédiatement est revendue à EDF (à seulement 0,04€/kWh). 
                  Avec une batterie, vous la gardez pour le soir et économisez 0,194€/kWh !
                </p>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  { val: 0, label: "Sans", desc: "Pas de batterie" },
                  { val: 5, label: "5 kWh", desc: "1 soirée" },
                  { val: 10, label: "10 kWh", desc: "1-2 soirées" },
                  { val: 15, label: "15 kWh", desc: "2+ soirées" },
                ].map((b) => (
                  <button
                    key={b.val}
                    onClick={() => setBatteryKwh(b.val)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      batteryKwh === b.val 
                        ? 'bg-blue-500 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-800' 
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    <p className="font-medium text-sm">{b.label}</p>
                    <p className="text-xs opacity-70">{b.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════════
            ÉTAPE 3 : RÉSULTATS - CE QUE ÇA DONNE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30">3</div>
            <div>
              <h2 className="text-xl font-semibold text-white">Ce que ça donne concrètement</h2>
              <p className="text-xs text-slate-400">Production, économies et impact</p>
            </div>
          </div>
          
          {/* Schéma explicatif du flux d'énergie */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
            <h3 className="text-center text-slate-300 text-sm mb-2 font-medium">Le parcours de votre électricité solaire</h3>
            <p className="text-center text-xs text-slate-500 mb-6">Voici comment l'énergie circule dans votre installation</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Soleil */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-amber-500/30 animate-pulse">
                  <Sun className="w-10 h-10 text-white" />
                </div>
                <p className="text-xs text-slate-400 font-medium">☀️ Soleil</p>
                <p className="text-xs text-slate-500">Énergie gratuite</p>
              </div>
              
              <ArrowRight className="w-8 h-8 text-amber-500/50 rotate-90 md:rotate-0 shrink-0" />
              
              {/* Panneaux */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
                  <div className="grid grid-cols-2 gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-4 h-4 bg-blue-400/50 rounded-sm border border-blue-300/30" />)}
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium">⚡ Vos panneaux</p>
                <p className="text-lg font-bold text-amber-400">{analysis.productionAnnuelle.toLocaleString()} kWh/an</p>
              </div>
              
              <ArrowRight className="w-8 h-8 text-emerald-500/50 rotate-90 md:rotate-0 shrink-0" />
              
              {/* Maison */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/30">
                  <Home className="w-10 h-10 text-white" />
                </div>
                <p className="text-xs text-slate-400 font-medium">🏠 Vous utilisez</p>
                <p className="text-lg font-bold text-emerald-400">{analysis.energieAutoconsommee.toLocaleString()} kWh</p>
                <p className="text-xs text-slate-500">({analysis.tauxAutoconso}% autoconso)</p>
              </div>
              
              {analysis.surplus > 0 && (
                <>
                  <div className="text-slate-600 text-2xl hidden md:block">+</div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-violet-500/30">
                      <Euro className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">💰 Surplus revendu</p>
                    <p className="text-lg font-bold text-violet-400">{analysis.surplus.toLocaleString()} kWh</p>
                    <p className="text-sm text-emerald-400 font-bold">= {analysis.revenuSurplus} €/an</p>
                    <p className="text-xs text-slate-500">à {analysis.tarifRachat}€/kWh</p>
                  </div>
                </>
              )}
            </div>
          </div>

          
          {/* Cartes de résultats */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Couverture des besoins + Achat EDF */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Home className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Besoins couverts par le solaire</p>
                  <p className="text-3xl font-bold text-white">{analysis.couverture}%</p>
                </div>
              </div>
              
              {/* Barre de progression */}
              <div className="h-4 bg-slate-700 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(analysis.couverture, 100)}%` }}
                />
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Votre consommation totale</span>
                  <span className="text-white font-medium">{consumption.toLocaleString()} kWh/an</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>✓ Couvert par vos panneaux</span>
                  <span className="font-medium">{analysis.energieAutoconsommee.toLocaleString()} kWh</span>
                </div>
                <div className="flex justify-between text-orange-400 pt-2 border-t border-slate-700">
                  <span>⚡ Reste à acheter chez EDF</span>
                  <span className="font-medium">{analysis.resteReseau.toLocaleString()} kWh</span>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-2 mt-2 border border-orange-500/20">
                  <p className="text-orange-300">
                    💰 Coût annuel EDF restant : <span className="font-bold">{Math.round(analysis.resteReseau * 0.194)} €/an</span>
                  </p>
                  <p className="text-orange-400/60 text-[10px] mt-1">
                    (au lieu de {Math.round(consumption * 0.194)} € sans panneaux)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Production saisonnière */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-400" />
                </div>
                <p className="text-sm text-slate-300 font-medium">Production selon la saison</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2 text-orange-400">
                      <ThermometerSun className="w-4 h-4" /> Été (juin-août)
                    </span>
                    <span className="text-white font-medium">{analysis.productionEte} kWh/mois</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">≈ {analysis.productionJourEte} kWh/jour</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2 text-blue-400">
                      <Snowflake className="w-4 h-4" /> Hiver (déc-fév)
                    </span>
                    <span className="text-white font-medium">{analysis.productionHiver} kWh/mois</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" 
                      style={{ width: `${(analysis.productionHiver / analysis.productionEte) * 100}%` }} 
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">≈ {analysis.productionJourHiver} kWh/jour</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 mt-3 p-2 bg-slate-900/50 rounded-lg">
                ☀️ En été, vos panneaux produisent <span className="text-amber-400 font-medium">{Math.round(analysis.productionEte / analysis.productionHiver)}× plus</span> qu'en hiver
              </p>
            </div>

            
            {/* Impact environnemental */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-sm text-slate-300 font-medium">Votre impact positif</p>
              </div>
              
              <div className="text-center py-3 mb-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <p className="text-3xl font-bold text-green-400">{analysis.co2Evite} kg</p>
                <p className="text-xs text-slate-400">de CO₂ évité chaque année</p>
              </div>
              
              <p className="text-xs text-slate-400 mb-3">C'est équivalent à :</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{analysis.kmVoiture.toLocaleString()} km</p>
                    <p className="text-xs text-slate-500">en voiture évités</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <TreePine className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{analysis.arbres} arbres</p>
                    <p className="text-xs text-slate-500">plantés pendant 1 an</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Encadré récapitulatif surplus */}
          {analysis.surplus > 0 && (
            <div className="mt-4 bg-gradient-to-r from-violet-900/30 to-slate-800/50 rounded-2xl p-5 border border-violet-500/30">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Euro className="w-5 h-5 text-violet-400" />
                Revente du surplus à l'État (EDF OA)
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-violet-400">{analysis.surplus.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">kWh de surplus/an</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">{analysis.tarifRachat} €</p>
                  <p className="text-xs text-slate-400">prix de rachat/kWh</p>
                </div>
                <div className="bg-violet-500/20 rounded-xl p-4 text-center border border-violet-500/30">
                  <p className="text-2xl font-bold text-emerald-400">{analysis.revenuSurplus} €/an</p>
                  <p className="text-xs text-slate-300">revenus garantis 20 ans</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                💡 Ce surplus, c'est l'électricité que vos panneaux produisent mais que vous n'utilisez pas (ex: en journée quand vous n'êtes pas là). 
                EDF vous la rachète automatiquement via un contrat de 20 ans.
              </p>
            </div>
          )}
        </section>


        {/* ═══════════════════════════════════════════════════════════════════
            ÉTAPE 4 : AIDES ET ÉCONOMIES
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/30">4</div>
            <div>
              <h2 className="text-xl font-semibold text-white">Aides de l'État et économies</h2>
              <p className="text-xs text-slate-400">Ce que vous gagnez avec cette installation</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Aides disponibles */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-400" />
                Les aides auxquelles vous avez droit
              </h3>
              
              <div className="space-y-4">
                {/* Prime autoconsommation */}
                <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-emerald-400 font-medium flex items-center gap-2">
                        <Euro className="w-4 h-4" />
                        Prime à l'autoconsommation
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Versée automatiquement 1 an après l'installation</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{analysis.primeTotal} €</p>
                  </div>
                  <div className="text-xs text-slate-500 bg-slate-900/50 rounded-lg p-2 mt-2">
                    Calcul : {analysis.primeKwc} €/kWc × {powerKwc} kWc = <span className="text-emerald-400">{analysis.primeTotal} €</span>
                  </div>
                </div>
                
                {/* TVA réduite */}
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-blue-400 font-medium">TVA réduite</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {powerKwc <= 9 
                          ? "Taux réduit à 5,5% car installation ≤ 9 kWc" 
                          : "Taux normal 20% car installation > 9 kWc"}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-white">{analysis.tva}%</p>
                  </div>
                </div>
                
                {/* Rachat surplus */}
                <div className="bg-violet-500/10 rounded-xl p-4 border border-violet-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-violet-400 font-medium">Rachat du surplus par EDF</p>
                      <p className="text-xs text-slate-400 mt-1">Contrat garanti 20 ans avec EDF OA</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">{analysis.tarifRachat} €</p>
                      <p className="text-xs text-slate-500">par kWh</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 mt-4 flex items-center gap-1 p-2 bg-slate-900/30 rounded-lg">
                <HelpCircle className="w-3 h-3 shrink-0" />
                Sources : service-public.fr, arrêté tarifaire T1 2026
              </p>
            </div>

            
            {/* Économies */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-slate-800/50 rounded-2xl p-6 border border-emerald-500/30">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-emerald-400" />
                Vos économies chaque année
              </h3>
              
              <div className="text-center py-6 bg-slate-900/50 rounded-xl mb-4">
                <p className="text-slate-400 text-sm mb-2">Économies annuelles estimées</p>
                <p className="text-5xl font-bold text-emerald-400">{analysis.economieAnnuelle} €</p>
                <p className="text-slate-400 text-sm mt-2">
                  soit environ <span className="text-white font-medium">{analysis.economieMensuelle} €/mois</span>
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm text-slate-300">Électricité non achetée</span>
                  </div>
                  <span className="text-emerald-400 font-medium">+{analysis.economieAutoconso} €/an</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                    <span className="text-sm text-slate-300">Surplus vendu à EDF</span>
                  </div>
                  <span className="text-violet-400 font-medium">+{analysis.revenuSurplus} €/an</span>
                </div>
              </div>
              
              {/* Conseil batterie */}
              {batteryKwh === 0 && analysis.surplus > 1500 && (
                <div className="mt-4 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-200/80">
                      <strong>💡 Conseil :</strong> Vous avez beaucoup de surplus ({analysis.surplus.toLocaleString()} kWh). 
                      Avec une batterie, vous pourriez utiliser cette énergie le soir au lieu de la revendre à seulement 0,04€/kWh.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Estimation rentabilité */}
              <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-300 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Estimation de rentabilité
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-slate-500">Coût estimé (après aides)</p>
                    <p className="text-lg font-bold text-white">{analysis.coutApresAides.toLocaleString()} €</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Rentabilisé en</p>
                    <p className="text-lg font-bold text-amber-400">~{analysis.retourInvestissement} ans</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Durée de vie des panneaux : 25-30 ans
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════════
            RÉCAPITULATIF FINAL
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-slate-800 via-slate-800/80 to-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
              📋 Récapitulatif de votre projet solaire
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-amber-400">{powerKwc}</p>
                <p className="text-xs text-slate-400 mt-1">kWc installés</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-blue-400">{analysis.nbPanneaux}</p>
                <p className="text-xs text-slate-400 mt-1">panneaux</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-emerald-400">{analysis.couverture}%</p>
                <p className="text-xs text-slate-400 mt-1">besoins couverts</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-violet-400">{analysis.primeTotal}€</p>
                <p className="text-xs text-slate-400 mt-1">prime État</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-green-400">{analysis.economieAnnuelle}€</p>
                <p className="text-xs text-slate-400 mt-1">économies/an</p>
              </div>
            </div>
            
            {batteryKwh > 0 && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-sm text-blue-400">
                  <Battery className="w-4 h-4" />
                  + Batterie {batteryKwh} kWh
                </span>
              </div>
            )}
          </div>
        </section>

        {/* CTA Final */}
        <section>
          <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 rounded-2xl p-8 text-center border border-emerald-500/30">
            <p className="text-slate-300 mb-2">Cette simulation est une estimation basée sur vos données.</p>
            <p className="text-white font-medium mb-6">Pour une étude précise adaptée à votre toiture, contactez-nous.</p>
            
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
            
            <p className="text-xs text-slate-500 mt-6">
              Greenter - Installation photovoltaïque en France
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}