import React, { useState, useEffect, useContext } from "react";
import TrackListing from "./TrackListing";
import useSpotifyApi from "../hooks/useSpotifyApi";
import { TokenContext, QueueContext } from "../context/SpotifyContext";
import { Row, Col } from "react-bootstrap";
import * as spotifyFetch from "../utilities/spotifyFetch.js";

export default function ExpandedAlbum({
  album,
  expanded,
  setExpanded,
  index,
  setIndex,
  track,
}) {
  const [id, setId] = useState("");
  const [endPoint, setEndpoint] = useState("");
  const accessToken = useContext(TokenContext);
  const { playQueue, setPlayQueue } = useContext(QueueContext);

  // eslint-disable-next-line no-unused-vars
  const { trackNum, albumUri, albumTracks, albumData } = useSpotifyApi(
    endPoint,
    id,
    accessToken
  );

  useEffect(() => {
    console.log(album, albumUri);
    if (album && albumUri) return;
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

  function queueSong(track) {
    setPlayQueue([
      ...playQueue,
      {
        song: track.name,
        artist: track.artists,
        album: albumData.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
    ]);
    spotifyFetch.queueSong(track.uri, accessToken);
  }

  console.log("ex album rendered");
  return (
    <>
      <Row>
        <Col sm='auto'>
          <h1> {albumData.name} </h1>{" "}
          <h4>{albumData.artists ? "by: " + albumData.artists[0].name : ""}</h4>
        </Col>
      </Row>
      {albumTracks.map((track) => (
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
            album={albumData.name}
            ms={track.duration_ms}
            id={track.id}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
            accessToken={accessToken}
          />
        </Row>
      ))}
    </>
  );
}
