import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Image className="w-16 h-16" width={64} height={64} src="/icon.png" alt="GrannyNime" />
        <p className="text-lg font-medium text-gray-800 dark:text-white">Loading...</p>
      </div>
    </div>
  );
}
