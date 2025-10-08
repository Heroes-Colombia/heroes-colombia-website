"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TrialOfferHero } from "@/components/trial-offer-hero"
import { EarlyBirdBanner } from "@/components/early-bird-banner"
import { TrialSignupModal, type TrialSignupData } from "@/components/trial-signup-modal"
import { AnimatedStat } from "@/components/animated-stats"
import { FeedbackForm } from "@/components/feedback-form"
import { DashboardShowcase } from "@/components/dashboard-showcase"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { TrustBadges } from "@/components/trust-badges"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FAQSection } from "@/components/faq-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentPricing, formatPriceSimple, isEarlyBirdActive, getEarlyBirdDiscount } from "@/lib/pricing-config"
import {
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Star,
  CheckCircle2,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BusinessPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const pricing = getCurrentPricing()
  const showEarlyBird = isEarlyBirdActive()

  const handleStartTrial = () => {
    setShowSignupModal(true)
  }

  const handleSignupSubmit = async (data: TrialSignupData) => {
    try {
      const response = await fetch("/api/mercadopago/create-trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Error al crear el checkout")
      }

      const result = await response.json()

      // Redirect to MercadoPago checkout
      window.location.href = result.checkoutUrl
    } catch (error) {
      console.error("[Trial] Error:", error)
      throw error // Re-throw to let modal handle it
    }
  }

  const handlePurchase = async (planType: "basico" | "pro", billingPeriod: "monthly" | "annual") => {
    setIsProcessing(true)
    try {
      const prices = {
        basico: { monthly: pricing.regularPlans.basico.monthly, annual: pricing.regularPlans.basico.annual },
        pro: { monthly: pricing.regularPlans.pro.monthly, annual: pricing.regularPlans.pro.annual },
      }

      const price = prices[planType][billingPeriod]
      const title = `Plan ${planType === "basico" ? "Básico" : "Pro"} - ${billingPeriod === "monthly" ? "Mensual" : "Anual"}`
      const description = `Suscripción ${billingPeriod === "monthly" ? "mensual" : "anual"} al plan ${planType === "basico" ? "Básico" : "Pro"} de Héroes Colombia`

      const checkoutUrl = await createMercadoPagoCheckout({
        title,
        description,
        price,
        quantity: 1,
        planType,
        billingPeriod,
      })

      // Redirect to Mercado Pago checkout
      window.location.href = checkoutUrl
    } catch (error) {
      console.error("[v0] Error creating checkout:", error)
      alert("Hubo un error al procesar tu compra. Por favor intenta de nuevo.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />
      <TrialSignupModal open={showSignupModal} onOpenChange={setShowSignupModal} onSubmit={handleSignupSubmit} />
      <EarlyBirdBanner />
      <ExitIntentPopup />

      <main className="flex-1">
        {/* NEW: Trial Offer Hero Section */}
        <TrialOfferHero onStartTrial={handleStartTrial} />

        <section className="py-16 md:py-20 bg-secondary border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">El Potencial de Tu Negocio</h2>
              <p className="text-muted-foreground">Proyecciones basadas en estudios de mercado y datos reales</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AnimatedStat value="380" label="Clientes Potenciales" suffix="K+" />
              <AnimatedStat value="85" label="Tasa de Retención Esperada" suffix="%" />
              <AnimatedStat value="3.5" label="ROI Proyectado Primer Año" suffix="x" />
              <AnimatedStat value="100" label="Cupos Disponibles Lanzamiento" suffix="" />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DashboardShowcase />
          </div>
        </section>

        <section id="beneficios" className="py-20 md:py-32 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Por Qué Cientos de Negocios Ya Se Registraron
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Una plataforma completa para atraer clientes leales y aumentar ventas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Audiencia de Alto Valor</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Militares con ingresos estables, alta lealtad de marca y poder adquisitivo 40% superior al promedio
                    nacional.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Métricas en Tiempo Real</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Dashboard inteligente que te muestra exactamente qué funciona: vistas, canjes, ROI y más.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Campañas Inteligentes</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Segmenta por ubicación, rango militar y preferencias. Llega exactamente a quien quieres.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Negocios Físicos y En Línea</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No necesitas una tienda física. E-commerce, servicios digitales y negocios tradicionales pueden
                    participar y crecer.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Cero Fraude</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sistema de verificación QR que garantiza que solo usuarios militares válidos canjeen beneficios.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Soporte Dedicado</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Recursos completos de ayuda, documentación detallada y soporte por email para optimizar tus
                    campañas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="planes" className="py-20 md:py-32 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Elige el Plan Perfecto Para Tu Negocio
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Comienza gratis y escala cuando veas resultados. Sin sorpresas.
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <span className={`text-sm ${!isAnnual ? "font-medium" : "text-muted-foreground"}`}>Mensual</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer pricing-toggle"
                    checked={isAnnual}
                    onChange={(e) => setIsAnnual(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className={`text-sm ${isAnnual ? "font-medium" : "text-muted-foreground"}`}>
                  Anual <span className="text-primary">(Ahorra hasta 15%)</span>
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Gratis Plan */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Gratis</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{formatPriceSimple(pricing.regularPlans.gratis.monthly)}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    + {formatPriceSimple(pricing.regularPlans.gratis.perPromotion)} COP por promoción
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">1 ubicación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Paga por promoción</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica básica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte por email</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="https://v0-heroes-colombia-dashboard.vercel.app/" target="_blank">
                      Comenzar Gratis
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Básico Plan */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Básico</CardTitle>
                  {showEarlyBird && (
                    <Badge variant="secondary" className="mt-2">
                      🎁 {getEarlyBirdDiscount()}% OFF si seleccionas antes del 15 enero
                    </Badge>
                  )}
                  <div className="mt-4">
                    {!isAnnual ? (
                      <>
                        <span className="text-4xl font-bold">{formatPriceSimple(pricing.regularPlans.basico.monthly)}</span>
                        <span className="text-muted-foreground">/mes</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">{formatPriceSimple(pricing.regularPlans.basico.annual)}</span>
                        <span className="text-muted-foreground">/año</span>
                        <div className="text-sm text-primary font-medium mt-1">
                          Ahorras {formatPriceSimple(pricing.regularPlans.basico.savings)} COP
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">IVA incluido • Para negocios en crecimiento</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 3 ubicaciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">10 promociones activas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica avanzada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte prioritario</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Gestión de equipo básica</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => handlePurchase("basico", isAnnual ? "annual" : "monthly")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Procesando..." : "Comprar Ahora"}
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-2 border-primary relative hover:shadow-xl transition-shadow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    Más Popular
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  {showEarlyBird && (
                    <Badge variant="secondary" className="mt-2">
                      🎁 {getEarlyBirdDiscount()}% OFF si seleccionas antes del 15 enero
                    </Badge>
                  )}
                  <div className="mt-4">
                    {!isAnnual ? (
                      <>
                        <span className="text-4xl font-bold">{formatPriceSimple(pricing.regularPlans.pro.monthly)}</span>
                        <span className="text-muted-foreground">/mes</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">{formatPriceSimple(pricing.regularPlans.pro.annual)}</span>
                        <span className="text-muted-foreground">/año</span>
                        <div className="text-sm text-primary font-medium mt-1">
                          Ahorras {formatPriceSimple(pricing.regularPlans.pro.savings)} COP
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">IVA incluido • Máximo crecimiento</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 10 ubicaciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Promociones ilimitadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analytics completos con IA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Segmentación de audiencia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Gestión avanzada de equipo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte 24/7</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full shadow-lg"
                    onClick={() => handlePurchase("pro", isAnnual ? "annual" : "monthly")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Procesando..." : "Comprar Ahora"}
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  {showEarlyBird && (
                    <Badge variant="secondary" className="mt-2">
                      🎁 {getEarlyBirdDiscount()}% OFF si seleccionas antes del 15 enero
                    </Badge>
                  )}
                  <div className="mt-4">
                    {!isAnnual ? (
                      <>
                        <span className="text-3xl font-bold">Desde</span>
                        <br />
                        <span className="text-4xl font-bold">{formatPriceSimple(pricing.regularPlans.enterprise.monthly)}</span>
                        <span className="text-muted-foreground">/mes</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">Desde</span>
                        <br />
                        <span className="text-4xl font-bold">{formatPriceSimple(pricing.regularPlans.enterprise.annual)}</span>
                        <span className="text-muted-foreground">/año</span>
                        <div className="text-sm text-primary font-medium mt-1">
                          Ahorras {formatPriceSimple(pricing.regularPlans.enterprise.savings)} COP
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">IVA incluido • Precio personalizado para cadenas y franquicias</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Ubicaciones ilimitadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Promociones ilimitadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica Pro + A/B testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Sección destacada premium</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Manager dedicado + API</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte dedicado + SLA</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/solicitar-demo">Contactar Ventas</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <TrustBadges />

        <section className="py-20 md:py-32 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Negocios Listos Para Crecer</h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Empresarios que ya se registraron y esperan el lanzamiento
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "Estamos emocionados de ser parte del lanzamiento. La comunidad militar es un mercado que siempre
                    hemos querido alcanzar y esta plataforma nos da la oportunidad perfecta."
                  </p>
                  <div>
                    <div className="font-semibold text-sm">Restaurante El Buen Sabor</div>
                    <div className="text-xs text-muted-foreground">Bogotá</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "Ya nos registramos y estamos preparando promociones especiales para el lanzamiento. Esperamos
                    atraer clientes leales que valoren nuestros servicios."
                  </p>
                  <div>
                    <div className="font-semibold text-sm">Gimnasio FitZone</div>
                    <div className="text-xs text-muted-foreground">Medellín</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "La plataforma se ve muy profesional. Nos encanta la idea de poder segmentar nuestras campañas y
                    medir el ROI en tiempo real. Esperamos grandes resultados."
                  </p>
                  <div>
                    <div className="font-semibold text-sm">Tienda Deportiva ProSport</div>
                    <div className="text-xs text-muted-foreground">Cali</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeedbackForm variant="business" />
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-accent via-accent to-primary text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                Comienza a Atraer Clientes Leales Hoy
              </h2>
              <p className="text-lg text-primary-foreground/90 text-balance mb-8 leading-relaxed">
                Únete a los primeros 500 negocios y obtén visibilidad premium durante el lanzamiento. Solicita una demo
                personalizada sin compromiso o comienza gratis ahora mismo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto shadow-lg">
                  <Link href="/solicitar-demo">
                    <Calendar className="mr-2 h-5 w-5" />
                    Solicitar Demo Gratis
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="https://v0-heroes-colombia-dashboard.vercel.app/" target="_blank">
                    Comenzar Gratis
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Más de 50 negocios ya se registraron para el lanzamiento
              </p>
            </div>
          </div>
        </section>
        <section id="faq" className="py-10 md:py-22 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-10">
            <FAQSection variant="business" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
