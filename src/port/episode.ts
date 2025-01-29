export interface EpisodePage {
    getEpisodePage: (episodeId: string) => Promise<EpisodeResponse>;
}

export interface EpisodeRepo {
    getAnimeTitle: (html: string) => string;
    getEpisodeTitle: (html: string) => string;
    getMirrors: (html: string) => Mirror[];
    getControlEps: (html: string) => EpsControl;
    getEps: (html: string) => Episode[];
}

export interface Mirror {
    title: string;
    post: string;
    nume: string;
    type: string;
}

export interface EpisodeResponse {
    animeTitle: string;
    title: string;
    mirrors: Mirror[];
    episodes: Episode[];
    control: EpsControl;
}

export interface EpsControl {
    prev: string | undefined;
    all: string;
    next: string | undefined;
}

export interface Episode {
    title: string;
    url: string;
    release_on: string;
}