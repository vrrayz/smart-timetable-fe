"use server";

import { getData, postData } from "./apiRequest";

export const getTerms = async () => {
  const request = await getData("/term/userTerms");
  if (request.statusCode === 200) {
    return request.message.terms;
  }
  return request;
};

export const addTerm = async (data = {}) => {
  const request = await postData("/term/create", data);

  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};
export const getCurrentTerm = async () => {
  const request = await getData("/term/currentTerm");
  if (request.statusCode === 200) {
    return request.message.currentTerm;
  }
  return request;
};
export const updateCurrentTerm = async (termId: number) => {
  const request = await postData("/term/currentTerm", { termId }, "PATCH");

  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};
