import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUser } from "@/lib/helpers/get-user";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const user = await getUser();

    const formData = await request.formData();
    const doctorName = formData.get("doctorName");
    const doctorId = formData.get("doctorId");
    const consultationFee = formData.get("consultationFee");

    // const body = await request.json();
    // const { doctorId, doctorName, consultationFee, appointmentId } = body;

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round((consultationFee / 127.638) * 100),
            product_data: {
              name: doctorName,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        patientId: user?.id,
        doctorId,
        doctorName,
        consultationFee: Number(consultationFee),
        // appointmentId,
      },
      mode: "payment",
      success_url: `${origin}/find-doctors/${doctorId}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url || 303);
  } catch (err) {
    console.log("error: ", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
