import React, { useState, useEffect, useContext } from "react";
import TrackListing from "../generic/TrackListing";
import ExpandedArtistsAlbum from "./ExpandedArtistsAlbum";
import ArtistListingHeader from "../generic/ArtistListingHeader";
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
  queueQueue,
  setQueueQueue,
  immediateQueue,
  setImmediateQueue,
}) {
  const accessToken = useContext(TokenContext);
  const [artistTracks, setArtistTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [artistImg, setArtistImg] = useState("");

  useEffect(() => {
    (async function () {
      const { artistTracks, artistAlbums, artistData } =
        await spotifyFetch.artists(uri.split(":")[2], accessToken);
      setArtistTracks(artistTracks);
      setArtistAlbums(artistAlbums);
      setArtistName(artistData.name);
      setArtistImg(artistData.images[0].url);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row>
        <Col className='w-100'>
          <ArtistListingHeader imgUrl={artistImg} artistName={artistName} />
        </Col>
      </Row>
      {artistTracks.map((track, index) => (
        <TrackListing
          key={index}
          track={track}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          setQueueQueue={setQueueQueue}
        />
      ))}
      <div className='d-flex flex-wrap'>
        {artistAlbums.map((album, index) => (
          <ExpandedArtistsAlbum
            key={index}
            album={album}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
            socket={socket}
          />
        ))}
      </div>
    </>
  );
}
