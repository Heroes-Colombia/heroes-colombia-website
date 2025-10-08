// Firebase Admin SDK for server-side operations
// Install: pnpm add firebase-admin
// import admin from "firebase-admin"

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
const FIREBASE_ADMIN_CREDENTIALS = process.env.FIREBASE_ADMIN_CREDENTIALS

// Uncomment when firebase-admin is installed:
// let firebaseAdmin: admin.app.App | null = null

// function getFirebaseAdmin() {
//   if (firebaseAdmin) return firebaseAdmin

//   if (!FIREBASE_ADMIN_CREDENTIALS || !FIREBASE_PROJECT_ID) {
//     console.warn("[Firebase Admin] Credentials not configured")
//     return null
//   }

//   try {
//     const serviceAccount = JSON.parse(FIREBASE_ADMIN_CREDENTIALS)

//     firebaseAdmin = admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//       projectId: FIREBASE_PROJECT_ID,
//     })

//     console.log("[Firebase Admin] Initialized successfully")
//     return firebaseAdmin
//   } catch (error) {
//     console.error("[Firebase Admin] Initialization error:", error)
//     return null
//   }
// }

// export function getFirestore() {
//   const app = getFirebaseAdmin()
//   return app ? admin.firestore() : null
// }

// Business record interface
export interface BusinessRecord {
  id?: string
  email: string
  businessName: string
  phone?: string
  planType: "gratis" | "basico" | "pro" | "enterprise"
  status: "trial" | "active" | "grace_period" | "expired" | "cancelled"
  trialEndDate?: Date | string
  currentPeriodEnd?: Date | string
  paymentId?: string
  mercadoPagoCustomerId?: string
  createdAt: Date | string
  updatedAt: Date | string
  metadata?: {
    earlyBirdDiscount?: boolean
    earlyBirdDiscountAppliedAt?: Date | string
    selectedPlanAt?: Date | string
    remindersSent?: {
      day45?: Date | string
      day58?: Date | string
      expired?: Date | string
    }
  }
}

/**
 * Create a new business record in Firestore
 */
export async function createBusinessRecord(data: Omit<BusinessRecord, "id" | "createdAt" | "updatedAt">) {
  if (!FIREBASE_PROJECT_ID) {
    console.warn("[Firebase] Not configured. Would create business:", data)
    return { success: false, error: "Firebase not configured" }
  }

  try {
    // Uncomment when firebase-admin is installed:
    // const db = getFirestore()
    // if (!db) {
    //   return { success: false, error: "Firestore not available" }
    // }

    // const businessRef = db.collection("businesses").doc()
    // const businessData: BusinessRecord = {
    //   ...data,
    //   id: businessRef.id,
    //   createdAt: admin.firestore.FieldValue.serverTimestamp(),
    //   updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    // }

    // await businessRef.set(businessData)

    // console.log("[Firebase] Business created:", businessRef.id)
    // return { success: true, id: businessRef.id, data: businessData }

    // Temporary: Just log
    console.log("[Firebase] Would create business record:", data)
    return { success: true, message: "Firebase not yet active" }
  } catch (error) {
    console.error("[Firebase] Error creating business:", error)
    return { success: false, error }
  }
}

/**
 * Update an existing business record
 */
export async function updateBusinessRecord(businessId: string, data: Partial<BusinessRecord>) {
  if (!FIREBASE_PROJECT_ID) {
    console.warn("[Firebase] Not configured. Would update business:", businessId, data)
    return { success: false, error: "Firebase not configured" }
  }

  try {
    // Uncomment when firebase-admin is installed:
    // const db = getFirestore()
    // if (!db) {
    //   return { success: false, error: "Firestore not available" }
    // }

    // await db
    //   .collection("businesses")
    //   .doc(businessId)
    //   .update({
    //     ...data,
    //     updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    //   })

    // console.log("[Firebase] Business updated:", businessId)
    // return { success: true }

    // Temporary: Just log
    console.log("[Firebase] Would update business:", businessId, data)
    return { success: true, message: "Firebase not yet active" }
  } catch (error) {
    console.error("[Firebase] Error updating business:", error)
    return { success: false, error }
  }
}

/**
 * Get business record by email
 */
export async function getBusinessByEmail(email: string): Promise<BusinessRecord | null> {
  if (!FIREBASE_PROJECT_ID) {
    console.warn("[Firebase] Not configured. Would query business by email:", email)
    return null
  }

  try {
    // Uncomment when firebase-admin is installed:
    // const db = getFirestore()
    // if (!db) return null

    // const snapshot = await db.collection("businesses").where("email", "==", email).limit(1).get()

    // if (snapshot.empty) return null

    // const doc = snapshot.docs[0]
    // return { id: doc.id, ...doc.data() } as BusinessRecord

    // Temporary: Just log
    console.log("[Firebase] Would query business by email:", email)
    return null
  } catch (error) {
    console.error("[Firebase] Error getting business:", error)
    return null
  }
}

/**
 * Get business record by ID
 */
export async function getBusinessById(businessId: string): Promise<BusinessRecord | null> {
  if (!FIREBASE_PROJECT_ID) {
    console.warn("[Firebase] Not configured. Would get business by ID:", businessId)
    return null
  }

  try {
    // Uncomment when firebase-admin is installed:
    // const db = getFirestore()
    // if (!db) return null

    // const doc = await db.collection("businesses").doc(businessId).get()

    // if (!doc.exists) return null

    // return { id: doc.id, ...doc.data() } as BusinessRecord

    // Temporary: Just log
    console.log("[Firebase] Would get business by ID:", businessId)
    return null
  } catch (error) {
    console.error("[Firebase] Error getting business:", error)
    return null
  }
}

/**
 * Get all businesses in trial that need reminders
 */
export async function getBusinessesNeedingReminders(): Promise<BusinessRecord[]> {
  if (!FIREBASE_PROJECT_ID) {
    console.warn("[Firebase] Not configured. Would query businesses needing reminders")
    return []
  }

  try {
    // Uncomment when firebase-admin is installed:
    // const db = getFirestore()
    // if (!db) return []

    // const snapshot = await db.collection("businesses").where("status", "==", "trial").get()

    // return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BusinessRecord)

    // Temporary: Just log
    console.log("[Firebase] Would query businesses needing reminders")
    return []
  } catch (error) {
    console.error("[Firebase] Error getting businesses:", error)
    return []
  }
}
