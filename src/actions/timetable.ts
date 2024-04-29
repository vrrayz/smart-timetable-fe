"use server";

import { deleteData, getData, postData } from "./apiRequest";

export const generateTimetable = async (termId: number) => {
  const request = await getData("/timetable/generate/" + termId);
//   if (request.statusCode === 200) {
//     return request.message.class;
//   }
  return request;
};

export const saveGeneratedTimetable = async (data = {}, termId: number) => {
    const request = await postData(
      "/timetable/save/"+termId,
      data,
      "POST",
      "application/json"
    );
    return {
      statusCode: request.statusCode,
      message: request.message,
    };
  };

export const getTimetable = async () => {
  const request = await getData("/timetable");
  if (request.statusCode === 200) {
    return request.message.timetable;
  }
  return request;
};

export const addTimetable = async (data = {}) => {
  const request = await postData(
    "/timetable/add",
    data,
    "POST",
    "application/json"
  );
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const editTimetable = async (data = {}, timetableId: number) => {
  const request = await postData(
    "/timetable/edit/" + timetableId,
    data,
    "PATCH",
    "application/json"
  );
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};

export const deleteTimetable = async (data = {}, timetableId: number) => {
  const request = await deleteData("/timetable/delete/" + timetableId);
  return {
    statusCode: request.statusCode,
    message: request.message,
  };
};
