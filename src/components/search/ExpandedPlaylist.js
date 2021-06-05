import React, { useState, useEffect, useContext, useRef } from "react";
// import useSpotifyApi from "../hooks/useSpotifyApi";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import TrackListing from "../generic/TrackListing";
import ListingHeader from "../generic/ListingHeader";
import { TokenContext, QueueContext } from "../context/SpotifyContext";
import { Row, Col } from "react-bootstrap";

export default function ExpandedPlaylist({
  uri,
  expanded,
  setExpanded,
  index,
  setIndex,
  track,
  queueQueue,
  setQueueQueue,
  immediateQueue,
  setImmediateQueue,
}) {
  const accessToken = useContext(TokenContext);
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState("");
  const { playQueue, setPlayQueue } = useContext(QueueContext);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistImage, setPlaylistImage] = useState("");
  const theRow = useRef(null);
  const [rowWidth, setRowWidth] = useState("");

  useEffect(() => {
    setRowWidth(theRow.current.clientWidth);
  }, []);
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
      setPlaylistTracks(playlistTracks);
      setPlaylistName(playlistData.name);
      setPlaylistDesc(playlistData.description);
      setPlaylistImage(playlistData.images[0].url);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function queueSong(track) {
    setQueueQueue([
      ...queueQueue,
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
      <Row className='bg-dark' ref={theRow} noGutters>
        <Col sm='auto'>
          <ListingHeader
            width={rowWidth}
            image={playlistImage}
            data1={playlistName}
            data2={playlistDesc}
          />
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
            track={track}
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
