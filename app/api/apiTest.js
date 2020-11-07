import { apiClient } from "./apiClient";
import axios from "axios";

export const apiTest = async () => {
  await apiClient
    .get(`/api/shedules/${sheduleId}/${sheduleDay}`)
    .then((respo) => console.log(respo))
    .catch((err) => err);
};
