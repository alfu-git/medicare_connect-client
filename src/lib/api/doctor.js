import { fetchData, fetchDataSecurely } from "../server/server";

export const getAllDoctors = async (page, searchValue, sortValue) => {
  if (!page) {
    page = 1;
  }

  return fetchData(
    `/doctors?page=${page}&search=${searchValue}&sortBy=${sortValue}`,
  );
};

export const getDoctorById = async (doctorId) => {
  return await fetchData(`/doctors/${doctorId}`);
};

export const getPatientFavDoctor = async (patientId) => {
  return fetchDataSecurely(`/favorite-doctors/${patientId}`);
};
