"use client";

import { initFlowbite } from "flowbite";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Icon from "../../public/icon.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    initFlowbite();
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);
  const path = usePathname();
  const pages = [
    { name: "Home", path: "/" },
    { name: "Anime List", path: "/anime" },
    { name: "Schedule", path: "/schedule" },
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  return (
    <nav className="bg-white dark:bg-gray-900 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src={Icon} alt="Icon" width={40} height={40} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:md:bg-gray-900">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`block py-2 px-3 ${
                    path == item.path
                      ? "text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 dark:md:text-white md:p-0"
                      : "text-gray-900 dark:text-slate-400 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <hr className="md:hidden m-2" />
            <li className="flex items-center justify-center">
              <button
                className="mx-3"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                <span className="block dark:hidden">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
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
                      d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                    />
                  </svg>
                </span>
                <span className="hidden dark:block">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
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
                      d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"
                    />
                  </svg>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
