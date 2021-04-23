import React, { useContext, useEffect, useState } from "react";
import QueueItem from "./QueueItem";
import { Container, Col, Row } from "react-bootstrap";
import { QueueContext, TokenContext } from "../context/SpotifyContext";
import NowPlaying from "./NowPlaying";
import SPlayer from "./SPlayer";
import useSpotifyConnect from "../hooks/useSpotifyConnect";
import * as spotifyFetch from "../utilities/spotifyFetch.js";

export default function Queue({
  searching,
  setSearching,
  setExpanded,
  expanded,
  socket,
}) {
  // song:
  // artist:
  // album:
  // duration:
  // uri:
  // id:

  const accessToken = useContext(TokenContext);
  const { playQueue, setPlayQueue } = useContext(QueueContext);
  const { player, nowPlaying, paused } = useSpotifyConnect(accessToken);
  const [lastTrack, setLastTrack] = useState("");
  const [currentTrack, setCurrentTrack] = useState("");
  const [needsUpdate, setNeedsUpdate] = useState(false);
  // const [solo, setSolo] = useState(true);
  // const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!nowPlaying) return;
    //   if (!lastTrack) {
    //     setLastTrack(nowPlaying.track_window.previous_tracks[1]);
    //     setCurrentTrack(nowPlaying.track_window.current_track);
    //     return;
    //   }
    console.log(nowPlaying);
    const playingTrack = nowPlaying.track_window.current_track;
    if (playingTrack.uri !== currentTrack) {
      if (playingTrack.uri === lastTrack) {
        setPlayQueue([
          {
            song: playingTrack.name,
            artist: [
              {
                name: playingTrack.artists[0].name,
                uri: playingTrack.artists[0].uri,
              },
            ],
            album: playingTrack.album.name,
            duration: playingTrack.duration_ms,
            uri: playingTrack.uri,
            id: playingTrack.id,
          },
          ...playQueue,
        ]);
      } else {
        const newQueue = playQueue;
        if (needsUpdate) {
          setNeedsUpdate(false);
          const uris = newQueue.map((track) => track.uri);
          spotifyFetch.playNow(uris, accessToken);
          console.log("queued to spotify");
        }
        newQueue.shift();
        setPlayQueue(newQueue);
      }
      console.log(nowPlaying.track_window);
      setCurrentTrack(playingTrack.uri);
      const thePreviousTracks = nowPlaying.track_window.previous_tracks;
      if (thePreviousTracks.length > 0)
        setLastTrack(thePreviousTracks[thePreviousTracks.length - 1].uri);
    }
  }, [
    accessToken,
    currentTrack,
    lastTrack,
    needsUpdate,
    nowPlaying,
    playQueue,
    setPlayQueue,
  ]);

  function removeItem(index) {
    const newQueue = [...playQueue];
    newQueue.splice(index, 1);
    setPlayQueue([...newQueue]);
    setNeedsUpdate(true);
  }

  // useEffect(() => {
  // if(needsUpdate){

  //   setNeedsUpdate(false)
  // }

  // },[needsUpdate]);

  function playItem(index) {
    console.log("clicked the button");
    const playNow = playQueue[index];
    const newQueue = [...playQueue];
    newQueue.splice(index, 1);
    newQueue.unshift(playNow);
    setPlayQueue([...newQueue]);
    const uris = newQueue.map((track) => track.uri);
    spotifyFetch.playNow(uris, accessToken);
  }
  // useEffect(() => {
  //   console.log("useeffect in queue running");
  //   console.log(playQueue);
  //   socket.on("isOnlyUser", (solo) => {
  //     console.log(solo);
  //     setSolo(solo);
  //   });

  //   if (!player) return;

  //   if (!solo && !synced) {
  //     socket.emit("needPlaylist");
  //     console.log("emitted needplaylist");
  //     setSynced(true);
  //   }

  //   socket.on("getPlaylist", () => {
  //     console.log("get playlist");
  //     //maybe just use wepapi play, for nowPlaying song
  //     //  console.log(nowPlaying);
  //     // const playingTrack = nowPlaying.track_window.current_track;
  //     // const position = nowPlaying.position;
  //     // const syncQueue = [...playQueue];
  //     //{
  //     //   song: playingTrack.name,
  //     //   artist: [
  //     //     {
  //     //       name: playingTrack.artists[0].name,
  //     //       uri: playingTrack.artists[0].uri,
  //     //     },
  //     //   ],
  //     //   album: playingTrack.album.name,
  //     //   duration: playingTrack.duration_ms,
  //     //   uri: playingTrack.uri,
  //     //   id: playingTrack.id,
  //     // },
  //     //   ...playQueue,
  //     // ];
  //     socket.emit("returnPlaylist", playQueue, 0);
  //     // socket.emit("returnPlaylist", playQueue, 0);
  //   });

  //   socket.on("updatePlaylist", (playlist, position) => {
  //     console.log("playlist update through socket");
  //     setPlayQueue(playlist);
  //     if (paused) player.togglePlay();
  //     player.seek(position);
  //   });

  //   socket.on("allNext", () => {
  //     player.nextTrack();
  //   });
  //   socket.on("allPrev", () => {
  //     player.previousTrack();
  //   });

  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, [paused, playQueue, player, setPlayQueue, socket, solo, synced]);

  function nextSong() {
    player.nextTrack();
    // socket.emit("next");
  }

  function prevSong() {
    player.previousTrack();
    // socket.emit("prev");
  }

  return (
    <>
      <Container className={searching ? "hideQueue" : "queue"} fluid>
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
              <button onClick={() => playItem(index)}>&#9658;</button>
            </Col>
            <QueueItem
              entry={entry}
              setExpanded={setExpanded}
              setSearching={setSearching}
              expanded={expanded}
            />
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
        prev={prevSong}
        play={() => player.togglePlay()}
        next={nextSong}
        nowPlaying={nowPlaying}
        paused={paused}
        player={player}
        socket={socket}
      />
    </>
  );
}
