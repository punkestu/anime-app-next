import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const post = params.get("post");
  const nume = params.get("nume");
  const type = params.get("type");

  const frame = await fetch(process.env.SAMEHADAKU_WEB + "/wp-admin/admin-ajax.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `action=player_ajax&post=${post}&nume=${nume}&type=${type}`,
  }).then((res) => res.text());

  const $ = cheerio.load(frame);
  const video = $("iframe").attr("src") || "";

  return NextResponse.json({ video });
}
