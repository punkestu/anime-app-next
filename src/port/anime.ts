export interface AnimePage {
  getAnimePage: (anime_id: string) => Promise<AnimeResponse>;
}

export interface AnimeRepo {
  getDetail: (html: string) => Anime;
  getEpisodes: (html: string) => Episode[];
}

export interface AnimeResponse {
  anime: Anime;
  episodes: Episode[];
}

export interface Anime {
  title: string;
  description: string;
  image: string;
  genre: Genre[];
  rate: string;
}

export interface Genre {
  title: string;
  url: string;
}

export interface Episode {
  title: string;
  url: string;
  released_on: string;
}
