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
    try {
      const res = await savePaymentData({
        ...metadata,
        sessionId: session_id,
        transactionId: payment_intent?.id,
      });
      const paymentId = res?.insertedId;

      // Save the appointment now that payment is confirmed
      await postAppointmentData({
        patientId: metadata.patientId,
        patientName: metadata.patientName,
        patientImage: metadata.patientImage,
        patientAge: metadata.patientAge,
        patientGender: metadata.patientGender,
        patientNumber: metadata.patientNumber,
        doctorId: metadata.doctorId,
        doctorName: metadata.doctorName,
        doctorImage: metadata.doctorImage,
        doctorSpecialization: metadata.doctorSpecialization,
        appointmentDay: metadata.appointmentDay,
        appointmentTime: metadata.appointmentTime,
        symptoms: metadata.symptoms,
        appointmentStatus: "pending",
        paymentStatus: "paid",
        paymentId,
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
