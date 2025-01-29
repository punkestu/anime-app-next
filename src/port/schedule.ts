export interface SchedulePage {
  getSchedule: (day: string) => Promise<ScheduleResponse>;
}

export interface ScheduleResponse {
  day: string;
  schedule: AnimeSchedule[];
}

export interface AnimeSchedule {
  title: string;
  image: string;
  url: string;
  time: string;
}
