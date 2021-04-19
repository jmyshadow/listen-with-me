import React, { useState, useEffect, useContext } from "react";
import TrackListing from "./TrackListing";
import ExpandedAlbum from "./ExpandedAlbum";
// import useSpotifyApi from "../hooks/useSpotifyApi";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import { TokenContext, QueueContext } from "../context/SpotifyContext";
import { Col, Row } from "react-bootstrap";

export default function ExpandedArtist({
  uri,
  expanded,
  setExpanded,
  index,
  setIndex,
}) {
  const accessToken = useContext(TokenContext);
  const [id, setId] = useState("");
  const { playQueue, setPlayQueue } = useContext(QueueContext);
  const [artistTracks, setArtistTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  // const { artistAlbums, artistTracks } = useSpotifyApi(
  //   "artists",
  //   id,
  //   accessToken
  // );

  // useEffect(() => {
  //   setId(artist.split(":")[2]);
  // }, [artist]);

  useEffect(() => {
    (async function getArtist() {
      const { artistTracks, artistAlbums } = await spotifyFetch.tracks(
        uri.split(":")[2],
        accessToken
      );
      setArtistTracks(artistTracks);
      setArtistAlbums(artistAlbums);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function queueSong(track) {
    console.log(track);
    setPlayQueue([
      ...playQueue,
      {
        song: track.name,
        artist: track.artists,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
    ]);
  }

  console.log("ex artist rendered");
  return (
    <>
      <Row>
        <Col>
          <h1>Top Tracks:</h1>
        </Col>
      </Row>
      {artistTracks.map((track) => (
        <Row>
          <Col sm='auto'>
            <button
              onClick={() => queueSong(track)}
              key={track.id + Math.random() + "button"}
            >
              Q
            </button>
          </Col>
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
        </Row>
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
