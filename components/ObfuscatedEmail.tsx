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
    const parts = ["contact.greenter", "gmail", "com"]
    setEmail(`${parts[0]}@${parts[1]}.${parts[2]}`)
  }, [])

  return email
}

export function ObfuscatedEmail({ className = "", showIcon = false }: ObfuscatedEmailProps) {
  const email = useObfuscatedEmail()

  return (
    <button 
      onClick={() => email && (window.location.href = `mailto:${email}`)}
      className={className}
    >
      {email || "Chargement..."}
    </button>
  )
}

interface ObfuscatedEmailLinkProps {
  className?: string
  subject?: string
  children: React.ReactNode
}

export function ObfuscatedEmailLink({ className = "", subject, children }: ObfuscatedEmailLinkProps) {
  const email = useObfuscatedEmail()

  const handleClick = () => {
    if (email) {
      const mailto = subject 
        ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
        : `mailto:${email}`
      window.location.href = mailto
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
