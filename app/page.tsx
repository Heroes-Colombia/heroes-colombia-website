"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CategoriesCarousel } from "@/components/categories-carousel"
import { TrustedCompaniesCarousel } from "@/components/trusted-companies-carousel"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { AnimatedStat } from "@/components/animated-stats"
import { FeedbackForm } from "@/components/feedback-form"
import { WaitingListForm } from "@/components/waiting-list-form"
import { AppShowcase } from "@/components/app-showcase"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { AppDownloadBanner } from "@/components/app-download-banner"
import { TrustBadges } from "@/components/trust-badges"
import { ScarcityBanner } from "@/components/scarcity-banner"
import { FAQSection } from "@/components/faq-section"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Smartphone, MapPin, Gift, BadgeCheck, Calendar, Sparkles, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { isAppLaunched } from "@/lib/pricing-config"

function getMonthsSinceLaunch(): number {
  const launch = new Date("2025-12-06")
  const now = new Date()
  return Math.max(1, (now.getFullYear() - launch.getFullYear()) * 12 + (now.getMonth() - launch.getMonth()))
}

export default function HomePage() {
  const appLaunched = isAppLaunched()
  const monthsSinceLaunch = getMonthsSinceLaunch()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="user" />
      <AppDownloadBanner />
      <ExitIntentPopup page="user" />

      <main className="flex-1">
        <ScarcityBanner variant="user" />

        {/* Hero Section */}
        <section className="relative overflow-hidden py-10 md:py-15">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <TrendingUp className="h-4 w-4" />
                4,100+ Héroes ya activos · Creciendo cada semana
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
                Beneficios exclusivos para nuestros <span className="text-primary">Héroes</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
                Porque tu servicio merece reconocimiento. Accede a descuentos exclusivos en negocios
                verificados, diseñados especialmente para ti y tu familia.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Link
                  href="https://apps.apple.com/au/app/h%C3%A9roes-colombia/id6743999048"
                  target="_blank"
                  className="transition-transform hover:scale-105"
                >
                  <div className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-black/90 transition-colors">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Descárgalo en</div>
                      <div className="text-lg font-semibold -mt-1">App Store</div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.heroes.heroes_app&pcampaignid=web_share"
                  target="_blank"
                  className="transition-transform hover:scale-105"
                >
                  <div className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-black/90 transition-colors">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Disponible en</div>
                      <div className="text-lg font-semibold -mt-1">Google Play</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Descarga gratis · Sin compromisos · Solo beneficios
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <span>50+ marcas aliadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>4,100+ Héroes ahorrando</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>100% verificado y seguro</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                Más de 4,100 miembros de las fuerzas armadas ya descargaron la app. Únete a la comunidad exclusiva de Héroes 🇨🇴
              </p>
            </div>
          </div>
        </section>

        {/* Growth Stats */}
        <section className="py-15 md:py-15 bg-secondary border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Una comunidad que crece semana a semana</h2>
              <p className="text-muted-foreground">Datos verificados · Activos desde diciembre 2025</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AnimatedStat value="4100" label="Héroes activos" suffix="+" />
              <AnimatedStat value="50" label="Negocios aliados" suffix="+" />
              <AnimatedStat value="20" label="Ahorro promedio real" suffix="%" />
              <AnimatedStat value="100" label="Verificación garantizada" suffix="%" />
            </div>
          </div>
        </section>

        <TrustBadges />

        {/* Growth Story Section — replaces the redundant "El Comienzo" section */}
        <section className="py-10 md:py-15 bg-accent/5 border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="h-4 w-4" />
                {monthsSinceLaunch} meses de crecimiento real
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                De 0 a 4,100 Héroes en {monthsSinceLaunch} meses
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lanzamos en diciembre 2025 y hoy somos la plataforma de beneficios exclusivos más grande
                para las fuerzas armadas de Colombia. Esto es lo que hemos construido juntos.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center bg-card rounded-2xl p-6 border border-border">
                <div className="text-4xl font-bold text-primary mb-1">Dic</div>
                <div className="text-sm font-medium mb-1">2025</div>
                <div className="text-xs text-muted-foreground">Lanzamiento oficial</div>
              </div>
              <div className="text-center bg-card rounded-2xl p-6 border border-border">
                <div className="text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm font-medium mb-1">Héroes</div>
                <div className="text-xs text-muted-foreground">Primer mes</div>
              </div>
              <div className="text-center bg-card rounded-2xl p-6 border border-border">
                <div className="text-4xl font-bold text-primary mb-1">1,500+</div>
                <div className="text-sm font-medium mb-1">Héroes</div>
                <div className="text-xs text-muted-foreground">A los 2 meses</div>
              </div>
              <div className="text-center bg-card rounded-2xl p-6 border border-primary/30 bg-primary/5">
                <div className="text-4xl font-bold text-primary mb-1">4,100+</div>
                <div className="text-sm font-medium mb-1">Héroes</div>
                <div className="text-xs text-muted-foreground">Hoy · Creciendo</div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Companies */}
        <section className="py-15 md:py-25 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Empresas que ya confían en nosotros
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Negocios ya te están esperando con descuentos reales
              </p>
            </div>
            <TrustedCompaniesCarousel />
          </div>
        </section>

        <section className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AppShowcase />
          </div>
        </section>

        <section className="py-15 md:py-25 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Calendar className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                Celebramos cada fecha especial contigo
              </h2>
              <p className="text-lg text-primary-foreground/90 text-balance mb-8 leading-relaxed">
                En Héroes Colombia reconocemos y celebramos las fechas más importantes para la comunidad militar.
                Promociones especiales en el Día del Ejército, Día de la Armada, Día de la Fuerza Aeroespacial, Día de
                la Policía, Día de la Independencia, y todas las fechas que honran tu servicio y el de tu familia.
              </p>
              <div className="grid md:grid-cols-6 gap-4 mt-12">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-3xl font-bold mb-2">20 Jul</div>
                  <div className="text-sm">Día de la Independencia</div>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-3xl font-bold mb-2">24 Jul</div>
                  <div className="text-sm">Día de la Armada Nacional</div>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-3xl font-bold mb-2">7 Ago</div>
                  <div className="text-sm">Batalla de Boyacá</div>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-3xl font-bold mb-2">7 Ago</div>
                  <div className="text-sm">Día del Ejército</div>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-3xl font-bold mb-2">5 Nov</div>
                  <div className="text-sm">Día de la Policía</div>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-3xl font-bold mb-2">8 Nov</div>
                  <div className="text-sm">Día de la Fuerza Aeroespacial</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Heroes Colombia — replaces the stale "Founders" section */}
        <section id="beneficios" className="py-15 md:py-25 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Por qué los Héroes confían en nosotros
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Una plataforma construida desde el respeto, verificada desde la confianza
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">100% seguro y verificado</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tu identidad militar está protegida con verificación de dos pasos y encriptación de datos de nivel
                    bancario.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Negocios físicos y en línea</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Descuentos en tiendas locales y e-commerce. Compra en línea o visita negocios cercanos con tu mapa
                    interactivo.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Descuentos reales, no simbólicos</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ahorra en restaurantes, tiendas, servicios y más. Descuentos que realmente impactan tu
                    presupuesto.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Redime en segundos</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sin complicaciones. Muestra tu carnet militar, el negocio lo verifica y listo. Así de simple.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Comienza a ahorrar en 3 pasos</h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Tan fácil que lo harás en menos de 5 minutos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="rounded-full bg-primary text-primary-foreground w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  1
                </div>
                <h3 className="font-semibold text-xl mb-3">Descarga y regístrate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Descarga la app gratis y regístrate de forma segura.
                </p>
              </div>

              <div className="text-center">
                <div className="rounded-full bg-primary text-primary-foreground w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  2
                </div>
                <h3 className="font-semibold text-xl mb-3">Explora y guarda</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Navega por categorías, busca negocios cercanos y guarda tus favoritos para usarlos después.
                </p>
              </div>

              <div className="text-center">
                <div className="rounded-full bg-primary text-primary-foreground w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  3
                </div>
                <h3 className="font-semibold text-xl mb-3">Muestra y ahorra</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Presenta tu carnet militar en el negocio y disfruta de tu descuento exclusivo al instante.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-15 md:py-25 bg-background border-y">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Explora categorías</h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Descuentos verificados en Salud y Bienestar, Tecnología, Educación y Belleza. Encuentra descuentos en todo lo que necesitas.
              </p>
            </div>
            <CategoriesCarousel />
          </div>
        </section>

        <section id="testimonios" className="py-15 md:py-25 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Esto dicen nuestros Héroes</h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Testimonios reales de personas que ya descargaron nuestra app
              </p>
            </div>

            <TestimonialsCarousel />
          </div>
        </section>

        {appLaunched && (
          <section className="py-15 md:py-25 bg-background">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FeedbackForm variant="user" />
            </div>
          </section>
        )}

        <section className="py-15 md:py-32 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="descargar" className="max-w-3xl mx-auto text-center">
              <BadgeCheck className="h-16 w-16 mx-auto mb-6 animate-float" />
              {appLaunched ? (
                <>
                  <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                    Descarga la App y comienza a ahorrar hoy
                  </h2>
                  <p className="text-lg text-primary-foreground/90 text-balance mb-8 leading-relaxed">
                    Totalmente GRATIS. Únete a los 4,100+ miembros de las fuerzas armadas que ya disfrutan de
                    descuentos exclusivos en marcas aliadas en todo Colombia.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <Link
                      href="https://apps.apple.com/au/app/h%C3%A9roes-colombia/id6743999048"
                      target="_blank"
                      className="transition-transform hover:scale-105"
                    >
                      <div className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        <div className="text-left">
                          <div className="text-xs">Descárgalo en</div>
                          <div className="text-lg font-semibold -mt-1">App Store</div>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.heroes.heroes_app&pcampaignid=web_share"
                      target="_blank"
                      className="transition-transform hover:scale-105"
                    >
                      <div className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        <div className="text-left">
                          <div className="text-xs">Disponible en</div>
                          <div className="text-lg font-semibold -mt-1">Google Play</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <p className="text-sm text-primary-foreground/80">
                    4,100+ miembros de las fuerzas armadas ya están ahorrando · Descarga 100% gratuita
                  </p>
                </>
              ) : (
                <>
                  <div className="max-w-xl mx-auto">
                    <WaitingListForm variant="section" />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        <section id="faq" className="py-10 md:py-25 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-10">
            <FAQSection variant="user" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
