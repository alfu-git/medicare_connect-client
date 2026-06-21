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
    const doctorId = formData.get("doctorId");
    const doctorName = formData.get("doctorName");
    const doctorImage = formData.get("doctorImage");
    const doctorSpecialization = formData.get("doctorSpecialization");
    const consultationFee = formData.get("consultationFee");
    const patientId = formData.get("patientId");
    const appointmentDay = formData.get("appointmentDate");
    const appointmentTime = formData.get("appointmentTime");
    const symptoms = formData.get("symptoms");

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
        patientId: patientId || user?.id,
        doctorId,
        doctorName,
        doctorImage,
        doctorSpecialization,
        consultationFee: Number(consultationFee),
        appointmentDay,
        appointmentTime,
        symptoms,
      },
      mode: "payment",
      success_url: `${origin}/find-doctors/${doctorId}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.log("error: ", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
