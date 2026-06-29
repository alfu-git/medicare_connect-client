import PrescriptionComponent from "@/components/dashboardPage/shared/PrescriptionComponent";
import { getPrescriptionByAppointmentIdForPatient } from "@/lib/api/prescription";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";

export async function generateMetadata({ params }) {
  const { appointmentId } = await params;

  const prescription =
    await getPrescriptionByAppointmentIdForPatient(appointmentId);

  return {
    title: prescription
      ? `Prescription - ${prescription?.doctorName} | MediCare`
      : "Prescription Not Found | MediCare",

    description: prescription
      ? `View prescription details for your appointment with Dr. ${prescription?.doctorName}. Check medicines, dosage, and instructions.`
      : "No prescription found for this appointment. Please check again or contact support.",
  };
}

const PatientPrescriptionPage = async ({ params }) => {
  const { appointmentId } = await params;

  const prescription =
    await getPrescriptionByAppointmentIdForPatient(appointmentId);

  return (
    <section className="my-10 px-5 overflow-hidden">
      <div>
        <Link
          href={"/dashboard/patient/my-appointments"}
          className="block mb-5 animate__animated animate__fadeInLeft"
        >
          <Button
            className={"px-0 h-auto bg-transparent text-zinc-700 text-2xl"}
          >
            <MdKeyboardBackspace className="w-7 h-7" />
            Back
          </Button>
        </Link>

        <PrescriptionComponent prescription={prescription} />
      </div>
    </section>
  );
};

export default PatientPrescriptionPage;
