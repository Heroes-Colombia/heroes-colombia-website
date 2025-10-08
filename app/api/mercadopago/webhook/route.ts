import { NextResponse } from "next/server"
import { addContactToSystemeIO } from "@/lib/systeme-io"
import { sendTrialWelcomeEmail } from "@/lib/email"
import { createBusinessRecord } from "@/lib/firebase-admin"
import crypto from "crypto"

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN!
const MERCADOPAGO_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET

interface MercadoPagoPayment {
  id: number
  status: string
  status_detail: string
  transaction_amount: number
  currency_id: string
  metadata: {
    type?: string
    email?: string
    business_name?: string
    phone?: string
    trial_end_date?: string
    plan_type?: string
  }
  payer: {
    email: string
    first_name?: string
    identification?: {
      number: string
    }
    phone?: {
      number: string
    }
  }
  external_reference?: string
}

/**
 * Verify MercadoPago webhook signature
 * This ensures the webhook actually came from MercadoPago
 */
function verifyWebhookSignature(request: Request, body: any): boolean {
  if (!MERCADOPAGO_WEBHOOK_SECRET) {
    console.warn("[Webhook] Secret not configured - skipping signature verification (NOT SECURE)")
    return true // Allow during development, but warn
  }

  try {
    const xSignature = request.headers.get("x-signature")
    const xRequestId = request.headers.get("x-request-id")

    if (!xSignature || !xRequestId) {
      console.error("[Webhook] Missing signature headers")
      return false
    }

    // MercadoPago sends signature as: ts=123456,v1=hash
    const parts = xSignature.split(",")
    const ts = parts.find((part) => part.startsWith("ts="))?.split("=")[1]
    const hash = parts.find((part) => part.startsWith("v1="))?.split("=")[1]

    if (!ts || !hash) {
      console.error("[Webhook] Invalid signature format")
      return false
    }

    // Create signature string: id + request_id + ts
    const dataId = body.data?.id || body.id
    const signatureString = `id:${dataId};request-id:${xRequestId};ts:${ts};`

    // Generate HMAC SHA256
    const hmac = crypto.createHmac("sha256", MERCADOPAGO_WEBHOOK_SECRET)
    hmac.update(signatureString)
    const expectedHash = hmac.digest("hex")

    const isValid = expectedHash === hash
    if (!isValid) {
      console.error("[Webhook] Signature verification failed", {
        expected: expectedHash,
        received: hash,
      })
    }

    return isValid
  } catch (error) {
    console.error("[Webhook] Error verifying signature:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log("[Webhook] Received notification:", body)

    // Verify webhook signature for security
    if (!verifyWebhookSignature(request, body)) {
      console.error("[Webhook] Invalid signature - rejecting webhook")
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
    }

    // Handle payment notifications
    if (body.type === "payment") {
      const paymentId = body.data.id

      // Fetch payment details from MercadoPago API
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        },
      })

      if (!response.ok) {
        console.error("[Webhook] Error fetching payment:", await response.text())
        return NextResponse.json({ error: "Could not fetch payment" }, { status: 500 })
      }

      const payment: MercadoPagoPayment = await response.json()

      console.log("[Webhook] Payment details:", {
        id: payment.id,
        status: payment.status,
        metadata: payment.metadata,
      })

      // Process approved payments
      if (payment.status === "approved") {
        const metadata = payment.metadata
        const isTrialPayment = metadata.type === "trial"

        if (isTrialPayment) {
          console.log("[Webhook] Processing trial payment:", payment.id)

          const email = metadata.email || payment.payer.email
          const businessName = metadata.business_name || payment.payer.first_name || ""
          const phone = metadata.phone || payment.payer.phone?.number || ""

          // Update Systeme.io contact with trial-active tag
          try {
            await addContactToSystemeIO({
              email,
              fields: {
                firstName: businessName,
                phone,
              },
              tags: [2], // Tag ID 2 = "trial-active" (create this tag in Systeme.io)
            })
          } catch (systemeError) {
            console.error("[Webhook] Systeme.io error:", systemeError)
          }

          // Create business record in Firebase
          try {
            await createBusinessRecord({
              email,
              businessName,
              phone,
              planType: "enterprise",
              status: "trial",
              trialEndDate: metadata.trial_end_date || "2026-02-01",
              paymentId: payment.id.toString(),
              metadata: {
                earlyBirdDiscount: false, // Will be updated if they select plan before Jan 15
              },
            })
          } catch (firebaseError) {
            console.error("[Webhook] Firebase error:", firebaseError)
          }

          // Send welcome email
          try {
            await sendTrialWelcomeEmail({
              to: email,
              businessName,
            })
          } catch (emailError) {
            console.error("[Webhook] Email error:", emailError)
          }

          console.log("[Webhook] Trial payment processed successfully:", payment.id)
        } else {
          // Handle regular plan payments
          console.log("[Webhook] Processing regular plan payment:", payment.id)

          // Add to Systeme.io with appropriate tags
          try {
            await addContactToSystemeIO({
              email: payment.payer.email,
              fields: {
                firstName: payment.payer.first_name || "",
                phone: payment.payer.phone?.number || "",
              },
              tags: [3], // Tag ID 3 = "paid-customer" (create this tag in Systeme.io)
            })
          } catch (systemeError) {
            console.error("[Webhook] Systeme.io error:", systemeError)
          }
        }
      }

      return NextResponse.json({ received: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
