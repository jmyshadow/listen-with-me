import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackListing from "./TrackListing";

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
  const [albumId, setAlbumId] = useState("");
  const [trackId, setTrackId] = useState("");
  const [trackNum, setTrackNum] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [albumData, setAlbumData] = useState({});

  useEffect(() => {
    if (!album) return;
    setAlbumId(album.split(":")[2]);
  }, [album]);

  useEffect(() => {
    if (!track) return;
    setTrackId(track.split(":")[2]);
  }, [track]);

  useEffect(() => {
    if (!trackId) return;
    axios
      .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setTrackNum(res.data.track_number);
        setAlbumId(res.data.album.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trackId, track, accessToken]);

  useEffect(() => {
    if (!albumId) return;
    axios
      .get(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setAlbumData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setAlbumTracks(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [albumId, accessToken]);

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
        />
      ))}
    </>
  );
}
