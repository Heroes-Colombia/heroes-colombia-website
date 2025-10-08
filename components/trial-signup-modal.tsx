"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles } from "lucide-react"
import { getCurrentPricing, formatPriceSimple } from "@/lib/pricing-config"

interface TrialSignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: TrialSignupData) => Promise<void>
}

export interface TrialSignupData {
  email: string
  businessName: string
  phone?: string
}

export function TrialSignupModal({ open, onOpenChange, onSubmit }: TrialSignupModalProps) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof TrialSignupData, string>>>({})
  const pricing = getCurrentPricing()

  const [formData, setFormData] = useState<TrialSignupData>({
    email: "",
    businessName: "",
    phone: "",
  })

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TrialSignupData, string>> = {}

    if (!formData.email) {
      newErrors.email = "El correo es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Correo inválido"
    }

    if (!formData.businessName) {
      newErrors.businessName = "El nombre del negocio es requerido"
    } else if (formData.businessName.length < 3) {
      newErrors.businessName = "Mínimo 3 caracteres"
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Debe ser un número válido de 10 dígitos"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSubmit(formData)
      // Modal will close and redirect will happen in parent
    } catch (error) {
      console.error("Trial signup error:", error)
      setErrors({ email: "Ocurrió un error. Por favor intenta de nuevo." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl">¡Asegura tu Espacio!</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Solo faltan unos datos para comenzar tu prueba de{" "}
            <span className="font-bold text-primary">
              {formatPriceSimple(pricing.trialOffer?.price || 0)} COP
            </span>{" "}
            con acceso Enterprise completo hasta el 1 de febrero de 2026.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Correo Electrónico <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="negocio@ejemplo.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                setErrors({ ...errors, email: undefined })
              }}
              disabled={loading}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessName">
              Nombre del Negocio <span className="text-destructive">*</span>
            </Label>
            <Input
              id="businessName"
              type="text"
              placeholder="Mi Negocio Increíble"
              value={formData.businessName}
              onChange={(e) => {
                setFormData({ ...formData, businessName: e.target.value })
                setErrors({ ...errors, businessName: undefined })
              }}
              disabled={loading}
              className={errors.businessName ? "border-destructive" : ""}
            />
            {errors.businessName && <p className="text-sm text-destructive">{errors.businessName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono (Opcional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="3001234567"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value })
                setErrors({ ...errors, phone: undefined })
              }}
              disabled={loading}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pago único:</span>
              <span className="text-lg font-bold">{formatPriceSimple(pricing.trialOffer?.price || 0)} COP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Acceso hasta:</span>
              <span className="text-sm font-medium">1 de Febrero, 2026</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan incluido:</span>
              <span className="text-sm font-bold text-primary">Enterprise Completo</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-primary to-orange-500">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>Continuar al Pago</>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <a href="/terminos" className="underline hover:text-primary" target="_blank">
              Términos y Condiciones
            </a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
