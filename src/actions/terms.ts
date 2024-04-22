"use server";

import { getData } from "./apiRequest";

export const getTerms = async () => {
  const request = await getData("/term/userTerms");
  if(request.statusCode === 200){
    return request.message.terms
  }
  return request;
};
