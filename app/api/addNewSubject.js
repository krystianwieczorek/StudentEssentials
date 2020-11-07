import { apiClient } from "./apiClient";

export const addNewSubject = (data) => {
  const response = apiClient.post(`/api/shedules/add`, data);

  return response;
};
