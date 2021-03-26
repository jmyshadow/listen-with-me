import React, { useState } from "react";
import useAuth from "./useAuth";
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
              />
            </div>
            <div className='bg-primary playlist m-0'>
              {searching ? (
                <SearchResults
                  searchResult={searchResult}
                  playQueue={playQueue}
                  setPlayQueue={setPlayQueue}
                  accessToken={accessToken}
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
        <Player accessToken={accessToken} setPlayerReady={setPlayerReady} />
      </div>
    </div>
  );
}
