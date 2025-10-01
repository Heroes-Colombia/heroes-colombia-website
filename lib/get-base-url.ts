// Utility to get the base URL for the application
// Automatically detects Vercel deployment URLs or uses localhost

export function getBaseUrl() {
  // Check if we're on the server
  if (typeof window === "undefined") {
    // Vercel automatically provides these environment variables
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    }

    // Fallback to localhost for local development
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }

  // On the client, use the current origin
  return window.location.origin
}
