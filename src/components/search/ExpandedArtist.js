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
      console.log(uri);
      console.log(artistAlbums);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function queueSong(track) {
    console.log(track);
    setQueueQueue([
      ...queueQueue,
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

  return (
    <>
      <Row>
        <Col>
          <ArtistListingHeader imgUrl={artistImg} artistName={artistName} />
        </Col>
      </Row>
      {artistTracks.map((track) => (
        <Row
          className='nowPlaying pt-1 position-relative w-100'
          style={{ height: "2rem", zIndex: "5" }}
          noGutters
        >
          <Col sm={1} className='text-center'>
            <i
              className='fas fa-plus-circle fa-lg clickable-icon'
              onClick={() => queueSong(track)}
              key={track.id + Math.random() + "button"}
            ></i>
          </Col>
          <TrackListing
            key={track.id + Math.random()}
            track={track}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
          />
        </Row>
      ))}
      <div className='d-flex flex-wrap'>
        {artistAlbums.map((album) => (
          // <ExpandedAlbum
          //   uri={album.uri}
          //   expanded={expanded}
          //   setExpanded={setExpanded}
          //   index={index}
          //   setIndex={setIndex}
          //   socket={socket}
          // />

          <ExpandedArtistsAlbum
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
