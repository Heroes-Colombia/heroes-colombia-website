# Payment & Subscription Implementation Plan
**Project:** Heroes Colombia Website → Dashboard Integration
**Created:** October 6, 2025
**Status:** Planning Phase

---

## Table of Contents
1. [Business Model Summary](#business-model-summary)
2. [System Architecture](#system-architecture)
3. [Implementation Phases](#implementation-phases)
4. [Technical Specifications](#technical-specifications)
5. [Testing Strategy](#testing-strategy)
6. [Launch Checklist](#launch-checklist)

---

## Business Model Summary

### Trial Period Strategy
**Goal:** Capture credit card upfront with low-friction 3,000 COP/month trial for 2 months

**Flow:**
```
Business signup → 3,000 COP/month trial (2 months) → Full access to Enterprise dashboard
                                                   ↓
                                    After 2 months → Choose plan in dashboard
                                                   ↓
                              Auto-charge based on plan selection
                              (Básico: 60,000/month | Pro: 230,000/month | Annual options)
```

### Key Business Rules

1. **Trial Period (First 2 Months)**
   - Cost: 3,000 COP per month (charged monthly)
   - Access: Full Enterprise dashboard features
   - Duration: 2 months from signup
   - Cancellation: Allowed anytime, no refunds
   - **Special Launch Consideration**: Businesses signing up before December 1st will have:
     - First charge: December 1, 2025 (standardized billing date)
     - Option: Could offer "pay signup day + 2 months free until Dec 1st" as incentive

2. **Post-Trial Transition**
   - Businesses select plan within dashboard (prompted via notifications/emails)
   - Auto-charge on trial end date at selected plan price
   - If no plan selected → downgrade to Free plan automatically
   - Billing anniversary: Same day as trial start (or Dec 1st for pre-launch signups)

3. **Annual Plan Strategy**
   - Skip trial, pay upfront (650,000 COP Básico / 2,500,000 COP Pro)
   - **Special Offer**: Businesses on trial get additional discount if they upgrade to annual before trial ends
   - Can switch from monthly to annual mid-cycle through dashboard

4. **Free Plan**
   - Always available
   - Pay-per-promotion model: 10,000 COP per promotion posted
   - No recurring subscription

5. **Tax & Pricing**
   - All prices must include 19% Colombian IVA (not 10% as you mentioned - Colombia changed VAT to 19% in 2024)
   - Display prices clearly: "60,000 COP/mes (IVA incluido)"
   - Terms must disclose tax inclusion

---

## System Architecture

### Current vs. Target State

#### CURRENT STATE (Website)
```
Website (heroes-colombia-website)
├── Landing pages (users & businesses)
├── MercadoPago integration (INCOMPLETE)
│   ├── ❌ Subscription flow (partial implementation)
│   ├── ❌ Webhook handler (TODO placeholders)
│   └── ❌ Payment preferences (not created)
├── Systeme.io CRM (⚠️ HARDCODED API KEY)
└── No database (external services only)
```

#### CURRENT STATE (Dashboard)
```
Dashboard (heroes-colombia-dashboard)
├── Firebase Authentication ✅
├── Firestore Database ✅
│   ├── users/ (military users)
│   ├── businesses/ (business profiles)
│   │   ├── plan: PlanType
│   │   ├── planStartDate
│   │   └── planEndDate
│   └── subscriptions/ (NEW COLLECTION NEEDED)
├── Registration flow ✅
└── Billing page (static pricing display)
```

#### TARGET STATE
```
┌─────────────────────────────────────────────────────────────┐
│              HEROES COLOMBIA ECOSYSTEM                       │
└─────────────────────────────────────────────────────────────┘

   WEBSITE                    MERCADOPAGO                DASHBOARD
┌──────────────┐            ┌─────────────┐           ┌──────────────┐
│              │            │             │           │              │
│  /negocios   │───(1)─────→│  Trial Sub  │──(4)────→│  /register   │
│  Select Plan │            │  3,000 COP  │           │  Complete    │
│              │            │  /month x 2 │           │  Profile     │
└──────────────┘            └─────────────┘           └──────────────┘
       │                          │                          │
       │                          │(2) Payment Success       │
       │                          │    Webhook Event         │
       │                          ↓                          │
       │                   ┌─────────────┐                  │
       │                   │  Webhook    │                  │
       │                   │  Handler    │                  │
       │                   │  (Website)  │                  │
       │                   └─────────────┘                  │
       │                          │                          │
       │                          │(3) Create Business       │
       │                          │    Record + Send Email   │
       │                          ↓                          ↓
       │                   ┌──────────────────────────────────┐
       │                   │      FIREBASE FIRESTORE          │
       │                   ├──────────────────────────────────┤
       │                   │ businesses/{businessId}          │
       │                   │   plan: "enterprise" (trial)     │
       │                   │   trialEndDate: +60 days         │
       │                   │                                  │
       │                   │ subscriptions/{subId}            │
       │                   │   mpSubscriptionId: "xxx"        │
       │                   │   status: "trial"                │
       │                   │   nextBillingDate: +30 days      │
       │                   └──────────────────────────────────┘
       │                                                       │
       │(5) Business logs in                                  │
       └──────────────────────────────────────────────────────┘
                                  │
                                  ↓
                     ┌────────────────────────────┐
                     │   DASHBOARD                 │
                     │   - Notifications about     │
                     │     plan selection          │
                     │   - Manage subscription     │
                     │   - Choose plan before      │
                     │     trial ends              │
                     └────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Critical Security & Setup (IMMEDIATE)
**Priority:** 🔴 CRITICAL
**Timeline:** 1-2 days

#### Tasks:
1. **Remove Hardcoded API Key** ⚠️
   - [ ] Move `SYSTEME_IO_API_KEY` to environment variable
   - [ ] Update `lib/systeme-io.ts` to use `process.env.SYSTEME_IO_API_KEY`
   - [ ] Revoke old API key in Systeme.io dashboard
   - [ ] Generate new API key
   - [ ] Add to `.env.local` and Vercel environment variables

2. **Environment Configuration**
   - [ ] Create `.env.example` template
   - [ ] Document all required environment variables
   - [ ] Set up separate environments (test/production)
   - [ ] Configure Vercel environment variables

3. **MercadoPago Account Setup**
   - [ ] Complete recurring payments configuration in MercadoPago Colombia dashboard
   - [ ] Generate production credentials
   - [ ] Configure webhook URL: `https://heroescolombia.com/api/mercadopago/webhook`
   - [ ] Test webhook delivery in MercadoPago dashboard

**Files to Modify:**
- `lib/systeme-io.ts` - Remove hardcoded key
- Create `.env.example`
- `next.config.mjs` - Add environment variable validation

---

### Phase 2: Database Schema & Firebase Integration
**Priority:** 🟡 HIGH
**Timeline:** 2-3 days

#### New Firebase Collections

```typescript
// subscriptions/{subscriptionId}
interface Subscription {
  id: string
  businessId: string
  businessEmail: string
  businessName: string

  // MercadoPago Details
  mpSubscriptionId: string // MercadoPago preapproval ID
  mpPlanId: string // Reference to MP plan

  // Subscription State
  status: "trial" | "active" | "cancelled" | "past_due" | "suspended"
  currentPlan: "enterprise" | "basico" | "pro" | "gratis"
  billingPeriod: "monthly" | "annual"

  // Trial Information
  isTrial: boolean
  trialStartDate: Timestamp
  trialEndDate: Timestamp
  trialPrice: 3000 // COP per month

  // Post-Trial Pricing
  fullPrice: number // 60000 for básico, 230000 for pro (monthly)
  nextBillingAmount: number
  nextBillingDate: Timestamp

  // Payment History
  lastPaymentDate?: Timestamp
  lastPaymentAmount?: number
  lastPaymentStatus?: "approved" | "failed" | "pending"
  failedPaymentCount: number

  // Plan Selection
  selectedPlanForPostTrial?: "basico" | "pro" | "gratis"
  planSelectedAt?: Timestamp

  // Metadata
  createdAt: Timestamp
  updatedAt: Timestamp
  cancelledAt?: Timestamp
  cancellationReason?: string
}
```

```typescript
// businesses/{businessId} - EXTEND existing schema
interface BusinessProfile {
  // ... existing fields ...

  // Subscription Info (denormalized for quick access)
  subscriptionId?: string
  plan: "gratis" | "basico" | "pro" | "enterprise"
  planStatus: "trial" | "active" | "cancelled" | "suspended"
  trialEndDate?: Timestamp
  nextBillingDate?: Timestamp
  isTrialActive: boolean

  // Launch Special
  isPreLaunchSignup: boolean // true if signed up before Dec 1, 2025
  launchBillingDate?: Timestamp // Dec 1, 2025 for pre-launch users
}
```

#### Tasks:
- [ ] Create Firestore security rules for `subscriptions/` collection
- [ ] Add subscription fields to business registration flow
- [ ] Create utility functions in dashboard for subscription management
- [ ] Add Firestore indexes for subscription queries

**Dashboard Files to Create:**
- `lib/firestore/subscriptions.ts` - CRUD operations
- `hooks/use-subscription.tsx` - React hook for subscription state
- `lib/types.ts` - Add Subscription interface

---

### Phase 3: MercadoPago Integration (Website)
**Priority:** 🟡 HIGH
**Timeline:** 3-4 days

#### 3.1 Create Subscription Plans Programmatically

**File:** `lib/mercadopago-plans.ts` (NEW)

```typescript
import { MercadoPagoConfig, PreApprovalPlan } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

const planClient = new PreApprovalPlan(client)

// Plan configurations
export const PLAN_CONFIGS = {
  trial: {
    reason: "Héroes Colombia - Prueba 2 Meses (3,000 COP/mes)",
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 3000,
      currency_id: "COP",
    },
  },
  basico_monthly: {
    reason: "Héroes Colombia - Plan Básico Mensual",
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 60000,
      currency_id: "COP",
    },
  },
  basico_annual: {
    reason: "Héroes Colombia - Plan Básico Anual",
    auto_recurring: {
      frequency: 12,
      frequency_type: "months",
      transaction_amount: 650000,
      currency_id: "COP",
    },
  },
  pro_monthly: {
    reason: "Héroes Colombia - Plan Pro Mensual",
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 230000,
      currency_id: "COP",
    },
  },
  pro_annual: {
    reason: "Héroes Colombia - Plan Pro Anual",
    auto_recurring: {
      frequency: 12,
      frequency_type: "months",
      transaction_amount: 2500000,
      currency_id: "COP",
    },
  },
}

export async function createOrGetPlan(planKey: keyof typeof PLAN_CONFIGS) {
  const envKey = `MERCADOPAGO_PLAN_ID_${planKey.toUpperCase()}`
  const existingPlanId = process.env[envKey]

  if (existingPlanId) {
    console.log(`[MP] Using existing plan: ${planKey} = ${existingPlanId}`)
    return existingPlanId
  }

  const config = PLAN_CONFIGS[planKey]
  const plan = await planClient.create({ body: config })

  console.log(`[MP] Created new plan: ${planKey} = ${plan.id}`)
  console.log(`[MP] Add to .env: ${envKey}=${plan.id}`)

  return plan.id!
}
```

**Environment Variables to Add:**
```bash
# MercadoPago Plan IDs (generated programmatically)
MERCADOPAGO_PLAN_ID_TRIAL=
MERCADOPAGO_PLAN_ID_BASICO_MONTHLY=
MERCADOPAGO_PLAN_ID_BASICO_ANNUAL=
MERCADOPAGO_PLAN_ID_PRO_MONTHLY=
MERCADOPAGO_PLAN_ID_PRO_ANNUAL=
```

#### 3.2 Trial Subscription Creation

**File:** `lib/mercadopago-subscription.ts` (REFACTOR)

```typescript
import { MercadoPagoConfig, PreApproval } from "mercadopago"
import { createOrGetPlan } from "./mercadopago-plans"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

const preApprovalClient = new PreApproval(client)

export interface CreateTrialSubscriptionParams {
  businessEmail: string
  businessName: string
  businessId?: string // Optional: if already created in DB
  isPreLaunchSignup?: boolean
}

export async function createTrialSubscription(params: CreateTrialSubscriptionParams) {
  const { businessEmail, businessName, businessId, isPreLaunchSignup = false } = params

  // Get trial plan ID
  const trialPlanId = await createOrGetPlan("trial")

  // Calculate billing dates
  const now = new Date()
  const isBeforeLaunch = now < new Date("2025-12-01")

  let startDate: Date
  let billingDay: number

  if (isBeforeLaunch && isPreLaunchSignup) {
    // Pre-launch special: first billing on Dec 1st
    startDate = new Date("2025-12-01")
    billingDay = 1
  } else {
    // Normal: billing starts on signup anniversary
    startDate = now
    billingDay = now.getDate()
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://heroescolombia.com"

  const subscription = await preApprovalClient.create({
    body: {
      preapproval_plan_id: trialPlanId,
      reason: `Héroes Colombia - Prueba 2 Meses - ${businessName}`,
      payer_email: businessEmail,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 3000,
        currency_id: "COP",
        start_date: startDate.toISOString(),
        end_date: new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(), // +60 days
        billing_day: billingDay,
        billing_day_proportional: false,
      },
      back_url: `${baseUrl}/payment/success?type=trial`,
      status: "pending",
      external_reference: businessId || `trial_${Date.now()}`,
    },
  })

  return {
    subscriptionId: subscription.id!,
    initPoint: subscription.init_point!,
    sandboxInitPoint: subscription.sandbox_init_point,
    billingStartDate: startDate,
    billingDay,
  }
}
```

#### 3.3 Post-Trial Plan Transition

**File:** `lib/mercadopago-plan-transition.ts` (NEW)

```typescript
export async function upgradeSubscription({
  currentSubscriptionId,
  newPlan,
  billingPeriod,
}: {
  currentSubscriptionId: string
  newPlan: "basico" | "pro"
  billingPeriod: "monthly" | "annual"
}) {
  // Cancel current trial subscription
  await preApprovalClient.update({
    id: currentSubscriptionId,
    body: { status: "cancelled" },
  })

  // Create new subscription with full pricing
  const planKey = `${newPlan}_${billingPeriod}` as keyof typeof PLAN_CONFIGS
  const newPlanId = await createOrGetPlan(planKey)

  // ... create new subscription logic
}
```

#### 3.4 Complete Webhook Handler

**File:** `app/api/mercadopago/webhook/route.ts` (REFACTOR COMPLETELY)

```typescript
import { NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Payment, PreApproval } from "mercadopago"
import { addContactToSystemeIO } from "@/lib/systeme-io"
import { sendEmail } from "@/lib/email" // To be created
import crypto from "crypto"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

const paymentClient = new Payment(client)
const subscriptionClient = new PreApproval(client)

// Verify webhook signature
function verifyWebhookSignature(request: NextRequest): boolean {
  const xSignature = request.headers.get("x-signature")
  const xRequestId = request.headers.get("x-request-id")
  const dataId = request.headers.get("data-id") || ""

  if (!xSignature || !xRequestId) return false

  const parts = xSignature.split(",")
  const ts = parts.find((p) => p.startsWith("ts="))?.split("=")[1]
  const hash = parts.find((p) => p.startsWith("v1="))?.split("=")[1]

  if (!ts || !hash) return false

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET!

  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(manifest)
  const calculatedHash = hmac.digest("hex")

  return calculatedHash === hash
}

export async function POST(request: NextRequest) {
  try {
    // Verify signature
    if (!verifyWebhookSignature(request)) {
      console.error("[Webhook] Invalid signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const body = await request.json()
    console.log("[Webhook] Received:", body.type, body.action)

    // Handle different event types
    switch (body.type) {
      case "payment":
        await handlePaymentEvent(body)
        break

      case "subscription_preapproval":
        await handleSubscriptionEvent(body)
        break

      case "subscription_authorized_payment":
        await handleAuthorizedPayment(body)
        break

      default:
        console.log("[Webhook] Unhandled event type:", body.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[Webhook] Error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handlePaymentEvent(body: any) {
  const paymentId = body.data.id
  const payment = await paymentClient.get({ id: paymentId })

  if (payment.status === "approved") {
    const subscriptionId = payment.external_reference

    // Update Firestore subscription record
    // await updateSubscriptionPaymentStatus(subscriptionId, "paid")

    console.log("[Webhook] Payment approved for subscription:", subscriptionId)
  }
}

async function handleSubscriptionEvent(body: any) {
  const subscriptionId = body.data.id
  const action = body.action

  switch (action) {
    case "created":
      // Subscription created - business completed payment form
      const subscription = await subscriptionClient.get({ id: subscriptionId })

      if (subscription.status === "authorized") {
        // Create business account in Firebase
        const businessData = {
          email: subscription.payer_email!,
          subscriptionId: subscription.id!,
          plan: "enterprise", // Trial gives Enterprise access
          isTrial: true,
          trialEndDate: subscription.auto_recurring?.end_date,
        }

        // TODO: Call Firebase Admin SDK to create business
        // const businessId = await createBusinessInFirebase(businessData)

        // Send welcome email with signup link
        await sendEmail({
          to: subscription.payer_email!,
          template: "trial_welcome",
          data: {
            businessName: subscription.reason,
            signupLink: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/register?subscription=${subscription.id}`,
            trialEndDate: subscription.auto_recurring?.end_date,
          },
        })

        // Add to Systeme.io CRM
        await addContactToSystemeIO({
          email: subscription.payer_email!,
          tags: ["trial-customer", "business"],
          customFields: {
            subscription_id: subscription.id!,
            trial_end_date: subscription.auto_recurring?.end_date || "",
          },
        })

        console.log("[Webhook] Trial subscription created:", subscription.id)
      }
      break

    case "updated":
      // Subscription updated (plan change, cancellation, etc.)
      // TODO: Update Firestore
      break
  }
}

async function handleAuthorizedPayment(body: any) {
  // Recurring payment was processed
  const paymentId = body.data.id
  // TODO: Update next billing date in Firestore
}
```

**Tasks:**
- [ ] Implement `lib/mercadopago-plans.ts`
- [ ] Refactor `lib/mercadopago-subscription.ts`
- [ ] Complete `app/api/mercadopago/webhook/route.ts`
- [ ] Create `lib/email.ts` for transactional emails
- [ ] Create `lib/firebase-admin.ts` for server-side Firebase operations
- [ ] Test webhook locally with ngrok
- [ ] Configure webhook URL in MercadoPago dashboard

---

### Phase 4: Payment Flow Integration (Website)
**Priority:** 🟡 HIGH
**Timeline:** 2 days

#### 4.1 Update Business Landing Page

**File:** `app/negocios/page.tsx`

**Changes:**
1. Remove one-time payment buttons
2. Add single "Comenzar Prueba Gratis" CTA
3. Show "3,000 COP/mes por 2 meses" pricing
4. Add clear messaging about Enterprise access during trial
5. Add FAQ about trial-to-paid transition

**Proposed UI Changes:**

```tsx
// Replace pricing cards with single trial offer
<section id="trial-offer" className="py-20 bg-gradient-to-br from-primary to-accent">
  <div className="container max-w-4xl mx-auto text-center text-primary-foreground">
    <h2 className="text-4xl font-bold mb-4">
      Prueba Gratis por 2 Meses
    </h2>
    <p className="text-xl mb-8">
      Acceso completo a todas las funciones Enterprise por solo 3,000 COP/mes
    </p>

    <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
      <div className="text-6xl font-bold mb-2">3,000 COP</div>
      <div className="text-xl mb-6">por mes durante 2 meses</div>

      <ul className="text-left space-y-3 mb-8">
        <li>✓ Acceso completo al dashboard Enterprise</li>
        <li>✓ Promociones ilimitadas</li>
        <li>✓ Analytics avanzados</li>
        <li>✓ Soporte prioritario</li>
        <li>✓ Sin compromiso - cancela cuando quieras</li>
      </ul>

      <Button size="lg" variant="secondary" onClick={handleStartTrial}>
        Comenzar Prueba Ahora
      </Button>

      <p className="text-sm mt-4 opacity-80">
        Después de 2 meses, elige tu plan: desde 60,000 COP/mes
      </p>
    </div>
  </div>
</section>

// Move current pricing section lower with "Ver Planes Completos" accordion
```

#### 4.2 Create Trial Signup API Route

**File:** `app/api/mercadopago/create-trial/route.ts` (NEW)

```typescript
import { NextRequest, NextResponse } from "next/server"
import { createTrialSubscription } from "@/lib/mercadopago-subscription"

export async function POST(request: NextRequest) {
  try {
    const { businessEmail, businessName } = await request.json()

    if (!businessEmail || !businessName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if business is signing up before launch
    const isPreLaunchSignup = new Date() < new Date("2025-12-01")

    const result = await createTrialSubscription({
      businessEmail,
      businessName,
      isPreLaunchSignup,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[API] Error creating trial:", error)
    return NextResponse.json(
      { error: "Failed to create trial subscription" },
      { status: 500 }
    )
  }
}
```

#### 4.3 Update Success/Failure Pages

**File:** `app/payment/success/page.tsx`

```tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") // "trial" | "upgrade"
  const subscriptionId = searchParams.get("subscription_id")

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle>¡Pago Exitoso!</CardTitle>
        </CardHeader>
        <CardContent>
          {type === "trial" ? (
            <>
              <p className="mb-4">
                Tu prueba de 2 meses ha sido activada. Recibirás un email con las
                instrucciones para completar tu registro.
              </p>
              <Button asChild className="w-full">
                <Link href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/register?subscription=${subscriptionId}`}>
                  Completar Registro →
                </Link>
              </Button>
            </>
          ) : (
            <>
              <p className="mb-4">
                Tu suscripción ha sido actualizada exitosamente.
              </p>
              <Button asChild className="w-full">
                <Link href={process.env.NEXT_PUBLIC_DASHBOARD_URL}>
                  Ir al Dashboard →
                </Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

**Tasks:**
- [ ] Refactor `/negocios` page UI
- [ ] Create trial signup API route
- [ ] Update success/failure pages
- [ ] Add email capture before redirecting to MercadoPago
- [ ] Implement proper error handling and retry logic

---

### Phase 5: Dashboard Integration
**Priority:** 🟡 HIGH
**Timeline:** 3-4 days

#### 5.1 Registration Flow Enhancement

**File:** `app/register/page.tsx` (Dashboard)

**Changes:**
1. Accept `subscription` query parameter
2. Pre-fill email from subscription
3. Create business profile with subscription link
4. Show "Trial Active" badge

```tsx
export default function BusinessRegisterPage() {
  const searchParams = useSearchParams()
  const subscriptionId = searchParams.get("subscription")
  const [subscriptionData, setSubscriptionData] = useState(null)

  useEffect(() => {
    if (subscriptionId) {
      // Fetch subscription details from Firestore
      fetchSubscriptionDetails(subscriptionId).then(setSubscriptionData)
    }
  }, [subscriptionId])

  // Pre-fill email from subscription
  // ...
}
```

#### 5.2 Subscription Management UI

**File:** `app/business/dashboard/billing/page.tsx` (Dashboard)

**Complete Refactor:**

```tsx
"use client"

import { useAuth } from "@/hooks/use-auth"
import { useSubscription } from "@/hooks/use-subscription" // NEW HOOK
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function BillingPage() {
  const { user } = useAuth()
  const { subscription, isLoading } = useSubscription()

  if (isLoading) return <LoadingSpinner />

  const isTrialActive = subscription?.isTrial && subscription.status === "trial"
  const daysLeftInTrial = subscription?.trialEndDate
    ? Math.ceil((subscription.trialEndDate.toDate().getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="space-y-6">
      {isTrialActive && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Prueba Activa</CardTitle>
                <CardDescription>
                  Te quedan {daysLeftInTrial} días de acceso completo
                </CardDescription>
              </div>
              <Badge variant="default">Enterprise (Prueba)</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={(60 - daysLeftInTrial) / 60 * 100} className="mb-4" />

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Selecciona tu plan antes del {subscription.trialEndDate.toDate().toLocaleDateString()}
                para continuar sin interrupciones.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <PlanSelectionCard plan="basico" billingPeriod="monthly" />
              <PlanSelectionCard plan="pro" billingPeriod="monthly" />
            </div>

            <Button variant="link" className="mt-4">
              Ver planes anuales (ahorra hasta 15%)
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current subscription details */}
      <Card>
        <CardHeader>
          <CardTitle>Suscripción Actual</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ... subscription details ... */}
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ... payment history table ... */}
        </CardContent>
      </Card>
    </div>
  )
}

function PlanSelectionCard({ plan, billingPeriod }: { plan: string; billingPeriod: string }) {
  const handleSelectPlan = async () => {
    // Call API to update subscription plan selection
    await selectPlanForPostTrial(plan, billingPeriod)
  }

  return (
    <Card className="relative">
      {/* ... plan details ... */}
      <Button onClick={handleSelectPlan}>Seleccionar Plan</Button>
    </Card>
  )
}
```

#### 5.3 Create Subscription Hook

**File:** `hooks/use-subscription.tsx` (Dashboard - NEW)

```typescript
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "./use-auth"
import type { Subscription } from "@/lib/types"

export function useSubscription() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user?.businessId) {
      setIsLoading(false)
      return
    }

    // Subscribe to subscription changes
    const unsubscribe = onSnapshot(
      doc(db, "subscriptions", user.businessId),
      (snapshot) => {
        if (snapshot.exists()) {
          setSubscription({ id: snapshot.id, ...snapshot.data() } as Subscription)
        }
        setIsLoading(false)
      }
    )

    return unsubscribe
  }, [user?.businessId])

  return { subscription, isLoading }
}
```

#### 5.4 Notification System

**File:** `app/business/dashboard/layout.tsx` (Dashboard)

Add trial expiration notification banner:

```tsx
export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  const { subscription } = useSubscription()

  const showTrialExpirationWarning =
    subscription?.isTrial &&
    subscription.trialEndDate &&
    (subscription.trialEndDate.toDate().getTime() - Date.now()) < 7 * 24 * 60 * 60 * 1000 // 7 days

  return (
    <div>
      {showTrialExpirationWarning && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle />
          <AlertDescription>
            Tu prueba termina pronto. <Link href="/business/dashboard/billing">Selecciona tu plan</Link>
          </AlertDescription>
        </Alert>
      )}

      {/* ... existing layout ... */}
    </div>
  )
}
```

**Tasks:**
- [ ] Update registration page to accept subscription parameter
- [ ] Refactor billing page with subscription management
- [ ] Create `use-subscription` hook
- [ ] Add trial expiration notifications
- [ ] Create plan selection API routes in dashboard
- [ ] Implement automatic downgrade to Free plan logic

---

### Phase 6: Email & Notification System
**Priority:** 🟢 MEDIUM
**Timeline:** 2 days

#### Email Templates Needed

1. **Trial Welcome Email** (sent after payment success)
   - Subject: "¡Bienvenido a Héroes Colombia! Completa tu registro"
   - Content: Trial details, signup link, what's included

2. **Trial Midpoint Email** (30 days into trial)
   - Subject: "¡Ya llevas 1 mes en Héroes Colombia!"
   - Content: Usage stats, plan selection reminder

3. **Trial Expiring Soon** (7 days before end)
   - Subject: "Tu prueba termina en 7 días - Selecciona tu plan"
   - Content: Urgent CTA to choose plan, pricing comparison

4. **Trial Expired** (day after trial ends)
   - Subject: "Tu prueba ha finalizado - Selecciona un plan"
   - Content: Account downgraded to Free, upgrade options

5. **Payment Failed**
   - Subject: "Problema con tu pago - Actualiza tu método de pago"
   - Content: Retry instructions, grace period info

#### Implementation Options

**Option A: SendGrid** (Recommended)
- Transactional email service
- Template builder
- Analytics
- Free tier: 100 emails/day

**Option B: Resend** (Modern alternative)
- Developer-friendly
- React email templates
- Free tier: 100 emails/day

**File:** `lib/email.ts` (Website - NEW)

```typescript
import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendEmail({
  to,
  template,
  data,
}: {
  to: string
  template: "trial_welcome" | "trial_midpoint" | "trial_expiring" | "trial_expired" | "payment_failed"
  data: Record<string, any>
}) {
  const templates = {
    trial_welcome: process.env.SENDGRID_TEMPLATE_TRIAL_WELCOME,
    trial_midpoint: process.env.SENDGRID_TEMPLATE_TRIAL_MIDPOINT,
    trial_expiring: process.env.SENDGRID_TEMPLATE_TRIAL_EXPIRING,
    trial_expired: process.env.SENDGRID_TEMPLATE_TRIAL_EXPIRED,
    payment_failed: process.env.SENDGRID_TEMPLATE_PAYMENT_FAILED,
  }

  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    templateId: templates[template],
    dynamicTemplateData: data,
  })
}
```

**Tasks:**
- [ ] Choose email service (SendGrid vs Resend)
- [ ] Create email templates
- [ ] Implement `lib/email.ts`
- [ ] Add email sending to webhook handler
- [ ] Create scheduled job for trial reminder emails (Vercel Cron or Firebase Functions)

---

### Phase 7: Analytics & Monitoring
**Priority:** 🟢 MEDIUM
**Timeline:** 1-2 days

#### Conversion Tracking Events

**Website Analytics:**
```typescript
// Track trial signups
trackEvent("trial_signup_started", { business_email })
trackEvent("trial_signup_completed", { subscription_id })
trackEvent("trial_payment_success", { subscription_id, amount: 3000 })
trackEvent("trial_payment_failed", { subscription_id, reason })

// Track plan selections
trackEvent("plan_selected", { plan, billing_period, is_during_trial })
trackEvent("plan_upgraded", { from_plan, to_plan })
```

**Dashboard Analytics:**
```typescript
// Track dashboard usage
trackEvent("dashboard_login", { business_id, plan })
trackEvent("promotion_created", { business_id, plan })
trackEvent("billing_page_viewed", { business_id, days_left_in_trial })
```

#### Monitoring & Alerts

**Sentry Integration:**
- Error tracking in webhook handler
- Failed payment alerts
- Subscription creation failures

**Vercel Analytics:**
- Conversion funnel tracking
- A/B testing for pricing page

**Tasks:**
- [ ] Add analytics events to website
- [ ] Add analytics events to dashboard
- [ ] Set up Sentry error tracking
- [ ] Create webhook failure alerts
- [ ] Set up payment failure monitoring

---

### Phase 8: Terms of Service & Legal Compliance
**Priority:** 🟡 HIGH
**Timeline:** 1 day

#### Required Updates

**File:** `app/terminos/page.tsx` (Website)

**Sections to Add/Update:**

1. **Subscription Terms**
   ```markdown
   ## Suscripciones y Pagos

   ### Período de Prueba
   - La prueba de 2 meses tiene un costo de 3,000 COP por mes
   - Acceso completo a funciones Enterprise durante la prueba
   - Cancelación permitida en cualquier momento sin penalización
   - No se ofrecen reembolsos por pagos realizados

   ### Transición Post-Prueba
   - Deberás seleccionar un plan antes del fin de tu prueba
   - Si no seleccionas un plan, tu cuenta será degradada al plan Gratuito
   - El cargo automático se realizará en la fecha de aniversario de tu registro
   - Los precios están sujetos a cambio con 30 días de aviso

   ### Facturación y Renovación
   - Las suscripciones se renuevan automáticamente
   - Los cargos se realizan el mismo día de cada mes
   - Recibirás una notificación por email antes de cada cargo
   - Puedes cancelar en cualquier momento desde el dashboard

   ### Impuestos
   - Todos los precios incluyen IVA colombiano (19%)
   - Formato de precio: "$60,000 COP/mes (IVA incluido)"
   - Facturas electrónicas disponibles en el dashboard
   ```

2. **Payment Processing**
   ```markdown
   ## Procesamiento de Pagos

   - Los pagos son procesados por MercadoPago Colombia
   - Aceptamos tarjetas de crédito y débito
   - Tu información de pago está protegida con encriptación de nivel bancario
   - No almacenamos información de tarjetas en nuestros servidores
   ```

3. **Cancellation Policy**
   ```markdown
   ## Política de Cancelación

   - Puedes cancelar tu suscripción en cualquier momento
   - La cancelación es efectiva al final del período de facturación actual
   - No se ofrecen reembolsos prorrateados
   - Mantendrás acceso hasta el fin del período pagado
   ```

4. **Data Privacy (GDPR/Colombian Law)**
   ```markdown
   ## Protección de Datos

   - Cumplimos con la Ley 1581 de 2012 (Protección de Datos Personales de Colombia)
   - Tus datos son almacenados en servidores seguros
   - No compartimos tu información con terceros sin consentimiento
   - Puedes solicitar la eliminación de tus datos en cualquier momento
   ```

**Tasks:**
- [ ] Update Terms of Service page
- [ ] Add subscription acceptance checkbox to trial signup
- [ ] Create Privacy Policy page
- [ ] Add cookie consent banner
- [ ] Review compliance with Colombian consumer protection laws

---

## Recommendations & Important Considerations

### 1. Pre-Launch Billing Strategy

**Your Concern:** Businesses signing up today (October 6) vs. launch day (December 1)

**Recommended Approach:**

**Option A: Deferred Billing (Recommended)**
```
Business signs up on Oct 10 → Trial starts immediately
                             → First charge: Dec 1, 2025
                             → Trial ends: Feb 1, 2026
                             → Benefit: ~52 days free + 60 days trial = 112 days total
```

**Pros:**
- Simple to communicate: "Sign up now, don't pay until December"
- Aligns all early adopters on same billing cycle
- Builds excitement and commitment
- Reduces churn (people feel they got a great deal)

**Cons:**
- Delayed revenue
- Risk of signups never activating

**Option B: Anniversary Billing**
```
Business signs up on Oct 10 → First charge: Oct 10
                             → Trial ends: Dec 10
                             → Next charge: Nov 10 (trial), then full price Dec 10
```

**Pros:**
- Immediate revenue
- True trial experience

**Cons:**
- Creates billing complexity
- Different billing dates for each business

**My Recommendation:** **Option A (Deferred Billing)** with messaging:

Website Banner:
```
🎉 Pre-Lanzamiento Especial
Regístrate ahora y no pagas nada hasta Diciembre
+ 2 meses de prueba a 3,000 COP/mes
= Más de 3 meses de acceso premium

[Registrarse Gratis] ←CTA
```

### 2. IVA (Tax) Clarification

**Important:** Colombian IVA is **19%**, not 10%

**Display Prices:**
```
❌ Incorrect: "60,000 COP + IVA"
✅ Correct: "71,400 COP (IVA incluido)"

Or if showing base price:
"60,000 COP + 11,400 COP IVA = 71,400 COP total"
```

**Action Required:**
- [ ] Verify all prices include IVA
- [ ] Update pricing display in website
- [ ] Update pricing in dashboard
- [ ] Ensure MercadoPago subscription amounts include IVA
- [ ] Update Terms of Service to clarify tax inclusion

### 3. Free Plan Pay-Per-Promotion Model

**Your Model:** Free account + 10,000 COP per promotion

**Implementation Recommendation:**

**Don't use MercadoPago subscriptions for Free plan** - use one-time payments instead.

**File:** `lib/mercadopago-one-time.ts` (Website)

```typescript
export async function createPromotionPayment({
  businessId,
  promotionTitle,
}: {
  businessId: string
  promotionTitle: string
}) {
  const preference = await preferenceClient.create({
    body: {
      items: [{
        title: `Publicar promoción: ${promotionTitle}`,
        quantity: 1,
        unit_price: 10000,
        currency_id: "COP",
      }],
      back_urls: {
        success: `${baseUrl}/dashboard/promotions?payment=success`,
        failure: `${baseUrl}/dashboard/promotions?payment=failure`,
      },
      external_reference: `promotion_${businessId}_${Date.now()}`,
      metadata: {
        business_id: businessId,
        type: "promotion_publication",
      },
    },
  })

  return preference.init_point
}
```

**Dashboard Integration:**
When Free plan user clicks "Publish Promotion":
1. Redirect to MercadoPago one-time payment
2. After payment success → activate promotion
3. Track in Firestore: `paid_promotions/{id}`

### 4. CTA & Messaging Improvements

**Current Website Issues:**
- Too many CTAs competing for attention
- Unclear distinction between trial and full plans
- Partnership form vs. demo request (redundant?)

**Recommended Changes:**

**Primary CTA (Hero Section):**
```tsx
<Button size="lg" variant="primary">
  Probar Gratis por 2 Meses
  <Badge>Solo 3,000 COP/mes</Badge>
</Button>
```

**Secondary CTA:**
```tsx
<Button size="lg" variant="outline">
  Solicitar Demo
</Button>
```

**Remove/Consolidate:**
- "Solicitar alianza" form → redirect to demo request
- Multiple pricing CTAs → single trial CTA
- "Contactar ventas" → only for Enterprise inquiries

### 5. Dashboard Access Clarity

**Your Question:** How to showcase Enterprise access during trial without confusing users?

**Recommended UI Treatment:**

**Dashboard Header:**
```tsx
<div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-lg">
  <div className="flex items-center justify-between">
    <div>
      <Badge variant="secondary">Acceso Enterprise (Prueba)</Badge>
      <h3 className="text-lg font-semibold mt-1">
        Estás probando todas las funciones premium
      </h3>
    </div>
    <div className="text-right">
      <div className="text-sm opacity-90">Quedan</div>
      <div className="text-3xl font-bold">{daysLeft} días</div>
    </div>
  </div>
  <Progress value={trialProgress} className="mt-3" />
  <p className="text-sm mt-2 opacity-90">
    Selecciona tu plan antes del {trialEndDate} para continuar sin interrupciones
  </p>
</div>
```

**Feature Cards (with badges):**
```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Analytics Avanzados</CardTitle>
      <Badge variant="outline">Enterprise</Badge>
    </div>
  </CardHeader>
  {/* ... */}
</Card>
```

This way users understand:
1. They have premium access NOW
2. It's temporary (trial countdown visible)
3. They need to choose a plan to keep features

### 6. Testing Strategy

**Before Launch Checklist:**

**MercadoPago Testing:**
- [ ] Create test subscriptions with test credentials
- [ ] Test trial payment flow end-to-end
- [ ] Test webhook delivery and signature verification
- [ ] Test payment failure scenarios
- [ ] Test plan upgrades/downgrades
- [ ] Test cancellation flow

**Dashboard Testing:**
- [ ] Test registration with subscription ID
- [ ] Test trial expiration notifications
- [ ] Test plan selection and upgrade
- [ ] Test billing page displays correct info
- [ ] Test Free plan promotion payment

**Email Testing:**
- [ ] Test all email templates render correctly
- [ ] Test email delivery (not spam)
- [ ] Test scheduled reminder emails
- [ ] Test payment failure emails

**Edge Cases:**
- [ ] What if webhook fails? (implement retry queue)
- [ ] What if user pays but doesn't complete registration? (send reminder)
- [ ] What if trial ends but no plan selected? (auto-downgrade)
- [ ] What if payment fails 3 times? (suspend account)

---

## Technical Debt to Address

### Critical
1. ⚠️ **Hardcoded API key** in `lib/systeme-io.ts`
2. ⚠️ **TypeScript/ESLint ignores** in `next.config.mjs`
3. ⚠️ **No error tracking** (add Sentry)
4. ⚠️ **No rate limiting** on API routes

### High Priority
1. **No tests** - add Jest + Playwright
2. **No staging environment** - set up separate Vercel project
3. **Image optimization disabled** - re-enable Next.js image optimization
4. **Missing SEO** - add metadata, sitemap, robots.txt

### Medium Priority
1. **No real CAPTCHA** - replace checkbox with reCAPTCHA v3
2. **No database backup** - implement Firestore backup strategy
3. **Manual deployment** - add CI/CD pipeline
4. **No monitoring** - add uptime monitoring (UptimeRobot)

---

## Launch Timeline

### Week 1 (Oct 7-13): Foundation
- Fix security issues
- Set up environments
- Configure MercadoPago

### Week 2 (Oct 14-20): Core Implementation
- Implement subscription flow
- Complete webhook handler
- Create Firebase schema

### Week 3 (Oct 21-27): Integration
- Connect website to dashboard
- Build billing UI
- Create email templates

### Week 4 (Oct 28-Nov 3): Testing
- End-to-end testing
- Bug fixes
- Documentation

### Week 5 (Nov 4-10): Polish
- UI/UX improvements
- Performance optimization
- Security audit

### Week 6 (Nov 11-17): Soft Launch
- Internal beta testing
- Invite 5-10 businesses
- Monitor and fix issues

### Week 7-8 (Nov 18-30): Pre-Launch
- Marketing ramp-up
- Final testing
- Content preparation

### December 1, 2025: LAUNCH 🚀

---

## Success Metrics

### Phase 1 (First Month)
- 50 trial signups
- 80% registration completion rate
- <5% payment failures
- 90% email deliverability

### Phase 2 (Trial Conversions)
- 40% trial → paid conversion
- Average plan selection: 60% Básico, 30% Pro, 10% Free
- <10% cancellations

### Phase 3 (Long-term)
- Monthly recurring revenue growth
- <5% churn rate
- 95% payment success rate

---

## Next Steps

1. **Review this plan** - identify any gaps or concerns
2. **Prioritize phases** - which to tackle first?
3. **Set up environments** - test vs. production
4. **Create project board** - track implementation tasks
5. **Schedule check-ins** - weekly progress reviews

---

**Questions for You:**

1. Do you want to proceed with Option A (Deferred Billing for pre-launch)?
2. Should we update prices to include 19% IVA or keep current prices?
3. Do you have SendGrid/Resend account for emails, or should I recommend one?
4. Do you want to implement the Free plan pay-per-promotion now or post-launch?
5. Any other concerns or requirements I should address?

Let me know and I'll start creating the implementation tasks!
