import { EpisodePage, EpisodeRepo, EpisodeResponse } from "@/port/episode";

export default class Page implements EpisodePage {
  private repo: EpisodeRepo;
  constructor(repo: EpisodeRepo) {
    this.repo = repo;
  }

  async getEpisodePage(episodeId: string): Promise<EpisodeResponse> {
    const html = await fetch(process.env.SAMEHADAKU_WEB + `/${episodeId}`).then(
      (res) => res.text()
    );
    return {
      animeTitle: this.repo.getAnimeTitle(html),
      title: this.repo.getEpisodeTitle(html),
      mirrors: this.repo.getMirrors(html),
      control: this.repo.getControlEps(html),
      episodes: this.repo.getEps(html),
    };
  }
}
