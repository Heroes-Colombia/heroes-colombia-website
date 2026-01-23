"use client"

import { useState, useEffect } from "react"
import { X, Download } from "lucide-react"
import Link from "next/link"

type Platform = "ios" | "android" | "other"

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "other"

  const userAgent = navigator.userAgent.toLowerCase()

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "ios"
  }

  if (/android/.test(userAgent)) {
    return "android"
  }

  return "other"
}

const STORE_LINKS = {
  ios: "https://apps.apple.com/au/app/h%C3%A9roes-colombia/id6743999048",
  android: "https://play.google.com/store/apps/details?id=com.heroes.heroes_app&pcampaignid=web_share",
}

export function AppDownloadBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [platform, setPlatform] = useState<Platform>("other")

  useEffect(() => {
    const detectedPlatform = detectPlatform()
    setPlatform(detectedPlatform)

    // Only show banner on mobile devices (iOS or Android)
    if (detectedPlatform === "other") return

    // Show banner after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  // Don't render on desktop or if dismissed
  if (platform === "other" || isDismissed) {
    return null
  }

  const storeLink = STORE_LINKS[platform]

  return (
    <div
      className={`sticky top-0 z-50 overflow-hidden transition-all duration-500 ease-out ${isVisible ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
        }`}
    >
      <div className="bg-primary text-primary-foreground py-3 px-4 shadow-lg">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 bg-primary-foreground/20 rounded-lg p-2">
                <Download className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">Héroes Colombia</p>
                <p className="text-xs text-primary-foreground/80 truncate">
                  Descarga gratis y accede a descuentos exclusivos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href={storeLink}
                target="_blank"
                className="bg-primary-foreground text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-foreground/90 transition-colors whitespace-nowrap"
              >
                Descargar
              </Link>
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
                aria-label="Cerrar banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
