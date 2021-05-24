import React, { useState, useEffect, useContext } from "react";
import TrackListing from "./TrackListing";
import ExpandedArtistsAlbum from "./ExpandedArtistsAlbum";
import ListingHeader from "./ListingHeader";
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
          <ListingHeader imgUrl={artistImg} artistName={artistName} />
        </Col>
      </Row>
      {artistTracks.map((track) => (
        <Row className='nowPlaying pt-1' style={{ height: "2rem" }} noGutters>
          <Col className='col-xs-2 col-sm-1 text-center'>
            <i
              className='fas fa-plus-circle fa-lg clickable-icon'
              onClick={() => queueSong(track)}
              key={track.id + Math.random() + "button"}
            ></i>
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
