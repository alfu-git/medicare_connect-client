import AdminManageDoctorsContainer from "@/components/dashboardPage/admin/manageDoctors/AdminManageDoctorsContainer";
import AdminManageDoctorsHeading from "@/components/dashboardPage/admin/manageDoctors/AdminManageDoctorsHeading";
import { updateDoctorStatus } from "@/lib/actions/doctor";
import { getTotalDoctors } from "@/lib/api/doctor";
import React from "react";

export const metadata = {
  title: "Doctor Management System | Admin Panel | MediCare Connect",
  description:
    "Easily manage doctor accounts, monitor availability, and control status updates from the MediCare Connect admin panel. Streamline healthcare operations with a powerful doctor management system.",
};

const AdminManageDoctorsPage = async () => {
  const totalDoctors = await getTotalDoctors();

  const updateDoctorStatusWrapper = async (doctorId, updatedStatus) => {
    "use server";
    return await updateDoctorStatus(doctorId, updatedStatus);
  };

  return (
    <section className="my-10 px-5 overflow-hidden">
      <div>
        <AdminManageDoctorsHeading totalDoctors={totalDoctors} />
        <AdminManageDoctorsContainer
          totalDoctors={totalDoctors}
          updateDoctorStatusWrapper={updateDoctorStatusWrapper}
        />
      </div>
    </section>
  );
};

export default AdminManageDoctorsPage;
