import { fetchDataSecurely } from "../server/server";
import { getUser } from "./get-user";

export const getUserDoctorIdentity = async () => {
  const user = await getUser();

  return await fetchDataSecurely(`/doctor-identity/${user?.id}`, {
    cache: "no-store",
  });
};
