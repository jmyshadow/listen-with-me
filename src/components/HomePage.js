import React, { useState } from "react";
import useAuth from "./useAuth";
import SearchBar from "./SearchBar";
import Player from "./Player";
import SearchResults from "./SearchResults";
import Queue from "./Queue";
//import SpotifyWebApi from "spotify-web-api-node";

export default function HomePage({ code }) {
  const accessToken = useAuth(code);
  let [searchResult, setSearchResult] = useState({
    tracks: { items: [], next: null },
    artists: { items: [], next: null },
    albums: { items: [], next: null },
    playlists: { items: [], next: null },
    episodes: { items: [], next: null },
    shows: { items: [], next: null },
  });
  let [searching, setSearching] = useState("");
  let [playerReady, setPlayerReady] = useState(false);

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
              {" "}
              {searching ? (
                <SearchResults searchResult={searchResult} />
              ) : (
                <Queue />
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
