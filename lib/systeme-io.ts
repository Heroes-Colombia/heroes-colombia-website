// systeme.io API integration
const SYSTEME_IO_API_KEY = process.env.SYSTEME_IO_API_KEY!
const SYSTEME_IO_API_URL = "https://systeme.io/api/v1"

if (!SYSTEME_IO_API_KEY) {
  console.warn("[Systeme.io] API key not configured. Set SYSTEME_IO_API_KEY environment variable.")
}

export interface SystemeIOContact {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  tags?: string[]
  customFields?: Record<string, string>
}

export async function addContactToSystemeIO(contact: SystemeIOContact) {
  try {
    const response = await fetch(`${SYSTEME_IO_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": SYSTEME_IO_API_KEY,
      },
      body: JSON.stringify({
        email: contact.email,
        first_name: contact.firstName,
        last_name: contact.lastName,
        phone: contact.phone,
        tags: contact.tags || [],
        custom_fields: contact.customFields || {},
      }),
    })

    if (!response.ok) {
      throw new Error(`systeme.io API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error adding contact to systeme.io:", error)
    throw error
  }
}
