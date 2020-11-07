import { apiClient } from "./apiClient";

export const updateUser = (data) => {
  const response = apiClient.put(`/api/users/update`, data);

  return response;
};
