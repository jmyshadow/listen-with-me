import React, { useState, useEffect } from "react";
import MainSearch from "./MainSearch";
import useAuth from "./hooks/useAuth";
import { TokenContext, QueueContext } from "./context/SpotifyContext";
import * as spotifyFetch from "./utilities/spotifyFetch.js";
import SPlayer from "./SPlayer";
//import axios from "axios";

export default function MainApp({ code, setUser }) {
  const accessToken = useAuth(code);
  const [playQueue, setPlayQueue] = useState([]);

  const [nowPlaying, setNowPlaying] = useState({});

  useEffect(() => {
    if (!accessToken) return;
    (async function () {
      const id = await spotifyFetch.getMe(accessToken);
      setUser(id);
    })();
    // axios.post("/me", { accessToken }).then((name) => {
    //   setUser(name.data);
    // });
  }, [accessToken, setUser]);

  return (
    <TokenContext.Provider value={accessToken}>
      <QueueContext.Provider value={{ playQueue, setPlayQueue }}>
        <MainSearch nowPlaying={nowPlaying} />
      </QueueContext.Provider>
      <SPlayer accessToken={accessToken} setNowPlaying={setNowPlaying} />
    </TokenContext.Provider>
  );
}
