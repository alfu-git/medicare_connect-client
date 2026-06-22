import { redirect } from "next/navigation";
import { getUser } from "./get-user";

export const requireRole = async (role) => {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  if (user?.role !== role) {
    return redirect("/unauthorized");
  }
};
