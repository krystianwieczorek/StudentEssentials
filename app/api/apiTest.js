import { apiClient } from "./apiClient";
import { AxiosResponse } from "axios";

export const getDailyreports = async (url) => {
  const response = await apiClient.get(url);
  return response;
};
