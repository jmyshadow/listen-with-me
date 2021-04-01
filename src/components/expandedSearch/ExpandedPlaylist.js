import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackListing from "./TrackListing";

export default function ExpandedPlaylist({
  playlist,
  accessToken,
  expanded,
  setExpanded,
  index,
  setIndex,
  track,
}) {
  // eslint-disable-next-line no-unused-vars
  const [playlistId, setPlaylistId] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistData, setPlaylistData] = useState({});

  useEffect(() => {
    if (!playlist) return;
    setPlaylistId(playlist.split(":")[2]);
  }, [playlist]);

  // useEffect(() => {
  //   if (!trackId) return;
  //   console.log(trackId);
  //   axios
  //     .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.album);
  //       console.log("album");
  //       setAlbum(res.data.album);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [trackId, track, accessToken]);

  useEffect(() => {
    if (!playlistId) return;
    axios
      .get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=from_token`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        setPlaylistTracks(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPlaylistData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, playlistId]);

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
