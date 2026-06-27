import DoctorViewPrescriptionPageHeading from "@/components/dashboardPage/doctor/doctorViewPrescriptionPage/DoctorViewPrescriptionPageHeading";
import PrescriptionComponent from "@/components/dashboardPage/shared/PrescriptionComponent";
import { getPrescriptionByAppointmentIdForDoctor } from "@/lib/api/prescription";
import React from "react";

export const generateMetadata = async ({ params }) => {
  const { appointmentId } = await params;

  const prescription =
    await getPrescriptionByAppointmentIdForDoctor(appointmentId);

  const doctorName = prescription?.doctorName
    ? `Dr. ${prescription.doctorName.replace(/^Dr\.\s*/i, "")}`
    : "Doctor";
  const patientName = prescription?.patientName || "Patient";

  return {
    title: `Prescription for ${patientName} | ${doctorName} | MediCare Connect`,
    description: `View the digital prescription for patient ${patientName} issued by ${doctorName}. Includes detailed diagnosis, prescribed medicines, and specific health advice on MediCare Connect Smart Healthcare Platform.`,
  };
};

const DoctorViewPrescriptionPage = async ({ params }) => {
  const { appointmentId } = await params;

  const prescription =
    await getPrescriptionByAppointmentIdForDoctor(appointmentId);

  return (
    <section className="my-10 px-5 overflow-hidden">
      <div>
        <DoctorViewPrescriptionPageHeading />
        <PrescriptionComponent prescription={prescription} />
      </div>
    </section>
  );
};

export default DoctorViewPrescriptionPage;
