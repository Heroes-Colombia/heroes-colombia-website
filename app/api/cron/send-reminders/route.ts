import { NextResponse } from "next/server"
import { getBusinessesNeedingReminders, updateBusinessRecord } from "@/lib/firebase-admin"
import { sendDay45ReminderEmail, sendDay58UrgentReminderEmail, sendTrialExpiredEmail } from "@/lib/email"

// This route should be called by Vercel Cron daily
// Configure in vercel.json

export async function GET(request: Request) {
  // Verify this is coming from Vercel Cron
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const businesses = await getBusinessesNeedingReminders()
    const today = new Date()
    const results = {
      day45Sent: 0,
      day58Sent: 0,
      expiredSent: 0,
      errors: 0,
    }

    for (const business of businesses) {
      const trialEndDate = new Date(business.trialEndDate || "2026-02-01")
      const trialStartDate = new Date(business.createdAt)
      const daysInTrial = Math.floor((today.getTime() - trialStartDate.getTime()) / (1000 * 60 * 60 * 24))
      const daysUntilEnd = Math.floor((trialEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

      try {
        // Day 45 reminder (74 days remaining)
        if (daysInTrial === 45 && !business.metadata?.remindersSent?.day45) {
          await sendDay45ReminderEmail({
            to: business.email,
            businessName: business.businessName,
          })
          await updateBusinessRecord(business.id!, {
            metadata: {
              ...business.metadata,
              remindersSent: {
                ...business.metadata?.remindersSent,
                day45: today.toISOString(),
              },
            },
          })
          results.day45Sent++
        }

        // Day 58 reminder (7 days remaining)
        if (daysUntilEnd === 7 && !business.metadata?.remindersSent?.day58) {
          await sendDay58UrgentReminderEmail({
            to: business.email,
            businessName: business.businessName,
          })
          await updateBusinessRecord(business.id!, {
            metadata: {
              ...business.metadata,
              remindersSent: {
                ...business.metadata?.remindersSent,
                day58: today.toISOString(),
              },
            },
          })
          results.day58Sent++
        }

        // Trial expired (on Feb 1 or after)
        if (daysUntilEnd <= 0 && business.status === "trial" && !business.metadata?.remindersSent?.expired) {
          await sendTrialExpiredEmail({
            to: business.email,
            businessName: business.businessName,
          })
          await updateBusinessRecord(business.id!, {
            status: "expired",
            metadata: {
              ...business.metadata,
              remindersSent: {
                ...business.metadata?.remindersSent,
                expired: today.toISOString(),
              },
            },
          })
          results.expiredSent++
        }
      } catch (error) {
        console.error(`[Cron] Error processing business ${business.id}:`, error)
        results.errors++
      }
    }

    return NextResponse.json({
      success: true,
      date: today.toISOString(),
      results,
    })
  } catch (error) {
    console.error("[Cron] Error in reminder job:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
