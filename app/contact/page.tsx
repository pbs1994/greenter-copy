"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, ArrowRight, RefreshCw, User, MessageSquare, Tag } from "lucide-react"
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha"
import { useObfuscatedEmail } from "@/components/ObfuscatedEmail"

const services = [
  { value: "pac", label: "Pompe à chaleur" },
  { value: "solaire", label: "Panneaux solaires" },
  { value: "isolation", label: "Isolation thermique" },
  { value: "audit", label: "Audit énergétique" },
  { value: "maintenance", label: "Maintenance / SAV" },
  { value: "autre", label: "Autre" },
]

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    captcha: "",
  })
  const decodedEmail = useObfuscatedEmail()
  const [captchaError, setCaptchaError] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    loadCaptchaEnginge(6)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCaptchaError(false)
    
    if (!validateCaptcha(formData.captcha)) {
      setCaptchaError(true)
      setFormData(prev => ({ ...prev, captcha: "" }))
      return
    }

    setFormState("loading")
    await new Promise(resolve => setTimeout(resolve, 1500))
    setFormState("success")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === "captcha") setCaptchaError(false)
  }

  const resetForm = () => {
    setFormState("idle")
    setFormData({ name: "", email: "", phone: "", service: "", message: "", captcha: "" })
    loadCaptchaEnginge(6)
    setCaptchaError(false)
  }

  const reloadCaptcha = () => {
    loadCaptchaEnginge(6)
    setFormData(prev => ({ ...prev, captcha: "" }))
    setCaptchaError(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            Une question ? Un projet ? Remplissez le formulaire, nous vous répondons sous 24h.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 ring-1 ring-neutral-100">
              
              {formState === "success" ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-neutral-600 mb-8">
                    Merci, nous vous répondrons très rapidement.
                  </p>
                  <button onClick={resetForm} className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Nom & Téléphone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative group">
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Nom complet</label>
                      <div className="relative">
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'name' ? 'text-green-600' : 'text-neutral-400'}`}>
                          <User className="w-5 h-5" />
                        </div>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required 
                          value={formData.name} 
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Jean Dupont"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all" 
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">Téléphone</label>
                      <div className="relative">
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'phone' ? 'text-green-600' : 'text-neutral-400'}`}>
                          <Phone className="w-5 h-5" />
                        </div>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          required 
                          value={formData.phone} 
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="06 00 00 00 00"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'text-green-600' : 'text-neutral-400'}`}>
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="jean@exemple.fr"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  {/* Sujet */}
                  <div className="relative">
                    <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">Sujet</label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none ${focusedField === 'service' ? 'text-green-600' : 'text-neutral-400'}`}>
                        <Tag className="w-5 h-5" />
                      </div>
                      <select 
                        id="service" 
                        name="service" 
                        value={formData.service} 
                        onChange={handleChange}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        {services.map(service => (
                          <option key={service.value} value={service.value}>{service.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                    <div className="relative">
                      <div className={`absolute left-4 top-4 transition-colors ${focusedField === 'message' ? 'text-green-600' : 'text-neutral-400'}`}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Décrivez votre projet ou posez votre question..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all resize-none" 
                      />
                    </div>
                  </div>

                  {/* Captcha */}
                  <div className="bg-neutral-50 rounded-2xl p-5">
                    <label className="block text-sm font-medium text-neutral-700 mb-3">Vérification anti-spam</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="bg-white rounded-xl p-2 shadow-sm ring-1 ring-neutral-200">
                        <LoadCanvasTemplate reloadText="" reloadColor="transparent" />
                      </div>
                      <button 
                        type="button" 
                        onClick={reloadCaptcha}
                        className="p-2.5 text-neutral-500 hover:text-green-600 hover:bg-white rounded-xl transition-all hover:shadow-sm"
                        title="Nouveau code"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <input 
                        type="text" 
                        id="captcha" 
                        name="captcha" 
                        required 
                        value={formData.captcha} 
                        onChange={handleChange} 
                        placeholder="Recopiez le code"
                        className={`flex-1 w-full sm:w-auto px-4 py-3 rounded-xl border-2 bg-white outline-none transition-all ${
                          captchaError 
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
                            : "border-neutral-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                        }`} 
                      />
                    </div>
                    {captchaError && <p className="text-red-500 text-sm mt-2">Code incorrect, réessayez.</p>}
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit" 
                    disabled={formState === "loading"} 
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-70 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 flex items-center justify-center gap-2"
                  >
                    {formState === "loading" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-neutral-500 text-center">Nous vous répondons généralement sous 24h ouvrées.</p>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
            
            <a href="tel:+33609455056" className="group flex items-center gap-4 bg-white rounded-2xl p-5 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Phone className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Téléphone</p>
                <p className="font-semibold text-neutral-900">06 09 45 50 56</p>
              </div>
            </a>

            <button onClick={() => decodedEmail && (window.location.href = `mailto:${decodedEmail}`)}
              className="group w-full flex items-center gap-4 bg-white rounded-2xl p-5 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-lg transition-all text-left">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Mail className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Email</p>
                <p className="font-semibold text-neutral-900">{decodedEmail || "Chargement..."}</p>
              </div>
            </button>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 ring-1 ring-neutral-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Adresse</p>
                <p className="font-semibold text-neutral-900 text-sm">38 Rue de Ménilmontant, 75020 Paris</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 ring-1 ring-neutral-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Horaires</p>
                <p className="font-semibold text-neutral-900">Lun - Ven : 8h - 19h</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 ring-1 ring-neutral-100">
              <p className="text-sm font-medium text-neutral-700 mb-3">Certifications</p>
              <div className="flex items-center gap-3">
                <Image src="/certifications/rge.webp" alt="RGE" width={40} height={40} className="object-contain" />
                <Image src="/certifications/qualibat.jpg" alt="Qualibat" width={40} height={40} className="object-contain" />
                <Image src="/certifications/qualipac.jpg" alt="QualiPAC" width={40} height={40} className="object-contain" />
                <Image src="/certifications/qualipv.png" alt="QualiPV" width={40} height={40} className="object-contain" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
