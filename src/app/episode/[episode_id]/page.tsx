import EpisodeRepo from "@/samehadaku/episode/repo";
import EpisodePage from "@/samehadaku/episode/page";
import MirrorPlayer from "@/components/MirrorPlayer";

export default async function Page({
  params,
}: {
  params: { episode_id: string };
}) {
  const repo = new EpisodeRepo();
  const page = new EpisodePage(repo);
  const { episode_id } = await params;
  const { title, mirrors, control, episodes } = await page.getEpisodePage(
    episode_id
  );

  return (
    <main>
      <h1>{title}</h1>
      <MirrorPlayer mirrors={mirrors} />
      <nav>
        <a href={`/episode/${control.prev}`}>Prev</a>
        <a href={`/anime/${control.all}`}>All</a>
        <a href={`/episode/${control.next}`}>Next</a>
      </nav>
      <ul>
        {episodes.map((episode, i) => (
          <li key={i}>
            <a href={`/episode/${episode.url}`}>
              {episode.title} - <span>{episode.release_on}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
