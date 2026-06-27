import DoctorPrescriptionForm from "@/components/dashboardPage/doctor/doctorPrescriptionPage/DoctorPrescriptionForm";
import DoctorPrescriptionPageHeading from "@/components/dashboardPage/doctor/doctorPrescriptionPage/DoctorPrescriptionPageHeading";
import { postPrescription } from "@/lib/actions/prescription";
import { getAppointmentByAppointmentIdForDoctor } from "@/lib/api/appointment";

export async function generateMetadata({ params }) {
  const { appointmentId } = await params;

  return {
    title: `Create Prescription | Appointment #${appointmentId} | MediCare Connect`,
    description: `Generate and manage a detailed prescription for appointment ID ${appointmentId}. Doctors can add medicines, dosage instructions, and patient notes efficiently within MediCare Connect.`,
  };
}

const AppointmentPrescriptionPage = async ({ params }) => {
  const { appointmentId } = await params;

  const appointment =
    await getAppointmentByAppointmentIdForDoctor(appointmentId);

  const postPrescriptionWrapper = async (prescriptionData) => {
    "use server";
    return await postPrescription(prescriptionData);
  };

  return (
    <section className="my-10 px-5">
      <div>
        <DoctorPrescriptionPageHeading />
        <DoctorPrescriptionForm
          appointment={appointment}
          postPrescriptionWrapper={postPrescriptionWrapper}
        />
      </div>
    </section>
  );
};

export default AppointmentPrescriptionPage;
