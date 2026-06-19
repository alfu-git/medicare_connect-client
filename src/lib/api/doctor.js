import { fetchData } from "../server/server";

export const getAllDoctors = async (searchQueryString) => {
  return await fetchData(`/doctors?${searchQueryString}`);
};

export const getDoctorById = async (doctorId) => {
  return await fetchData(`/doctors/${doctorId}`);
};
