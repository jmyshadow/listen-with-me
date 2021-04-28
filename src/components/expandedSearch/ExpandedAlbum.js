import React, { useState, useEffect, useContext } from "react";
import TrackListing from "./TrackListing";
// import useSpotifyApi from "../hooks/useSpotifyApi";
import { TokenContext, QueueContext } from "../context/SpotifyContext";
import { Row, Col } from "react-bootstrap";
import * as spotifyFetch from "../utilities/spotifyFetch.js";

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
  const accessToken = useContext(TokenContext);
  const { playQueue, setPlayQueue } = useContext(QueueContext);

  // eslint-disable-next-line no-unused-vars
  // const { trackNum, albumUri, albumTracks, albumTracks } = useSpotifyApi(
  //   endPoint,
  //   id,
  //   accessToken
  // );

  // useEffect(() => {
  //   console.log(album, albumUri);
  //   if (album && albumUri) return;
  //   if (album || albumUri) {
  //     const uri = album ? album : albumUri;
  //     setId(uri.split(":")[2]);
  //     setEndpoint("albums");
  //   }
  // }, [albumUri, album]);

  // useEffect(() => {
  //   if (!track) return;
  //   setId(track.split(":")[2]);
  //   setEndpoint("tracks");
  // }, [track]);

  // function queueSong(track) {
  //   setPlayQueue([
  //     ...playQueue,
  //     {
  //       song: track.name,
  //       artist: track.artists,
  //       album: albumTracks.name,
  //       duration: track.duration_ms,
  //       uri: track.uri,
  //       id: track.id,
  //     },
  //   ]);
  //   spotifyFetch.queueSong(track.uri, accessToken);
  // }

  useEffect(() => {
    const splitUri = uri.split(":");
    if (splitUri[1] === "track") {
      (async function () {
        console.log("getting track");
        const { trackNum, albumTracks } = await spotifyFetch.tracks(
          splitUri[2],
          accessToken
        );
        console.log(albumTracks);
        setTrackNum(trackNum);
        setAlbumTracks(albumTracks);
        setAlbumName(albumTracks[0].album.name);
        setArtistName(albumTracks[0].artists[0].name);
      })();
    } else if (splitUri[1] === "album") {
      (async function () {
        const albumTracks = await spotifyFetch.albums(splitUri[2], accessToken);
        setAlbumTracks(albumTracks);
        setAlbumName(albumTracks[0].album.name);
        setArtistName(albumTracks[0].artists[0].name);
        console.log(albumTracks);
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

  console.log("ex album rendered");
  return (
    <>
      <Row>
        <Col sm='auto'>
          <h1> {albumName} </h1>{" "}
          <h4>{artistName ? "by: " + artistName : ""}</h4>
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
            album={albumTracks.name}
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
