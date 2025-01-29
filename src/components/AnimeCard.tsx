import Image from "next/image";

export default function AnimeCard({
  anime,
}: {
  anime: { url: string; image: string; title: string; description?: string };
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <a href={anime.url}>
        <div className="h-52 w-full overflow-hidden">
          <Image
            className="rounded-t-lg w-[100%] h-[100%] hover:w-[150%] hover:h-[150%] duration-300 object-cover"
            src={anime.image}
            alt={anime.title}
            width={600}
            height={400}
          />
        </div>
      </a>
      <div className="p-5">
        <a href={anime.url}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {anime.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">
          {anime.description}
        </p>
      </div>
    </div>
  );
}
