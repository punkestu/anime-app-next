import { SchedulePage, ScheduleResponse } from "@/port/schedule";

export default class Page implements SchedulePage {
  async getSchedule(day: string): Promise<ScheduleResponse> {
    const data = await fetch(
      `https://samehadaku.mba/wp-json/custom/v1/all-schedule?perpage=20&day=${day}&type=schtml`
    ).then((res) => res.json());
    return {
      day,
      schedule: data.map(
        (item: {
          title: string;
          featured_img_src: string;
          slug: string;
          east_time: string;
        }) => ({
          title: item["title"],
          image: item["featured_img_src"],
          url: "/anime/" + item["slug"],
          time: item["east_time"],
        })
      ),
    };
  }
}
