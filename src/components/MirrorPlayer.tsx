"use client";

import { Mirror } from "@/port/episode";
import { useEffect, useState } from "react";

export default function MirrorPlayer({
  mirrors,
  title,
}: {
  mirrors: Mirror[];
  title: string;
}) {
  const [currentMirror, setCurrentMirror] = useState(0);
  const [videoFrame, setVideoFrame] = useState<string | null>(null);

  useEffect(() => {
    const mirror = mirrors[currentMirror];
    fetch(
      "/api/frame?post=" +
        mirror.post +
        "&nume=" +
        mirror.nume +
        "&type=" +
        mirror.type
    )
      .then((res) => res.json())
      .then((data) => {
        setVideoFrame(data.video);
      });
  }, [currentMirror, mirrors]);

  return (
    <>
      <div className="w-full aspect-video lg:aspect-[16/6] flex items-center justify-center">
        {videoFrame !== null && (
          <iframe
            src={videoFrame}
            allowFullScreen
            className="w-full h-full z-10"
          ></iframe>
        )}
        <p className="absolute z-0">Loading...</p>
      </div>
      <h1 className="text-lg font-semibold my-1">{title}</h1>
      <select
        value={currentMirror}
        onChange={(e) => setCurrentMirror(parseInt(e.target.value))}
      >
        {mirrors.map((mirror, i) => (
          <option key={i} value={i}>
            {mirror.title}
          </option>
        ))}
      </select>
    </>
  );
}
