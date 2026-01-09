"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Target } from "lucide-react"

export function DashboardShowcase() {
  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Portal web profesional para tu negocio</h2>
        <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
          Controla y optimiza tus promociones con métricas en tiempo real
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
          <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Analíticas avanzadas</h3>
          <p className="text-sm text-muted-foreground">
            Visualiza impresiones, visitas, redenciones y conversión en tiempo real
          </p>
        </Card>

        <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
          <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Gestión de promociones</h3>
          <p className="text-sm text-muted-foreground">
            Crea, edita y administra todas tus promociones desde un solo lugar
          </p>
        </Card>

        <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
          <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Reportes detallados</h3>
          <p className="text-sm text-muted-foreground">Exporta datos y programa reportes automáticos para tu equipo</p>
        </Card>
      </div>

      {/* Dashboard Screenshots */}
      <div className="space-y-8">
        {/* Analytics Dashboard */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl">
            <div className="bg-gradient-to-br from-muted/30 to-background p-4 md:p-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">Panel de analíticas</h3>
                <p className="text-sm text-muted-foreground">Métricas detalladas de rendimiento y conversión</p>
              </div>
              <div className="relative rounded-lg overflow-hidden border-2 border-border shadow-2xl">
                <Image
                  src="/images/dashboard-analytics.png"
                  alt="Dashboard de Analíticas"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Overview Dashboard */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl">
            <div className="bg-gradient-to-br from-muted/30 to-background p-4 md:p-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">Resumen general</h3>
                <p className="text-sm text-muted-foreground">Vista completa de tu negocio y promociones activas</p>
              </div>
              <div className="relative rounded-lg overflow-hidden border-2 border-border shadow-2xl">
                <Image
                  src="/images/dashboard-overview.png"
                  alt="Dashboard Resumen"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Promotions Management */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl">
            <div className="bg-gradient-to-br from-muted/30 to-background p-4 md:p-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">Gestión de promociones</h3>
                <p className="text-sm text-muted-foreground">Administra todas tus ofertas y descuentos fácilmente</p>
              </div>
              <div className="relative rounded-lg overflow-hidden border-2 border-border shadow-2xl">
                <Image
                  src="/images/dashboard-promotions.png"
                  alt="Gestión de Promociones"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
