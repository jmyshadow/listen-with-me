import React, { useState, useEffect } from "react";
import MainSearch from "./MainSearch";
import useAuth from "./hooks/useAuth";
import Player from "./Player";
import { TokenContext, QueueContext } from "./context/SpotifyContext";
import * as spotifyFetch from "./utilities/spotifyFetch.js";
import axios from "axios";

export default function MainApp({ code, setUser }) {
  const accessToken = useAuth(code);
  useEffect(() => {
    if (!accessToken) return;
    // (async function () {
    //   const id = await spotifyFetch.getMe(accessToken);
    //   setUser(id);
    // })();
    axios.post("/me", { accessToken }).then((name) => {
      setUser(name.data);
    });
  }, [accessToken, setUser]);

  const [playQueue, setPlayQueue] = useState([]);
  return (
    <TokenContext.Provider value={accessToken}>
      <QueueContext.Provider value={{ playQueue, setPlayQueue }}>
        <MainSearch />
      </QueueContext.Provider>
      <Player playQueue={playQueue} setPlayQueue={setPlayQueue} />
    </TokenContext.Provider>
  );
}
