import * as repo from "@/samehadaku/home/repo";
import * as page from "@/samehadaku/home/page";
import AnimeCard from "@/components/AnimeCard";

export default async function Home() {
  const pageRepo = new repo.Home();
  const homePage = new page.Home(pageRepo);

  const home = await homePage.getHomePage();

  const batchFlag = process.env.BATCH_FLAG;
  return (
    <>
      <main>
        <section className="px-4 py-2">
          <h1 className="text-lg font-semibold">On Going</h1>
          <hr className="my-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2">
            {home.animeTerbaru.map((anime, i) => (
              <AnimeCard id={i} key={i} anime={anime} />
            ))}
          </div>
        </section>
        {batchFlag == "1" && (
          <section className="px-4 py-2">
            <h1 className="text-lg font-semibold">Anime Batch</h1>
            <hr className="my-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2">
              {home.animeBatch.map((anime, i) => (
                <AnimeCard id={i} key={i} anime={anime} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
