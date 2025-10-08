# MercadoPago Webhook Setup - Complete Explanation

## Your Question: "How did you configure the webhook secret if the webhook doesn't exist?"

**Short Answer**: I didn't! The webhook secret is empty right now, and that's correct. ✅

The webhook will be created **AFTER** you deploy to production, not before.

---

## The Correct Order

### ❌ WRONG Order (What I initially implied)
```
1. Get webhook secret from MercadoPago
2. Add to .env
3. Deploy website
```

### ✅ CORRECT Order
```
1. Deploy website to Vercel
2. Create webhook in MercadoPago (using your deployed URL)
3. Get webhook secret from MercadoPago
4. Add secret to Vercel environment variables
5. (Optional) Redeploy or wait for next deployment
```

---

## Why This Order?

### You Need a URL First!

When creating a webhook in MercadoPago, you must provide:
```
Webhook URL: https://heroescolombia.com/api/mercadopago/webhook
```

But this URL **doesn't exist** until you deploy to Vercel!

So the steps are:

1. **Deploy to Vercel**
   - Your webhook endpoint becomes live at: `https://heroescolombia.com/api/mercadopago/webhook`
   - Right now it will log a warning: `"Secret not configured - skipping signature verification"`

2. **Create Webhook in MercadoPago**
   - Go to: https://www.mercadopago.com.co/developers/panel/webhooks
   - Click "Create webhook"
   - Enter URL: `https://heroescolombia.com/api/mercadopago/webhook`
   - Select events: `payment` (Pagos)
   - **MercadoPago generates a webhook secret** and shows it to you

3. **Add Secret to Vercel**
   - Copy the secret from MercadoPago
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Add: `MERCADOPAGO_WEBHOOK_SECRET=abc123...`
   - The next deployment will use signature verification

---

## What I Fixed Just Now

### Before (Confusing):
```bash
# .env
MERCADOPAGO_WEBHOOK_SECRET=your-webhook-secret-here
```
This implied you should already have a secret, but you can't get one until the webhook exists!

### After (Clear):
```bash
# .env
MERCADOPAGO_WEBHOOK_SECRET=

# With clear instructions:
# 1. Deploy first
# 2. Create webhook in MercadoPago
# 3. Get secret
# 4. Add here
```

---

## Security: Do You NEED the Webhook Secret?

### Development: NO ❌
During development with MercadoPago test mode:
- Webhook secret is **optional**
- Our code allows webhooks without verification
- Logs a warning: `"Secret not configured - skipping verification"`

### Production: YES ✅
In production with real payments:
- Webhook secret is **required for security**
- Prevents attackers from sending fake webhooks
- Verifies webhook actually came from MercadoPago

---

## How Webhook Signature Verification Works

### What MercadoPago Sends

When a payment happens, MercadoPago sends:

**Headers:**
```
x-signature: ts=1234567890,v1=abc123def456...
x-request-id: uuid-1234-5678
```

**Body:**
```json
{
  "type": "payment",
  "data": {
    "id": "payment_id_here"
  }
}
```

### What Our Code Does (Now)

```typescript
function verifyWebhookSignature(request: Request, body: any): boolean {
  // 1. Extract signature parts
  const xSignature = request.headers.get("x-signature")
  const xRequestId = request.headers.get("x-request-id")

  // 2. Parse signature: "ts=123,v1=hash"
  const ts = ... // timestamp
  const hash = ... // MercadoPago's signature

  // 3. Create signature string
  const signatureString = `id:${paymentId};request-id:${requestId};ts:${ts};`

  // 4. Calculate HMAC SHA256 using webhook secret
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET)
  hmac.update(signatureString)
  const expectedHash = hmac.digest("hex")

  // 5. Compare hashes
  return expectedHash === hash
}
```

If hashes match → Webhook is genuine ✅
If hashes don't match → Reject webhook (could be attacker) ❌

---

## Current Behavior

### Development (No Secret Configured)
```
Webhook receives payment notification
  ↓
verifyWebhookSignature() checks for secret
  ↓
Secret is empty
  ↓
Log warning: "Secret not configured"
  ↓
Return true (allow anyway)
  ↓
Process payment normally
```

**Result**: Works, but logs warning in Vercel logs ⚠️

### Production (Secret Configured)
```
Webhook receives payment notification
  ↓
verifyWebhookSignature() checks for secret
  ↓
Secret exists
  ↓
Calculate HMAC signature
  ↓
Compare with MercadoPago's signature
  ↓
If valid: Process payment ✅
If invalid: Reject with 403 Forbidden ❌
```

**Result**: Secure against fake webhooks 🔒

---

## Step-by-Step Production Setup

### 1. Deploy to Vercel

```bash
# Make sure all code is committed
git add .
git commit -m "feat: add trial payment system"
git push origin main

# Vercel auto-deploys
# Your webhook is now live at:
# https://heroescolombia.com/api/mercadopago/webhook
```

### 2. Create Webhook in MercadoPago

**Go to**: https://www.mercadopago.com.co/developers/panel/webhooks

**Click "Create Webhook":**
- **Name**: Heroes Colombia - Payments
- **URL**: `https://heroescolombia.com/api/mercadopago/webhook`
- **Events to receive**:
  - ✅ `payment` (Pagos)
  - ❌ merchant_order (not needed)
  - ❌ point_integration_wh (not needed)
- **Version**: v1

**Click "Save"**

### 3. Copy Webhook Secret

After saving, MercadoPago shows:
```
Webhook Created Successfully!

Secret: 7f8a9b2c4d3e5f6g1h2i3j4k5l6m7n8o
```

**⚠️ IMPORTANT**: Copy this secret NOW. MercadoPago won't show it again!

### 4. Add Secret to Vercel

**Go to**: https://vercel.com/your-project/settings/environment-variables

**Add New Variable:**
- **Key**: `MERCADOPAGO_WEBHOOK_SECRET`
- **Value**: `7f8a9b2c4d3e5f6g1h2i3j4k5l6m7n8o` (the secret you copied)
- **Environments**: Production ✅, Preview ✅, Development ❌

**Save**

### 5. Test Webhook

**Make a Test Payment:**
```bash
# Use MercadoPago test card:
# Card: 5031 7557 3453 0604
# CVV: 123
# Expiry: 11/25
```

**Check Vercel Logs:**
```bash
# Should see:
[Webhook] Received notification: { type: "payment", ... }
[Webhook] Signature verification passed ✅
[Webhook] Processing trial payment: 123456789
[Webhook] Trial payment processed successfully
```

---

## Troubleshooting

### Error: "Invalid signature"

**Cause**: Webhook secret doesn't match

**Fix**:
1. Go to MercadoPago webhooks
2. Copy the correct secret
3. Update in Vercel environment variables
4. Redeploy or wait for next deployment

### Warning: "Secret not configured"

**Cause**: `MERCADOPAGO_WEBHOOK_SECRET` is empty

**Fix**:
- **Development**: This is OK! ✅ Webhooks will work but log warning
- **Production**: Add the secret from MercadoPago dashboard

### Webhook Not Receiving Notifications

**Possible causes**:
1. Webhook URL is wrong → Check MercadoPago dashboard
2. HTTPS not enabled → Vercel provides HTTPS automatically
3. Payment is in TEST mode but webhook is in PRODUCTION → Check credentials
4. Firewall blocking MercadoPago → Check Vercel logs

**Debug steps**:
```bash
# Check if webhook endpoint is live:
curl https://heroescolombia.com/api/mercadopago/webhook

# Should return:
# {"error":"Webhook processing failed"} (405 Method Not Allowed is OK)

# Check Vercel logs for incoming requests
```

---

## Summary

**Question**: How did you configure the webhook secret?
**Answer**: I didn't! You'll configure it AFTER deploying to production.

**Current State**:
- ✅ Webhook code is complete
- ✅ Signature verification is implemented
- ✅ Works without secret (logs warning)
- ⏳ Secret will be added after creating webhook in MercadoPago

**What You Need to Do**:
1. Deploy to Vercel
2. Create webhook in MercadoPago dashboard
3. Copy the secret
4. Add to Vercel environment variables
5. Done! 🎉

**Security**:
- Development: Secret optional (warning in logs)
- Production: Secret required (protects against fake webhooks)
