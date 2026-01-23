"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TrialSignupModal, type TrialSignupData } from "@/components/trial-signup-modal"
import { FAQSection } from "@/components/faq-section"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentPricing, formatPriceSimple, formatPrice } from "@/lib/pricing-config"
import { CheckCircle2, Play } from "lucide-react"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import Link from "next/link"
import { useState } from "react"

export default function PreciosPage() {
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
      window.location.href = result.checkoutUrl
    } catch (error) {
      console.error("[Trial] Error:", error)
      throw error
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />
      <UrgencyBanner variant="business" />
      <TrialSignupModal open={showSignupModal} onOpenChange={setShowSignupModal} onSubmit={handleSignupSubmit} />
      <ExitIntentPopup page="business" />

      <main className="flex-1">
        {/* Video Hero Section */}
        <section className="py-10 md:py-20 bg-gradient-to-br from-secondary via-background to-secondary">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Conoce nuestros precios y planes
              </h1>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Nuestro director te explica todo lo que incluye cada plan y cómo tu negocio puede crecer con Heroes Colombia
              </p>
            </div>

            {/* YouTube Video with Prominent Rounded Corners */}
            <div className="relative mx-auto max-w-4xl">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-black">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/wo2j72MSskc"
                    title="Precios y Planes de Heroes Colombia"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Play className="h-4 w-4 text-primary" />
                Una invitación personal para que tu negocio sea parte de Heroes Colombia
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="planes" className="py-10 md:py-20 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Elige el plan perfecto para tu negocio
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Resultados claros, precios transparentes y sin sorpresas.
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                      <span className="text-sm">1 ubicación física u online</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 2 promociones activas</span>
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
                  <Button className="w-full" onClick={handleStartTrial}>
                    Comenzar por solo {formatPrice(pricing.trialOffer?.price || 0)}
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
                      <span className="text-sm">Hasta 5 ubicaciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 5 promociones activas</span>
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
                      <span className="text-sm">Acceso para 3 usuarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte prioritario</span>
                    </li>
                  </ul>
                  <Button className="w-full shadow-lg" onClick={handleStartTrial}>
                    Comenzar por solo {formatPrice(pricing.trialOffer?.price || 0)}
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
                      <span className="text-sm">Soporte personalizado por email o WhatsApp</span>
                    </li>
                  </ul>
                  {pricing.id == 'post-launch' ? (
                    <Button className="w-full bg-transparent" variant="outline" asChild>
                      <Link href="/solicitar-demo">Contactar Ventas</Link>
                    </Button>
                  ) : (
                    <Button className="w-full shadow-lg" onClick={handleStartTrial}>
                      Comenzar por solo {formatPrice(pricing.trialOffer?.price || 0)}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-10 md:py-20 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection variant="business" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
