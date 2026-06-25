import DoctorDashboardHomeHeading from "@/components/dashboardPage/doctor/dashboardHome/DoctorDashboardHomeHeading";
import DoctorDashboardHomeStats from "@/components/dashboardPage/doctor/dashboardHome/DoctorDashboardHomeStats";
import { getAllPatients } from "@/lib/api/patient";
import { getPaymentsByDoctorId } from "@/lib/api/payment";
import { getReviewsByDoctorId } from "@/lib/api/review";
import { getUser } from "@/lib/helpers/get-user";
import React from "react";

const DoctorDashboardHomePage = async () => {
  const doctor = await getUser();

  const patients = await getAllPatients(doctor?.id);

  const reviews = await getReviewsByDoctorId(doctor?.id);

  const payments = await getPaymentsByDoctorId(doctor?.id);
  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.consultationFee || 0),
    0,
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
      </div>
    </section>
  );
};

export default DoctorDashboardHomePage;
