import { HomeRepo, Anime } from "@/port/home";
import * as cheerio from "cheerio";

export class Home implements HomeRepo {
  private prefixAnime = process.env.OTAKUDESU_WEB + "/anime/";
  private prefixBatch = process.env.OTAKUDESU_WEB + "/batch/";

  getAnimeTerbaru(html: string): Anime[] {
    const $ = cheerio.load(html);

    const anime: Anime[] = $(".venutama > .rseries > .rapi .venz ul > li").map((_, el) => {
      const url =
        "/anime/" + $(el).find("a").attr("href")?.replace(this.prefixAnime, "");
      const image = $(el).find("img").attr("src");
      const title = $(el).find(".jdlflm").text();
      const released_on = $(el).find(".newnime").text();

      return { url, image, title, released_on };
    }).get();
    return anime;
  }

  getAnimeBatch(html: string): Anime[] {
    const $ = cheerio.load(html);
    const anime: Anime[] = $(".venutama > .rseries > .rseries > .rapi .venz ul > li").map((_, el) => {
      const url =
        "/anime/" + $(el).find("a").attr("href")?.replace(this.prefixAnime, "");
      const image = $(el).find("img").attr("src");
      const title = $(el).find(".jdlflm").text();
      const released_on = $(el).find(".newnime").text();

      return { url, image, title, released_on };
    }).get();
    return anime;
  }
}
