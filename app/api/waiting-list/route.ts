import { NextResponse } from "next/server"
import { addContactToMailerLite } from "@/lib/mailer-lite"
import { sendWelcomeWhatsAppMessage } from "@/lib/manychat"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, militaryBranch } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Add to systeme.io (basic contact info only)
    try {
      const groups = [
        '169022922953851914', // users
        '169024051711313264' // waiting-list
      ];
      await addContactToMailerLite({
        email,
        firstName,
        lastName,
        phone,
        militaryBranch,
        groups,
      })
    } catch (error) {
      console.error("[Feedback API] Error adding to MailerLite:", error)
    }

    // Add to systeme.io (basic contact info only)
    try {
      await sendWelcomeWhatsAppMessage({
        firstName,
        lastName,
        phone,
        email,
      })
      console.log("user created in whatsapp successfully")
    } catch (error) {
      console.error("[ManyChat API] Error adding to ManyChat:", error)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined waiting list",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[WaitingList] Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
