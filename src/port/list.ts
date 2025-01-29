export interface ListPage {
  getListPage: (page: number) => Promise<ListResponse>;
  searchListPage: (search: SearchProps, page: number) => Promise<ListResponse>;
}

export interface SearchProps {
  query?: string;
  genre?: string;
}

export interface ListRepo {
  getAnimeList: (html: string) => Anime[];
  getMaxPage: (html: string) => number;
}

export interface ListResponse {
  animeList: Anime[];
  maxPage: number;
}

export interface Anime {
  url: string;
  image: string;
  title: string;
  description: string;
}
