'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star, Check, X, ChevronDown, ChevronRight,
  Shield, Truck, Wrench, Award, Phone, Gift,
  ThumbsUp, BadgeCheck, MessageSquare, Calendar, Clock,
  Lock, Users, TrendingUp, Zap, Leaf,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface V2Spec { label: string; value: string }
export interface V2Feature { icon: string; title: string; description: string }
export interface V2Review {
  author: string; city: string; date: string; rating: number
  title: string; content: string; verified: boolean; helpful: number
  tags?: string[]
}
export interface V2FAQ { question: string; answer: string }
export interface V2Benefit { emoji: string; title: string; sub: string }
export interface V2ComparisonRow {
  criterion: string
  ours: boolean | string
  alt1: boolean | string
  alt2: boolean | string
}
export interface ProductV2Data {
  name: string
  categoryName: string
  categorySlug: string
  slug: string
  shortDescription: string
  description: string  // HTML
  originalPrice: number  // euros
  currentPrice: number   // euros
  images: string[]
  gift?: { name: string; value: number }
  stock?: number
  deliveryDays: string
  nextInstallation?: string
  rating: number
  reviewCount: number
  buyerCount: number
  monthlyBuyers: number
  specs: V2Spec[]
  features: V2Feature[]
  reviews: V2Review[]
  faq: V2FAQ[]
  comparison?: { alt1Name: string; alt2Name: string; rows: V2ComparisonRow[] }
  ctaHref?: string
  ctaLabel?: string       // default "Commander maintenant →"
  pricePrefix?: string    // e.g. "À partir de"
  hideMonthly?: boolean   // hide 3× instalment line
  benefits?: V2Benefit[]  // overrides the default 5-item strip
  expertCallout?: { title: string; body: string } | null  // null = hidden
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pad(n: number) { return String(n).padStart(2, '0') }

function useCountdownToMidnight() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const midnight = new Date()
      midnight.setHours(23, 59, 59, 0)
      const diff = midnight.getTime() - Date.now()
      if (diff <= 0) { setTime({ h: 0, m: 0, s: 0 }); return }
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor(diff / 60000) % 60, s: Math.floor(diff / 1000) % 60 })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sz = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`${sz} ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-neutral-200 text-neutral-200'}`} />
      ))}
    </div>
  )
}

function CellIcon({ value }: { value: boolean | string }) {
  if (typeof value === 'string') return <span className="text-sm font-medium text-neutral-700">{value}</span>
  return value
    ? <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto"><Check className="w-4 h-4 text-green-700" /></div>
    : <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mx-auto"><X className="w-4 h-4 text-red-500" /></div>
}

const ACTIVITY = [
  'Marie D. de Paris a commandé il y a 2h',
  'Thomas R. de Versailles vient de passer commande',
  'Sophie L. de Créteil a réservé son installation',
  'Jean-Marc P. de Vincennes a commandé il y a 5h',
  'Aurélie B. de Massy a commandé il y a 1h',
]

function ActivityTicker() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx(i => (i + 1) % ACTIVITY.length); setVisible(true) }, 400)
    }, 4000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-sm text-neutral-100 flex items-center justify-center gap-2">
        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse flex-shrink-0" />
        {ACTIVITY[idx]}
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProductTemplateV2({ product }: { product: ProductV2Data }) {
  const [selectedImg, setSelectedImg] = useState(0)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', city: '', rating: 5, title: '', content: '' })
  const [submitted, setSubmitted] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)

  const time = useCountdownToMidnight()

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const savings = product.originalPrice - product.currentPrice
  const savingsPct = Math.round((savings / product.originalPrice) * 100)
  const monthly = Math.round(product.currentPrice / 3)
  const href = product.ctaHref ?? '/contact'

  const reviewDist = [
    { stars: 5, pct: 62 }, { stars: 4, pct: 24 },
    { stars: 3, pct: 9 }, { stars: 2, pct: 3 }, { stars: 1, pct: 2 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-white pb-24">

      {/* ── URGENCY BANNER ── */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white">
        <div className="container mx-auto max-w-6xl px-4 py-2.5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-sm font-medium">
            {product.gift && (
              <span className="flex items-center gap-1.5">
                🎁 <strong>{product.gift.name}</strong> offert pour toute commande avant minuit
              </span>
            )}
            <span className="flex items-center gap-2 bg-black/20 rounded-full px-3 py-1">
              <Clock className="w-3.5 h-3.5 opacity-80" />
              <span className="text-xs opacity-80">Expire dans</span>
              <span className="font-mono font-bold tracking-widest">
                {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pt-6 pb-4">

        {/* ── BREADCRUMBS ── */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 overflow-x-auto">
          <Link href="/" className="text-neutral-400 hover:text-neutral-600 whitespace-nowrap">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <Link href="/produits" className="text-neutral-400 hover:text-neutral-600 whitespace-nowrap">Produits</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <Link href={`/produits/${product.categorySlug}`} className="text-neutral-400 hover:text-neutral-600 whitespace-nowrap">{product.categoryName}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <span className="text-neutral-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* ── HERO ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 mb-14">

          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-gradient-to-b from-green-50 to-white rounded-2xl overflow-hidden border border-green-100 shadow-sm">
              <Image
                src={product.images[selectedImg] ?? '/placeholder-product.png'}
                alt={product.name}
                fill
                className="object-contain p-10"
                priority
              />
              {savingsPct > 0 && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-sm font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-600/30">
                  -{savingsPct}%
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-green-500 shadow-md' : 'border-neutral-200 hover:border-green-300'}`}
                    style={{ width: 72, height: 72 }}
                  >
                    <Image src={img} alt="" width={72} height={72} className="w-full h-full object-contain p-1 bg-green-50" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-4">

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full text-xs font-medium text-green-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {product.categoryName}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-xs font-bold text-blue-700">
                <BadgeCheck className="w-3.5 h-3.5" /> Certifié RGE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full text-xs font-medium text-emerald-700">
                <Leaf className="w-3.5 h-3.5" /> Éligible MaPrimeRénov&apos;
              </span>
            </div>

            {/* Name */}
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {product.reviewCount > 0 ? (
                <>
                  <StarRating rating={product.rating} />
                  <span className="font-bold text-neutral-900">{product.rating}/5</span>
                  <button
                    onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-green-700 underline underline-offset-2 hover:text-green-800"
                  >
                    {product.reviewCount} avis vérifiés
                  </button>
                  <span className="text-neutral-300">·</span>
                </>
              ) : (
                <button
                  onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-green-700 underline underline-offset-2 hover:text-green-800"
                >
                  Laisser le premier avis
                </button>
              )}
              {product.buyerCount > 0 && (
                <span className="flex items-center gap-1 text-neutral-500">
                  <Users className="w-3.5 h-3.5" /> {product.buyerCount} clients satisfaits
                </span>
              )}
            </div>

            {/* Price Block */}
            <div id="main-cta" className="bg-gradient-to-br from-green-50 to-teal-50/40 rounded-2xl p-5 border border-green-100 space-y-3.5">

              <div>
                {product.pricePrefix && (
                  <p className="text-sm font-medium text-neutral-500 mb-0.5">{product.pricePrefix}</p>
                )}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-neutral-900">
                    {product.currentPrice.toLocaleString('fr-FR')} €
                  </span>
                  <span className="text-sm text-neutral-400">TTC</span>
                </div>
                {savings > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="text-neutral-400 line-through">{product.originalPrice.toLocaleString('fr-FR')} €</span>
                    <span className="bg-red-100 text-red-700 font-bold text-sm px-2 py-0.5 rounded-full">
                      Économie : {savings.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                )}
              </div>

              {product.gift && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-900">🎁 Cadeau d&apos;une valeur de {product.gift.value} € inclus !</p>
                    <p className="text-xs text-amber-700 mt-0.5">{product.gift.name} — offert jusqu&apos;à minuit</p>
                  </div>
                </div>
              )}


              <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Livraison {product.deliveryDays}</span>
                </div>
                {product.nextInstallation && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Pose dès le {product.nextInstallation}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Installation incluse</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Garantie 10 ans</span>
                </div>
              </div>

              <Link
                href={href}
                className="block w-full bg-green-600 hover:bg-green-700 active:scale-[0.99] text-white font-bold text-lg py-4 px-6 rounded-xl text-center transition-all shadow-lg shadow-green-600/25 hover:shadow-xl"
              >
                {product.ctaLabel ?? 'Commander maintenant →'}
              </Link>

              {!product.hideMonthly && (
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span>Ou <strong className="text-neutral-700">3×{monthly.toLocaleString('fr-FR')} €</strong> sans frais</span>
                  <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Paiement sécurisé</span>
                </div>
              )}
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">{product.shortDescription}</p>

            {/* Mini trust row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Shield, label: 'Garantie 10 ans', sub: 'Constructeur' },
                { icon: Award, label: 'Certifié RGE', sub: 'Qualipac' },
                { icon: Phone, label: 'SAV 7j/7', sub: 'Réponse en 2h' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1 bg-white rounded-xl p-3 border border-neutral-100">
                  <Icon className="w-5 h-5 text-green-600" />
                  <span className="text-xs font-semibold text-neutral-800 leading-tight">{label}</span>
                  <span className="text-[10px] text-neutral-400">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BENEFITS STRIP ── */}
        <div className={`grid grid-cols-2 gap-3 mb-14 ${product.benefits ? `lg:grid-cols-${Math.min(product.benefits.length, 5)}` : 'lg:grid-cols-5'}`}>
          {product.benefits ? product.benefits.map(({ emoji, title, sub }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2 bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl">
                {emoji}
              </div>
              <p className="text-sm font-bold text-neutral-900">{title}</p>
              <p className="text-xs text-neutral-500 leading-tight">{sub}</p>
            </div>
          )) : [
            { icon: Truck, title: 'Livraison offerte', sub: 'Partout en Île-de-France' },
            { icon: Wrench, title: 'Installation incluse', sub: 'Par techniciens RGE' },
            { icon: Shield, title: 'Garantie 10 ans', sub: 'Pièces + main-d\'œuvre' },
            { icon: BadgeCheck, title: 'Aides gérées', sub: 'MaPrimeRénov\' inclus' },
            { icon: TrendingUp, title: '-50 à -65 %', sub: 'Sur la facture de chauffage' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2 bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-green-700" />
              </div>
              <p className="text-sm font-bold text-neutral-900">{title}</p>
              <p className="text-xs text-neutral-500 leading-tight">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── DESCRIPTION ── */}
        {product.description && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Description du produit</h2>
            <div
              className="[&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-neutral-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-1.5 [&_li]:text-neutral-600 [&_strong]:font-semibold [&_strong]:text-neutral-800 [&_a]:text-green-700 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </section>
        )}

        {/* ── SPECS ── */}
        {product.specs.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Caractéristiques techniques</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 hover:border-green-200 transition-colors">
                  <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-green-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400">{spec.label}</p>
                    <p className="text-sm font-bold text-neutral-900 truncate">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── FEATURES ── */}
        {product.features.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Points forts</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-100 hover:border-green-200 hover:shadow-sm transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0 text-xl">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── COMPARISON TABLE ── */}
        {product.comparison && (
          <section className="mb-14">
            <div className="text-center mb-8">
              <span className="inline-block bg-green-50 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
                Pourquoi Greenter ?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                Le Pack Greenter vs la concurrence
              </h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-sm">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200">
                    <th className="text-left p-4 text-sm font-semibold text-neutral-500 w-2/5">Critère</th>
                    <th className="p-4 text-center bg-green-50 border-l border-green-200">
                      <span className="text-sm font-bold text-green-700">✓ Pack Greenter</span>
                    </th>
                    <th className="p-4 text-center border-l border-neutral-100">
                      <span className="text-sm font-medium text-neutral-500">{product.comparison.alt1Name}</span>
                    </th>
                    <th className="p-4 text-center border-l border-neutral-100">
                      <span className="text-sm font-medium text-neutral-500">{product.comparison.alt2Name}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.comparison.rows.map((row, i) => (
                    <tr key={i} className={`border-b border-neutral-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'}`}>
                      <td className="p-4 text-sm font-medium text-neutral-700">{row.criterion}</td>
                      <td className="p-4 text-center bg-green-50/40 border-l border-green-100"><CellIcon value={row.ours} /></td>
                      <td className="p-4 text-center border-l border-neutral-100"><CellIcon value={row.alt1} /></td>
                      <td className="p-4 text-center border-l border-neutral-100"><CellIcon value={row.alt2} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── SOCIAL PROOF BAR ── */}
        {product.reviewCount > 0 && (
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 md:p-8 mb-14 text-white">
            <div className="grid grid-cols-3 gap-4 text-center mb-5">
              <div>
                <p className="text-3xl font-bold">{product.buyerCount}+</p>
                <p className="text-sm text-green-100 mt-0.5">clients satisfaits</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{product.rating}/5</p>
                <div className="flex justify-center mt-1"><StarRating rating={product.rating} /></div>
                <p className="text-sm text-green-100 mt-0.5">note moyenne</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{product.monthlyBuyers}</p>
                <p className="text-sm text-green-100 mt-0.5">commandes ce mois-ci</p>
              </div>
            </div>
            <div className="border-t border-white/20 pt-4 text-center">
              <ActivityTicker />
            </div>
          </div>
        )}

        {/* ── REVIEWS ── */}
        <section id="reviews-section" className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">
              {product.reviews.length > 0
                ? `Avis clients vérifiés (${product.reviewCount})`
                : 'Avis clients'}
            </h2>
            {product.reviews.length > 0 && (
              <button
                onClick={() => setShowForm(v => !v)}
                className="inline-flex items-center gap-2 border border-green-600 text-green-700 font-semibold text-sm px-4 py-2 rounded-full hover:bg-green-50 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Laisser un avis
              </button>
            )}
          </div>

          {/* Rating overview — only when reviews exist */}
          {product.reviews.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 bg-white rounded-2xl border border-neutral-100 p-6 mb-6 shadow-sm">
              <div className="flex flex-col items-center justify-center">
                <p className="text-6xl font-bold text-neutral-900">{product.rating}</p>
                <StarRating rating={product.rating} size="lg" />
                <p className="text-sm text-neutral-500 mt-2">sur {product.reviewCount} avis vérifiés</p>
              </div>
              <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
                {reviewDist.map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <span className="text-neutral-500 w-6 text-right">{stars}★</span>
                    <div className="flex-1 h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-neutral-500 w-8">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state — no reviews yet */}
          {product.reviews.length === 0 && !showForm && (
            <div className="bg-white rounded-2xl border border-neutral-100 p-10 text-center shadow-sm mb-6">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-7 h-7 text-green-600" />
              </div>
              <p className="font-bold text-neutral-900 text-lg mb-2">Aucun avis pour l&apos;instant</p>
              <p className="text-neutral-500 text-sm mb-6">Vous avez fait appel à nos services pour ce produit ? Partagez votre expérience — votre avis aide les futurs clients.</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Soyez le premier à laisser un avis
              </button>
            </div>
          )}

          {/* Review form */}
          {showForm && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-7 h-7 text-green-700" />
                  </div>
                  <p className="font-bold text-green-900 text-lg">Merci pour votre avis !</p>
                  <p className="text-green-700 text-sm mt-1">Il sera publié après vérification (sous 24h).</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-900 text-lg">Partagez votre expérience</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Prénom *</label>
                      <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Votre prénom"
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Ville *</label>
                      <input type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                        placeholder="Votre ville"
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Votre note *</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} type="button" onClick={() => setForm(f => ({ ...f, rating: n }))}>
                          <Star className={`w-8 h-8 transition-colors ${n <= form.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300 hover:text-amber-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Titre *</label>
                    <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="Résumez votre expérience en une phrase"
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Votre avis *</label>
                    <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                      placeholder="Partagez les détails de votre expérience..."
                      rows={4}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 resize-none bg-white" />
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <BadgeCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Votre avis sera marqué &laquo; Achat vérifié &raquo; après confirmation de commande.
                  </p>
                  <button
                    type="button"
                    onClick={() => { if (form.name && form.city && form.title && form.content) setSubmitted(true) }}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Publier mon avis
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reviews list */}
          <div className="space-y-4">
            {product.reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 text-sm flex-shrink-0">
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-sm text-neutral-900">{r.author}</span>
                        {r.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                            <Check className="w-2.5 h-2.5" /> Achat vérifié
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400">{r.city} · {r.date}</p>
                    </div>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                <p className="font-semibold text-neutral-900 mb-1">{r.title}</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">{r.content}</p>
                {r.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {r.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
                <button className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" /> Utile ({r.helpful})
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERT CALLOUT ── */}
        {product.expertCallout !== null && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 mb-14 text-white">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white">
                RGE
              </div>
              <div>
                <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Recommandation de nos experts</p>
                <p className="font-heading text-xl font-bold mb-3">
                  {product.expertCallout?.title ?? "Idéale pour les maisons de 80 à 130 m² en zone H2"}
                </p>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {product.expertCallout?.body ?? (
                    <>
                      Avec un SCOP de 5,1 en régime A7W35, ce modèle est l&apos;un des plus efficaces du marché dans sa gamme de prix.
                      Couplée à un plancher chauffant hydraulique, vous pouvez espérer{' '}
                      <strong className="text-white">50 à 65 % d&apos;économies</strong> sur votre facture de chauffage dès la première année.
                      Nos techniciens l&apos;installent en moyenne en une journée.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── GUARANTEE BLOCK ── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Nos engagements</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                emoji: '✅', bg: 'bg-green-50 border-green-200', iconBg: 'bg-green-600',
                title: 'Satisfait ou remboursé 30 jours',
                desc: 'Si vous n\'êtes pas satisfait dans les 30 jours suivant l\'installation, nous intervenons sans frais ou vous remboursons intégralement.',
              },
              {
                emoji: '🛡️', bg: 'bg-blue-50 border-blue-200', iconBg: 'bg-blue-600',
                title: 'Garantie 10 ans',
                desc: 'Garantie constructeur complète sur les pièces + garantie main-d\'œuvre sur l\'installation. Intervention sous 48h en cas de panne.',
              },
              {
                emoji: '⭐', bg: 'bg-amber-50 border-amber-200', iconBg: 'bg-amber-500',
                title: 'Dossiers aides inclus',
                desc: 'Tous nos techniciens sont certifiés RGE QualiPAC. Votre dossier MaPrimeRénov\' est monté et déposé par nos soins — sans avance de trésorerie.',
              },
            ].map(g => (
              <div key={g.title} className={`${g.bg} border rounded-2xl p-6`}>
                <div className={`${g.iconBg} w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4`}>
                  {g.emoji}
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{g.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        {product.faq.length > 0 && (
          <section className="mb-14">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Questions fréquentes</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-2">
              {product.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-green-50/50 transition-colors"
                  >
                    <span className="font-semibold text-sm md:text-base text-neutral-900 pr-4">{item.question}</span>
                    <ChevronDown className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform ${openFAQ === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFAQ === i && (
                    <div className="px-5 pb-5 border-t border-neutral-50">
                      <p className="pt-3 text-sm text-neutral-600 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── FINAL CTA ── */}
        <section className="bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white mb-8">
          {product.gift && (
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              🎁 {product.gift.name} offert · expire dans {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </div>
          )}
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            Profitez de l&apos;offre aujourd&apos;hui
          </h2>
          <p className="text-green-100 mb-6 max-w-lg mx-auto">
            Livraison + installation par technicien RGE + dossier MaPrimeRénov&apos; inclus.
            {savings > 0 && <> Économisez <strong className="text-white">{savings.toLocaleString('fr-FR')} €</strong> sur le prix habituel.</>}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={href} className="bg-white text-green-700 hover:bg-green-50 font-bold text-lg py-4 px-10 rounded-full inline-flex items-center justify-center gap-2 transition-colors shadow-xl">
              {product.ctaLabel ?? 'Commander maintenant →'}
            </Link>
            <Link href="/contact" className="bg-white/20 hover:bg-white/30 text-white font-medium py-4 px-8 rounded-full inline-flex items-center justify-center gap-2 transition-colors">
              <Phone className="w-4 h-4" /> Parler à un expert
            </Link>
          </div>
          {!product.hideMonthly && (
            <p className="text-green-200 text-sm mt-4">
              Ou 3×{monthly.toLocaleString('fr-FR')} € sans frais · Paiement 100% sécurisé
            </p>
          )}
        </section>

        <div className="text-center">
          <Link href={`/produits/${product.categorySlug}`} className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium text-sm transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour à {product.categoryName}
          </Link>
        </div>
      </div>

      {/* ── STICKY BAR ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] transition-transform duration-300 ${stickyVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 hidden sm:block">
              <p className="text-sm font-semibold text-neutral-900 truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <StarRating rating={product.rating} />
                <span className="text-xs text-neutral-500">{product.reviewCount} avis</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-1 sm:flex-none justify-end">
              <div className="text-right">
                <p className="text-xl font-bold text-neutral-900">{product.currentPrice.toLocaleString('fr-FR')} €</p>
                {savings > 0 && <p className="text-xs text-green-600 font-medium">Économie {savings.toLocaleString('fr-FR')} €</p>}
              </div>
              <Link href={href} className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-full text-sm transition-colors whitespace-nowrap shadow-lg shadow-green-600/25">
                {product.ctaLabel ? product.ctaLabel.replace(' →', '') + ' →' : 'Commander →'}
              </Link>
            </div>
          </div>
          {product.gift && (
            <p className="text-xs text-amber-700 font-medium text-center mt-1.5 flex items-center justify-center gap-1">
              <Gift className="w-3 h-3" /> {product.gift.name} offert · {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </p>
          )}
        </div>
      </div>

    </main>
  )
}
