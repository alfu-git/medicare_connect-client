import { fetchDataSecurely } from "../server/server";

export const getTotalUsers = async () => {
  return fetchDataSecurely("/total-users");
};
