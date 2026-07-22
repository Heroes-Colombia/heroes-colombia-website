"use client"

import { TrendingUp, BadgeCheck, Users } from "lucide-react"

export function ScarcityBanner({ variant = "user" }: { variant?: "user" | "business" }) {
  return (
    <div className="bg-primary/8 border-y border-primary/15 py-3">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 text-center flex-wrap">
          {variant === "user" ? (
            <>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Users className="h-4 w-4 shrink-0" />
                <span><span className="font-bold">4,100+</span> miembros de las fuerzas armadas ya ahorrando</span>
              </div>
              <span className="hidden sm:block text-primary/30">·</span>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <BadgeCheck className="h-4 w-4 shrink-0" />
                <span><span className="font-bold">50+</span> marcas aliadas esperándote</span>
              </div>
              <span className="hidden sm:block text-primary/30">·</span>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <TrendingUp className="h-4 w-4 shrink-0" />
                <span>Descarga <span className="font-bold">100% gratis</span></span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <TrendingUp className="h-4 w-4 shrink-0" />
                <span>Plataforma en crecimiento activo</span>
              </div>
              <span className="hidden sm:block text-primary/30">·</span>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Users className="h-4 w-4 shrink-0" />
                <span><span className="font-bold">4,100+</span> usuarios militares verificados</span>
              </div>
              <span className="hidden sm:block text-primary/30">·</span>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <BadgeCheck className="h-4 w-4 shrink-0" />
                <span><span className="font-bold">50+</span> negocios aliados activos</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
