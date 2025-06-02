import Image from "next/image";
import Link from "next/link";

export default function AnimeCard({
  anime,
  id,
}: {
  anime: { url: string; image: string; title: string; description?: string };
  id: number;
}) {
  return (
    <Tooltip text={anime.title}>
      <div
        id={`anime-${id}`}
        className="bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <Link href={anime.url}>
          <div className="h-52 w-full overflow-hidden">
            <Image
              className="rounded-t-lg w-[100%] h-[100%] group-hover:w-[150%] group-hover:h-[150%] duration-300 object-cover"
              src={anime.image ?? "/error.jpg"}
              alt={anime.title}
              width={600}
              height={400}
            />
          </div>
        </Link>
        <div className="p-5">
          <Link href={anime.url}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {anime.title.length > 15
                ? anime.title.slice(0, 15) + "..."
                : anime.title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700">{anime.description}</p>
        </div>
      </div>
    </Tooltip>
  );
}

function Tooltip({
  children,
  text,
}: {
  children?: React.ReactNode;
  text: string;
}) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute -z-50 group-hover:z-50 p-2 text-xs text-white bg-black rounded-lg bottom-1 group-hover:bottom-full duration-300 left-1/2 transform -translate-x-1/2 -translate-y-2 text-center">
        {text}
      </div>
    </div>
  );
}
