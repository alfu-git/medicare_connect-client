import DoctorManageScheduleForm from "@/components/dashboardPage/doctor/manageSchedule/DoctorManageScheduleForm";
import DoctorManageSchedulePageHeading from "@/components/dashboardPage/doctor/manageSchedule/DoctorManageSchedulePageHeading";
import { addNewSchedule, deleteSchedule } from "@/lib/actions/schedule";
import { getUserDoctorIdentity } from "@/lib/helpers/get-doctor-identity";
import React from "react";

export const metadata = {
  title: "Manage Doctor Schedule | MediCare Connect",
  description:
    "Easily manage your availability, appointments, and working hours with MediCare Connect. Doctors can add, update, or remove schedules to provide better patient care and streamline booking.",
};

const DoctorManageSchedulePage = async () => {
  const doctor = await getUserDoctorIdentity();

  const addNewScheduleWrapper = async (newSchedule) => {
    "use server";
    return await addNewSchedule(doctor?._id, newSchedule);
  };

  const deleteScheduleWrapper = async (deletedScheduleData) => {
    "use server";
    return await deleteSchedule(doctor?._id, deletedScheduleData);
  };

  return (
    <section className="py-10 px-5 overflow-hidden">
      <div>
        <DoctorManageSchedulePageHeading doctor={doctor} />
        <DoctorManageScheduleForm
          doctor={doctor}
          addNewScheduleWrapper={addNewScheduleWrapper}
          deleteScheduleWrapper={deleteScheduleWrapper}
        />
      </div>
    </section>
  );
};

export default DoctorManageSchedulePage;
