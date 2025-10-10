# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Heroes Colombia Website is a Next.js marketing and landing page for Heroes Colombia. It features a trial payment system where businesses can pay 7,140 COP for full Enterprise access until February 1, 2026.

**Business Model:**
- **Trial Offer**: 7,140 COP one-time payment (6,000 + 19% IVA)
- **Access Period**: Until February 1, 2026
- **Features During Trial**: Full Enterprise plan (unlimited locations, unlimited promotions, analytics, premium placement)
- **After Trial**: Businesses select from Gratis, Básico, Pro, or Enterprise plans
- **Early Bird**: 50% off first month if plan selected before January 15, 2025 (**Dashboard-only** - not shown on marketing website)

## Pricing Plans (All prices include 19% IVA)

### Plan Gratis (Free)
**Monthly Cost**: $0 COP
**Per Promotion**: $11,900 COP

**Features:**
- 1 ubicación física u online
- Pago por cada promoción publicada
- Analítica básica
- Acceso para 1 usuario
- Soporte por email

---

### Plan Básico
**Monthly**: $70,000 COP
**Annual**: $714,000 COP (saves $126,000 - 15% discount)

**Features:**
- Hasta 3 ubicaciones
- Hasta 3 promociones activas por ubicación
- Analítica básica
- Acceso para 2 usuarios
- Soporte por email

---

### Plan Pro ⭐ (Most Popular)
**Monthly**: $270,000 COP
**Annual**: $2,754,000 COP (saves $486,000 - 15% discount)

**Features:**
- Hasta 10 ubicaciones
- Hasta 10 promociones activas por ubicación
- Segmentación de audiencia
- Analítica avanzada
- Acceso para 5 usuarios
- Soporte prioritario

---

### Plan Enterprise
**Monthly**: From $800,000 COP
**Annual**: From $8,160,000 COP (saves $1,440,000 - 15% discount)

**Features:**
- Ubicaciones ilimitadas
- Promociones ilimitadas por ubicación
- Negocio destacado en la App
- Promociones destacadas en la App
- Segmentación de audiencia
- Analítica avanzada
- Acceso para 10 usuarios
- Soporte prioritario
- Precio personalizado para cadenas y franquicias

---

### Feature Comparison Matrix

| Feature | Gratis | Básico | Pro | Enterprise |
|---------|--------|--------|-----|------------|
| **Locations** | 1 | 3 | 10 | Unlimited |
| **Active Promotions** | Pay-per-promo | 3 per location | 10 per location | Unlimited |
| **Cost per Promotion** | $11,900 | Included | Included | Included |
| **Users** | 1 | 2 | 5 | 10 |
| **Analytics** | Basic | Basic | Advanced | Advanced |
| **Audience Segmentation** | ❌ | ❌ | ✅ | ✅ |
| **Featured Business** | ❌ | ❌ | ❌ | ✅ |
| **Featured Promotions** | ❌ | ❌ | ❌ | ✅ |
| **Support** | Email | Email | Priority | Priority |
| **Annual Discount** | N/A | 15% | 15% | 15% |

## Development Commands

### Build and Development
- `npm run dev` - Development server (http://localhost:3001)
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run linting

### Package Management
Use **npm** for package management (pnpm has store conflicts).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Payments**: MercadoPago (Preference API for one-time payments)
- **Email**: Resend (transactional emails)
- **CRM**: Systeme.io (marketing automation, tags)
- **Database**: Firebase Firestore (business records)

## Architecture

### Project Structure

```
app/
├── api/
│   └── mercadopago/
│       ├── create-trial/    # Trial payment API (7,140 COP)
│       └── webhook/          # Payment webhooks
├── negocios/                # Business landing page
├── trial/
│   ├── success/             # Payment success page
│   ├── failure/             # Payment failed page
│   └── pending/             # Payment pending page
├── payment/                 # Generic payment result pages
├── solicitar-demo/          # Demo/contact request page
├── privacidad/              # Privacy policy
├── terminos/                # Terms of service
└── cookies/                 # Cookie policy

components/
├── ui/                      # shadcn/ui base components
├── trial-signup-modal.tsx   # Email collection modal
├── trial-offer-hero.tsx     # Trial offer hero section
├── trial-countdown.tsx      # Countdown to Feb 1, 2026
├── early-bird-banner.tsx    # 50% off banner (until Jan 15)
└── [other components]

lib/
├── pricing-config.ts        # Dynamic pricing system (single source of truth)
├── email.ts                 # Resend email templates
├── firebase-admin.ts        # Firebase business records
├── systeme-io.ts            # Systeme.io CRM integration
└── utils.ts                 # General utilities
```

## Key Implementation Details

### Trial Payment Flow

1. User clicks "Comenzar Ahora" on `/negocios`
2. Modal opens (`trial-signup-modal.tsx`) → Collect email, business name, phone
3. POST `/api/mercadopago/create-trial` → Creates MercadoPago Preference
4. Redirect to MercadoPago checkout
5. User pays 7,140 COP
6. Webhook receives notification → Updates Systeme.io, Firebase, sends welcome email
7. Redirect to `/trial/success` with dashboard signup instructions

### Pricing Configuration

**Single source of truth**: `lib/pricing-config.ts`

All pricing is managed through a dynamic configuration system with three pricing periods:

1. **Pre-Launch Period** (Oct 6, 2024 - Nov 30, 2024)
   - Trial offer: $7,140 COP for Enterprise access until Feb 1, 2026
   - Early bird: 50% off first month if plan selected before Jan 15, 2025 (**Dashboard-only**)
   - Regular plans available

2. **Launch Period** (Dec 1, 2024 - Jan 31, 2026)
   - Trial offer continues
   - Early bird deadline: Jan 15, 2025 (**Dashboard-only**)
   - Regular plans available

3. **Post-Launch Period** (Feb 1, 2026+)
   - Trial offer disabled
   - Early bird disabled
   - Only regular plans available

**Important Note:**
- **Early Bird Incentive** is only displayed and applied in the **dashboard** when businesses select their plan after the trial period ends
- The marketing website does NOT show early bird promotions to avoid confusion for new sign-ups
- This ensures fairness - all businesses joining during the trial period pay the same $7,140 COP
- Early bird only rewards businesses for selecting a paid plan quickly after their trial ends

**Helper Functions:**
```typescript
getCurrentPricing() // Returns current active pricing period
formatPrice(amount) // Formats price with currency: "$70,000 COP"
formatPriceSimple(amount) // Formats price without currency: "70,000"
isTrialOfferActive() // Check if trial offer is available
isEarlyBirdActive() // Check if early bird discount is active
getTrialPrice() // Get current trial price
getEarlyBirdDiscount() // Get early bird discount percentage
calculateEarlyBirdPrice(plan, billingPeriod) // Calculate discounted price
```

**Automatic Transitions:**
- Pricing automatically transitions between periods based on current date
- Components using pricing functions automatically update
- No manual intervention needed for pricing changes

### Email System

**Service**: Resend
**Templates**: `lib/email.ts`

- Welcome email (after trial payment)
- Day 45 reminder (select your plan)
- Day 58 urgent reminder (7 days left)
- Trial expired notice
- Early bird reminder

**Note**: Reminder emails handled by Systeme.io automations (not server-side cron).

### CRM Integration

**Service**: Systeme.io
**File**: `lib/systeme-io.ts`

**Tags** (create in Systeme.io dashboard):
- Tag 1: `trial-signup` - Email collected, payment pending
- Tag 2: `trial-active` - Payment approved, trial active
- Tag 3: `paid-customer` - Selected and paid for regular plan
- Tag 4: `early-bird` - Selected plan before Jan 15
- Tag 5: `grace-period` - Trial ended, 7-day grace period
- Tag 6: `downgraded-to-free` - Downgraded to free plan

### Database

**Service**: Firebase Firestore
**File**: `lib/firebase-admin.ts`

**Business Record Structure**:
```typescript
{
  email: string
  businessName: string
  phone?: string
  planType: "gratis" | "basico" | "pro" | "enterprise"
  status: "trial" | "active" | "grace_period" | "expired"
  trialEndDate: Date
  paymentId: string
  metadata: {
    earlyBirdDiscount?: boolean
    selectedPlanAt?: Date
    remindersSent?: { day45, day58, expired }
  }
}
```

## Environment Variables

```bash
# Application
VERCEL_URL=https://v0-heroes-website.vercel.app/
NEXT_PUBLIC_BASE_URL=https://heroescolombia.com
NEXT_PUBLIC_DASHBOARD_URL=https://app.heroescolombia.com

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=TEST-xxx (or APP_USR-xxx for production)
MERCADOPAGO_WEBHOOK_SECRET=xxx (get after creating webhook)

# Email
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=Héroes Colombia <noreply@heroescolombia.com>

# CRM
SYSTEME_IO_API_KEY=xxx

# Database
FIREBASE_PROJECT_ID=heroes-cd74a
FIREBASE_ADMIN_CREDENTIALS={"type":"service_account",...}
```

## Development Guidelines

### Code Style
- TypeScript for all files
- Server Components by default
- `"use client"` only when needed
- Tailwind CSS for styling
- shadcn/ui for components

### Adding Features
1. Update `lib/pricing-config.ts` for pricing changes
2. Server actions in `app/api/` for backend logic
3. Client components in `components/` for UI
4. Always test payment flow with MercadoPago test cards

### Payment Testing

**MercadoPago Test Cards**:
- Success: `5031 7557 3453 0604` (CVV: 123, Expiry: 11/25)
- Failure: `5031 4332 1540 6351`
- Pending: Use PSE or cash payment methods

**Test Flow**:
1. Fill trial signup modal
2. Redirect to MercadoPago sandbox
3. Complete payment with test card
4. Verify webhook receives notification (check Vercel logs)
5. Check Systeme.io for tag update
6. Verify welcome email sent

## Important Dates

- **January 15, 2025**: Early bird deadline (50% off first month - **dashboard-only**, not shown on website)
- **February 1, 2026**: Trial period ends, regular pricing begins
- **February 8, 2026**: Grace period ends (7 days after trial)

## Marketing vs Dashboard Pricing

### Marketing Website (heroescolombia.com)
- **Shows**: Trial offer ($7,140 COP) and regular plan pricing
- **Does NOT show**: Early bird banners or badges
- **Goal**: Keep messaging simple and fair for all new sign-ups

### Business Dashboard (app.heroescolombia.com)
- **Shows**: All regular plan pricing
- **Shows**: Early bird discount badge (50% off) if before Jan 15, 2025
- **Applies**: Early bird discount automatically when selecting plan
- **Goal**: Reward businesses for quick decision-making after trial

## Production Checklist

Before deploying:
- [ ] Set up Resend account and verify domain
- [ ] Set up Firebase project and get Admin SDK credentials
- [ ] Create Systeme.io tags (1-6)
- [ ] Get MercadoPago production credentials
- [ ] Create webhook in MercadoPago dashboard
- [ ] Add all env variables to Vercel
- [ ] Test end-to-end payment flow
- [ ] Update terms and conditions with trial details

## Common Tasks

### Update Pricing
Edit `lib/pricing-config.ts` → Redeploy

### Add New Email Template
1. Add function to `lib/email.ts`
2. Use in webhook or API route
3. Test with Resend

### Modify Trial Terms
1. Update `components/trial-offer-hero.tsx`
2. Update `app/terminos/page.tsx`
3. Update email templates if needed

## Deployment

**Platform**: Vercel
**Auto-deploy**: On push to main branch
**Environment**: Production env vars set in Vercel dashboard

## Support & Documentation

- MercadoPago Docs: https://www.mercadopago.com.co/developers/
- Resend Docs: https://resend.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Systeme.io: https://systeme.io/help
