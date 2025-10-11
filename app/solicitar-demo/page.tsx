"use client"

import type React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQSection } from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, CheckCircle2, Building2, Users, TrendingUp, Shield } from "lucide-react"

export default function SolicitarDemoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    contactName: "",
    email: "",
    phone: "",
    monthlyRevenue: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      alert("Por favor verifica que no eres un robot")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          category: formData.category,
          monthlyRevenue: formData.monthlyRevenue,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit demo request")
      }

      console.log("[v0] Demo request submitted successfully:", formData)
      setSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting demo request:", error)
      alert("Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.")
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader variant="business" />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="container max-w-2xl text-center px-4 sm:px-6 lg:px-8">
            <div className="rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">¡Solicitud Recibida!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Gracias por tu interés en Héroes Colombia. Nuestro equipo revisará tu solicitud y te contactará en las
              próximas 24 horas para agendar tu demo personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/negocios">Volver a Negocios</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://app.heroescolombia.com" target="_blank" rel="noreferrer">
                  Explorar Dashboard
                </a>
              </Button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />

      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Calendar className="h-4 w-4" />
              Demo Personalizada
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Solicita Tu Demo</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cómo Héroes Colombia puede ayudarte a atraer más clientes y aumentar tus ventas. Agenda una demo
              personalizada con nuestro equipo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Análisis Personalizado</h3>
                <p className="text-sm text-muted-foreground">Evaluamos tu negocio y te mostramos el potencial de ROI</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Tour Completo</h3>
                <p className="text-sm text-muted-foreground">Conoce todas las funcionalidades del dashboard y la app</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Estrategia de Crecimiento</h3>
                <p className="text-sm text-muted-foreground">Te ayudamos a crear tu primera campaña exitosa</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información de Tu Negocio</CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo para agendar la demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nombre del Negocio *</Label>
                    <Input
                      id="businessName"
                      placeholder="Ej: Restaurante El Buen Sabor"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurantes">Restaurantes</SelectItem>
                        <SelectItem value="hoteles">Hoteles</SelectItem>
                        <SelectItem value="deportes">Deportes</SelectItem>
                        <SelectItem value="educacion">Educación</SelectItem>
                        <SelectItem value="salud">Salud</SelectItem>
                        <SelectItem value="belleza">Belleza</SelectItem>
                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                        <SelectItem value="vehiculos">Vehículos</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nombre de Contacto *</Label>
                    <Input
                      id="contactName"
                      placeholder="Tu nombre completo"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@negocio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+57 300 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyRevenue">Ingresos Mensuales Aprox.</Label>
                    <Select
                      value={formData.monthlyRevenue}
                      onValueChange={(value) => setFormData({ ...formData, monthlyRevenue: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rango" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-5m">Menos de $5M COP</SelectItem>
                        <SelectItem value="5-20m">$5M - $20M COP</SelectItem>
                        <SelectItem value="20-50m">$20M - $50M COP</SelectItem>
                        <SelectItem value="50m+">Más de $50M COP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje Adicional (Opcional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos más sobre tu negocio y qué te gustaría lograr con Héroes Colombia..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
                  <Checkbox
                    id="captcha"
                    checked={captchaVerified}
                    onCheckedChange={(checked) => setCaptchaVerified(checked as boolean)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="captcha"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4 text-primary" />
                      No soy un robot
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Verifica que eres humano para proteger contra spam
                    </p>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={!captchaVerified || isSubmitting}>
                  <Calendar className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Enviando..." : "Solicitar Demo Personalizada"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Al enviar este formulario, aceptas que nos pongamos en contacto contigo para agendar la demo.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="mt-16">
            <FAQSection variant="business" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
