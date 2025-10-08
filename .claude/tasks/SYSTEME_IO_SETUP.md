# Systeme.io Setup Guide

## Required Tags

You need to create these tags in your Systeme.io dashboard:

### Tag Configuration

| Tag ID | Tag Name | Description | When Applied |
|--------|----------|-------------|--------------|
| 1 | `trial-signup` | User filled trial signup form | When API creates MercadoPago preference |
| 2 | `trial-active` | User paid for trial successfully | When webhook receives approved payment |
| 3 | `paid-customer` | User has active paid subscription | When user selects and pays for plan |
| 4 | `early-bird` | User selected plan before Jan 15 | When user selects plan before deadline |
| 5 | `grace-period` | Trial ended, in 7-day grace period | Feb 1, 2026 when no plan selected |
| 6 | `downgraded-to-free` | Trial expired, downgraded to free | After grace period expires |

## How to Create Tags in Systeme.io

1. **Login to Systeme.io**
   - Go to https://systeme.io/
   - Login with your credentials

2. **Navigate to Contacts > Tags**
   - Click on "Contacts" in the main menu
   - Select "Tags" from the submenu

3. **Create Each Tag**
   - Click "Create a tag"
   - Enter the tag name (e.g., "trial-signup")
   - Save
   - **Note the Tag ID** from the URL or tag list (will be a number like 1, 2, 3, etc.)

4. **Update Code with Tag IDs**
   - The code currently uses placeholder IDs (1, 2, 3, etc.)
   - Update these with your actual tag IDs from Systeme.io

## Tag Flow Example

### Trial Signup Flow
```
User clicks "Comenzar Ahora"
  ↓
Fills email form
  ↓
API call to /api/mercadopago/create-trial
  ↓
Contact added to Systeme.io with tag [1] "trial-signup"
  ↓
Redirects to MercadoPago
  ↓
User completes payment
  ↓
Webhook receives notification
  ↓
Tag [2] "trial-active" added to contact
  ↓
Business record created in Firebase
  ↓
Welcome email sent via Resend
```

### Plan Selection Flow (Before Jan 15)
```
User in trial period
  ↓
Selects plan in dashboard before Jan 15
  ↓
Tag [4] "early-bird" added
  ↓
50% discount applied to first month
  ↓
Payment link sent
  ↓
Payment approved
  ↓
Tag [3] "paid-customer" added
  ↓
Tag [2] "trial-active" removed
```

### Trial Expiration Flow (No Plan Selected)
```
Feb 1, 2026 arrives
  ↓
No plan selected
  ↓
Tag [5] "grace-period" added
  ↓
Tag [2] "trial-active" removed
  ↓
7 days pass
  ↓
Tag [6] "downgraded-to-free" added
  ↓
Tag [5] "grace-period" removed
  ↓
Account limited to free plan features
```

## Automation Workflows

### Recommended Automations in Systeme.io

#### 1. **Trial Signup Welcome** (Tag: trial-signup)
- **Trigger**: When tag "trial-signup" is added
- **Action**: Send welcome email with payment link
- **Delay**: Immediate

#### 2. **Trial Active Onboarding** (Tag: trial-active)
- **Trigger**: When tag "trial-active" is added
- **Actions**:
  - Day 0: Welcome email (sent by webhook via Resend)
  - Day 7: "How's it going?" check-in email
  - Day 14: Tips & best practices email
  - Day 30: "You're halfway through!" reminder
  - Day 45: "Select your plan" reminder (sent by webhook)
  - Day 58: "7 days left!" urgent reminder (sent by webhook)

#### 3. **Early Bird Incentive** (Tag: early-bird)
- **Trigger**: When tag "early-bird" is added
- **Action**: Send confirmation email with discount details
- **Delay**: Immediate

#### 4. **Grace Period Reminder** (Tag: grace-period)
- **Trigger**: When tag "grace-period" is added
- **Actions**:
  - Day 0: "Your trial has ended" email
  - Day 3: "4 days left" reminder
  - Day 6: "Last day!" final reminder

#### 5. **Free Plan Welcome** (Tag: downgraded-to-free)
- **Trigger**: When tag "downgraded-to-free" is added
- **Action**: Send "Welcome to Free Plan" email with upgrade options
- **Delay**: Immediate

## API Integration Code Locations

### Where Tags Are Applied

1. **Trial Signup (Tag 1)**
   - File: `app/api/mercadopago/create-trial/route.ts`
   - Line: ~96
   - Code: `tags: [1]`

2. **Trial Active (Tag 2)**
   - File: `app/api/mercadopago/webhook/route.ts`
   - Line: ~85
   - Code: `tags: [2]`

3. **Paid Customer (Tag 3)**
   - File: `app/api/mercadopago/webhook/route.ts`
   - Line: ~118
   - Code: `tags: [3]`

4. **Early Bird (Tag 4)**
   - To be implemented in dashboard when user selects plan

5. **Grace Period (Tag 5)**
   - To be implemented in scheduled job (Feb 1, 2026)

6. **Downgraded to Free (Tag 6)**
   - To be implemented in scheduled job (Feb 8, 2026)

## Testing Tags

### Manual Testing Steps

1. **Test Trial Signup Tag**
   ```bash
   # In browser, complete trial signup flow
   # Check Systeme.io contacts for tag "trial-signup"
   ```

2. **Test Trial Active Tag**
   ```bash
   # Complete a test payment with MercadoPago test card
   # Check webhook logs
   # Verify tag "trial-active" was added in Systeme.io
   ```

3. **Verify Tag Application**
   ```bash
   # Check Systeme.io contact record
   # Should have both tags: trial-signup + trial-active
   ```

## Important Notes

⚠️ **Tag IDs Are Unique to Your Account**
- The tag IDs in the code (1, 2, 3, etc.) are placeholders
- You must replace them with your actual tag IDs from Systeme.io
- Tag IDs are found in the URL when editing a tag, or in the tag list

⚠️ **Don't Delete Tags**
- Once created, don't delete tags as they're referenced in code
- If you need to rename, update both Systeme.io AND code

⚠️ **Test in Sandbox First**
- Use MercadoPago test mode to verify tag application
- Check Systeme.io logs to confirm tags are being added correctly

## Next Steps

1. ✅ Create all 6 tags in Systeme.io
2. ✅ Note the tag IDs
3. ✅ Update the code with actual tag IDs:
   - `app/api/mercadopago/create-trial/route.ts` (Tag 1)
   - `app/api/mercadopago/webhook/route.ts` (Tags 2, 3)
4. ✅ Create automation workflows in Systeme.io
5. ✅ Test with a trial signup
6. ✅ Monitor Systeme.io contacts to verify tags
