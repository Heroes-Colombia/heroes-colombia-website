import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Mercado Pago sends payment notifications here
    // Verify the payment status and process accordingly

    if (body.type === "payment") {
      const paymentId = body.data.id

      // TODO: Fetch payment details from Mercado Pago API
      // const payment = await mercadopago.payment.get(paymentId)

      // If payment is approved, add customer to systeme.io
      // if (payment.status === 'approved') {
      //   const planType = payment.metadata.plan_type
      //   const billingPeriod = payment.metadata.billing_period
      //
      //   await addContactToSystemeIO({
      //     email: payment.payer.email,
      //     firstName: payment.payer.first_name,
      //     lastName: payment.payer.last_name,
      //     phone: payment.payer.phone?.number,
      //     tags: [`customer-${planType}`, `billing-${billingPeriod}`],
      //     customFields: {
      //       plan: planType,
      //       billing_period: billingPeriod,
      //       payment_id: paymentId,
      //     },
      //   })
      // }

      return NextResponse.json({ received: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Error processing Mercado Pago webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
