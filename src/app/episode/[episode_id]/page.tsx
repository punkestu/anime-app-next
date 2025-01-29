import EpisodeRepo from "@/samehadaku/episode/repo";
import EpisodePage from "@/samehadaku/episode/page";
import MirrorPlayer from "@/components/MirrorPlayer";
import { EpisodesControl } from "@/components/EpisodesControl";

export default async function Page({
  params,
}: {
  params: Promise<{ episode_id: string }>;
}) {
  const repo = new EpisodeRepo();
  const page = new EpisodePage(repo);
  const { episode_id } = await params;
  const { animeTitle, title, mirrors, control, episodes } = await page.getEpisodePage(
    episode_id
  );

  return (
    <main className="px-4">
      <MirrorPlayer mirrors={mirrors} title={title} />
      <EpisodesControl animeTitle={animeTitle} episodes={episodes} {...control} />
    </main>
  );
}
