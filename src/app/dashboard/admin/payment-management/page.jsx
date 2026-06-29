import PaymentManagementContent from "@/components/dashboardPage/admin/paymentManagement/PaymentManagementContent";
import PaymentManagementHeading from "@/components/dashboardPage/admin/paymentManagement/PaymentManagementHeading";
import { getTotalPayments } from "@/lib/api/payment";
import React from "react";

export const metadata = {
  title: "Payment Management | Admin Dashboard | MediCare Connect",
  description:
    "Manage and monitor all payments, transactions, and billing activities efficiently in the MediCare Connect admin dashboard. Track payment status, view transaction history, and ensure secure financial operations.",
};

const AdminPaymentManagementPage = async () => {
  const totalPayments = await getTotalPayments();

  return (
    <section className="my-10 px-5">
      <div>
        <PaymentManagementHeading />
        <PaymentManagementContent totalPayments={totalPayments} />
      </div>
    </section>
  );
};

export default AdminPaymentManagementPage;
