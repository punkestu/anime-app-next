import * as repo from "@/samehadaku/home/repo";
import * as page from "@/samehadaku/home/page";
import { Metadata } from "next";
import AnimeCard from "@/components/AnimeCard";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Anime App | Home",
  };
}

export default async function Home() {
  const pageRepo = new repo.Home();
  const homePage = new page.Home(pageRepo);

  const home = await homePage.getHomePage();
  return (
    <>
      <main>
        <section>
          <h1 >Anime Terbaru</h1>
          <div className="grid grid-cols-4 gap-2">
            {home.animeTerbaru.map((anime, i) => (
              <AnimeCard key={i} anime={anime} />
            ))}
          </div>
        </section>
        <section>
          <h1>Anime Batch</h1>
          <div>
            {home.animeBatch.map((anime, i) => (
              <AnimeCard key={i} anime={anime} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}