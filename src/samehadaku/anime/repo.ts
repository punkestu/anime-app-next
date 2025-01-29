import { Anime, AnimeRepo, Episode, Genre } from "@/port/anime";
import * as cheerio from "cheerio";

export default class Repo implements AnimeRepo {
  private prefixGenre = "https://samehadaku.mba/genre/";
  private prefixEpisode = "https://samehadaku.mba/";

  getDetail(html: string): Anime {
    const $ = cheerio.load(html);
    const anime: Anime = {
      title: $("[property='og:title']").attr("content") || "",
      description: $("[itemprop='description'] p").text(),
      image: $(".anmsa").attr("src") || "",
      genre: $(".genre-info a")
        .map(
          (_, el) =>
            ({
              title: $(el).text(),
              url: $(el).attr("href")?.replace(this.prefixGenre, "") || "",
            } as Genre)
        )
        .get(),
      rate: $("span[itemprop=ratingValue]").text(),
    };

    return anime;
  }
  getEpisodes(html: string): Episode[] {
    const $ = cheerio.load(html);
    const episodes: Episode[] = $(".listeps > ul > li")
      .map((_, el) => {
        const url = $(el).find("a").attr("href")?.replace(this.prefixEpisode, "") || "";
        const title = $(el).find(".epsleft a").text();
        const released_on = $(el).find(".date").text();

        return { url, title, released_on };
      })
      .get();

    return episodes;
  }
}
