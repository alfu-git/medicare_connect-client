import { fetchData } from "../server/server";

export const getAllDoctors = async () => {
  return await fetchData("/doctors");
};

export const getDoctorById = async (doctorId) => {
  return await fetchData(`/doctors/${doctorId}`);
};
