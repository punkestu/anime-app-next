import { Episode, EpisodeRepo, EpsControl, Mirror } from "@/port/episode";
import * as cheerio from "cheerio";

interface MirrorData {
  id: number;
  i: number;
  q: string;
};

export default class Repo implements EpisodeRepo {
  private prefixEpisode = process.env.SAMEHADAKU_WEB + "/";
  private prefixAnime = process.env.SAMEHADAKU_WEB + "/anime/";

  getAnimeTitle(html: string): string {
    const $ = cheerio.load(html);
    return $(".infozw").text().trim();
  }

  getEpisodeTitle(html: string): string {
    const $ = cheerio.load(html);
    return $("[property='og:title']").attr("content") || "";
  }

  getMirrors(html: string): Mirror[] {
    const $ = cheerio.load(html);
    const mirrors: Mirror[] = $(".mirrorstream > ul > li > a")
      .map((_, el) => {
        const resolution = $(el).parent().parent().attr("class") || "";
        const title = $(el).text() + (resolution ? ` (${resolution})` : "");
        const datacontent = $(el).attr("data-content") || "";
        const data: MirrorData = JSON.parse(atob(datacontent));

        return { title, post: data.id, nume: data.i, type: data.q };
      })
      .get();
    return mirrors;
  }

  getControlEps(html: string): EpsControl {
    const $ = cheerio.load(html);
    return {
      prev: $(".naveps div:nth-child(1) a")
        .attr("href")
        ?.replace(this.prefixEpisode, ""),
      all:
        $(".naveps div:nth-child(2) a")
          .attr("href")
          ?.replace(this.prefixAnime, "") || "",
      next: $(".naveps div:nth-child(3) a")
        .attr("href")
        ?.replace(this.prefixEpisode, ""),
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
