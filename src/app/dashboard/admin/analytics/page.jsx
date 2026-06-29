import AnalyticsPageAreaChart from "@/components/dashboardPage/admin/analyticsPage/AnalyticsPageAreaChart";
import AnalyticsPageHeading from "@/components/dashboardPage/admin/analyticsPage/AnalyticsPageHeading";
import { getTotalAppointments } from "@/lib/api/appointment";
import { getTotalDoctors } from "@/lib/api/doctor";
import { getTotalPatients } from "@/lib/api/patient";
import React from "react";

export const metadata = {
  title: "Admin Analytics Dashboard | MediCare Connect",
  description:
    "Monitor and analyze platform performance, user activity, appointments, and revenue insights in the MediCare Connect admin analytics dashboard. Get real-time data visualization and actionable insights to manage the system efficiently.",
};

const AdminAnalyticsPage = async () => {
  const totalPatients = await getTotalPatients();
  const totalDoctors = await getTotalDoctors();
  const totalAppointments = await getTotalAppointments();

  return (
    <section className="my-10 px-5 overflow-hidden">
      <div>
        <AnalyticsPageHeading />
        <AnalyticsPageAreaChart
          totalPatients={totalPatients}
          totalDoctors={totalDoctors}
          totalAppointments={totalAppointments}
        />
      </div>
    </section>
  );
};

export default AdminAnalyticsPage;
