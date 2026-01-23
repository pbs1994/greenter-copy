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
    const parts = ["contact", "greenter", "fr"]
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
