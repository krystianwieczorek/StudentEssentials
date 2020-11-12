import { apiClient } from "./apiClient";

export const sendMessage = (data) => {
  const response = apiClient.post(`/api/messages/send`, data);

  return response;
};
