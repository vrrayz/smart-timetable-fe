"use server";

import { deleteData, getData, postData } from "./apiRequest";

export const getTasks = async () => {
  const request = await getData("/task/userTasks");
  if (request.statusCode === 200) {
    return request.message.task;
  }
  return request;
};

export const addTasks = async (data = {}) => {
  const request = await postData(
    "/task/create",
    data,
    "POST",
    "application/json"
  );
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const editTasks = async (data = {}, taskId: number) => {
  const request = await postData(
    "/task/edit/" + taskId,
    data,
    "PATCH",
    "application/json"
  );
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const deleteTasks = async (data = {}, taskId: number) => {
  const request = await deleteData("/task/delete/" + taskId);
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};
