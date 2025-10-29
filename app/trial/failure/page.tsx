import { XCircle, RefreshCcw, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export const metadata = {
  title: "Pago Fallido - Héroes Colombia",
  description: "El pago no pudo ser procesado",
}

export default function TrialFailurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold mb-2">Pago No Procesado</CardTitle>
          <p className="text-lg text-muted-foreground">
            No pudimos procesar tu pago. Por favor, intenta de nuevo.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Common Issues */}
          <Alert>
            <AlertDescription>
              <h3 className="font-semibold mb-3">Razones Comunes del Error:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Fondos insuficientes en la tarjeta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Datos de la tarjeta incorrectos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Tarjeta vencida o bloqueada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Límite de compra excedido</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Problemas de conexión durante el pago</span>
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* What to Do */}
          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold mb-3">¿Qué Puedes Hacer?</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <p>Verifica los datos de tu tarjeta y que tenga fondos suficientes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <p>Intenta con otra tarjeta o método de pago</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <p>Contacta a tu banco si el problema persiste</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1 bg-gradient-to-r from-primary to-orange-500">
              <Link href="/negocios">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Intentar de Nuevo
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </div>

          {/* Help Section */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">¿Necesitas Ayuda?</p>
            <Button asChild variant="link" size="sm">
              <a href="https://wa.me/573115157814" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Contactar Soporte por WhatsApp
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              <a href="mailto:soporte@heroescolombia.com" className="text-primary hover:underline">
                soporte@heroescolombia.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
