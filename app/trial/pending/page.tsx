import { Clock, Mail, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export const metadata = {
  title: "Pago Pendiente - Héroes Colombia",
  description: "Tu pago está siendo procesado",
}

export default function TrialPendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <Clock className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold mb-2">Pago Pendiente</CardTitle>
          <p className="text-lg text-muted-foreground">
            Tu pago está siendo procesado. Te notificaremos cuando esté confirmado.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Info */}
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Recibirás un correo electrónico cuando tu pago sea confirmado. Esto puede tomar unos minutos.
            </AlertDescription>
          </Alert>

          {/* What Happens Next */}
          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold mb-3">¿Qué Sucede Ahora?</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <p>Estamos verificando tu pago con el banco</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <p>Recibirás un correo de confirmación cuando se apruebe</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <p>Podrás acceder al Portal web y comenzar a usar la plataforma</p>
              </div>
            </div>
          </div>

          {/* Payment Methods Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-sm">Métodos de Pago Comunes con Tiempo de Espera:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>• Efecty / Baloto:</span>
                <span className="font-medium">1-2 días hábiles</span>
              </li>
              <li className="flex justify-between">
                <span>• PSE (Transferencia):</span>
                <span className="font-medium">Instantáneo - 2 horas</span>
              </li>
              <li className="flex justify-between">
                <span>• Tarjeta de crédito:</span>
                <span className="font-medium">Instantáneo</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link href="/">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>

          {/* Help Section */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">¿Tienes Preguntas?</p>
            <p className="text-xs text-muted-foreground">
              Escríbenos a{" "}
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
