import AppointmentDetailsCard from "@/components/dashboardPage/patient/myAppointments/AppointmentDetailsCard";
import { getAppointmentByAppointmentId } from "@/lib/api/appointment";
import React from "react";

export async function generateMetadata({ params }) {
  const { appointmentId } = await params;
  const appointment = await getAppointmentByAppointmentId(appointmentId);

  return {
    title: `${appointment?.doctorName || "Appointment"} Details | MediCare Connect`,
    description: `Check appointment details with ${
      appointment?.doctorName || "your doctor"
    }, including schedule, status, and more on MediCare Connect.`,
  };
}

const AppointmentDetailsPage = async ({ params }) => {
  const { appointmentId } = await params;
  const appointment = await getAppointmentByAppointmentId(appointmentId);

  return (
    <section className="my-10 px-5">
      <div>
        <AppointmentDetailsCard appointment={appointment} />
      </div>
    </section>
  );
};

export default AppointmentDetailsPage;
