import React from "react";
import Track from "./Track";

export default function SearchResults({ tracks }) {
  return (
    <div>
      {tracks.map((track) => (
        <Track track={track} />
      ))}
    </div>
  );
}
