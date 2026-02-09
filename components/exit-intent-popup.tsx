"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Smartphone, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

interface ExitIntentPopupProps {
  page: "user" | "business"
}

export function ExitIntentPopup({ page = "user" }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const storageKey = `exitPopupShown_${page}`
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem(storageKey)
    if (shown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem(storageKey, "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [hasShown, page])

  if (page === "business") {
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
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">¿Tienes dudas sobre nuestros planes?</DialogTitle>
            <DialogDescription className="text-center">
              Sabemos que elegir el plan perfecto para tu empresa es importante. Nuestro equipo está listo para ayudarte a encontrar la solución ideal para tus necesidades.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="tel:+573115157814"
                className="transition-transform hover:scale-105 w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="font-semibold">Llámanos</span>
                </div>
              </Link>
              <Link
                href="https://wa.me/573115157814?text=Hola%2C%20me%20interesa%20conocer%20más%20sobre%20los%20planes%20para%20empresas"
                target="_blank"
                className="transition-transform hover:scale-105 w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-xl hover:bg-[#22c55e] transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="font-semibold">WhatsApp</span>
                </div>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
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
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">¡Espera! No te Vayas sin Descargar Nuestra App</DialogTitle>
          <DialogDescription className="text-center">
            Descarga la app y obtén descuentos de hasta el 50% en tu próxima compra de las marcas aliadas.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">

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

          <p className="text-xs text-center text-muted-foreground pt-2">
            Únete a más de 1,700 personas que ya disfrutan de Heroes Colombia
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
