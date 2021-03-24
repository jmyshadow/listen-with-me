import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, tracks }) {
  function logIt(state) {
    console.log(state);
  }

  let trackUris = tracks.map((track) => track.uri);
  console.log(trackUris);
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
