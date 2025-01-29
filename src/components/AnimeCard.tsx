"use client";
import Image from "next/image";

export default function AnimeCard({
  anime,
}: {
  anime: { url: string; image: string; title: string; description?: string };
}) {
  return (
    <>
      <div
        className="bg-white border border-gray-200 rounded-lg shadow-sm"
        data-tooltip-target={`tooltip-card-${anime.url}`}
      >
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
              {anime.title.length > 15 ? anime.title.slice(0, 15) + "..." : anime.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">{anime.description}</p>
        </div>
      </div>
      <div
        id={`tooltip-card-${anime.url}`}
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip"
      >
        {anime.title}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  );
}
