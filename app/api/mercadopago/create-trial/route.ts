import { NextRequest, NextResponse } from "next/server"
import { getCurrentPricing } from "@/lib/pricing-config"
import { addContactToSystemeIO } from "@/lib/systeme-io"

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN!
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://heroescolombia.com"

interface TrialRequestBody {
  email: string
  businessName: string
  phone?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: TrialRequestBody = await req.json()
    const { email, businessName, phone } = body

    // Validate input
    if (!email || !businessName) {
      return NextResponse.json({ error: "Email y nombre de negocio son requeridos" }, { status: 400 })
    }

    if (!MERCADOPAGO_ACCESS_TOKEN) {
      console.error("[Trial API] MercadoPago access token not configured")
      return NextResponse.json({ error: "Configuración de pago no disponible" }, { status: 500 })
    }

    // Get current pricing
    const pricing = getCurrentPricing()
    const trialPrice = pricing.trialOffer?.price || 7140

    // Create MercadoPago Preference
    const preference = {
      items: [
        {
          title: `Héroes Colombia - Prueba Enterprise (${businessName})`,
          description: "Acceso Enterprise completo hasta el 1 de Febrero, 2026",
          quantity: 1,
          unit_price: trialPrice,
          currency_id: "COP",
        },
      ],
      payer: {
        email: email,
        name: businessName,
        phone: phone
          ? {
              area_code: "57",
              number: phone,
            }
          : undefined,
      },
      back_urls: {
        success: `${BASE_URL}/trial/success`,
        failure: `${BASE_URL}/trial/failure`,
        pending: `${BASE_URL}/trial/pending`,
      },
      auto_return: "approved" as const,
      notification_url: `${BASE_URL}/api/mercadopago/webhook`,
      metadata: {
        type: "trial",
        email: email,
        business_name: businessName,
        phone: phone || "",
        trial_end_date: "2026-02-01",
        plan_type: "enterprise",
      },
      statement_descriptor: "HEROES COLOMBIA",
      external_reference: `trial_${email}_${Date.now()}`,
    }

    // Call MercadoPago API
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[Trial API] MercadoPago error:", errorData)
      return NextResponse.json(
        { error: "Error al crear preferencia de pago", details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Add contact to Systeme.io (non-blocking)
    try {
      await addContactToSystemeIO({
        email,
        firstName: businessName,
        phone: phone || "",
        tags: ['trial-signup'],
      })
    } catch (systemeError) {
      // Log error but don't fail the request
      console.error("[Trial API] Systeme.io error:", systemeError)
    }

    // Return checkout URL
    return NextResponse.json({
      success: true,
      checkoutUrl: data.init_point, // For web
      sandboxCheckoutUrl: data.sandbox_init_point, // For testing
      preferenceId: data.id,
    })
  } catch (error) {
    console.error("[Trial API] Unexpected error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
