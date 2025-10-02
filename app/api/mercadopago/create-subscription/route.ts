import { type NextRequest, NextResponse } from "next/server"
import { createSubscription } from "@/lib/mercadopago-subscription"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { payerEmail, businessName, businessId } = body

    if (!payerEmail || !businessName) {
      return NextResponse.json({ error: "Missing required fields: payerEmail, businessName" }, { status: 400 })
    }

    console.log("[v0] Creating subscription for business:", businessName)

    const result = await createSubscription({
      payerEmail,
      businessName,
      businessId,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error in create-subscription route:", error)
    return NextResponse.json(
      { error: "Failed to create subscription", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
