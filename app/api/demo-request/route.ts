import { NextRequest, NextResponse } from "next/server"
import { addContactToSystemeIO } from "@/lib/systeme-io"
import { sendDemoRequestEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.contactName || !body.businessName) {
      return NextResponse.json(
        { error: "Email, contact name, and business name are required" },
        { status: 400 }
      )
    }

    const [firstName, ...lastNameParts] = body.contactName.split(" ")

    // Add to systeme.io (basic contact info only)
    try {
      await addContactToSystemeIO({
        email: body.email,
        firstName,
        lastName: lastNameParts.join(" "),
        phone: body.phone,
        tags: ["demo-request", "business", "lead"],
        locale: "es",
      })
    } catch (error) {
      console.error("[Demo Request API] Error adding to systeme.io:", error)
      // Continue even if systeme.io fails - email is more important
    }

    // Send detailed demo request via email
    await sendDemoRequestEmail({
      businessName: body.businessName,
      category: body.category || "",
      contactName: body.contactName,
      email: body.email,
      phone: body.phone || "",
      monthlyRevenue: body.monthlyRevenue || "",
      message: body.message || "",
    })

    return NextResponse.json(
      { success: true, message: "Demo request submitted successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("[Demo Request API] Error:", error)
    return NextResponse.json(
      { error: "Failed to submit demo request" },
      { status: 500 }
    )
  }
}
