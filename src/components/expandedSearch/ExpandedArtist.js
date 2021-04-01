import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackListing from "./TrackListing";
import ExpandedAlbum from "./ExpandedAlbum";

export default function ExpandedArtist({
  artist,
  accessToken,
  expanded,
  setExpanded,
  index,
  setIndex,
}) {
  const [artistId, setArtistId] = useState("");
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistTracks, setArtistTracks] = useState([]);

  useEffect(() => {
    setArtistId(artist.split(":")[2]);
  }, [artist]);

  useEffect(() => {
    if (!artistId) return;
    console.log(artistId);
    axios
      .get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        console.log("artist");
        setArtistTracks(res.data.tracks);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("artist");
        setArtistAlbums(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [artistId, accessToken]);

  // useEffect(() => {
  //   if (Object.keys(album).length === 0) return;
  //   axios
  //     .get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.items);
  //       setArtistTracks(res.data.items);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [album, accessToken]);

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
          key={album.id}
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
