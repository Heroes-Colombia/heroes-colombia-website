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
} from "lucide-react"
import Link from "next/link"

// Dashboard URL for redirecting to registration
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.heroescolombia.com"

export default function BusinessPage() {

  /**
   * NEW FLOW: Redirect to dashboard registration page
   * User registers FIRST, then pays trial after registration
   */
  const handleStartTrial = () => {
    window.location.href = `${DASHBOARD_URL}/register`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />
      <UrgencyBanner variant="business" />

      <main className="flex-1">
        {/* NEW: Trial Offer Hero Section */}
        <TrialOfferHero onStartTrial={handleStartTrial} />

        {/* Pain Points Section - Make businesses aware of their problems */}
        <section id="problemas" className="py-15 md:py-25">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Target className="h-4 w-4" />
                ¿Te identificas con alguno de estos problemas?
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Conseguir clientes nuevos es cada vez más difícil y costoso
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-3xl mx-auto">
                Miles de negocios luchan diariamente con estos desafíos. Si alguno te suena familiar, no estás solo — y hay una solución.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-2 border-destructive/20 bg-destructive/5 hover:border-destructive/40 transition-colors">
                <CardContent className="pt-3">
                  <div className="rounded-full bg-destructive/10 w-12 h-12 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-destructive">
                    ¿Gastas dinero en publicidad sin ver resultados claros?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Inviertes en Facebook Ads, Google Ads o volantes, pero no sabes exactamente cuántos clientes nuevos llegaron por cada peso invertido. El dinero se va y los resultados no se ven.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-destructive/20 bg-destructive/5 hover:border-destructive/40 transition-colors">
                <CardContent className="pt-3">
                  <div className="rounded-full bg-destructive/10 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-destructive">
                    ¿Pagas a alguien para manejar anuncios que no entiendes?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Contratas agencias o freelancers que te muestran métricas confusas. No sabes si realmente funciona o si estás tirando el dinero a la basura cada mes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-destructive/20 bg-destructive/5 hover:border-destructive/40 transition-colors">
                <CardContent className="pt-3">
                  <div className="rounded-full bg-destructive/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-destructive">
                    ¿Compites contra grandes marcas con presupuestos enormes?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Las grandes empresas dominan la publicidad digital. Tu negocio local queda invisible entre miles de anuncios de marcas con millones de pesos en presupuesto.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-destructive/20 bg-destructive/5 hover:border-destructive/40 transition-colors">
                <CardContent className="pt-3">
                  <div className="rounded-full bg-destructive/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-destructive">
                    ¿No tienes tiempo ni conocimiento para marketing digital?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tu día está lleno manejando el negocio. Aprender marketing digital, crear contenido y analizar datos es otro trabajo completo que no puedes asumir.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-medium">
                <CheckCircle2 className="h-5 w-5" />
                Heroes Colombia resuelve todos estos problemas con una solución simple
              </div>
            </div>
          </div>
        </section>

        <section className="py-15 md:py-25 bg-secondary border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Resultados Reales de la Plataforma</h2>
              <p className="text-muted-foreground">Datos verificados desde el lanzamiento del 6 de diciembre de 2025</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AnimatedStat value="50+" label="Negocios activos" suffix="+" />
              <AnimatedStat value="1,000+" label="Vistas de promociones" suffix="+" />
              <AnimatedStat value="1,800+" label="Usuarios verificados" suffix="+" />
              <AnimatedStat value="20+" label="Ahorro promedio usuarios" suffix="%" />
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
                50+ negocios activos confían en nuestra plataforma
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

        {/* Pricing CTA Section */}
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

        <section className="py-10 md:py-15 bg-accent/5 border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Target className="h-4 w-4" />
                Ventaja de ser Socio Fundador
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Únete ahora y obtén ventajas exclusivas
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Los primeros 100 negocios en unirse obtienen beneficios únicos mientras la plataforma crece
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Menor competencia</h3>
                  <p className="text-sm text-muted-foreground">
                    Destaca entre pocos negocios por la atención de 1,800+ usuarios verificados y creciendo semanalmente
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Reconocimiento temprano</h3>
                  <p className="text-sm text-muted-foreground">
                    Construye reconocimiento de marca desde el día 1 con la comunidad militar
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Crece con la plataforma</h3>
                  <p className="text-sm text-muted-foreground">
                    Posiciónate ahora para cuando la plataforma escale a miles de usuarios militares
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Feedback directo</h3>
                  <p className="text-sm text-muted-foreground">
                    Influye en el desarrollo del producto con feedback directo al equipo
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Visibilidad preferencial</h3>
                  <p className="text-sm text-muted-foreground">
                    Primeros 100 socios obtienen destacados especiales en la app conforme crece
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Audiencia de calidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Militares con ingresos estables y alta lealtad de marca desde el inicio
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">50+ negocios</span> ya están posicionados. Quedan <span className="font-semibold text-primary">50 cupos</span> para beneficios de fundadores.
              </p>
            </div>
          </div>
        </section>

        <section className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Negocios reales que ya están usando Heroes</h2>
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
                    <div className="font-semibold text-sm">Hogar</div>
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
                    <div className="font-semibold text-sm">Hogar</div>
                    <div className="text-xs text-muted-foreground">Medellín</div>
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
                Únete a los 50+ negocios activos generando 1,000+ vistas de promociones. Primeros 100 nuevos socios obtienen visibilidad preferencial en la plataforma.
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
                50+ negocios activos • 1,000+ vistas de promociones • 1,600+ usuarios verificados
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
