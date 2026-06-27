import PatientAppointmentDetailsCard from "@/components/dashboardPage/doctor/appointmentDetails/PatientAppointmentDetailsCard";
import { getAppointmentByAppointmentIdForDoctor } from "@/lib/api/appointment";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export async function generateMetadata({ params }) {
  const { appointmentId } = params;
  const appointment =
    await getAppointmentByAppointmentIdForDoctor(appointmentId);

  return {
    title: `Appointment with ${appointment?.patient?.name || "Patient"} | Doctor Dashboard`,
    description: `Check appointment details, patient info, and consultation updates for ${appointment?.patient?.name || "this patient"} in MediCare Connect.`,
  };
}

const DoctorAppointmentDetailsPage = async ({ params }) => {
  const { appointmentId } = await params;
  const appointment =
    await getAppointmentByAppointmentIdForDoctor(appointmentId);

  return (
    <section className="my-10 px-5">
      <div>
        <Link href={"/dashboard/doctor"} className="block mb-6">
          <Button
            className={
              "px-0 h-auto bg-transparent text-zinc-500 text-xl font-medium"
            }
          >
            <FaArrowLeftLong />
            <span>Back</span>
          </Button>
        </Link>

        <PatientAppointmentDetailsCard appointment={appointment} />
      </div>
    </section>
  );
};

export default DoctorAppointmentDetailsPage;
