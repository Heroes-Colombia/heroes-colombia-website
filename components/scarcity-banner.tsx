"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"

export function ScarcityBanner({ variant = "user" }: { variant?: "user" | "business" }) {
  const [spotsLeft, setSpotsLeft] = useState(variant === "user" ? 1000 : 100)

  useEffect(() => {
    // Simulate spots decreasing
    const interval = setInterval(() => {
      setSpotsLeft((prev) => Math.max(prev - Math.floor(Math.random() * 3), variant === "user" ? 850 : 75))
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [variant])

  return (
    <div className="bg-accent/10 border-y border-accent/20 py-3">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-center">
          <AlertCircle className="h-5 w-5 text-accent shrink-0" />
          <p className="text-sm font-medium text-accent">
            {variant === "user" ? (
              <>
                <span className="font-bold">{spotsLeft} cupos restantes</span> para beneficios exclusivos de lanzamiento
              </>
            ) : (
              <>
                <span className="font-bold">Solo {spotsLeft} espacios disponibles</span> para negocios en el lanzamiento
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
