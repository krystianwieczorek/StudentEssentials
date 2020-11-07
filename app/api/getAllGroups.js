import { apiClient } from "./apiClient";

export const getAllGroups = () => {
  const response = apiClient.get(`api/groups`);

  return response;
};
