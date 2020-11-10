import { apiClient } from "./apiClient";

export const editSubject = (data) => {
  const response = apiClient.put(`/api/shedules/edit`, data);

  return response;
};
