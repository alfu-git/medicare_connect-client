import PaymentSuccess from "@/components/paymentSuccessPage/PaymentSuccess";
import { postAppointmentData } from "@/lib/actions/appointment";
import { savePaymentData } from "@/lib/actions/payment";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    metadata,
    payment_intent,
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    console.log("payment success");
    try {
      await savePaymentData({
        ...metadata,
        sessionId: session_id,
        transactionId: payment_intent?.id,
      });

      // Save the appointment now that payment is confirmed
      await postAppointmentData({
        patientId: metadata.patientId,
        doctorId: metadata.doctorId,
        appointmentDate: metadata.appointmentDate,
        appointmentTime: metadata.appointmentTime,
        symptoms: metadata.symptoms,
        appointmentStatus: "pending",
        paymentStatus: "paid",
      });
    } catch (err) {
      console.log(err);
    }

    return (
      <section id="success">
        <PaymentSuccess customerEmail={customerEmail} />
      </section>
    );
  }
}
