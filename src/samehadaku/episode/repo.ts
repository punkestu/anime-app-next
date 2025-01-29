import { Episode, EpisodeRepo, EpsControl, Mirror } from "@/port/episode";
import * as cheerio from "cheerio";

export default class Repo implements EpisodeRepo {
  private prefixEpisode = "https://samehadaku.mba/";
  private prefixAnime = "https://samehadaku.mba/anime/";

  getEpisodeTitle(html: string): string {
    const $ = cheerio.load(html);
    return $("[property='og:title']").attr("content") || "";
  }

  getMirrors(html: string): Mirror[] {
    const $ = cheerio.load(html);
    const mirrors: Mirror[] = $("#server > ul > li > div")
      .map((_, el) => {
        const title = $(el).find("span").text();
        const post = $(el).attr("data-post") || "";
        const nume = $(el).attr("data-nume") || "";
        const type = $(el).attr("data-type") || "";

        return { title, post, nume, type };
      })
      .get();
    return mirrors;
  }

  getControlEps(html: string): EpsControl {
    const $ = cheerio.load(html);
    return {
      prev:
        $(".naveps div:nth-child(1) a")
          .attr("href")
          ?.replace(this.prefixEpisode, "") || "",
      all:
        $(".naveps div:nth-child(2) a")
          .attr("href")
          ?.replace(this.prefixAnime, "") || "",
      next:
        $(".naveps div:nth-child(3) a")
          .attr("href")
          ?.replace(this.prefixEpisode, "") || "",
    };
  }

  getEps(html: string): Episode[] {
    const $ = cheerio.load(html);
    const episodes: Episode[] = $(".lstepsiode.listeps > ul > li")
      .map((_, el) => {
        const title = $(el).find(".epsleft a").text();
        const url =
          $(el)
            .find(".epsleft a")
            .attr("href")
            ?.replace(this.prefixEpisode, "") || "";
        const release_on = $(el).find(".date").text();
        return { title, url, release_on };
      })
      .get();
    return episodes;
  }
}
