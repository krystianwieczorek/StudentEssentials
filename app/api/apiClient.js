import axios from "axios";
import configuration from "../helpers/configFile";

export const apiClient = axios.create({
  baseURL: configuration.apiUrl,
});
