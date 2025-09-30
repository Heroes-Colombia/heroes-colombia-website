import { ShieldCheck } from "lucide-react"

export function GuaranteeBadge() {
  return (
    <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-6 py-4">
      <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
      <div>
        <div className="font-semibold text-sm">Garantía Sin Riesgo</div>
        <div className="text-xs text-muted-foreground">Cancela cuando quieras, sin preguntas</div>
      </div>
    </div>
  )
}
