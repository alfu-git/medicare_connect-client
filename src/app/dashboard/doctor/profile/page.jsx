import DoctorProfileMainContent from "@/components/dashboardPage/doctor/doctorProfile/DoctorProfileMainContent";
import DoctorProfilePageHeading from "@/components/dashboardPage/doctor/doctorProfile/DoctorProfilePageHeading";
import { updateDoctorProfile } from "@/lib/actions/doctor";
import { getUserDoctorIdentity } from "@/lib/helpers/get-doctor-identity";
import React from "react";

export async function generateMetadata() {
  const doctor = await getUserDoctorIdentity();

  const name = doctor?.doctorName || "Doctor";
  const hospital = doctor?.hospitalName || "Hospital";
  const experience = doctor?.experience || "Experienced Specialist";

  return {
    title: `${name} | Doctor Profile Dashboard`,
    description: `${name} is a professional doctor at ${hospital} with ${experience}. Manage profile, availability, appointments, and personal information easily from your dashboard.`,
  };
}

const DoctorProfilePage = async () => {
  const doctor = await getUserDoctorIdentity();

  const updateDoctorProfileWrapper = async (updatedData) => {
    "use server";
    return await updateDoctorProfile(doctor?._id, updatedData);
  };

  return (
    <section className="my-10 px-5">
      <div>
        <DoctorProfilePageHeading doctor={doctor} />

        <DoctorProfileMainContent
          doctor={doctor}
          updateDoctorProfileWrapper={updateDoctorProfileWrapper}
        />
      </div>
    </section>
  );
};

export default DoctorProfilePage;
