import DoctorDetailsCard from "@/components/doctorDetailsPage/DoctorDetailsCard";
import { getDoctorById } from "@/lib/api/doctor";
import { getUserFromDB } from "@/lib/helpers/get-user";
import React from "react";

export async function generateMetadata({ params }) {
  const { doctorId } = await params;
  const doctor = await getDoctorById(doctorId);

  return {
    title: `${doctor?.doctorName} - ${doctor?.specialization} | MediCare Connect`,
    description: `Book an appointment with ${doctor?.doctorName}, a professional ${doctor?.specialization}. View profile, experience, patient reviews, and available schedules on MediCare Connect.`,
  };
}

const DoctorDetailsPage = async ({ params }) => {
  const {doctorId} = await params;
  const doctor = await getDoctorById(doctorId);

  const user = await getUserFromDB();

  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto px-5">
        <div>
          <DoctorDetailsCard doctor={doctor} user={user} />
        </div>
      </div>
    </section>
  );
};

export default DoctorDetailsPage;
