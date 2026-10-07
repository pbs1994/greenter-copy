"use client"

import { useState } from "react"
import Image from "next/image"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import {
  Phone, CheckCircle, ArrowRight, Shield, Clock, Euro, Award, Star,
  AlertTriangle, Wrench, FileCheck, Flame, Droplets, Thermometer,
  Gauge, Volume2, Search, ShieldCheck, Leaf, ChevronDown, ChevronUp,
} from "lucide-react"

const LP_PHONE_RAW = "+33609455056"
const LP_PHONE_DISPLAY = "06 09 45 50 56"

// Numéro national GRDF — Urgence Sécurité Gaz (gratuit, 24h/24)
const GRDF_URGENCE_RAW = "0800473333"
const GRDF_URGENCE_DISPLAY = "0 800 47 33 33"

const BRANDS = [
  "Saunier Duval", "Frisquet", "De Dietrich", "ELM Leblanc",
  "Chaffoteaux", "Vaillant", "Viessmann", "Atlantic",
]

interface ChaudiereGazLandingProps {
  rating: number
  reviewCount: number
}

export function ChaudiereGazLanding({ rating, reviewCount }: ChaudiereGazLandingProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({ panne: "", delai: "", name: "", phone: "", postalCode: "", brand: "", email: "", website: "" })
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
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: "Dépannage chaudière gaz",
          message: `Panne : ${form.panne} — Délai souhaité : ${form.delai} — Code postal : ${form.postalCode}${form.brand ? ` — Marque : ${form.brand}` : ""}`,
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

  const stars = (size: string, empty: string) =>
    [1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className={`${size} ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : empty}`} />
    ))

  const faqs = [
    {
      q: "Combien coûte un dépannage de chaudière gaz ?",
      a: "Le prix dépend de la panne et des pièces à remplacer. Notre technicien réalise d'abord un diagnostic complet, puis vous annonce le montant exact de la réparation avant toute intervention. Vous validez, nous réparons : aucun frais caché, aucune surprise sur la facture.",
    },
    {
      q: "Dans quel délai pouvez-vous intervenir ?",
      a: "Nous traitons en priorité les foyers sans chauffage ni eau chaude. Appelez-nous : nous vous proposons immédiatement le premier créneau disponible et, dans la plupart des cas, un pré-diagnostic par téléphone pour vous aider en attendant le passage du technicien.",
    },
    {
      q: "Intervenez-vous sur toutes les marques de chaudières ?",
      a: "Oui. Nos techniciens interviennent sur les chaudières gaz murales et au sol, à condensation ou classiques, de toutes les grandes marques : Saunier Duval, Frisquet, De Dietrich, ELM Leblanc, Chaffoteaux, Vaillant, Viessmann, Atlantic, Bosch, Ariston…",
    },
    {
      q: "Ma chaudière affiche un code erreur, que faire ?",
      a: "Notez le code affiché et la marque de votre chaudière, puis appelez-nous. Certains codes correspondent à une simple mise en sécurité (pression trop basse, défaut d'allumage) que nous pouvons parfois vous aider à résoudre par téléphone. Ne réarmez pas la chaudière à répétition : cela peut masquer un défaut plus grave.",
    },
    {
      q: "Ça sent le gaz chez moi, que dois-je faire ?",
      a: `N'actionnez aucun interrupteur ni appareil électrique, ne fumez pas, ouvrez les fenêtres, fermez le robinet de gaz au compteur et quittez le logement. Une fois dehors, appelez Urgence Sécurité Gaz (GRDF) au ${GRDF_URGENCE_DISPLAY}, gratuit et disponible 24h/24. Une fois la fuite sécurisée, nous intervenons pour remettre votre installation en service.`,
    },
    {
      q: "L'entretien annuel de ma chaudière est-il obligatoire ?",
      a: "Oui : l'entretien annuel des chaudières gaz de 4 à 400 kW est obligatoire (décret n° 2009-649). Il vous est souvent demandé par votre assureur en cas de sinistre et réduit fortement le risque de panne. Nous pouvons réaliser cet entretien lors du dépannage et vous remettre l'attestation.",
    },
    {
      q: "Vaut-il mieux réparer ou remplacer ma chaudière ?",
      a: "Si votre chaudière a moins de 15 ans, la réparation est presque toujours la meilleure option. Au-delà, ou si les pannes se répètent, notre technicien vous indiquera honnêtement si un remplacement est plus rentable — par exemple par une pompe à chaleur, éligible aux aides de l'État.",
    },
  ]

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">

      {/* ── URGENCY BANNER ─────────────────────────────────────────────────── */}
      <div className="bg-amber-500 text-white py-2.5 px-4 text-center text-sm font-medium">
        <AlertTriangle className="inline w-4 h-4 mr-1.5 mb-0.5" />
        <strong>Plus de chauffage ou d&apos;eau chaude ?</strong> Un technicien vous rappelle rapidement.{" "}
        <PhoneCallTracker phoneNumber={LP_PHONE_RAW} displayNumber={LP_PHONE_DISPLAY} className="underline font-bold">
          Appelez le {LP_PHONE_DISPLAY} →
        </PhoneCallTracker>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative text-white bg-slate-900">
        {/* DESKTOP ONLY: full-width background image */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/images/lp/chaudiere-gaz-hero.jpg"
            alt="Chaudière gaz murale et raccordements en cuivre dans une maison"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 lg:gap-12 lg:items-center">

            {/* Left — mobile: own image bg, full width */}
            <div className="relative py-16 lg:py-24 -mx-4 sm:-mx-6 lg:mx-0">
              {/* MOBILE ONLY: image behind text */}
              <div className="absolute inset-0 lg:hidden">
                <Image
                  src="/images/lp/chaudiere-gaz-hero.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: "30% center" }}
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-slate-900/60 via-slate-900/55 to-slate-900/70" />
              <div className="relative z-10 px-4 sm:px-6 lg:px-0 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.8))_drop-shadow(0_0_8px_rgba(0,0,0,0.4))] lg:[filter:none]">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Award className="w-4 h-4 text-blue-300" />
                Toutes marques · Seine-et-Marne & Île-de-France
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 tracking-tight">
                Dépannage de chaudière gaz{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  rapide
                </span>
              </h1>

              <p className="text-lg text-blue-200 mb-2 font-medium">
                Panne, code erreur, mise en sécurité, plus d&apos;eau chaude
              </p>

              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Un technicien qualifié diagnostique et répare votre chaudière à domicile.
                Vous connaissez <strong className="text-white">le prix exact avant toute réparation</strong> — sans mauvaise surprise sur la facture.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Intervention prioritaire si vous êtes sans chauffage",
                  "Pré-diagnostic gratuit par téléphone",
                  "Devis annoncé et validé avant travaux",
                  "Pièces d'origine fabricant, réparation garantie",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <PhoneCallTracker
                  phoneNumber={LP_PHONE_RAW}
                  displayNumber={LP_PHONE_DISPLAY}
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:scale-[1.02]"
                >
                  <Phone className="w-5 h-5" />
                  {LP_PHONE_DISPLAY}
                </PhoneCallTracker>
                <a
                  href="#depannage"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-slate-900 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all"
                >
                  <Wrench className="w-5 h-5" />
                  Être rappelé
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex">{stars("w-5 h-5", "text-white/30")}</div>
                <span className="font-semibold">{rating}/5</span>
                <span className="text-blue-200 text-sm">({reviewCount} avis Google)</span>
              </div>
            </div>
            </div>

            {/* Right: Form — mobile: plain white bg; desktop: transparent (section image shows) */}
            <div id="depannage" className="bg-white lg:bg-transparent py-10 lg:py-24 scroll-mt-8 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
              <div className="bg-white rounded-3xl shadow-2xl p-8">

                {formStatus === "success" ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-9 h-9 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Demande bien reçue !</h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      Un technicien vous rappelle <strong>au plus vite</strong> pour un pré-diagnostic et vous proposer un créneau.
                    </p>
                    <div className="bg-blue-50 rounded-2xl p-4 text-left space-y-2 text-sm text-neutral-700 mb-5">
                      <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" /> Gardez à portée de main le code erreur affiché</p>
                      <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" /> Notez la marque et le modèle de votre chaudière</p>
                      <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" /> Ne réarmez pas la chaudière à répétition</p>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">Urgent ? Appelez-nous directement :</p>
                    <PhoneCallTracker phoneNumber={LP_PHONE_RAW} displayNumber={LP_PHONE_DISPLAY} className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm underline">
                      <Phone className="w-4 h-4" /> Appeler le {LP_PHONE_DISPLAY}
                    </PhoneCallTracker>
                  </div>
                ) : (
                  <>
                    {/* Form header */}
                    <div className="mb-5 pb-5 border-b border-neutral-100">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
                            Rappel rapide · Sans engagement
                          </p>
                          <h2 className="text-xl font-bold text-neutral-900 leading-tight">
                            {step === 1 ? "Décrivez votre panne" : "Où devons-nous intervenir ?"}
                          </h2>
                          {step === 1 && (
                            <p className="text-sm text-neutral-500 mt-1.5 leading-snug">
                              2 questions, puis un <strong className="text-neutral-700">technicien vous rappelle</strong> pour un pré-diagnostic gratuit.
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
                          <p className="text-sm font-semibold text-neutral-700 mb-2">Quel est le problème ?</p>
                          <div className="grid grid-cols-1 gap-2">
                            {[
                              { value: "Plus de chauffage", icon: "🥶" },
                              { value: "Plus d'eau chaude", icon: "🚿" },
                              { value: "Code erreur / mise en sécurité", icon: "⚠️" },
                              { value: "Fuite, bruit ou pression anormale", icon: "💧" },
                            ].map(({ value, icon }) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setForm((p) => ({ ...p, panne: value }))}
                                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                  form.panne === value
                                    ? "border-blue-600 bg-blue-50 text-blue-800"
                                    : "border-neutral-200 hover:border-blue-300 text-neutral-700"
                                }`}
                              >
                                <span className="text-lg">{icon}</span>
                                {value}
                                {form.panne === value && <CheckCircle className="w-4 h-4 text-blue-600 ml-auto flex-shrink-0" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-neutral-700 mb-2">Quand souhaitez-vous l&apos;intervention ?</p>
                          <div className="grid grid-cols-3 gap-2">
                            {["Au plus vite", "Sous 48h", "Cette semaine"].map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setForm((p) => ({ ...p, delai: d }))}
                                className={`px-2 py-3 rounded-xl border-2 text-sm font-medium transition-all text-center ${
                                  form.delai === d
                                    ? "border-blue-600 bg-blue-50 text-blue-800"
                                    : "border-neutral-200 hover:border-blue-300 text-neutral-700"
                                }`}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={!form.panne || !form.delai}
                          onClick={() => setStep(2)}
                          className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-blue-700/30 hover:shadow-xl hover:-translate-y-0.5"
                        >
                          Continuer — être rappelé →
                        </button>
                        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 pt-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</span>
                            Panne
                          </span>
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                          <span className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</span>
                            Contact
                          </span>
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                          <span className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</span>
                            Rappel
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
                          ✓ {form.panne} · {form.delai}
                        </div>
                        <input type="text" placeholder="Prénom et nom *" required autoComplete="name"
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          className={inputCls}
                        />
                        <div>
                          <input type="tel" placeholder="Téléphone *" required autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                            className={inputCls}
                          />
                          <p className="text-xs text-neutral-400 mt-1 pl-1">Un technicien vous rappelle pour un pré-diagnostic</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="Code postal *" required inputMode="numeric" autoComplete="postal-code"
                            pattern="[0-9]{5}" maxLength={5} title="Code postal à 5 chiffres"
                            value={form.postalCode}
                            onChange={(e) => setForm((p) => ({ ...p, postalCode: e.target.value }))}
                            className={inputCls}
                          />
                          <input type="text" placeholder="Marque (optionnel)" list="chaudiere-brands"
                            value={form.brand}
                            onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                            className={inputCls}
                          />
                          <datalist id="chaudiere-brands">
                            {BRANDS.map((b) => <option key={b} value={b} />)}
                          </datalist>
                        </div>
                        <input type="email" placeholder="Email (optionnel)" autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className={inputCls}
                        />
                        <button type="submit" disabled={formStatus === "loading"}
                          className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-70 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-blue-700/30 hover:shadow-xl hover:-translate-y-0.5"
                        >
                          {formStatus === "loading" ? "Envoi en cours..." : "Être rappelé maintenant →"}
                        </button>
                        {formStatus === "error" && (
                          <p className="text-red-600 text-sm text-center">
                            Une erreur est survenue.{" "}
                            <PhoneCallTracker phoneNumber={LP_PHONE_RAW} displayNumber={LP_PHONE_DISPLAY} className="underline font-medium">Appelez-nous au {LP_PHONE_DISPLAY}.</PhoneCallTracker>
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
                Odeur de gaz ? Quittez les lieux et appelez Urgence Sécurité Gaz au{" "}
                <a href={`tel:${GRDF_URGENCE_RAW}`} className="underline">{GRDF_URGENCE_DISPLAY}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDS STRIP ───────────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-4">
            Nous dépannons toutes les marques de chaudières gaz
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {BRANDS.map((b) => (
              <span key={b} className="text-neutral-500 font-bold text-sm sm:text-base">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYMPTÔMES ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Search className="w-4 h-4" />
              Diagnostic de panne
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Votre chaudière présente l&apos;un de ces symptômes ?
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Quelle que soit la panne, nos techniciens identifient la cause et réparent votre chaudière, le plus souvent en une seule intervention.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Thermometer, bg: "bg-blue-50", color: "text-blue-600", title: "Plus de chauffage", desc: "Radiateurs froids, chaudière qui ne démarre pas ou s'arrête toute seule : pompe, carte électronique, thermostat ou vanne en cause." },
              { icon: Droplets, bg: "bg-orange-50", color: "text-orange-600", title: "Plus d'eau chaude", desc: "Eau tiède ou froide au robinet, température instable : échangeur entartré, vanne 3 voies ou débitmètre défaillant." },
              { icon: AlertTriangle, bg: "bg-yellow-50", color: "text-yellow-600", title: "Code erreur / mise en sécurité", desc: "F28, F75, E133, voyant rouge… La chaudière se bloque. Nous identifions l'origine du défaut au lieu de simplement réarmer." },
              { icon: Gauge, bg: "bg-purple-50", color: "text-purple-600", title: "Pression qui chute", desc: "Le manomètre descend sous 1 bar en permanence : fuite sur le circuit, vase d'expansion dégonflé ou soupape défectueuse." },
              { icon: Volume2, bg: "bg-green-50", color: "text-green-600", title: "Bruits anormaux", desc: "Claquements, sifflements, bouillonnement : présence d'air, embouage du circuit ou circulateur en fin de vie." },
              { icon: Flame, bg: "bg-red-50", color: "text-red-600", title: "Défaut d'allumage", desc: "La flamme ne s'allume pas ou s'éteint : électrode d'allumage, sonde d'ionisation, vanne gaz ou problème d'évacuation des fumées." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-8 ring-1 ring-neutral-100 hover:ring-blue-200 hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <PhoneCallTracker
              phoneNumber={LP_PHONE_RAW}
              displayNumber={LP_PHONE_DISPLAY}
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/20"
            >
              <Phone className="w-4 h-4" />
              Décrire ma panne au {LP_PHONE_DISPLAY}
            </PhoneCallTracker>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-blue-800 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: `${rating}/5`, label: `note moyenne sur ${reviewCount} avis Google` },
              { value: "0 €", label: "de pré-diagnostic par téléphone" },
              { value: "100%", label: "des prix annoncés avant réparation" },
              { value: "Toutes", label: "marques de chaudières gaz" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">{s.value}</div>
                <p className="text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTRE INTERVENTION ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Wrench className="w-4 h-4" />
              Ce qui est inclus
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Un dépannage complet, pas un simple réarmement
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Nous trouvons la vraie cause de la panne pour qu&apos;elle ne revienne pas la semaine suivante.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search, bg: "bg-blue-50", color: "text-blue-700",
                stat: "Étape 1", title: "Diagnostic complet",
                desc: "Lecture des codes défaut, contrôle de la pression, de l'allumage, des sondes, du circulateur et de l'évacuation des fumées. Vous savez exactement ce qui ne va pas.",
              },
              {
                icon: Euro, bg: "bg-yellow-50", color: "text-yellow-700",
                stat: "Étape 2", title: "Prix annoncé, vous décidez",
                desc: "Le technicien vous présente le montant de la réparation avant de commencer. Aucune pièce n'est changée sans votre accord explicite.",
              },
              {
                icon: ShieldCheck, bg: "bg-green-50", color: "text-green-700",
                stat: "Étape 3", title: "Réparation & remise en service",
                desc: "Remplacement des pièces défectueuses par des pièces d'origine, contrôle de combustion et d'étanchéité, puis remise en service et rapport d'intervention.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-8 ring-1 ring-neutral-100 hover:ring-blue-200 hover:shadow-xl transition-all group text-center">
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div className={`text-sm font-black uppercase tracking-wide ${item.color} mb-2`}>{item.stat}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#depannage" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/20">
              Demander un dépannage <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SÉCURITÉ & OBLIGATIONS ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <AlertTriangle className="w-4 h-4" />
              Sécurité gaz
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Une chaudière gaz, ça ne se répare pas soi-même
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Monoxyde de carbone, fuite de gaz, mauvaise combustion : seul un professionnel peut intervenir en toute sécurité sur votre installation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Odeur de gaz ?", subtitle: "Les bons réflexes, dans cet ordre",
                deadline: `Urgence Sécurité Gaz : ${GRDF_URGENCE_DISPLAY}`,
                border: "border-red-500", badge: "bg-red-500/20 text-red-300",
                desc: "En cas d'odeur de gaz, votre sécurité passe avant tout. N'attendez pas le dépanneur : mettez-vous à l'abri et prévenez GRDF (appel gratuit, 24h/24).",
                items: [
                  "Ne touchez à aucun interrupteur ni appareil électrique",
                  "Ouvrez les fenêtres et fermez le robinet de gaz au compteur",
                  "Quittez le logement, puis appelez GRDF depuis l'extérieur",
                ],
              },
              {
                title: "Entretien annuel obligatoire", subtitle: "Décret n° 2009-649",
                deadline: "Une fois par an, chaudières de 4 à 400 kW",
                border: "border-yellow-500", badge: "bg-yellow-500/20 text-yellow-300",
                desc: "L'entretien annuel de votre chaudière gaz est une obligation légale. Il prévient les pannes et vous protège en cas de sinistre auprès de votre assureur.",
                items: [
                  "Nettoyage, réglage et contrôle de la combustion",
                  "Mesure du taux de monoxyde de carbone (CO)",
                  "Attestation d'entretien remise sous 15 jours",
                ],
              },
            ].map((item) => (
              <div key={item.title} className={`bg-slate-800 rounded-3xl p-8 border-l-4 ${item.border}`}>
                <div className={`inline-flex items-center gap-2 ${item.badge} text-xs font-semibold px-3 py-1.5 rounded-full mb-4`}>
                  <Clock className="w-3.5 h-3.5" />
                  {item.deadline}
                </div>
                <h3 className="text-2xl font-black text-white mb-1">{item.title}</h3>
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
            <a href="#depannage" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-slate-900 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
              Dépannage ou entretien : être rappelé
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
              De votre appel à la remise en chauffe
            </h2>
            <p className="text-neutral-600 text-lg">Un parcours simple, sans attente inutile</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: 1, icon: Phone, title: "Vous nous appelez", duration: "2 minutes", desc: "Décrivez la panne, le code erreur et la marque de votre chaudière, par téléphone ou via le formulaire." },
              { n: 2, icon: Search, title: "Pré-diagnostic", duration: "Gratuit", desc: "Le technicien évalue la panne à distance, vous donne les premiers conseils et fixe avec vous le premier créneau disponible." },
              { n: 3, icon: Wrench, title: "Intervention", duration: "À domicile", desc: "Diagnostic complet sur place, prix annoncé avant travaux, réparation avec des pièces d'origine." },
              { n: 4, icon: FileCheck, title: "Remise en service", duration: "Rapport remis", desc: "Contrôle de combustion et d'étanchéité, remise en service et rapport d'intervention détaillé." },
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

      {/* ── RÉPARER OU REMPLACER + IMAGE ───────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Leaf className="w-4 h-4" />
                Chaudière de plus de 15 ans ?
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8 leading-tight">
                Réparer ou remplacer : un conseil honnête
              </h2>
              <ul className="space-y-6 mb-10">
                {[
                  {
                    icon: Wrench,
                    title: "Moins de 15 ans : on répare",
                    desc: "Dans la grande majorité des cas, la réparation est la solution la plus économique. Nous ne vous pousserons jamais à remplacer une chaudière qui peut encore servir.",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Pannes à répétition : on fait le point",
                    desc: "Si les réparations s'enchaînent ou si les pièces ne sont plus fabriquées, notre technicien vous indique clairement le coût de chaque option.",
                  },
                  {
                    icon: Leaf,
                    title: "Passer à la pompe à chaleur",
                    desc: "Greenter est spécialiste RGE de la pompe à chaleur : jusqu'à 70% d'économies de chauffage et des aides de l'État pour remplacer votre chaudière gaz.",
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
              <a href="#depannage" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/20">
                Faire diagnostiquer ma chaudière <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/lp/greenter-technicien-pac.jpg"
                alt="Technicien Greenter intervenant sur l'unité extérieure d'une pompe à chaleur"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 hidden sm:block bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3">
                <p className="text-xs font-bold text-neutral-900">Techniciens Greenter certifiés RGE</p>
                <p className="text-xs text-neutral-500">Dépannage, entretien et remplacement de votre système de chauffage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Questions fréquentes</h2>
            <p className="text-neutral-600">Tout ce que vous devez savoir avant de nous appeler</p>
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
            <Flame className="w-4 h-4" />
            Pré-diagnostic gratuit · Prix annoncé avant réparation
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
            Retrouvez votre chauffage<br />sans attendre
          </h2>
          <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
            Un technicien qualifié vous rappelle, identifie la panne et intervient chez vous dans les meilleurs délais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneCallTracker
              phoneNumber={LP_PHONE_RAW}
              displayNumber={LP_PHONE_DISPLAY}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-slate-900 font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:scale-[1.02]"
            >
              <Phone className="w-6 h-6" />
              {LP_PHONE_DISPLAY}
            </PhoneCallTracker>
            <a
              href="#depannage"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-slate-900 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
            >
              <Shield className="w-6 h-6" />
              Être rappelé
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">{stars("w-4 h-4", "text-white/30")}</div>
            <p className="text-blue-300 text-sm">{rating}/5 sur {reviewCount} avis Google · Seine-et-Marne & Île-de-France</p>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CALL BAR ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-sm border-t border-neutral-200 px-4 py-3 flex gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <PhoneCallTracker
          phoneNumber={LP_PHONE_RAW}
          displayNumber={LP_PHONE_DISPLAY}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold py-3 rounded-xl"
        >
          <Phone className="w-5 h-5" />
          {LP_PHONE_DISPLAY}
        </PhoneCallTracker>
        <a
          href="#depannage"
          className="inline-flex items-center justify-center bg-blue-700 text-white font-bold px-4 py-3 rounded-xl text-sm"
        >
          Être rappelé
        </a>
      </div>

    </div>
  )
}
