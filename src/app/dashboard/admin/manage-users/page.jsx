import AdminManageUsersHeading from "@/components/dashboardPage/admin/adminManageUsers/AdminManageUsersHeading";
import AdminManageUsersTable from "@/components/dashboardPage/admin/adminManageUsers/AdminManageUsersTable";
import { deleteUser, updateUserStatus } from "@/lib/actions/user";
import { getTotalUsers } from "@/lib/api/users";
import React from "react";

export const metadata = {
  title: "Manage Users | Admin Dashboard - MediCare Connect",
  description:
    "Manage all registered users in MediCare Connect. View user details, update roles, monitor activity, and ensure smooth platform management from the admin dashboard.",
};

const AdminManageUsersPage = async () => {
  const totalUsers = await getTotalUsers();

  const updateUserStatusWrapper = async (userId, updatedStatus) => {
    "use server";
    return await updateUserStatus(userId, updatedStatus);
  };

  const deleteUserWrapper = async (userId) => {
    "use server";
    return await deleteUser(userId);
  };

  return (
    <section className="my-10 px-5 overflow-hidden">
      <div>
        <AdminManageUsersHeading totalUsers={totalUsers} />

        <AdminManageUsersTable
          totalUsers={totalUsers}
          updateUserStatusWrapper={updateUserStatusWrapper}
          deleteUserWrapper={deleteUserWrapper}
        />
      </div>
    </section>
  );
};

export default AdminManageUsersPage;
