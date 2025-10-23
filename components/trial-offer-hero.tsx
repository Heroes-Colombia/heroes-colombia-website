"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrialCountdown } from "@/components/trial-countdown"
import {
  Check,
  Shield,
  CheckCircle2,
  Sparkles,
  Calendar,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import {
  getCurrentPricing,
  isTrialOfferActive,
  formatPriceSimple,
  formatPrice,
  isEarlyBirdActive,
} from "@/lib/pricing-config"

interface TrialOfferHeroProps {
  onStartTrial?: () => void
}

export function TrialOfferHero({ onStartTrial }: TrialOfferHeroProps) {
  const pricing = getCurrentPricing()
  const showTrial = isTrialOfferActive()
  const showEarlyBird = isEarlyBirdActive()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleStartTrial = async () => {
    setIsProcessing(true)
    try {
      if (onStartTrial) {
        await onStartTrial()
      } else {
        // Default: scroll to signup form or redirect
        const signupSection = document.getElementById("comenzar")
        if (signupSection) {
          signupSection.scrollIntoView({ behavior: "smooth" })
        }
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("planes")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!showTrial) {
    // If trial is not active, show standard pricing CTA
    return (
      <section className="relative overflow-hidden py-15 md:py-25">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
        <div className="container relative max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Aumenta Tus Ventas hasta 3.5x con{" "}
              <span className="text-primary">Héroes Colombia</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conecta con 380,000 militares y sus familias con alto poder adquisitivo
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={scrollToPricing}>
                Ver Planes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/solicitar-demo">
                  <Calendar className="mr-2 h-5 w-5" />
                  Solicitar Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden py-15 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />

      <div className="container relative max-w-7xl mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">

          {/* Launch Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg animate-pulse">
            <Sparkles className="h-5 w-5" />
            {pricing.trialOffer?.badge || "Oferta Especial de Lanzamiento"}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Aumenta tus ventas hasta 3.5x con{" "}
            <span className="text-primary">Héroes Colombia</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Accede a 380,000 clientes leales con alto poder adquisitivo
          </p>

          {/* Countdown Timer */}
          <div className="mb-8 flex justify-center">
            <TrialCountdown />
          </div>

          {/* Trial Offer Card */}
          <Card className="max-w-3xl mx-auto mb-10 border-4 border-primary shadow-2xl bg-gradient-to-br from-white to-primary/5 dark:from-slate-900 dark:to-primary/10">
            <CardContent className="p-8 md:p-12">

              {/* Price Display */}
              <div className="mb-6">
                <div className="text-7xl md:text-8xl font-black text-primary mb-2">
                  {formatPriceSimple(pricing.trialOffer?.price || 0)}
                  <span className="text-3xl align-top"> COP</span>
                </div>
                <div className="text-xl md:text-2xl text-muted-foreground font-semibold">
                  {pricing.trialOffer?.description || "Pago único por acceso completo al plan Enterprise"}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  (IVA 19% incluido)
                </div>
              </div>

              {/* What's Included - Enterprise Features */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8 shadow-inner">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 justify-center">
                  Acceso Completo al plan Enterprise hasta Febrero 1, 2026
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Ubicaciones ilimitadas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Promociones ilimitadas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Analiticas en tiempo real</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Negocio destacado en la App</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Segmentación de audiencia</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Acceso para 10 usuarios</span>
                  </div>
                </div>
              </div>

              {/* Early Bird Bonus */}
              {showEarlyBird && (
                <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                  <Sparkles className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                    <strong>🎁 Bonus Exclusivo:</strong> Selecciona tu plan antes del 15 de enero
                    y obtén un<strong> descuento adicional </strong> en tu primer mes después de la prueba
                  </AlertDescription>
                </Alert>
              )}

              {/* CTA Button */}
              <Button
                size="lg"
                className="w-full text-lg h-14 shadow-lg hover:shadow-xl transition-shadow mb-6"
                onClick={handleStartTrial}
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Comenzar Ahora por " + formatPrice(pricing.trialOffer?.price || 0)}
              </Button>

              {/* Post-trial Info */}
              <Alert className="border-primary/50">
                <AlertDescription>
                  <strong>Sin cargos adicionales hasta Febrero 1, 2026.</strong>
                  <br />
                  Después, elige el plan que deseas o continúa gratis.
                  <Button
                    variant="link"
                    className="p-0 h-auto ml-1 text-primary"
                    onClick={scrollToPricing}
                  >
                    Ver planes completos →
                  </Button>
                </AlertDescription>
              </Alert>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Pago 100% seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Sin compromiso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Cancela cuando quieras</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
