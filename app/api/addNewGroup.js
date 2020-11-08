import { apiClient } from "./apiClient";

export const addNewGroup = (data) => {
  const response = apiClient.post(`/api/groups/add`, data);

  return response;
};
