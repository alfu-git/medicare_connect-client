import PatientStatsContainer from "@/components/dashboardPage/patient/landing/PatientStatsContainer";
import { getAppointmentsByPatientId } from "@/lib/api/appointment";
import { getPaymentsByPatientId } from "@/lib/api/payment";
import { getUser } from "@/lib/helpers/get-user";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";

const PatientDashboardHomePage = async () => {
  const user = await getUser();

  const appointments = await getAppointmentsByPatientId(user?.id);
  const payments = await getPaymentsByPatientId(user?.id);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-5">
        <div>
          {/* title + new appointment btn */}
          <div className="mb-10 flex flex-col sm:flex-row justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user?.name}</h2>

              <p className="color-muted">
                Here&apos;s what&apos;s happening with your health today.
              </p>
            </div>

            <Link href={`/find-doctors/${user?.id}`} className="mt-1.5">
              <Button className={"bg-primary flex items-center rounded-xl"}>
                <FiPlus />
                <span className="text-base">New Appointment</span>
              </Button>
            </Link>
          </div>

          {/* stats */}
          <div>
            <PatientStatsContainer
              appointments={appointments}
              payments={payments}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientDashboardHomePage;
