import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Héroes Colombia <noreply@heroescolombia.com>"
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.heroescolombia.com"

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

// Trial Welcome Email
export async function sendTrialWelcomeEmail({
  to,
  businessName,
}: {
  to: string
  businessName: string
}) {
  const subject = "¡Bienvenido a Héroes Colombia! 🎉"

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4a6838 0%, #c0dbaf 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #4a6838; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 ¡Bienvenido a Héroes Colombia!</h1>
    </div>
    <div class="content">
      <h2>Hola ${businessName},</h2>

      <p>¡Felicitaciones! Tu pago ha sido procesado exitosamente y ahora tienes acceso completo al plan <strong>Enterprise</strong> hasta el <strong>1 de febrero de 2026</strong>.</p>

      <div class="highlight">
        <strong>✨ Próximos Pasos:</strong>
        <ol>
          <li>Crea tu cuenta en el dashboard usando este correo electrónico</li>
          <li>Configura tu negocio y añade ubicaciones</li>
          <li>Publica tus primeras promociones</li>
          <li>Comienza a atraer clientes de la comunidad militar</li>
        </ol>
      </div>

      <p style="text-align: center;">
        <a href="${DASHBOARD_URL}" class="button">Ir al Dashboard</a>
      </p>

      <h3>¿Qué Puedes Hacer con tu Plan Enterprise?</h3>
      <ul>
        <li>✅ Ubicaciones ilimitadas</li>
        <li>✅ Promociones ilimitadas</li>
        <li>✅ Analitica avanzada</li>
        <li>✅ Promociones ilimitadas por ubicación</li>
        <li>✅ Negocio destacado en la App</li>
        <li>✅ Acceso para 10 usuarios</li>
        <li>✅ Soporte prioritario</li>
      </ul>

      <p><strong>Recordatorio Importante:</strong> Antes del 1 de febrero de 2026, podrás seleccionar tu plan de pago mensual. Si seleccionas antes del 15 de enero, obtienes un descuento adicional en tu primer mes. 🎁</p>

      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>

      <p>¡Estamos emocionados de tenerte a bordo!</p>

      <p>Saludos,<br><strong>El Equipo de Héroes Colombia</strong></p>
    </div>
    <div class="footer">
      <p>Héroes Colombia - Conectando negocios con la comunidad militar</p>
      <p><a href="https://heroescolombia.com">heroescolombia.com</a></p>
    </div>
  </div>
</body>
</html>
`

  const text = `
¡Bienvenido a Héroes Colombia!

Hola ${businessName},

¡Felicitaciones! Tu pago ha sido procesado exitosamente y ahora tienes acceso completo al plan Enterprise hasta el 1 de febrero de 2026.

Próximos Pasos:
1. Crea tu cuenta en el dashboard: ${DASHBOARD_URL}
2. Configura tu negocio y añade ubicaciones
3. Publica tus primeras promociones
4. Comienza a atraer clientes de la comunidad militar

Tu Plan Enterprise Incluye:
- Ubicaciones ilimitadas
- Promociones ilimitadas
- Analitica avanzada
- Promociones ilimitadas por ubicación
- Negocio destacado en la App
- Acceso para 10 usuarios
- Soporte prioritario

Recordatorio: Antes del 1 de febrero de 2026, podrás seleccionar tu plan de pago mensual. ¡Si seleccionas antes del 15 de enero, obtienes un descuento adicional en tu primer mes!

¿Preguntas? Contáctanos en soporte@heroescolombia.com

Saludos,
El Equipo de Héroes Colombia
`

  return sendEmail({ to, subject, html, text })
}

// Day 45 Reminder Email (45 days into trial = 74 days left)
export async function sendDay45ReminderEmail({
  to,
  businessName,
}: {
  to: string
  businessName: string
}) {
  const subject = "⏰ Recordatorio: Selecciona tu plan - Héroes Colombia"

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4a6838 0%, #c0dbaf 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #4a6838; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⏰ Es Momento de Elegir tu Plan</h1>
    </div>
    <div class="content">
      <h2>Hola ${businessName},</h2>

      <p>Han pasado 45 días desde que comenzaste tu prueba Enterprise. ¡Esperamos que estés disfrutando de todas las funcionalidades!</p>

      <div class="highlight">
        <strong>🎁 Oferta Exclusiva - Solo hasta el 15 de enero:</strong>
        <p>Si seleccionas tu plan antes del 15 de enero, obtienes <strong>50% de descuento</strong> en tu primer mes.</p>
      </div>

      <p>Tu prueba termina el <strong>1 de febrero de 2026</strong>. Antes de esa fecha, debes seleccionar uno de nuestros planes para continuar:</p>

      <ul>
        <li><strong>Plan Básico</strong> - 70,000 COP/mes</li>
        <li><strong>Plan Pro</strong> - 270,000 COP/mes</li>
        <li><strong>Plan Enterprise</strong> - Desde 800,000 COP/mes</li>
      </ul>

      <p style="text-align: center;">
        <a href="${DASHBOARD_URL}/billing" class="button">Seleccionar Plan Ahora</a>
      </p>

      <p>¿Necesitas ayuda para decidir? Contáctanos y te ayudaremos a elegir el plan perfecto para tu negocio.</p>

      <p>Saludos,<br><strong>El Equipo de Héroes Colombia</strong></p>
    </div>
  </div>
</body>
</html>
`

  const text = `
Es Momento de Elegir tu Plan - Héroes Colombia

Hola ${businessName},

Han pasado 45 días desde que comenzaste tu prueba Enterprise. ¡Esperamos que estés disfrutando de todas las funcionalidades!

OFERTA EXCLUSIVA - Solo hasta el 15 de enero:
Si seleccionas tu plan antes del 15 de enero, obtienes 50% de descuento en tu primer mes.

Tu prueba termina el 1 de febrero de 2026. Antes de esa fecha, debes seleccionar uno de nuestros planes:

- Plan Básico: 70,000 COP/mes
- Plan Pro: 270,000 COP/mes
- Plan Enterprise: Desde 800,000 COP/mes

Selecciona tu plan: ${DASHBOARD_URL}/billing

¿Necesitas ayuda? Contáctanos en soporte@heroescolombia.com

Saludos,
El Equipo de Héroes Colombia
`

  return sendEmail({ to, subject, html, text })
}

// Day 58 Urgent Reminder (7 days before trial ends)
export async function sendDay58UrgentReminderEmail({
  to,
  businessName,
}: {
  to: string
  businessName: string
}) {
  const subject = "🚨 URGENTE: Tu prueba termina en 7 días - Héroes Colombia"

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .urgent { background: #fef2f2; padding: 20px; border: 2px solid #dc2626; margin: 20px 0; text-align: center; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚨 ¡Acción Requerida!</h1>
    </div>
    <div class="content">
      <h2>Hola ${businessName},</h2>

      <div class="urgent">
        <h3 style="margin-top: 0; color: #dc2626;">Tu prueba Enterprise termina en 7 días</h3>
        <p style="font-size: 18px; margin: 0;"><strong>Fecha límite: 1 de febrero de 2026</strong></p>
      </div>

      <p><strong>Para evitar la interrupción de tu servicio, debes seleccionar un plan antes del 1 de febrero.</strong></p>

      <p>Si no seleccionas un plan, tu cuenta será degradada al plan gratuito el 1 de febrero, y perderás acceso a:</p>

      <ul>
        <li>❌ Ubicaciones adicionales (solo 1 ubicación en plan gratuito)</li>
        <li>❌ Promociones ilimitadas (solo 1 promoción activa)</li>
        <li>❌ Analytics avanzados</li>
        <li>❌ Sección destacada premium</li>
      </ul>

      <p style="text-align: center;">
        <a href="${DASHBOARD_URL}/billing" class="button">Seleccionar Plan AHORA</a>
      </p>

      <p><strong>¿Necesitas más tiempo?</strong> Contáctanos y evaluaremos opciones para tu caso específico.</p>

      <p>Saludos,<br><strong>El Equipo de Héroes Colombia</strong></p>
    </div>
  </div>
</body>
</html>
`

  const text = `
🚨 URGENTE: Tu prueba termina en 7 días

Hola ${businessName},

Tu prueba Enterprise termina en 7 días (1 de febrero de 2026).

Para evitar la interrupción de tu servicio, debes seleccionar un plan antes del 1 de febrero.

Si no seleccionas un plan, tu cuenta será degradada al plan gratuito y perderás acceso a:
- Ubicaciones adicionales
- Promociones ilimitadas
- Analytics avanzados
- Sección destacada premium

Selecciona tu plan AHORA: ${DASHBOARD_URL}/billing

¿Necesitas más tiempo? Contáctanos: soporte@heroescolombia.com

Saludos,
El Equipo de Héroes Colombia
`

  return sendEmail({ to, subject, html, text })
}

// Trial Expired Email
export async function sendTrialExpiredEmail({
  to,
  businessName,
}: {
  to: string
  businessName: string
}) {
  const subject = "Tu prueba Enterprise ha terminado - Héroes Colombia"

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #6b7280; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #4a6838; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Tu Prueba Enterprise ha Terminado</h1>
    </div>
    <div class="content">
      <h2>Hola ${businessName},</h2>

      <p>Tu prueba Enterprise terminó el 1 de febrero de 2026. Como no seleccionaste un plan de pago, tu cuenta ha sido transferida al <strong>Plan Gratuito</strong>.</p>

      <p><strong>Con el Plan Gratuito puedes:</strong></p>
      <ul>
        <li>✅ 1 ubicación</li>
        <li>✅ 1 promoción activa a la vez</li>
        <li>✅ Aparecer en búsquedas</li>
      </ul>

      <p><strong>Para recuperar el acceso Enterprise:</strong></p>
      <ul>
        <li>📍 Ubicaciones ilimitadas</li>
        <li>📣 Promociones ilimitadas</li>
        <li>📊 Analytics completos</li>
        <li>⭐ Sección destacada premium</li>
      </ul>

      <p style="text-align: center;">
        <a href="${DASHBOARD_URL}/billing" class="button">Ver Planes y Actualizar</a>
      </p>

      <p>Si tienes alguna pregunta, estamos aquí para ayudarte.</p>

      <p>Saludos,<br><strong>El Equipo de Héroes Colombia</strong></p>
    </div>
  </div>
</body>
</html>
`

  const text = `
Tu Prueba Enterprise ha Terminado - Héroes Colombia

Hola ${businessName},

Tu prueba Enterprise terminó el 1 de febrero de 2026. Tu cuenta ha sido transferida al Plan Gratuito.

Plan Gratuito incluye:
- 1 ubicación
- 1 promoción activa
- Apareces en búsquedas

Para recuperar acceso Enterprise:
- Ubicaciones ilimitadas
- Promociones ilimitadas
- Analytics completos
- Sección destacada premium

Ver planes: ${DASHBOARD_URL}/billing

¿Preguntas? soporte@heroescolombia.com

Saludos,
El Equipo de Héroes Colombia
`

  return sendEmail({ to, subject, html, text })
}

// Feedback Form Email
export async function sendFeedbackEmail({
  name,
  email,
  message,
  variant,
}: {
  name: string
  email: string
  message: string
  variant: "user" | "business"
}) {
  const adminSubject = `Nuevo Feedback ${variant === "user" ? "de Usuario" : "de Negocio"} - ${name}`
  const userSubject = "Gracias por tu retroalimentación - Héroes Colombia"

  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4a6838; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
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
        <div><a href="mailto:${email}">${email}</a></div>
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

  const userHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4a6838 0%, #c0dbaf 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Gracias por tu Retroalimentación!</h1>
    </div>
    <div class="content">
      <h2>Hola ${name},</h2>
      <p>Hemos recibido tu mensaje y lo valoramos mucho. Tu opinión nos ayuda a mejorar Héroes Colombia día a día.</p>
      <p>Nuestro equipo revisará tu mensaje y te contactaremos pronto si es necesario.</p>
      <p>Saludos,<br><strong>El Equipo de Héroes Colombia</strong></p>
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

  // Send confirmation to user
  return sendEmail({
    to: email,
    subject: userSubject,
    html: userHtml,
  })
}

// Exit Intent Form Email
export async function sendExitIntentEmail({
  name,
  email,
}: {
  name: string
  email: string
}) {
  const adminSubject = `Nuevo Feedback de Usuario - ${name}`
  const userSubject = "Gracias por tu interes en Héroes Colombia"

  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4a6838; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📝 Nuevo Interes en registrarse a Heroes Colombia</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Tipo:</div>
        <div>"Usuario"</div>
      </div>
      <div class="field">
        <div class="label">Nombre:</div>
        <div>${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div><a href="mailto:${email}">${email}</a></div>
      </div>
    </div>
  </div>
</body>
</html>
`

  const userHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4a6838 0%, #c0dbaf 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Gracias por tu Interes!</h1>
    </div>
    <div class="content">
      <h2>Hola ${name},</h2>
      <p>Hemos recibido tu mensaje y valoramos mucho tu interes en ser parte de Heroes Colombia!</p>
      <p>Nuestro equipo revisará tus datos y te contactaremos prontamente.</p>
      <p>Saludos,<br><strong>El Equipo de Héroes Colombia</strong></p>
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

  // Send confirmation to user
  return sendEmail({
    to: email,
    subject: userSubject,
    html: userHtml,
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
  const userSubject = "Tu solicitud de demo ha sido recibida - Héroes Colombia"

  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
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
        <div><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Teléfono:</div>
        <div><a href="tel:${phone}">${phone}</a></div>
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

  const userHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4a6838 0%, #c0dbaf 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Solicitud Recibida!</h1>
    </div>
    <div class="content">
      <h2>Hola ${contactName},</h2>
      <p>Gracias por tu interés en Héroes Colombia. Hemos recibido tu solicitud de demo para <strong>${businessName}</strong>.</p>
      <p>Nuestro equipo revisará tu información y te contactaremos en las próximas 24-48 horas para coordinar una demostración personalizada.</p>
      <p>Mientras tanto, puedes explorar más sobre nuestros planes y funcionalidades en <a href="https://heroescolombia.com">heroescolombia.com</a></p>
      <p>Saludos,<br><strong>El Equipo de Héroes Colombia</strong></p>
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

  // Send confirmation to user
  return sendEmail({
    to: email,
    subject: userSubject,
    html: userHtml,
  })
}

