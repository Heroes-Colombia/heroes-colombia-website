import { NextRequest, NextResponse } from "next/server"
import { addContactToSystemeIO } from "@/lib/systeme-io"
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

    // Add to systeme.io (basic contact info only)
    try {
      await addContactToSystemeIO({
        email: body.email,
        firstName,
        lastName: lastNameParts.join(" "),
        tags: [body.variant === "user" ? "feedback-user" : "feedback-business", "lead"],
        locale: "es",
      })
    } catch (error) {
      console.error("[Feedback API] Error adding to systeme.io:", error)
      // Continue even if systeme.io fails - email is more important
    }

    // Send detailed feedback via email
    await sendFeedbackEmail({
      name: body.name,
      email: body.email,
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
