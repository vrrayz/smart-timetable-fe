"use server";
import { cookies } from "next/headers";
import { postData } from ".";

export const login = async (data = {}) => {
  const loginRequest = await postData("/auth/login", data);
  if (loginRequest.access_token) {
    cookies().set("access_token", loginRequest.access_token, {
      httpOnly: true,
    });
    return {
      statusCode: loginRequest.statusCode,
      message: loginRequest.access_token,
    };
  }
  return {
    statusCode: loginRequest.statusCode,
    message: loginRequest.message,
  };
};

export const registerUser = async (data = {}) => {
  const request = await postData("/auth/register", data);

  if (request.access_token) {
    cookies().set("access_token", request.access_token, {
      httpOnly: true,
    });
    return {
      statusCode: request.statusCode,
      message: request.access_token,
    };
  }
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};


