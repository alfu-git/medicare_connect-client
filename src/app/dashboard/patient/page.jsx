import FavDoctorsContainer from "@/components/dashboardPage/patient/landing/FavDoctorsContainer";
import PatientDashboardLandingHeadingContainer from "@/components/dashboardPage/patient/landing/PatientDashboardLandingHeadingContainer";
import PatientStatsContainer from "@/components/dashboardPage/patient/landing/PatientStatsContainer";
import UpcomingAppointmentsTable from "@/components/dashboardPage/patient/landing/UpcomingAppointmentsTable";
import { getAppointmentsByPatientId } from "@/lib/api/appointment";
import { getPatientFavDoctor } from "@/lib/api/doctor";
import { getPaymentsByPatientId } from "@/lib/api/payment";
import { getUser } from "@/lib/helpers/get-user";
import React from "react";

const PatientDashboardHomePage = async () => {
  const user = await getUser();

  const appointments = await getAppointmentsByPatientId(user?.id);
  const upcomingAppointments = appointments.filter(
    (appointment) => appointment?.appointmentStatus === "pending",
  );

  const payments = await getPaymentsByPatientId(user?.id);
  const favDoctors = await getPatientFavDoctor(user?.id);

  const hasUpcomingAppointment = upcomingAppointments.length > 0;
  const hasFavDoctors = favDoctors.length > 0;

  return (
    <section className="mt-10 mb-20">
      <div className="px-5">
        <div>
          {/* title + new appointment btn */}
          <PatientDashboardLandingHeadingContainer user={user} />

          {/* stats */}
          <div>
            <PatientStatsContainer
              appointments={appointments}
              payments={payments}
            />
          </div>

          {/* upcoming appointments + favorite doctors */}
          <div className="mt-20 grid grid-cols-12 gap-5">
            <div className={hasFavDoctors ? "col-span-10" : "col-span-12"}>
              {hasUpcomingAppointment ? (
                <UpcomingAppointmentsTable
                  upcomingAppointments={upcomingAppointments}
                />
              ) : (
                <p className="color-muted text-center">
                  You don’t have any upcoming appointments right now.
                </p>
              )}
            </div>

            <div className="col-span-2">
              <FavDoctorsContainer favDoctors={favDoctors} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientDashboardHomePage;
