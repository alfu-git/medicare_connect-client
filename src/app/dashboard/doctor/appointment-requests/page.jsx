import AppointmentsOfAppointmentRequestsPage from "@/components/dashboardPage/doctor/appointmentRequests/AppointmentsOfAppointmentRequestsPage";
import DoctorAppointmentRequestsPageHeading from "@/components/dashboardPage/doctor/appointmentRequests/DoctorAppointmentRequestsPageHeading";
import { rejectAppointment } from "@/lib/actions/appointment";
import { getAppointmentsByDoctorId } from "@/lib/api/appointment";
import { getUserDoctorIdentity } from "@/lib/helpers/get-doctor-identity";
import React from "react";

export const metadata = {
  title: "Appointment Requests | Doctor Dashboard - MediCare Connect",
  description:
    "View and manage patient appointment requests efficiently. Doctors can accept, reject, or reschedule appointments from this dashboard in MediCare Connect.",
};

const DoctorAppointmentRequestsPage = async () => {
  const doctor = await getUserDoctorIdentity();
  const appointments = await getAppointmentsByDoctorId(doctor?._id);

  const rejectAppointmentWrapper = async (appointmentId, appointmentStatus) => {
    "use server";
    return await rejectAppointment(appointmentId, appointmentStatus);
  };

  return (
    <section className="my-10 px-5">
      <div>
        <DoctorAppointmentRequestsPageHeading doctor={doctor} />
        <AppointmentsOfAppointmentRequestsPage
          appointments={appointments}
          rejectAppointmentWrapper={rejectAppointmentWrapper}
        />
      </div>
    </section>
  );
};

export default DoctorAppointmentRequestsPage;
