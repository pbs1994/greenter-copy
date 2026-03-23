"use client"

import { useState } from "react"
import { User, Phone, Mail, MapPin, Send, CheckCircle, ArrowRight, Loader2 } from "lucide-react"

interface HeroQuoteFormProps {
  className?: string;
  onSuccess?: () => void;
}

interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  projectType: 'pac-air-eau' | 'pac-air-air' | 'pac-geo' | 'ne-sait-pas' | '';
  postalCode: string;
  honeypot: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

const projectTypes = [
  { value: 'pac-air-eau', label: 'PAC Air-Eau' },
  { value: 'pac-air-air', label: 'PAC Air-Air' },
  { value: 'pac-geo', label: 'PAC Géothermique' },
  { value: 'ne-sait-pas', label: 'Je ne sais pas encore' },
] as const;

export default function HeroQuoteForm({ className = '', onSuccess }: HeroQuoteFormProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    postalCode: '',
    honeypot: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - si ce champ est rempli, c'est un bot
    if (formData.honeypot) {
      // Fake success pour ne pas alerter le bot
      setFormState('success');
      onSuccess?.();
      return;
    }

    setFormState('loading');

    try {
      const projectLabel = projectTypes.find(p => p.value === formData.projectType)?.label || formData.projectType;
      const message = `Demande de devis PAC depuis la landing page.\n\nType de projet: ${projectLabel}\nCode postal: ${formData.postalCode}`;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.projectType,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setFormState('success');
      onSuccess?.();
    } catch (error) {
      console.error('Erreur:', error);
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormState('idle');
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: '',
      postalCode: '',
      honeypot: '',
    });
  };

  if (formState === 'success') {
    return (
      <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 ring-1 ring-neutral-100 ${className}`}>
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
            Demande envoyée !
          </h3>
          <p className="text-neutral-600 mb-6 text-sm">
            Nous vous recontactons sous 24h pour votre devis gratuit.
          </p>
          <button
            onClick={resetForm}
            className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Nouvelle demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 ring-1 ring-neutral-100 ${className}`}>
      <h2 className="font-heading text-lg sm:text-xl font-bold text-neutral-900 mb-1 text-center">
        Devis gratuit en 24h
      </h2>
      <p className="text-neutral-500 text-sm mb-5 text-center">
        Sans engagement, réponse rapide
      </p>

      {formState === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot - invisible pour les humains */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="honeypot">Ne pas remplir</label>
          <input
            type="text"
            id="honeypot"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Nom */}
        <div className="relative">
          <label htmlFor="quote-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Nom complet
          </label>
          <div className="relative">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'name' ? 'text-green-600' : 'text-neutral-400'}`}>
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="quote-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="Jean Dupont"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Téléphone */}
        <div className="relative">
          <label htmlFor="quote-phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Téléphone
          </label>
          <div className="relative">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'phone' ? 'text-green-600' : 'text-neutral-400'}`}>
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              id="quote-phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              placeholder="06 00 00 00 00"
              pattern="^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$"
              title="Format: 06 00 00 00 00"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label htmlFor="quote-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'text-green-600' : 'text-neutral-400'}`}>
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              id="quote-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="jean@exemple.fr"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Type de projet */}
        <div className="relative">
          <label htmlFor="quote-projectType" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Type de projet
          </label>
          <div className="relative">
            <select
              id="quote-projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              onFocus={() => setFocusedField('projectType')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-3 py-2.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="">Sélectionnez un type</option>
              {projectTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Code postal */}
        <div className="relative">
          <label htmlFor="quote-postalCode" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Code postal
          </label>
          <div className="relative">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'postalCode' ? 'text-green-600' : 'text-neutral-400'}`}>
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="quote-postalCode"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              onFocus={() => setFocusedField('postalCode')}
              onBlur={() => setFocusedField(null)}
              placeholder="77330"
              pattern="^[0-9]{5}$"
              title="Code postal à 5 chiffres"
              maxLength={5}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-neutral-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={formState === 'loading'}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 flex items-center justify-center gap-2 text-sm"
        >
          {formState === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Recevoir mon devis gratuit
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-xs text-neutral-500 text-center">
          Réponse sous 24h • Sans engagement
        </p>
      </form>
    </div>
  );
}
