import PatientProfileMainSec from "@/components/dashboardPage/patient/patientProfile/PatientProfileMainSec";
import PatientProfilePageHeading from "@/components/dashboardPage/patient/patientProfile/PatientProfilePageHeading";
import { getUser } from "@/lib/helpers/get-user";
import React from "react";

export async function generateMetadata({ params }) {
  const user = await getUser();

  return {
    title: `${user?.name || "User"} - Profile | MediCare Connect`,
    description:
      "View and manage your personal profile, medical information, and account details in MediCare Connect. Keep your health records up to date and secure.",
  };
}

const PatientProfilePage = async () => {
  const user = await getUser();

  return (
    <section className="my-10 px-5">
      <div>
        <PatientProfilePageHeading />
        <PatientProfileMainSec user={user} />
      </div>
    </section>
  );
};

export default PatientProfilePage;
