"use client"

import { useState, useEffect } from "react"
import { X, Sparkles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isEarlyBirdActive, getEarlyBirdDaysRemaining, getEarlyBirdDiscount } from "@/lib/pricing-config"

export function EarlyBirdBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [daysRemaining, setDaysRemaining] = useState(getEarlyBirdDaysRemaining())
  const isActive = isEarlyBirdActive()

  useEffect(() => {
    // Update days remaining every minute
    const interval = setInterval(() => {
      setDaysRemaining(getEarlyBirdDaysRemaining())
    }, 60000) // 1 minute

    return () => clearInterval(interval)
  }, [])

  // Check if user has dismissed the banner
  useEffect(() => {
    const dismissed = localStorage.getItem("early-bird-banner-dismissed")
    if (dismissed === "true") {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("early-bird-banner-dismissed", "true")
  }

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("planes")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isActive || !isVisible) return null

  const discount = getEarlyBirdDiscount()

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Sparkles className="h-5 w-5 shrink-0 animate-pulse" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold">⚡ Oferta Especial:</span>
              <span className="font-medium">
                {discount}% de descuento en tu primer mes si seleccionas tu plan antes del 15 de enero
              </span>
              {daysRemaining > 0 && (
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-1 rounded text-sm font-mono">
                  <Clock className="h-3 w-3" />
                  {daysRemaining} {daysRemaining === 1 ? "día" : "días"} restantes
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="secondary"
              onClick={scrollToPricing}
              className="hidden sm:inline-flex"
            >
              Ver Planes
            </Button>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Cerrar banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Alternative: Floating badge version (less intrusive)
export function EarlyBirdFloatingBadge() {
  const [isVisible, setIsVisible] = useState(true)
  const isActive = isEarlyBirdActive()
  const daysRemaining = getEarlyBirdDaysRemaining()

  useEffect(() => {
    const dismissed = localStorage.getItem("early-bird-badge-dismissed")
    if (dismissed === "true") {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("early-bird-badge-dismissed", "true")
  }

  if (!isActive || !isVisible) return null

  const discount = getEarlyBirdDiscount()

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl shadow-2xl p-4 pr-10 max-w-xs">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-2 mb-2">
          <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-lg">{discount}% OFF</div>
            <div className="text-sm">
              Selecciona tu plan antes del 15 de enero
            </div>
          </div>
        </div>

        {daysRemaining > 0 && (
          <div className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded inline-block">
            ⏰ {daysRemaining} {daysRemaining === 1 ? "día" : "días"} restantes
          </div>
        )}
      </div>
    </div>
  )
}
