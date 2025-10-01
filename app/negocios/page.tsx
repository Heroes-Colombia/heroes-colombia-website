"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CountdownTimer } from "@/components/countdown-timer"
import { AnimatedStat } from "@/components/animated-stats"
import { FeedbackForm } from "@/components/feedback-form"
import { DashboardShowcase } from "@/components/dashboard-showcase"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { TrustBadges } from "@/components/trust-badges"
import { ScarcityBanner } from "@/components/scarcity-banner"
import { UrgencyBanner } from "@/components/urgency-banner"
import { GuaranteeBadge } from "@/components/guarantee-badge"
import { Button } from "@/components/ui/button"
import { FAQSection } from "@/components/faq-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { createMercadoPagoCheckout } from "@/lib/mercadopago"
import { useState } from "react"

export default function BusinessPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = async (planType: "basico" | "pro", billingPeriod: "monthly" | "annual") => {
    setIsProcessing(true)
    try {
      const prices = {
        basico: { monthly: 60000, annual: 650000 },
        pro: { monthly: 230000, annual: 2500000 },
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
      <ExitIntentPopup />

      <main className="flex-1">
        <ScarcityBanner variant="business" />
        <UrgencyBanner variant="business" />

        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
          <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent animate-pulse">
                <TrendingUp className="h-4 w-4" />
                Lanzamiento Diciembre 2025
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
                Aumenta Tus Ventas Hasta 3.5x con <span className="text-primary">Héroes Colombia</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
                Accede a 380,000 clientes leales con alto poder adquisitivo. Negocios físicos y en línea pueden aumentar
                sus ventas hasta 250% al ofrecer beneficios exclusivos a militares.
              </p>

              <div className="mb-10">
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  Faltan solo días para conectar con miles de clientes nuevos
                </p>
                <CountdownTimer />
              </div>

              <div id="comenzar" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Button size="lg" asChild className="w-full sm:w-auto shadow-lg">
                  <Link href="/solicitar-demo">
                    <Calendar className="mr-2 h-5 w-5" />
                    Solicitar Demo Gratis
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                  <Link href="https://v0-heroes-colombia-dashboard.vercel.app/" target="_blank">
                    Ver Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col items-center gap-4 mb-6">
                <GuaranteeBadge />
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  Primeros 2 meses GRATIS para socios de lanzamiento
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Plan gratuito disponible</span>
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
            </div>
          </div>
        </section>

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
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">+ $10,000 por promoción publicada</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">1 ubicación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">1 promoción activa (30 días)</span>
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
                  <div className="mt-4">
                    {!isAnnual ? (
                      <>
                        <span className="text-4xl font-bold">$60,000</span>
                        <span className="text-muted-foreground">/mes</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">$650,000</span>
                        <span className="text-muted-foreground">/año</span>
                        <div className="text-sm text-primary font-medium mt-1">Ahorra $70,000</div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Para negocios en crecimiento</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">1 ubicación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 3 promociones/mes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica completa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Perfil estándar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte por email</span>
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
                  <div className="mt-4">
                    {!isAnnual ? (
                      <>
                        <span className="text-4xl font-bold">$230,000</span>
                        <span className="text-muted-foreground">/mes</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">$2,500,000</span>
                        <span className="text-muted-foreground">/año</span>
                        <div className="text-sm text-primary font-medium mt-1">Ahorra $260,000</div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Máximo crecimiento y visibilidad</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 5 ubicaciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Promociones ilimitadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Analítica avanzada + demografía</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Sección destacada en app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Equipo (dueño, gerente, staff)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte email + chat</span>
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
                  <div className="mt-4">
                    <div>
                      <span className="text-3xl font-bold">Desde $700,000</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Precio personalizado</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Para cadenas y franquicias</p>
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
