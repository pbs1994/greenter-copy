"use client"

import { useState } from "react"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, ArrowRight, ArrowLeft, User, MessageSquare, Home, Thermometer } from "lucide-react"
import { useObfuscatedEmail } from "@/components/ObfuscatedEmail"
import { COMPANY_PHONES } from "@/lib/local-seo-data"

/* ── Data ─────────────────────────────────────────────────────────────────── */

const SERVICES = [
  { value: "pac",         label: "Pompe à chaleur",    emoji: "🌡️" },
  { value: "solaire",     label: "Panneaux solaires",   emoji: "☀️" },
  { value: "isolation",   label: "Isolation thermique", emoji: "🏠" },
  { value: "audit",       label: "Audit énergétique",   emoji: "📋" },
  { value: "maintenance", label: "Maintenance / SAV",   emoji: "🔧" },
  { value: "autre",       label: "Autre",               emoji: "💬" },
]

const LOGEMENT_TYPES = ["Maison individuelle", "Appartement", "Maison mitoyenne"]
const SURFACES       = ["Moins de 50 m²", "50 – 100 m²", "100 – 150 m²", "Plus de 150 m²"]
const CHAUFFAGES     = ["Gaz naturel", "Fioul", "Électrique", "Autre"]
const DEPARTMENTS    = ["77 – Seine-et-Marne", "91 – Essonne", "78 – Yvelines", "Autre Île-de-France"]

/* ── Step indicator ───────────────────────────────────────────────────────── */

function StepBar({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["Votre projet", "Votre logement", "Vos coordonnées"]
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const n = i + 1
        const done    = n < current
        const active  = n === current
        return (
          <div key={n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                done   ? "bg-green-600 text-white" :
                active ? "bg-green-600 text-white ring-4 ring-green-100" :
                         "bg-neutral-100 text-neutral-400"
              }`}>
                {done ? <CheckCircle className="w-4 h-4" /> : n}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? "text-green-700" : "text-neutral-400"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all ${n < current ? "bg-green-500" : "bg-neutral-200"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Chip selector ────────────────────────────────────────────────────────── */

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
            value === opt
              ? "border-green-500 bg-green-50 text-green-700"
              : "border-neutral-200 bg-white text-neutral-600 hover:border-green-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

/* ── Main page ────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [step, setStep]           = useState<1 | 2 | 3>(1)
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")
  const [formData, setFormData]   = useState({
    // Step 1
    service: "",
    // Step 2
    logementType: "",
    surface: "",
    chauffage: "",
    department: "",
    // Step 3
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "", // honeypot
  })
  const decodedEmail = useObfuscatedEmail()

  const set = (key: string, val: string) =>
    setFormData((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website) { setFormState("success"); return }
    setFormState("loading")
    try {
      const contextMessage = [
        formData.message,
        `\n— Logement : ${formData.logementType || "—"}, ${formData.surface || "—"}`,
        `— Chauffage actuel : ${formData.chauffage || "—"}`,
        `— Département : ${formData.department || "—"}`,
      ].join("\n")

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    formData.name,
          email:   formData.email,
          phone:   formData.phone,
          service: formData.service,
          message: contextMessage,
        }),
      })
      if (!res.ok) throw new Error()
      setFormState("success")
    } catch {
      setFormState("idle")
      alert("Une erreur est survenue. Veuillez réessayer ou nous appeler directement.")
    }
  }

  const resetForm = () => {
    setStep(1)
    setFormState("idle")
    setFormData({ service: "", logementType: "", surface: "", chauffage: "", department: "", name: "", phone: "", email: "", message: "", website: "" })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">

        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Demander un devis gratuit
          </h1>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            3 questions rapides — nous vous rappelons sous 24h avec une étude personnalisée.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── Form ── */}
          <div className="lg:col-span-3 order-1">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 ring-1 ring-neutral-100">

              {formState === "success" ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">Demande envoyée !</h3>
                  <p className="text-neutral-600 mb-8">Notre équipe vous contacte dans les 24h ouvrées.</p>
                  <button onClick={resetForm} className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Nouvelle demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input type="text" name="website" value={formData.website} onChange={(e) => set("website", e.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>

                  <StepBar current={step} />

                  {/* ── Step 1 : projet ── */}
                  {step === 1 && (
                    <div>
                      <h2 className="font-heading text-xl font-bold text-neutral-900 mb-5">Quel est votre projet ?</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                        {SERVICES.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => set("service", s.value)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center ${
                              formData.service === s.value
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-neutral-200 bg-white text-neutral-700 hover:border-green-300"
                            }`}
                          >
                            <span className="text-2xl">{s.emoji}</span>
                            <span className="text-sm font-semibold leading-tight">{s.label}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.service}
                        className="w-full btn-primary py-4 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continuer
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {/* ── Step 2 : logement ── */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="font-heading text-xl font-bold text-neutral-900">Votre logement</h2>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-3">
                          <Home className="w-4 h-4 text-green-600" />
                          Type de logement
                        </label>
                        <ChipGroup options={LOGEMENT_TYPES} value={formData.logementType} onChange={(v) => set("logementType", v)} />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                          Surface habitable
                        </label>
                        <ChipGroup options={SURFACES} value={formData.surface} onChange={(v) => set("surface", v)} />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-3">
                          <Thermometer className="w-4 h-4 text-green-600" />
                          Chauffage actuel
                        </label>
                        <ChipGroup options={CHAUFFAGES} value={formData.chauffage} onChange={(v) => set("chauffage", v)} />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-3">
                          <MapPin className="w-4 h-4 text-green-600" />
                          Votre département
                        </label>
                        <ChipGroup options={DEPARTMENTS} value={formData.department} onChange={(v) => set("department", v)} />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setStep(1)} className="btn-secondary py-3.5 px-5 flex items-center gap-2">
                          <ArrowLeft className="w-4 h-4" />
                          Retour
                        </button>
                        <button type="button" onClick={() => setStep(3)} className="flex-1 btn-primary py-3.5 justify-center">
                          Continuer
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Step 3 : coordonnées ── */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <h2 className="font-heading text-xl font-bold text-neutral-900">Vos coordonnées</h2>

                      {/* Nom */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Nom complet *</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="text" id="name" name="name" required
                            value={formData.name} onChange={(e) => set("name", e.target.value)}
                            placeholder="Jean Dupont"
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Téléphone + Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">Téléphone *</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                              type="tel" id="phone" name="phone" required
                              value={formData.phone} onChange={(e) => set("phone", e.target.value)}
                              placeholder="06 00 00 00 00"
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                              type="email" id="email" name="email" required
                              value={formData.email} onChange={(e) => set("email", e.target.value)}
                              placeholder="jean@exemple.fr"
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message (optionnel)</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
                          <textarea
                            id="message" name="message" rows={3}
                            value={formData.message} onChange={(e) => set("message", e.target.value)}
                            placeholder="Précisez votre demande..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button type="button" onClick={() => setStep(2)} className="btn-secondary py-3.5 px-5 flex items-center gap-2">
                          <ArrowLeft className="w-4 h-4" />
                          Retour
                        </button>
                        <button
                          type="submit"
                          disabled={formState === "loading"}
                          className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-70 shadow-lg flex items-center justify-center gap-2"
                        >
                          {formState === "loading" ? (
                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Envoi...</>
                          ) : (
                            <>Envoyer ma demande<Send className="w-4 h-4" /></>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-neutral-400 text-center">
                        🔒 Données protégées · RGPD · Aucun démarchage
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-2 order-2 space-y-4">

            <a href={`tel:${COMPANY_PHONES.primary.raw}`} className="group flex items-center gap-4 bg-white rounded-2xl p-5 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Phone className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Téléphone</p>
                <p className="font-semibold text-neutral-900">{COMPANY_PHONES.primary.display}</p>
              </div>
            </a>

            <a
              href="https://wa.me/33609455056?text=Bonjour%2C%20je%20souhaite%20un%20devis%20gratuit."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 ring-1 ring-neutral-100 hover:ring-[#25D366] hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">WhatsApp</p>
                <p className="font-semibold text-neutral-900">Réponse rapide</p>
              </div>
            </a>

            <a href={decodedEmail ? `mailto:${decodedEmail}` : undefined} className="group w-full flex items-center gap-4 bg-white rounded-2xl p-5 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-lg transition-all text-left">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Mail className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Email</p>
                <p className="font-semibold text-neutral-900">{decodedEmail || "Chargement..."}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 ring-1 ring-neutral-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Horaires</p>
                <p className="font-semibold text-neutral-900">Lun – Ven : 9h – 19h</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 ring-1 ring-neutral-100">
              <p className="text-sm font-medium text-neutral-700 mb-3">Certifications</p>
              <div className="flex items-center gap-3">
                <Image src="/certifications/rge.webp"    alt="RGE"      width={40} height={40} className="object-contain" />
                <Image src="/certifications/qualibat.jpg" alt="Qualibat" width={40} height={40} className="object-contain" />
                <Image src="/certifications/qualipac.jpg" alt="QualiPAC" width={40} height={40} className="object-contain" />
                <Image src="/certifications/qualipv.png"  alt="QualiPV"  width={40} height={40} className="object-contain" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
