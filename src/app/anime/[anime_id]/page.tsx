import AnimeRepo from "@/otakudesu/anime/repo";
import AnimePage from "@/otakudesu/anime/page";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ anime_id: string }>;
}) {
  const repo = new AnimeRepo();
  const page = new AnimePage(repo);

  const { anime_id } = await params;
  const { anime, episodes } = await page.getAnimePage(anime_id);
  return (
    <main>
      <Image
        className="w-screen h-[50vh] object-cover"
        src={anime.image}
        alt={anime.title}
        width={1240}
        height={720}
      />
      <section className="px-4 py-2 dark:text-white">
        <h1 className="text-4xl font-medium mb-2">{anime.title}</h1>
        <p className="text-justify">{anime.description}</p>
        <ul className="flex items-center gap-2 mt-2 flex-wrap">
          <li className="p-2 bg-yellow-300 flex items-center me-2">
            <svg
              className="w-5 h-5 me-1 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>
            <p>
              <span className="font-semibold">{anime.rate}</span> / 10
            </p>
          </li>
          {anime.genre.map((genre, i) => (
            <li key={i}>
              <Link
                className="font-medium text-blue-600 hover:underline"
                href={`/anime?genre=${genre.url}`}
              >
                {genre.title}
              </Link>
            </li>
          ))}
        </ul>
        <h1 className="text-lg font-semibold mt-4">Episodes</h1>
        <hr className="my-2" />
        <ul className="flex gap-4 my-4 flex-wrap">
          {episodes.reverse().map((episode, i) => (
            <li key={i} className="flex-grow flex">
              <Link
                className="w-full text-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 visited:bg-slate-200"
                href={`/episode/${episode.url}`}
              >
                {episode.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
