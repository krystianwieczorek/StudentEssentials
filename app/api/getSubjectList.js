import { apiClient } from "./apiClient";
import { AxiosResponse } from "axios";

export const getSubjectList = async (day) => {
  let response = {};
  if (day == "Monday") {
    response = list1;
  } else if (day == "Tuesday") {
    response = list2;
  } else response = list3;
  return response;
};

const list1 = [
  {
    title: "Zaawan. prog. internetowe wyk",
    prof: "Bartczuk Łukasz",
    type: "elerning",
    startTime: "9:00",
    endTime: "12:00",
  },
  {
    title: "Prog. urządzeń mobilnych wyk",
    prof: "Grosser Andrzej",
    type: "elerning",
    startTime: "12.00 ",
    endTime: "15.00",
  },
];
const list2 = [
  {
    title: "Test 2",
    prof: "test test",
    type: "elerning",
    startTime: "9:00",
    endTime: "12:00",
  },
  {
    title: "Test 2",
    prof: "test test",
    type: "elerning",
    startTime: "12.00 ",
    endTime: "15.00",
  },
];
const list3 = [];
