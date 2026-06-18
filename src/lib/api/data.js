import { fetchData } from "../server/server";

export const getAllDoctors = async () => {
  return await fetchData("/doctors");
};
