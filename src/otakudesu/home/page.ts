import { HomePage, HomeRepo, HomeResponse } from "@/port/home";

export class Home implements HomePage {
    private homeRepo: HomeRepo;

    constructor(homeRepo: HomeRepo) {
        this.homeRepo = homeRepo;
    }

    async getHomePage(): Promise<HomeResponse> {
        const html = await fetch(process.env.OTAKUDESU_WEB + "/").then((res) => res.text()).catch(() => "Failed to fetch homepage");
        const batchFlag = process.env.BATCH_FLAG;
        return {
            animeTerbaru: this.homeRepo.getAnimeTerbaru(html),
            animeBatch: batchFlag == "1" ? this.homeRepo.getAnimeBatch(html) : [],
        };
    }
}