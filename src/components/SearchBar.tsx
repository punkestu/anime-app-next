"use client";
import { FormEvent, useState } from "react";

export default function SearchBar({
  currentPage,
  currentSearch,
}: {
  currentPage: number;
  currentSearch: { query?: string; genre?: string };
}) {
  const [query, setQuery] = useState(currentSearch.query ?? "");

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.location.href = `?${query ? `query=${query}&` : ""}${
      currentSearch.genre ? `genre=${currentSearch.genre}&` : ""
    }page=${currentPage}`;
  }

  return (
    <form
      onSubmit={(e) => search(e)}
      className="flex justify-end items-center mb-2"
    >
      <input
        type="text"
        id="simple-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        placeholder="Search by keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
