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
  socket,
}) {
  const accessToken = useContext(TokenContext);
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
    (async function () {
      const { artistTracks, artistAlbums } = await spotifyFetch.artists(
        uri.split(":")[2],
        accessToken
      );
      setArtistTracks(artistTracks);
      setArtistAlbums(artistAlbums);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function queueSong(track) {
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

    socket.emit("songQueued", track.uri);
  }

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
          uri={album.uri}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          socket={socket}
        />
      ))}
    </>
  );
}
