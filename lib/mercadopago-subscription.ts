import { MercadoPagoConfig, PreApprovalPlan, PreApproval } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

const preApprovalPlanClient = new PreApprovalPlan(client)
const preApprovalClient = new PreApproval(client)

export interface CreateSubscriptionParams {
  payerEmail: string
  businessName: string
  businessId?: string
}

// Create or get the preapproval plan (subscription plan)
export async function getOrCreatePreApprovalPlan() {
  try {
    // Try to get existing plan ID from environment variable
    const existingPlanId = process.env.MERCADOPAGO_PREAPPROVAL_PLAN_ID

    if (existingPlanId) {
      console.log("[v0] Using existing preapproval plan:", existingPlanId)
      return existingPlanId
    }

    // Create new plan if it doesn't exist
    console.log("[v0] Creating new preapproval plan")
    const plan = await preApprovalPlanClient.create({
      body: {
        reason: "Héroes Colombia - Plan Pre-Lanzamiento",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 3000,
          currency_id: "COP",
          billing_day: 1,
          billing_day_proportional: false,
        },
        back_url: "https://v0-heroes-website.vercel.app/negocios",
      },
    })

    console.log("[v0] Created preapproval plan:", plan.id)
    return plan.id!
  } catch (error) {
    console.error("[v0] Error creating/getting preapproval plan:", error)
    throw error
  }
}

// Create a subscription for a business
export async function createSubscription(params: CreateSubscriptionParams) {
  try {
    const planId = await getOrCreatePreApprovalPlan()
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    console.log("[v0] Creating subscription for:", params.payerEmail)

    const subscription = await preApprovalClient.create({
      body: {
        preapproval_plan_id: planId,
        reason: `Héroes Colombia - ${params.businessName}`,
        payer_email: params.payerEmail,
        card_token_id: undefined,
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 3000,
          currency_id: "COP",
          start_date: new Date().toISOString(),
          billing_day: 1,
          billing_day_proportional: false,
        },
        back_url: `${baseUrl}/negocios`,
        status: "pending",
        external_reference: params.businessId || `business_${Date.now()}`,
      },
    })

    console.log("[v0] Created subscription:", subscription.id)
    console.log("[v0] Init point:", subscription.init_point)

    return {
      subscriptionId: subscription.id!,
      initPoint: subscription.init_point!,
      sandboxInitPoint: subscription.sandbox_init_point,
    }
  } catch (error) {
    console.error("[v0] Error creating subscription:", error)
    throw error
  }
}

// Verify webhook signature
export function verifyWebhookSignature(xSignature: string, xRequestId: string, dataId: string): boolean {
  try {
    // Extract ts and v1 from x-signature header
    const parts = xSignature.split(",")
    const ts = parts.find((p) => p.startsWith("ts="))?.split("=")[1]
    const hash = parts.find((p) => p.startsWith("v1="))?.split("=")[1]

    if (!ts || !hash) {
      console.error("[v0] Invalid signature format")
      return false
    }

    // Create the manifest string
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`

    // Get secret from webhook configuration (you'll need to add this to env vars)
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET

    if (!secret) {
      console.warn("[v0] No webhook secret configured, skipping verification")
      return true // Allow in development
    }

    // Create HMAC SHA256 hash
    const crypto = require("crypto")
    const hmac = crypto.createHmac("sha256", secret)
    hmac.update(manifest)
    const calculatedHash = hmac.digest("hex")

    const isValid = calculatedHash === hash
    console.log("[v0] Webhook signature valid:", isValid)

    return isValid
  } catch (error) {
    console.error("[v0] Error verifying webhook signature:", error)
    return false
  }
}
