import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({
  accessToken,
  setPlayerReady,
  playQueue,
  setPlayQueue,
}) {
  const [play, setPlay] = useState(false);
  const [tracks, setTracks] = useState();

  function logIt(state) {
    console.log(state);

    // figure out how to only run this once
    state.status === "READY" ? setPlayerReady(true) : setPlayerReady(false);
    //     setPlayQueue(playQueue.filter((val, index) => console.log(index)));
  }

  if (!accessToken) return null;
  return (
    <div>
      <SpotifyPlayer
        token={accessToken}
        uris={tracks ? tracks : []}
        syncExternalDevice={"true"}
        magnifySliderOnHover={"true"}
        callback={logIt}
        play={play}
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
