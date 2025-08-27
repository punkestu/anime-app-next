import { NextResponse, NextRequest } from "next/server";
import AuthRepository from "./punkestuauth/repo";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const authrepo = new AuthRepository();

  if (
    !token ||
    !refreshToken ||
    !(await authrepo.validate({ token, refreshToken }))
  ) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("x-is-auth", "false");
    return response;
  }

  const response = NextResponse.next();
  response.cookies.set("x-is-auth", "true");

  return response;
}

export const config = {
  matcher: "/((?!login|api/login|_next|favicon.ico).*)",
};
