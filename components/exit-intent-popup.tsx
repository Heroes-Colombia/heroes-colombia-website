"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Gift, X } from "lucide-react"

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem("exitPopupShown")
    if (shown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem("exitPopupShown", "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [hasShown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      alert("Por favor acepta recibir las notificaciones del lanzamiento")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/waiting-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al registrar tus datos")
      }

      console.log("Early access registration successful:", email)
      setIsOpen(false)
    } catch (error) {
      console.error("[v0] Error submitting to systeme.io:", error)
      alert("Hubo un error al registrar tu email. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </button>
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">¡Espera! No te Vayas sin conocer de nuestro lanzamiento</DialogTitle>
          <DialogDescription className="text-center">
            Regístrate ahora y obtén acceso exclusivo a beneficios de lanzamiento el 1 de diciembre
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exit-name">Nombre*</Label>
            <Input
              id="exit-name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exit-email">Correo Electrónico*</Label>
            <Input
              id="exit-email"
              type="email"
              placeholder="nombre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exit-email">Teléfono(Whatsapp)*</Label>
            <Input
              id="exit-phone"
              type="phone"
              placeholder="+57 300 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                <p className="text-xs text-muted-foreground">Acepto recibir notificaciones sobre el lanzamiento</p>
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrarme - Accesso lanzamiento"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Únete a más de 500 personas que ya se registraron
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
