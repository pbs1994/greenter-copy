"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Phone, ArrowRight, X, ChevronRight, Sun, Home, Thermometer, FileSearch, Wrench, ShoppingBag, Battery } from "lucide-react"
import { useProductPrice } from "@/lib/useProductPrice"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const services = [
  {
    title: "Pompe à chaleur",
    href: "/services/pompe-a-chaleur",
    description: "Divisez vos factures par 3",
    icon: Thermometer,
    image: "/pac.jpg",
    badge: "Populaire",
  },
  {
    title: "Panneaux solaires",
    href: "/services/panneaux-solaires",
    description: "Produisez votre électricité",
    icon: Sun,
    image: "/solaire.jpg",
    badge: null,
  },
  {
    title: "Isolation thermique",
    href: "/services/isolation",
    description: "Stoppez les déperditions",
    icon: Home,
    image: "/isolation.jpg",
    badge: null,
  },
  {
    title: "Audit énergétique",
    href: "/services/audit",
    description: "Diagnostic complet",
    icon: FileSearch,
    image: "/audit.png",
    badge: null,
  },
  {
    title: "Maintenance & SAV",
    href: "/services/maintenance",
    description: "Entretien et dépannage",
    icon: Wrench,
    image: "/maintenance.jpg",
    badge: null,
  },
]

const products = [
  {
    title: "KSTAR BluE-S 6kW",
    href: "/produits/kstar-blue-s-6kw",
    description: "Onduleur hybride + stockage",
    image: "/kstar.png",
    badge: "Nouveau",
  },
]

const navLinks = [
  { title: "Accueil", href: "/" },
  { title: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { data: priceData } = useProductPrice()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header 
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-neutral-200"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between px-4 h-16 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.svg"
            alt="Greenter"
            width={140}
            height={40}
            className="h-8 sm:h-9 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation - Centré */}
        {mounted && (
        <NavigationMenu className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-neutral-700 font-medium`}
                asChild
              >
                <Link href="/">Accueil</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-neutral-700 font-medium">
                Nos services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[680px] p-4 bg-white">
                  {/* 5 services en grille horizontale */}
                  <div className="grid grid-cols-5 gap-2">
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <NavigationMenuLink key={service.title} asChild>
                          <Link
                            href={service.href}
                            className="group relative flex flex-col rounded-xl overflow-hidden bg-neutral-100 hover:bg-neutral-50 transition-all"
                          >
                            {/* Image */}
                            <div className="relative h-20 w-full overflow-hidden">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              
                              {/* Badge */}
                              {service.badge && (
                                <span className="absolute top-1.5 left-1.5 bg-teal-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                                  {service.badge}
                                </span>
                              )}
                              
                              {/* Icône */}
                              <div className="absolute bottom-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-md flex items-center justify-center">
                                <Icon className="w-3 h-3 text-green-700" />
                              </div>
                            </div>

                            {/* Texte */}
                            <div className="p-2 text-center">
                              <h4 className="font-semibold text-xs text-neutral-900 group-hover:text-green-700 transition-colors leading-tight">
                                {service.title}
                              </h4>
                            </div>
                            
                            {/* Hover ring */}
                            <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-green-400 transition-all pointer-events-none" />
                          </Link>
                        </NavigationMenuLink>
                      )
                    })}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                    <a href="tel:+33609455056" className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span className="font-semibold">06 09 45 50 56</span>
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white font-semibold text-xs px-4 py-2 rounded-full transition-colors"
                    >
                      Devis gratuit
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-neutral-700 font-medium">
                Produits
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[320px] p-4 bg-white">
                  {products.map((product) => (
                    <NavigationMenuLink key={product.title} asChild>
                      <Link
                        href={product.href}
                        className="group flex items-center gap-4 rounded-xl p-3 hover:bg-green-50 transition-all"
                      >
                        {/* Image produit */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={60}
                            height={70}
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.badge && (
                            <span className="absolute top-1 left-1 bg-teal-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        
                        {/* Infos */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-neutral-900 group-hover:text-green-700 transition-colors">
                            {product.title}
                          </h4>
                          <p className="text-xs text-neutral-500 mb-1">
                            {product.description}
                          </p>
                          <p className="text-sm font-bold text-green-700">
                            {priceData?.formatted || '...'}
                          </p>
                        </div>
                        
                        <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </NavigationMenuLink>
                  ))}
                  
                  {/* Lien tous les produits */}
                  <div className="mt-3 pt-3 border-t border-neutral-100">
                    <Link
                      href="/produits"
                      className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Voir tous les produits
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-neutral-700 font-medium`}
                asChild
              >
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        )}

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            href="/contact"
            className="btn-primary text-sm"
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div 
        className={`
          fixed inset-0 z-50 lg:hidden
          transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div 
          className={`
            absolute inset-0 bg-black/60 backdrop-blur-sm
            transition-opacity duration-300
            ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={closeMenu}
        />

        {/* Menu Panel */}
        <div 
          className={`
            absolute top-0 right-0 h-full w-full max-w-[340px] bg-white
            transform transition-transform duration-300 ease-out
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            flex flex-col overflow-hidden
          `}
        >
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-green-900 via-green-800 to-teal-800 px-5 py-4">
            <div className="flex items-center justify-between">
              <Image
                src="/logo.svg"
                alt="Greenter"
                width={100}
                height={28}
                className="h-7 w-auto brightness-0 invert"
              />
              <button
                onClick={closeMenu}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            {/* Petit texte d'accroche */}
            <p className="text-green-200 text-xs mt-3">
              Votre partenaire en rénovation énergétique
            </p>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto bg-neutral-50">
            {/* Accueil avec style spécial */}
            <div className="p-3">
              <Link
                href="/"
                onClick={closeMenu}
                className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-neutral-200 hover:border-green-400 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">
                  Accueil
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-green-500 ml-auto transition-all group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Services Section */}
            <div className="px-3 pb-4">
              <div className="px-2 py-2 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-green-300 to-transparent"></div>
                <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Nos Services
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-green-300 to-transparent"></div>
              </div>
              <div className="space-y-2">
                {services.slice(0, 3).map((service, index) => {
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={closeMenu}
                      className="group flex items-center gap-3 px-3 py-3 bg-white rounded-xl border border-transparent hover:border-green-300 hover:shadow-md transition-all"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 ring-2 ring-neutral-100 group-hover:ring-green-400 transition-all">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">
                            {service.title}
                          </span>
                          {service.badge && (
                            <span className="bg-gradient-to-r from-teal-500 to-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {service.description}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-green-500 transition-all group-hover:translate-x-1" />
                    </Link>
                  )
                })}
              </div>

              {/* Services secondaires */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {services.slice(3).map((service) => {
                  const Icon = service.icon
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={closeMenu}
                      className="group flex items-center gap-2.5 px-3 py-3 bg-white rounded-xl border border-transparent hover:border-green-300 hover:shadow-md transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center group-hover:from-green-500 group-hover:to-teal-500 transition-all">
                        <Icon className="w-4 h-4 text-green-700 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700 group-hover:text-green-700 transition-colors">
                        {service.title}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Produits Section */}
            <div className="px-3 pb-4">
              <div className="px-2 py-2 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-teal-300 to-transparent"></div>
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Boutique
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-teal-300 to-transparent"></div>
              </div>
              {products.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  onClick={closeMenu}
                  className="group flex items-center gap-3 px-3 py-3 bg-white rounded-xl border border-transparent hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center shrink-0 group-hover:from-green-100 group-hover:to-teal-200 transition-all">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={50}
                      height={60}
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-1 left-1 bg-gradient-to-r from-teal-500 to-green-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded animate-pulse">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-neutral-900 group-hover:text-teal-700 transition-colors">
                      {product.title}
                    </span>
                    <div className="text-sm text-neutral-500">{product.description}</div>
                    <div className="text-sm font-bold text-teal-600">{priceData?.formatted || '...'}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-teal-500 transition-all group-hover:translate-x-1" />
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div className="px-3 pb-4">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-neutral-200 hover:border-green-400 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">
                  Contact
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-green-500 ml-auto transition-all group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Footer avec gradient */}
          <div className="bg-gradient-to-r from-green-900 via-green-800 to-teal-800 p-4">
            {/* Phone */}
            <a 
              href="tel:+33609455056" 
              className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all mb-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-green-200 font-medium">Appelez-nous</div>
                <div className="font-semibold text-white">06 09 45 50 56</div>
              </div>
            </a>

            {/* CTA */}
            <Link 
              href="/contact"
              onClick={closeMenu}
              className="group flex items-center justify-center gap-2 w-full bg-white hover:bg-green-50 text-green-800 font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg"
            >
              Demander un devis gratuit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
