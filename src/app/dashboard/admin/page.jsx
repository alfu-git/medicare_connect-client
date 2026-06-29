import AdminDashboardHomeAppointmentsChart from "@/components/dashboardPage/admin/adminDashboardHome/AdminDashboardHomeAppointmentsChart";
import AdminDashboardHomeDoctorCategoryChart from "@/components/dashboardPage/admin/adminDashboardHome/AdminDashboardHomeDoctorCategoryChart";
import AdminDashboardHomeHeading from "@/components/dashboardPage/admin/adminDashboardHome/AdminDashboardHomeHeading";
import AdminDashboardHomeStats from "@/components/dashboardPage/admin/adminDashboardHome/AdminDashboardHomeStats";
import { getTotalAppointments } from "@/lib/api/appointment";
import { getTotalDoctors } from "@/lib/api/doctor";
import { getTotalPatients } from "@/lib/api/patient";
import { getTotalPayments } from "@/lib/api/payment";
import React from "react";

export const metadata = {
  title: "Admin Dashboard | MediCare Connect",
  description:
    "Manage and monitor MediCare Connect platform with the admin dashboard. View total patients, doctors, appointments, and payments with real-time analytics and insights.",
};

const AdminDashboardPage = async () => {
  const totalPatients = await getTotalPatients();
  const totalDoctors = await getTotalDoctors();
  const totalAppointments = await getTotalAppointments();
  const totalPayments = await getTotalPayments();

  return (
    <section className="my-10 px-5 overflow-hidden">
      <div>
        <AdminDashboardHomeHeading />
        <AdminDashboardHomeStats
          totalPatients={totalPatients}
          totalDoctors={totalDoctors}
          totalAppointments={totalAppointments}
          totalPayments={totalPayments}
        />
        <AdminDashboardHomeAppointmentsChart
          totalAppointments={totalAppointments}
        />
        <AdminDashboardHomeDoctorCategoryChart totalDoctors={totalDoctors} />
      </div>
    </section>
  );
};

export default AdminDashboardPage;
