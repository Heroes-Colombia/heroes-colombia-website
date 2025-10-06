# Website UI Updates - Implementation Guide
**Created:** October 6, 2025
**Status:** Ready to Implement

---

## ✅ Components Created

### 1. `components/trial-countdown.tsx`
- Main countdown timer (days/hours/minutes/seconds)
- Compact version for headers
- Auto-hides after Feb 1, 2026
- Real-time updates every second

### 2. `components/early-bird-banner.tsx`
- Sticky top banner with 50% off message
- Countdown to Jan 15 deadline
- Dismissible (saved to localStorage)
- Floating badge alternative version

### 3. `components/trial-offer-hero.tsx`
- Complete hero section with trial offer
- Dynamic pricing from `pricing-config.ts`
- Enterprise feature showcase
- Early bird bonus alert
- Trust badges
- Secondary CTAs

---

## 📝 Changes Needed in `/app/negocios/page.tsx`

### Step 1: Update Imports

**Replace this:**
```typescript
import { CountdownTimer } from "@/components/countdown-timer"
import { ScarcityBanner } from "@/components/scarcity-banner"
import { UrgencyBanner } from "@/components/urgency-banner"
```

**With this:**
```typescript
import { TrialOfferHero } from "@/components/trial-offer-hero"
import { EarlyBirdBanner } from "@/components/early-bird-banner"
import { getCurrentPricing, formatPriceSimple, isEarlyBirdActive, calculateEarlyBirdPrice } from "@/lib/pricing-config"
```

### Step 2: Add Early Bird Banner

**After line 71 (`<SiteHeader variant="business" />`)**, add:
```typescript
<EarlyBirdBanner />
```

### Step 3: Replace Hero Section

**Find (lines 78-140):**
```typescript
<section className="relative overflow-hidden py-20 md:py-32">
  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
  <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ... old hero content ...
  </div>
</section>
```

**Replace with:**
```typescript
<TrialOfferHero onStartTrial={handleStartTrial} />
```

### Step 4: Update `handlePurchase` to `handleStartTrial`

**Replace the entire `handlePurchase` function (lines 38-67) with:**
```typescript
const handleStartTrial = async () => {
  setIsProcessing(true)
  try {
    // TODO: Call trial payment API
    // For now, redirect to coming soon
    const checkoutUrl = await createTrialCheckout({
      businessEmail: "", // Will get from form
      businessName: "", // Will get from form
    })

    window.location.href = checkoutUrl
  } catch (error) {
    console.error("[Trial] Error creating trial:", error)
    alert("Hubo un error. Por favor intenta de nuevo.")
  } finally {
    setIsProcessing(false)
  }
}
```

### Step 5: Update Pricing Section

**Find the pricing section (around line 253) and update prices:**

```typescript
// Add at the top of the component
const pricing = getCurrentPricing()
const showEarlyBird = isEarlyBirdActive()

// In the pricing cards, replace hardcoded prices with:

{/* Básico Card */}
<CardHeader>
  <CardTitle className="text-2xl">Básico</CardTitle>
  <div className="mt-4">
    {!isAnnual ? (
      <>
        <span className="text-4xl font-bold">
          {formatPriceSimple(pricing.regularPlans.basico.monthly)}
        </span>
        <span className="text-muted-foreground">/mes</span>
      </>
    ) : (
      <>
        <span className="text-4xl font-bold">
          {formatPriceSimple(pricing.regularPlans.basico.annual)}
        </span>
        <span className="text-muted-foreground">/año</span>
        <div className="text-sm text-primary font-medium mt-1">
          Ahorras {formatPriceSimple(pricing.regularPlans.basico.savings)} COP
        </div>
      </>
    )}
  </div>
  <p className="text-sm text-muted-foreground mt-2">
    IVA incluido • Para negocios en crecimiento
  </p>
</CardHeader>

{/* Show early bird pricing if active */}
{showEarlyBird && (
  <Badge variant="secondary" className="mb-2">
    🎁 50% OFF primer mes si seleccionas antes del 15 de enero
  </Badge>
)}
```

**Repeat for Pro and Enterprise cards**

### Step 6: Update Feature Limits

**In pricing cards, update the limits to match new pricing:**

**Básico:**
- ~~Hasta 3 promociones activas~~ → **10 promociones activas**
- ~~1 ubicación~~ → **Hasta 3 ubicaciones**

**Pro:**
- ~~Hasta 10 ubicaciones~~ → **Hasta 10 ubicaciones** (correct)
- Add: **Segmentación de audiencia**

**Enterprise:**
- Keep current features
- Pricing: **Desde 800,000 COP/mes**

### Step 7: Remove Old Components

These can be removed or commented out since we're using new ones:
- `<ScarcityBanner variant="business" />` (line 75)
- `<UrgencyBanner variant="business" />` (line 76)
- Old countdown timer in hero section

---

## 📋 Complete File Structure After Changes

```typescript
"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TrialOfferHero } from "@/components/trial-offer-hero"
import { EarlyBirdBanner } from "@/components/early-bird-banner"
import { AnimatedStat } from "@/components/animated-stats"
import { FeedbackForm } from "@/components/feedback-form"
import { DashboardShowcase } from "@/components/dashboard-showcase"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { TrustBadges } from "@/components/trust-badges"
import { GuaranteeBadge } from "@/components/guarantee-badge"
import { Button } from "@/components/ui/button"
import { FAQSection } from "@/components/faq-section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentPricing, formatPriceSimple, isEarlyBirdActive } from "@/lib/pricing-config"
import { /* icons */ } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BusinessPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const pricing = getCurrentPricing()
  const showEarlyBird = isEarlyBirdActive()

  const handleStartTrial = async () => {
    // Trial payment logic
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="business" />
      <EarlyBirdBanner />
      <ExitIntentPopup />

      <main className="flex-1">
        {/* NEW: Trial Offer Hero */}
        <TrialOfferHero onStartTrial={handleStartTrial} />

        {/* Stats Section - Keep as is */}
        <section className="py-16 md:py-20 bg-secondary border-y">
          ...
        </section>

        {/* Dashboard Showcase - Keep as is */}
        <section className="py-20 md:py-32 bg-background">
          <DashboardShowcase />
        </section>

        {/* Benefits Section - Keep as is */}
        <section id="beneficios">
          ...
        </section>

        {/* Pricing Section - UPDATE prices */}
        <section id="planes" className="py-20 md:py-32 bg-background">
          {/* Use pricing.regularPlans for all prices */}
          {/* Add early bird badges if active */}
        </section>

        {/* Rest of sections - Keep as is */}
        <TrustBadges />
        <FeedbackForm variant="business" />
        <FAQSection variant="business" />
      </main>

      <SiteFooter />
    </div>
  )
}
```

---

## 🎨 Visual Preview

### Before (Old Hero):
```
┌─────────────────────────────────────────┐
│ [Badge] Lanzamiento Diciembre 2025      │
│                                         │
│ Aumenta Tus Ventas Hasta 3.5x          │
│                                         │
│ [Countdown Timer - static]              │
│                                         │
│ [Comenzar] [Ver Dashboard]              │
└─────────────────────────────────────────┘
```

### After (New Hero):
```
┌─────────────────────────────────────────┐
│ 🎉 Oferta Especial - Primeros 100       │
│                                         │
│ Aumenta Tus Ventas Hasta 3.5x          │
│                                         │
│ [Countdown: 117d 5h 23m 45s]            │
│                                         │
│ ╔═══════════════════════════════════╗   │
│ ║      7,140 COP                    ║   │
│ ║ Pago único por 2 meses            ║   │
│ ║                                   ║   │
│ ║ ✓ Acceso Enterprise Completo      ║   │
│ ║ ✓ Promociones ilimitadas          ║   │
│ ║ ✓ Analytics en tiempo real        ║   │
│ ║ ✓ Soporte 24/7                    ║   │
│ ║                                   ║   │
│ ║ 🎁 Bonus: 50% OFF si eliges       ║   │
│ ║    tu plan antes del 15 enero     ║   │
│ ║                                   ║   │
│ ║ [Comenzar Ahora por 7,140 COP]    ║   │
│ ╚═══════════════════════════════════╝   │
│                                         │
│ [Solicitar Demo] [Ver Dashboard]        │
└─────────────────────────────────────────┘
```

---

## ✅ Testing Checklist

After making changes:

1. **Visual Check:**
   - [ ] Hero section displays correctly
   - [ ] Countdown timer updates in real-time
   - [ ] Early bird banner appears at top
   - [ ] Pricing cards show correct amounts

2. **Responsive Check:**
   - [ ] Mobile view (< 640px)
   - [ ] Tablet view (640px - 1024px)
   - [ ] Desktop view (> 1024px)

3. **Interactive Check:**
   - [ ] "Comenzar Ahora" button works
   - [ ] Pricing toggle (Monthly/Annual) works
   - [ ] Early bird banner dismisses
   - [ ] Scroll to pricing works

4. **Dynamic Behavior:**
   - [ ] Countdown updates every second
   - [ ] Early bird banner shows days remaining
   - [ ] Prices load from pricing-config.ts

---

## 🚧 Known Issues to Fix

1. **Trial Payment Not Implemented Yet:**
   - `handleStartTrial` needs to call MercadoPago API
   - Need to create `/api/mercadopago/create-trial` route

2. **Email Collection:**
   - Need form to collect email before redirecting to payment
   - Or collect during MercadoPago checkout

3. **Analytics Events:**
   - Add tracking for "Trial Offer Viewed"
   - Add tracking for "Start Trial Clicked"

---

## 📖 Next Steps

After UI is updated:

1. Create trial payment API route
2. Implement MercadoPago Preference creation
3. Build webhook handler
4. Test end-to-end payment flow
5. Set up email notifications

Want me to create those next?
