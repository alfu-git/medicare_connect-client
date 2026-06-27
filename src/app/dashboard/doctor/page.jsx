import DoctorDashboardHomeHeading from "@/components/dashboardPage/doctor/dashboardHome/DoctorDashboardHomeHeading";
import DoctorDashboardHomeStats from "@/components/dashboardPage/doctor/dashboardHome/DoctorDashboardHomeStats";
import DoctorTodayAppointmentsTable from "@/components/dashboardPage/doctor/dashboardHome/DoctorTodayAppointmentsTable";
import { getAppointmentsByDoctorId } from "@/lib/api/appointment";
import { getAllPatients } from "@/lib/api/patient";
import { getPaymentsByDoctorId } from "@/lib/api/payment";
import { getReviewsByDoctorId } from "@/lib/api/review";
import { getUserDoctorIdentity } from "@/lib/helpers/get-doctor-identity";
import React from "react";

const DoctorDashboardHomePage = async () => {
  const doctor = await getUserDoctorIdentity();

  const patients = await getAllPatients(doctor?._id);

  const reviews = await getReviewsByDoctorId(doctor?._id);

  const payments = await getPaymentsByDoctorId(doctor?._id);
  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.consultationFee || 0),
    0,
  );

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
      <div>
        <DoctorDashboardHomeHeading doctor={doctor} />
        <DoctorDashboardHomeStats
          patients={patients}
          reviews={reviews}
          totalRevenue={totalRevenue}
        />

        <div className="mt-10">
          {todayAppointments.length > 0 ? (
            <DoctorTodayAppointmentsTable
              todayAppointments={todayAppointments}
            />
          ) : (
            <p className="mt-20 color-muted text-center">
              You don’t have any appointments today.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboardHomePage;
