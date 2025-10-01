"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan")
  const period = searchParams.get("period")

  useEffect(() => {
    const sendToSystemeIO = async () => {
      try {
        // In a real implementation, you would get the customer email from Mercado Pago
        // For now, this is a placeholder
        console.log("[v0] Payment successful, would send to systeme.io with tags:", [
          `customer-${plan}`,
          `billing-${period}`,
        ])
      } catch (error) {
        console.error("[v0] Error sending to systeme.io:", error)
      }
    }

    sendToSystemeIO()
  }, [plan, period])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container max-w-2xl text-center px-4 sm:px-6 lg:px-8">
          <div className="rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">¡Pago Exitoso!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Tu suscripción al plan <span className="font-semibold capitalize">{plan}</span> ha sido activada. Ya puedes
            acceder al dashboard y comenzar a crear tus promociones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="https://v0-heroes-colombia-dashboard.vercel.app/" target="_blank">
                Ir al Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/negocios">Volver a Inicio</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
