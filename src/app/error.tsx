"use client";
import Link from "next/link";
import ErrorImage from "../../public/error.jpg";
import Image from "next/image";

export default function GlobalError({ error, plainError }: { error: Error, plainError?: string }) {
  return (
    <main className="flex flex-col items-center justify-center h-[90vh]">
      <Image src={ErrorImage} alt="Turbo Granny" />
      <h1 className="my-2 text-4xl font-bold">{plainError ? plainError : error.message}</h1>
      <Link
        href={"/"}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Go Home
      </Link>
    </main>
  );
}
