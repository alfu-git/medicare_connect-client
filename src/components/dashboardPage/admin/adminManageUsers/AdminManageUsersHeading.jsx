"use client";

import React from "react";

const AdminManageUsersHeading = ({ totalUsers }) => {
  const filterUsers = totalUsers.filter((user) => user?.role !== "admin");

  return (
    <div className="mb-7.5 flex flex-col md:flex-row justify-between gap-3">
      <div className="animate__animated animate__fadeInLeft">
        <h2 className="text-2xl font-bold text-gray-800">Manage Users 👥</h2>

        <p className="text-sm text-gray-500 mt-1 max-w-120">
          View, manage, and control all registered users. Update roles, monitor
          activity, and ensure smooth platform operations.
        </p>
      </div>

      <p className="text-2xl font-bold  color-primary animate__animated animate__fadeInRight">
        Total Users: {filterUsers.length}
      </p>
    </div>
  );
};

export default AdminManageUsersHeading;
