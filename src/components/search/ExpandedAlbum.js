import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col } from "react-bootstrap";
// import useSpotifyApi from "../hooks/useSpotifyApi";
import { TokenContext } from "../context/SpotifyContext";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import TrackListing from "../generic/TrackListing";

import ListingHeader from "../generic/ListingHeader";

export default function ExpandedAlbum({
  uri,
  expanded,
  setExpanded,
  index,
  setIndex,
  socket,
  queueQueue,
  setQueueQueue,
  immediateQueue,
  setImmediateQueue,
}) {
  const accessToken = useContext(TokenContext);
  const [trackNum, setTrackNum] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumImage, setAlbumImage] = useState("");

  useEffect(() => {
    const splitUri = uri.split(":");
    if (splitUri[1] === "track") {
      (async function () {
        const { trackNum, albumTracks, albumImage } = await spotifyFetch.tracks(
          splitUri[2],
          accessToken
        );

        setTrackNum(trackNum);
        setAlbumTracks(albumTracks);
        setAlbumName(albumTracks[0].album.name);
        setArtistName(albumTracks[0].artists[0].name);
        setAlbumImage(albumImage);
      })();
    } else if (splitUri[1] === "album") {
      (async function () {
        const { albumTracks, albumImage } = await spotifyFetch.albums(
          splitUri[2],
          accessToken
        );
        setAlbumTracks(albumTracks);
        setAlbumName(albumTracks[0].album.name);
        setArtistName(albumTracks[0].artists[0].name);
        setAlbumImage(albumImage);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className='bg-dark' noGutters>
        <Col className='w-100'>
          <ListingHeader
            image={albumImage}
            data1={albumName}
            data2={artistName}
          />
        </Col>
      </Row>
      {albumTracks.map((track, index) => (
        <TrackListing
          key={index}
          track={track}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          accessToken={accessToken}
          highlight={trackNum && trackNum - 1 === index}
        />
      ))}
    </>
  );
}
