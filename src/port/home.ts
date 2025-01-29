export interface HomePage {
  getHomePage: () => Promise<HomeResponse>;
}

export interface HomeRepo {
  getAnimeTerbaru: (html: string) => Anime[];
  getAnimeBatch: (html: string) => Anime[];
}

export interface HomeResponse {
  animeTerbaru: Anime[];
  animeBatch: Anime[];
}

export interface Anime {
  url: string;
  image: string;
  title: string;
  released_on: string;
}
