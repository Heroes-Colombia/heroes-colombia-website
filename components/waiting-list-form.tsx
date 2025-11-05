"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PhoneInput, formatFullPhoneNumber } from "@/components/ui/phone-input"
import { Bell, Send, Shield, CheckCircle2 } from "lucide-react"

interface WaitingListFormProps {
  variant?: "hero" | "section"
}

export function WaitingListForm({ variant = "section" }: WaitingListFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countryCode, setCountryCode] = useState("+57") // Default to Colombia
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    militaryBranch: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      alert("Por favor acepta recibir las notificaciones")
      return
    }

    setIsSubmitting(true)

    try {
      // Combine country code with phone number
      const fullPhoneNumber = formatFullPhoneNumber(countryCode, formData.phone)

      const response = await fetch("/api/waiting-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to join waiting list")
      }

      console.log("[WaitingList] User joined successfully:", { ...formData, phone: fullPhoneNumber })
      setSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          militaryBranch: "",
        })
        setCountryCode("+57")
        setCaptchaVerified(false)
      }, 5000)
    } catch (error) {
      console.error("[WaitingList] Error:", error)
      alert("Hubo un error al unirte a la lista de espera. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Hero variant (compact version for hero section)
  if (variant === "hero") {
    return (
      <div className="max-w-md mx-auto">
        {submitted ? (
          <div className="text-center py-6 bg-primary/10 rounded-2xl border-2 border-primary">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">¡Ya estás en la lista!</h3>
            <div className="text-left ml-2">
              <ul className="flex flex-col">
                <li>
                  ✅ Notificaciones exclusivas antes del lanzamiento
                </li>
                <li>
                  ✅ Acceso 24 horas antes del público general
                </li>
                <li>
                  ✅ Beneficios exclusivos de lanzamiento
                </li>
              </ul>
              <ol className="mt-3">
                <li>
                  1. Revisa tu correo (puede estar en spam)
                </li>
                <li>
                  2. Síguenos en instagram: <a className="text-primary hover:underline" href="https://www.instagram.com/heroescolombiaoficial/" target="blank">@heroescolombiaoficial</a>
                </li>
                <li>
                  3. Comparte con tus compañeros militares
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 bg-white/95 backdrop-blur p-6 rounded-2xl shadow-xl border">
            <div className="text-center mb-4">
              <Bell className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-bold text-lg">Únete a la lista de espera</h3>
              <p className="text-sm text-muted-foreground">Sé de los primeros en acceder a beneficios exclusivos.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="hero-firstName" className="text-xs">Nombre*</Label>
                <Input
                  id="hero-firstName"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hero-lastName" className="text-xs">Apellido*</Label>
                <Input
                  id="hero-lastName"
                  placeholder="Gonzalez"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="h-9 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hero-email" className="flex-start text-xs">Email*</Label>
              <Input
                id="hero-email"
                type="email"
                placeholder="juan.gonzalez@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hero-phone" className="text-xs">Telefono(Whatsapp)*</Label>
              <PhoneInput
                id="hero-phone"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                countryCode={countryCode}
                onCountryCodeChange={setCountryCode}
                required
                size="sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hero-militaryBranch" className="text-xs">Fuerza pública a la que pertenece</Label>
              <Select
                value={formData.militaryBranch}
                onValueChange={(value) => setFormData({ ...formData, militaryBranch: value })}
                required
              >
                <SelectTrigger id="hero-militaryBranch" className="h-9 text-sm">
                  <SelectValue placeholder="Selecciona alguno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ejercito">Ejército Nacional</SelectItem>
                  <SelectItem value="armada">Armada Nacional</SelectItem>
                  <SelectItem value="fuerza-aerea">Fuerza Aeroespacial</SelectItem>
                  <SelectItem value="policia">Policía Nacional</SelectItem>
                  <SelectItem value="retirado">Personal Retirado</SelectItem>
                  <SelectItem value="familia">Familia Militar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
              <Checkbox
                id="hero-captcha"
                checked={captchaVerified}
                onCheckedChange={(checked) => setCaptchaVerified(checked as boolean)}
              />
              <div className="flex-1">
                <label
                  htmlFor="hero-captcha"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                >
                  Acepto recibir notificaciones sobre el lanzamiento
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!captchaVerified || isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Uniéndome..." : "Unirme a la lista de espera"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              🚀 Lanzamiento oficial: <strong>5 de Diciembre, 2025</strong>
            </p>
          </form>
        )}
      </div>
    )
  }

  // Section variant (full-featured form)
  return (
    <Card className="max-w-2xl mx-auto">
      {!submitted && (
        <CardHeader>
          <div className="text-center mb-4">
              <Bell className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-bold text-lg">Únete a la lista de espera</h3>
          </div>
          <CardDescription className="text-base">
            Sé de los primeros en acceder a beneficios exclusivos.
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>
        {submitted ? (
          <div className="text-center py-6 bg-primary/10 rounded-2xl border-2 border-primary">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">¡Ya estás en la lista!</h3>
            <div className="text-left ml-2">
              <ul className="flex flex-col">
                <li>
                  ✅ Notificaciones exclusivas antes del lanzamiento
                </li>
                <li>
                  ✅ Acceso 24 horas antes del público general
                </li>
                <li>
                  ✅ Beneficios exclusivos de lanzamiento
                </li>
              </ul>
              <ol className="mt-3">
                <li>
                  1. Revisa tu correo (puede estar en spam)
                </li>
                <li>
                  2. Síguenos en instagram: <a className="text-primary hover:underline" href="https://www.instagram.com/heroescolombiaoficial/" target="blank">@heroescolombiaoficial</a>
                </li>
                <li>
                  3. Comparte con tus compañeros militares
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre*</Label>
                <Input
                  id="firstName"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido*</Label>
                <Input
                  id="lastName"
                  placeholder="Gonzalez"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan.gonzalez@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono(Whatsapp)*</Label>
                <PhoneInput
                  id="phone"
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  countryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="militaryBranch">Fuerza pública a la que pertenece</Label>
                <Select
                  value={formData.militaryBranch}
                  onValueChange={(value) => setFormData({ ...formData, militaryBranch: value })}
                  required
                >
                  <SelectTrigger id="militaryBranch">
                    <SelectValue placeholder="Selecciona alguno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ejercito">Ejército Nacional</SelectItem>
                    <SelectItem value="armada">Armada Nacional</SelectItem>
                    <SelectItem value="fuerza-aerea">Fuerza Aeroespacial</SelectItem>
                    <SelectItem value="policia">Policía Nacional</SelectItem>
                    <SelectItem value="retirado">Personal Retirado</SelectItem>
                    <SelectItem value="familia">Familia Militar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  Acepto recibir notificaciones sobre el lanzamiento
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!captchaVerified || isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Uniéndome..." : "Unirme a la lista de espera"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              🚀 Lanzamiento oficial: <strong>5 de Diciembre, 2025</strong>
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
