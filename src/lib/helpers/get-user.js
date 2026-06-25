import { headers } from "next/headers";
import { auth } from "../auth";
import { fetchData } from "../server/server";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const getUserFromDB = async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return await fetchData(`/user/${user?.id}`, {
    cache: "no-store",
  });
};
