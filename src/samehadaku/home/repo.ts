import { HomeRepo, Anime } from "@/port/home";
import * as cheerio from "cheerio";

export class Home implements HomeRepo {
  private prefixAnime = process.env.SAMEHADAKU_WEB + "/anime/";
  private prefixBatch = process.env.SAMEHADAKU_WEB + "/batch/";

  getAnimeTerbaru(html: string): Anime[] {
    const $ = cheerio.load(html);
    const postShow = $(".post-show").get(0);
    const anime: Anime[] = $(postShow)
      .find("ul > li")
      .map((_, el) => {
        const url =
          "/anime/" + $(el).find("a").attr("href")?.replace(this.prefixAnime, "");
        const image = $(el).find("img").attr("src");
        const title = $(el).find(".entry-title").text();
        const released_on = $(el).find(".dtla > span:nth-child(4)").text();

        return { url, image, title, released_on };
      })
      .get();

    return anime;
  }

  getAnimeBatch(html: string): Anime[] {
    const $ = cheerio.load(html);
    const postShow = $(".post-show").get(1);
    const anime: Anime[] = $(postShow)
      .find("ul > li")
      .map((_, el) => {
        const url =
          "/batch/" + $(el).find("a").attr("href")?.replace(this.prefixBatch, "");
        const image = $(el).find("img").attr("src");
        const title = $(el).find(".entry-title").text();
        const released_on = $(el).find(".dtla > span:nth-child(4)").text();

        return { url, image, title, released_on };
      })
      .get();

    return anime;
  }
}
