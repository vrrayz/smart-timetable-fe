"use server";

import { getData, postData } from "./apiRequest";

export const getStudyPreference = async () => {
  const request = await getData("/study-preference");
  console.log('Request here is == ',request)
  if (request.statusCode === 200) {
    return request.message;
  }
  return request;
};

export const createStudyPreference = async (data = {}) => {
  const request = await postData("/study-preference/create", data);
  console.log("Here is action ",request)
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const updateStudyPreference = async (data = {}, studyPreferenceId: number) => {
  const request = await postData(`/study-preference/edit/${studyPreferenceId}`, data, "PATCH");
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};
