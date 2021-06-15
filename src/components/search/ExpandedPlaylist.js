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
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistImage, setPlaylistImage] = useState("");

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

  return (
    <>
      <Row className='bg-dark' noGutters>
        <Col className='w-100'>
          <ListingHeader
            image={playlistImage}
            data1={playlistName}
            data2={playlistDesc}
          />
        </Col>
      </Row>
      {playlistTracks.map((track, index) => (
        <TrackListing
          key={index}
          track={track}
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
