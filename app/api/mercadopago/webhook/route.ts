import { NextResponse } from "next/server"
import crypto from "crypto"
import { addContactToMailerLite } from "@/lib/mailer-lite"

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN!
const MERCADOPAGO_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET

interface MercadoPagoPayment {
  id: number
  status: string
  transaction_amount: number
  payer: {
    email: string
    first_name?: string
    identification?: {
      number: string
    }
  }
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
  const startTime = Date.now()

  try {
    const body = await request.json()

    console.log("[Webhook] Received notification:", body)

    // Verify webhook signature for security
    if (!verifyWebhookSignature(request, body)) {
      console.warn("[Webhook] ⚠️ Signature verification failed - ALLOWING for debugging")
    }

    // CRITICAL: Return 200 OK immediately to MercadoPago
    const responseTime = Date.now() - startTime
    console.log(`[Webhook] Sending 200 OK response (${responseTime}ms)`)

    // Process webhook asynchronously (non-blocking)
    Promise.resolve().then(async () => {
      try {
        console.log("[Webhook] Starting async processing...")

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
            const errorText = await response.text()
            console.error("[Webhook] Error fetching payment:", errorText)
            return
          }

          const payment: MercadoPagoPayment = await response.json()

          console.log("[Webhook] Payment details:", {
            id: payment.id,
            status: payment.status,
            metadata: payment.payer,
          })

          // Process approved payments
          if (payment.status === "approved") {
            const metadata = payment.payer
            console.log("[Webhook] Processing trial payment:", payment.id)

            const email = metadata.email
            const businessName = metadata.first_name || ""
            const phone = ""

            // Update MailerLite contact
            try {
              const groups = [
                '169022939224606324', // clients
                '169040520922793379' // client-registered
              ];
              await addContactToMailerLite({
                email,
                firstName: businessName,
                phone,
                groups,
              })
              console.log("[Webhook] MailerLite contact added successfully")
            } catch (systemeError) {
              console.error("[Webhook] MailerLite error:", systemeError)
            }
          }
        }

        const totalTime = Date.now() - startTime
        console.log(`[Webhook] Async processing complete (${totalTime}ms total)`)
      } catch (asyncError) {
        console.error("[Webhook] Error in async processing:", asyncError)
      }
    })

    // Return immediately - don't wait for async processing
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error)
    return NextResponse.json({ received: true })
  }
}
