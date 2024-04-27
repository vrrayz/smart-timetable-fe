"use server";

import { deleteData, getData, postData } from "./apiRequest";

export const getExams = async () => {
  const request = await getData("/exam/userExams");
  if (request.statusCode === 200) {
    return request.message.exam;
  }
  return request;
};

export const addExams = async (data = {}) => {
  const request = await postData(
    "/exam/create",
    data,
    "POST",
    "application/json"
  );
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const editExams = async (data = {}, examId: number) => {
  const request = await postData(
    "/exam/edit/" + examId,
    data,
    "PATCH",
    "application/json"
  );
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const deleteExams = async (data = {}, examId: number) => {
  const request = await deleteData("/exam/delete/" + examId);
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};
