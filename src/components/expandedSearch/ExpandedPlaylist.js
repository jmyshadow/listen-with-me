import React, { useState, useEffect, useContext } from "react";
import useSpotifyApi from "../hooks/useSpotifyApi";
import TrackListing from "./TrackListing";
import { TokenContext } from "../context/SpotifyContext";

export default function ExpandedPlaylist({
  playlist,
  expanded,
  setExpanded,
  index,
  setIndex,
  track,
}) {
  const accessToken = useContext(TokenContext);
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState("");
  const { playlistData, playlistTracks } = useSpotifyApi(
    "playlist",
    id,
    accessToken
  );

  useEffect(() => {
    if (!playlist) return;
    setId(playlist.split(":")[2]);
  }, [playlist]);

  console.log("ex playlist rendered");
  return (
    <>
      <h1> {playlistData.name} </h1>
      <h4>{playlistData.description}</h4>
      {playlistTracks.map((item) => (
        <TrackListing
          key={item.track.id + Math.random()}
          name={item.track.name}
          artists={item.track.artists}
          album={item.track.album.name}
          ms={item.track.duration_ms}
          id={item.track.id}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          playlist={true}
        />
      ))}
    </>
  );
}
