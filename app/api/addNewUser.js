import { apiClient } from "./apiClient";

export const addNewUser = (data) => {
  const response = apiClient.post(`/api/users/add`, data);

  return response;
};
