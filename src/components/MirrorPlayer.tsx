"use client";

import { Mirror } from "@/port/episode";
import { useEffect, useState } from "react";

export default function MirrorPlayer({
  mirrors,
}: {
  mirrors: Mirror[];
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
  }, [currentMirror]);

  return (
    <>
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
      {videoFrame !== null ? (
        <iframe src={videoFrame} allowFullScreen></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
