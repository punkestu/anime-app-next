import AnimeCard from "@/components/AnimeCard";
import Page from "@/samehadaku/schedule/page";
import Link from "next/link";

export default async function JadwalPage({
  searchParams,
}: {
  searchParams: Promise<{ day?: string }>;
}) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const page = new Page();
  const params = await searchParams;
  const currentDay = params.day ? params.day : days[new Date().getDay()];

  const schedule = await page.getSchedule(currentDay);
  return (
    <main className="px-4 py-2">
      <h1 className="text-lg font-semibold">Schedule</h1>
      <hr className="my-2" />
      <div className="flex justify-center flex-wrap gap-2">
        {days.map((day) => (
          <Link
            key={day}
            href={`/schedule?day=${day}`}
            className={`block py-2 px-3 ${
              currentDay == day ? "text-blue-500 underline" : "text-gray-900"
            } rounded-sm hover:bg-gray-100`}
          >
            {day}
          </Link>
        ))}
      </div>
      <hr className="my-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2">
        {schedule.schedule.map((anime, i) => (
          <AnimeCard
            id={i}
            key={i}
            anime={{ ...anime, description: anime.time.length > 0 ? anime.time : "-" }}
          />
        ))}
      </div>
    </main>
  );
}
