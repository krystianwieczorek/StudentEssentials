import { apiClient } from "./apiClient";

export const getUserProfile = (userId) => {
  const response = apiClient.get(`/api/users/userId?userId=${userId}`);

  return response;
};
