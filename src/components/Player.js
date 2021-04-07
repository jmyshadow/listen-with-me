import React, { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { TokenContext } from "./context/SpotifyContext";

export default function Player({ playQueue, setPlayQueue }) {
  const [tracks, setTracks] = useState([]);
  const [play, setPlay] = useState(false);

  const accessToken = useContext(TokenContext);

  function logIt(state) {
    // until player is rewritten just assume this is happening
    if (state.type === "track_update") {
      console.log(playQueue);
      const update = playQueue.slice(1);
      setPlayQueue([...update]);
    }
    console.log(state);
    //     setPlayQueue(playQueue.filter((val, index) => console.log(index)));
  }

  useEffect(() => {
    if (playQueue === []) return;
    const uris = playQueue.map((track) => {
      return `spotify:track:${track.id}`;
    });
    console.log(uris);
    setTracks(uris);
    setPlay(true);
  }, [playQueue]);

  console.log("player rendered");

  if (!accessToken) return null;
  return (
    <div className='fixed-bottom'>
      <SpotifyPlayer
        token={accessToken}
        uris={tracks ? tracks : []}
        play={play}
        syncExternalDevice={"true"}
        magnifySliderOnHover={"true"}
        callback={logIt}
        styles={{
          activeColor: "#fff",
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
      />
    </div>
  );
}
