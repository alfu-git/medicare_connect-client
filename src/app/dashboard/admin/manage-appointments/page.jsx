import AdminManageAppointmentsContent from "@/components/dashboardPage/admin/adminManageAppointments/AdminManageAppointmentsContent";
import AdminManageAppointmentsHeading from "@/components/dashboardPage/admin/adminManageAppointments/AdminManageAppointmentsHeading";
import { getTotalAppointments } from "@/lib/api/appointment";
import React from "react";

export const metadata = {
  title: "Manage Appointments | Admin Dashboard | MediCare Connect",
  description:
    "Efficiently manage and monitor all patient appointments in the MediCare Connect admin dashboard. View, update, and organize bookings with ease for a seamless healthcare management experience.",
};

const AdminManageAppointmentsPage = async () => {
  const totalAppointments = await getTotalAppointments();

  return (
    <section className="my-10 px-5 overflow-hidden">
      <div>
        <AdminManageAppointmentsHeading totalAppointments={totalAppointments} />
        <AdminManageAppointmentsContent totalAppointments={totalAppointments} />
      </div>
    </section>
  );
};

export default AdminManageAppointmentsPage;
