import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import SearchBar from "./SearchBar";
import Player from "./Player";
import SearchResults from "./SearchResults";
import Queue from "./Queue";
//import SpotifyWebApi from "spotify-web-api-node";

export default function HomePage({ code }) {
  const accessToken = useAuth(code);
  const [searchResult, setSearchResult] = useState({
    tracks: [],
    albums: [],
    playlists: [],
    artists: [],
    episodes: [],
    shows: [],
  });
  const [searching, setSearching] = useState("");
  const [playerReady, setPlayerReady] = useState(false);
  const [playQueue, setPlayQueue] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [index, setIndex] = useState(0);

  return (
    <div className='homepage d-flex h-100 w-100 pb-5'>
      {playerReady ? (
        <>
          <div className='side-bar bg-dark'>links</div>
          <div className='d-flex flex-column bg-success h-100 w-100'>
            <div>
              <SearchBar
                setSearchResult={setSearchResult}
                accessToken={accessToken}
                setSearching={setSearching}
                expanded={expanded}
                setExpanded={setExpanded}
                index={index}
                setIndex={setIndex}
              />
            </div>
            <div className='bg-primary playlist'>
              {searching ? (
                <SearchResults
                  searchResult={searchResult}
                  playQueue={playQueue}
                  setPlayQueue={setPlayQueue}
                  accessToken={accessToken}
                  setSearching={setSearching}
                  index={index}
                  setIndex={setIndex}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              ) : (
                <Queue playQueue={playQueue} />
              )}
            </div>
          </div>
          <div className='side-bar bg-dark'>chat</div>
        </>
      ) : null}
      <div className='fixed-bottom'>
        <Player
          accessToken={accessToken}
          setPlayerReady={setPlayerReady}
          playQueue={playQueue}
          setPlayQueue={setPlayQueue}
        />
      </div>
    </div>
  );
}
