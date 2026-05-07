"use client"

import { useState, useEffect } from "react"

interface ObfuscatedEmailProps {
  className?: string
  showIcon?: boolean
}

export function useObfuscatedEmail() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Obfuscation de l'email contre les scrapers
    // L'email est assemblé côté client pour éviter le scraping
    const parts = ["contact.greenter", "gmail", "com"]
    setEmail(`${parts[0]}@${parts[1]}.${parts[2]}`)
  }, [])

  return email
}

export function ObfuscatedEmail({ className = "", showIcon = false }: ObfuscatedEmailProps) {
  const email = useObfuscatedEmail()

  return (
    <a
      href={email ? `mailto:${email}` : undefined}
      className={className}
    >
      {email || "Chargement..."}
    </a>
  )
}

interface ObfuscatedEmailLinkProps {
  className?: string
  subject?: string
  children: React.ReactNode
}

export function ObfuscatedEmailLink({ className = "", subject, children }: ObfuscatedEmailLinkProps) {
  const email = useObfuscatedEmail()

  const href = email
    ? subject
      ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
      : `mailto:${email}`
    : undefined

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
