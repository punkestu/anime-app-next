import { Anime, AnimeRepo, Episode, Genre } from "@/port/anime";
import * as cheerio from "cheerio";

export default class Repo implements AnimeRepo {
  private prefixGenre = process.env.OTAKUDESU_WEB + "/genres/";
  private prefixEpisode = process.env.OTAKUDESU_WEB + "/episode/";

  getDetail(html: string): Anime {
    const $ = cheerio.load(html);
    const anime: Anime = {
      title: $("[property='og:title']").attr("content") || "",
      description: $(".sinopc p").map((_, el) => $(el).text()).get().join(" "),
      image: $(".fotoanime > img").attr("src") || "",
      genre: $("a[rel=tag]")
        .map(
          (_, el) =>
            ({
              title: $(el).text(),
              url: ($(el).attr("href")?.replace(this.prefixGenre, "") || "").replace("/", ""),
            } as Genre)
        )
        .get(),
      rate: $(".infozingle p:nth-child(3)").text().replace("Skor: ", "") || "N/A",
    };

    return anime;
  }
  getEpisodes(html: string): Episode[] {
    const $ = cheerio.load(html);
    const episodes: Episode[] = $(".episodelist > ul > li")
      .map((_, el) => {
        const url = $(el).find("a").attr("href")?.replace(this.prefixEpisode, "") || "";
        const title = $(el).find("a").text();
        const released_on = $(el).find(".zeebr").text();

        return { url, title, released_on };
      })
      .get();

    return episodes;
  }
}
