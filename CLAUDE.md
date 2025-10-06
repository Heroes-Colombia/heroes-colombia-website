# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Heroes Colombia Website is a Next.js marketing and landing page for the Heroes Colombia platform. It serves both military personnel/users and business owners, providing information about the app's benefits, subscription management through MercadoPago, and lead generation forms. The site is built with v0.app and automatically deployed to Vercel.

## Development Commands

### Build and Development
- `pnpm dev` - Run development server (default: http://localhost:3000)
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linting

### Package Management
This project uses **pnpm** as the package manager. Always use `pnpm` instead of npm or yarn.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Forms**: react-hook-form with zod validation
- **Payment**: MercadoPago SDK for subscriptions
- **Analytics**: Vercel Analytics
- **Fonts**: Geist Sans and Geist Mono
- **Icons**: Lucide React

### Project Structure

```
app/
├── api/                    # API routes
│   └── mercadopago/       # Payment webhooks and subscription endpoints
├── negocios/              # Business landing page
├── payment/               # Payment result pages (success, failure, pending)
├── solicitar-demo/        # Demo request page
├── privacidad/            # Privacy policy
├── terminos/              # Terms of service
├── cookies/               # Cookie policy
├── layout.tsx             # Root layout with fonts and analytics
├── page.tsx               # Home page (user-facing)
└── globals.css            # Global styles and Tailwind config

components/
├── ui/                    # shadcn/ui base components
├── site-header.tsx        # Navigation header (supports user/business variants)
├── site-footer.tsx        # Footer with links
├── app-showcase.tsx       # Mobile app preview component
├── dashboard-showcase.tsx # Dashboard preview for businesses
├── feedback-form.tsx      # User feedback collection
├── exit-intent-popup.tsx  # Exit intent modal
├── countdown-timer.tsx    # Launch countdown
└── [marketing components] # Various conversion-optimized components

lib/
├── utils.ts                      # Utility functions (cn helper)
├── mercadopago.ts                # MercadoPago one-time payment
├── mercadopago-subscription.ts   # MercadoPago subscription logic
├── systeme-io.ts                 # Systeme.io integration
└── get-base-url.ts               # URL helper for different environments
```

### Key Features

1. **Dual Audience Support**: Separate pages and variants for users (military personnel) and businesses
2. **MercadoPago Integration**: Full subscription management with webhooks
3. **Marketing Components**: Conversion-optimized components (urgency banners, scarcity displays, trust badges)
4. **Form Handling**: Multiple forms with validation (demo requests, feedback, business signup)
5. **Analytics Tracking**: Vercel Analytics integration
6. **Responsive Design**: Mobile-first approach with Tailwind CSS

### State Management & Data Flow

- **No global state library**: Uses React's built-in hooks and Server Components
- **Server Components**: Pages are Server Components by default
- **Client Components**: Interactive components marked with `"use client"`
- **API Routes**: Next.js Route Handlers in `app/api/`

### Styling Approach

- **Tailwind CSS v4**: Utility-first CSS framework
- **CSS Variables**: Theme colors defined in `globals.css`
- **shadcn/ui**: Pre-built accessible components (configured in `components.json`)
- **Component Variants**: Using `class-variance-authority` for component variants
- **cn() Helper**: Utility in `lib/utils.ts` for conditional class merging

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` - Root directory
- `@/components` - Components directory
- `@/lib` - Lib directory
- `@/components/ui` - UI components
- `@/hooks` - Custom hooks

## Important Configuration

### Next.js Config
- **ESLint**: Ignored during builds (`ignoreDuringBuilds: true`)
- **TypeScript**: Build errors ignored (`ignoreBuildErrors: true`)
- **Images**: Unoptimized (for static export compatibility)

### shadcn/ui Setup
- **Style**: New York variant
- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **RSC**: React Server Components enabled
- **Icon Library**: Lucide React

### Environment Variables Required
- `MERCADOPAGO_ACCESS_TOKEN` - MercadoPago API access token
- `MERCADOPAGO_PREAPPROVAL_PLAN_ID` - Subscription plan ID (optional, created if not exists)
- Additional variables for Systeme.io integration

## Development Guidelines

### v0.app Integration
This project is managed through v0.app:
- **Auto-sync**: Changes deployed via v0.app are automatically pushed to this repository
- **Vercel Deploy**: Automatic deployment from repository to Vercel
- **Workflow**: Edit on v0.app → Auto-push to GitHub → Auto-deploy to Vercel

### Code Style
- Use TypeScript for all files
- Prefer Server Components unless interactivity is needed
- Use `"use client"` directive only when necessary
- Follow Next.js App Router conventions
- Destructure props in component signatures
- Use proper TypeScript types (avoid `any`)

### Component Patterns
- **Shadcn/ui Components**: Import from `@/components/ui/`
- **Variant Support**: Many components support `variant="user"` or `variant="business"`
- **Form Components**: Use react-hook-form with zod schemas
- **Async Components**: Server Components can be async

### Payment Integration
- **One-time Payments**: Use `lib/mercadopago.ts`
- **Subscriptions**: Use `lib/mercadopago-subscription.ts`
- **Webhooks**: Handle in `app/api/mercadopago/webhook/route.ts`
- **Success Flow**: Redirect to `/payment/success`, `/payment/failure`, or `/payment/pending`

### Adding New Pages
1. Create directory in `app/` with `page.tsx`
2. Export default function component
3. Add route to navigation if needed (in `site-header.tsx`)
4. Consider both user and business variants if applicable

### Adding New Components
1. For UI primitives: Use `pnpm dlx shadcn@latest add <component-name>`
2. For custom components: Add to `components/` directory
3. Use `"use client"` if component has interactivity
4. Export component for reuse

## Platform Support
- **Deployment**: Vercel (primary platform)
- **Auto-deployment**: Connected to v0.app
- **Environment**: Node.js (serverless functions)
