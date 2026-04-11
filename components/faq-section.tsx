"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getCurrentPricing,
  formatPrice,
  isTrialOfferActive,
  getTrialPrice,
  getTrialSpotsInfo,
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
  const spotsInfo = getTrialSpotsInfo()

  const trialFAQs: FAQItem[] = isTrialActive
    ? [
        {
          question: "¿Cuánto cuesta registrar mi negocio?",
          answer: `Por ahora, los primeros ${spotsInfo.limit} negocios acceden por solo ${formatPrice(trialPrice)} (pago único) — eso cubre 2 meses de acceso Enterprise completo. Una vez completemos los ${spotsInfo.limit} negocios, este precio especial cierra. Hoy llevamos ${spotsInfo.taken} negocios registrados. Todos los precios incluyen IVA.`,
        },
        {
          question: "¿Por qué el precio es tan bajo?",
          answer: `Estamos en fase de crecimiento y queremos validar la plataforma con negocios reales antes de escalar el precio. A cambio de entrar primero, obtienes acceso completo al plan Enterprise por 2 meses por solo ${formatPrice(trialPrice)}. Cuando superemos los ${spotsInfo.limit} negocios activos, el precio pasará a ${formatPrice(pricing.regularPlans.basico.annual)}/año para el plan anual.`,
        },
        {
          question: "¿Qué pasa cuando terminen los 2 meses de prueba?",
          answer: `Al finalizar los 2 meses recibirás un aviso para elegir si continúas o no. No hay renovación automática — tú decides. Si decides continuar, el plan anual queda en ${formatPrice(pricing.regularPlans.basico.annual)}/año (menos de ${formatPrice(Math.round(pricing.regularPlans.basico.annual / 12))}/mes). Si no continúas, tu perfil queda pausado sin costo adicional.`,
        },
      ]
    : [
        {
          question: "¿Cuánto cuesta registrar mi negocio?",
          answer: `Tenemos planes flexibles para todos los tamaños de negocio: Básico desde ${formatPrice(pricing.regularPlans.basico.monthly)}/mes (o ${formatPrice(pricing.regularPlans.basico.annual)}/año), Pro desde ${formatPrice(pricing.regularPlans.pro.monthly)}/mes, y Enterprise desde ${formatPrice(pricing.regularPlans.enterprise.monthly)}/mes. Todos los precios incluyen IVA y puedes cancelar en cualquier momento.`,
        },
        {
          question: "¿Los planes anuales tienen descuento?",
          answer: `Sí, el plan anual incluye descuento frente al mensual. Por ejemplo: Básico anual ${formatPrice(pricing.regularPlans.basico.annual)} (ahorras ${formatPrice(pricing.regularPlans.basico.savings)}), Pro anual ${formatPrice(pricing.regularPlans.pro.annual)} (ahorras ${formatPrice(pricing.regularPlans.pro.savings)}). Es la opción más popular entre negocios que ya probaron la plataforma.`,
        },
      ]

  return [
    ...trialFAQs,
    {
      question: "¿Qué incluye el plan Enterprise?",
      answer: `El plan Enterprise incluye: ubicaciones y promociones ilimitadas, tu negocio y promociones destacados en la app (mayor visibilidad), segmentación de audiencia, analítica avanzada, acceso para 10 usuarios, y soporte prioritario por email y WhatsApp.`,
    },
    {
      question: "¿Puedo cancelar en cualquier momento?",
      answer:
        "Sí, sin preguntas ni penalizaciones. No hay contratos a largo plazo. Cancela cuando quieras desde tu portal web con un solo clic.",
    },
    {
      question: "¿Cuántos usuarios militares pueden ver mi negocio?",
      answer:
        "Hoy tenemos más de 2,300 miembros activos de las fuerzas armadas y sus familias. Tu negocio aparece en búsquedas por categoría y ubicación, y en el feed principal de la app. La base crece cada semana.",
    },
    {
      question: "¿Qué tipo de negocios tienen más éxito en la plataforma?",
      answer:
        "Restaurantes, gimnasios, tiendas de ropa, servicios de belleza y entretenimiento son los más populares. Pero cualquier negocio puede beneficiarse — la audiencia militar es leal y recomienda activamente a sus compañeros.",
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
