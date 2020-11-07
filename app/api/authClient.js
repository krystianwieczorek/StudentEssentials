import { apiClient } from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authClient = async (data) => {
  const response = apiClient.post(`/api/users/authenticate`, data);
  return response;
};
