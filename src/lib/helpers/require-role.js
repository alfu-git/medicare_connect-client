import { redirect } from "next/navigation";
import { getUserFromDB } from "./get-user";

export const requireRole = async (role) => {
  const user = await getUserFromDB();

  if (!user) {
    return redirect("/login");
  }

  if (user?.role !== role) {
    return redirect("/unauthorized");
  }
};
