import React, { useState, useEffect, useContext } from "react";
import useSpotifyApi from "../hooks/useSpotifyApi";
import TrackListing from "./TrackListing";
import { TokenContext, QueueContext } from "../context/SpotifyContext";
import { Row, Col } from "react-bootstrap";

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
  const { playQueue, setPlayQueue } = useContext(QueueContext);
  const { playlistData, playlistTracks } = useSpotifyApi(
    "playlist",
    id,
    accessToken
  );

  useEffect(() => {
    if (!playlist) return;
    setId(playlist.split(":")[2]);
  }, [playlist]);

  function queueSong(track) {
    console.log(track);
    setPlayQueue([
      ...playQueue,
      {
        song: track.name,
        artist: track.artists,
        album: track.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
    ]);
  }

  console.log("ex playlist rendered");
  return (
    <>
      <Row>
        <Col>
          <h1> {playlistData.name} </h1>
          <h4>{playlistData.description}</h4>
        </Col>
      </Row>
      {playlistTracks.map((item) => (
        <Row>
          <Col sm='auto'>
            <button
              onClick={() => queueSong(item.track)}
              key={item.track.id + Math.random() + "button"}
            >
              Q
            </button>
          </Col>
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
        </Row>
      ))}
    </>
  );
}
