import React, { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { TokenContext } from "./context/SpotifyContext";

export default function Player({ spotifyQueue }) {
  const [tracks, setTracks] = useState([]);
  const [play, setPlay] = useState(false);

  const accessToken = useContext(TokenContext);

  function logIt(state) {
    console.log(state);
    //     setPlayQueue(playQueue.filter((val, index) => console.log(index)));
  }

  useEffect(() => {
    if (spotifyQueue === []) return;
    setTracks(spotifyQueue);
    setPlay(true);
  }, [spotifyQueue]);

  console.log("player rendered");

  if (!accessToken) return null;
  return (
    <div className='fixed-bottom'>
      <SpotifyPlayer
        token={accessToken}
        uris={tracks}
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
