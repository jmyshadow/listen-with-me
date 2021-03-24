import React, { useState } from "react";
import useAuth from "./useAuth";
import SearchBar from "./SearchBar";
import Player from "./Player";
import SearchResults from "./SearchResults";
import Queue from "./Queue";
//import SpotifyWebApi from "spotify-web-api-node";

export default function HomePage({ code }) {
  const accessToken = useAuth(code);
  let [tracks, setTracks] = useState([]);
  let [searching, setSearching] = useState("");

  return (
    <div className='homepage d-flex h-100 w-100 pb-5'>
      <div className='side-bar bg-dark'>links</div>
      <div className='d-flex flex-column bg-success h-100 w-100'>
        <div>
          <SearchBar
            setTracks={setTracks}
            accessToken={accessToken}
            setSearching={setSearching}
          />
        </div>
        <div className='bg-primary playlist'>
          {searching ? <SearchResults tracks={tracks} /> : <Queue />}
        </div>
      </div>
      <div className='side-bar bg-dark'>chat</div>
      <div className='fixed-bottom'>
        <Player accessToken={accessToken} tracks={tracks} />
      </div>
    </div>
  );
}
