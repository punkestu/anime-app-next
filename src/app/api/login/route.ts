import { NextResponse } from "next/server";
import AuthRepository from "@/punkestuauth/repo";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  const authrepo = new AuthRepository();
  const loginResponse = await authrepo.login(username, password);
  if (!loginResponse) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    message: "Login successful",
    tokens: loginResponse.tokens,
  });
  const Cookies = await cookies();
  Cookies.set("token", String(loginResponse.tokens.token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  Cookies.set("refreshToken", String(loginResponse.tokens.refreshToken), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
