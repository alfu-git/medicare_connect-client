import PatientAppointmentsContainer from "@/components/dashboardPage/patient/myAppointments/PatientAppointmentsContainer";
import PatientAppointmentsPageEmptyState from "@/components/dashboardPage/patient/myAppointments/PatientAppointmentsPageEmptyState";
import PatientAppointmentsPageHeading from "@/components/dashboardPage/patient/myAppointments/PatientAppointmentsPageHeading";
import { getAppointmentsByPatientId } from "@/lib/api/appointment";
import { getUser } from "@/lib/helpers/get-user";
import React from "react";

export async function generateMetadata({ params }) {
  const user = await getUser();

  return {
    title: `${user?.name || "User"} - Appointments | MediCare Connect`,
    description: `${user?.name || "User"}'s MediCare Connect dashboard for managing appointments.`,
  };
}

const PatientAppointmentsPage = async () => {
  const user = await getUser();

  const appointments = await getAppointmentsByPatientId(user?.id);

  return (
    <section className="mt-10 mb-20 px-5">
      <div>
        {appointments.length > 0 ? (
          <>
            {/* heading */}
            <PatientAppointmentsPageHeading />
            {/* patient all appointments container */}
            <PatientAppointmentsContainer appointments={appointments} />
          </>
        ) : (
          <PatientAppointmentsPageEmptyState />
        )}
      </div>
    </section>
  );
};

export default PatientAppointmentsPage;
