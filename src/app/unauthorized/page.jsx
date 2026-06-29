import UnauthorizedPageContent from "@/components/unauthorizedPage/UnauthorizedPageContent";
import { getUser } from "@/lib/helpers/get-user";
import React from "react";

export const metadata = {
  title: "Unauthorized Access | MediCare Connect",
  description:
    "Access to this page is restricted. Your current role does not have the required permissions. Please navigate back or contact support for further assistance.",
};

const UnauthorizedPage = async () => {
  const user = await getUser();

  return (
    <section className="py-10 px-5">
      <div>
        <UnauthorizedPageContent role={user?.role} />
      </div>
    </section>
  );
};

export default UnauthorizedPage;
