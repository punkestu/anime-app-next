import AnimeRepo from "@/samehadaku/anime/repo";
import AnimePage from "@/samehadaku/anime/page";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { anime_id: string };
}) {
  const repo = new AnimeRepo();
  const page = new AnimePage(repo);

  const { anime_id } = await params;
  const { anime, episodes } = await page.getAnimePage(anime_id);
  return (
    <main>
      <h1>{anime.title}</h1>
      <Image src={anime.image} alt={anime.title} />
      <p>{anime.description}</p>
      <p>{anime.rate}/10</p>
      <ul className="flex gap-2">
        {anime.genre.map((genre, i) => (
          <li key={i}>
            <a href={`/genre/${genre.url}`}>{genre.title}</a>
          </li>
        ))}
      </ul>
      <h2>Episodes</h2>
      <ul>
        {episodes.map((episode, i) => (
          <li key={i}>
            <a href={`/episode/${episode.url}`}>
              {episode.title} - {episode.released_on}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
