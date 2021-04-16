import React, { useContext, useEffect, useState } from "react";
import QueueItem from "./QueueItem";
import { Container, Col, Row } from "react-bootstrap";
import { QueueContext, TokenContext } from "../context/SpotifyContext";
import NowPlaying from "./NowPlaying";
import SPlayer from "./SPlayer";
import useSpotifyConnect from "../hooks/useSpotifyConnect";
import * as spotifyFetch from "../utilities/spotifyFetch.js";

export default function Queue() {
  // song:
  // artist:
  // album:
  // duration:
  // uri:
  // id:

  const accessToken = useContext(TokenContext);
  const { playQueue, setPlayQueue } = useContext(QueueContext);
  const { player, nowPlaying, paused } = useSpotifyConnect(accessToken);
  const [lastTrack, setLastTrack] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    if (!nowPlaying) return;
    if (!lastTrack) {
      setLastTrack(nowPlaying.track_window.previous_tracks[1]);
      setCurrentTrack(nowPlaying.track_window.current_track);
      return;
    }
    const playingUri = nowPlaying.track_window.current_track.uri;
    if (currentTrack.uri !== playingUri) {
      if (playingUri === lastTrack.uri) {
        const track = nowPlaying.track_window.current_track;
        setPlayQueue([
          {
            song: track.name,
            artist: [
              { name: track.artists[0].name, uri: track.artists[0].uri },
            ],
            album: track.album.name,
            duration: track.duration_ms,
            uri: track.uri,
            id: track.id,
          },
          ...playQueue,
        ]);
      } else {
        const newQueue = playQueue;
        newQueue.shift();
        setPlayQueue(newQueue);
        if (needsUpdate) {
          const uris = newQueue.map((track) => track.uri);
          spotifyFetch.playNow(uris, accessToken);

          setNeedsUpdate(false);
        }
      }
      setCurrentTrack(nowPlaying.track_window.current_track);
      setLastTrack(nowPlaying.track_window.previous_tracks[1]);
    }
  }, [
    accessToken,
    currentTrack,
    lastTrack,
    needsUpdate,
    nowPlaying,
    setPlayQueue,
  ]);

  function removeItem(index) {
    const newQueue = [...playQueue];
    newQueue.splice(index, 1);
    setPlayQueue([...newQueue]);
    setNeedsUpdate(true);
  }

  function playItem(index) {
    const playNow = playQueue[index];
    const newQueue = [...playQueue];
    newQueue.splice(index, 1);
    newQueue.unshift(playNow);
    setPlayQueue([...newQueue]);
    const uris = newQueue.map((track) => track.uri);
    spotifyFetch.playNow(uris, accessToken);
  }

  console.log("queue rendered");
  return (
    <>
      <Container fluid>
        <NowPlaying nowPlaying={nowPlaying} />
        {/** adding random number to entry id, in case same song queued more than once */}
        <Row className='mx-4 px-4 py-2 border-bottom border-dark' noGutters>
          <Col>
            <h1>Up Next: </h1>
          </Col>
        </Row>
        {playQueue.map((entry, index) => (
          <Row
            key={entry.id + Math.floor(Math.random() * 100000)}
            className='row-nowrap'
            noGutters
          >
            <Col sm='auto'>
              <button onClick={playItem(index)}>&#9658;</button>
            </Col>
            <QueueItem entry={entry} />
            <Col sm='auto'>
              <button
                onClick={() => removeItem(index)}
                key={Math.random() + "button"}
              >
                X
              </button>
            </Col>
          </Row>
        ))}
      </Container>
      <SPlayer
        prev={() => player.previousTrack()}
        play={() => player.togglePlay()}
        next={() => player.nextTrack()}
        nowPlaying={nowPlaying}
        paused={paused}
        player={player}
      />
    </>
  );
}
