import React, { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { TokenContext, QueueContext } from "./context/SpotifyContext";
import SearchBar from "./search/SearchBar";
import SearchResults from "./search/SearchResults";
import Queue from "./queue/Queue";
import LinksBar from "./linksbar/LinksBar";
import * as spotifyFetch from "./utilities/spotifyFetch.js";

export default function MainApp({ code, setUser, socket }) {
  const accessToken = useAuth(code);
  const [searching, setSearching] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState({
    tracks: [],
    albums: [],
    playlists: [],
    artists: [],
    episodes: [],
    shows: [],
  });

  const [playQueue, setPlayQueue] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    (async function () {
      const id = await spotifyFetch.getMe(accessToken);
      setUser(id);
    })();
  }, [accessToken, setUser]);

  return (
    <TokenContext.Provider value={accessToken}>
      <QueueContext.Provider value={{ playQueue, setPlayQueue }}>
        <div
          className='d-flex bg-dark text-light h-100'
          style={{ flex: "1 1 auto" }}
        >
          <LinksBar
            accessToken={accessToken}
            index={index}
            setIndex={setIndex}
            expanded={expanded}
            setExpanded={setExpanded}
            setSearching={setSearching}
            setSearch={setSearch}
          />
          <div
            className='d-flex flex-column bg-dark text-light h-100'
            style={{ flex: "1 1 auto" }}
          >
            <SearchBar
              index={index}
              setIndex={setIndex}
              expanded={expanded}
              setExpanded={setExpanded}
              setSearching={setSearching}
              setSearchResult={setSearchResult}
              searching={searching}
              search={search}
              setSearch={setSearch}
            />
            <div className='playlist'>
              <div style={{ height: "100%", width: "100%" }}>
                {searching ? (
                  <SearchResults
                    index={index}
                    setIndex={setIndex}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    searchResult={searchResult}
                    socket={socket}
                  />
                ) : null}
              </div>
              <Queue
                setExpanded={setExpanded}
                setSearching={setSearching}
                searching={searching}
                expanded={expanded}
                socket={socket}
              />
            </div>
          </div>
        </div>
      </QueueContext.Provider>
    </TokenContext.Provider>
  );
}
