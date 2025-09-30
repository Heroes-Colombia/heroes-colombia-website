"use client"

import Image from "next/image"
import { useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Jugueterías", image: "/images/categories/jugueterias.png" },
  { name: "Bares", image: "/images/categories/bares.png" },
  { name: "Entretenimiento", image: "/images/categories/entretenimiento.png" },
  { name: "Educación", image: "/images/categories/educacion.png" },
  { name: "Asistencia Jurídica", image: "/images/categories/asistencia-juridica.png" },
  { name: "Hoteles", image: "/images/categories/hoteles.png" },
  { name: "Belleza", image: "/images/categories/belleza.png" },
  { name: "Hogar", image: "/images/categories/hogar.png" },
  { name: "Eventos", image: "/images/categories/eventos.png" },
  { name: "Deportes", image: "/images/categories/deportes.png" },
  { name: "Vestuario", image: "/images/categories/vestuario.png" },
  { name: "Papelerías", image: "/images/categories/papelerias.png" },
  { name: "Salud", image: "/images/categories/salud.png" },
  { name: "Telefonía", image: "/images/categories/telefonia.png" },
  { name: "Tienda Militar", image: "/images/categories/tienda-militar.png" },
  { name: "Tecnología", image: "/images/categories/tecnologia.png" },
  { name: "Seguros", image: "/images/categories/seguros.png" },
  { name: "Vehículos", image: "/images/categories/vehiculos.png" },
  { name: "Mascotas", image: "/images/categories/mascotas.png" },
  { name: "Restaurantes", image: "/images/categories/restaurantes.png" },
  { name: "Vivienda", image: "/images/categories/vivienda.png" },
]

export function CategoriesCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame

    const autoScroll = () => {
      if (container) {
        scrollPosition += scrollSpeed

        // Reset to beginning when reaching the end
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0
        }

        container.scrollLeft = scrollPosition
        animationFrameId = requestAnimationFrame(autoScroll)
      }
    }

    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll)

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId)
    }

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll)
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      })
    }
  }

  const duplicatedCategories = [...categories, ...categories]

  return (
    <div className="relative group">
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {duplicatedCategories.map((category, index) => (
          <div key={index} className="flex flex-col items-center gap-3 min-w-[120px] group/item cursor-pointer">
            <div className="relative w-24 h-24 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all duration-300 flex items-center justify-center overflow-hidden group-hover/item:scale-105">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={80}
                height={80}
                className="object-contain p-2"
              />
            </div>
            <span className="text-sm font-medium text-center text-muted-foreground group-hover/item:text-foreground transition-colors">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
