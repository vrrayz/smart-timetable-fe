"use server";

import { cookies } from "next/headers";

export async function postData(url = "", data = {}) {
  const response = await fetch(`${process.env.BE_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
    body: new URLSearchParams(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getData(url = "") {
  const response = await fetch(`${process.env.BE_API_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
