// systeme.io API integration
const SYSTEME_IO_API_KEY = process.env.SYSTEME_IO_API_KEY!
const SYSTEME_IO_API_URL = "https://api.systeme.io/api"

if (!SYSTEME_IO_API_KEY) {
  console.warn("[Systeme.io] API key not configured. Set SYSTEME_IO_API_KEY environment variable.")
}

export interface SystemeIOContact {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  locale?: string
  tags?: string[]
}

export interface SystemeIOContactResponse {
  id: string
  email: string
  [key: string]: any
}

export interface SystemeIOError {
  message: string
  statusCode: number
  details?: any
}

export async function addContactToSystemeIO(
  contact: SystemeIOContact
): Promise<SystemeIOContactResponse> {
  if (!SYSTEME_IO_API_KEY) {
    throw new Error("Systeme.io API key is not configured")
  }

  try {
    // Only send basic fields - no custom fields to avoid schema issues
    const fields = []

    // Add standard fields to the fields array
    if (contact.firstName) {
      fields.push({ slug: "first_name", value: contact.firstName })
    }
    if (contact.lastName) {
      fields.push({ slug: "last_name", value: contact.lastName })
    }
    if (contact.phone) {
      fields.push({ slug: "phone", value: contact.phone })
    }

    const requestBody = {
      email: contact.email,
      locale: contact.locale || "es", // Default to Spanish
      ...(fields.length > 0 && { fields }),
      ...(contact.tags && contact.tags.length > 0 && { tags: contact.tags }),
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Systeme.io] Creating contact:", requestBody)
    }

    const response = await fetch(`${SYSTEME_IO_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": SYSTEME_IO_API_KEY,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Handle duplicate email (422) - this is OK, contact already exists
      if (response.status === 422 && errorData.detail?.includes("email: This value is already used")) {
        if (process.env.NODE_ENV === "development") {
          console.log("[Systeme.io] Contact already exists with this email")
        }
        // Return a success-like response since the contact exists
        return {
          id: "existing",
          email: contact.email,
          alreadyExists: true,
        }
      }

      const error: SystemeIOError = {
        message: errorData.message || errorData.detail || response.statusText,
        statusCode: response.status,
        details: errorData,
      }

      // Log rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After")
        console.warn(
          `[Systeme.io] Rate limited. Retry after: ${retryAfter} seconds`
        )
        error.message = `Rate limited. Please try again in ${retryAfter} seconds.`
      }

      console.error("[Systeme.io] API error:", error)
      throw error
    }

    const result = await response.json()

    if (process.env.NODE_ENV === "development") {
      console.log("[Systeme.io] Contact created successfully:", result)
    }

    return result
  } catch (error) {
    if ((error as SystemeIOError).statusCode) {
      throw error // Re-throw SystemeIOError
    }
    console.error("[Systeme.io] Unexpected error:", error)
    throw new Error(
      `Failed to add contact to Systeme.io: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
