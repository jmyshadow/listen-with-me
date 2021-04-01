import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import axios from "axios";

export default function Player({ accessToken, setPlayerReady, spotifyQueue }) {
  const [tracks, setTracks] = useState([]);
  const [play, setPlay] = useState(false);
  const [thisDev, setThisDev] = useState("");
  const [playDev, setPlayDev] = useState("");

  function logIt(state) {
    setPlay(state.isPlaying);
    console.log(state);
    setThisDev(state.currentDeviceId);
    // figure out how to only run this once
    state.status === "READY" ? setPlayerReady(true) : setPlayerReady(false);
    //     setPlayQueue(playQueue.filter((val, index) => console.log(index)));
  }

  useEffect(() => {
    if (spotifyQueue === []) return;
    setTracks(spotifyQueue);
    setPlay(true);
  }, [spotifyQueue]);

  if (!accessToken) return null;
  return (
    <div>
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
          loaderSize: "100vh",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
      />
    </div>
  );
}
