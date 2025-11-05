// Mailer Lite API integration
const MANYCHAT_API_KEY = process.env.MANYCHAT_API_KEY!
const MANYCHAT_API_URL = "https://api.manychat.com/fb"

if (!MANYCHAT_API_KEY) {
  console.warn("[MANYCHAT] API key not configured. Set MANYCHAT_API_KEY environment variable.")
}

export interface ManyChatContact {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,

}

export interface ManyChatContactResponse {
  status: string
  [key: string]: any
}

export interface ManyChatError {
  message: string
  statusCode: number
  details?: any
}

export async function sendWelcomeWhatsAppMessage(
  contact: ManyChatContact
): Promise<ManyChatContactResponse> {
  if (!MANYCHAT_API_KEY) {
    throw new Error("MANYCHAT API key is not configured")
  }

  try {

    // ManyChat requires custom fields instead of direct phone/email import
    // due to account permissions. Store contact info in custom_fields.
    const requestBody = {
      first_name: contact.firstName,
      last_name: contact.lastName,
      whatsapp_phone: contact.phone,
      consent_phrase: "Acepto recibir notificaciones sobre el lanzamiento",
      has_opt_in_sms: true,
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[MANYCHAT] Creating contact:", requestBody)
    }

    const response = await fetch(`${MANYCHAT_API_URL}/subscriber/createSubscriber`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+MANYCHAT_API_KEY,
      },
      body: JSON.stringify(requestBody),
    })

    console.log("response: ", response)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      const error: ManyChatError = {
        message: errorData.message,
        statusCode: errorData.status,
        details: errorData,
      }

      console.error("[Many Chat] API error:", errorData.details.messages)
      throw error
    }

    const result = await response.json()

    if (process.env.NODE_ENV === "development") {
      console.log("[many Chat] Contact created successfully:", result)
    }

    try {
      await addTagToUser(result.data.id);
      console.log("tab assignated in manychat successfully")
    } catch(error) {
      console.error("[many Chat] Unexpected error:", error)
    }

    console.log("user created in manychat successfully")
    return result.data
  } catch (error) {
    if ((error as ManyChatError).statusCode) {
      throw error // Re-throw MailerLiteError
    }
    console.error("[many Chat] Unexpected error:", error)
    throw new Error(
      `Failed to add contact to Many Chat: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

async function addTagToUser(subscriber_id: number) {

  try {
    // Build fields as a flat object matching MailerLite schema
    const fields: Record<string, string> = {}

    if (!subscriber_id) {
      return
    }

    const requestBody = {
      subscriber_id,
      tag_name: "waiting-list",
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[MANYCHAT] adding tag to user:", requestBody)
    }

    const response = await fetch(`${MANYCHAT_API_URL}/subscriber/addTagByName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+MANYCHAT_API_KEY,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      const error: ManyChatError = {
        message: errorData.message,
        statusCode: errorData.status,
        details: errorData,
      }

      console.error("[Many Chat] API error:", error)
      throw error
    }

    const result = await response.json()

    if (process.env.NODE_ENV === "development") {
      console.log("[many Chat] tag assigned to contact successfully:", result)
    }

    return result.data
  } catch (error) {
    if ((error as ManyChatError).statusCode) {
      throw error // Re-throw MailerLiteError
    }
    console.error("[many Chat] Unexpected error:", error)
    throw new Error(
      `Failed to add tag to contact in Many Chat: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
    
}
