"use server";

export async function postData(url = "", data = {}) {
  const response = await fetch(`${process.env.BE_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
