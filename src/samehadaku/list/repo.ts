import { Anime, ListRepo } from "@/port/list";
import * as cheerio from "cheerio";

export default class Repo implements ListRepo {
  private prefixAnime = process.env.SAMEHADAKU_WEB + "/anime/";
  getAnimeList(html: string): Anime[] {
    const $ = cheerio.load(html);
    const animeList: Anime[] = $(".animepost")
      .map((_, el) => {
        const title = $(el).find(".title h2").text();
        const url =
          "/anime/" +
          $(el).find("a").attr("href")?.replace(this.prefixAnime, "");
        const image = $(el).find("img").attr("src");
        const description = $(el).find(".data .type").text();
        return { title, url, image, description } as Anime;
      })
      .get();
    return animeList;
  }

  getMaxPage(html: string): number {
    const $ = cheerio.load(html);
    const paginationLabel = $(".pagination span:first-child");
    if (!paginationLabel) {
      return 1;
    }
    const maxPage = paginationLabel.text().split(" of ")[1];
    return parseInt(maxPage, 10);
  }
}
