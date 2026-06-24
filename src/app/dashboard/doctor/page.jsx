import { getAllPatients } from "@/lib/api/patient";
import { getUser } from "@/lib/helpers/get-user";
import React from "react";

const DoctorDashboardHomePage = async () => {
  const doctor = await getUser();
  const patients = await getAllPatients(doctor?.id);
  
  return (
    <section className="my-10 px-5">
      <div>
        
      </div>
    </section>
  );
};

export default DoctorDashboardHomePage;
