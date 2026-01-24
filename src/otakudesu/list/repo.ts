import { Anime, ListRepo } from "@/port/list";
import * as cheerio from "cheerio";

export default class Repo implements ListRepo {
  private prefixAnime = process.env.OTAKUDESU_WEB + "/anime/";
  getAnimeList(html: string): Anime[] {
    const $ = cheerio.load(html);
    const animeList: Anime[] = $(".chivsrc > li")
      .map((_, el) => {
        const title = $(el).find("h2 a").text();
        const url =
          "/anime/" +
          $(el).find("h2 a").attr("href")?.replace(this.prefixAnime, "");
        const image = $(el).find("img").attr("src");
        const description = $(el).find(".set").map((_, descEl) => $(descEl).text()).get().join(" | ");
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
