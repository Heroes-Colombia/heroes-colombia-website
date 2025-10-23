import { NextRequest, NextResponse } from "next/server"
import { addContactToMailerLite } from "@/lib/mailer-lite"
import { sendFeedbackEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.name || !body.message) {
      return NextResponse.json(
        { error: "Email, name, and message are required" },
        { status: 400 }
      )
    }

    const [firstName, ...lastNameParts] = body.name.split(" ")
    const { phone } = body

    try {
      const groups = body.variant === "busines" ? [
        '169022939224606324', // clients
        '169024123862779710' // client-contact
      ] : [
        '169022922953851914', // users
        '169037101991462357' //user-contact-form
      ];
      await addContactToMailerLite({
        email: body.email,
        firstName,
        lastName: lastNameParts.join(" "),
        phone,
        groups
      })
    } catch (error) {
      console.error("[Feedback API] Error adding to Mailer Lite:", error)
    }

    // Send detailed feedback via email
    await sendFeedbackEmail({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      variant: body.variant || "user",
    })

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("[Feedback API] Error:", error)
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    )
  }
}
