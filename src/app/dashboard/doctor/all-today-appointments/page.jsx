import AllTodayAppointmentsContent from "@/components/dashboardPage/doctor/allTodayAppointments/AllTodayAppointmentsContent";
import { getAppointmentsByDoctorId } from "@/lib/api/appointment";
import { getUserDoctorIdentity } from "@/lib/helpers/get-doctor-identity";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export const metadata = {
  title: "Today's Appointments | Doctor Dashboard | MediCare Connect",
  description:
    "View all your pending appointments scheduled for today. Manage patient visits, stay organized, and provide timely healthcare services with MediCare Connect.",
};

const AllTodayAppointmentsPage = async () => {
  const doctor = await getUserDoctorIdentity();

  const appointments = await getAppointmentsByDoctorId(doctor?._id);

  const todayDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.appointmentDay === todayDay &&
      appointment.appointmentStatus === "pending",
  );

  return (
    <section className="my-10 px-5">
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

      <AllTodayAppointmentsContent todayAppointments={todayAppointments} />
    </section>
  );
};

export default AllTodayAppointmentsPage;
