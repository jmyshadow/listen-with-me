import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackListing from "./TrackListing";
import useSpotifyApi from "../hooks/useSpotifyApi";

export default function ExpandedAlbum({
  album,
  accessToken,
  expanded,
  setExpanded,
  index,
  setIndex,
  track,
}) {
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState("");
  const [endPoint, setEndpoint] = useState("");

  const { trackNum, albumUri, albumTracks, albumData } = useSpotifyApi(
    endPoint,
    id,
    accessToken
  );

  useEffect(() => {
    if (album || albumUri) {
      const uri = album ? album : albumUri;
      setId(uri.split(":")[2]);
      setEndpoint("albums");
    }
  }, [albumUri, album]);

  useEffect(() => {
    if (!track) return;
    setId(track.split(":")[2]);
    setEndpoint("tracks");
  }, [track]);

  console.log("ex album rendered");
  return (
    <>
      <h1> {albumData.name} </h1>{" "}
      <h4>{albumData.artists ? "by: " + albumData.artists[0].name : ""}</h4>
      {albumTracks.map((track) => (
        <TrackListing
          key={track.id + Math.random()}
          name={track.name}
          artists={track.artists}
          album={albumData.name}
          ms={track.duration_ms}
          id={track.id}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          accessToken={accessToken}
        />
      ))}
    </>
  );
}
