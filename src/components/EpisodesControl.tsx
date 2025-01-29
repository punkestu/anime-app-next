"use client";
import { Episode } from "@/port/episode";
import { initModals, Modal } from "flowbite";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function EpisodesControl({
  animeTitle,
  prev,
  next,
  episodes,
}: {
  animeTitle: string;
  prev: string | undefined;
  next: string | undefined;
  episodes: Episode[];
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modal, setModal] = useState<Modal | null>(null);

  useEffect(() => {
    initModals();
  }, []);
  useEffect(() => {
    if (modalRef.current) {
      setModal(
        new Modal(modalRef.current, {
          placement: "bottom-right",
          backdrop: "dynamic",
          backdropClasses:
            "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
          closable: true,
        })
      );
    }
  }, [modalRef]);

  function openModal() {
    if (modal) modal.show();
  }
  function closeModal() {
    if (modal) modal.hide();
  }
  const preventLink = (isDisabled: boolean) => {
    return (e: React.MouseEvent) => {
      if (isDisabled) e.preventDefault();
    };
  };
  return (
    <>
      <nav className="flex gap-2 items-center justify-center my-2">
        <a
          href={`/episode/${prev}`}
          className="p-2"
          onClick={preventLink(prev == "#")}
        >
          <svg
            className="w-5 h-5 text-gray-800"
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
              d="m15 19-7-7 7-7"
            />
          </svg>
        </a>
        <button
          className="p-2"
          data-modal-target="episodes-modal"
          onClick={openModal}
        >
          All Episodes
        </button>
        <a
          href={`/episode/${next}`}
          className="p-2"
          onClick={preventLink(next == "#")}
        >
          <svg
            className="w-5 h-5 text-gray-800"
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
              d="m9 5 7 7-7 7"
            />
          </svg>
        </a>
      </nav>
      <EpisodesModal
        episodes={episodes}
        onClose={closeModal}
        ref={modalRef}
        animeTitle={animeTitle}
      />
    </>
  );
}

export function EpisodesModal({
  episodes,
  animeTitle,
  onClose,
  ref,
}: {
  episodes: Episode[];
  animeTitle: string;
  onClose: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const reversedEpisode = episodes.slice().reverse();
  return (
    <div
      ref={ref}
      id="episodes-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {animeTitle}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="episodes-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4 h-[50vh] overflow-y-auto">
            <ul className="flex gap-4 my-4 flex-wrap">
              {reversedEpisode.map((episode, i) => (
                <li key={i} className="flex-grow flex">
                  <Link
                    onClick={onClose}
                    className="w-full text-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    href={`/episode/${episode.url}`}
                  >
                    {episode.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
