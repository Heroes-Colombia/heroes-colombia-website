# Deployment Setup Guide - Heroes Colombia

## Prerequisites Checklist

Before deploying to production, you need to set up the following services:

- [ ] MercadoPago account (Production credentials)
- [ ] Resend account (Email sending)
- [ ] Firebase project (Database)
- [ ] Systeme.io account (Marketing automation)
- [ ] Vercel account (Hosting)

---

## 1. MercadoPago Setup

### Get Production Credentials

1. **Login to MercadoPago**
   - Go to https://www.mercadopago.com.co/
   - Login with your business account

2. **Navigate to Credentials**
   - Go to https://www.mercadopago.com.co/developers/panel/credentials
   - Switch to **"Credentials de Producción"** tab

3. **Copy Credentials**
   ```
   Access Token: APP_USR-XXXXXXXXXX
   Public Key: APP_USR-XXXXXXXXXX
   Client ID: XXXXXXXXXX (optional)
   Client Secret: XXXXXXXXXX (optional)
   ```

4. **Add to Environment Variables**
   ```bash
   MERCADOPAGO_ACCESS_TOKEN=APP_USR-your-production-token
   NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-your-production-public-key
   ```

### Configure Webhook

1. **Go to Webhooks Section**
   - https://www.mercadopago.com.co/developers/panel/webhooks

2. **Create New Webhook**
   - **URL**: `https://heroescolombia.com/api/mercadopago/webhook`
   - **Events**: Select "Pagos" (Payments)
   - **Version**: v1

3. **Get Webhook Secret**
   - Copy the webhook signature secret
   - Add to environment variables:
   ```bash
   MERCADOPAGO_WEBHOOK_SECRET=your-webhook-secret
   ```

4. **Test Webhook** (After deployment)
   - Make a test payment
   - Check Vercel logs for webhook notification
   - Verify payment processing

---

## 2. Resend Setup (Email Service)

### Create Account

1. **Sign Up**
   - Go to https://resend.com/
   - Create an account

2. **Verify Domain**
   - Go to "Domains" section
   - Add domain: `heroescolombia.com`
   - Add DNS records provided by Resend:
     ```
     Type: TXT
     Name: _resend
     Value: [provided by Resend]

     Type: CNAME
     Name: resend._domainkey
     Value: [provided by Resend]
     ```
   - Wait for verification (can take up to 48 hours)

3. **Get API Key**
   - Go to "API Keys" section
   - Create new API key
   - Name: "Heroes Colombia Production"
   - Copy the key

4. **Add to Environment Variables**
   ```bash
   RESEND_API_KEY=re_XXXXXXXXXX
   RESEND_FROM_EMAIL=Héroes Colombia <noreply@heroescolombia.com>
   ```

### Install Resend Package

```bash
cd heroes-colombia-website
pnpm add resend
```

### Uncomment Code in `lib/email.ts`

After installing Resend, uncomment the following lines:

- Line 3: `import { Resend } from "resend"`
- Line 7: `const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null`
- Lines 25-32: `const data = await resend!.emails.send(...)`

---

## 3. Firebase Setup

### Create Project

1. **Go to Firebase Console**
   - https://console.firebase.google.com/

2. **Create New Project**
   - Name: "Heroes Colombia"
   - Enable Google Analytics (optional)

3. **Create Firestore Database**
   - Go to "Firestore Database"
   - Create database in production mode
   - Location: `southamerica-east1` (São Paulo - closest to Colombia)

4. **Set Up Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Businesses collection - read/write only for authenticated users
       match /businesses/{businessId} {
         allow read, write: if request.auth != null && request.auth.token.email == resource.data.email;
       }
     }
   }
   ```

### Get Admin SDK Credentials

1. **Generate Service Account**
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save the JSON file securely

2. **Add to Environment Variables**
   ```bash
   FIREBASE_PROJECT_ID=heroes-colombia-xxxxx
   FIREBASE_ADMIN_CREDENTIALS='{"type":"service_account","project_id":"..."}' # Entire JSON as string
   ```

### Install Firebase Admin

```bash
pnpm add firebase-admin
```

### Uncomment Code in `lib/firebase-admin.ts`

After installing firebase-admin, uncomment:

- Line 3: `import admin from "firebase-admin"`
- Lines 7-30: Firebase admin initialization code
- All function implementations (replace temporary logging)

---

## 4. Systeme.io Setup

### Create Tags

Follow the guide in `.claude/tasks/SYSTEME_IO_SETUP.md`

**Quick Steps:**

1. Login to Systeme.io
2. Go to Contacts → Tags
3. Create these tags:
   - `trial-signup` (will be Tag ID 1)
   - `trial-active` (will be Tag ID 2)
   - `paid-customer` (will be Tag ID 3)
   - `early-bird` (will be Tag ID 4)
   - `grace-period` (will be Tag ID 5)
   - `downgraded-to-free` (will be Tag ID 6)

4. **Note the actual Tag IDs** and update code:
   - `app/api/mercadopago/create-trial/route.ts:96` → Tag 1
   - `app/api/mercadopago/webhook/route.ts:85` → Tag 2
   - `app/api/mercadopago/webhook/route.ts:118` → Tag 3

### API Key Already Configured
Your Systeme.io API key is already in `.env`:
```bash
SYSTEME_IO_API_KEY=tt5b5ifik2qspkuwimgcp8sterm0pa7skg0slvk5u2x9y32gvn9w5l7rc873t828
```

---

## 5. Vercel Deployment

### Connect Repository

1. **Login to Vercel**
   - Go to https://vercel.com/
   - Connect your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import `heroes-colombia-website` repository

### Configure Environment Variables

Add all environment variables in Vercel dashboard:

```bash
# Application
NEXT_PUBLIC_BASE_URL=https://heroescolombia.com
NEXT_PUBLIC_DASHBOARD_URL=https://app.heroescolombia.com

# MercadoPago (PRODUCTION)
MERCADOPAGO_ACCESS_TOKEN=APP_USR-your-production-token
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-your-production-public-key
MERCADOPAGO_WEBHOOK_SECRET=your-webhook-secret

# Email
RESEND_API_KEY=re_XXXXXXXXXX
RESEND_FROM_EMAIL=Héroes Colombia <noreply@heroescolombia.com>

# Systeme.io
SYSTEME_IO_API_KEY=tt5b5ifik2qspkuwimgcp8sterm0pa7skg0slvk5u2x9y32gvn9w5l7rc873t828

# Firebase
FIREBASE_PROJECT_ID=heroes-colombia-xxxxx
FIREBASE_ADMIN_CREDENTIALS={"type":"service_account",...} # Full JSON
```

### Deploy

1. **Trigger Deployment**
   - Click "Deploy"
   - Wait for build to complete

2. **Set Custom Domain**
   - Go to Project Settings → Domains
   - Add domain: `heroescolombia.com`
   - Add DNS records as instructed by Vercel

---

## 6. Testing Checklist

### Before Going Live

- [ ] Test trial signup flow with MercadoPago test cards
- [ ] Verify webhook receives payment notifications
- [ ] Check Systeme.io tags are applied correctly
- [ ] Send test emails (check spam folder)
- [ ] Verify Firebase business records are created
- [ ] Test success/failure/pending pages
- [ ] Verify dashboard link works

### Production Testing

- [ ] Make a real $1 test payment
- [ ] Verify all integrations work
- [ ] Check email delivery
- [ ] Verify data in Firebase
- [ ] Check Systeme.io contact created
- [ ] Monitor Vercel logs for errors

---

## 7. Monitoring & Maintenance

### Daily Checks

- Check Vercel logs for errors
- Monitor MercadoPago transactions
- Review Systeme.io contacts
- Check email delivery rates

### Weekly Tasks

- Review Firebase database size
- Check for failed webhooks
- Monitor conversion rates
- Review customer feedback

### Important Dates

- **Jan 15, 2025**: Early bird deadline - check how many businesses selected plans
- **Feb 1, 2026**: Trial end date - run script to downgrade accounts without plans
- **Feb 8, 2026**: Grace period end - finalize downgrades

---

## 8. Required Manual Setup After Code is Ready

### A. Install Missing Packages

```bash
cd heroes-colombia-website
pnpm add resend firebase-admin
```

### B. Uncomment Production Code

1. **lib/email.ts**
   - Lines 3, 7, 25-32 (Resend integration)

2. **lib/firebase-admin.ts**
   - Line 3 (Firebase import)
   - Lines 7-200+ (All Firebase functions)

### C. Update Tag IDs

Replace placeholder tag IDs (1, 2, 3, etc.) with actual Systeme.io tag IDs:

- `app/api/mercadopago/create-trial/route.ts`
- `app/api/mercadopago/webhook/route.ts`

---

## 9. Troubleshooting

### Emails Not Sending

- Verify Resend API key is correct
- Check domain verification status
- Look for errors in Vercel logs
- Check email in spam folder

### Webhook Not Receiving Payments

- Verify webhook URL is correct
- Check HTTPS is enabled
- Review MercadoPago webhook logs
- Verify webhook secret matches

### Firebase Errors

- Check service account JSON is valid
- Verify Firestore is enabled
- Check security rules allow writes
- Review Vercel function logs

### Systeme.io Not Tagging

- Verify API key is correct
- Check tag IDs match your account
- Review Systeme.io API logs
- Test with Postman/curl first

---

## 10. Support Contacts

- **MercadoPago**: https://www.mercadopago.com.co/ayuda
- **Resend**: support@resend.com
- **Firebase**: https://firebase.google.com/support
- **Vercel**: https://vercel.com/support
- **Systeme.io**: https://systeme.io/help

---

## Next Steps

1. ✅ Set up MercadoPago production credentials
2. ✅ Create Resend account and verify domain
3. ✅ Set up Firebase project
4. ✅ Create Systeme.io tags
5. ✅ Install missing packages (resend, firebase-admin)
6. ✅ Uncomment production code
7. ✅ Deploy to Vercel
8. ✅ Test everything end-to-end
9. ✅ Go live! 🚀
