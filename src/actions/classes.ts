"use server";

import { deleteData, getData, postData } from "./apiRequest";

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

export const editClasses = async (data = {}, classId: number) => {
  const request = await postData(
    "/classes/edit/" + classId,
    data,
    "PATCH",
    "application/json"
  );
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const deleteClasses = async (data = {}, classId: number) => {
  const request = await deleteData("/classes/delete/" + classId);
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};
