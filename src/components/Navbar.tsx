"use client";

import { initFlowbite } from "flowbite";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import Icon from "../../public/icon.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  useEffect(() => {
    initFlowbite();
  }, []);
  const path = usePathname();
  const pages = [
    { name: "Home", path: "/" },
    { name: "Anime List", path: "/anime" },
    { name: "Jadwal Rilis", path: "/jadwal" },
  ];
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={Icon} alt="Icon" width={40} height={40} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            GrannyNime
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            {pages.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className={`block py-2 px-3 ${
                    path == item.path
                      ? "text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                      : "text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
