import React, { useState } from "react";
import Track from "./Track";
import useAuth from "./useAuth";
import SearchBar from "./SearchBar";
import Player from "./Player";
//import SpotifyWebApi from "spotify-web-api-node";

export default function HomePage({ code }) {
  const accessToken = useAuth(code);

  let [tracks, setTracks] = useState([]);

  return (
    <>
      <div>
        <SearchBar
          tracks={tracks}
          setTracks={setTracks}
          accessToken={accessToken}
        />
        <ul>
          {tracks.map((track) => (
            <Track key={track.id} track={track} />
          ))}
        </ul>
      </div>
      <div>
        <Player accessToken={accessToken} tracks={tracks} />
      </div>
    </>
  );
}
