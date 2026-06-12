"use client"

import { useState } from "react"
import Image from "next/image"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import {
  Phone, CheckCircle, ArrowRight, Shield, Zap, Leaf, Clock, Euro, Award,
  AlertTriangle, Building2, Wrench, FileCheck, Sun, Battery, Car,
  TrendingDown, ChevronDown, ChevronUp,
} from "lucide-react"

const LP_PHONE_RAW = "+33609455056"
const LP_PHONE_DISPLAY = "06 09 45 50 56"

export function SolaireLanding() {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({ type: "", surface: "", name: "", company: "", phone: "", email: "", website: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    setFormStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.name}${form.company ? ` — ${form.company}` : ""}`,
          phone: form.phone,
          email: form.email,
          service: "Panneaux solaires B2B",
          message: `Établissement : ${form.type} — Surface : ${form.surface}`,
          website: form.website,
        }),
      })
      setFormStatus(res.ok ? "success" : "error")
    } catch {
      setFormStatus("error")
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-neutral-900 transition-all placeholder:text-neutral-400"

  const faqs = [
    {
      q: "Qu'est-ce que le modèle de financement en leasing solaire ?",
      a: "Greenter finance l'intégralité des équipements (panneaux, ombrières, onduleurs, batteries). Vous payez uniquement l'électricité que vous consommez, à un tarif inférieur au marché et indexé sur 20 ans. Aucun investissement initial, aucune immobilisation de trésorerie, aucun risque matériel.",
    },
    {
      q: "Qui est concerné par la Loi APER ?",
      a: "Tous les parkings extérieurs de plus de 80 places doivent installer des ombrières photovoltaïques. Les parkings de 80 à 400 places doivent couvrir au moins 50% de leur surface ; au-delà de 400 places, la couverture doit être totale. Notre équipe analyse votre situation et vous accompagne dans la mise en conformité.",
    },
    {
      q: "Qu'est-ce que le Décret Tertiaire ?",
      a: "Le Décret Tertiaire impose aux bâtiments tertiaires de plus de 1 000 m² une réduction de la consommation énergétique de 40% en 2030, 50% en 2040 et 60% en 2050 par rapport à 2010. L'autoconsommation solaire est l'un des leviers les plus efficaces et les plus rapides à activer.",
    },
    {
      q: "Quelle surface faut-il pour qu'un projet soit viable ?",
      a: "À partir de 200 m² de toiture ou de parking disponibles, un projet solaire est économiquement pertinent. Les projets optimaux se situent entre 500 m² et plusieurs milliers de m² pour les entrepôts et sites industriels.",
    },
    {
      q: "Qui gère les démarches administratives ?",
      a: "Greenter prend en charge la totalité : déclaration préalable ou permis de construire en mairie, dossier de raccordement Enedis, demandes de conventions, et déclaration sur OPERAT pour le Décret Tertiaire. Vous signez, nous gérons.",
    },
    {
      q: "Peut-on coupler les panneaux avec des bornes de recharge ?",
      a: "Oui, c'est l'une de nos solutions les plus demandées. En associant panneaux solaires et bornes IRVE, votre flotte de véhicules électriques se recharge directement avec votre production solaire, réduisant encore davantage vos coûts énergétiques.",
    },
    {
      q: "Que se passe-t-il en cas de panne ou d'incident ?",
      a: "La maintenance préventive et curative est incluse dans le contrat de leasing. Greenter garantit un taux de disponibilité de l'installation et intervient à ses frais pour toute réparation. Un monitoring en temps réel est accessible depuis votre espace client.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ── URGENCY BANNER ─────────────────────────────────────────────────── */}
      <div className="bg-amber-500 text-white py-2.5 px-4 text-center text-sm font-medium">
        <AlertTriangle className="inline w-4 h-4 mr-1.5 mb-0.5" />
        <strong>Loi APER :</strong> parkings de +80 places — obligation d&apos;ombrières solaires avant juillet 2026.{" "}
        <a href="#etude" className="underline font-bold">Vérifiez votre conformité →</a>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative text-white bg-slate-900">
        {/* DESKTOP ONLY: full-width background image */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/images/lp/solaire-hero-v2.jpg"
            alt="Rangées de panneaux solaires photovoltaïques sur toiture plate en milieu urbain"
            fill
            priority
            className="object-cover object-left"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-slate-900/90 via-slate-900/65 to-slate-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 lg:gap-12 lg:items-center">

            {/* Left — mobile: own image bg, full width */}
            <div className="relative py-16 lg:py-24 -mx-4 sm:-mx-6 lg:mx-0">
              {/* MOBILE ONLY: image behind text */}
              <div className="absolute inset-0 lg:hidden">
                <Image
                  src="/images/lp/solaire-hero-v2.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: '19% center' }}
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-slate-900/45 via-slate-900/40 to-slate-900/55" />
              <div className="relative z-10 px-4 sm:px-6 lg:px-0 [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.55))] lg:[filter:none]">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Award className="w-4 h-4 text-blue-300" />
                Leasing solaire B2B · RGE QualiPV · Île-de-France
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 tracking-tight">
                Installation de panneaux solaires{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  en leasing
                </span>
              </h1>

              <p className="text-lg text-blue-200 mb-2 font-medium">
                Pour entreprises, entrepôts, collectivités — à partir de 200 m²
              </p>

              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Greenter installe vos panneaux en toiture ou en ombrières de parking et vous les loue sur 20 ans.
                Vous consommez votre propre électricité à <strong className="text-white">tarif fixe inférieur au marché</strong> — sans débourser un euro à l&apos;avance.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Leasing 20 ans — aucune immobilisation de capital",
                  "Loyer mensuel fixe, indexé sous l'inflation",
                  "−30 à −50% sur votre facture d'électricité dès le 1er mois",
                  "Maintenance, monitoring et SAV inclus dans le loyer",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#etude"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:scale-[1.02]"
                >
                  <Sun className="w-5 h-5" />
                  Obtenir une étude gratuite
                </a>
                <PhoneCallTracker
                  phoneNumber={LP_PHONE_RAW}
                  displayNumber={LP_PHONE_DISPLAY}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-slate-900 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {LP_PHONE_DISPLAY}
                </PhoneCallTracker>
              </div>
            </div>
            </div>

            {/* Right: Form — mobile: plain white bg; desktop: transparent (section image shows) */}
            <div id="etude" className="bg-white lg:bg-transparent py-10 lg:py-24 scroll-mt-8 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
              <div className="bg-white rounded-3xl shadow-2xl p-8">

                {formStatus === "success" ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-9 h-9 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Demande bien reçue !</h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      Notre expert vous contacte sous <strong>24h ouvrées</strong> avec une simulation personnalisée.
                    </p>
                    <div className="bg-blue-50 rounded-2xl p-4 text-left space-y-2 text-sm text-neutral-700 mb-5">
                      <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" /> Étude de faisabilité technique gratuite</p>
                      <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" /> Simulation d&apos;économies personnalisée</p>
                      <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" /> Analyse conformité Loi APER / Décret Tertiaire</p>
                    </div>
                    <PhoneCallTracker phoneNumber={LP_PHONE_RAW} displayNumber={LP_PHONE_DISPLAY} className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm underline">
                      <Phone className="w-4 h-4" /> Appeler directement
                    </PhoneCallTracker>
                  </div>
                ) : (
                  <>
                    {/* Form header */}
                    <div className="mb-5 pb-5 border-b border-neutral-100">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
                            Étude gratuite · Sans engagement
                          </p>
                          <h2 className="text-xl font-bold text-neutral-900 leading-tight">
                            {step === 1 ? "Estimez votre potentiel solaire" : "Recevez votre étude personnalisée"}
                          </h2>
                          {step === 1 && (
                            <p className="text-sm text-neutral-500 mt-1.5 leading-snug">
                              2 questions, puis un <strong className="text-neutral-700">expert vous rappelle sous 24h</strong> avec une simulation chiffrée.
                            </p>
                          )}
                        </div>
                        <span className="flex-shrink-0 text-xs font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full mt-0.5">
                          {step}/2
                        </span>
                      </div>
                      <div className="mt-3 w-full bg-neutral-100 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: step === 1 ? "50%" : "100%" }}
                        />
                      </div>
                    </div>

                    {/* Step 1 */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <p className="text-sm font-semibold text-neutral-700 mb-2">Type d&apos;établissement :</p>
                          <div className="grid grid-cols-1 gap-2">
                            {[
                              { value: "Entrepôt / Logistique", icon: "🏭" },
                              { value: "Bureaux / Commerce", icon: "🏢" },
                              { value: "Industrie / Production", icon: "⚙️" },
                              { value: "Collectivité / Tertiaire public", icon: "🏛️" },
                            ].map(({ value, icon }) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setForm((p) => ({ ...p, type: value }))}
                                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                  form.type === value
                                    ? "border-blue-600 bg-blue-50 text-blue-800"
                                    : "border-neutral-200 hover:border-blue-300 text-neutral-700"
                                }`}
                              >
                                <span className="text-lg">{icon}</span>
                                {value}
                                {form.type === value && <CheckCircle className="w-4 h-4 text-blue-600 ml-auto flex-shrink-0" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-neutral-700 mb-2">Surface disponible (toiture / parking) :</p>
                          <div className="grid grid-cols-2 gap-2">
                            {["Moins de 500 m²", "500 – 2 000 m²", "2 000 – 5 000 m²", "Plus de 5 000 m²"].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setForm((p) => ({ ...p, surface: s }))}
                                className={`px-3 py-3 rounded-xl border-2 text-sm font-medium transition-all text-center ${
                                  form.surface === s
                                    ? "border-blue-600 bg-blue-50 text-blue-800"
                                    : "border-neutral-200 hover:border-blue-300 text-neutral-700"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={!form.type || !form.surface}
                          onClick={() => setStep(2)}
                          className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-blue-700/30 hover:shadow-xl hover:-translate-y-0.5"
                        >
                          Continuer — voir mon potentiel →
                        </button>
                        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 pt-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</span>
                            Votre site
                          </span>
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                          <span className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</span>
                            Contact
                          </span>
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                          <span className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</span>
                            Étude 24h
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 text-center">🔒 Gratuit · Sans engagement · Données confidentielles</p>
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <form onSubmit={submitForm} className="space-y-4">
                        <input type="text" tabIndex={-1} autoComplete="off"
                          value={form.website}
                          onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                          className="hidden"
                        />
                        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-blue-800 font-medium">
                          ✓ {form.type} · {form.surface}
                        </div>
                        <input type="text" placeholder="Prénom et nom *" required
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          className={inputCls}
                        />
                        <input type="text" placeholder="Société *" required
                          value={form.company}
                          onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                          className={inputCls}
                        />
                        <div>
                          <input type="tel" placeholder="Téléphone *" required
                            value={form.phone}
                            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                            className={inputCls}
                          />
                          <p className="text-xs text-neutral-400 mt-1 pl-1">Un expert vous rappelle sous 24h ouvrées</p>
                        </div>
                        <input type="email" placeholder="Email professionnel"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className={inputCls}
                        />
                        <button type="submit" disabled={formStatus === "loading"}
                          className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-70 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-blue-700/30 hover:shadow-xl hover:-translate-y-0.5"
                        >
                          {formStatus === "loading" ? "Envoi en cours..." : "Recevoir mon étude gratuite →"}
                        </button>
                        {formStatus === "error" && (
                          <p className="text-red-600 text-sm text-center">
                            Une erreur est survenue.{" "}
                            <PhoneCallTracker phoneNumber={LP_PHONE_RAW} displayNumber={LP_PHONE_DISPLAY} className="underline font-medium">Appelez-nous.</PhoneCallTracker>
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-1">
                          <button type="button" onClick={() => setStep(1)} className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">← Modifier</button>
                          <p className="text-xs text-neutral-400">🔒 Données confidentielles</p>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>
              <p className="text-center text-slate-400 lg:text-white/70 text-xs mt-3 font-medium">
                ★ Solution adoptée par des entreprises et collectivités en Île-de-France
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE SHOWCASE ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/lp/solaire-b2b-batiment-industriel.jpg"
                alt="Bâtiment industriel avec panneaux solaires en toiture et ombrières photovoltaïques de parking"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 hidden sm:block bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold text-neutral-900">Panneaux en toiture + ombrières de parking</p>
                <p className="text-xs text-neutral-500">Double valorisation de votre site industriel</p>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Sun className="w-4 h-4" />
                Deux solutions, un seul contrat
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
                Toiture et parking : chaque m² devient productif
              </h2>
              <ul className="space-y-5 mb-8">
                {[
                  {
                    icon: Sun,
                    title: "Panneaux en toiture plate ou inclinée",
                    desc: "Valorisez chaque m² de couverture. Conception sur mesure pour maximiser la production annuelle selon l'orientation et l'ombrage de votre bâtiment.",
                  },
                  {
                    icon: Car,
                    title: "Ombrières de parking — conformité Loi APER",
                    desc: "Transformez votre parking en actif productif tout en répondant à l'obligation légale pour les 80+ places. Abrite les véhicules et alimente les bornes IRVE.",
                  },
                  {
                    icon: Shield,
                    title: "0 € d'investissement, 20 ans de garantie",
                    desc: "Greenter finance, installe et exploite l'ensemble. Vous consommez l'énergie produite à un tarif fixe, sans aucun risque matériel ou administratif.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm mb-1">{title}</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="#etude"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/20"
              >
                Obtenir une étude gratuite
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-blue-800 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "0 €", label: "d'investissement initial" },
              { value: "−40%", label: "sur la facture d'électricité" },
              { value: "20 ans", label: "contrat & maintenance inclus" },
              { value: "100%", label: "des démarches prises en charge" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">{s.value}</div>
                <p className="text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOUS FINANÇONS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Euro className="w-4 h-4" />
              Financement intégral
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Nous finançons 100% de vos équipements
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Aucune mobilisation de trésorerie. Greenter investit et vous consommez l&apos;énergie produite à prix préférentiel et stable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sun, bg: "bg-yellow-50", color: "text-yellow-600", border: "hover:ring-yellow-200",
                title: "Panneaux photovoltaïques",
                sub: "Toiture & ombrières de parking",
                desc: "Installation sur toiture plate ou inclinée, et en ombrières au-dessus de vos places de stationnement. Conception sur mesure pour maximiser la production annuelle.",
              },
              {
                icon: Car, bg: "bg-blue-50", color: "text-blue-600", border: "hover:ring-blue-200",
                title: "Bornes de recharge IRVE",
                sub: "Recharge flotte véhicules électriques",
                desc: "Couplées à votre production solaire, vos bornes IRVE alimentent directement votre flotte, quasi gratuitement en journée. Un double avantage économique et environnemental.",
              },
              {
                icon: Battery, bg: "bg-green-50", color: "text-green-600", border: "hover:ring-green-200",
                title: "Batteries de stockage",
                sub: "Optimisation de l'autoconsommation",
                desc: "Le surplus produit en journée est stocké et restitué en soirée ou par temps nuageux. Maximisez votre taux d'autoconsommation et réduisez la dépendance au réseau.",
              },
            ].map((item) => (
              <div key={item.title} className={`bg-white rounded-3xl p-8 ring-1 ring-neutral-100 ${item.border} hover:shadow-xl transition-all group`}>
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-neutral-400 mb-3">{item.sub}</p>
                <p className="text-neutral-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOUS PRENONS EN CHARGE + OMBRIÈRES IMAGE ───────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Wrench className="w-4 h-4" />
                Clé en main
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8 leading-tight">
                Nous gérons tout, de A à Z
              </h2>
              <ul className="space-y-6 mb-10">
                {[
                  {
                    icon: Wrench,
                    title: "Supervision complète du chantier",
                    desc: "Nos équipes RGE QualiPV prennent en charge l'intégralité des travaux. Vous n'avez rien à coordonner — votre activité n'est pas interrompue.",
                  },
                  {
                    icon: FileCheck,
                    title: "Toutes les démarches administratives",
                    desc: "Permis, déclarations mairie, dossiers Enedis et préfecture, déclaration OPERAT pour le Décret Tertiaire — nous gérons la totalité des procédures.",
                  },
                  {
                    icon: Zap,
                    title: "Raccordement réseau inclus",
                    desc: "Autoconsommation individuelle, collective ou injection réseau : nous choisissons avec vous le modèle le plus adapté à votre site et à vos besoins.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 mb-1">{item.title}</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="#etude" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/20">
                Demander une étude gratuite <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/lp/solaire-b2b-ombriere-parking.jpg"
                alt="Ombrières solaires photovoltaïques sur parking d'entreprise en Île-de-France"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 hidden sm:block bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3">
                <p className="text-xs font-bold text-neutral-900">Ombrières photovoltaïques de parking</p>
                <p className="text-xs text-neutral-500">Valorisation du foncier + production d&apos;énergie + conformité Loi APER</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOUS PROFITEZ ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Ce que vous gagnez
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Des bénéfices concrets, mesurables dès la première année.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingDown, bg: "bg-green-50", color: "text-green-700",
                stat: "−30 à −50%", title: "Facture d'énergie réduite",
                desc: "Une énergie propre, locale et à prix fixe sur 20 ans — indépendante des hausses du marché. Votre compétitivité est renforcée durablement.",
              },
              {
                icon: Building2, bg: "bg-blue-50", color: "text-blue-700",
                stat: "Valorisation", title: "Actif foncier & image RSE",
                desc: "Votre toiture ou votre parking deviennent des actifs productifs. Affichez un engagement environnemental concret à vos clients, partenaires et investisseurs.",
              },
              {
                icon: Shield, bg: "bg-purple-50", color: "text-purple-700",
                stat: "20 ans", title: "Performance garantie",
                desc: "Maintenance préventive et curative incluse, monitoring en temps réel, taux de disponibilité garanti contractuellement. Zéro surprise.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-8 ring-1 ring-neutral-100 hover:ring-blue-200 hover:shadow-xl transition-all group text-center">
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div className={`text-3xl font-black ${item.color} mb-2`}>{item.stat}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONFORMITÉ RÉGLEMENTAIRE ───────────────────────────────────────── */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <AlertTriangle className="w-4 h-4" />
              Obligations légales en vigueur
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Êtes-vous en conformité ?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Deux réglementations imposent des obligations aux entreprises et collectivités. Greenter vous aide à y répondre sans investissement de votre part.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                law: "Loi APER", subtitle: "Accélération des Énergies Renouvelables",
                deadline: "Échéance : juillet 2026 – 2028",
                border: "border-yellow-500", badge: "bg-yellow-500/20 text-yellow-300",
                desc: "Tout parking extérieur de plus de 80 places doit être équipé d'ombrières photovoltaïques. Le non-respect expose à des sanctions pouvant atteindre 40 000 €.",
                items: [
                  "80 à 400 places : au moins 50% de la surface à couvrir",
                  "Plus de 400 places : couverture totale obligatoire",
                  "Délai déjà écoulé pour les parkings de 400+ places (depuis 2023)",
                ],
              },
              {
                law: "Décret Tertiaire", subtitle: "Éco-Énergie Tertiaire",
                deadline: "Objectif : −40% de conso en 2030",
                border: "border-blue-500", badge: "bg-blue-500/20 text-blue-300",
                desc: "Les bâtiments tertiaires de plus de 1 000 m² doivent réduire leur consommation énergétique. L'autoconsommation solaire est l'un des leviers les plus efficaces.",
                items: [
                  "−40% de consommation énergétique d'ici 2030",
                  "−50% d'ici 2040, −60% d'ici 2050 (base 2010)",
                  "Déclaration obligatoire sur la plateforme OPERAT",
                ],
              },
            ].map((item) => (
              <div key={item.law} className={`bg-slate-800 rounded-3xl p-8 border-l-4 ${item.border}`}>
                <div className={`inline-flex items-center gap-2 ${item.badge} text-xs font-semibold px-3 py-1.5 rounded-full mb-4`}>
                  <Clock className="w-3.5 h-3.5" />
                  {item.deadline}
                </div>
                <h3 className="text-2xl font-black text-white mb-1">{item.law}</h3>
                <p className="text-slate-400 text-sm mb-4">{item.subtitle}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{item.desc}</p>
                <ul className="space-y-2">
                  {item.items.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#etude" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-slate-900 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
              Vérifier ma conformité gratuitement
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              De l&apos;étude à la mise en service
            </h2>
            <p className="text-neutral-600 text-lg">Un parcours entièrement piloté par Greenter</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: 1, icon: Sun, title: "Étude gratuite", duration: "Sous 48h", desc: "Analyse de votre site, simulation de production et d'économies, vérification de votre situation vis-à-vis de la Loi APER et du Décret Tertiaire." },
              { n: 2, icon: FileCheck, title: "Conception & financement", duration: "2 – 4 semaines", desc: "Plan d'installation sur mesure, signature du contrat de leasing, montage de l'ensemble des dossiers administratifs." },
              { n: 3, icon: Wrench, title: "Installation", duration: "Selon surface", desc: "Chantier supervisé de A à Z par nos équipes certifiées RGE. Raccordement réseau et mise en service des équipements." },
              { n: 4, icon: Shield, title: "Exploitation & suivi", duration: "20 ans inclus", desc: "Monitoring en temps réel, maintenance préventive, reporting de performance disponible depuis votre espace client en ligne." },
            ].map((s) => (
              <div key={s.n} className="relative bg-white rounded-2xl p-6 ring-1 ring-neutral-100 hover:ring-blue-200 hover:shadow-xl transition-all text-center group">
                <div className="relative w-14 h-14 mx-auto mb-4">
                  <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <s.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 text-slate-900 rounded-full text-xs font-black flex items-center justify-center">{s.n}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-blue-600 font-semibold mb-3">
                  <Clock className="w-3 h-3" /> {s.duration}
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{s.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Questions fréquentes</h2>
            <p className="text-neutral-600">Tout ce que vous devez savoir avant de vous lancer</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-neutral-900 pr-4 text-sm">{faq.q}</span>
                  {faqOpen === i
                    ? <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  }
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-5 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Sun className="w-4 h-4" />
            Étude gratuite · Réponse sous 24h
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
            Transformez votre site<br />en centrale d&apos;énergie
          </h2>
          <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
            Sans investissement, sans risque, en conformité réglementaire. Obtenez votre simulation personnalisée sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#etude"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-slate-900 font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:scale-[1.02]"
            >
              <Sun className="w-6 h-6" />
              Obtenir mon étude gratuite
            </a>
            <PhoneCallTracker
              phoneNumber={LP_PHONE_RAW}
              displayNumber={LP_PHONE_DISPLAY}
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-slate-900 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
            >
              <Phone className="w-6 h-6" />
              {LP_PHONE_DISPLAY}
            </PhoneCallTracker>
          </div>
          <p className="text-blue-300 text-sm mt-6">Certifié RGE QualiPV · Île-de-France · Intervention sous 48h</p>
        </div>
      </section>

    </div>
  )
}
