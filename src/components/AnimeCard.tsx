import Image from "next/image";

export default function AnimeCard({
  anime,
}: {
  anime: { url: string; image: string; title: string; description?: string };
}) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href={anime.url}>
        <div className="h-52 w-full overflow-hidden">
          <Image
            className="rounded-t-lg w-[100%] h-[100%] hover:w-[150%] hover:h-[150%] duration-300 object-cover"
            src={anime.image}
            alt={anime.title}
          />
        </div>
      </a>
      <div className="p-5">
        <a href={anime.url}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {anime.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {anime.description}
        </p>
      </div>
    </div>
  );
}
