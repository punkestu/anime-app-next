import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const post = params.get("post");
  const nume = params.get("nume");
  const type = params.get("type");

  const noncereq = await fetch(process.env.OTAKUDESU_WEB + "/wp-admin/admin-ajax.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `action=aa1208d27f29ca340c92c66d1926f13f`,
  })
    .then((res) => res.json());
  const nonce = noncereq.data;

  console.log(nonce);

  const frame = await fetch(process.env.OTAKUDESU_WEB + "/wp-admin/admin-ajax.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `id=${post}&i=${nume}&q=${type}&action=2a3505c93b0035d3f455df82bf976b84&nonce=${nonce}`,
  }).then((res) => res.json());

  const $ = cheerio.load(atob(frame.data));
  const video = $("iframe").attr("src") || "";

  return NextResponse.json({ video });
}
