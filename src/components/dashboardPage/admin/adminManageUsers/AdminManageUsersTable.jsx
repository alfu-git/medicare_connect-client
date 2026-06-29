"use client";

import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import { capitalizeFirstLetter } from "@/lib/helpers/capitalize-first-letter";
import { Button, Table } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GoDotFill } from "react-icons/go";
import AdminManageUsersEmptyState from "./AdminManageUsersEmptyState";

const AdminManageUsersTable = ({
  totalUsers,
  updateUserStatusWrapper,
  deleteUserWrapper,
}) => {
  const [loadingUserId, setLoadingUserId] = useState(null);

  const filterUsers = totalUsers.filter((user) => user?.role !== "admin");

  const handleStatusUpdate = async (userId, userName, status) => {
    const toastText = status === "active" ? "activate" : "suspended";

    try {
      setLoadingUserId(userId);

      const res = await updateUserStatusWrapper(userId, { status: status });

      if (res?.modifiedCount > 0) {
        toast.success(`${userName} is ${toastText}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleUserDelete = async (userId, userName) => {
    try {
      setLoadingUserId(userId);

      const res = await deleteUserWrapper(userId);

      if (res?.deletedCount > 0) {
        toast.success(`${userName} is deleted!`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoadingUserId(null);
    }
  };

  if (filterUsers.length === 0) {
    return <AdminManageUsersEmptyState />;
  }

  return (
    <Table className="bg-transparent rounded-sm animate__animated animate__backInUp">
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="w-full rounded-sm">
          <Table.Header className={"bg-[#17a2b8]/10"}>
            <Table.Column isRowHeader className={"text-center"}>
              IDENTITY
            </Table.Column>
            <Table.Column className={"text-center"}>ROLE</Table.Column>
            <Table.Column className={"text-center"}>CONTACT</Table.Column>
            <Table.Column className={"text-center"}>JOIN</Table.Column>
            <Table.Column className={"text-center"}>STATUS</Table.Column>
            <Table.Column className={"text-center"}>ACTIONS</Table.Column>
          </Table.Header>

          <Table.Body>
            {filterUsers.map((user) => (
              <Table.Row key={user?._id}>
                <Table.Cell className={"rounded-t-none rounded-bl-sm"}>
                  <div className=" max-w-fit mx-auto flex flex-col md:flex-row gap-2 items-center text-center md:text-left">
                    <figure className="border border-[#17a2b8] rounded-full">
                      <Image
                        src={user?.image}
                        alt={user?.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </figure>

                    <h4>{user?.name}</h4>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <p className={`max-w-fit mx-auto text-center font-medium`}>
                    {capitalizeFirstLetter(user?.role)}
                  </p>
                </Table.Cell>

                <Table.Cell>
                  <div className="maw-fit mx-auto text-center flex flex-col">
                    <p className="max-w-fit mx-auto">{user?.email}</p>

                    {user?.role === "patient" && (
                      <p className="max-w-fit mx-auto">{user?.number}</p>
                    )}
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <p className="max-w-fit mx-auto">
                    {new Date(user.createdAt).toLocaleString("en-BD", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Table.Cell>

                <Table.Cell>
                  <div
                    className={`max-w-fit mx-auto px-2 py-0.5 flex gap-0.5 items-center border rounded-full ${
                      user?.status === "active"
                        ? "bg-green-500/20 text-green-500 border-green-500/30"
                        : user?.status === "suspended"
                          ? "bg-red-500/20 text-red-500 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                    }`}
                  >
                    <GoDotFill className="w-3 h-3" />
                    <span>{capitalizeFirstLetter(user?.status)}</span>
                  </div>
                </Table.Cell>

                {/* reusable delete alert dialog */}
                <Table.Cell className={"rounded-t-none rounded-br-sm"}>
                  <div className="max-w-fit mx-auto flex gap-3 items-center">
                    {user?.status === "active" ? (
                      <Button
                        onClick={() =>
                          handleStatusUpdate(user?._id, user?.name, "suspended")
                        }
                        isDisabled={loadingUserId === user?._id}
                        className={
                          "px-0 h-auto bg-transparent text-red-500 font-bold"
                        }
                      >
                        {loadingUserId === user?._id
                          ? "Suspending..."
                          : "Suspend"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleStatusUpdate(user?._id, user?.name, "active")
                        }
                        isDisabled={loadingUserId === user?._id}
                        className={
                          "px-0 h-auto bg-transparent text-green-600 font-bold"
                        }
                      >
                        {loadingUserId === user?._id
                          ? "Please Wait..."
                          : "Activate"}
                      </Button>
                    )}

                    <DeleteAlertDialog
                      triggerBtnClass={
                        "max-w-fit mx-auto px-0 h-auto bg-transparent text-red-500 font-bold"
                      }
                      triggerBtnText={"Delete"}
                      dialogHeading={`Delete ${user?.name} Permanently?`}
                      dialogDesBoldText={`${user?.name} user`}
                      functionName={handleUserDelete}
                      functionParams={[user?._id, user?.name]}
                      deleteCancelBtnText={"Back"}
                      deleteConfirmBtnText={"Delete"}
                      loadingValue={loadingUserId === user?._id}
                      loadingTimeText={"Deleting..."}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default AdminManageUsersTable;
