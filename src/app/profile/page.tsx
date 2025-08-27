import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="flex flex-col min-h-[70vh] p-4 items-center">
      <h1 className="my-2 text-4xl font-bold dark:text-white text-center flex gap-8">
        Profile Page
        <Link href={"/api/logout"}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none w-fit"
        >
          Logout
        </Link>
      </h1>
    </main>
  );
}
