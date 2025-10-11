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

/**
 * Assigns a tag to a contact by tag name
 * @param contactId - The ID of the contact
 * @param tagName - The name of the tag to assign
 */
async function assignTagToContact(
  contactId: string,
  tagName: string
): Promise<void> {
  if (!SYSTEME_IO_API_KEY) {
    throw new Error("Systeme.io API key is not configured")
  }

  try {
    // First, get or create the tag
    const tagId = await getOrCreateTag(tagName)

    if (process.env.NODE_ENV === "development") {
      console.log(`[Systeme.io] Assigning tag ${tagName} (${tagId}) to contact ${contactId}`)
    }

    // Assign the tag to the contact
    const response = await fetch(
      `${SYSTEME_IO_API_URL}/contacts/${contactId}/tags/${tagId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": SYSTEME_IO_API_KEY,
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[Systeme.io] Failed to assign tag:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        contactId,
        tagId,
        tagName,
      })
      throw new Error(
        `Failed to assign tag "${tagName}" to contact: ${response.statusText} - ${JSON.stringify(errorData)}`
      )
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[Systeme.io] Tag ${tagName} assigned successfully`)
    }
  } catch (error) {
    console.error("[Systeme.io] Error assigning tag:", error)
    // Don't throw - tag assignment failure shouldn't break contact creation
  }
}

/**
 * Gets an existing tag by name or creates it if it doesn't exist
 * @param tagName - The name of the tag
 * @returns The tag ID
 */
async function getOrCreateTag(tagName: string): Promise<string> {
  if (!SYSTEME_IO_API_KEY) {
    throw new Error("Systeme.io API key is not configured")
  }

  try {
    // Try to get existing tags
    const listResponse = await fetch(`${SYSTEME_IO_API_URL}/tags`, {
      method: "GET",
      headers: {
        "X-API-Key": SYSTEME_IO_API_KEY,
      },
    })

    if (listResponse.ok) {
      const tags = await listResponse.json()
      const existingTag = tags.items?.find(
        (tag: any) => tag.name.toLowerCase() === tagName.toLowerCase()
      )
      if (existingTag) {
        return existingTag.id
      }
    }

    // Tag doesn't exist, create it
    if (process.env.NODE_ENV === "development") {
      console.log(`[Systeme.io] Creating new tag: ${tagName}`)
    }

    const createResponse = await fetch(`${SYSTEME_IO_API_URL}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": SYSTEME_IO_API_KEY,
      },
      body: JSON.stringify({ name: tagName }),
    })

    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}))
      console.error("[Systeme.io] Tag creation failed:", {
        status: createResponse.status,
        statusText: createResponse.statusText,
        error: errorData,
        tagName,
      })
      throw new Error(
        `Failed to create tag "${tagName}": ${createResponse.statusText} - ${JSON.stringify(errorData)}`
      )
    }

    const newTag = await createResponse.json()

    if (process.env.NODE_ENV === "development") {
      console.log(`[Systeme.io] Tag created:`, newTag)
    }

    return newTag.id
  } catch (error) {
    console.error("[Systeme.io] Error getting/creating tag:", error)
    throw error
  }
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
      fields.push({ slug: "surname", value: contact.lastName })
    }
    if (contact.phone) {
      fields.push({ slug: "phone_number", value: contact.phone })
    }

    const requestBody = {
      email: contact.email,
      locale: contact.locale || "es", // Default to Spanish
      ...(fields.length > 0 && { fields }),
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
          console.log("[Systeme.io] Contact already exists with this email, searching for contact ID")
        }

        // Try to find the existing contact to get its ID for tag assignment
        try {
          const searchResponse = await fetch(
            `${SYSTEME_IO_API_URL}/contacts?email=${encodeURIComponent(contact.email)}`,
            {
              method: "GET",
              headers: {
                "X-API-Key": SYSTEME_IO_API_KEY,
              },
            }
          )

          if (searchResponse.ok) {
            const searchResult = await searchResponse.json()
            const existingContact = searchResult.items?.[0]

            if (existingContact && existingContact.id) {
              // Found the contact, assign tags if provided
              if (contact.tags && contact.tags.length > 0) {
                for (const tagName of contact.tags) {
                  await assignTagToContact(existingContact.id, tagName)
                }
              }

              return {
                id: existingContact.id,
                email: contact.email,
                alreadyExists: true,
              }
            }
          }
        } catch (searchError) {
          console.error("[Systeme.io] Error searching for existing contact:", searchError)
        }

        // Fallback if we couldn't find the contact
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

    // After creating the contact, assign tags if provided
    if (contact.tags && contact.tags.length > 0 && result.id) {
      for (const tagName of contact.tags) {
        await assignTagToContact(result.id, tagName)
      }
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
