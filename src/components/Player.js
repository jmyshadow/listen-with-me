import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, setPlayerReady }) {
  function logIt(state) {
    console.log(state);
    state.status === "READY" ? setPlayerReady(true) : setPlayerReady(false);
  }

  let trackUris = ["spotify:artist:53A0W3U0s8diEn9RhXQhVz"];
  if (!accessToken) return null;
  return (
    <div>
      <SpotifyPlayer
        token={accessToken}
        uris={trackUris}
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
