"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

const userFAQs: FAQItem[] = [
  {
    question: "¿Cómo verifico mi identidad militar?",
    answer:
      "El proceso es simple y seguro. Solo necesitas tu cédula militar o carnet institucional. Nuestro sistema verifica tu información en menos de 24 horas y tus datos están completamente protegidos.",
  },
  {
    question: "¿Tiene algún costo la app?",
    answer:
      "No, la app es gratuita para descargar y usar. Puedes acceder a todos los beneficios exclusivos sin costo durante el periodo de lanzamiento.",
  },
  {
    question: "¿Puedo usar los beneficios para mi familia?",
    answer:
      "Absolutamente. Los beneficios están diseñados para ti y tu familia. Puedes compartir las promociones con tus seres queridos.",
  },
  {
    question: "¿Qué pasa si un negocio no acepta mi código?",
    answer:
      "Contáctanos inmediatamente. Tenemos un equipo de soporte dedicado que resolverá cualquier problema en menos de 24 horas y garantizará que recibas tu beneficio.",
  },
]

const businessFAQs: FAQItem[] = [
  {
    question: "¿Cuánto cuesta registrar mi negocio?",
    answer:
      "Los primeros dos meses son completamente GRATIS para socios de lanzamiento. Después, los planes comienzan desde $49/mes. Puedes cancelar en cualquier momento sin preguntas.",
  },
  {
    question: "¿Cómo verifican que los usuarios son militares reales?",
    answer:
      "Tenemos un sistema de verificación riguroso de dos pasos que valida la identidad militar de cada usuario con documentos oficiales. Solo personas con credenciales válidas pueden acceder a los beneficios, garantizando que tu inversión llegue a la audiencia correcta.",
  },
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer:
      "Sí, sin preguntas ni penalizaciones. No hay contratos a largo plazo. Cancela cuando quieras desde tu dashboard con un solo clic.",
  },
  {
    question: "¿Cuántos negocios puedo esperar que vean mi promoción?",
    answer:
      "Tenemos más de 380,000 militares activos y sus familias registrados esperando el lanzamiento. Tu negocio aparecerá en búsquedas por categoría, ubicación, y en el feed principal de la app.",
  },
  {
    question: "¿Qué tipo de negocios tienen más éxito en la plataforma?",
    answer:
      "Restaurantes, gimnasios, tiendas de ropa, servicios de belleza y entretenimiento son los más populares. Pero cualquier negocio puede beneficiarse de nuestra audiencia leal y comprometida.",
  },
  {
    question: "¿Cómo funciona el periodo de prueba gratuito?",
    answer:
      "Los primeros 100 negocios que se registren para el lanzamiento obtienen 2 meses completamente gratis con acceso a todas las funcionalidades premium. Sin tarjeta de crédito requerida para empezar.",
  },
  {
    question: "¿Qué pasa después del periodo de lanzamiento?",
    answer:
      "Después de los 2 meses gratis, puedes elegir continuar con un plan mensual desde $49 o cancelar sin costo alguno. No hay sorpresas ni cargos automáticos sin tu autorización.",
  },
  {
    question: "¿Puedo cambiar o pausar mi plan más adelante?",
    answer:
      "Sí, tienes control total. Puedes cambiar de plan, pausar temporalmente, o cancelar en cualquier momento desde tu dashboard. Nuestra política es 100% flexible.",
  },
]

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden bg-background">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
          >
            <span className="font-semibold text-sm pr-4">{item.question}</span>
            <ChevronDown
              className={cn("h-5 w-5 text-muted-foreground transition-transform shrink-0", {
                "transform rotate-180": openIndex === index,
              })}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export function FAQSection({ variant = "user" }: { variant?: "user" | "business" }) {
  const faqs = variant === "user" ? userFAQs : businessFAQs

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Preguntas Frecuentes</h3>
        <p className="text-muted-foreground">Todo lo que necesitas saber</p>
      </div>
      <FAQAccordion items={faqs} />
    </div>
  )
}
