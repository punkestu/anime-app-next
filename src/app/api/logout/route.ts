import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const response = NextResponse.json({
    message: "Logout successful"
  });
  const Cookies = await cookies();
  Cookies.delete("token");
  Cookies.delete("refreshToken");
  Cookies.delete("x-is-auth");
  return response;
}
