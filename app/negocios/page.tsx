"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TrialOfferHero } from "@/components/trial-offer-hero"
import { AnimatedStat } from "@/components/animated-stats"
import { FeedbackForm } from "@/components/feedback-form"
import { DashboardShowcase } from "@/components/dashboard-showcase"
import { TrustBadges } from "@/components/trust-badges"
import { Button } from "@/components/ui/button"
import { FAQSection } from "@/components/faq-section"
import { TrustedCompaniesCarousel } from "@/components/trusted-companies-carousel"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Card, CardContent } from "@/components/ui/card"
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
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.heroescolombia.com"

function getMonthsSinceLaunch(): number {
  const launch = new Date("2025-12-06")
  const now = new Date()
  return Math.max(1, (now.getFullYear() - launch.getFullYear()) * 12 + (now.getMonth() - launch.getMonth()))
}

export default function BusinessPage() {
  const monthsSinceLaunch = getMonthsSinceLaunch()

  const handleStartTrial = () => {
    window.location.href = `${DASHBOARD_URL}/register`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />
      <UrgencyBanner variant="business" />

      <main className="flex-1">
        <TrialOfferHero onStartTrial={handleStartTrial} />

        {/* Market Context Section — replaces aggressive red pain-points */}
        <section id="problemas" className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Lightbulb className="h-4 w-4" />
                ¿Te suena familiar?
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                ¿Tu negocio enfrenta alguno de estos retos?
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-3xl mx-auto">
                Las reglas del marketing digital cambiaron. Aquí está la realidad que enfrentan miles de negocios en Colombia.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">La publicidad digital cuesta cada vez más</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    El costo por clic en Facebook e Google Ads aumentó un 61% en los últimos 3 años. Más inversión, menos retorno garantizado.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Las métricas son confusas, los resultados poco claros</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Impresiones, alcance, CTR... pero ¿cuántos clientes reales llegaron? La brecha entre métricas y ventas es el problema central del marketing actual.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Los grandes presupuestos dominan los canales masivos</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    En publicidad digital, el tamaño importa. Los negocios locales compiten con presupuestos de grandes cadenas que saturan los mismos canales.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">El marketing digital exige tiempo y conocimiento especializados</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Crear campañas efectivas, analizar datos y optimizar continuamente requiere un equipo dedicado que la mayoría de negocios no puede costear.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-medium">
                <CheckCircle2 className="h-5 w-5" />
                Heroes Colombia resuelve todo esto con un canal diferente: audiencia verificada, métricas claras, cero desperdicio
              </div>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="py-15 md:py-25 bg-background border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Una plataforma con tracción real</h2>
              <p className="text-muted-foreground">Datos verificados · Activos desde diciembre 2025</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AnimatedStat value="50" label="Negocios aliados" suffix="+" />
              <AnimatedStat value="2300" label="Usuarios verificados" suffix="+" />
              <AnimatedStat value="20" label="Ahorro promedio usuarios" suffix="%" />
              <AnimatedStat value={monthsSinceLaunch.toString()} label="Meses de crecimiento sostenido" suffix="" />
            </div>
          </div>
        </section>

        {/* Trusted Companies */}
        <section className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Empresas que ya confían en nosotros
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Negocios de distintas industrias que ya están apoyando a nuestros héroes de Colombia
              </p>
            </div>
            <TrustedCompaniesCarousel />
          </div>
        </section>

        <section className="py-15 md:py-25 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DashboardShowcase />
          </div>
        </section>

        {/* Platform Benefits */}
        <section id="beneficios" className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Un canal de adquisición diferente
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Accede a una audiencia verificada con ingresos estables y alta lealtad de marca
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
                    Portal web inteligente que te muestra exactamente qué funciona: vistas, canjes, ROI y más.
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

        {/* Pricing CTA */}
        <section id="planes" className="py-15 md:py-25 bg-background">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Planes flexibles para cada negocio
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto mb-8">
                Conoce nuestros precios y descubre qué plan es el ideal para ti. Nuestro director te explica todo en un video.
              </p>
              <Button size="lg" asChild className="shadow-lg">
                <Link href="/negocios/precios">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Ver precios y planes
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <TrustBadges />

        {/* Why Heroes Colombia — replaces the stale "Founders" section */}
        <section className="py-10 md:py-15 bg-accent/5 border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="h-4 w-4" />
                Por qué Heroes Colombia
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Una plataforma probada con resultados reales
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                En {monthsSinceLaunch} meses pasamos de cero a 4,100+ usuarios activos y 50+ negocios aliados. Aquí está lo que diferencia a Heroes Colombia de cualquier otro canal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Crecimiento sostenido</h3>
                  <p className="text-sm text-muted-foreground">
                    De 0 a 4,100+ usuarios verificados en {monthsSinceLaunch} meses. Una comunidad que crece semana a semana y que busca activamente los negocios de la plataforma.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Audiencia de nicho verificada</h3>
                  <p className="text-sm text-muted-foreground">
                    No es tráfico genérico. Son militares y sus familias con ingresos estables, verificados uno a uno. La calidad de la audiencia es la mayor ventaja competitiva.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">ROI medible desde el día uno</h3>
                  <p className="text-sm text-muted-foreground">
                    Cada canje registrado es un cliente real. Tu panel te muestra exactamente cuántas personas vieron tu oferta y cuántas actuaron, sin intermediarios.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Clientes con alta lealtad de marca</h3>
                  <p className="text-sm text-muted-foreground">
                    Los militares son conocidos por su lealtad. Un cliente que llega a través de Heroes Colombia tiende a volver y a recomendar.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Configuración en minutos</h3>
                  <p className="text-sm text-muted-foreground">
                    Sin agencias, sin curvas de aprendizaje. Registra tu negocio, crea tu oferta y empieza a recibir clientes. Nuestro equipo te acompaña en todo momento.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Plataforma de confianza</h3>
                  <p className="text-sm text-muted-foreground">
                    Las fuerzas armadas confían en Heroes Colombia para proteger a su comunidad. Esa confianza se extiende a cada negocio que forma parte de la plataforma.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-15 md:py-25 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Negocios reales, resultados reales</h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Socios activos compartiendo su experiencia con nuestra plataforma
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
                    "Heroes tiene mucho potencial, es un proyecto muy valioso el cual reconoce el valor a todos los militares de Colombia. A mí personalmente me gusta que es sectorizado y siempre había querido llegar a ese mercado que en ocasiones, es muy difícil de llegar."
                  </p>
                  <div>
                    <div className="font-semibold text-sm">Biker's Paradise</div>
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
                    "Nosotros ofrecemos créditos y productos especializados para policías, y no habíamos encontrado una empresa que solo se enfocara en ellos. Estamos felices de ser parte de Héroes y apoyar en todo el proceso desde el inicio."
                  </p>
                  <div>
                    <div className="font-semibold text-sm">Home Kids</div>
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
                    "El mercado de los militares es muy interesante y ya habíamos intentado llegar a ellos pero era muy difícil. Con Heroes podemos crear descuentos y promociones de nicho lo cual nos ayuda a incrementar nuestras ventas como empresa. Nos gusta mucho de Heroes el portal web, es fácil de usar y tienen tecnología bastante avanzada para las métricas."
                  </p>
                  <div>
                    <div className="font-semibold text-sm">KLAX S.A.S</div>
                    <div className="text-xs text-muted-foreground">Medellín</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeedbackForm variant="business" />
          </div>
        </section>

        <section className="py-15 md:py-25 bg-gradient-to-br from-accent via-accent to-primary text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                Comienza a atraer clientes leales hoy
              </h2>
              <p className="text-lg text-primary-foreground/90 text-balance mb-8 leading-relaxed">
                Únete a los 50+ negocios que ya están llegando a una comunidad de 4,100+ militares verificados. Una audiencia que crece cada semana y que busca activamente negocios como el tuyo.
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
                  <Link href="/negocios/precios">
                    Comenzar Ahora
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80">
                50+ negocios aliados · 4,100+ usuarios verificados · Creciendo semana a semana
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
