import { AnimePage, AnimeRepo, AnimeResponse } from "@/port/anime";

export default class Page implements AnimePage {
  private repo: AnimeRepo;
  constructor(repo: AnimeRepo) {
    this.repo = repo;
  }
  async getAnimePage(anime_id: string): Promise<AnimeResponse> {
    const html = await fetch(process.env.SAMEHADAKU_WEB + "/anime/" + anime_id).then(
      (res) => res.text()
    );
    return {
      anime: this.repo.getDetail(html),
      episodes: this.repo.getEpisodes(html),
    };
  }
}
