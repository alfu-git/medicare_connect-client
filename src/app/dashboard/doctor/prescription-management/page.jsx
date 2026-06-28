import DoctorPrescriptionManagementMainSec from "@/components/dashboardPage/doctor/doctorPrescriptionManagement/DoctorPrescriptionManagementMainSec";
import DoctorPrescriptionManagementPageHeading from "@/components/dashboardPage/doctor/doctorPrescriptionManagement/DoctorPrescriptionManagementPageHeading";
import { getAppointmentsByDoctorId } from "@/lib/api/appointment";
import { getPrescriptionsByDoctorId } from "@/lib/api/prescription";
import { getUserDoctorIdentity } from "@/lib/helpers/get-doctor-identity";
import React from "react";

export const metadata = {
  title: "Prescription Management | Doctor Dashboard",
  description:
    "Efficiently create, view, and manage patient prescriptions from your doctor dashboard.",
};

const DoctorPrescriptionManagementPage = async () => {
  const doctor = await getUserDoctorIdentity();

  const appointments = await getAppointmentsByDoctorId(doctor?._id);
  const prescriptions = await getPrescriptionsByDoctorId(doctor?._id);

  return (
    <section className="my-10 px-5">
      <div>
        <DoctorPrescriptionManagementPageHeading />
        <DoctorPrescriptionManagementMainSec
          appointments={appointments}
          prescriptions={prescriptions}
        />
      </div>
    </section>
  );
};

export default DoctorPrescriptionManagementPage;
