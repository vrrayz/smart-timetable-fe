"use server";

import { getData, postData } from "./apiRequest";

export const getClasses = async () => {
  const request = await getData("/classes/userClasses");
  if (request.statusCode === 200) {
    return request.message.class;
  }
  return request;
};

export const addClasses = async (data = {}) => {
  const request = await postData(
    "/classes/create",
    data,
    "POST",
    "application/json"
  );
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};
