import { fetchDataSecurely } from "../server/server";

export const getReviewsByDoctorId = async (doctorId) => {
  return fetchDataSecurely(`/doctor-reviews/${doctorId}`);
};
