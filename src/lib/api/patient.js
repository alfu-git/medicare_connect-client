import { fetchDataSecurely } from "../server/server";

export const getAllPatients = async (doctorId) => {
  return fetchDataSecurely(`/patients/${doctorId}`);
};

export const getTotalPatients = async () => {
  return fetchDataSecurely("/total-patients");
};
