import React, { useState, useEffect, useContext } from "react";
import TrackListing from "./TrackListing";
import ExpandedAlbum from "./ExpandedAlbum";
import useSpotifyApi from "../hooks/useSpotifyApi";
import { TokenContext } from "../context/SpotifyContext";

export default function ExpandedArtist({
  artist,
  expanded,
  setExpanded,
  index,
  setIndex,
}) {
  const accessToken = useContext(TokenContext);
  const [id, setId] = useState("");
  const { artistAlbums, artistTracks } = useSpotifyApi(
    "artists",
    id,
    accessToken
  );

  useEffect(() => {
    setId(artist.split(":")[2]);
  }, [artist]);

  console.log("ex artist rendered");
  return (
    <>
      <h1>Top Tracks:</h1>
      {artistTracks.map((track) => (
        <TrackListing
          key={track.id + Math.random()}
          name={track.name}
          artists={track.artists}
          album={track.album.name}
          ms={track.duration_ms}
          id={track.id}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
        />
      ))}
      {artistAlbums.map((album) => (
        <ExpandedAlbum
          key={album.id + Math.random()}
          type={"album"}
          accessToken={accessToken}
          album={album.uri}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          albumName={album.name}
        />
      ))}
    </>
  );
}
