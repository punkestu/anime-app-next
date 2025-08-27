import Repo from "@/samehadaku/list/repo";
import Page from "@/samehadaku/list/page";
import AnimeCard from "@/components/AnimeCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export default async function AnimePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; genre?: string }>;
}) {
  const repo = new Repo();
  const page = new Page(repo);

  const { query, page: pageNumber, genre } = await searchParams;
  const currentPage = parseInt(pageNumber ?? "1");

  const { animeList, maxPage } =
    query || genre
      ? await page.searchListPage({ query, genre }, currentPage)
      : await page.getListPage(currentPage);

  return (
    <main className="px-4 py-2">
      <SearchBar currentPage={currentPage} currentSearch={{ query, genre }} />
      <div className="flex justify-between flex-wrap">
        <h1 className="text-lg font-semibold dark:text-white">
          {query ? `Hasil pencarian: "${query}"` : "Daftar Anime"}
        </h1>
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
          search={{ query, genre }}
        />
      </div>
      {genre && (
        <Link
          className="flex items-center gap-1 w-fit"
          href={`?${query ? `query=${query}&` : ""}${
            pageNumber ? `page=${pageNumber}` : ""
          }`}
        >
          {genre}{" "}
          <svg
            className="w-4 h-4 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
      )}
      <hr className="my-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2">
        {animeList.map((anime, i) => (
          <AnimeCard id={i} key={i} anime={anime} />
        ))}
      </div>
    </main>
  );
}

function Pagination({
  currentPage,
  maxPage,
  search,
}: {
  currentPage: number;
  maxPage: number;
  search: { query?: string; genre?: string };
}) {
  const itemClass = (page: number) => {
    return `flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
      page == currentPage
        ? "text-blue-600 bg-blue-50 border-blue-300"
        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
    }`;
  };
  const { query, genre } = search;
  const itemUrl = (page: number | boolean) =>
    `?${query ? `query=${query}&` : ""}${genre ? `genre=${genre}&` : ""}${
      page ? `page=${page}` : ""
    }`;
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <Link
            href={itemUrl(currentPage > 1 ? currentPage - 1 : false)}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Previous
          </Link>
        </li>
        <li>
          <Link
            href={itemUrl(
              currentPage <= 1
                ? 1
                : currentPage >= maxPage
                ? currentPage - 2
                : currentPage - 1
            )}
            className={itemClass(
              currentPage <= 1
                ? 1
                : currentPage >= maxPage
                ? currentPage - 2
                : currentPage - 1
            )}
          >
            {currentPage <= 1
              ? 1
              : currentPage >= maxPage
              ? currentPage - 2
              : currentPage - 1}
          </Link>
        </li>
        {maxPage >= 2 && (
          <li>
            <Link
              href={itemUrl(
                currentPage <= 1
                  ? 2
                  : currentPage >= maxPage
                  ? maxPage - 1
                  : currentPage
              )}
              className={itemClass(
                currentPage <= 1
                  ? 2
                  : currentPage >= maxPage
                  ? maxPage - 1
                  : currentPage
              )}
            >
              {currentPage <= 1
                ? 2
                : currentPage >= maxPage
                ? maxPage - 1
                : currentPage}
            </Link>
          </li>
        )}
        {maxPage >= 3 && (
          <li>
            <Link
              href={itemUrl(
                currentPage <= 1
                  ? 3
                  : currentPage >= maxPage
                  ? currentPage
                  : currentPage + 1
              )}
              className={itemClass(
                currentPage <= 1
                  ? 3
                  : currentPage >= maxPage
                  ? currentPage
                  : currentPage + 1
              )}
            >
              {currentPage <= 1
                ? 3
                : currentPage >= maxPage
                ? currentPage
                : currentPage + 1}
            </Link>
          </li>
        )}
        <li>
          <Link
            href={itemUrl(currentPage < maxPage ? currentPage + 1 : false)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
