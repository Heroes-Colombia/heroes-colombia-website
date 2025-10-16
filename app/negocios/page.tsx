"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TrialOfferHero } from "@/components/trial-offer-hero"
import { TrialSignupModal, type TrialSignupData } from "@/components/trial-signup-modal"
import { AnimatedStat } from "@/components/animated-stats"
import { FeedbackForm } from "@/components/feedback-form"
import { DashboardShowcase } from "@/components/dashboard-showcase"
import { TrustBadges } from "@/components/trust-badges"
import { Button } from "@/components/ui/button"
import { FAQSection } from "@/components/faq-section"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentPricing, formatPriceSimple } from "@/lib/pricing-config"
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
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BusinessPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const pricing = getCurrentPricing()

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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />
      <UrgencyBanner variant="business" />
      <TrialSignupModal open={showSignupModal} onOpenChange={setShowSignupModal} onSubmit={handleSignupSubmit} />

      <main className="flex-1">
        {/* NEW: Trial Offer Hero Section */}
        <TrialOfferHero onStartTrial={handleStartTrial} />

        <section className="py-15 md:py-25 bg-secondary border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">El Potencial de tu negocio</h2>
              <p className="text-muted-foreground">Proyecciones basadas en estudios de mercado y datos reales</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AnimatedStat value="380" label="Clientes potenciales" suffix="K+" />
              <AnimatedStat value="85" label="Tasa de retención esperada" suffix="%" />
              <AnimatedStat value="3.5" label="ROI proyectado primer Año" suffix="x" />
              <AnimatedStat value="100" label="Cupos disponibles lanzamiento" suffix="" />
            </div>
          </div>
        </section>

        <section className="py-15 md:py-25 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DashboardShowcase />
          </div>
        </section>

        <section id="beneficios" className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Porque decenas de negocios ya se registraron
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Una plataforma completa para atraer clientes leales y aumentar tus ventas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Audiencia de alto valor</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Militares con ingresos estables, alta lealtad de marca y poder adquisitivo superior al promedio
                    nacional.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Métricas en tiempo real</h3>
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
                  <h3 className="font-semibold text-lg mb-2">Campañas inteligentes</h3>
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
                  <h3 className="font-semibold text-lg mb-2">Negocios físicos y en línea</h3>
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
                  <h3 className="font-semibold text-lg mb-2">Cero fraude</h3>
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
                  <h3 className="font-semibold text-lg mb-2">Soporte dedicado</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Recursos completos de ayuda, documentación detallada y soporte por email para optimizar tus
                    campañas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="planes" className="py-15 md:py-25 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Elige el plan perfecto para tu negocio
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
                    + {formatPriceSimple(pricing.regularPlans.gratis.perPromotion)} COP por promoción. IVA incluido
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">1 ubicación física u online</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Paga por cada promoción</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica básica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Acceso para 1 usuario</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte por email</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="https://app.heroescolombia.com" target="_blank">
                      Comenzar Gratis
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Básico Plan */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Básico</CardTitle>
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
                      <span className="text-sm">Hasta 3 promociones activas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica basica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Acceso para 2 usuarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte por email</span>
                    </li>
                  </ul>
                  <Button className="w-full" onClick={handleStartTrial}>
                    Comenzar con 7,140 COP
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
                      <span className="text-sm">Hasta 10 promociones activas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Segmentación de audiencia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica avanzada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Acceso para 5 usuarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte prioritario</span>
                    </li>
                  </ul>
                  <Button className="w-full shadow-lg" onClick={handleStartTrial}>
                    Comenzar con 7,140 COP
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
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
                      <span className="text-sm">Negocio destacado en la App</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Promociones destacadas en la App</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Segmentación de audiencia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica avanzada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Acceso para 10 usuarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte prioritario</span>
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

        <section className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Negocios listos para crecer</h2>
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

        <section className="py-15 md:py-25 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeedbackForm variant="business" />
          </div>
        </section>

        <section className="py-15 md:py-25 bg-gradient-to-br from-accent via-accent to-primary text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                Comienza a atraer clientes leales Hhoy
              </h2>
              <p className="text-lg text-primary-foreground/90 text-balance mb-8 leading-relaxed">
                Únete a los primeros 500 negocios y obtén visibilidad premium durante el lanzamiento. Solicita una demo
                personalizada sin compromiso o comienza gratis ahora mismo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto shadow-lg">
                  <Link href="/solicitar-demo">
                    <Calendar className="mr-2 h-5 w-5" />
                    Solicitar demo gratis
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="https://app.heroescolombia.com" target="_blank">
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
