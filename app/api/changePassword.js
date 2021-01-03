import { apiClient } from "./apiClient";

export const changePassword = (data) => {
  const response = apiClient.put(`/api/users/changePassword`, data);

  return response;
};
