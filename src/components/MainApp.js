import React, { useState } from "react";
import MainSearch from "./MainSearch";
import useAuth from "./hooks/useAuth";
import Player from "./Player";
import { TokenContext, QueueContext } from "./context/SpotifyContext";

export default function MainApp({ code }) {
  const accessToken = useAuth(code);
  const [spotifyQueue, setSpotifyQueue] = useState([]);
  const [playQueue, setPlayQueue] = useState([]);
  return (
    <TokenContext.Provider value={accessToken}>
      <QueueContext.Provider value={{ playQueue, setPlayQueue }}>
        <MainSearch
          spotifyQueue={spotifyQueue}
          setSpotifyQueue={setSpotifyQueue}
        />
      </QueueContext.Provider>
      <Player spotifyQueue={spotifyQueue} />
    </TokenContext.Provider>
  );
}
