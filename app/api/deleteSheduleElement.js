import { apiClient } from "./apiClient";

export const deleteSheduleElement = (data) => {
  const response = apiClient.post(`/api/shedules/delete`, data);

  return response;
};
