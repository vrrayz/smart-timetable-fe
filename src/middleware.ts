import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getData } from "./actions";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = cookies().get("access_token");
  const profileRequest = await getData("/user/myprofile");
  console.log("Token value == ", token?.value);
  console.log("Profile request == ", profileRequest);
  if(profileRequest.statusCode === 200 && request.nextUrl.pathname.startsWith('/auth')){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if(profileRequest.statusCode !== 200 && request.nextUrl.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more