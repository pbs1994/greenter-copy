"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react"

const benefits = [
  "Audit énergétique offert",
  "Accompagnement MaPrimeRénov'",
  "Devis détaillé sous 48h",
  "Contrats d'entretien sur mesure",
]

export function Banner() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    website: "", // Honeypot
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone) {
      return
    }

    // Honeypot check - si ce champ est rempli, c'est un bot
    if (formData.website) {
      setFormState("success")
      return
    }

    setFormState("loading")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: '', // Pas d'email dans ce formulaire simplifié
          phone: formData.phone,
          service: formData.service,
          message: `Demande de devis depuis la page d'accueil - Projet: ${formData.service || 'Non précisé'}`,
        }),
      })

      if (!response.ok) throw new Error('Erreur')
      
      setFormState("success")
    } catch {
      setFormState("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const resetForm = () => {
    setFormState("idle")
    setFormData({ name: "", phone: "", service: "", website: "" })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-teal-900 py-12 md:py-16 px-4">
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Réduisez vos factures d&apos;énergie dès maintenant
            </h2>
            
            <p className="text-green-100 text-lg leading-relaxed mb-8">
              Greenter accompagne particuliers et professionnels dans leurs projets 
              d&apos;efficacité énergétique, de l&apos;audit à la maintenance, avec des solutions 
              durables et performantes.
            </p>

            {/* Benefits */}
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right CTA Card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {formState === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  Demande envoyée !
                </h3>
                <p className="text-neutral-600 mb-6">
                  Nous vous recontactons sous 48h.
                </p>
                <button 
                  onClick={resetForm}
                  className="text-green-700 font-medium hover:text-green-800 transition-colors"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
                  Demandez votre devis gratuit
                </h3>
                <p className="text-neutral-600 mb-6">
                  Sans engagement, réponse sous 48h.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot - invisible pour les humains */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input 
                      type="text" 
                      name="website" 
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Votre téléphone"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all text-neutral-600"
                    >
                      <option value="">Type de projet</option>
                      <option value="pac">Pompe à chaleur</option>
                      <option value="solaire">Panneaux solaires</option>
                      <option value="isolation">Isolation</option>
                      <option value="audit">Audit énergétique</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  
                  {formState === "error" && (
                    <p className="text-red-500 text-sm">Une erreur est survenue. Réessayez ou appelez-nous.</p>
                  )}
                  
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="btn-primary w-full justify-center text-base py-4 disabled:opacity-70"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Recevoir mon devis gratuit
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-neutral-500 mt-4 text-center">
                  En soumettant ce formulaire, vous acceptez d&apos;être contacté par Greenter.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
