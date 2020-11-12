import { apiClient } from "./apiClient";

export const getMessages = (groupId) => {
  const response = apiClient.get(`api/messages/groupId?groupId=${groupId}`);

  return response;
};
