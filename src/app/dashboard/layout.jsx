import { DashboardSideBar } from "@/components/dashboardPage/shared/DashboardSideBar";
import { getUserFromDB } from "@/lib/helpers/get-user";
import React from "react";

const DashboardLayout = async ({ children }) => {
  const user = await getUserFromDB();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">
      <DashboardSideBar user={user} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
