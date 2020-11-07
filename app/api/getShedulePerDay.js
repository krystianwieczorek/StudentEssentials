import { apiClient } from "./apiClient";

export const getShedulePerDay = (sheduleId, sheduleDay) => {
  const response = apiClient.get(`api/shedules/${sheduleId}/${sheduleDay}`);

  return response;
};
