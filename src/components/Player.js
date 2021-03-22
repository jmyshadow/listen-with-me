import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, tracks }) {
  let trackUris = tracks.map((track) => track.uri);
  console.log(trackUris);
  console.log(accessToken, trackUris);
  if (!accessToken) return null;
  return (
    <div>
      {" "}
      <SpotifyPlayer token={accessToken} uris={trackUris} />
    </div>
  );
}
