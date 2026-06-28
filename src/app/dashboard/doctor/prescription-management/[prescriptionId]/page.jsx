import UpdatePrescriptionForm from "@/components/dashboardPage/doctor/updatePrescriptionPage/UpdatePrescriptionForm";
import UpdatePrescriptionPageHeading from "@/components/dashboardPage/doctor/updatePrescriptionPage/UpdatePrescriptionPageHeading";
import { updatePrescription } from "@/lib/actions/prescription";
import { getPrescriptionByPrescriptionIdForDoctor } from "@/lib/api/prescription";
import React from "react";

export async function generateMetadata({ params }) {
  const { prescriptionId } = await params;

  const prescription =
    await getPrescriptionByPrescriptionIdForDoctor(prescriptionId);

  const patientName = prescription?.patient?.name || "Patient";

  return {
    title: `Update Prescription for ${patientName} | MediCare Connect`,
    description: `Update prescription details for ${patientName}, including medications, dosage, and medical instructions securely within MediCare Connect.`,
  };
}

const PrescriptionUpdatePage = async ({ params }) => {
  const { prescriptionId } = await params;

  const prescription =
    await getPrescriptionByPrescriptionIdForDoctor(prescriptionId);

  const updatePrescriptionWrapper = async (updatedData) => {
    "use server";
    return await updatePrescription(prescriptionId, updatedData);
  };

  return (
    <section className="my-10 px-5">
      <div>
        <UpdatePrescriptionPageHeading />

        <UpdatePrescriptionForm
          prescription={prescription}
          updatePrescriptionWrapper={updatePrescriptionWrapper}
        />
      </div>
    </section>
  );
};

export default PrescriptionUpdatePage;
