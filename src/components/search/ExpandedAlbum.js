import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col } from "react-bootstrap";
// import useSpotifyApi from "../hooks/useSpotifyApi";
import { TokenContext, QueueContext } from "../context/SpotifyContext";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import TrackListing from "../generic/TrackListing";
import FASIcon from "../generic/FASIcon";
import ListingHeader from "../generic/ListingHeader";

export default function ExpandedAlbum({
  uri,
  expanded,
  setExpanded,
  index,
  setIndex,
  socket,
}) {
  // const [id, setId] = useState("");
  // const [endPoint, setEndpoint] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [trackNum, setTrackNum] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumImage, setAlbumImage] = useState("");
  const accessToken = useContext(TokenContext);
  const { playQueue, setPlayQueue } = useContext(QueueContext);
  const albumRow = useRef(null);
  const [rowWidth, setRowWidth] = useState("");

  console.log(uri);

  useEffect(() => {
    setRowWidth(albumRow.current.clientWidth);
  });

  useEffect(() => {
    const splitUri = uri.split(":");
    console.log(splitUri);
    if (splitUri[1] === "track") {
      (async function () {
        const { trackNum, albumTracks, albumImage } = await spotifyFetch.tracks(
          splitUri[2],
          accessToken
        );
        console.log(trackNum);
        console.log(albumTracks);
        console.log(albumImage);
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
        console.log(trackNum);
        console.log(albumTracks);
        console.log(albumImage);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function queueSong(track) {
    setPlayQueue([
      ...playQueue,
      {
        song: track.name,
        artist: track.artists,
        album: albumTracks.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
    ]);
    spotifyFetch.queueSong(track.uri, accessToken);
    socket.emit("songQueued", track.uri);
  }

  return (
    <>
      <Row className='bg-dark' ref={albumRow} noGutters>
        <Col sm='auto'>
          <ListingHeader
            width={rowWidth}
            image={albumImage}
            data1={albumName}
            data2={artistName}
          />
        </Col>
      </Row>
      {albumTracks.map((track, index) => (
        <Row
          className={`${
            trackNum && trackNum - 1 === index
              ? "nowPlayingTrack"
              : "nowPlaying"
          } pt-1 position-relative`}
          style={{ height: "2rem", zIndex: "5" }}
          noGutters
        >
          <Col className='col-xs-2 col-sm-1 text-center'>
            <FASIcon
              key={track.id + Math.random() + "button"}
              iClass='fas fa-plus-circle fa-lg clickable-icon'
              iFunction={() => queueSong(track)}
              iStyle={{ marginRight: "10px" }}
            />
          </Col>
          <TrackListing
            key={track.id + Math.random()}
            track={track}
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
