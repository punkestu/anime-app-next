import { ListPage, ListRepo, ListResponse, SearchProps } from "@/port/list";

export default class Page implements ListPage {
  private repo: ListRepo;
  constructor(repo: ListRepo) {
    this.repo = repo;
  }
  async getListPage(page: number): Promise<ListResponse> {
    const html = await fetch(
      `https://samehadaku.mba/daftar-anime-2/page/${page}`
    ).then((res) => res.text());
    return {
      animeList: this.repo.getAnimeList(html),
      maxPage: this.repo.getMaxPage(html),
    } as ListResponse;
  }
  async searchListPage(
    search: SearchProps,
    page: number
  ): Promise<ListResponse> {
    const { query, genre } = search;
    const html = await fetch(
      `https://samehadaku.mba/${genre ? `genre/${genre}/` : ""}page/${page}/?${
        query ? `s=${query}&` : ""
      }`
    ).then((res) => res.text());
    return {
      animeList: this.repo.getAnimeList(html),
      maxPage: this.repo.getMaxPage(html),
    } as ListResponse;
  }
}
