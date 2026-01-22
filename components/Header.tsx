"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Phone, ArrowRight, X, ChevronRight, Zap, Sun, Home, Thermometer } from "lucide-react"

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
    title: "Audit énergétique",
    href: "/services/audit",
    description: "Analyse complète de votre logement",
    icon: Zap,
  },
  {
    title: "Pompes à chaleur",
    href: "/services/pompe-a-chaleur",
    description: "Installation et maintenance",
    icon: Thermometer,
  },
  {
    title: "Panneaux solaires",
    href: "/services/panneaux-solaires",
    description: "Production d'énergie propre",
    icon: Sun,
  },
  {
    title: "Isolation thermique",
    href: "/services/isolation",
    description: "Confort optimal toute l'année",
    icon: Home,
  },
]

const navLinks = [
  { title: "Accueil", href: "/" },
  { title: "Réalisations", href: "/realisations" },
  { title: "À propos", href: "/about" },
  { title: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

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

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-neutral-700 hover:text-green-700 font-medium`}
                asChild
              >
                <Link href="/">Accueil</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-neutral-700 hover:text-green-700 font-medium">
                Nos services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-3">
                  {services.map((service) => (
                    <li key={service.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={service.href}
                          className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 focus:bg-green-50 group"
                        >
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-green-700">
                            {service.title}
                          </div>
                          <p className="text-sm text-neutral-500 mt-1 leading-snug">
                            {service.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-neutral-700 hover:text-green-700 font-medium`}
                asChild
              >
                <Link href="/realisations">Réalisations</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-neutral-700 hover:text-green-700 font-medium`}
                asChild
              >
                <Link href="/about">À propos</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-neutral-700 hover:text-green-700 font-medium`}
                asChild
              >
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="tel:+33609455056" 
            className="flex items-center gap-2 text-neutral-600 hover:text-green-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">06 09 45 50 56</span>
          </a>
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
            flex flex-col
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-100">
            <Image
              src="/logo.svg"
              alt="Greenter"
              width={100}
              height={28}
              className="h-7 w-auto"
            />
            <button
              onClick={closeMenu}
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-4 w-4 text-neutral-600" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Links */}
            <div className="px-3 py-4">
              {navLinks.slice(0, 1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-neutral-900 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  {link.title}
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              ))}
            </div>

            {/* Services Section */}
            <div className="px-3 pb-4">
              <div className="px-4 py-2">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Nos services
                </span>
              </div>
              <div className="space-y-1">
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={closeMenu}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Icon className="w-5 h-5 text-green-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-neutral-900 group-hover:text-green-700 transition-colors">
                          {service.title}
                        </div>
                        <div className="text-sm text-neutral-500 truncate">
                          {service.description}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-green-500 transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Other Links */}
            <div className="px-3 pb-4 border-t border-neutral-100 pt-4">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-neutral-900 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  {link.title}
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-100 bg-neutral-50">
            {/* Phone */}
            <a 
              href="tel:+33609455056" 
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-green-300 hover:shadow-sm transition-all mb-3"
            >
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <div className="text-xs text-neutral-500 font-medium">Appelez-nous</div>
                <div className="font-semibold text-neutral-900">06 09 45 50 56</div>
              </div>
            </a>

            {/* CTA */}
            <Link 
              href="/contact"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Demander un devis gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
