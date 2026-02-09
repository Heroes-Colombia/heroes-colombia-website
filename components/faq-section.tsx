"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getCurrentPricing,
  formatPrice,
  isTrialOfferActive,
  getTrialPrice,
} from "@/lib/pricing-config"

interface FAQItem {
  question: string
  answer: string
}

// Generate dynamic FAQ answers based on pricing config
function getBusinessFAQs(): FAQItem[] {
  const pricing = getCurrentPricing()
  const isTrialActive = isTrialOfferActive()
  const trialPrice = getTrialPrice()

  return [
    {
      question: "¿Cuánto cuesta registrar mi negocio?",
      answer: isTrialActive
        ? `¡Oferta de lanzamiento! Los primeros 100 negocios pueden acceder por solo ${formatPrice(trialPrice)} (pago único) con acceso Enterprise completo por 2 meses. Después, puedes elegir entre nuestros planes regulares: Básico desde ${formatPrice(pricing.regularPlans.basico.monthly)}/mes, Pro desde ${formatPrice(pricing.regularPlans.pro.monthly)}/mes, o Enterprise desde ${formatPrice(pricing.regularPlans.enterprise.monthly)}/mes. Todos los precios incluyen IVA.`
        : `Tenemos planes flexibles para todos los tamaños de negocio: Básico desde ${formatPrice(pricing.regularPlans.basico.monthly)}/mes, Pro desde ${formatPrice(pricing.regularPlans.pro.monthly)}/mes, y Enterprise desde ${formatPrice(pricing.regularPlans.enterprise.monthly)}/mes. Todos los precios incluyen IVA y puedes cancelar en cualquier momento.`,
    },
    {
      question: "¿Qué incluye cada plan?",
      answer: `**Plan Básico:** Hasta 3 ubicaciones, 3 promociones activas por ubicación, analítica básica, 2 usuarios, soporte por email. **Plan Pro:** Hasta 10 ubicaciones, 10 promociones activas por ubicación, segmentación de audiencia, analítica avanzada, 5 usuarios, soporte prioritario. **Plan Enterprise:** Ubicaciones y promociones ilimitadas, negocio y promociones destacadas en la app, segmentación de audiencia, analítica avanzada, 10 usuarios, soporte prioritario.`,
    },
    {
      question: "¿Los planes anuales tienen descuento?",
      answer: `Sí, todos los planes anuales incluyen 15% de descuento. Por ejemplo: Básico anual ${formatPrice(pricing.regularPlans.basico.annual)} (ahorras ${formatPrice(pricing.regularPlans.basico.savings)}), Pro anual ${formatPrice(pricing.regularPlans.pro.annual)} (ahorras ${formatPrice(pricing.regularPlans.pro.savings)}), Enterprise anual ${formatPrice(pricing.regularPlans.enterprise.annual)} (ahorras ${formatPrice(pricing.regularPlans.enterprise.savings)}).`,
    },
    {
      question: "¿Puedo cancelar en cualquier momento?",
      answer:
        "Sí, sin preguntas ni penalizaciones. No hay contratos a largo plazo. Cancela cuando quieras desde tu portal web con un solo clic.",
    },
    {
      question: "¿Cuántos usuarios puedo esperar que vean mi promoción?",
      answer:
        "Nuestra proyección para 2026 es abarcar a todos los policías activos y sus familias. Tu negocio aparecerá en búsquedas por categoría, ubicación, y en el feed principal de la app.",
    },
    {
      question: "¿Qué tipo de negocios tienen más éxito en la plataforma?",
      answer:
        "Restaurantes, gimnasios, tiendas de ropa, servicios de belleza y entretenimiento son los más populares. Pero cualquier negocio puede beneficiarse de nuestra audiencia leal y comprometida.",
    },
    {
      question: "¿Puedo cambiar o actualizar mi plan más adelante?",
      answer:
        "Sí, tienes control total. Puedes actualizar, cambiar de plan, pausar temporalmente, o cancelar en cualquier momento desde tu portal web. Nuestra política es 100% flexible y sin compromisos a largo plazo.",
    },
  ]
}

const userFAQs: FAQItem[] = [
  {
    question: "¿Cómo redimo una de las promociones que se ven en la app?",
    answer:
      "En cada negocio/promoción encontrarás las instrucciones para contactar al negocio y redimir el beneficio.",
  },
  {
    question: "¿Tiene algún costo la app?",
    answer:
      "No, la app es totalmente GRATIS para descargar y usar. Puedes acceder a todos los beneficios exclusivos sin costo alguno.",
  },
  {
    question: "¿Puedo usar los beneficios para mi familia?",
    answer:
      "Absolutamente. Los beneficios están diseñados para ti y tu familia. En tu perfil, podrás compartir un código único para que lo compartas con tus familiares.",
  },
  {
    question: "¿Qué pasa si un negocio no acepta mi código cuando muestre la app?",
    answer:
      "Contáctanos inmediatamente. Tenemos un equipo de soporte dedicado que resolverá cualquier problema en menos de 24 horas y garantizará que recibas tu beneficio.",
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
  const faqs = variant === "user" ? userFAQs : getBusinessFAQs()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Preguntas frecuentes</h3>
        <p className="text-muted-foreground">Todo lo que necesitas saber</p>
      </div>
      <FAQAccordion items={faqs} />
    </div>
  )
}
