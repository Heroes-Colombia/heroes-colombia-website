"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Smartphone, MapPin, Heart, User } from "lucide-react"

export function AppShowcase() {
  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Experiencia Móvil Excepcional</h2>
        <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
          Descubre beneficios exclusivos desde tu smartphone
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
          <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Interfaz Intuitiva</h3>
          <p className="text-xs text-muted-foreground">Diseño simple y fácil de usar</p>
        </Card>

        <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
          <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Mapa Interactivo</h3>
          <p className="text-xs text-muted-foreground">Encuentra negocios cercanos</p>
        </Card>

        <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
          <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Favoritos</h3>
          <p className="text-xs text-muted-foreground">Guarda tus lugares preferidos</p>
        </Card>

        <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
          <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Perfil Seguro</h3>
          <p className="text-xs text-muted-foreground">Verificación militar protegida</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Home Screen */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            {/* iPhone Frame */}
            <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
              {/* Screen */}
              <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black h-8 w-28 rounded-b-3xl" />
                <Image
                  src="/images/app-home.png"
                  alt="Pantalla de Inicio"
                  width={300}
                  height={650}
                  className="w-full h-auto"
                />
              </div>
              {/* Side buttons */}
              <div className="absolute -left-1 top-24 w-1 h-8 bg-black/50 rounded-l" />
              <div className="absolute -left-1 top-36 w-1 h-12 bg-black/50 rounded-l" />
              <div className="absolute -left-1 top-52 w-1 h-12 bg-black/50 rounded-l" />
              <div className="absolute -right-1 top-36 w-1 h-16 bg-black/50 rounded-r" />
            </div>
            <p className="text-center mt-4 font-medium text-sm">Pantalla de Inicio</p>
          </div>
        </div>

        {/* Business Detail */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
              <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black h-8 w-28 rounded-b-3xl" />
                <Image
                  src="/images/app-business-detail.png"
                  alt="Detalle de Negocio"
                  width={300}
                  height={650}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -left-1 top-24 w-1 h-8 bg-black/50 rounded-l" />
              <div className="absolute -left-1 top-36 w-1 h-12 bg-black/50 rounded-l" />
              <div className="absolute -left-1 top-52 w-1 h-12 bg-black/50 rounded-l" />
              <div className="absolute -right-1 top-36 w-1 h-16 bg-black/50 rounded-r" />
            </div>
            <p className="text-center mt-4 font-medium text-sm">Detalle de Negocio</p>
          </div>
        </div>

        {/* Favorites */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
              <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black h-8 w-28 rounded-b-3xl" />
                <Image
                  src="/images/app-favorites.png"
                  alt="Favoritos"
                  width={300}
                  height={650}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -left-1 top-24 w-1 h-8 bg-black/50 rounded-l" />
              <div className="absolute -left-1 top-36 w-1 h-12 bg-black/50 rounded-l" />
              <div className="absolute -left-1 top-52 w-1 h-12 bg-black/50 rounded-l" />
              <div className="absolute -right-1 top-36 w-1 h-16 bg-black/50 rounded-r" />
            </div>
            <p className="text-center mt-4 font-medium text-sm">Favoritos</p>
          </div>
        </div>

        {/* Profile */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
              <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black h-8 w-28 rounded-b-3xl" />
                <Image
                  src="/images/app-profile.png"
                  alt="Perfil de Usuario"
                  width={300}
                  height={650}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -left-1 top-24 w-1 h-8 bg-black/50 rounded-l" />
              <div className="absolute -left-1 top-36 w-1 h-12 bg-black/50 rounded-l" />
              <div className="absolute -left-1 top-52 w-1 h-12 bg-black/50 rounded-l" />
              <div className="absolute -right-1 top-36 w-1 h-16 bg-black/50 rounded-r" />
            </div>
            <p className="text-center mt-4 font-medium text-sm">Perfil de Usuario</p>
          </div>
        </div>
      </div>
    </div>
  )
}
