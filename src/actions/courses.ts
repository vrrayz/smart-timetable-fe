"use server"

import { postData } from "./apiRequest";

export const addCourse = async (data = {}) => {
    const request = await postData("/course/create", data);
  
    return {
      statusCode: request.statusCode,
      message: request.message,
    };
  }