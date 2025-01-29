import { HomeRepo, Anime } from "@/port/home";
import * as cheerio from "cheerio";

export class Home implements HomeRepo {
  private prefix = "https://samehadaku.mba/anime/";

  getAnimeTerbaru(html: string): Anime[] {
    const $ = cheerio.load(html);
    const anime: Anime[] = $(".post-show > ul > li")
      .map((_, el) => {
        const url = "/anime/" + $(el).find("a").attr("href")?.replace(this.prefix, "");
        const image = $(el).find("img").attr("src");
        const title = $(el).find(".entry-title").text();
        const released_on = $(el).find(".dtla > span:nth-child(4)").text();

        return { url, image, title, released_on };
      })
      .get();

    return anime;
  }

  getAnimeBatch(html: string): Anime[] {
    return [];
  }
}
