"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, Send, Shield } from "lucide-react"

interface FeedbackFormProps {
  variant: "user" | "business"
}

export function FeedbackForm({ variant }: FeedbackFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      alert("Por favor verifica que no eres un robot")
      return
    }

    console.log("[v0] Feedback submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const title = variant === "user" ? "Tu Opinión Importa" : "Propón una Alianza"
  const description =
    variant === "user"
      ? "Cuéntanos qué funcionalidades te gustaría ver o qué problemas enfrentas. Tu feedback nos ayuda a mejorar."
      : "¿Tienes una propuesta de negocio o preguntas sobre cómo colaborar? Estamos aquí para escucharte."

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-center py-8">
            <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">¡Gracias por tu feedback!</h3>
            <p className="text-muted-foreground">Revisaremos tu mensaje y te contactaremos pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                {variant === "user" ? "Tu sugerencia o problema" : "Tu propuesta o pregunta"}
              </Label>
              <Textarea
                id="message"
                placeholder={
                  variant === "user" ? "Me gustaría que la app tuviera..." : "Estoy interesado en colaborar con..."
                }
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
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
                <p className="text-xs text-muted-foreground mt-1">Verifica que eres humano para proteger contra spam</p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!captchaVerified}>
              <Send className="mr-2 h-4 w-4" />
              Enviar Mensaje
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
