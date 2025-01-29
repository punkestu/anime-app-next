import { HomePage, HomeRepo, HomeResponse } from "@/port/home";

export class Home implements HomePage {
    private homeRepo: HomeRepo;

    constructor(homeRepo: HomeRepo) {
        this.homeRepo = homeRepo;
    }

    async getHomePage(): Promise<HomeResponse> {
        const html = await fetch("https://samehadaku.mba/").then((res) => res.text());
        return {
            animeTerbaru: this.homeRepo.getAnimeTerbaru(html),
            animeBatch: this.homeRepo.getAnimeBatch(html),
        };
    }
}