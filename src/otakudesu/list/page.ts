import { ListPage, ListRepo, ListResponse, SearchProps } from "@/port/list";

export default class Page implements ListPage {
  private repo: ListRepo;
  constructor(repo: ListRepo) {
    this.repo = repo;
  }
  async getListPage(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _page: number
  ): Promise<ListResponse> {
    const html = await fetch(
      process.env.OTAKUDESU_WEB + `/?s=&post_type=anime`
    ).then((res) => res.text());
    return {
      animeList: this.repo.getAnimeList(html),
      maxPage: this.repo.getMaxPage(html),
    } as ListResponse;
  }
  async searchListPage(
    search: SearchProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _page: number
  ): Promise<ListResponse> {
    const { query } = search;
    const html = await fetch(
      process.env.OTAKUDESU_WEB + `/?s=${query}&post_type=anime`
    ).then((res) => res.text());
    return {
      animeList: this.repo.getAnimeList(html),
      maxPage: this.repo.getMaxPage(html),
    } as ListResponse;
  }
}
