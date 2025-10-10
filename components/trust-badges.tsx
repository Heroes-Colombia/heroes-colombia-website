import { Shield, Lock, BadgeCheck, Award } from "lucide-react"

export function TrustBadges() {
  return (
    <section className="py-12 bg-secondary/50 border-y">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold mb-2">Seguridad y confianza garantizada</h3>
          <p className="text-sm text-muted-foreground">Protegemos tu información con los más altos estándares</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-background rounded-lg border">
            <Shield className="h-10 w-10 text-primary mb-3" />
            <div className="text-sm font-semibold mb-1">Verificación militar</div>
            <div className="text-xs text-muted-foreground">100% segura</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-background rounded-lg border">
            <Lock className="h-10 w-10 text-primary mb-3" />
            <div className="text-sm font-semibold mb-1">Encriptación SSL</div>
            <div className="text-xs text-muted-foreground">Nivel bancario</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-background rounded-lg border">
            <BadgeCheck className="h-10 w-10 text-primary mb-3" />
            <div className="text-sm font-semibold mb-1">Datos Protegidos</div>
            <div className="text-xs text-muted-foreground">GDPR compliant</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-background rounded-lg border">
            <Award className="h-10 w-10 text-primary mb-3" />
            <div className="text-sm font-semibold mb-1">Alianza oficial</div>
            <div className="text-xs text-muted-foreground">Fuerzas militares</div>
          </div>
        </div>
      </div>
    </section>
  )
}
