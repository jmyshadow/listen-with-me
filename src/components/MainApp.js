import React, { useState } from "react";
import MainSearch from "./MainSearch";
import useAuth from "./hooks/useAuth";
import Player from "./Player";

export default function MainApp({ code }) {
  const accessToken = useAuth(code);
  const [spotifyQueue, setSpotifyQueue] = useState([]);

  return (
    <>
      <MainSearch
        accessToken={accessToken}
        setSpotifyQueue={setSpotifyQueue}
        spotifyQueue={spotifyQueue}
      />
      <Player accessToken={accessToken} spotifyQueue={spotifyQueue} />
    </>
  );
}
