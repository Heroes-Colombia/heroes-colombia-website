"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PaymentPendingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container max-w-2xl text-center px-4 sm:px-6 lg:px-8">
          <div className="rounded-full bg-yellow-500/10 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Clock className="h-10 w-10 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Pago Pendiente</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Tu pago está siendo procesado. Te notificaremos por email cuando se confirme. Esto puede tomar algunos
            minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/negocios">
                Volver a Inicio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/solicitar-demo">Contactar Soporte</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
