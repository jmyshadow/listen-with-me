import React, { useState, useEffect, useContext } from "react";
// import useSpotifyApi from "../hooks/useSpotifyApi";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import TrackListing from "./TrackListing";
import { TokenContext, QueueContext } from "../context/SpotifyContext";
import { Row, Col } from "react-bootstrap";

export default function ExpandedPlaylist({
  uri,
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
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  // const { playlistData, playlistTracks } = useSpotifyApi(
  //   "playlist",
  //   id,
  //   accessToken
  // );

  // useEffect(() => {
  //   if (!playlist) return;
  //   setId(playlist.split(":")[2]);
  // }, [playlist]);

  useEffect(() => {
    (async function () {
      const { playlistData, playlistTracks } = await spotifyFetch.playlists(
        uri.split(":")[2],
        accessToken
      );
      console.log(playlistData);
      console.log(playlistTracks);
      setPlaylistTracks(playlistTracks);
      setPlaylistName(playlistData.name);
      setPlaylistDesc(playlistData.description);
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
        album: track.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
    ]);
  }

  return (
    <>
      <Row>
        <Col>
          <h1> {playlistName} </h1>
          <h4>{playlistDesc}</h4>
        </Col>
      </Row>
      {playlistTracks.map((track) => (
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
            playlist={true}
          />
        </Row>
      ))}
    </>
  );
}
