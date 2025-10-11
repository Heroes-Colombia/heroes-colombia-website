import { NextRequest, NextResponse } from "next/server"
import { addContactToSystemeIO } from "@/lib/systeme-io"
import { sendExitIntentEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      )
    }

    const [firstName, ...lastNameParts] = body.name.split(" ")

    // Add to systeme.io for early access/exit intent
    await addContactToSystemeIO({
      email: body.email,
      firstName,
      lastName: lastNameParts.join(" "),
      tags: ["exit-intent", "lead"],
      locale: "es",
    })

    // Send detailed feedback via email
    await sendExitIntentEmail({
      name: body.name,
      email: body.email,
    })

    return NextResponse.json(
      { success: true, message: "Successfully registered for early access" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("[Early Access API] Error:", error)
    return NextResponse.json(
      { error: "Failed to register for early access" },
      { status: 500 }
    )
  }
}
