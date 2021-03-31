import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackListing from "../TrackListing";

export default function ExpandedTrack({ track, accessToken, expanded, setExpanded, index, setIndex }) {
  // eslint-disable-next-line no-unused-vars
  const [trackId, setTrackId] = useState("");
  const [album, setAlbum] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);

  useEffect(() => {
    setTrackId(track.split(":")[2]);
  }, [track]);

  useEffect(() => {
    if (!trackId) return;
    console.log(trackId);
    axios
      .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.album);
        console.log("album");
        setAlbum(res.data.album);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trackId, track, accessToken]);

  useEffect(() => {
    if (Object.keys(album).length === 0) return;
    axios
      .get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setAlbumTracks(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [album, accessToken]);

  return (
    <>
      {albumTracks.map((track) => (
        <TrackListing
          key={track.id}
          name={track.name}
          artists={track.artists}
          album={album.name}
          ms={track.duration_ms}
          id={track.id}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
        />
      ))}
    </>
  );
}
