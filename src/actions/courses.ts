"use server";

import { getData, postData } from "./apiRequest";

export const addCourse = async (data = {}) => {
  const request = await postData("/course/create", data);

  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const getCourses = async () => {
  const request = await getData("/course/userCourses");
  if (request.statusCode === 200) {
    return request.message.courses;
  }
  return request;
};
