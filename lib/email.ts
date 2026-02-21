import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Héroes Colombia <noreply@heroescolombia.com>"

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

interface SendEmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  if (!RESEND_API_KEY) {
    console.warn("[Email] Resend API key not configured. Email not sent:", { to, subject })
    return { success: false, error: "API key not configured" }
  }

  try {
    const data = await resend!.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text,
    })
    console.log("[Email] Sent successfully:", data)
    return { success: true, data }

  } catch (error) {
    console.error("[Email] Error sending email:", error)
    return { success: false, error }
  }
}

export async function sendTrialAdminEmail({
  businessName,
  email,
  phone,
}: {
  businessName: string
  email: string
  phone?: string
}) {
  const subject = "Registro al trial de Héroes Colombia! 🎉"

  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #5d7a3a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e5e7e5; border-top: none; border-radius: 0 0 8px 8px; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🤑 Una nueva empresa empezo el flujo para pagar en Mercado Pago</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Negocio:</div>
            <div>${businessName}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div><a href="mailto:${email}" style="color: #032291;">${email}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone:</div>
            <div>${phone}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  // Send to admin
  await sendEmail({
    to: "jonathan@heroescolombia.com",
    subject: subject,
    html: adminHtml,
  })
}

// Feedback Form Email
export async function sendFeedbackEmail({
  name,
  email,
  phone,
  message,
  variant,
}: {
  name: string
  email: string
  phone: string
  message: string
  variant: "user" | "business"
}) {
  const adminSubject = `Nuevo Feedback ${variant === "user" ? "de Usuario" : "de Negocio"} - ${name}`

  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #5d7a3a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7e5; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📝 Nuevo Feedback Recibido</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Tipo:</div>
        <div>${variant === "user" ? "Usuario" : "Negocio"}</div>
      </div>
      <div class="field">
        <div class="label">Nombre:</div>
        <div>${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div><a href="mailto:${email}" style="color: #032291;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone:</div>
        <div>${phone}</div>
      </div>
      <div class="field">
        <div class="label">Mensaje:</div>
        <div>${message}</div>
      </div>
    </div>
  </div>
</body>
</html>
`

  // Send to admin
  await sendEmail({
    to: "jonathan@heroescolombia.com",
    subject: adminSubject,
    html: adminHtml,
  })
}

// Demo Request Email
export async function sendDemoRequestEmail({
  businessName,
  category,
  contactName,
  email,
  phone,
  monthlyRevenue,
  message,
}: {
  businessName: string
  category: string
  contactName: string
  email: string
  phone: string
  monthlyRevenue: string
  message: string
}) {
  const adminSubject = `Nueva Solicitud de Demo - ${businessName}`

  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #7fa64e; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7e5; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎯 Nueva Solicitud de Demo</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Nombre del Negocio:</div>
        <div>${businessName}</div>
      </div>
      <div class="field">
        <div class="label">Categoría:</div>
        <div>${category}</div>
      </div>
      <div class="field">
        <div class="label">Contacto:</div>
        <div>${contactName}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div><a href="mailto:${email}" style="color: #032291;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Teléfono:</div>
        <div><a href="tel:${phone}" style="color: #032291;">${phone}</a></div>
      </div>
      <div class="field">
        <div class="label">Facturación Mensual:</div>
        <div>${monthlyRevenue}</div>
      </div>
      <div class="field">
        <div class="label">Mensaje:</div>
        <div>${message}</div>
      </div>
    </div>
  </div>
</body>
</html>
`

  // Send to admin
  await sendEmail({
    to: "jonathan@heroescolombia.com",
    subject: adminSubject,
    html: adminHtml,
  })
}

