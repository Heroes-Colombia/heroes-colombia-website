// Mailer Lite API integration
const MAILER_LITE_API_KEY = process.env.MAILER_LITE_API_KEY!
const MAILER_LITE_API_URL = "https://connect.mailerlite.com/api"

if (!MAILER_LITE_API_KEY) {
  console.warn("[Mailer Lite] API key not configured. Set MAILER_LITE_API_KEY environment variable.")
}

export interface MailerLiteContact {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  militaryBranch?: string
  groups?: string[]
}

export interface MailerLiteContactResponse {
  id: string
  email: string
  [key: string]: any
}

export interface MailerLiteError {
  message: string
  statusCode: number
  details?: any
}

export async function addContactToMailerLite(
  contact: MailerLiteContact
): Promise<MailerLiteContactResponse> {
  if (!MAILER_LITE_API_KEY) {
    throw new Error("Mailer Lite API key is not configured")
  }

  try {
    // Build fields as a flat object matching MailerLite schema
    const fields: Record<string, string> = {}

    if (contact.firstName) {
      fields.name = contact.firstName
    }
    if (contact.lastName) {
      fields.last_name = contact.lastName
    }
    if (contact.phone) {
      fields.phone = contact.phone
    }
    if (contact.militaryBranch) {
      fields.company = contact.militaryBranch
    }

    const requestBody = {
      email: contact.email,
      groups: contact.groups,
      ...(Object.keys(fields).length > 0 && { fields }),
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Mailer Lite] Creating contact:", requestBody)
    }

    const response = await fetch(`${MAILER_LITE_API_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+MAILER_LITE_API_KEY,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      const error: MailerLiteError = {
        message: errorData.message || errorData.detail || response.statusText,
        statusCode: response.status,
        details: errorData,
      }

      // Log rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After")
        console.warn(
          `[Mailer Lite] Rate limited. Retry after: ${retryAfter} seconds`
        )
        error.message = `Rate limited. Please try again in ${retryAfter} seconds.`
      }

      console.error("[Mailer Lite] API error:", error)
      throw error
    }

    const result = await response.json()

    if (process.env.NODE_ENV === "development") {
      console.log("[Mailer Lite] Contact created successfully:", result)
    }

    return result.data
  } catch (error) {
    if ((error as MailerLiteError).statusCode) {
      throw error // Re-throw MailerLiteError
    }
    console.error("[Mailer Lite] Unexpected error:", error)
    throw new Error(
      `Failed to add contact to Mailer Lite: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
