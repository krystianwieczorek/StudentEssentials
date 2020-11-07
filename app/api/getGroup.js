import { apiClient } from "./apiClient";

export const getGroup = (groupId) => {
  const response = apiClient.get(`api/groups/groupId?groupId=${groupId}`);

  return response;
};
