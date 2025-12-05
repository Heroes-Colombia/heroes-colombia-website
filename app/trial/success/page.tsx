import { CheckCircle2, Sparkles, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "¡Pago Exitoso! - Héroes Colombia",
  description: "Tu prueba Enterprise ha sido activada exitosamente",
}

export default function TrialSuccessPage() {
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.heroescolombia.com"

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold mb-2">¡Pago Exitoso!</CardTitle>
          <p className="text-lg text-muted-foreground">
            Tu prueba Enterprise ha sido activada. Revisa tu correo para continuar.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* What's Next */}
          <div className="bg-primary/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Revisa tu Correo Electrónico</h3>
                <p className="text-sm text-muted-foreground">
                  Te enviamos un correo con las instrucciones para crear tu cuenta en Heroes Colombia y comenzar a usar todas
                  las funciones Enterprise.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  O crea tu cuenta con el botón de abajo 👇
                </p>
              </div>
            </div>
          </div>

          {/* Trial Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Acceso Completo Hasta</div>
              <div className="text-xl font-bold">1 de Febrero, 2026</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Plan Incluido</div>
              <div className="text-xl font-bold text-primary">Enterprise</div>
            </div>
          </div>

          {/* Features Included */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Lo Que Puedes Hacer Ahora
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Crear puntos de venta ilimitados para tu negocio</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Publicar promociones ilimitadas</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Acceder a analiticas completas de tu negocio</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Aparecer en sección destacada premium</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Soporte prioritario</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1 bg-gradient-to-r from-primary to-orange-500">
              <Link href={dashboardUrl + '/register'} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Acceder al portal web
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </div>

          {/* Help Section */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">¿No recibiste el correo?</p>
            <p className="text-xs text-muted-foreground">
              Revisa tu carpeta de spam o escríbenos a{" "}
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
