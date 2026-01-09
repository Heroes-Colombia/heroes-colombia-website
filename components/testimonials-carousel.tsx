"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    text: "Es una plataforma sencilla de utilizar, se ven grandes descuentos de las marcas aliadas. 100% lo recomiendo a mis compañeros y amigos.",
    name: "Capitán Luis Cardona",
    role: "Ejército Nacional",
  },
  {
    id: 2,
    text: "Me inscribí y registré a mis hijos y mi esposa, es muy facil de usar, y si nos ha ayudado bastante a ahorrar, especialmente en la temporada de diciembre.",
    name: "Sargento Carlos Méndez",
    role: "Fuerza Aeroespacial",
  },
  {
    id: 3,
    text: "El equipo de Héroes ha hecho un gran trabajo, han comunicado efectivamente y han cumplido con lo que prometían. La app tiene una funcionalidad en el mapa para ver los negocios que estan en toda Colombia y la verdad es muy bueno.",
    name: "Patrullera Camila Perez",
    role: "Policia Nacional",
  },
  {
    id: 4,
    text: "Me uní a mediados de diciembre y me gusto que las empresas inscritas tenian buenos descuentos. Hubo algunas empresas con el 100% de descuento lo cual me sorprendio por el impacto que Héroes pueda tener con nosotros.",
    name: "Teniente Carolina Pedraza",
    role: "Armada Nacional",
  },
]

export function TestimonialsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative group">
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm shadow-lg"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow w-[300px] md:w-[400px] flex-shrink-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm shadow-lg"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
