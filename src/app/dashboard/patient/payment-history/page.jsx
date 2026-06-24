import PaymentHistoryMainContent from "@/components/dashboardPage/patient/paymentHistory/PaymentHistoryMainContent";
import PaymentHistoryPageHeading from "@/components/dashboardPage/patient/paymentHistory/PaymentHistoryPageHeading";
import { getAppointmentsByPatientId } from "@/lib/api/appointment";
import { getPaymentsByPatientId } from "@/lib/api/payment";
import { getUser } from "@/lib/helpers/get-user";
import React from "react";

export async function generateMetadata({ params }) {
  const user = await getUser();

  return {
    title: `${user?.name || "User"} - Payments & Transactions | MediCare Connect`,
    description: `Track all your healthcare payments, appointment transactions, and billing history. MediCare Connect helps you stay organized and in control of your medical expenses.`,
  };
}

const PatientPaymentHistoryPage = async () => {
  const user = await getUser();

  const appointments = await getAppointmentsByPatientId(user?.id);
  const payments = await getPaymentsByPatientId(user?.id);

  return (
    <section className="my-10 px-5 overflow-hidden">
      <div>
        <PaymentHistoryPageHeading payments={payments} />
        <PaymentHistoryMainContent
          payments={payments}
          appointments={appointments}
        />
      </div>
    </section>
  );
};

export default PatientPaymentHistoryPage;
