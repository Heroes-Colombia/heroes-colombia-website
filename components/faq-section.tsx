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
        ? `¡Oferta de lanzamiento! Los primeros 100 negocios pueden acceder por solo ${formatPrice(trialPrice)} (pago único) con acceso Enterprise completo hasta ${pricing.trialOffer?.nextBillingDate ? new Date(pricing.trialOffer.nextBillingDate).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" }) : "Febrero 1, 2026"}. Después, puedes elegir entre nuestros planes regulares: Gratis (pago por promoción), Básico desde ${formatPrice(pricing.regularPlans.basico.monthly)}/mes, Pro desde ${formatPrice(pricing.regularPlans.pro.monthly)}/mes, o Enterprise desde ${formatPrice(pricing.regularPlans.enterprise.monthly)}/mes. Todos los precios incluyen IVA.`
        : `Tenemos planes flexibles para todos los tamaños de negocio: Plan Gratis (pagas ${formatPrice(pricing.regularPlans.gratis.perPromotion)} por promoción), Básico desde ${formatPrice(pricing.regularPlans.basico.monthly)}/mes, Pro desde ${formatPrice(pricing.regularPlans.pro.monthly)}/mes, y Enterprise desde ${formatPrice(pricing.regularPlans.enterprise.monthly)}/mes. Todos los precios incluyen IVA y puedes cancelar en cualquier momento.`,
    },
    {
      question: "¿Qué incluye cada plan?",
      answer: `**Plan Gratis:** 1 ubicación, pago por promoción (${formatPrice(pricing.regularPlans.gratis.perPromotion)}), analítica básica, 1 usuario, soporte por email. **Plan Básico:** Hasta 3 ubicaciones, 3 promociones activas por ubicación, analítica básica, 2 usuarios, soporte por email. **Plan Pro:** Hasta 10 ubicaciones, 10 promociones activas por ubicación, segmentación de audiencia, analítica avanzada, 5 usuarios, soporte prioritario. **Plan Enterprise:** Ubicaciones y promociones ilimitadas, negocio y promociones destacadas en la app, segmentación de audiencia, analítica avanzada, 10 usuarios, soporte prioritario.`,
    },
    {
      question: "¿Los planes anuales tienen descuento?",
      answer: `Sí, todos los planes anuales incluyen 15% de descuento. Por ejemplo: Básico anual ${formatPrice(pricing.regularPlans.basico.annual)} (ahorras ${formatPrice(pricing.regularPlans.basico.savings)}), Pro anual ${formatPrice(pricing.regularPlans.pro.annual)} (ahorras ${formatPrice(pricing.regularPlans.pro.savings)}), Enterprise anual ${formatPrice(pricing.regularPlans.enterprise.annual)} (ahorras ${formatPrice(pricing.regularPlans.enterprise.savings)}).`,
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
      question: "¿Cuántos usuarios puedo esperar que vean mi promoción?",
      answer:
        "Tenemos más de 380,000 militares activos y sus familias registrados esperando el lanzamiento. Tu negocio aparecerá en búsquedas por categoría, ubicación, y en el feed principal de la app.",
    },
    {
      question: "¿Qué tipo de negocios tienen más éxito en la plataforma?",
      answer:
        "Restaurantes, gimnasios, tiendas de ropa, servicios de belleza y entretenimiento son los más populares. Pero cualquier negocio puede beneficiarse de nuestra audiencia leal y comprometida.",
    },
    {
      question: "¿Puedo cambiar o actualizar mi plan más adelante?",
      answer:
        "Sí, tienes control total. Puedes actualizar, cambiar de plan, pausar temporalmente, o cancelar en cualquier momento desde tu dashboard. Nuestra política es 100% flexible y sin compromisos a largo plazo.",
    },
  ]
}

const userFAQs: FAQItem[] = [
  {
    question: "¿Cómo verifico mi identidad militar?",
    answer:
      "El proceso es simple y seguro. Solo necesitas tu cédula militar o carnet institucional. Nuestro sistema verifica tu información inmediatamente y tus datos están completamente protegidos.",
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
