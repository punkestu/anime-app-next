export interface ListPage {
    getListPage: (page: number) => Promise<ListResponse>;
}

export interface ListRepo {
    getAnimeList: (html: string) => Anime[];
}

export interface ListResponse {
    animeList: Anime[];
    count: number;
}

export interface Anime {
    url: string;
    image: string;
    title: string;
    completed: boolean;
    genre: string[];
    rating: number;
}