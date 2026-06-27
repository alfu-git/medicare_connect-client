import { DashboardSideBar } from "@/components/dashboardPage/shared/DashboardSideBar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">
      <DashboardSideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
