import { Clock } from "lucide-react"

export function UrgencyBanner({ variant = "user" }: { variant?: "user" | "business" }) {
  return (
    <div className="bg-primary/10 border-y border-primary/20 py-3">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-center">
          <Clock className="h-5 w-5 text-primary shrink-0 animate-pulse" />
          <p className="text-sm font-medium text-primary">
            {variant === "user" ? (
              <>
                <span className="font-bold">Regístrate antes del 1 de diciembre</span> y obtén beneficios exclusivos de
                lanzamiento
              </>
            ) : (
              <>
                <span className="font-bold">Primeros 2 meses gratis</span> para negocios que se registren antes del
                lanzamiento
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
